const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const dayjs = require("dayjs");

// Middlewares
app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))); // bootstrap
app.use(express.static(path.join(__dirname, "../client/public")));

// Initialize Firestore Database
var admin = require("firebase-admin");
var serviceAccount = require("./odds-38a12-firebase-adminsdk-a78ds-968ad08bf3.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://odds-38a12-default-rtdb.firebaseio.com",
});
const db = admin.firestore();

// URL routing - exact match with browser url
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/add-product.html"));
});

// DASHBOARD PAGE
app.get("/dashboard", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dashboard.html"));
});

// MY PRODUCT PAGE
app.get("/my-product", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/my-product.html"));
});

// ADD NEW PRODUCT PAGE
app.get("/add-product", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/add-product.html"));
});

// MY ORDER PAGE
app.get("/my-order", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/my-order.html"));
});

// EDIT ORDER DETAIL PAGE
app.get("/order-detail", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/order-detail.html"));
});

// SALES OVERVIEW
app.get("/sales-overview", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/sales-overview.html"));
});

// MY ACCOUNT PAGE
app.get("/my-account", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/my-account.html"));
});

// SHOP PROFILE PAGE
app.get("/shop-profile", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/shop-profile.html"));
});

// APIs
// GET ORDER STATUS NUMBER - FOR DASHBOARD PAGE
app.get("/getOrderStatus", async (req, res) => {
  // Get a reference form order collection
  const orderRef = db.collection("order");

  // Get the query snapshot for collection
  const orderSnapshot = await orderRef.get();

  // Initialize an object to hold the order counts for each status
  const orderCounts = {
    UNPAID: 0,
    "TO-PACK": 0,
    "TO-DELIVER": 0,
    COMPLETED: 0,
    CANCELLED: 0,
  };

  // Iterate through the orders and update the count for each status
  orderSnapshot.docs.forEach((item) => {
    const status = item.data().order_status;
    orderCounts[status] += 1;
  });

  res.json(orderCounts);
});

// GET MONTHLY REVENUE - FOR DASHBOARD PAGE
app.get("/getMonthlyRevenue", async (req, res) => {
  // Get a reference form order collection
  const orderRef = db.collection("order");

  // Get the query snapshot for collection
  const orderSnapshot = await orderRef.get();

  // Initialize an object to hold the subtotal for each order
  const orderSubtotal = {};

  // Iterate through the orders and update the subtotal for each order
  orderSnapshot.docs.forEach((item) => {
    const orderID = item.id;
    const subtotal = item.data().subtotal;
    orderSubtotal[orderID] = subtotal;
  });

  res.json(orderSubtotal);
  console.log(orderSubtotal);
});

// // GET MONTHLY REVENUE - FOR DASHBOARD PAGE
// app.get("/getMonthlyRevenue", async (req, res) => {
//   // get a reference to the order collection
//   const orderRef = db.collection("order");

//   // create an object to hold the total revenue for each month
//   const totalRevenueByMonth = {};

//   // create an array of month names
//   const monthNames = [
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // iterate through the months of the year
//   for (let month = 0; month < monthNames.length; month++) {
//     try {
//       // create a start and end date for the month
//       const year = 2022;
//       const startOfMonth = new Date(year, month, 1);
//       const endOfMonth = new Date(year, month + 1, 0);

//       // create Timestamp objects for the start and end dates
//       const startTimestamp = admin.firestore.Timestamp.fromDate(startOfMonth);
//       const endTimestamp = admin.firestore.Timestamp.fromDate(endOfMonth);

//       // query the order collection to retrieve the data for the desired time period
//       const query = orderRef
//         .where("date", ">=", startTimestamp)
//         .where("date", "<=", endTimestamp);

//       // get the query snapshot
//       const snapshot = await query.get();

//       // sum the revenue for each order in the month
//       let totalRevenue = 0;
//       await snapshot.forEach(async (doc) => {
//         // get the ordered_product subcollection for the order
//         const orderedProductRef = doc.ref.collection("ordered_product");

