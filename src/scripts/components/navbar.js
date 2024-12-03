class NavigationBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
  <header class="header">
    <div class="header__inner">
      <h1 class="header__title">Bayu Food</h1>
    </div>
    <button id="menu" class="header__menu" aria-label="Toggle menu">☰</button>
    <nav id="drawer" class="nav">
      <ul class="nav__list">
        <li class="nav__item"><a href="/">Home</a></li>
        <li class="nav__item"><a href="#/favorite">Favorite</a></li>
        <li class="nav__item"><a href="https://www.linkedin.com/in/bayuwinata/" target="_blank">About
            Us</a></li>
      </ul>
    </nav>
  </header>
            `;
  }
}

customElements.define('navigation-bar', NavigationBar);
