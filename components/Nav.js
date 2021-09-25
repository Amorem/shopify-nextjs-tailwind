import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/shopContext";
import MiniCart from "./MiniCart";

function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);
  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });
  return (
    <header className="sticky top-0 z-20 bg-white border-b">
      <div className="flex items-center justify-between max-w-6xl px-4 pt-4 pb-2 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <span className="pt-1 text-lg font-bold">Example Shop</span>
          </a>
        </Link>
        <a
          onClick={() => setCartOpen(!cartOpen)}
          className="font-bold cursor-pointer text-md"
        >
          Cart ({cartQuantity})
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  );
}

export default Nav;
