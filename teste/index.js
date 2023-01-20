const table = document.querySelector('table tbody');
// const buttonDelete = document.querySelector('#delete-btn');
// const input = document.querySelector('#delete');

const buttonInsert = document.querySelector('#insert-btn');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');


async function showTable() {
  const response = await fetch('users.php?action=get');
  const data = await response.json();
  // console.log(data);

  table.innerHTML = '';
  const users = data.users;
  users.forEach(user => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="delete-btn">🗑</td>
      <td>${ user.id }</td>
      <td>${ user.name }</td>
      <td>${ user.email }</td>
    `;
    table.insertAdjacentElement('beforeend', row);

    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      removeUser(user.id);
    })
  });
}
showTable();

async function removeUser(id) {
  let vars = {
    action: 'delete',
    id: id
  }
  vars = new URLSearchParams(vars).toString();
  await fetch(`users.php?${vars}`);
  await showTable();
};

buttonInsert.addEventListener('click', async () => {
  let vars = {
    action: 'insert',
    name: name.value,
    email: email.value,
    password: password.value,
  };
  // console.log(vars);
  vars = new URLSearchParams(vars).toString();
  const response = await fetch(`users.php`, {
    method: 'POST',
    body: vars,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  const data = await response.json();
  console.log(data);
  await showTable();
})