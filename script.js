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
// get chart context
const ctx = document.getElementById("financeChart").getContext("2d");

// Load transactions from localStorage or empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Display transactions
function displayTransactions() {
  transactionList.innerHTML = "", // clear existing list
  transactions.forEach(transaction => {
    const li = document.createElement("li");
    li.textContent = `${transaction.type.toUpperCase()}: ${transaction.description} - ₹${transaction.amount}`;
    li.classList.add(transaction.type);

      // Create Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.style.cursor = "pointer";

  // Attach delete functionality
  deleteBtn.addEventListener("click", () => {
    // Remove transaction from array
    transactions = transactions.filter(t => t !== transaction);

    // Remove from DOM
    transactionList.removeChild(li);
    updateSummary();
  });

  li.appendChild(deleteBtn);
  transactionList.appendChild(li);
  });
}

// Button click event
addBtn.addEventListener("click", () => {
  const description = descriptionInput.value;
  const amount = Number(amountInput.value);
  const type = typeSelect.value;

  if (description === "" || amount === 0) {
    alert("Please enter description and amount!");
    return;
  }

  // Create transaction object
  const transaction = { description, amount, type };
  // Add to array
  transactions.push(transaction);

  updateLocalStorage();
  displayTransactions();
  updateSummary();

  // Clear inputs
  descriptionInput.value = "";
  amountInput.value = "";
});

// update summary
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

  // Update Chart
  financeChart.data.datasets[0].data = [income, expense];
  financeChart.update();
}

let financeChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Income", "Expense"],
    datasets: [{
      label: "Finance Overview",
      data: [0, 0], // will update dynamically
      backgroundColor: ["#4CAF50", "#F44336"], // green income, red expense
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initial display
displayTransactions();
updateSummary();