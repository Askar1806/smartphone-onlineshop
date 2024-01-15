import { getCartProducts } from "../api/cart";
import Renderer from "./renderer";
import Card from "./card";

class CartList {
  constructor() {}

  getHTML() {
    return `
            <ul class="cart__list">
                <span class="loader">Loading...</span>
            </ul>
        `;
  }

  async init() {
    const cartList = document.querySelector(".cart__list");
    const loader = cartList.querySelector(".loader");
    try {
      const products = await getCartProducts();
      loader.remove();

      products.forEach((product) => {
        const card = new Card({
          params: product,
          cartProducts: products,
        });
        new Renderer({
          parentSelector: ".cart__list",
          elementHTML: card.getHTML(),
        }).render();
        card.initListeners();
      });
    } catch (e) {
      console.log(e);
      new Renderer({
        parentSelector: ".cart__list",
        elementHTML: "<p>Network error</p>",
      }).render();
    } finally {
      loader.remove();
    }
  }
}

export default CartList;
