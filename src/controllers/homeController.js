const Contact = require("../models/ContactModel");

exports.index = async (req, res) => {
  try {
    const contacts = await Contact.searchContacts(req.session.user.email)
    res.render("index", { contacts });

  } catch (e) {
    res.render("index")
  }
  };
  