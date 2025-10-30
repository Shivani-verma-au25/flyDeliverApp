import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CategoryCard({ name ,image }) {
  return (
    <Card className="relative w-[120px] h-[120px] md:w-[180px] md:h-[180px] shrink-0 cursor-pointer max-w-sm rounded-2xl overflow-hidden bg-white shadow-xl shadow-gray-200 hover:shodow-lg transition-shadow">
        <img 
        className=" w-full h-full object-cover transform hover:scale-110 transition-transfrom duration-300 "
        src={image} alt="" />
        <div className="absolute bottom-0 w-full left-0 bg-[#ffffff96] bg-opacity-95 px-3 py-1 rounded-t-xl text-center shadow text-sm font-medium text-gray-800 backdrop-blur">{name}</div>
    </Card>
  );
}

export default CategoryCard;
