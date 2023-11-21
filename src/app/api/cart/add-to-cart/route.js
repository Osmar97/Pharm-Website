import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Product from "@/models/product";  // Import the Product model
import Joi from "joi";
import { NextResponse } from "next/server";

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();
      const { productID, userID } = data;

      const { error } = AddToCart.validate({ userID, productID });

      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const productDetails = await Product.findById(productID);

      if (!productDetails) {
        return NextResponse.json({
          success: false,
          message: "Produto não encontrado",
        });
      }

      if (productDetails.stock <= 0) {
        return NextResponse.json({
          success: false,
          message: "Produto fora de stock",
        });
      }

      const isCurrentCartItemAlreadyExists = await Cart.find({
        productID: productID,
        userID: userID,
      });

      if (isCurrentCartItemAlreadyExists?.length > 0) {
        return NextResponse.json({
          success: false,
          message:
            "O produto já foi adicionado ao carrinho! Por favor, adicione um produto diferente.",
        });
      }

      const saveProductToCart = await Cart.create(data);

      if (saveProductToCart) {
        return NextResponse.json({
          success: true,
          message: "Produto adicionado ao carrinho!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message:
            "Falha ao adicionar o produto ao carrinho! Por favor, tente novamente.",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Não está autorizado",
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      message: "Algo correu mal! Por favor, tente novamente.",
    });
  }
}
