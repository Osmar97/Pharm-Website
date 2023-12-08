"use client";

import { Fragment, useContext, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { useRouter } from "next/navigation";
import { deleteFromCart, getAllCartItems } from "@/app/services/cart";

export default function CartModal() {
  const {
    showCartModal,
    setShowCartModal,
    cartItems,
    setCartItems,
    user,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();
  const [isCartButtonClick, setIsCartButtonClick] = useState(false);

  async function extractAllCartItems() {
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === "yes"
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price * (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }

    console.log(res);
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user, isCartButtonClick]);

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: getCartItemID });
    }
  }

  const handleCloseModal = () => {
    setShowCartModal(false);
  };

  const handleCartButtonClick = () => {
    setIsCartButtonClick(true);
    handleCloseModal();
    router.push("/cart");
  };

  const handleCheckoutButtonClick = () => {
    setIsCartButtonClick(true);
    handleCloseModal();
    router.push("/checkout");
  };

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      onClose={handleCloseModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="-my-6 divide-y divide-gray-300">
            {/* ... Your cart item list goes here ... */}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            type="button"
            onClick={handleCartButtonClick}
            className="mt-1.5 w-full inline-block bg-green-500 text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Ir para o carrinho
          </button>
          <button
            disabled={cartItems && cartItems.length === 0}
            type="button"
            onClick={handleCheckoutButtonClick}
            className={`mt-1.5 w-full inline-block ${
              cartItems && cartItems.length === 0
                ? "bg-gray-500"
                : "bg-green-500"
            } text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50`}
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button type="button" className="font-medium text-gray-500">
              Continuar a comprar
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}