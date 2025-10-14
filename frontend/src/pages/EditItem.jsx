import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "@/utils/axios";
import { CornerDownLeft, Loader2, Utensils } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import useGetShop from "@/hooks/useGetShop";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setLoading, setMyShopData } from "@/redux/ownerSlice";

function EditItem() {
  useGetCurrentUser();
  useGetShop();
  const {getId} = useParams();
  const dispatch = useDispatch();
  
  // calling hook for data

  const navigate = useNavigate();
  // getting data from redux
  const { myShopData, loading } = useSelector((state) => state.owner);


  // for images
  const [backendImage, setBackendImage] = useState(null);

  // for categories
  const [selcetCategory, setSelectCategory] = useState("");
  const [selectFoodType, setSelectFoodType] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);

  // categories
  const categories = [
    "Snacks",
    "Main Courses",
    "Desserts",
    "Pizzas",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];
  const foodTypes = ["Veg", "Non-Veg"];

  // actual fields
  const [formdata, setFormData] = useState({
    name: currentProduct?.name || "",
    productImage: currentProduct?.productImage || "",
    price: currentProduct?.price || "",
    category: currentProduct?.category || "",
    foodType: currentProduct?.foodType || "",
  });

  // Handle image selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log("file", file);

    if (!file) return null;

    setBackendImage(file);
    setFormData({ ...formdata, productImage: URL.createObjectURL(file) });
  };

  // Handle form submit
  const handleSubmitEditAndSave = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formdata.name);
      data.append("price", formdata.price);
      data.append("category", selcetCategory);
      data.append("foodType", selectFoodType);

      if (backendImage) {
        data.append("productImage", backendImage); // actual file upload
      }

      const resp = await AxiosInstance.put(`/v1/product/edit-product/${getId}`,data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (resp.data.success) {
        console.log("product data", resp.data.updatedProduct);
        dispatch(setMyShopData(resp.data.updatedProduct));
        navigate("/");

        toast(resp.data.message);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error while create a  product items", error);
      // toast.error(response.data.error);
      dispatch(setLoading(false));
    }
  };
  

    useEffect(() => {
  const getCurrentItem = async () => {
    try {
      const resp = await AxiosInstance.get(`/v1/product/get-product/${getId}`);
      if (resp.data.success) {
        console.log("data", resp);
        setCurrentProduct(resp.data.product);

        // prefill the form
        setFormData({
          name: resp.data.product.name,
          productImage: resp.data.product.productImage,
          price: resp.data.product.price,
          category: resp.data.product.category,
          foodType: resp.data.product.foodType,
        });

        setSelectCategory(resp.data.product.category);
        setSelectFoodType(resp.data.product.foodType);
      }
    } catch (error) {
      console.log("error getting current item", error);
    }
  };

  if (getId) getCurrentItem();
}, [getId]);

  console.log("current", currentProduct);

  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gradient-to-br from-pink-100 to-white p-2 sm:px-0">
      <div
        className="absolute top-2.5 left-2.5 cursor-pointer z-50"
        onClick={() => navigate("/")}
      >
        <CornerDownLeft className="size-5" />
      </div>

      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 border border-pink-100 mt-5">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-pink-200 p-4 rounded-xl mb-4">
            <Utensils className="size-6 font-bold" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">Edit food</div>
        </div>

        <form className="space-y-5" 
        onSubmit={handleSubmitEditAndSave}
        >
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </Label>
            <Input
              name="name"
              value={formdata.name}
              onChange={(e) =>
                setFormData({ ...formdata, name: e.target.value })
              }
              type="text"
              placeholder="Enter food name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </Label>
            <Input
              name="price"
              value={formdata.price}
              onChange={(e) =>
                setFormData({ ...formdata, price: e.target.value })
              }
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </Label>
              <Select
                name="category"
                value={selcetCategory}
                onValueChange={setSelectCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.map((cat) => (
                      <SelectItem value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                foodType
              </Label>
              <Select
                name="foodType"
                value={selectFoodType}
                onValueChange={setSelectFoodType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>food Type</SelectLabel>
                    {foodTypes.map((foodtyp) => (
                      <SelectItem value={foodtyp}>{foodtyp}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Food Picture
            </Label>
            <Input
              name="productImage"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full px-4 border text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 cursor-pointer"
            />
             {formdata.productImage && (
              <div className="mt-4">
                <img
                  src={formdata.productImage}
                  alt={formdata.name}
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div> 
            )}
          </div>
          <Button
            disabled={loading}
            className={`w-full cursor-pointer ${
               loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex justify-center items-center gap-2">
                {" "}
                <Loader2 className="size-4  transition-all duration-300 animate-spin " />
                Loading...{" "}
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