//         // get the snapshot of the ordered_product subcollection
//         const orderedProductSnapshot = await orderedProductRef.get();

//         // sum the subtotal for each product in the ordered_product subcollection
//         let orderRevenue = 0;
//         orderedProductSnapshot.forEach((productDoc) => {
//           orderRevenue += productDoc.data().subtotal;
//         });

//         // add the total revenue for the order to the month's total revenue
//         totalRevenue += orderRevenue;
//       });

//       // add the total revenue for the month to the object
//       totalRevenueByMonth[monthNames[month]] = totalRevenue;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   console.log(totalRevenueByMonth);
//   // output: { "July": 1000, "August": 2000, "September":
// });

// GET ALL PRODUCTS - FOR MY PRODUCT PAGE
// app.get("/getProducts", async (req, res) => {
//   // Get a reference form product collection
//   const productRef = db.collection("product");

//   // Get the query snapshot for collection
//   const productSnapshot = await productRef.get();

//   // Initialize an array to hold the product objects
//   const products = [];

//   // Wrap the loop in an async function
//   const addProductData = async () => {
//     // Create an array of product promises
//     const productPromises = productSnapshot.docs.map(async (item) => {
//       // Get the query snapshot for the variation collection
//       const variationSnapshot = await item.ref.collection("variation").get();

//       // Create an array of variation promises
//       const variationPromises = variationSnapshot.docs.map((variation) => {
//         // Create a promise to add the variation data to the variations array
//         return new Promise((resolve) => {
//           // Create an object for the variation
//           const product = {
//             sku: item.id + "-" + variation.id,
//             category: item.data().under_category,
//             name: item.data().product_name,
//             variation_price: "RM" + variation.data().variation_price,
//             variation_stock: variation.data().variation_stock,
//             stock_status:
//               variation.data().variation_stock > 10
//                 ? "In Stock"
//                 : "Out of Stock",
//           };

//           // Add the product object to the products array
//           products.push(product);

//           // Resolve the promise
//           resolve();
//         });
//       });

//       // Wait for all of the variation promises to resolve
//       await Promise.all(variationPromises);
//     });

//     // Wait for all of the product promises to resolve
//     await Promise.all(productPromises);
//   };

//   // Call the async function
//   await addProductData();

//   console.log(JSON.stringify(products, null, 2));

//   console.log("Number of products:", products.length);
//   console.log("GET all products successfully");

//   res.json(products);
// });

// GET ALL PRODUCTS - FOR ADD PRODUCT PAGE (FOR DROPDOWN) - USING PRODUCTS COLLECTION
app.get("/getProducts", async (req, res) => {
  // Get a reference to the products collection
  const productsRef = db.collection("products");

  // Get the query snapshot for the products collection
  const productsSnapshot = await productsRef.get();

  // Initialize an array to hold the product objects
  const products = [];

  // Wrap the loop in an async function
  const addProductData = async () => {
    // Create an array of product promises
    const productPromises = productsSnapshot.docs.map(async (item) => {
      // Create an object for the product
      const product = {
        product_id: item.id,
        image: item.data().image,
        price: item.data().price,
        product_description: item.data().product_description,
        product_name: item.data().product_name,
        product_status: item.data().product_status,
        sold_item: item.data().sold_item,
        stock: item.data().stock,
        under_category: item.data().under_category, // mapping needed
        stock_status: "IN STOCK", // default value
      };

      // Determine the stock_status based on the stock number
      if (product.stock === 0) {
        product.stock_status = "OUT OF STOCK";
      } else if (product.stock < 10) {
        product.stock_status = "RESTOCK NEEDED";
      }

      if (item.data().product_rating) {
        product.product_rating = item.data().product_rating;
      }

      // Return the product object
      return product;
    });

    // Wait for all of the product promises to resolve
    const resolvedProducts = await Promise.all(productPromises);

    // Add the resolved products to the products array
    products.push(...resolvedProducts);
  };

  // Call the async function
  await addProductData();

  // console.log(JSON.stringify(products, null, 2));
  // console.log("Number of products:", products.length);
  // console.log("GET all products successfully");

  res.json(products);
});

