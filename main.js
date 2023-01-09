const BASE_URL = "https://user-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const userList = document.querySelector("#user-list");

// 展開全部使用者
function renderUserList(data) {
  let html = "";
  data.forEach((item) => {
    html += `<div class="card" style="width: 15rem" >
      <img class="card-img-top userImage"
           src="${item.avatar}"
           alt="user picture"
           data-id="${item.id}"
           data-bs-toggle="modal"
           data-bs-target="#user-modal"
          >
      <div class="card-body">
        <p class="card-title">${item.name} ${item.surname}</p>
      </div>
    </div>`;
  });
  userList.innerHTML = html;
}

axios.get(INDEX_URL).then((response) => {
  const user = response.data.results;
  renderUserList(user);
});

// 點照片出現詳細資料
function showUserInfo(id) {
  const title = document.querySelector("#user-modal-title");
  const img = document.querySelector("#user-modal-img");
  const email = document.querySelector("#user-modal-email");
  const gender = document.querySelector("#user-modal-gender");
  const age = document.querySelector("#user-modal-age");
  const region = document.querySelector("#user-modal-region");
  const birthday = document.querySelector("#user-modal-birthday");

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data;

    title.innerText = data.name + " " + data.surname;
    img.src = data.avatar;
    email.innerText = "EMAIL: " + data.email;
    gender.innerText = "GENDER: " + data.gender;
    age.innerText = "AGE: " + data.age;
    region.innerText = "REGION: " + data.region;
    birthday.innerText = "BIRTHDAY: " + data.birthday;
  });
}

userList.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".userImage")) {
    showUserInfo(Number(event.target.dataset.id));
  }
});
