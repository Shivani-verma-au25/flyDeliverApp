import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import React, { useState } from "react";
import { AxiosInstance } from "@/utils/axios";
import { CornerDownLeft, Utensils } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import useGetShop from "@/hooks/useGetShop";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";

function CreateEditShop() {
  useGetCurrentUser()
  // calling hook for data
  useGetShop()

  const navigate = useNavigate();
  // getting data from redux
  const {myShopData} = useSelector((state) => state.owner);
  console.log("shop",myShopData);

  // current user
  const { currentCity, currentAddress, currentState } = useSelector(
    (state) => state.user
  );

  


  const [backendImage, setBackendImage] = useState(null);
  const [formdata, setFormData] = useState({
    name: myShopData?.name || "",
    shopCity: myShopData?.shopCity || currentCity,
    state: myShopData?.state || currentState,
    address: myShopData?.address || currentAddress,
    shopImage: myShopData?.shopImage || "",
  });

  // Handle image selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log( "file",file);
    
    if (!file) return;
    setBackendImage(file); // store actual File object for backend
    setFormData({ ...formdata, shopImage: URL.createObjectURL(file) }); // for preview only
  };

  // Handle form submit
  const handleSubmitEditAndSave = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formdata.name);
      data.append("shopCity", formdata.shopCity);
      data.append("state", formdata.state);
      data.append("address", formdata.address);

      if (backendImage) {
        data.append("shopImage", backendImage); // actual file upload
      }

      const resp = await AxiosInstance.post("/v1/shop/create-edit", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate('/')
      toast.success(resp.data?.message);
    } catch (error) {
      console.error("Error while edit or save the shop", error);
      toast.error("Failed to save shop!");
    }
  };


  
  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gradient-to-br from-pink-100 to-white p-2 sm:px-0">
      <div className="absolute top-2.5 left-2.5 cursor-pointer z-50" onClick={() => navigate("/")}>
        <CornerDownLeft className="size-5" />
      </div>

      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 border border-pink-100 mt-5">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-pink-200 p-4 rounded-xl mb-4">
            <Utensils className="size-6 font-bold" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {myShopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmitEditAndSave}>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Name</Label>
            <Input
              value={formdata.name}
              onChange={(e) => setFormData({ ...formdata, name: e.target.value })}
              type="text"
              placeholder="Enter shop name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">City</Label>
              <Input
                value={formdata.shopCity}
                onChange={(e) => setFormData({ ...formdata, shopCity: e.target.value })}
                type="text"
                placeholder="Enter City"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-1">State</Label>
              <Input
                value={formdata.state}
                onChange={(e) => setFormData({ ...formdata, state: e.target.value })}
                type="text"
                placeholder="Enter State"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Address</Label>
            <Input
              value={formdata.address}
              onChange={(e) => setFormData({ ...formdata, address: e.target.value })}
              type="text"
              placeholder="Add address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Shop Picture</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full px-4 border text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 cursor-pointer"
            />
            {formdata.shopImage && (
              <div className="mt-4">
                <img
                  src={formdata.shopImage}
                  alt={formdata.name}
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <Button className="w-full cursor-pointer">Save</Button>
        </form>
      </div>
    </div>
  );
}

export default CreateEditShop;
