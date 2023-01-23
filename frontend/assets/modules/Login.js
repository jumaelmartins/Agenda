export default class Login {
    constructor (formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }

    events() {
        if (!this.form) return;
        this.form.addEventListenner("submit", (ev) => {
            ev.preventDefault();
            this.validate(ev)
        })
    }

    validate(ev) {
        const element = ev.target;
        const emailInput = element.querySelector('input[name="email"]')
        const passwordInput = element.querySelector('input[name="password"]')
        const alertMessage = document.querySelector("#alertMessage")
        let error = false;

        if (!validator.isEmail(emailInput.value)) {
            alertMessage.innerHTML = "Email Invalido"
            alertMessage.classList.toggle("hidden")
            error = true;
        }

        
        if (passwordInput.value.length < 6 || passwordInput.value.length > 20) {
            alertMessage.innerHTML = "A senha precisa está entre 6 e 20 caracteres"
            alertMessage.classList.toggle("hidden")
            error = true;
        }

        if(!error) element.submit();

    }
}