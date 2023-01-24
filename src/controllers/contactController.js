const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
  if(req.session.user) return res.render("contact", {contact: {}});
  return res.render('signUp')
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body, req.session.user.email);
   
    await contact.register();
    let idUser = null;

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
      res.redirect("/contact/index")});
      return;
    }

    req.flash("success", "contato registrado com sucesso");
    req.session.save(() => {res.redirect("/");
    return  idUser;
  }); } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.editIndex = async (req, res) =>{
  try {
      if(req.session.user) {
        if(!req.params.id) return res.render("404")

        const contact = await Contact.searchById(req.params.id)
        if(!contact) return res.render("404")
        idUser = contact._id;
        req.session.contact = {
          _id: idUser|| "",
          name: contact.name,
          lastName: contact.lastName,
          tel: contact.tel,
          email: contact.email,
          idUser: contact.idUser
        }
        res.render('contact', {contact})
    }

} catch (e) {
  res.render("404")
}
}

exports.edit = async (req, res) => {
  try {
    if(req.session.user){

    if(!req.params.id) return res.render("404")
    const contact = new Contact(req.body, req.session.user.email)
    await contact.edit(req.params.id);
    idUser = req.params.id
  
  
    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      
      req.session.contact = {
        _id: idUser|| "",
        name: contact.name,
        lastName: contact.lastName,
        tel: contact.tel,
        email: contact.email,
        idUser: contact.idUser
      }
      
      req.session.save(() => { 
        res.redirect("/contact/index") 
      });
      return;
    }
  
    req.flash("success", "contato alterado com sucesso");
    req.session.save(() => {res.redirect("/")});
    return

  }
  } catch (e) {
    console.log(e)
    res.render("404")
  }
}
 
exports.delete = async (req, res) => {
  try {
    if(req.session.user) {

      if(!req.params.id) return res.render("404")

      const contact = await Contact.delete(req.params.id)
      if(!contact) return res.render("404")
      
      req.flash("success", "contato apagado com sucesso");
      req.session.save(() => {res.redirect("/")});
      return
 }
} catch (e){
  res.render("404")
}

}




