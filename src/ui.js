/*-----------------------
*
*   Ui JS
*
-----------------------*/

export class UI {
    constructor(){
        this.message    = document.getElementById("messages")
        this.tableBody  = document.getElementById("table__body")
    }

    addItemUI(crypto){
        this.tableBody.innerHTML += this.templateCrypto(crypto)
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
        const messageHtml = `<div class="alert ${classes}">${message}</div>`
        this.message.insertAdjacentHTML("afterbegin", messageHtml)

        setTimeout( () => {this.message.innerHTML = ""}, 1300 )
    }
}
