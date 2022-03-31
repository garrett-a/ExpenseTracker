"use strict";

const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("categories");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("button");
const table = document.querySelector(".table");
const tableContainer = document.querySelector(".table-container");
const noExpenseRow = document.querySelector(".no-expense");
const deleteRow = document.querySelector(".delete-row");
const tableBody = document.querySelector("tbody");

let expenses = [{ id: "", name: "", date: "", category: "", amount: "" }];

// MAKE BUTTON DO NOTHING IF EMPTY
addBtn.addEventListener("click", function () {
  if (nameInput.value && dateInput.value && amountInput.value) {
    addExpenseToCategory(categoryInput.value, amountInput.value);
    pushExpense();
    console.log(expenses);
    addExpense();
  }
  return;
});

document.body.onkeydown = function (e) {
  if (e.keyCode == 13)
    if (nameInput.value && dateInput.value && amountInput.value) {
      addExpenseToCategory(categoryInput.value, amountInput.value);
      pushExpense();
      console.log(expenses);
      addExpense();
    }
  return;
};

// ADD USER INPUT TO THE DOM
function addExpense() {
  tableBody.innerHTML = "";
  expenses.forEach((item, index) => {
    const tableRow = document.createElement("tr");
    tableRow.classList = "input-table-row";

    const tableDataName = document.createElement("td");
    const tableDataDate = document.createElement("td");
    const tableDataCategory = document.createElement("td");
    const tableDataAmount = document.createElement("td");
    const xmarkIcon = document.createElement("i");
    xmarkIcon.className = "fa-solid fa-xmark";

    tableDataName.innerHTML = item.name;
    tableDataDate.innerHTML = item.date;
    tableDataCategory.innerHTML = item.category;
    tableDataAmount.innerHTML = `$${item.amount}`;

    xmarkIcon.addEventListener("click", function () {
      removeExpenseToCategory(index);
      tableRow.remove();
      xmarkIcon.remove();
      console.log(expenses);
    });

    tableRow.append(
      tableDataName,
      tableDataDate,
      tableDataCategory,
      tableDataAmount,
      xmarkIcon
    );
    tableBody.append(tableRow);

    // Clear all fields
    nameInput.value = "";
    dateInput.value = "";
    amountInput.value = "";
    noExpenseRow.style.display = "none";
  });
}
// // ADD USER INPUT TO THE DOM
// function addExpense() {
//   const tableRow = document.createElement("tr");
//   tableRow.classList = "input-table-row";
//   const tableDataName = document.createElement("td");
//   const tableDataDate = document.createElement("td");
//   const tableDataCategory = document.createElement("td");
//   const tableDataAmount = document.createElement("td");
//   const xmarkIcon = document.createElement("i");

//   // Insert input values
//   tableDataName.innerHTML = nameInput.value;
//   tableRow.appendChild(tableDataName);

//   tableDataDate.innerHTML = dateInput.value;
//   tableRow.appendChild(tableDataDate);

//   tableDataCategory.innerHTML = categoryInput.value;
//   tableRow.appendChild(tableDataCategory);

//   tableDataAmount.innerHTML = `$${amountInput.value}`;
//   tableRow.appendChild(tableDataAmount);

//   xmarkIcon.className = "fa-solid fa-xmark";
//   tableRow.appendChild(xmarkIcon);

//   xmarkIcon.addEventListener("click", function () {
//     removeExpenseToCategory(this.id);
//     tableRow.remove();
//     xmarkIcon.remove();
//     console.log(expenses);
//   });

//   table.appendChild(tableRow);

//   // Clear all fields
//   nameInput.value = "";
//   dateInput.value = "";
//   amountInput.value = "";
//   noExpenseRow.style.display = "none";
// }

//TODO:
// make x remove value from expenses
// stop th from shifting
// add pagination

//////////////////////////////
// CHART
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [
      "Rent",
      "Utilities",
      "Food",
      "Transportation",
      "Insurance",
      "Clothing",
      "Personal",
    ],
    datasets: [
      {
        label: "Categories",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(2, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(2, 159, 64, 1)",
        ],
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
  },
});

//// ADD USER INPUT TO CHART
const addExpenseToCategory = (category, amount) => {
  const lowercaseLabels = myChart.data.labels.map((l) => l.toLowerCase());
  const index = lowercaseLabels.indexOf(category.toLowerCase());

  if (index !== -1) {
    myChart.data.datasets[0].data[index] += parseInt(amount);
    myChart.update();
    console.log(myChart.data.datasets[0].data);
  }
};

//// REMOVE USER INPUT FROM CHART
const removeExpenseToCategory = (index) => {
  expenses = expenses.filter((expense, index) => expense.index !== index);
};
// //// REMOVE USER INPUT FROM CHART
// const removeExpenseToCategory = (expense) => {
//   expenses = expenses.filter((expense) => expense.index !== index);
// };

// PUSH INPUT TO EXPENSES OBJECT
const pushExpense = function () {
  let expense = {
    id: Date.now(),
    name: nameInput.value,
    date: dateInput.value,
    category: categoryInput.value,
    amount: amountInput.value,
  };
  return expenses.push(expense);
  console.log(expenses);
};
