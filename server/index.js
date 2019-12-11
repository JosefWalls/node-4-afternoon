require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const checkForSession = require ("./middleware/checkForSession");
const swagController = require("./controllers/swagController");
const authController = require("./controllers/authController");
const cartController = require("./controllers/cartController");
const searchController = require("./controllers/searchController");


let {SESSION_SECRET} = process.env

app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)

app.use(checkForSession)
//swag
app.use(express.static(`${__dirname}/../build`));
app.get("/api/swag", swagController.read)
//auth
app.post("/api/login", authController.login)
app.post("/api/register", authController.register)
app.post("/api/signout", authController.signout)
app.get("/api/user", authController.getUser)
//cart
app.get("/api/cart/checkout", cartController.checkout)
app.post("/api/cart/:id", cartController.add)
app.delete("/api/cart/:id", cartController.delete)

app.get("/api/search", searchController.search)

app.listen(3000, () => console.log("Port 3001"))