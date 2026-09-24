const addIncomeBtn = document.getElementById("add-income-btn");
const incomeForm = document.getElementById("income-form");
const closeIncomeForm = document.getElementById("close-income-form");

addIncomeBtn.addEventListener("click", function () {
    incomeForm.style.display = "block";
})
closeIncomeForm.addEventListener("click", function () {
    incomeForm.style.display = "none";
})

let income_dets = JSON.parse(localStorage.getItem("income_dets")) || [];
//form validation
const source = document.getElementById("income-source");
const amount = document.getElementById("income-amount");
const category = document.getElementById("income-category");
const date = document.getElementById("income-date");
const note = document.getElementById("income-note");


incomeForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let valid = true;


    // Source
    if (source.value.trim() === "") {
        alert("Please enter the income source.");
        valid = false;
    }


    // Amount
    else if (amount.value.trim() === "") {
        alert("Please enter the amount.");
        valid = false;
    }

    else if (Number(amount.value) <= 0) {
        alert("Amount must be greater than 0.");
        valid = false;
    }


    // Category
    else if (category.value === "") {
        alert("Please select a category.");
        valid = false;
    }


    // Date
    else if (date.value === "") {
        alert("Please select a date.");
        valid = false;
    }


    // Future date
    else {

        const selectedDate = new Date(date.value);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            alert("Date cannot be in the future.");
            valid = false;
        }
    }


    // If everything is valid
    if (valid) {

        console.log("Income is valid!");

        income_dets.push({
            source: source.value,
            amount: Number(amount.value),
            category: category.value,
            date: date.value,
            note: note.value,
        }
        )

        localStorage.setItem("income_dets", JSON.stringify(income_dets));

        // incomeForm.reset();

        document.getElementById("income-form").style.display = "none";
    }

});


//validate add expense form

let expense_dets = JSON.parse(localStorage.getItem("expense_dets")) || [];
const expenseForm = document.querySelector("#expense-form");

const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("amount");
const expenseCategory = document.getElementById("category");
const expenseDate = document.getElementById("date");


expenseForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let valid = true;


    // Expense name
    if (expenseName.value.trim() === "") {

        alert("Please enter the expense name.");

        valid = false;
    }


    // Amount
    else if (expenseAmount.value.trim() === "") {

        alert("Please enter the amount.");

        valid = false;
    }

    else if (Number(expenseAmount.value) <= 0) {

        alert("Amount must be greater than 0.");

        valid = false;
    }


    // Category
    else if (expenseCategory.value === "") {

        alert("Please select a category.");

        valid = false;
    }


    // Date
    else if (expenseDate.value === "") {

        alert("Please select a date.");

        valid = false;
    }


    // Future date
    else {

        const selectedDate = new Date(expenseDate.value);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {

            alert("Expense date cannot be in the future.");

            valid = false;
        }
    }


    // Everything is valid
    if (valid) {

        console.log("Expense is valid!");

        expense_dets.push({
            name: expenseName.value,
            amount: Number(expenseAmount.value),
            category: expenseCategory.value,
            date: expenseDate.value
        });
        localStorage.setItem("expense_dets", JSON.stringify(expense_dets));

        expenseForm.reset();
    }

});


// transactions cards..
let cards = JSON.parse(localStorage.getItem("expense_dets")) || [];

for (let i = 0; i < cards.length; i++) {

    let value = cards[i];

    let iconn = null;

    if (value.category === "Food") {
        iconn = "🍔";
    }
    else if (value.category === "Shopping") {
        iconn = "🛍️";
    }
    else if (value.category === "Travel") {
        iconn = "✈️";
    }
    else if (value.category === "Entertainment") {
        iconn = "🎬";
    }
    else if (value.category === "Bills") {
        iconn = "💳";
    }
    else {
        iconn = "📦";
    }


    function getDate(date) {

        const today = new Date();
        const expenseDate = new Date(date);

        today.setHours(0, 0, 0, 0);
        expenseDate.setHours(0, 0, 0, 0);

        const difference = today - expenseDate;

        if (difference === 0) {
            return "Today";
        }
        else if (difference === 24 * 60 * 60 * 1000) {
            return "Yesterday";
        }

        return date;
    }


    const transaction = document.createElement("div");
    transaction.className = "transaction";


    const transactionIcon = document.createElement("div");
    transactionIcon.className = "transaction-icon " + value.category;
    transactionIcon.textContent = iconn;


    const transactionInfo = document.createElement("div");
    transactionInfo.className = "transaction-info";


    const title = document.createElement("h3");
    title.textContent = value.name;


    const details = document.createElement("p");
    details.textContent = value.category + " • " + getDate(value.date);


    const amountt = document.createElement("strong");
    amountt.textContent = "- ₹" + value.amount;


    transactionInfo.appendChild(title);
    transactionInfo.appendChild(details);

    transaction.appendChild(transactionIcon);
    transaction.appendChild(transactionInfo);
    transaction.appendChild(amountt);

    document.querySelector(".transaction-list").append(transaction);


    // Stop after 4 transactions
    if (i >= 3) {
        break;
    }
}
//
let total_income = document.querySelector(".card.income h2");
let income = JSON.parse(localStorage.getItem("income_dets")) || [];
let lastIncome = income[income.length - 1];
total_income.textContent = "₹" + lastIncome.amount;
// console.log(total_income);

//
let total_expense = document.querySelector(".card.expense h2");
let total = 0;
cards.forEach(function(val){
    total = total + val.amount;
});
total_expense.textContent = "₹" +  total;

//
let total_balance = document.querySelector(".card.balance h2");
total_balance.textContent = "₹" + (lastIncome.amount - total);


//clicking the + expense btn will scroll down to expense form
document.getElementById("add-expense-btn").onclick = function() {
    document.querySelector(".expense-form").scrollIntoView(
        {
            behavior : "smooth"
        }
    );
};