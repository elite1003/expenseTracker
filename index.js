const form = document.getElementById("expenseTracker");
const ulExpense = document.getElementById("expenses");
let listKey = 0;
function handleSubmit(e) {
  e.preventDefault();
  console.log("submit");
  renderList(e);
  form.reset();
}
function renderList(e) {
  console.log("render");
  const expenseAmount = e.target.expenseAmount.value;
  const description = e.target.description.value;
  const cat = e.target.cat.value;
  const expense = {
    expenseAmount,
    description,
    cat,
  };
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.innerText = "delete";
  deleteButton.addEventListener("click", handleDelete);
  const editButton = document.createElement("button");
  editButton.className = "btn btn-info";
  editButton.innerText = "edit";
  editButton.addEventListener("click", handleEdit);
  const list = document.createElement("li");
  list.id = listKey;
  const expenseString = JSON.stringify(expense);
  localStorage.setItem(listKey, expenseString);
  listKey = listKey + 1;
  list.className = "list-group-item";
  list.innerText = `${expenseAmount} - ${cat} - ${description} `;
  list.appendChild(deleteButton);
  list.appendChild(editButton);
  ulExpense.appendChild(list);
}

function handleDelete(e) {
  console.log("delete");
  e.preventDefault();
  const listKey = e.target.parentNode.id;
  localStorage.removeItem(listKey);
  ulExpense.removeChild(e.target.parentNode);
}

function handleEdit(e) {
  console.log("edit");
  e.preventDefault();
  const listKey = e.target.parentNode.id;
  const expenseString = localStorage.getItem(listKey);
  const { expenseAmount, description, cat } = JSON.parse(expenseString);
  document.getElementById("expenseAmount").value = expenseAmount;
  document.getElementById("description").value = description;
  document.getElementById("category").value = cat;
  handleDelete(e);
}
