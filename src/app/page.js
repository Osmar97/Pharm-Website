"use client"

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/app/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import saudei from "@/components/img/img1.jpg";
import man from "@/components/img/img2.jpg";
import woman from "@/components/img/img3.jpg";
import bela from "@/components/img/img4.jpg";
import Slider from "@/components/slider";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    { name: "SAUDE", image: saudei },
    { name: "MULHER", image: woman },
    { name: "HOMEM", image: man },
    { name: "BELEZA", image: bela },
  ];


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-16 bg-gray-100 mt-20">
      <section>
        <div>
        <Slider/>
        </div>
      </section>
      <section className="">
        <div className="max-w-screen-xl mx-auto">
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-5 justify-center items-center">
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
                    <h3 className="text-lg font-medium text-white">
                      {category.name}
                    </h3>
                    <button
                      onClick={() =>
                        router.push(
                          `/product/listing/${category.name.toLowerCase()}`
                        )
                      }
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
