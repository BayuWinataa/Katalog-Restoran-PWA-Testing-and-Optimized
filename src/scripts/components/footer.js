class FooterElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
  <footer>
    <div class="footer-content">
      <p>Copyright © 2024 - Bayu Food</p>
      <p>Create with ❤️ by Bayu Winata</p>
    </div>
  </footer>
          `;
  }
}

customElements.define('footer-element', FooterElement);
