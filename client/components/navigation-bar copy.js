class NavigationBar extends HTMLElement {
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


      .sidenav-and-content {
        display: flex;
        flex-direction: row;
      }


      .homebutton-container > * {
        color: white;
        text-decoration: none;
      }

      .setting-container {
        color: white;
      }

      
      .sidenav {
        height: 100%;
        width: 200px;
        position: static;
        display: inline;
        top: 0;
        left: 0;
        background-color: white;
        padding-bottom: 10000px;
      }

      .sidenav > * {
        padding-left: 20px;
        padding-top: 10px;
      }

      .sidenav a {
        color: black;
        text-decoration: none;
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

    <div class="sidenav-and-content">
      <div class="sidenav">
        <div class="dashboard-container">
          <a href="dashboard">Dashboard</a>
        </div>
        <div class="product-container">
          <a href="product">Product</a>
        </div>
        <div class="order-container">
          <a href="order">Order</a>
        </div>
        <div class="report-container">
          <a href="report">Report</a>
        </div>
        <div class="setting-container">
          <a href="setting">Setting</a>
        </div>
      </div>
    `;
  }
}

window.customElements.define("navigation-bar", NavigationBar);

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
