///////////////////////////  Variables  /////////////////////////////////////////////////
// Login Variables //////////////////////////////////////////////////////////////////////
var loginEmail = document.getElementById("email");
var loginPassword = document.getElementById("password");
var loginBtn = document.getElementById("logBtn");
var loginError = document.getElementById("loginError");
// signUp Variables  //////////////////////////////////////////////////////////////////////
var signName = document.getElementById("signName");
var signEmail = document.getElementById("signEmail");
var signPassword = document.getElementById("signPassword");
var signBtn = document.getElementById("signBtn");
var signError = document.getElementById("signError");
// home Variables  //////////////////////////////////////////////////////////////////////
var homeUser = document.getElementById("homeUser");
var search = document.getElementById("search");
var searchWord = document.getElementById("searchWord");

/////Users from LocalStorage /////////////////////////////////////////////////////////////
var users = [];
if (JSON.parse(localStorage.getItem("users")) != null) {
  users = JSON.parse(localStorage.getItem("users"));
}

///////////////////////EventListeners//////////////////////////////////////////////////////
if (loginBtn)
  loginBtn.addEventListener("click", function () {
    logging(loginEmail.value, loginPassword.value, loginError);
  });
if (signBtn)
  signBtn.addEventListener("click", function () {
    signingUp(signName.value, signEmail.value, signPassword.value, signError);
  });
if (homeUser) {
  homeUser.innerHTML = JSON.parse(localStorage.getItem("logedUser"));
  viewNews();
}
if (search)
  search.addEventListener("click", function (e) {
    e.preventDefault();
    viewNews(searchWord.value);
  });
//////////////////////////////////////Functions//////////////////////////////////////////////////
///////SignUp Function///////////////////////////////////////////////////////////////////////////
function signingUp(name, email, password, messagePlace) {
  if (!nameValidation(name)) {
    messagePlace.innerHTML = "Enter valid Name";
    return;
  }
  if (!emailValidation(email)) {
    messagePlace.innerHTML = "Enter valid Email";
    return;
  }
  if (users.length > 0) {
    for (var i = 0; i < users.length; i++) {
      if (signEmail.value === users[i].email) {
        messagePlace.innerHTML = "This email already exists";
        return;
      }
    }
  }
  if (!passwordValidation(password)) {
    messagePlace.innerHTML = "Enter valid Password";
    return;
  }

  addingUser(name, email, password);
  messagePlace.classList.remove("text-danger");
  messagePlace.classList.add("text-success");
  messagePlace.innerHTML = "SUCCESS";
  document.location.href = "index.html";
}
function addingUser(name, email, password) {
  var user = {
    name,
    email,
    password,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

///////Log Function///////////////////////////////////////////////////////////////////////////////
function logging(email, password, messagePlace) {
  if (!emailValidation(email)) {
    messagePlace.innerHTML = "Enter valid Email";
    return;
  }
  for (var i = 0; i < users.length; i++) {
    if (loginEmail.value === users[i].email) {
      if (users[i].password === password) {
        messagePlace.classList.remove("text-danger");
        messagePlace.classList.add("text-success");
        messagePlace.innerHTML = "logging in......";
        localStorage.setItem("logedUser", JSON.stringify(users[i].name));
        document.location.href = "home.html";
        return;
      } else {
        messagePlace.innerHTML = "wrong password";
        return;
      }
    }
  }
  messagePlace.innerHTML = "user does NOT exist";
  return;
}

///////Validations Functions///////////////////////////////////////////////////////////////////////////////
function emailValidation(email) {
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    "gm"
  );
  return emailRegex.test(email) && email.length > 0;
}
function nameValidation(name) {
  return name.length > 2;
}
function passwordValidation(password) {
  return password.length > 2;
}

/////// Home Function  ///////////////////////////////////////////////////////////////////////////////////
function viewNews(search = "egypt") {
  var httpreq = new XMLHttpRequest();
  httpreq.open(
    "GET",
    `https://newsapi.org/v2/everything?q=${search}&pageSize=10&language=en&sortBy=publishedAt&apiKey=45847f9bd2364f4eb3cd6264a84485cf`
  );

  httpreq.send();

  if (document.querySelector("#newsPlace")) {
    httpreq.addEventListener("readystatechange", function () {
      if (httpreq.readyState === 4) {
        var news = JSON.parse(httpreq.response).articles;
        var articles = "";
        for (var i = 0; i < news.length; i++) {
          articles += `
        <div class="card mb-3 mx-auto" style="max-width: 740px">
        <div class="row g-0">
          <div class="col-md-4 d-flex align-items-center ">
            <img src="${
              news[i].urlToImage ? news[i].urlToImage : "./Assets/no-image.png"
            }" class="img-fluid rounded-2 align-middle" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${
                news[i].title
                  ? news[i].title.length > 25
                    ? news[i].title.slice(0, 24) + "&hellip;"
                    : news[i].title
                  : "No Title"
              }</h5>
              <p class="card-text">
              ${
                news[i].description
                  ? news[i].description.length > 250
                    ? news[i].description.slice(0, 249) + "&hellip;"
                    : news[i].description
                  : "No description"
              }
              </p>
              <p class="card-text">
                <small class="text-body-secondary"
                  >${news[i].author ? news[i].author : "No author"}</small
                ><a href="${
                  news[i].url ? news[i].url : "No Link"
                }" class="link-primary ms-3" target="_blank">Link</a>
              </p>
            </div>
          </div>
        </div>
      </div>
        
        
        `;
        }
        document.querySelector("#newsPlace").innerHTML = articles;
      }
    });
  }
}
