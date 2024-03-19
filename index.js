function handleForm(event) {
  event.preventDefault();
  const userName = event.target.userName.value;
  const userEmail = event.target.userEmail.value;
  const userPhone = event.target.userPhone.value;

  const obj = { userName, userEmail, userPhone };

  // localStorage.setItem(userPhone, JSON.stringify(obj));

  axios
    .post(
      'https://crudcrud.com/api/d8c129cd8f48450fb6808aafec858be0/Appointments',
      obj
    )
    .then((result) => {
      showRecordsOnScreen(obj);
      alert(`Appointment booked and your unique id is: ${result.data._id}`);
    })
    .catch((err) => {
      console.log(err);
    });

  document.getElementById('userName').value = '';
  document.getElementById('userEmail').value = '';
  document.getElementById('userPhone').value = '';
}

window.addEventListener('DOMContentLoaded', function () {
  // const keysOfLocalStorage = Object.keys(this.localStorage);
  // keysOfLocalStorage.forEach((ele) => {
  //   showRecordsOnScreen(JSON.parse(this.localStorage.getItem(ele)));
  // });

  axios
    .get(
      'https://crudcrud.com/api/d8c129cd8f48450fb6808aafec858be0/Appointments'
    )
    .then((result) => {
      const arrayOfobj = result.data;
      for (let val of arrayOfobj) showRecordsOnScreen(val);
    })
    .catch((err) => {
      console.log(err);
    });
});

function showRecordsOnScreen(obj) {
  const records = document.getElementById('records');

  const list = document.createElement('li');
  list.innerHTML = `${obj.userName} - ${obj.userEmail} - ${obj.userPhone} `;

  const delBtn = document.createElement('button');
  delBtn.innerHTML = 'Delete';
  delBtn.addEventListener('click', () => {
    records.removeChild(delBtn.parentElement);
    // localStorage.removeItem(obj.userPhone);
    axios
      .delete(
        `https://crudcrud.com/api/d8c129cd8f48450fb6808aafec858be0/Appointments/${obj._id}`
      )
      .then((result) => {
        alert('Record removed');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  list.appendChild(delBtn);

  const editBtn = document.createElement('button');
  editBtn.innerHTML = 'Edit';
  editBtn.addEventListener('click', () => {
    records.removeChild(editBtn.parentElement);
    // localStorage.removeItem(obj.userPhone);
    axios
      .delete(
        `https://crudcrud.com/api/d8c129cd8f48450fb6808aafec858be0/Appointments/${obj._id}`
      )
      .then((result) => {
        alert('Edit the details then submit');
      })
      .catch((err) => {
        console.log(err);
      });

    document.getElementById('userName').value = obj.userName;
    document.getElementById('userEmail').value = obj.userEmail;
    document.getElementById('userPhone').value = obj.userPhone;
  });
  list.appendChild(editBtn);

  records.appendChild(list);
}
