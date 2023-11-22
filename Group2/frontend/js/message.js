export default class Message{
    
    #customer;
    #email;
    #phone;
    #message;
    #tourId;

    constructor(cust, email, phone, msg, tourId){
        this.#customer = cust;
        this.#email = email;
        this.#phone = phone;
        this.#message = msg;
        this.#tourId = tourId;

    }

    get customerName(){
        return this.#customer;
    }

    get email(){
        return this.#email;
    }

    get phone(){
        return this.#phone;
    }

    get message(){
        return this.#message;
    }

    get tourId(){
        return this.#tourId
    }
}

