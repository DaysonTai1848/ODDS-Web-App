class Topnav extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <style>
      body {
        margin: 0px;
        background-color: #F4F3F9;
      }

      .topnav {
        display: flex;
        background-color: #4e457d;
        justify-content: space-between;
      }

      .topnav > * {
        padding: 10px;
        font-size: 2rem;
      }

      .homebutton-container > * {
        color: white;
        text-decoration: none;
      }

      .setting-container {
        color: white;
      }
      
    </style>

    <div class="topnav">
      <div class="homebutton-container">
        <a class="odds" href="#">ODDS</a>
        <a class="shop-management-system" href="#">Shop Management System</a>
      </div>
      <div class="setting-container">
        <a>Username</a>
      </div>
    </div>
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
