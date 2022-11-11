/*-----------------------
*
*   REQUEST JS
*
-----------------------*/

export class Request {
    constructor(url){
        this.url = url
    }

    async get(){
        const res = await fetch(this.url)
        const resData = await res.json()

        return resData
    }

    async post(data){
        const res = await fetch(this.url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const resData = await res.json()

        return resData
    }

    async put(id, data){
        const res = await fetch(this.url +"/"+ id, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const resData = await res.json()

        return resData
    }

    async delete(id){
        await fetch(this.url +"/"+ id, {
            method: "DELETE"
        })
    }
}
