import Message from "./message";

const messages = [];
const cust = document.getElementById("customer").value;
const email = document.getElementById("email").value;
const phone = document.getElementById("phone").value;
const msg = document.getElementById("msg").value;
const tourId = document.getElementById("tourId").value;


const addNewMessage = (cust, email, phone, msg, tourId)=>{
    messages.push(new Message(cust, email, phone, msg, tourId));
}

addNewMessage("Jason", "jason@yahoo.com", "12565", "I want 3 of these.", 2);
addNewMessage("Peter", "peter@yahoo.com", "6544874", "I want 1 of these.", 1);
addNewMessage("Parker", "parker@yahoo.com", "123654", "I want 2 of these.", 2);
addNewMessage("Tony", "tony@yahoo.com", "654321", "I want all of these.", 1);
addNewMessage("Stark", "stark@yahoo.com", "987654", "I want five of these.", 2);