// GET ALL CATEGORIES - FOR ADD PRODUCT PAGE
app.get("/getCategories", async (req, res) => {
  // Get a reference to the category collection
  const categoriesRef = db.collection("category");

  // Get the query snapshot for the category collection
  const categoriesSnapshot = await categoriesRef.get();
  // console.log("Orders snapshot:", ordersSnapshot);

  const categories = [];

  const addCategoryData = async () => {
    const categoryPromises = categoriesSnapshot.docs.map(async (item) => {
      // Create an object for the category
      const category = {
        category_id: item.id,
        category_name: item.data().category_name,
        icon_url: item.data().icon_url,
        product_quantity: item.data().product_quantity,
      };

      // Return the category object
      return category;
    });

    // Wait for all of the order promises to resolve
    const resolvedCategories = await Promise.all(categoryPromises);

    // Add the resolved orders to the orders array
    categories.push(...resolvedCategories);
  };

  // Call the async function
  await addCategoryData();

  // console.log(JSON.stringify(categories, null, 2));
  // console.log("Number of categories:", categories.length);
  // console.log("GET all categories successfully");

  res.json(categories);
});

// POST ONE PRODUCT - FOR ADD PRODUCT PAGE
app.post("/postProduct", (req, res) => {
  // get the form data from the request body
  const price = req.body.price;
  const product_name = req.body.product_name;
  const product_description = req.body.product_description;
  const stock = req.body.stock;
  const under_category = req.body.under_category;

  // image & owned by

  // Get a reference to the products collection
  const productsRef = db.collection("test-collection");

  // Get a list of cities from your database
  productsRef.doc("0001").set({
    // price: Math.round(price * 100) / 100,
    price: parseFloat(price),
    product_description: product_description,
    product_name: product_name,
    // product_status: product_status,
    sold_item: 0,
    stock: parseFloat(stock),
    under_category: under_category,
  });

  // send a response to the client
  console.log("Form submitted successfully");
  res.send("Form submitted successfully");
});

// GET ALL ORDER - FOR MY ORDER PAGE
app.get("/getOrders", async (req, res) => {
  // Get a reference to the orders collection
  const ordersRef = db.collection("order");

  // Get the query snapshot for the orders collection
  const ordersSnapshot = await ordersRef.get();
  // console.log("Orders snapshot:", ordersSnapshot);

  // Initialize an array to hold the order objects
  const orders = [];

  let sales_revenue = 0;

  // Wrap the loop in an async function
  const addOrderData = async () => {
    // Create an array of order promises
    const orderPromises = ordersSnapshot.docs.map(async (item) => {
      // Create an object for the order
      const order = {
        order_id: item.id,
        delivery_method: item.data().delivery_method,
        delivery_time: item.data().delivery_time,
        order_amount: item.data().order_amount,
        order_by: item.data().order_by,
        order_date: dayjs(item.data().order_date.toDate().toISOString()).format(
          "DD MMM YYYY"
        ),
        order_status: item.data().order_status,
        payment_method: item.data().payment_method,
        products: [],
        address: [],
        order_number: ordersSnapshot.size,
      };

      // order.push({ salesRevenue: sum });

      // console.log(
      //   "dayjs " + dayjs(item.data().order_date).format("DD MMM YYYY")
      // );

      // Get the query snapshot for the products subcollection
      const productsSnapshot = await item.ref
        .collection("ordered_product")
        .get();

      // Create an array of product promises
      const productPromises = productsSnapshot.docs.map((product) => {
        // Create a promise to add the product data to the products array
        return new Promise((resolve) => {
          // Create an object for the product
          const productsData = {
            sku: product.id,
            name: product.data().product_name,
            quantity: product.data().quantity,
          };

          // Add the product object to the products array
          order.products.push(productsData);

          // Resolve the promise
          resolve();
        });
      });

      const addressSnapshot = await item.ref.collection("address").get();

      const addressPromises = addressSnapshot.docs.map((address) => {
        // Create a promise to add the product data to the products array
        return new Promise((resolve) => {
          // Create an object for the product
          const addressData = {
            address_id: address.id,
            addr1: address.data().addr1,
            addr2: address.data().addr2,
            city: address.data().city,
            postcode: address.data().postcode,
            receiver_name: address.data().receiver_name,
            receiver_tel: address.data().receiver_tel,
            state: address.data().state,
          };

          // Add the product object to the products array
          order.address.push(addressData);

          // Resolve the promise
          resolve();
        });
      });

      // Wait for all of the product promises to resolve
      await Promise.all(productPromises);
      await Promise.all(addressPromises);
      // console.log("productPromises" + productPromises);

      // Return the order object
      return order;
    });

    // Wait for all of the order promises to resolve
    const resolvedOrders = await Promise.all(orderPromises);

    // Add the resolved orders to the orders array
    orders.push(...resolvedOrders);
  };

  // Call the async function
  await addOrderData();

  console.log(JSON.stringify(orders, null, 2));
  console.log("Number of orders:", orders.length);
  console.log("GET all orders successfully");

  res.json(orders);
});

