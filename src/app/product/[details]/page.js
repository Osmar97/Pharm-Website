import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/app/services/product";

export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);

  console.log(productDetailsData, "osmar");

  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
}