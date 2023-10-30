// Getting DOM elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const showMilBtn = document.getElementById("show-mil");
const sortBtn = document.getElementById("sort");
const totalBtn = document.getElementById("cal-to-wealth");

// Empty Array
let data = [];

// Create initial users
generateRandomUser();
generateRandomUser();
generateRandomUser();

// Function to fetch random user from API
// API: randomuser.me/api

async function generateRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    worth: Math.round(Math.random() * 1000000),
  };
  addData(newUser);
}

// Function to double the net worth
function doubleworth() {
  data = data.map((item) => {
    return { ...item, worth: item.worth * 2 };
  });

  updateDOM();
}

// function to sort the user by richest
function sortRichest() {
  data.sort((a, b) => b.worth - a.worth);

  updateDOM();
}

// function to calculate all users
function calculateTotalNetWorth() {
  const total = data.reduce((acc, item) => (acc += item.worth), 0);
  const TOTALWORTH = document.createElement("div");
  TOTALWORTH.innerHTML = `<h3>Total Net Worth: <strong>${formatCurrency(total)}</strong></h3>`;
  main.appendChild(TOTALWORTH);
}

// Add Newly Genrated User into the Data Array
function addData(newUser) {
  data.push(newUser);

  updateDOM();
}

// Function to showMilBtn
function showMillBtn() {
  data = data.filter((item) => item.worth > 1000000);

  updateDOM();
}

// Function to update the ui with DOM
function updateDOM(inputData = data) {
  main.innerHTML = "<h2><strong>Name</strong> Net Worth</h2>";

  inputData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("name");
    element.innerHTML = `<strong>${item.name}</strong>${formatCurrency(
      item.worth
    )}`;
    main.appendChild(element);
  });
}

// Function to format a number as a currency
function formatCurrency(num) {
  return "PKR " + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event Listeners
// add-user event listener

addUserBtn.addEventListener("click", generateRandomUser);

// add double money event listener
doubleMoneyBtn.addEventListener("click", doubleworth);

// sort event listener
sortBtn.addEventListener("click", sortRichest);

// add showMilBtn event listener
showMilBtn.addEventListener("click", showMillBtn);

// add calwealth
totalBtn.addEventListener("click", calculateTotalNetWorth);