// GET ONE ORDER - FOR EDIT ORDER DETAIL PAGE
app.get("/getOrderDetail", async (req, res) => {
  const { order_id } = req.query;
  // Get a reference to the specific order document
  const orderRef = db.collection("order").doc(order_id);
  // Get the order snapshot
  const orderSnapshot = await orderRef.get();
  // Check if the order exists
  if (!orderSnapshot.exists) {
    return res.status(404).send({ error: "Order not found" });
  }
  // Create an object for the order
  const order = {
    order_id: orderSnapshot.id,
    // order_amount: orderSnapshot.data().order_amount,
    order_date: orderSnapshot.data().order_date.toDate(),
    order_status: orderSnapshot.data().order_status,
    products: [],
  };
  // Get the query snapshot for the products subcollection
  const productsSnapshot = await orderRef.collection("ordered_product").get();
  // Create an array of product promises
  const productPromises = productsSnapshot.docs.map((product) => {
    // Create a promise to add the product data to the products array
    return new Promise((resolve) => {
      // Create an object for the product
      const productsData = {
        sku: product.id,
        name: product.data().product_name,
        quantity: product.data().quantity,
      };
      // Add the product object to the products array
      order.products.push(productsData);
      // Resolve the promise
      resolve();
    });
  });
  // Wait for all of the product promises to resolve
  await Promise.all(productPromises);
  // Return the order object
  // res.sendFile(path.resolve(__dirname, "../client/order-detail.html"));`
  res.json(order);
  console.log(order);
});

