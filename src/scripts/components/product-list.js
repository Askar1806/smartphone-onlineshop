import { getProducts } from "../api/products";
import Renderer from "./renderer";
import Card from "./card";

class ProductList {
  constructor({ cartProducts }) {
    this.cartProducts = cartProducts;
    this.products = [];
  }

  getHTML() {
    return `
            <ul class="products__list">
                <span class="loader">Loading...</span>
            </ul>
            `;
  }

  initSearchListener() {
    const productSearch = document.querySelector(".header__wrapper-search");
    const productsList = document.querySelector(".products__list");

    productSearch.addEventListener("input", (e) => {
      const cards = productsList.querySelectorAll(".products__card");
      const filteredCards = [...cards].filter(
        (card) =>
          card.dataset.model
            .toLowerCase()
            .search(e.target.value.toLowerCase()) !== -1
      );

      cards.forEach((card) => {
        const isFoundCard = filteredCards.find(
          (filteredCard) => filteredCard.dataset.model === card.dataset.model
        );
        isFoundCard
          ? card.classList.remove("display-none")
          : card.classList.add("display-none");
      });
    });
  }

  async init() {
    const loader = document.querySelector(".loader");

    try {
      const products = await getProducts();
      this.products = products;
      loader.remove();

      products.forEach((product) => {
        const card = new Card({
          params: product,
          cartProducts: this.cartProducts,
        });
        new Renderer({
          parentSelector: ".products__list",
          elementHTML: card.getHTML(),
        }).render();
        card.initListeners();
      });
      this.initSearchListener();
    } catch (e) {
      console.log(e);
      new Renderer({
        parentSelector: ".products__list",
        elementHTML: "<p>Network error</p>",
      }).render();
    } finally {
      loader.remove();
    }
  }
}

export default ProductList;
