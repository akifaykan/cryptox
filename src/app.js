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
        this.search = document.getElementById('table__search')

        // Loaded
        this.getLoaded()
        this.changeColor()
        this.date.valueAsDate = new Date()

        // Events
        this.form.addEventListener("submit", e => this.formSubmit(e))
        this.table.addEventListener("click", e => this.editOrDelete(e))
        this.update.addEventListener("click", e => this.updateCrypto())
        this.search.addEventListener('input', e => this.searchFilter(e))
        this.close.addEventListener("click", () => ui.clearInput())
    }

    formSubmit(e){
        const inputSelect = this.select.value
        const inputPrice = this.price.value.trim()
        const inputDate = new Date(this.date.value).toLocaleDateString("tr-TR")

        if ( inputSelect === "" || inputPrice === "" ){
            ui.message("Please fill the required areas", "warning")
        } else {
            req.get()
                .then(cryptos =>{
                    const available = cryptos.find(crypto => crypto.select === inputSelect)

                    if (!available){
                        const data = {
                            select: inputSelect,
                            price: +inputPrice,
                            date: inputDate
                        }

                        req.post(data)
                            .then(crypto => {
                                ui.message("Added Crypto", "success")
                                ui.clearInput()
                                ui.addCryptoUI(crypto)
                            })
                            .catch(err => console.log(err))
                    } else {
                        ui.message("This has been added before", "danger")
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
        const cryptoID = crypto.getAttribute("data-id")

        if (e.target.id === "crypto-edit"){
            ui.editCryptoUI(crypto)

            this.updateState = {
                crypto,
                cryptoID
            }
        }

        if (e.target.id === "crypto-delete"){
            if (confirm("Are you sure you want to delete?")) {
                req.delete(cryptoID)
                    .then(()=>{
                        crypto.remove()
                        ui.message("Crypto has successfully deleted!", "success")
                    })
                    .catch(err => console.log(err))

                ui.clearInput()
            }
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

    searchFilter(input){
        req.get()
            .then(cryptos => {
                ui.searchFilterUI(cryptos, input)
            })
            .catch(err => console.log(err))
    }

    changeColor(){
        let hue = document.querySelector(".hue")
        let percent = document.querySelector(".percent")
        let root = document.querySelector(":root")
        let valueHue = document.querySelector(".value-hue")
        let valuePercent = document.querySelector(".value-percent")

        valueHue.innerHTML = hue.value
        valuePercent.innerHTML = percent.value + "%"

        hue.addEventListener("input", e =>{
            root.style.setProperty('--hue', e.target.value)
            valueHue.innerHTML = e.target.value
        })

        percent.addEventListener("input", e =>{
            root.style.setProperty('--percent', e.target.value + "%")
            valuePercent.innerHTML = e.target.value + "%"
        })
    }
}

document.addEventListener("DOMContentLoaded", () => new App)
