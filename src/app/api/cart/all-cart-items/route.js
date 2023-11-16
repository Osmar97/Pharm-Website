import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id)
        return NextResponse.json({
          success: false,
          message: "Por favor, faça o login!",
        });

      const extractAllCartItems = await Cart.find({ userID: id }).populate(
        "productID"
      );

      if (extractAllCartItems) {
        return NextResponse.json({ success: true, data: extractAllCartItems });
      } else {
        return NextResponse.json({
          success: false,
          message: "Não foram encontrados itens no carrinho!",
          status: 204,
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Não está autenticado",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Algo correu mal! Por favor, tente novamente",
    });
  }
}
