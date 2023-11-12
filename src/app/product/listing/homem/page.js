import { productByCategory } from "@/app/services/product";
import CommonListing from "@/components/CommonListing";


export default async function MenAllProducts() {
  const getAllProducts = await productByCategory("homem");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
