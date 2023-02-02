import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '/assets/css/style.css';
import Login from '/assets/modules/Login';

const signIn = new Login ("form-sign-in")
const signUp = new Login ("form-sign-up")

signIn.init()
signUp.init()

const burguerMenu = document.querySelector("#button")
const menuItems = document.querySelector("#navbarSupportedContent")

burguerMenu.addEventListener("click", (e) => {
    console.log("click")
    menuItems.classList.toggle("hidden")
    menuItems.classList.toggle("menu")
})
