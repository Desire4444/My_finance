const dp_amount = document.getElementById("deposit_input");
const dp_button = document.getElementById("deposit_button");
const wd_amount = document.getElementById("withdraw_input");
const wd_button = document.getElementById("withdraw_button");
const resetButton = document.getElementById("reset_button");
const balanceDisplay = document.getElementById("balance");
const transactionListDisplay = document.getElementById("transaction_list");

let currentBalance = Number(localStorage.getItem("savedBalance")) || 0;
balanceDisplay.textContent = "Mwk " + currentBalance.toFixed(2);

// Load transactions from local storage
let transactions = JSON.parse(localStorage.getItem("savedTransaction")) || [];

// load saved transactions
function renderTransactions(){
    // clear list to avoid duplication
    transactionListDisplay.innerHTML = "";

    // loop through each transaction in our array
    transactions.forEach(item => { 
        const li = document.createElement("li");
        li.textContent = `${item.type}: Mwk ${item.amount.toFixed(2)} (${item.date})`;
        
        if(item.type === "Deposit"){
            li.classList.add("deposit");
        }
        else{
            li.classList.add("withdraw")
        }
        transactionListDisplay.appendChild(li);
    });
}
// show immediatly after page loads to show history
renderTransactions();

dp_button.addEventListener("click", function(event){
event.preventDefault();

    if(dp_amount.value === "" || dp_amount.value <= 0){
        alert("Enter a valid value!");
        return;
    }
    console.log(dp_amount.value);
    const depositValue = Number(dp_amount.value);
    currentBalance += depositValue;

    const newTransaction = {
        type: "Deposit",
        amount: depositValue,
        date: new Date().toLocaleTimeString() // get time
    };

    // add transaction to array
    transactions.push(newTransaction);

    // save transaction to local storage
    localStorage.setItem("savedTransaction", JSON.stringify(transactions));

    // save to local storage
    localStorage.setItem("savedBalance", currentBalance);
    balanceDisplay.textContent = "Mwk " + currentBalance.toFixed(2);
    dp_amount.value = "";
    renderTransactions();
});

wd_button.addEventListener("click", function(event){
    event.preventDefault();

    if(wd_amount.value === "" || wd_amount.value <= 0){
        alert("Enter a valid value!");
        return;
    }

    if(wd_amount.value > currentBalance){
        alert("Insufficient funds! You can't perform this");
        return;
    }

    console.log(wd_amount.value);
    const withdrawValue = Number(wd_amount.value);
    currentBalance -= withdrawValue;

    const newTransaction = {
        type: "Withdraw",
        amount: withdrawValue,
        date: new Date().toLocaleTimeString() // get time
    };

    // add transaction to array
    transactions.push(newTransaction);

    // save transaction to local storage as string
    localStorage.setItem("savedTransaction", JSON.stringify(transactions));

    // save to local storage
    localStorage.setItem("savedBalance", currentBalance);
    balanceDisplay.textContent = "Mwk " + currentBalance.toFixed(2);
    wd_amount.value = "";
    renderTransactions();
})

// resetting
resetButton.addEventListener("click", function(event){
    event.preventDefault();

    if(confirm("Are you sure you want to reset balance?")){
        currentBalance = 0;
        transactions = [];
        localStorage.removeItem("savedBalance");
        localStorage.removeItem("savedTransactions");
        balanceDisplay.textContent = "Mwk " + currentBalance.toFixed(2);
        renderTransactions();
    }
});
