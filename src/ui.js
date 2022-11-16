/*-----------------------
*
*   Ui JS
*
-----------------------*/

export class UI {
    constructor(){
        this.messages   = document.getElementById("messages")
        this.tableBody  = document.getElementById("table__body")
        this.select     = document.getElementById("crypto-select")
        this.price      = document.getElementById("crypto-price")
        this.date       = document.getElementById("crypto-date")
        this.close      = document.getElementById('crypto-close')
        this.update     = document.getElementById('crypto-update')
        this.button     = document.getElementById('crypto-button')
    }

    addCryptoUI(crypto){
        this.tableBody.innerHTML += this.templateCrypto(crypto)
    }

    getLoadedCrypto(cryptos){
        let results = ""

        cryptos.forEach(crypto => {
            results += this.templateCrypto(crypto)
        })

        this.tableBody.innerHTML += results
    }

    editCryptoUI(crypto){
        this.editOrCancelButtonDisplay(true)

        this.select.value = crypto.getAttribute('data-name')
        this.price.value = crypto.getAttribute('data-price')

        for (let listCrypto of this.tableBody.children) {
            listCrypto.classList.remove('edit')
        }

        crypto.classList.add('edit')
    }

    updateCryptoUI(crypto, updateCrypto){
        crypto.innerHTML = this.templateCrypto(updateCrypto)
    }

    templateCrypto(crypto){
        return `
            <tr data-id="${crypto.id}" data-name="${crypto.select}" data-price="${crypto.price}">
                <td>${crypto.id}</td>
                <td>
                    <div class="crypto-logo-name">
                        <img src="./images/${crypto.select.toLowerCase()}.svg">
                        ${crypto.select}
                    </div>
                </td>
                <td>${crypto.price}$</td>
                <td>${crypto.date}</td>
                <td class="text-right flex-end">
                    <a id="crypto-edit" class="crypto__button"></a>
                    <a id="crypto-delete" class="crypto__button"></a>
                </td>
            </tr>
        `
    }

    clearInput(){
        this.select.value = ""
        this.price.value = ""
        this.editOrCancelButtonDisplay(false)
    }

    editOrCancelButtonDisplay(display){
        if (!display){
            for (let listCrypto of this.tableBody.children) {
                listCrypto.classList.remove('edit')
            }
        }

        this.close.setAttribute('data-view', display)
        this.update.setAttribute('data-view', display)
        this.button.setAttribute('data-view', !display)
    }

    message(message, classes){
        this.messages.innerHTML = `<div class="alert ${classes}">${message}</div>`
        setTimeout( () => {this.messages.innerHTML = ""}, 1300 )
    }
}
