/*-----------------------
*
*   Ui JS
*
-----------------------*/

export class UI {
    constructor(){
        this.messages   = document.getElementById("messages")
        this.tableBody  = document.getElementById("table__body")
        this.name       = document.getElementById("crypto-name")
        this.price      = document.getElementById("crypto-price")
        this.close      = document.getElementById('crypto-close')
        this.update     = document.getElementById('crypto-update')
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

    clearInput(){
        this.name.value = ""
        this.price.value = ""

        if (this.close.getAttribute('data-view') === 'show'){
            this.close.setAttribute('data-view', 'hide')
            this.update.setAttribute('data-view', 'hide')

            /*for (let item of this.table.children) {
                item.classList.remove('edit')
            }*/
        }
    }

    templateCrypto(crypto){
        return `
            <tr data-id="${crypto.id}">
                <td>${crypto.id}</td>
                <td>${crypto.name}</td>
                <td>${crypto.price}$</td>
                <td>${crypto.date}</td>
                <td class="text-right flex-end">
                    <a id="crypto-edit" class="crypto__button">Edit</a>
                    <a id="crypto-delete" class="crypto__button">Del</a>
                </td>
            </tr>
        `
    }

    message(message, classes){
        this.messages.innerHTML = `<div class="alert ${classes}">${message}</div>`
        setTimeout( () => {this.messages.innerHTML = ""}, 1300 )
    }
}
