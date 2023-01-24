const Login = require("../models/LoginModel");

exports.signIn = (req, res) => {
  res.render("signIn");
};

exports.signUp = (req, res) => {
  res.render("signUp");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      console.log(login.errors);

      req.session.save(() => {
        return res.redirect("/logon/signUp");
      });
      return;
    }

    req.flash("success", "Usuario Criado Com Sucesso");
    req.session.save(() => {
      return res.redirect("/logon/signIn");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("/logon/signIn");
      });
      return;
    }

    req.flash("success", "Login Efetuado com Sucesso");
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.logOut = (req, res) => {
  req.session.destroy();
  res.redirect("/")
};
