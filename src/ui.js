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

    addItemUI(crypto){
        this.tableBody.innerHTML += this.templateCrypto(crypto)
    }

    getLoadedItem(cryptos){
        let results = ""

        cryptos.forEach(crypto => {
            results += this.templateCrypto(crypto)
        })

        this.tableBody.innerHTML += results
    }

    editItemUI(item){
        this.buttonsDisplay(true)

        this.select.value = item.getAttribute('data-name')
        this.price.value = item.getAttribute('data-price')

        for (let item of this.tableBody.children) {
            item.classList.remove('edit')
        }

        item.classList.add('edit')
    }

    updateItemUI(item, updateItem){
        item.innerHTML = this.templateCrypto(updateItem)
    }

    clearInput(){
        this.select.value = ""
        this.price.value = ""
        this.buttonsDisplay(false)
    }

    buttonsDisplay(display){
        if (display){
            this.close.setAttribute('data-view', 'show')
            this.update.setAttribute('data-view', 'show')
            this.button.setAttribute('data-view', 'hide')
        } else {
            this.close.setAttribute('data-view', 'hide')
            this.update.setAttribute('data-view', 'hide')
            this.button.setAttribute('data-view', 'show')

            for (let item of this.tableBody.children) {
                item.classList.remove('edit')
            }
        }
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

    message(message, classes){
        this.messages.innerHTML = `<div class="alert ${classes}">${message}</div>`
        setTimeout( () => {this.messages.innerHTML = ""}, 1300 )
    }
}
