import connectToDB from "@/database";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const addNewProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  size: Joi.string().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  imageUrl: Joi.string().required(),
  priceDrop: Joi.number().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();

    const user = "admin";

    if (user === "admin") {
      const extractData = await req.json();

      const {
        name,
        price,
        description,
        category,
        size,
        deliveryInfo,
        onSales,
        imageUrl,
        priceDrop,
      } = extractData;

      const {error} = addNewProductSchema.validate(
        name,
        price,
        description,
        category,
        size,
        deliveryInfo,
        onSales,
        imageUrl,
        priceDrop
      );
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newCreatedProduct= await Product.create(extractData)

    } else {
      return NextResponse.json({
        success: false,
        message: "Não esta autorizado",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Algo está errado, tente novamente mais tarde",
    });
  }
}
