class Sidenav extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <style>
      body {
        margin: 0px;
        background-color: #F4F3F9;
      }

      .homebutton-container > * {
        color: white;
        text-decoration: none;
      }
      
      .sidenav {
        height: 100%;
        width: 200px;
        position: static;
        display: inline-block;
        top: 0;
        left: 0;
        background-color: white;
        padding-bottom: 10000px;
      }

      .sidenav > * {
        padding-left: 20px;
        padding-top: 10px;
      }

      .sidenav a, .sidenav p {
        color: black;
        text-decoration: none;
        margin: 0;
      }

      .product-container, .order-container, .report-container, .setting-container {
        display: flex;
        flex-direction: column;
      }

      .sidebar-child-item {
        display: block;
        margin-left: 5px;
      }

    </style>

    <div class="sidenav">
      <div class="dashboard-container">
        <a href="./dashboard.html">Dashboard</a>
      </div>
      <div class="product-container">
        <p href="./product.html">Product</p>
        <a class="sidebar-child-item" href="./product.html">My Product</a>
        <a class="sidebar-child-item" href="./add-new-product.html">Add Product</a>
      </div>
      <div class="order-container">
        <p href="./order.html">Order</p>
        <a class="sidebar-child-item" href="./order.html">My Order</a>
      </div>
      <div class="report-container">
        <p>Report</p>
        <a class="sidebar-child-item" href="./sales-overview.html">Sales Overview</a>
      </div>
      <div class="setting-container">
        <p>Setting</p>
        <a class="sidebar-child-item" href="./setting-shop.html">Shop Profile</a>
        <a class="sidebar-child-item" href="./setting-personal.html">My Account</a>
      </div>
    </div>
    `;
  }
}

window.customElements.define("side-nav", Sidenav);

// class Sidenav extends HTMLElement {
//   constructor() {
//     super();
//     this.innerHTML = `
//     <style>
//       body {
//         min-height: 100vh;
//         min-height: -webkit-fill-available;
//       }

//       html {
//         height: -webkit-fill-available;
//       }

//       main {
//         height: 100vh;
//         height: -webkit-fill-available;
//         max-height: 100vh;
//         overflow-x: auto;
//         overflow-y: hidden;
//       }

//       .sidebar-dropdown-toggle { outline: 0; }

//       .sidebar-btn-toggle {
//         padding: .25rem .5rem;
//         font-weight: 600;
//         color: rgba(0, 0, 0, .65);
//         background-color: transparent;
//       }
//       .sidebar-btn-toggle:hover,
//       .sidebar-btn-toggle:focus {
//         color: rgba(0, 0, 0, .85);
//         background-color: #d2f4ea;
//       }

//       .sidebar-btn-toggle::before {
//         width: 1.25em;
//         line-height: 0;
//         content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
//         transition: transform .35s ease;
//         transform-origin: .5em 50%;
//       }

//       .sidebar-btn-toggle[aria-expanded="true"] {
//         color: rgba(0, 0, 0, .85);
//       }
//       .sidebar-btn-toggle[aria-expanded="true"]::before {
//         transform: rotate(90deg);
//       }

//       .sidebar-btn-toggle-nav a {
//         padding: .1875rem .5rem;
//         margin-top: .125rem;
//         margin-left: 1.25rem;
//       }
//       .sidebar-btn-toggle-nav a:hover,
//       .sidebar-btn-toggle-nav a:focus {
//         background-color: #d2f4ea;
//       }

//       .sidebar-scrollarea {
//         overflow-y: auto;
//       }

//     </style>

//     <div class="flex-shrink-0 p-3 bg-white" style="width: 280px;">
//       <a href="/" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
//         <svg class="bi pe-none me-2" width="30" height="24"><use xlink:href="#bootstrap"/></svg>
//         <span class="fs-5 fw-semibold">Collapsible</span>
//       </a>
//       <ul class="list-unstyled ps-0">
//         <li class="mb-1">
//           <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
//             Home
//           </button>
//           <div class="collapse show" id="home-collapse">
//             <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Overview</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Updates</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Reports</a></li>
//             </ul>
//           </div>
//         </li>
//         <li class="mb-1">
//           <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
//             Dashboard
//           </button>
//           <div class="collapse" id="dashboard-collapse">
//             <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Overview</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Weekly</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Monthly</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Annually</a></li>
//             </ul>
//           </div>
//         </li>
//         <li class="mb-1">
//           <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
//             Orders
//           </button>
//           <div class="collapse" id="orders-collapse">
//             <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">New</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Processed</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Shipped</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Returned</a></li>
//             </ul>
//           </div>
//         </li>
//         <li class="border-top my-3"></li>
//         <li class="mb-1">
//           <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
//             Account
//           </button>
//           <div class="collapse" id="account-collapse">
//             <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">New...</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Profile</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Settings</a></li>
//               <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Sign out</a></li>
//             </ul>
//           </div>
//         </li>
//       </ul>
//     </div>
//     `;
//   }
// }

// window.customElements.define("side-nav", Sidenav);
