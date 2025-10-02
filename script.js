// Step 1: Select elements
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addBtn = document.getElementById("add-btn");
const transactionList = document.getElementById("transaction-list");

// Summary fields
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

// Transactions array
let transactions = [];

// Step 2: Button click event
addBtn.addEventListener("click", () => {
  const description = descriptionInput.value;
  const amount = Number(amountInput.value);
  const type = typeSelect.value;

  if (description === "" || amount === 0) {
    alert("Please enter description and amount!");
    return;
  }

  // Create transaction object
  const transaction = {
    description: description,
    amount: amount,
    type: type
  };

  // Add to array
  transactions.push(transaction);

  // Display transaction in list
  const li = document.createElement("li");
  li.textContent = `${type.toUpperCase()}: ${description} - ₹${amount}`;
  li.classList.add(type);
  transactionList.appendChild(li);

  // Update summary
  updateSummary();

  // Clear inputs
  descriptionInput.value = "";
  amountInput.value = "";
});

// Step 3: Function to calculate totals
function updateSummary() {
  let income = 0;
  let expense = 0;

  transactions.forEach(tx => {
    if (tx.type === "income") {
      income += tx.amount;
    } else {
      expense += tx.amount;
    }
  });

  let balance = income - expense;

  // Update UI
  incomeEl.textContent = income;
  expenseEl.textContent = expense;
  balanceEl.textContent = balance;
}