// GET ALL ORDER - FOR MY ORDER PAGE
app.get("/getProductRanking", async (req, res) => {
  // Get a reference to the orders collection
  const ordersRef = db.collection("order");

  // Get the query snapshot for the orders collection
  const ordersSnapshot = await ordersRef.get();
  // console.log("Orders snapshot:", ordersSnapshot);

  // Initialize an array to hold the order objects
  const orders = [];

  // Initialize a new array to hold the ordered products
  let orderedProducts = [];

  // variables to calculate product ranking
  const productRanking = [];
  let currentRank = 1;

  // Wrap the loop in an async function
  const addOrderData = async () => {
    // Create an array of order promises
    const orderPromises = ordersSnapshot.docs.map(async (item) => {
      // Create an object for the order
      const order = {
        order_id: item.id,
        delivery_method: item.data().delivery_method,
        delivery_time: item.data().delivery_time,
        order_amount: item.data().order_amount,
        order_by: item.data().order_by,
        order_date: dayjs(item.data().order_date.toDate().toISOString()).format(
          "DD MMM YYYY"
        ),
        order_status: item.data().order_status,
        payment_method: item.data().payment_method,
        products: [],
        address: [],
        order_number: ordersSnapshot.size,
      };

      // order.push({ salesRevenue: sum });

      // console.log(
      //   "dayjs " + dayjs(item.data().order_date).format("DD MMM YYYY")
      // );

      // Get the query snapshot for the products subcollection
      const productsSnapshot = await item.ref
        .collection("ordered_product")
        .get();

      // Create an array of product promises
      const productPromises = productsSnapshot.docs.map((product) => {
        // Create a promise to add the product data to the products array
        return new Promise((resolve) => {
          // Create an object for the product
          const productsData = {
            sku: product.data().SKU,
            price: product.data().price,
            name: product.data().product_name,
            quantity: product.data().quantity,
          };

          // Add the product object to the products array
          order.products.push(productsData);

          // Resolve the promise
          resolve();
        });
      });

      const addressSnapshot = await item.ref.collection("address").get();

      const addressPromises = addressSnapshot.docs.map((address) => {
        // Create a promise to add the product data to the products array
        return new Promise((resolve) => {
          // Create an object for the product
          const addressData = {
            address_id: address.id,
            addr1: address.data().addr1,
            addr2: address.data().addr2,
            city: address.data().city,
            postcode: address.data().postcode,
            receiver_name: address.data().receiver_name,
            receiver_tel: address.data().receiver_tel,
            state: address.data().state,
          };

          // Add the product object to the products array
          order.address.push(addressData);

          // Resolve the promise
          resolve();
        });
      });

      // Wait for all of the product promises to resolve
      await Promise.all(productPromises);
      await Promise.all(addressPromises);
      // console.log("productPromises" + productPromises);

      // Return the order object
      return order;
    });

    // Wait for all of the order promises to resolve
    const resolvedOrders = await Promise.all(orderPromises);

    // Add the resolved orders to the orders array
    // orders.push(...resolvedOrders);

    // Iterate over the resolved orders
    for (const order of resolvedOrders) {
      // Iterate over the products in each order
      for (const product of order.products) {
        // Check if the product already exists in the productRanking array
        const existingProduct = productRanking.find(
          (p) => p.sku === product.sku
        );
        if (existingProduct) {
          // If the product already exists, update the sales and quantity for that product
          existingProduct.sales += product.quantity * product.price;
          existingProduct.quantity += product.quantity;
        } else {
          // If the product doesn't exist, create a new object for the product in the productRanking array
          productRanking.push({
            product_ranking: currentRank,
            product_name: product.name,
            sales: product.quantity * product.price,
            quantity: product.quantity,
          });
          // Increment currentRank by 1
          currentRank++;
        }
        // Create an object for the ordered product with the product name, quantity, and sales
        let orderedProducts = {
          sku: product.sku,
          product_name: product.name,
          quantity: product.quantity,
          sales: product.quantity * product.price,
        };

        // console.log("productRanking" + productRanking);
      }
    }

    // Now that you have an array of all the ordered products, you can sort it by sales and return the sorted array as the response
  };

  // Call the async function
  await addOrderData();

  // console.log(JSON.stringify(orderedProducts, null, 2));
  // console.log("Number of orders:", orderedProducts.length);
  // console.log("GET all orders successfully");

  // console.log("orderedProduct" + orderedProducts);
  // res.json(orderedProducts);

  console.log(JSON.stringify(productRanking, null, 2));
  console.log("Number of orders:", productRanking.length);
  console.log("GET all orders successfully");

  res.json(productRanking);
});

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});

/**
 * Steps to git push to github
 * 1. git add .
 * 2. git commit -m "message"
 * 3. git push
 */
