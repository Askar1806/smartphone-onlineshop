class Renderer {
  constructor({
    parentSelector,
    element,
    elementHTML,
    renderPosition = "afterbegin",
    listeners,
  }) {
    this.parentElement = document.querySelector(parentSelector);
    this.element = element;
    this.elementHTML = elementHTML;
    this.renderPosition = renderPosition;
    this.listeners = listeners;
  }

  render() {
    if (this.element) {
      this.parentElement.append(this.element);
    }

    if (this.elementHTML) {
      this.parentElement.insertAdjacentHTML(
        this.renderPosition,
        this.elementHTML
      );
    }

    if (this.listeners) {
      this.listeners.forEach((listener) => {
        const elements = document.querySelectorAll(listener.selector);
        elements.forEach((el) =>
          el.addEventListener(listener.event, listener.callback)
        );
      });
    }
  }
}

export default Renderer;
