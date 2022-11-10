/**
 * cards.js
 * 
 * Everything related to the card management will be done here. 
 * All the arrays, event listeners and functions shall be created here as long as 
 * they are realted to the the card management.
 * 
 * @author Practical IT
 * @author [Hermela John]
 */
 let cards = {
  wallia: {
    title: 'Wallia',
    price:  25,
    minutes: 130,
    refillable: true
  },
  chellada: {
    title: 'Chellada',
    price:  20,
    minutes: 120,
    refillable: true
  },
  kebero: {
    title: 'Key Kebero',
    price:  10,
    minutes: 100,
    refillable: false
  }
};

let checkout = []; //array for checkedout cards.
let purchased = []; //array for the purchased cards
let email_subscribers = []; //array for the subscribers
let members = []; //array for the members

const buy_chellada_card = document.querySelector('#chellada');
const buy_wallia_card = document.querySelector('#wallia');
const buy_kebero_card = document.querySelector('#kebero');

const checkout_list = document.querySelector('#checkout_list');

//Grand Total Implementation
let grandTotal = document.querySelector("#grandtotal");

const updateCheckout = () => {
  //create a list to be shown on the checkout list.
  let checkout_table = "";
  let tempGrandTotal = 0;
  let finalBalance = 0;
  let finalCheckOut = 0;

  if (checkout.length > 0) {
    checkout.forEach( card => {
      let total = parseInt(cards[card.type].price)*parseInt(card.quantity);
      checkout_table += `<tr>
      <td>${card.type}</td>
      <td>${card.quantity}</td>
      <td>${cards[card.type].price}</td>
      <td>${total}</td>
    </tr>`;

      tempGrandTotal += total
      finalBalance = +balance.innerText + cards[card.type].minutes * parseInt(card.quantity);
      finalCheckOut = +checkoutCounter.innerText + parseInt(card.quantity);
    });
    
    balance.innerText = finalBalance;
    grandTotal.innerText = tempGrandTotal;
    checkout_list.innerHTML = checkout_table;
    checkoutCounter.innerText = finalCheckOut
    
  }
}

const chellada_quantity = document.querySelector('#chellada_quantity');
const wallia_quantity = document.querySelector('#wallia_quantity');
const kebero_quantity = document.querySelector('#kebero_quantity');

//initially the buttons are disabled. They will be back to active when the user selects quantity.
const quantitySelected = (event) => {
  //get the type of the card from the id itself

  let card_type = event.target.id.split('_')[0];//gives the "type_quantity" as an id
  document.querySelector(`#${card_type}`).disabled = true;

  const quantity = event.target.value;
  if (quantity) { //meaning the user has seleted the quantity of the card to be purchased.

    //now the user has selected the quantity, activate the button.
    console.log(document.querySelector(`#${card_type}`));
    document.querySelector(`#${card_type}`).disabled = false;
  }
}
chellada_quantity.addEventListener('change', (event) => quantitySelected(event));
wallia_quantity.addEventListener('change', (event) => quantitySelected(event));
kebero_quantity.addEventListener('change', (event) => quantitySelected(event));

//purchased object example {type: 'chellada', quantity: 2 }

const addToCheckout = (type) => {
  console.log(this);
  //get valid card types
  let valid_types = Object.keys(cards);
  if (valid_types.includes(type)) {
    //create the object for checkout here.
    let checkout_card = {type: type, quantity: window[type+"_quantity"].value};
    checkout.push(checkout_card);
    updateCheckout();
  }
}
buy_chellada_card.addEventListener('click', () => addToCheckout('chellada'));
buy_wallia_card.addEventListener('click', () => addToCheckout('wallia'));
buy_kebero_card.addEventListener('click', () => addToCheckout('kebero'));

//Implementing the Buy Card Section
const buy_type = document.querySelector("#buy_type");
const buy_quantity = document.querySelector("#buy_quantity");
const buy_card = document.querySelector("#buy_card");

const addToCheckout2 = (type, quantity) => {
  console.log(this);
  type = type.value;
  quantity = quantity.value;
  //get valid card types
  let valid_types = Object.keys(cards); //valid_types = [kebero,chellada,wallia]
  if (valid_types.includes(type)) {
    //create the object for checkout here.
    let checkout_card = { type: type, quantity: quantity };
    console.log(checkout_card);
    checkout.push(checkout_card);
    updateCheckout();
  }
};

buy_card.addEventListener("click", () => addToCheckout2(buy_type, buy_quantity));


//Implementing show Balance
const balance = document.querySelector("#balance");

//Implementing Checkout update
const checkoutCounter = document.querySelector("#checkoutCounter");


//collect the emails of our subscribers in the email_subscribers array
let registerSub = document.querySelector("#subscribe");
let subEmail = document.querySelector("#sub-email");

const addToEmailArray = (emailAddress) => {
  email_subscribers.push(emailAddress.value)
  subEmail.requestFullscreen
  console.log(email_subscribers)
}

registerSub.addEventListener("click", () => addToEmailArray(subEmail))

//Add member
let registerBtn = document.querySelector("#register");
let fname = document.querySelector("#first_name");
let lname = document.querySelector("#last_name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");


const addMember = (fname, lname, email, phone) => {
  let member_card = {first_name: fname, last_name: lname, email: email, phone: phone}
  members.push(member_card)
  console.log(members)
  document.querySelector("#memberForm").reset()
}

registerBtn.addEventListener("click", () => addMember(fname.value, lname.value, email.value, phone.value))


//Add minutes
let addType = document.querySelector("#add_type")
let addAmount = document.querySelector("#add_minutes")
let addBtn = document.querySelector("#add_btn")

const addMinutes = (type, amount) => {
  if(checkout.length > 0){
    checkout.forEach((card) => {
      if(card.type == type.value){
        balance.innerText = +balance.innerText + +amount.value
      }
    })
  }
}

addBtn.addEventListener("click", () => addMinutes(addType,addAmount));
