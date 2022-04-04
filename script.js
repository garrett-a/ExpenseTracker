"use strict";

const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("categories");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("button");
const table = document.querySelector(".table");
const tableContainer = document.querySelector(".table-container");
const noExpenseRow = document.querySelector(".no-expense");
const tableBody = document.querySelector("tbody");

const localStorageExpenses = JSON.parse(localStorage.getItem("expenses"));
let expenses =
  localStorage.getItem("expenses") !== null ? localStorageExpenses : [];

addBtn.addEventListener("click", function () {
  if (nameInput.value && dateInput.value && amountInput.value) {
    addExpenseToCategory(categoryInput.value, amountInput.value);
    pushExpense();
    addExpense();
  }
  return;
});

document.body.onkeydown = function (e) {
  if (e.keyCode == 13)
    if (nameInput.value && dateInput.value && amountInput.value) {
      addExpenseToCategory(categoryInput.value, amountInput.value);
      pushExpense();
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
    const iconTd = document.createElement("td");
    const xmarkIcon = document.createElement("i");
    xmarkIcon.className = "fa-solid fa-xmark";

    tableDataName.innerHTML = item.name;
    tableDataDate.innerHTML = item.date;
    tableDataCategory.innerHTML = item.category;
    tableDataAmount.innerHTML = `$${item.amount}`;

    xmarkIcon.addEventListener("click", function () {
      removeExpense(item.id);
      removeExpenseToCategory(item.category, item.amount);
      chartToLocalStorage();
      tableRow.remove();
      xmarkIcon.remove();
    });

    tableRow.append(
      tableDataName,
      tableDataDate,
      tableDataCategory,
      tableDataAmount,
      iconTd
    );
    iconTd.append(xmarkIcon);
    tableBody.append(tableRow);

    toLocalStorage();

    // Clear all fields
    nameInput.value = "";
    dateInput.value = "";
    amountInput.value = "";
    noExpenseRow.style.display = "none";
  });
}

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
};

// REMOVE EXPENSE FROM ARRAY
const removeExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);

  toLocalStorage();
};

// INPUT LOCAL STORAGE
const toLocalStorage = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

//TODO:
// stop th from shifting
// add pagination

//////////////////////////////
// CHART

const localStorageChart = JSON.parse(localStorage.getItem("chart-data"));
let chartData =
  localStorage.getItem("chart-data") !== null
    ? localStorageChart
    : [0, 0, 0, 0, 0, 0, 0];

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
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
          "rgba(153, 102, 255, 0.9)",
          "rgba(255, 159, 64, 0.9)",
          "rgba(2, 159, 64, 0.9)",
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
        borderWidth: 4,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: "#eee",
          usePointStyle: true,
          font: {
            size: 14,
            family: "Open Sans",
          },
        },
      },
    },
    responsive: true,
  },
});

// ADD USER INPUT TO CHART
const addExpenseToCategory = (category, amount) => {
  const lowercaseLabels = myChart.data.labels.map((l) => l.toLowerCase());
  const index = lowercaseLabels.indexOf(category.toLowerCase());

  if (index !== -1) {
    myChart.data.datasets[0].data[index] += parseInt(amount);
    myChart.update();
  }

  chartToLocalStorage();
};

// REMOVE USER INPUT FROM CHART
const removeExpenseToCategory = (category, amount) => {
  const lowercaseLabels = myChart.data.labels.map((l) => l.toLowerCase());
  const index = lowercaseLabels.indexOf(category.toLowerCase());

  if (index !== -1) {
    myChart.data.datasets[0].data[index] -= parseInt(amount);
    myChart.update();
  }

  chartToLocalStorage;
};

// CHART DATA LOCAL STORAGE
const chartToLocalStorage = () => {
  localStorage.setItem(
    "chart-data",
    JSON.stringify(myChart.data.datasets[0].data)
  );
};

const init = () => {
  addExpense(expenses);
};
init();
