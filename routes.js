const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contactController = require("./src/controllers/contactController");
const {loginRequired} = require("./src/middlewares/middleware")


// Rotas da home
route.get("/", homeController.index);

// Rotas de Login

route.get("/logon/signUp", loginController.signUp);
route.post("/logon/register", loginController.register);
route.get("/logon/signIn", loginController.signIn);
route.post("/logon/login",  loginController.login);
route.get("/logon/logOut", loginController.logOut);

// Rotas de Contato

route.get("/contact/index", loginRequired, contactController.index);
route.get("/contact/index/:id", loginRequired, contactController.editIndex);
route.post("/contact/edit/:id", loginRequired, contactController.edit);
route.post("/contact/register", loginRequired, contactController.register);

route.get("/contact/delete/:id", loginRequired, contactController.delete);


module.exports = route;
