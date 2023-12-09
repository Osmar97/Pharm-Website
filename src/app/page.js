"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/app/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import saudei from "@/components/img/img1.jpg"
import man from "@/components/img/img2.jpg"
import woman from "@/components/img/img3.jpg"
import bela from "@/components/img/img4.jpg"

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  const categories = [
    { name: "SAUDE", image:saudei },
    { name: "MULHER", image: woman },
    { name: "HOMEM", image: man },
    {name:"BELEZA",image: bela}
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 sm:p-16 bg-gray-100 mt-20">
      <section className="mb-8">
        <div className="grid max-w-screen-xl mx-auto lg:grid-cols-12">
          <div className="mr-auto lg:col-span-7">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-green-500">
              Farmacia Lobo
            </h1>
            <p className="mb-6 text-gray-700 lg:mb-8 md:text-lg lg:text-xl">
              Estamos cá quando é preciso
            </p>
            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-1.5 inline-block bg-green-500 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-green-600"
            >
              Nossos produtos
            </button>
          </div>
            Meter o corrosel 
        </div>
      </section>
      <section className=" mb-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-green-500 sm:text-3xl">
              Shop by Category
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {categories.map((category) => (
              <li key={category.name}>
                <div className="relative block group">
                <div className="overflow-hidden rounded-full">
                <Image
                    src={category.image}
                    alt={category.name}
                    width={120}
                    height={120}
                    className="object-cover w-full h-20 rounded-full"
                  />
                   </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <h3 className="text-lg font-medium text-white">{category.name}</h3>
                    <button
                      onClick={() => router.push(`/product/listing/${category.name.toLowerCase()}`)}
                      className="mt-1.5 inline-block bg-green-500 px-1 py-1 text-xs uppercase tracking-wide text-white hover:bg-green-600 rounded-xl"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
