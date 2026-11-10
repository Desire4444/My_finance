const dp_amount = document.getElementById("deposit_input");
const dp_button = document.getElementById("deposit_button");
const wd_amount = document.getElementById("withdraw_input");
const wd_button = document.getElementById("withdraw_button");
const balanceDisplay = document.getElementById("balance");

let currentBalance = 0;

dp_button.addEventListener("click", function(event){
    event.preventDefault();

    if(dp_amount.value == "" || dp_amount.value <= 0){
        alert("Enter a valid value!");
        return;
    }

    console.log(dp_amount.value);
    const deposit_value = Number(dp_amount.value);
    currentBalance += deposit_value;

    balanceDisplay.textContent = "Mwk " + currentBalance.toFixed(2);
    dp_amount.value = "";
});

wd_button.addEventListener("click", function(event){
    event.preventDefault();

    if(wd_amount.value == "" || wd_amount.value <= 0){
        alert("Enter a valid value!");
        return;
    }

    if(wd_amount.value > currentBalance){
        alert("Insufficient funds! You can't perform this");
        return;
    }

    console.log(wd_amount.value);
    const withdraw_value = Number(wd_amount.value);
    currentBalance -= withdraw_value;


    balanceDisplay.textContent = "Mwk " + currentBalance.toFixed(2);
    wd_amount.value = "";

})