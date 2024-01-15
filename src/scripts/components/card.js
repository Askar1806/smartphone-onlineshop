import { addProductToCart, deleteProductFromCart } from "../api/cart";
import Renderer from "./renderer";

class Card {
  constructor({ params, cartProducts }) {
    this.params = params;
    this.cartProducts = cartProducts;
  }

  get isAddedToCart() {
    return !!this.productFromCart;
  }

  get btn() {
    return document.querySelector(
      this.isAddedToCart
        ? `.products__delete-${this.params.id}`
        : `.products__add-${this.params.id}`
    );
  }

  get productFromCart() {
    return this.cartProducts.find(
      (cartProduct) => cartProduct.model === this.params.model
    );
  }

  get currentBtnHTML() {
    return this.isAddedToCart
      ? `<button class="products__delete products__delete-${this.params.id}"><img src="./assets/icons/delete.svg" class="products__delete-svg" alt="Delete"/></button>`
      : `<button class="products__add products__add-${this.params.id}"><img src="./assets/icons/add.svg" class="products__add-svg" alt="Add"/></button>`;
  }

  removeBtn() {
    this.btn.remove();
  }

  addBtn() {
    new Renderer({
      parentSelector: `.product__card-${this.params.id}`,
      elementHTML: this.currentBtnHTML,
      renderPosition: "beforeend",
    }).render();
  }

  toggleBtnDisabled() {
    this.btn.disabled = !this.btn.disabled;
  }

  addListenerToBtn() {
    if (this.isAddedToCart) {
      const deleteBtn = document.querySelector(
        `.products__delete-${this.params.id}`
      );

      deleteBtn.addEventListener("click", async () => {
        try {
          this.toggleBtnDisabled();
          const data = await deleteProductFromCart(this.productFromCart.id);
          this.removeBtn();
          this.cartProducts = this.cartProducts.filter(
            (product) => product.model !== this.productFromCart.model
          );
          this.addBtn();
          this.addListenerToBtn();
        } catch (e) {
          alert(e.message);
          this.toggleBtnDisabled();
        }
      });
    } else {
      const addBtn = document.querySelector(`.products__add-${this.params.id}`);

      addBtn.addEventListener("click", async () => {
        try {
          this.toggleBtnDisabled();
          const product = {
            ...this.params,
          };
          delete product.id;
          const newProduct = await addProductToCart(product);
          this.removeBtn();
          this.cartProducts = [...this.cartProducts, newProduct];
          this.addBtn();
          this.addListenerToBtn();
        } catch (e) {
          alert(e.message);
          this.toggleBtnDisabled();
        }
      });
    }
  }

  getHTML() {
    const { image, brand, model, price, id } = this.params;

    return `
        <li data-model="${brand} ${model}" class="products__card product__card-${id} cart__item">
          <div class="products__card-info">
            <img class="products__card-img" src="${image}" alt="${model}" />
            <h3 class="products__card-title">${brand} ${model}</h3>
            <p class="products__card-price"><strong>${price}$</strong></p>
          </div>
            ${this.currentBtnHTML}
        </li>
    `;
  }

  initListeners() {
    this.addListenerToBtn();
  }
}

export default Card;