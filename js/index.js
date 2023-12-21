var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var overlay = document.getElementById("overlay");
var addBtn = document.getElementById("addBtn");

var sites = [];
var globalIndex = 0;
var errorMsg = false;

if (JSON.parse(localStorage.getItem("sites")) != null) {
  sites = JSON.parse(localStorage.getItem("sites"));
  displaySites();
}

function addSite() {
  var validation = inputsValidaiton();
  if (validation) {
    var site = {
      name: siteNameInput.value,
      url: siteURLInput.value,
    };
    sites.push(site);
  } else {
    toggleError();
  }

  localStorage.setItem("sites", JSON.stringify(sites));
  displaySites();
  clearForm();
}

function deleteSite(index) {
  sites.splice(index, 1);
  displaySites();
  localStorage.setItem("sites", JSON.stringify(sites));
}

function displaySites() {
  var trs = "";
  for (var i = 0; i < sites.length; i++) {
    trs += ` <tr>
        <th scope="row">${i}</th>
        <td>${sites[i].name}</td>
       

        <td>
          <a href="https://${sites[i].url}"  target="_blank"><button type="button"   class="btn btn-success pe-3">
          <i class="fa-solid fa-eye pe-2"></i>
            Visit
          </button>
          </a>
        </td>
        <td>
          <button type="button" onclick="deleteSite(${i})" class="btn btn-danger">
          <i class="fa-solid fa-trash-can"></i>
          Delete</button>
        </td>
      </tr>`;
  }

  document.getElementById("siteTable").innerHTML = trs;
}

function clearForm() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

function toggleError() {
  errorMsg = !errorMsg;
  if (errorMsg) {
    overlay.classList.remove("d-none");
  } else {
    overlay.classList.add("d-none");
  }
}

function inputsValidaiton() {
  if (siteNameInput.value.length > 2 && isValidUrl()) {
    return true;
  }
  return false;
}

function isValidUrl() {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(siteURLInput.value);
}
