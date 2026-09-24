let cards = JSON.parse(localStorage.getItem("expense_dets"));
function showExpense(card) {
    card.forEach(function (value) {
        let iconn = null;
        if (value.category === "Food") {
            iconn = "🍔";
        }
        else if (value.category === "Shopping") {
            iconn = "🛍️";
        } else if (value.category === "Travel") {
            iconn = "✈️";
        } else if (value.category === "Entertainment") {
            iconn = "🎬";
        } else if (value.category === "Bills") {
            iconn = "💳";
        } else {
            iconn = "📦";
        }

        function getDate(date) {
            const today = new Date();   // gives current day date. eg: Wed Sep 23 2026 20:30:00 , this is the format
            const expenseDate = new Date(date);  //converts our date into proper date format like above.

            //this makes the time 00:00:00 
            //why do this? so that the substraction happens properly.
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
        amountt.className = "expense-amount";
        amountt.textContent = "- ₹" + value.amount;

        transactionInfo.appendChild(title);
        transactionInfo.appendChild(details);

        transaction.appendChild(transactionIcon);
        transaction.appendChild(transactionInfo);
        transaction.appendChild(amountt);

        document.querySelector(".all-transactions").appendChild(transaction);
    });

}
const filterCategory = document.getElementById("filter-category");

showExpense(cards);

// console.log(filterCategory.value);

filterCategory.addEventListener("change", function () {

    let category = filterCategory.value;

    if (category === "all") {
        document.querySelector(".all-transactions").innerHTML="";
        showExpense(cards);
    }
    else {
        let filtered = cards.filter(function(card) {
            return card.category.toLowerCase() === category;
        });
        document.querySelector(".all-transactions").innerHTML="";
        showExpense(filtered);
    }

});

//
const addIncomeBtn = document.getElementById("add-income-btn");
const incomeForm = document.getElementById("income-form");
const closeIncomeForm = document.getElementById("close-income-form");

// addIncomeBtn.addEventListener("click", function () {
//     incomeForm.style.display = "block";
// })
// closeIncomeForm.addEventListener("click", function () {
//     incomeForm.style.display = "none";
// })

//form validation
const source = document.getElementById("income-source");
const amount = document.getElementById("income-amount");
const categoryy = document.getElementById("income-category");
const date = document.getElementById("income-date");
const note = document.getElementById("income-note");

let income_dets = JSON.parse(localStorage.getItem("income_dets")) || [];
document.querySelector("#income-form-data").addEventListener("submit", function (e) {

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
    else if (categoryy.value === "") {
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
            category: categoryy.value,
            date: date.value,
            note: note.value,
        }
        )

        localStorage.setItem("income_dets", JSON.stringify(income_dets));

        document.getElementById("income-form").style.display = "none";
    }

});

//search
// let category_data = ["all" ,"food","shopping","travel","bills","entertainment","other"];
let search = document.querySelector("#search-transactions");
search.addEventListener("input" , function(){
    let filterr = cards.filter(function(card){
        return card.category.toLowerCase().startsWith(search.value.toLowerCase());
    });
    document.querySelector(".all-transactions").innerHTML="";
    showExpense(filterr);
})