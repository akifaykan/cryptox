import {Request} from "./request"
import {UI} from "./ui"

const req = new Request("http://localhost:3000/cryptox")
const ui = new UI

class App {
    constructor(){
        this.form   = document.getElementById("crypto__form")
        this.name   = document.getElementById("crypto-name")
        this.price  = document.getElementById("crypto-price")
        this.date   = document.getElementById("crypto-date")
        this.table   = document.querySelector("#table table")

        // Loaded
        this.getLoaded()

        // Events
        this.form.addEventListener("submit", e => this.formSubmit(e))
        this.table.addEventListener('click', e => this.editOrDelete(e))
    }

    formSubmit(e){
        const InputName     = this.name.value.trim()
        const InputPrice    = this.price.value.trim()
        const InputDate     = new Date(this.date.value).toLocaleDateString("tr-TR")
        
        if ( InputName === "" || InputPrice === ""){
            ui.message("Please fill the required areas", "warning")
        } else {
            req.post({
                name: InputName,
                price: +InputPrice,
                date: InputDate
            })
            .then(crypto => {
                ui.addItemUI(crypto)
            })
            .catch(err => console.log(err))

            ui.message('Added Crypto', 'success')
        }

        ui.clearInput()
        e.preventDefault()
    }

    getLoaded(){
        req.get()
            .then(cryptos =>{
                ui.getLoadedItem(cryptos)
            })
            .catch(err => console.log(err))
    }

    editOrDelete(e){
        const item = e.target.closest("tr")
        const itemId = item.getAttribute('data-id')

        console.log(item, itemId)
    }
}

document.addEventListener("DOMContentLoaded", () => new App)
