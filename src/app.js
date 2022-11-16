import {Request} from "./request"
import {UI} from "./ui"

const req = new Request("http://localhost:3000/cryptox")
const ui = new UI

class App {
    constructor(){
        this.updateState = null
        this.form   = document.getElementById("crypto__form")
        this.select = document.getElementById("crypto-select")
        this.price  = document.getElementById("crypto-price")
        this.date   = document.getElementById("crypto-date")
        this.close  = document.getElementById("crypto-close")
        this.update = document.getElementById("crypto-update")
        this.table  = document.getElementById("table__body")

        // Loaded
        this.getLoaded()
        this.date.valueAsDate = new Date()

        // Events
        this.form.addEventListener("submit", e => this.formSubmit(e))
        this.table.addEventListener('click', e => this.editOrDelete(e))
        this.update.addEventListener('click', e => this.updateCrypto())
        this.close.addEventListener('click', () => ui.clearInput())
    }

    formSubmit(e){
        const inputSelect = this.select.value
        const inputPrice = this.price.value.trim()
        const inputDate = new Date(this.date.value).toLocaleDateString("tr-TR")

        if ( inputSelect === "" || inputPrice === ""){
            ui.message("Please fill the required areas", "warning")
        } else {
            req.get()
                .then(cryptos =>{
                    let available = cryptos.find(crypto => crypto.select === inputSelect)

                    if (!available){
                        req.post({
                            select: inputSelect,
                            price: +inputPrice,
                            date: inputDate
                        }).then(crypto => {
                            ui.message('Added Crypto', 'success')
                            ui.clearInput()
                            ui.addCryptoUI(crypto)
                        }).catch(err => console.log(err))
                    } else {
                        ui.message('This has been added before', 'danger')
                    }
                })
        }

        e.preventDefault()
    }

    getLoaded(){
        req.get()
            .then(cryptos =>{
                ui.getLoadedCrypto(cryptos)
            })
            .catch(err => console.log(err))
    }

    editOrDelete(e){
        const crypto = e.target.closest("tr")
        const cryptoID = crypto.getAttribute('data-id')

        if (e.target.id === "crypto-edit"){
            ui.editCryptoUI(crypto)

            this.updateState = {
                crypto,
                cryptoID
            }
        }

        if (e.target.id === "crypto-delete"){
            console.log(this.updateState)
        }
    }

    updateCrypto(){
        if (this.updateState){
            const data = {
                select: this.select.value,
                price: +this.price.value.trim(),
                date: new Date(this.date.value).toLocaleDateString("tr-TR")
            }

            req.put(this.updateState.cryptoID, data)
                .then(updateCrypto => {
                    ui.updateCryptoUI(this.updateState.crypto, updateCrypto)
                })
                .catch(err => console.log(err))
        }

        ui.clearInput()
    }
}

document.addEventListener("DOMContentLoaded", () => new App)
