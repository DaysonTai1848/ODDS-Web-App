// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dayjs = require("dayjs");

// Middlewares
app.use(cors());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))); // bootstrap
app.use(express.static(path.join(__dirname, "../client/public")));
app.use(express.static(path.join(__dirname, "../client/web_icon")));

// Initialize Firestore Database
var admin = require("firebase-admin");
var serviceAccount = require("./odds-38a12-firebase-adminsdk-a78ds-968ad08bf3.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://odds-38a12-default-rtdb.firebaseio.com",
});
const db = admin.firestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0TTeJNqO7DhKwhJkR13dmT2-245_ZoAo",
  authDomain: "odds-38a12.firebaseapp.com",
  databaseURL: "https://odds-38a12-default-rtdb.firebaseio.com",
  projectId: "odds-38a12",
  storageBucket: "odds-38a12.appspot.com",
  messagingSenderId: "948888911022",
  appId: "1:948888911022:web:8d2b477205aa82ef49c13f",
  measurementId: "G-LK9E235399",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const auth = admin.auth();
// URL routing - exact match with browser url
// app.post("/register", async (req, res) => {
//   const seller_name = req.body.seller_name;
//   const seller_email = req.body.seller_email;
//   const seller_username = req.body.seller_username;
//   const seller_password = req.body.seller_password;

//   const shop_name = req.body.shop_name;
//   const shop_rating = 0.0;
//   const shop_tel = req.body.shop_tel;
//   const shop_open = req.body.shop_open;
//   const shop_close = req.body.shop_close;
//   const shop_addr1 = req.body.shop_addr1;
//   const shop_addr2 = req.body.shop_addr2;
//   const shop_city = req.body.shop_city;
//   const shop_postcode = req.body.shop_postcode;
//   const shop_state = req.body.shop_state;
//   const shop_latitude = req.body.shop_latitude;
//   const shop_longitude = req.body.shop_longitude;

//   try {
//     const { user } = await auth.createUser({
//       email: seller_email,
//       password: seller_password,
//       displayName: seller_username,
//     });

//     const shopRef = db.collection("shop");
//     const currentCount = (await shopRef.get()).size;
//     let count = currentCount;
//     count++;
//     let shopid = "SH0000" + count;

//     // Insert additional data into Firestore
//     await db.collection("seller").doc(seller_email).set({
//       seller_name: seller_name,
//       seller_username: seller_username,
//       seller_email: seller_email,
//       seller_password: seller_password,
//     });

//     // Insert additional data into Firestore
//     await db.collection("shop").doc(shopid).set({
//       shop_owner: seller_name,
//       shop_name: shop_name,
//       shop_rating: shop_rating,
//       shop_tel: shop_tel,
//       shop_open: shop_open,
//       shop_close: shop_close,
//       shop_addr1: shop_addr1,
//       shop_addr2: shop_addr2,
//       shop_city: shop_city,
//       shop_postcode: shop_postcode,
//       shop_state: shop_state,
//       shop_latitude: shop_latitude,
//       shop_longitude: shop_longitude,
//     });

//     res.send("User registered successfully!");
//     res.sendFile(path.resolve(__dirname, "../client/login.html"));
//   } catch (error) {
//     res.send("Error: " + error);
//   }
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   console.log(email);
//   console.log(password);

//   const auth = getAuth();
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in
//       const user = userCredential.user;
//       res.redirect("/dashboard");
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log("Login failed");
//       res.redirect("/login");
//     });
// });

// URL routing - exact match with browser url
app.get("/", (req, res) => {
  //res.sendFile(path.resolve(__dirname, "../client/dashboard.html"));
  res.sendFile(path.resolve(__dirname, "../client/register.html"));
});

// LOGIN PAGE
app.get("/login", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/login.html"));
});

// URL routing - exact match with browser url
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/add-product.html"));
// });

// app.post("/forgotpass", (req, res) => {
//   const { email } = req.body;
//   console.log(email);

//   const auth = getAuth();

