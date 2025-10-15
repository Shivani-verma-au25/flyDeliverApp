import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "@/redux/ownerSlice";
import { toast } from "sonner";

function OwnerProductItemsCard({ item, ind }) {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      const resp = await AxiosInstance.delete(`/v1/product/delete-product/${item._id}`);            
      dispatch(setMyShopData(resp.data.shop))
      toast.success(resp.data?.message)
    } catch (error) {
      console.log("error in delete handler",error);
    }
  }
  
  return (
    <Card
      key={ind}
      className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 hover:shadow-lg transition-all duration-300 rounded-2xl border border-gray-200"
    >
      {/* Product Image */}
      <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100">
        <img
          src={item.productImage}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow min-w-[200px]">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {item.name || "Unnamed Product"}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 mt-1">
          <p className="text-sm text-gray-500 capitalize">
            Category: <span className="font-medium">{item.category}</span>
          </p>
          <p className="text-sm text-gray-500">
            Type: <span className="font-medium">{item.foodType}</span>
          </p>
          <p className="text-base font-semibold text-pink-600 mt-2">
            ₹{item.price || "N/A"}
          </p>
        </CardContent>
      </div>

      {/* Action Buttons */}
      <CardFooter className="p-0 flex h-full w-full justify-end md:mt-20  gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/edit-product/${item._id}`)}
          className="hover:bg-pink-100 rounded-full transition-all cursor-pointer"
        >
          <Pen className="size-5 text-pink-600" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete() }
          className="hover:bg-red-100 rounded-full transition-all cursor-pointer"
        >
          <Trash2 className="size-5 text-red-600" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default OwnerProductItemsCard;
