"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import {
  adminAddProductformControls,
  firebaseConfig,
  firebaseStorage,
} from "@/utils";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const app = initializeApp(firebaseConfig);

const storage = getStorage(app, firebaseStorage);

const createUniqueFileName = (getFile) => {
  const timeStamps = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamps}-${randomStringValue}`;
};

async function helperToUploadToFb(file) {
  const getFileName = createUniqueFileName(file);
  const storageRef = ref(storage, `pharm/${getFileName}`);
  const uploadImg = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadImg.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImg.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

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

export default function AdminAddNewProduct() {
  const [formData, setFormData] = useState(initialFormData);


  async function handleImage(event) {
    console.log(event.target.files);
    const extractImgUrl = await helperToUploadToFb(event.target.files[0]);
  
    console.log(extractImgUrl);
  
    if (extractImgUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImgUrl,
      });
    }
  }

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <h1 className=" font-extrabold text-4xl font-sans">
            {" "}
            Info do produto
          </h1>
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
                  key={`select-${controlItem.id}`}
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  label={controlItem.label}
                  value={formData[controlItem.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : controlItem.componentType === "select" ? (
                <SelectComponent
                  key={`select-${controlItem.id}`}
                  label={controlItem.label}
                  options={controlItem.options}
                  value={formData[controlItem.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : null
            )}
            <button className="inline-flex w-full items-center rounded-lg bg-green-500 text-white justify-center px-6 py-4 text-lg font-bold uppercase tracking-wide">
              Adicionar produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