//   sendPasswordResetEmail(auth, email)
//     .then(() => {
//       res.send("Password reset email sent");
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log("Login failed");
//       res.redirect("/login");
//     });
// });

app.get("/profile", (req, res) => {
  const auth = getAuth();
  const user = auth.currentUser;
  //console.log(email)
  // Get a reference to the Firestore database
  const db = admin.firestore();
  //console.log("EMAIL: "+user.email);

  if (user) {
    // Get the user data from the 'users' collection, using the user's email as the document ID
    const userRef = db.collection("seller").doc(user.email);
    console.log(user.email);

    // Get the user data
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          //  // Set the value of the input field to the user's name
          //  document.getElementById('user-name').value = doc.data().seller_name;
          //alert("Hello");
          console.log(doc.data());
        } else {
          console.log("No such document!");
        }
        //res.redirect("/profile");
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    res.json();
    res.sendFile(path.resolve(__dirname, "../client/my-account.html"));
  } else {
    res.redirect("/login");
  }
});

// app.get("/getAccount", (req, res) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   // create an array
//   const accountData = [
//     {
//       email: user.email,
//     },
//   ];

//   res.json(accountData);
// });

// DASHBOARD PAGE
app.get("/dashboard", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dashboard.html"));
});

// MY PRODUCT PAGE
app.get("/my-product", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/my-product.html"));
});

// EDIT PRODUCT DETAIL PAGE
app.get("/product-detail", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/product-detail.html"));
});

// ADD NEW PRODUCT PAGE
app.get("/add-product", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/add-product.html"));
});

// MY ORDER PAGE
app.get("/my-order", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/my-order.html"));
});

