import "./styles/index.scss";
import CartList from "./scripts/components/cart-list";
import Renderer from "./scripts/components/renderer";

const initCartList = async () => {
  const cartList = new CartList();
  new Renderer({
    parentSelector: ".cart .container",
    elementHTML: cartList.getHTML(),
    renderPosition: "beforeend",
  }).render();
  cartList.init();
};


initCartList();