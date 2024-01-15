import "./styles/index.scss";
import ProductList from "./scripts/components/product-list";
import Renderer from "./scripts/components/renderer";
import { getCartProducts } from "./scripts/api/cart";
import store from "./scripts/redux/store";

const initProductList = async () => {
  const cartProducts = await getCartProducts();

  const productsList = new ProductList({ cartProducts });
  new Renderer({
    parentSelector: ".products .container",
    elementHTML: productsList.getHTML(),
    renderPosition: "beforeend",
  }).render();
  productsList.init();
};

initProductList();
