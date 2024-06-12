const axiosInstance = axios.create({
  baseURL: "http://localhost:4001",
});
const form = document.getElementById("expenseTracker");
const ulExpense = document.getElementById("expenses");
let selectedId = null;
document.addEventListener("DOMContentLoaded", function () {
  axiosInstance
    .get("/expense")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) renderList(res.data[i]);
    })
    .catch((err) => console.log(err));
});
function renderList({ id, expenseAmount, description, category }) {
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger m-2";
  deleteButton.innerText = "delete";
  deleteButton.addEventListener("click", handleDelete);
  const editButton = document.createElement("button");
  editButton.className = "btn btn-info";
  editButton.innerText = "edit";
  editButton.addEventListener("click", handleEdit);
  const span = document.createElement("span");
  span.innerText = `${expenseAmount} \u200B ${description} \u200B${category}\u200B`;
  const list = document.createElement("li");
  list.id = id;
  list.className = "list-group-item";
  list.appendChild(span);
  list.appendChild(deleteButton);
  list.appendChild(editButton);
  ulExpense.appendChild(list);
}
function handleSubmit(e) {
  e.preventDefault();
  const expenseAmount = e.target.expenseAmount.value.trim();
  const description = e.target.description.value.trim();
  const category = e.target.cat.value;
  const expenseData = { expenseAmount, description, category };
  if (selectedId) {
    handleFormUpdate(expenseData);
  } else {
    axiosInstance
      .post("/expense", expenseData)
      .then((res) => renderList(res.data))
      .catch((err) => console.log(err));
  }
  form.reset();
}
function handleFormUpdate(expenseData) {
  // const { expenseAmount, description, category } = expenseData;
  // const li = document.getElementById(selectedId);
  // li.firstChild.data = `${expenseAmount} \u200B ${description} \u200B${category}\u200B`;
  axiosInstance
    .put(`/expense/${selectedId}`, expenseData)
    .then((res) => {
      const { id, expenseAmount, description, category } = res.data;
      const spanElement = document.querySelector(`#${CSS.escape(id)} span`);
      spanElement.innerText = `${expenseAmount} \u200B ${description} \u200B${category}\u200B`;
    })
    .catch((err) => console.log(err));
  selectedId = null;
}

function handleDelete(e) {
  e.preventDefault();
  const id = e.target.parentNode.id;
  ulExpense.removeChild(e.target.parentNode);
  axiosInstance
    .delete(`/expense/${id}`)
    .then((res) => {
      console.log("deleted successfully");
    })
    .catch((err) => console.log(err));
}

function handleEdit(e) {
  e.preventDefault();
  const li = e.target.parentNode;
  selectedId = li.id;
  const [expenseAmount, description, category] = li.innerText.split("\u200B");
  document.getElementById("expenseAmount").value = expenseAmount.trim();
  document.getElementById("description").value = description.trim();
  document.getElementById("category").value = category.trim();
}
