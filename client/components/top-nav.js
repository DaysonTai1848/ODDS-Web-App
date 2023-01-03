class Topnav extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <nav class="navbar bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand text-light fw-bold" href="#">
          <!-- <img
            src="/docs/5.2/assets/brand/bootstrap-logo.svg"
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          /> -->
          OODS Shop Management System
        </a>
      </div>
    </nav>
    `;
  }
}

window.customElements.define("top-nav", Topnav);

/***<div class="topnav">
      <div class="homebutton-container">
        <a class="odds" href="#">ODDS</a>
        <a class="shop-management-system" href="#">Shop Management System</a>
      </div>
      <div class="setting-container">
        <a>Username</a>
      </div>
    </div>
    <div class="sidebar"></div> */