// UPDATE ORDER STATUS - FOR MY ORDER PAGE
app.put("/editOrderStatus", (req, res) => {
  // Get order ID and order status from the request body
  const id = req.body.id;
  const order_status = req.body.order_status;

  // Get a reference to the Firestore database
  const orderRef = db.collection("order").doc(id);
  orderRef
    // Update the order status
    .update({ order_status: order_status })
    .then(() => {
      res.json({ message: "Order status updated successfully." });
    })
    // Handle errors
    .catch((error) => {
      res
        .status(500)
        .json({ message: `Error updating order status: ${error}` });
    });
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

// GET ORDER STATUS NUMBER - FOR DASHBOARD PAGE
app.get("/getOrderStatusFiltered", async (req, res) => {
  var start_date = dayjs(req.query.start_date).toDate();
  var end_date = dayjs(req.query.end_date).toDate();

  // Get a reference form order collection
  const orderRef = db
    .collection("order")
    .where("order_date", ">", start_date)
    .where("order_date", "<", end_date);

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
  // var start_date = req.body
  // start and end date for filter
  //Convert the start_date and end_date to timestamp using day.js
  // start_date = dayjs(start_date, "DD/MM/YYYY").unix();
  // end_timestamp = dayjs(end_date, "DD/MM/YYYY").unix();

  // Get a reference to the orders collection
  const ordersRef = db.collection("order");

  // Get the query snapshot for the orders collection
  const ordersSnapshot = await ordersRef.get();
  // let query = collectionRef
  //   .where("order_date", ">=", start_date)
  //   .where("order_date", "<=", end_date);

  // Initialize an array to hold the order objects
  const orders = [];

  // Wrap the loop in an async function
  const addOrderData = async () => {
    // Create an array of order promises
    const orderPromises = ordersSnapshot.docs.map(async (item) => {
      // Create an object for the order
      const order = {
        order_id: item.id,
        // delivery_method: item.data().delivery_method,
        // delivery_time: item.data().delivery_time,
        order_amount: item.data().order_amount,
        order_by: item.data().order_by,
        // order_date: dayjs(item.data().order_date.toDate().toISOString()).format(
        //   "DD MMM YYYY"
        // ),
        order_date: item.data().order_date,
        // order_status: item.data().order_status,
        // payment_method: item.data().payment_method,
        // order_number: ordersSnapshot.size,
      };

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
  // console.log(orders);

  // sort the orders by date
  const sortedOrders = orders.sort((a, b) => {
    // Extract the timestamp from the order date of each object
    const timestampA = a.order_date._seconds;
    const timestampB = b.order_date._seconds;
    // Create date objects from the timestamps
    const dateA = new Date(timestampA * 1000);
    const dateB = new Date(timestampB * 1000);
    // Compare the dates and return 1, -1 or 0 depending on which is greater
    if (dateA > dateB) {
      return 1;
    } else if (dateA < dateB) {
      return -1;
    } else {
      return 0;
    }
  });

  // group the sales revenue by month and year,
  // then calculate the total revenue for each month
  // var salesRevenueArray = [[], []];

  const salesRevenue = sortedOrders.reduce((acc, order) => {
    // Extract the timestamp from the order date
    const timestamp = order.order_date._seconds;
    // Create a new date object from the timestamp
    const date = new Date(timestamp * 1000);
    // Extract the year and month from the date
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    // Check if an entry for the current year and month already exists in the accumulator
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = 0;
    }
    // Add the order amount to the accumulator
    acc[year][month] += parseFloat(order.order_amount);
    return acc;
  }, {});

  // Format the sales revenue object
  const formattedSalesRevenue = Object.entries(salesRevenue).reduce(
    (acc, [year, months]) => {
      Object.entries(months).forEach(([month, amount]) => {
        acc[`${month} ${year}`] = amount;
      });
      return acc;
    },
    {}
  );
  console.log(formattedSalesRevenue);

  // Convert object to array of key-value pairs
  const salesRevenueArray = Object.entries(formattedSalesRevenue);
  console.log(salesRevenueArray);

  // Sort array by key
  // var sortedArray = salesRevenueArray.sort();

  // Extract keys and values into separate arrays
  const month = salesRevenueArray.map(([key, value]) => key);
  const revenue = salesRevenueArray.map(([key, value]) => value);

  console.log(month);
  console.log(revenue);

  res.json({ month, revenue });
});

// GET MONTHLY REVENUE W/ FILTER- FOR DASHBOARD PAGE
app.get("/getMonthlyRevenueFiltered", async (req, res) => {
  var start_date = dayjs(req.query.start_date).toDate();
  var end_date = dayjs(req.query.end_date).toDate();
  console.log("start_date: " + start_date);
  console.log("end_date: " + end_date);
  // start and end date for filter
  //Convert the start_date and end_date to timestamp using day.js
  // var start_timestamp = dayjs(start_date, "DD/MM/YYYY").unix();
  // var end_timestamp = dayjs(end_date, "DD/MM/YYYY").unix();
  // console.log("start_stampL " + start_timestamp);
  // console.log("end_stampL " + end_timestamp);

  // Get a reference to the orders collection
  const ordersRef = db.collection("order");

  let start = new Date("2023-01-01");
  let end = new Date("2023-02-01");

  let query = ordersRef
    .where("order_date", ">", start_date)
    .where("order_date", "<", end_date);

  // The query is working correctly
  // var query = ordersRef.where("delivery_method", "==", "Self Collection");

  // Get the query snapshot for the orders collection
  let filteredOrders = await query.get();
  // console.log("FILTERED ORDERS: " + JSON.stringify(filteredOrders));
  console.log("filtered order size: " + filteredOrders._size);
  // res.json({ filteredOrders });

  // Initialize an array to hold the order objects
  const orders = [];

  // Wrap the loop in an async function
  const addOrderData = async () => {
    // Create an array of order promises
    const orderPromises = filteredOrders.docs.map(async (item) => {
      // Create an object for the order
      const order = {
        order_id: item.id,
        // delivery_method: item.data().delivery_method,
        // delivery_time: item.data().delivery_time,
        order_amount: item.data().order_amount,
        order_by: item.data().order_by,
        // order_date: dayjs(item.data().order_date.toDate().toISOString()).format(
        //   "DD MMM YYYY"
        // ),
        order_date: item.data().order_date,
        // order_status: item.data().order_status,
        // payment_method: item.data().payment_method,
        // order_number: ordersSnapshot.size,
      };

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
  // console.log(orders);

  // sort the orders by date
  const sortedOrders = orders.sort((a, b) => {
    // Extract the timestamp from the order date of each object
    const timestampA = a.order_date._seconds;
    const timestampB = b.order_date._seconds;
    // Create date objects from the timestamps
    const dateA = new Date(timestampA * 1000);
    const dateB = new Date(timestampB * 1000);
    // Compare the dates and return 1, -1 or 0 depending on which is greater
    if (dateA > dateB) {
      return 1;
    } else if (dateA < dateB) {
      return -1;
    } else {
      return 0;
    }
  });

  // group the sales revenue by month and year,
  // then calculate the total revenue for each month
  // var salesRevenueArray = [[], []];

  const salesRevenue = sortedOrders.reduce((acc, order) => {
    // Extract the timestamp from the order date
    const timestamp = order.order_date._seconds;
    // Create a new date object from the timestamp
    const date = new Date(timestamp * 1000);
    // Extract the year and month from the date
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    // Check if an entry for the current year and month already exists in the accumulator
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = 0;
    }
    // Add the order amount to the accumulator
    acc[year][month] += parseFloat(order.order_amount);
    return acc;
  }, {});

  // Format the sales revenue object
  const formattedSalesRevenue = Object.entries(salesRevenue).reduce(
    (acc, [year, months]) => {
      Object.entries(months).forEach(([month, amount]) => {
        acc[`${month} ${year}`] = amount;
      });
      return acc;
    },
    {}
  );
  console.log(formattedSalesRevenue);

  // Convert object to array of key-value pairs
  const salesRevenueArray = Object.entries(formattedSalesRevenue);
  console.log(salesRevenueArray);

  // Sort array by key
  // var sortedArray = salesRevenueArray.sort();

  // Extract keys and values into separate arrays
  const month = salesRevenueArray.map(([key, value]) => key);
  const revenue = salesRevenueArray.map(([key, value]) => value);

  console.log(month);
  console.log(revenue);

  res.json({ month, revenue });
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

app.put("/addStock", async (req, res) => {
  try {
    const products = req.body;
    console.log("REQ.BODY", products);

    for (let product of products) {
      console.log("PRODUCT", product);
      const productRef = db.collection("products").doc(product.product_id);
      const snapshot = await productRef.get();
      const currentStock = parseInt(snapshot.get("stock"));
      console.log("product_id", product.product_id);
      console.log("ADD STOCK AMOUNT", product.add_stock_amount);
      console.log("TYPE OF ADD STOCK AMOUNT", typeof product.add_stock_amount);
      console.log("CURRENT STOCK", currentStock);
      await productRef
        .update({
          // stock: admin.firestore.FieldValue.increment(
          //   parseInt(product.add_stock_amount)
          stock: parseInt(product.add_stock_amount) + currentStock,
        })
        .catch((error) => {
          console.error("ERR" + error);
        });
    }

    res.status(200).json({ message: "Stock added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // GET ALL PRODUCTS - FOR ADD PRODUCT PAGE (FOR DROPDOWN) - USING PRODUCTS COLLECTION
// app.get("/getProducts", async (req, res) => {
//   // Get a reference to the products collection
//   const productsRef = db.collection("products");

//   // Get the query snapshot for the products collection
//   const productsSnapshot = await productsRef.get();

//   // Initialize an array to hold the product objects
//   const products = [];

//   // Wrap the loop in an async function
//   const addProductData = async () => {
//     // Create an array of product promises
//     const productPromises = productsSnapshot.docs.map(async (item) => {
//       // Create an object for the product
//       const product = {
//         product_id: item.id,
//         image: item.data().image,
//         price: item.data().price,
//         product_description: item.data().product_description,
//         product_name: item.data().product_name,
//         product_status: item.data().product_status,
//         sold_item: item.data().sold_item,
//         stock: item.data().stock,
//         under_category: item.data().under_category, // mapping needed
//         stock_status: "IN STOCK", // default value
//       };

//       // Determine the stock_status based on the stock number
//       if (product.stock === 0) {
//         product.stock_status = "OUT OF STOCK";
//       } else if (product.stock < 10) {
//         product.stock_status = "RESTOCK NEEDED";
//       }

//       if (item.data().product_rating) {
//         product.product_rating = item.data().product_rating;
//       }

//       // Return the product object
//       return product;
//     });

//     // Wait for all of the product promises to resolve
//     const resolvedProducts = await Promise.all(productPromises);

//     // Add the resolved products to the products array
//     products.push(...resolvedProducts);
//   };

//   // Call the async function
//   await addProductData();

//   // console.log(JSON.stringify(products, null, 2));
//   // console.log("Number of products:", products.length);
//   // console.log("GET all products successfully");

//   res.json(products);
// });

// GET ALL PRODUCTS - FOR ADD PRODUCT PAGE (FOR DROPDOWN) - USING PRODUCTS COLLECTION
app.get("/getProducts", async (req, res) => {
  // Get a reference to the products collection
  const productsRef = db.collection("products");
  const productsSnapshot = await productsRef.get();
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
  await addProductData();
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
app.post("/postProduct", async (req, res) => {
  // get the form data from the request body
  const price = req.body.price;
  const product_name = req.body.product_name;
  const product_description = req.body.product_description;
  const stock = req.body.stock;
  const under_category = req.body.under_category;
  const image =
    "https://firebasestorage.googleapis.com/v0/b/odds-38a12.appspot.com/o/product%2FFRF%2FPicture5.png?alt=media&token=ebb9cdb6-139c-4999-92b1-b282b0dbdc25";

  // image & owned by
  var sequence_no = "0010";

  // Get a reference to the products collection
  const productsRef = db.collection("products");

  // Get a list of cities from your database
  productsRef.doc(under_category + "-" + sequence_no).set({
    // price: Math.round(price * 100) / 100,
    price: parseFloat(price),
    product_description: product_description,
    product_name: product_name,
    // product_status: product_status,
    sold_item: 0,
    stock: parseFloat(stock),
    under_category: under_category,
    image: image,
    "owned by": "SH0003",
    product_rating: 0,
    product_rating_times: 0,
  });

  // send a response to the client
  console.log("Form submitted successfully");
  res.send("Form submitted successfully");
});

// POST ONE ORDER - FOR EDIT ORDER PAGE
app.post("/postOrder", (req, res) => {
  // get the form data from the request body
  const order_id = req.body.order_id;
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
        // order_date: dayjs(item.data().order_date.toDate().toISOString()).format(
        //   "DD MMM YYYY"
        // ),
        order_date: item.data().order_date,
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
            price: product.data().price,
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

  // console.log(JSON.stringify(orders, null, 2));
  // console.log("Number of orders:", orders.length);
  // console.log("GET all orders successfully");

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
  // console.log(order);
});

// // GET ALL ORDER - FOR MY ORDER PAGE
// app.get("/getProductRanking", async (req, res) => {
//   // Get a reference to the orders collection
//   const ordersRef = db.collection("order");

//   // Get the query snapshot for the orders collection
//   const ordersSnapshot = await ordersRef.get();
//   // console.log("Orders snapshot:", ordersSnapshot);

//   // Initialize an array to hold the order objects
//   const orders = [];
//   const productRanking = [];
//   // Initialize a new array to hold the ordered products
//   let orderedProducts = [];

//   // variables to calculate product ranking

//   let currentRank = 1;

//   // Wrap the loop in an async function
//   const addOrderData = async () => {
//     // Create an array of order promises
//     const orderPromises = ordersSnapshot.docs.map(async (item) => {
//       // Create an object for the order
//       const order = {
//         order_id: item.id,
//         delivery_method: item.data().delivery_method,
//         delivery_time: item.data().delivery_time,
//         order_amount: item.data().order_amount,
//         order_by: item.data().order_by,
//         order_date: dayjs(item.data().order_date.toDate().toISOString()).format(
//           "DD MMM YYYY"
//         ),
//         order_status: item.data().order_status,
//         payment_method: item.data().payment_method,
//         products: [],
//         address: [],
//         order_number: ordersSnapshot.size,
//       };

//       // order.push({ salesRevenue: sum });

//       // console.log(
//       //   "dayjs " + dayjs(item.data().order_date).format("DD MMM YYYY")
//       // );

//       // Get the query snapshot for the products subcollection
//       const productsSnapshot = await item.ref
//         .collection("ordered_product")
//         .get();

//       // Create an array of product promises
//       const productPromises = productsSnapshot.docs.map((product) => {
//         // Create a promise to add the product data to the products array
//         return new Promise((resolve) => {
//           // Create an object for the product
//           const productsData = {
//             sku: product.data().SKU,
//             price: product.data().price,
//             name: product.data().product_name,
//             quantity: product.data().quantity,
//           };

//           // Add the product object to the products array
//           order.products.push(productsData);

//           // Resolve the promise
//           resolve();
//         });
//       });

//       const addressSnapshot = await item.ref.collection("address").get();

//       const addressPromises = addressSnapshot.docs.map((address) => {
//         // Create a promise to add the product data to the products array
//         return new Promise((resolve) => {
//           // Create an object for the product
//           const addressData = {
//             address_id: address.id,
//             addr1: address.data().addr1,
//             addr2: address.data().addr2,
//             city: address.data().city,
//             postcode: address.data().postcode,
//             receiver_name: address.data().receiver_name,
//             receiver_tel: address.data().receiver_tel,
//             state: address.data().state,
//           };

//           // Add the product object to the products array
//           order.address.push(addressData);

//           // Resolve the promise
//           resolve();
//         });
//       });

//       // Wait for all of the product promises to resolve
//       await Promise.all(productPromises);
//       await Promise.all(addressPromises);
//       // console.log("productPromises" + productPromises);

//       // Return the order object
//       return order;
//     });

//     // Wait for all of the order promises to resolve
//     const resolvedOrders = await Promise.all(orderPromises);

//     // Add the resolved orders to the orders array
//     // orders.push(...resolvedOrders);
//     // console.log("RESOLVED ORDERS: " + JSON.stringify(resolvedOrders));

//     // Iterate over the resolved orders
//     for (const order of resolvedOrders) {
//       // Iterate over the products in each order
//       for (const product of order.products) {
//         console.log("product" + JSON.stringify(product));
//         // Check if the product already exists in the productRanking array
//         const existingProduct = productRanking.find(
//           (p) => p.product_name === product.name
//         );
//         // console.log("p.sku" + p.sku);
//         // console.log("product.sku" + product.sku);
//         if (existingProduct) {
//           // If the product already exists, update the sales and quantity for that product
//           existingProduct.sales += product.quantity * product.price;
//           existingProduct.quantity += parseInt(product.quantity);
//         } else {
//           // If the product doesn't exist, create a new object for the product in the productRanking array
//           productRanking.push({
//             // product_ranking: currentRank,
//             product_name: product.name,
//             sales: product.quantity * product.price,
//             quantity: parseInt(product.quantity),
//           });
//           // Increment currentRank by 1
//           // currentRank++;
//         }
//         // Create an object for the ordered product with the product name, quantity, and sales
//         let orderedProducts = {
//           sku: product.sku,
//           product_name: product.name,
//           quantity: product.quantity,
//           sales: product.quantity * product.price,
//         };

//         // console.log("productRanking" + productRanking);
//       }
//     }

//     // Now that you have an array of all the ordered products, you can sort it by sales and return the sorted array as the response
//   };

//   // Call the async function
//   await addOrderData();

//   // console.log(JSON.stringify(orderedProducts, null, 2));
//   // console.log("Number of orders:", orderedProducts.length);
//   // console.log("GET all orders successfully");

//   // console.log("orderedProduct" + orderedProducts);
//   // res.json(orderedProducts);

//   // console.log(JSON.stringify(productRanking, null, 2));
//   // console.log("Number of orders:", productRanking.length);
//   // console.log("GET all orders successfully");
//   productRanking.sort((a, b) => b.sales - a.sales);
//   let rank = 1;
//   productRanking.forEach((product) => {
//     product.product_ranking = rank;
//     rank++;
//     product.sales = "RM " + product.sales.toFixed(2);
//   });

//   res.json(productRanking);
// });

// GET ALL ORDER - FOR MY ORDER PAGE
app.get("/getProductRanking", async (req, res) => {
  // Get a reference to the orders collection
  const ordersRef = db.collection("order");
  const ordersSnapshot = await ordersRef.get();
  const productRanking = [];

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

    // Iterate over the resolved orders
    for (const order of resolvedOrders) {
      // Iterate over the products in each order
      for (const product of order.products) {
        console.log("product" + JSON.stringify(product));
        // Check if the product already exists in the productRanking array
        const existingProduct = productRanking.find(
          (p) => p.product_name === product.name
        );
        if (existingProduct) {
          // If the product already exists, update the sales and quantity for that product
          existingProduct.sales += product.quantity * product.price;
          existingProduct.quantity += parseInt(product.quantity);
        } else {
          // If the product doesn't exist, create a new object for the product in the productRanking array
          productRanking.push({
            // product_ranking: currentRank,
            product_name: product.name,
            sales: product.quantity * product.price,
            quantity: parseInt(product.quantity),
          });
        }
      }
    }
  };
  await addOrderData();

  productRanking.sort((a, b) => b.sales - a.sales);
  let rank = 1;
  productRanking.forEach((product) => {
    product.product_ranking = rank;
    rank++;
    product.sales = "RM " + product.sales.toFixed(2);
  });

  res.json(productRanking);
});

// app.post("/register", async (req, res) => {
//   const seller_name = req.body.seller_name;
//   const seller_email = req.body.seller_email;
//   const seller_username = req.body.seller_username;
//   const seller_password = req.body.seller_password;

//   const shop_name = req.body.shop_name;
//   const shop_rating = 0.0;
//   const shop_tel = req.body.shop_tel;
//   const shop_open = req.body.shop_open;
//   const shop_close = req.body.shop_close;
//   const shop_addr1 = req.body.shop_addr1;
//   const shop_addr2 = req.body.shop_addr2;
//   const shop_city = req.body.shop_city;
//   const shop_postcode = req.body.shop_postcode;
//   const shop_state = req.body.shop_state;
//   const shop_latitude = req.body.shop_latitude;
//   const shop_longitude = req.body.shop_longitude;

//   try {
//     const { user } = await auth.createUser({
//       email: seller_email,
//       password: seller_password,
//       displayName: seller_username,
//     });

//     const shopRef = db.collection("shop");
//     const currentCount = (await shopRef.get()).size;
//     let count = currentCount;
//     count++;
//     let shopid = "SH0000" + count;

//     // Insert additional data into Firestore
//     await db.collection("seller").doc(seller_email).set({
//       seller_name: seller_name,
//       seller_username: seller_username,
//       seller_email: seller_email,
//       shop_id: shopid,
//     });

//     // Insert additional data into Firestore
//     await db.collection("shop").doc(shopid).set({
//       shop_owner: seller_name,
//       shop_name: shop_name,
//       shop_rating: shop_rating,
//       shop_tel: shop_tel,
//       shop_open: shop_open,
//       shop_close: shop_close,
//       shop_addr1: shop_addr1,
//       shop_addr2: shop_addr2,
//       shop_city: shop_city,
//       shop_postcode: shop_postcode,
//       shop_state: shop_state,
//       shop_latitude: shop_latitude,
//       shop_longitude: shop_longitude,
//     });
//     res.redirect("/login");
//     // res.send("User registered successfully!");
//     // res.sendFile(path.resolve(__dirname, "../client/login.html"));
//   } catch (error) {
//     res.send("Error: " + error);
//   }
// });

app.get("/getShop", (req, res) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = admin.firestore();

  if (user) {
    // Get the user data from the 'users' collection, using the user's email as the document ID
    const userRef = db
      .collection("shop")
      .where("shop_email", "==", user.email)
      .get();
    console.log(user.email);

    if (userRef.empty) {
      console.log("No matching documents.");
      return;
    }

    userRef.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  }
});

app.post("/register", async (req, res) => {
  const seller_name = req.body.seller_name;
  const seller_email = req.body.seller_email;
  const seller_username = req.body.seller_username;
  const seller_password = req.body.seller_password;

  const shop_name = req.body.shop_name;
  const shop_rating = 0.0;
  const shop_tel = req.body.shop_tel;
  const shop_open = req.body.shop_open;
  const shop_close = req.body.shop_close;
  const shop_addr1 = req.body.shop_addr1;
  const shop_addr2 = req.body.shop_addr2;
  const shop_city = req.body.shop_city;
  const shop_postcode = req.body.shop_postcode;
  const shop_state = req.body.shop_state;
  const shop_latitude = req.body.shop_latitude;
  const shop_longitude = req.body.shop_longitude;

  try {
    const { user } = await auth.createUser({
      email: seller_email,
      password: seller_password,
      displayName: seller_username,
    });

    const shopRef = db.collection("shop");
    const currentCount = (await shopRef.get()).size;
    let count = currentCount;
    count++;
    let shopid = "SH0000" + count;

    // Insert additional data into Firestore
    await db.collection("seller").doc(seller_email).set({
      seller_name: seller_name,
      seller_username: seller_username,
      seller_email: seller_email,
      shop_id: shopid,
    });

    // Insert additional data into Firestore
    await db.collection("shop").doc(shopid).set({
      shop_owner: seller_name,
      shop_name: shop_name,
      shop_rating: shop_rating,
      shop_tel: shop_tel,
      shop_open: shop_open,
      shop_close: shop_close,
      shop_addr1: shop_addr1,
      shop_addr2: shop_addr2,
      shop_city: shop_city,
      shop_postcode: shop_postcode,
      shop_state: shop_state,
      shop_latitude: shop_latitude,
      shop_longitude: shop_longitude,
    });

    res.send("User registered successfully!");
    res.sendFile(path.resolve(__dirname, "../client/login.html"));
  } catch (error) {
    res.send("Error: " + error);
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      res.redirect("/dashboard");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Login failed");
      res.redirect("/login");
    });
});

app.post("/forgotpass", (req, res) => {
  const { email } = req.body;
  console.log(email);

  const auth = getAuth();

  sendPasswordResetEmail(auth, email)
    .then(() => {
      res.send("Password reset email sent");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Login failed");
      res.redirect("/login");
    });
});

app.get("/getAccount", (req, res) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = admin.firestore();

  if (user) {
    // Get the user data from the 'users' collection, using the user's email as the document ID
    const userRef = db.collection("seller").doc(user.email);
    console.log(user.email);

    // Get the user data
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // create an array
          const accountData = [
            {
              email: user.email,
              seller_username: doc.data().seller_username,
              seller_name: doc.data().seller_name,
            },
          ];
          res.json(accountData);
        } else {
          console.log("No such document!");
        }
        //res.redirect("/profile");
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    res.redirect("/login");
  }
});

app.post("/updateProfile", (req, res) => {
  const sellername = req.body.ownernameProfile;
  const selleremail = req.body.emailProfile;
  const sellerusername = req.body.usernameProfile;
  console.log(sellername);
  console.log(selleremail);
  console.log(sellerusername);

  const auth = getAuth();
  const user = auth.currentUser;
  const db = admin.firestore();

  const userRef = db.collection("seller").doc(selleremail).set(
    {
      seller_name: sellername,
      seller_email: selleremail,
      seller_username: sellerusername,
    },
    { merge: true }
  );
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
