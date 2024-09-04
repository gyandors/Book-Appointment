let editing = false;
let editingId = null;

function handleForm(event) {
  event.preventDefault();
  const userName = event.target.userName.value;
  const userEmail = event.target.userEmail.value;
  const userPhone = event.target.userPhone.value;

  const obj = { userName, userEmail, userPhone };

  if (!editing) {
    axios
      .post("http://localhost:3000/api/appointments", obj)
      .then((result) => {
        showRecordsOnScreen({ ...obj, _id: result.data._id });
        makeFieldsEmpty();
      })
      .catch((error) => console.log(error));
  } else {
    axios
      .put(`http://localhost:3000/api/appointments/${editingId}`, obj)
      .then((result) => {
        showRecordsOnScreen({ ...obj, _id: editingId });
        makeFieldsEmpty();
        editing = false;
        editingId = null;
      })
      .catch((error) => console.log(error));
  }
}

window.addEventListener("DOMContentLoaded", function () {
  axios
    .get("http://localhost:3000/api/appointments")
    .then((result) => {
      for (let val of result.data) showRecordsOnScreen(val);
    })
    .catch((error) => console.log(error));
});

const records = document.getElementById("records");
function showRecordsOnScreen(obj) {
  const list = document.createElement("li");
  list.innerHTML = `${obj.userName} - ${obj.userEmail} - ${obj.userPhone} `;

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "Delete";
  delBtn.addEventListener("click", () => {
    axios
      .delete(`http://localhost:3000/api/appointments/${obj._id}`)
      .then((result) => {
        records.removeChild(delBtn.parentElement);
      })
      .catch((error) => console.log(error));
  });
  list.appendChild(delBtn);

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  editBtn.addEventListener("click", () => {
    editing = true;
    editingId = obj._id;
    document.getElementById("userName").value = obj.userName;
    document.getElementById("userEmail").value = obj.userEmail;
    document.getElementById("userPhone").value = obj.userPhone;
    records.removeChild(editBtn.parentElement);
  });
  list.appendChild(editBtn);

  records.appendChild(list);
}

function makeFieldsEmpty() {
  document.getElementById("userName").value = "";
  document.getElementById("userEmail").value = "";
  document.getElementById("userPhone").value = "";
}
