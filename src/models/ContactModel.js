const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: "" },
  tel: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  creationDate: { type: Date, default: Date.now },
  idUser: { type: String, required: false },
},
  {collection: "contact"}
);


const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  constructor(body, idUser) {
    this.body = body;
    this.user = idUser;
    this.errors = [];
    this.contact = null;
  }

  async register() {
    this.validate();

  //  this.contactExists();

    if (this.errors.length > 0) return;

    this.contact = await ContactModel.create(this.body);
  }
/*
  async contactExists() {
   
  } */

  validate() {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("E-mail invalido");
    }

    if (!this.body.name) {
      this.errors.push("nome é um campo obrigatorio");
    }

    if (!this.body.tel && !this.body.email) {
      this.errors.push("Enviar pelo menos um contato: Telefone ou Email.");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      tel: this.body.tel,
      email: this.body.email,
      idUser: this.user
    };
  }

  
  async edit(id) {
    if (typeof id !== "string") return
  
    this.validate()
    
    if(this.errors.length > 0) return
   
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {new: true})
    }
}

Contact.searchById = async (id) => {
  
  if (typeof id !== "string") return;

  const contact = await ContactModel.findById(id);
  return contact;
};


Contact.searchContacts = async (userEmail) => {

  const contacts = await ContactModel.find({idUser: userEmail}).sort({ creationDate : -1});
  return contacts;
};


Contact.delete = async (id) => {

  if (typeof id !== "string") return;
  
  const contact = await ContactModel.findOneAndDelete({_id: id})
  return contact;
};



module.exports = Contact;
