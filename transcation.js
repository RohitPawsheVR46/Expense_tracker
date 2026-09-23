let cards = JSON.parse(localStorage.getItem("expense_dets"));
    cards.forEach(function(value){
        let iconn = null;
    if(value.category === "Food"){
        iconn = "🍔";
    }
    else if(value.category === "Shopping"){
        iconn = "🛍️";
    } else if(value.category === "Travel"){
        iconn = "✈️";
    } else if(value.category === "Entertainment"){
        iconn = "🎬";
    } else if(value.category === "Bills"){
        iconn = "💳";
    } else {
        iconn = "📦";
    }

    function getDate(date){
        const today = new Date();   // gives current day date. eg: Wed Sep 23 2026 20:30:00 , this is the format
        const expenseDate = new Date(date);  //converts our date into proper date format like above.

        //this makes the time 00:00:00 
        //why do this? so that the substraction happens properly.
        today.setHours(0,0,0,0);
        expenseDate.setHours(0,0,0,0);
        
        const difference = today - expenseDate;
        
        if(difference === 0){
            return "Today";
        }
        else if(difference === 24 * 60 * 60 * 1000){
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
