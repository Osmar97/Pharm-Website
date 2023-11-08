"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import { adminAddProductformControls } from "@/utils";
import { useState } from "react";


const initialFormData = {
    name: "",
    price: 0,
    description: "",
    category: "men",
    size: "",
    deliveryInfo: "",
    onSale: "no",
    imageUrl: "",
    priceDrop: 0,
  };


function handleImage() {}

export default function AdminAddNewProduct() {

    const [formData, setFormData] = useState(initialFormData);

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
            <h1 className=" font-extrabold text-4xl font-sans"> Info do produto</h1>
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />
          <div className="flex gap-2 flex-col">
            {adminAddProductformControls.map((controlItem) =>
              controlItem.componentType === "input" ? (
                <InputComponent
                  type={controlItem.type}

                  placeholder={controlItem.placeholder}
                  
                  label={controlItem.label}
                  
                  value={formData[controlItem.id]}
    
                />
              ) : controlItem.componentType === "select" ? (
                <SelectComponent
                  label={controlItem.label}
                  options={controlItem.options}
                  value={formData[controlItem.id]}
                />
              ) : null
            )}
            <button 
            className="inline-flex w-full items-center rounded-lg bg-green-500 text-white justify-center px-6 py-4 text-lg font-bold uppercase tracking-wide">
                Adicionar produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
