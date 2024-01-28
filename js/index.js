///////////////////////////  Variables  ////////////////////////////////////////////
let menuIsOpen = false;
let submit = false;
let validation = {
  name: false,
  email: false,
  phone: false,
  age: false,
  pass: false,
  repass: false,
};
$("header").css("left", `-${$("#menu").outerWidth()}px`);
$(".loading-screen2").fadeOut(0);
$("#searchInputs").hide();
$("form").removeClass("d-flex").hide();
$(".inputError").hide();
$(".mealDetails").hide();

getMeals("www.themealdb.com/api/json/v1/1/search.php?s=", "");

///////////////////////EventListeners////////////////////////////////////////////////
$(document).ready(() => {
  $(".loading-screen").fadeOut(500);
  $("body").css("overflow", "visible");
});

// search handling /////////////////////////////////////////////
$("#searchBtn").click(function (e) {
  $("#searchInputs").addClass("d-flex");
  $("#searchInputs").show();
  closeMenu();
  $(".meals").html("");
});
$("#searchByFirstLetter").keyup(function (e) {
  getMeals(
    "www.themealdb.com/api/json/v1/1/search.php?f=",
    $("#searchByFirstLetter").val() ? $("#searchByFirstLetter").val() : "a",
    20
  );
});
$("#searchByName").keyup(function (e) {
  if ($("#searchByName").val()) {
    getMeals(
      "www.themealdb.com/api/json/v1/1/search.php?s=",
      $("#searchByName").val(),
      20
    );
  } else {
    getMeals("www.themealdb.com/api/json/v1/1/search.php?s=", "");
  }
});

// menu buttons //////////////////////////////////////////////////
$("#MenuButton").click(() => {
  toggleMenu();
});
$("#catBtn").click(function (e) {
  closeMenu();
  $(".meals").show();
  $("#searchInputs").hide();
  $("form").removeClass("d-flex").hide();
  $(".mealDetails").hide();
  getCat();
});
$("#areaBtn").click(function (e) {
  closeMenu();
  $(".meals").show();
  $("#searchInputs").hide();
  $("form").removeClass("d-flex").hide();
  $(".mealDetails").hide();

  getAreas();
});
$("#ingBtn").click(function (e) {
  closeMenu();
  $(".meals").show();
  $("#searchInputs").hide();
  $("form").removeClass("d-flex").hide();
  $(".mealDetails").hide();

  getIngs();
});
$("#conBtn").click(function (e) {
  closeMenu();
  $("#searchInputs").hide();
  $(".meals").hide();
  $(".mealDetails").hide();
  $("form").addClass("d-flex").show();
});

// contact us form//////////////////////////////////////////////////
$("#name").keyup((e) => {
  fieldValidation("name", nameValidation);
  submissionValidation();
});
$("#email").keyup((e) => {
  fieldValidation("email", emailValidation);
  submissionValidation();
});
$("#phone").keyup((e) => {
  fieldValidation("phone", phoneValidation);
  submissionValidation();
});
$("#age").keyup((e) => {
  fieldValidation("age", ageValidation);
  submissionValidation();
});
$("#pass").keyup((e) => {
  fieldValidation("pass", passValidation);
  submissionValidation();
});
$("#repass").keyup((e) => {
  fieldValidation("repass", repassValidation);
  submissionValidation();
});
//////////////////////////////////////Functions//////////////////////////////////////
// menu //////////////////////////

function toggleMenu() {
  menuIsOpen ? closeMenu() : openMenu();
}
function openMenu() {
  menuIsOpen = true;
  $("header").css("left", "0");
  $("#MenuButton").html(
    `<i class="fa-solid open-close-icon fa-2x fa-x" role="button">`
  );
  for (let i = 0; i < 5; i++) {
    $("#navLinks li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
function closeMenu() {
  menuIsOpen = false;
  $("header").css("left", `-${$("#menu").outerWidth()}px`);
  $("#MenuButton").html(
    `<i class="fa-solid fa-bars fa-2x "  role="button"></i>`
  );
  $("#navLinks li").animate({ top: 300 }, 500);
}

// getting Data //////////////////////////

async function getMeals(api, item, length) {
  $(".loading-screen2").fadeIn(50);

  const url = "https://" + api + item;
  try {
    const response = await fetch(url);
    let result = await response.json();
    $(".loading-screen2").fadeOut(500);
    $("body").css("overflow", "visible");
    length
      ? (result = result.meals.splice(0, length))
      : (result = result.meals);
    displayMeals(result);
  } catch (error) {
    console.error(error);
  }
}
async function getCat() {
  $(".loading-screen2").fadeIn(50);

  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  try {
    const response = await fetch(url);
    let result = await response.json();
    $(".loading-screen2").fadeOut(500);
    $("body").css("overflow", "visible");
    result = result.categories;
    displayCats(result);
  } catch (error) {
    console.error(error);
  }
}
async function getAreas() {
  $(".loading-screen2").fadeIn(50);

  const url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
  try {
    const response = await fetch(url);
    let result = await response.json();
    $(".loading-screen2").fadeOut(500);
    $("body").css("overflow", "visible");
    result = result.meals;
    displayAreas(result);
  } catch (error) {
    console.error(error);
  }
}
async function getIngs() {
  $(".loading-screen2").fadeIn(50);

  const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  try {
    const response = await fetch(url);
    let result = await response.json();
    $(".loading-screen2").fadeOut(500);
    $("body").css("overflow", "visible");
    result = result.meals;
    displayIngs(result);
  } catch (error) {
    console.error(error);
  }
}

async function getMealDetails(id) {
  $(".meals").html("");
  $(".loading-screen2").fadeIn(50);

  const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  try {
    const response = await fetch(url);
    let result = await response.json();
    $(".loading-screen2").fadeOut(500);
    $("body").css("overflow", "visible");
    displayMealDetails(result.meals[0]);
  } catch (error) {
    console.error(error);
  }
}
// displaying //////////////////////////

function displayMeals(result) {
  let cards = "";
  for (let i = 0; i < result.length; i++) {
    let addText = ` <div class="col-md-3 oneMeal" mealId=${result[i].idMeal}>
      <div class="bg-white rounded-3 overflow-hidden position-relative">
       <img src="${result[i].strMealThumb}" alt="" class="w-100">
        <div class="overlayPop d-flex align-items-center text-black">
          <h2 class="ms-2">${result[i].strMeal}</h2>
        </div>
      </div>
    </div>`;

    cards += addText;
  }
  $(".meals").html(cards);
  $.map($(".oneMeal"), function (i, val) {
    $(i).click(function (e) {
      let id = $(this).attr("mealId");
      getMealDetails(id);
    });
  });
}
function displayCats(result) {
  let cards = "";
  for (let i = 0; i < result.length; i++) {
    let addText = ` <div class="col-md-3 oneCat" cat=${result[i].strCategory}  >
      <div class=" rounded-3 overflow-hidden position-relative">
       <img src="${result[i].strCategoryThumb}" alt="" class="w-100">
        <div class="overlayPop d-flex align-items-center text-black">
          <h2 class="ms-2">${result[i].strCategory}</h2>
        </div>
      </div>
    </div>`;

    cards += addText;
  }

  $(".meals").html(cards);
  $.map($(".oneCat"), function (i, val) {
    $(i).click(function (e) {
      let cat = $(this).attr("cat");
      let url = `www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`;
      getMeals(url, "", 20);
    });
  });
}
function displayAreas(result) {
  let cards = "";
  for (let i = 0; i < result.length; i++) {
    let addText = ` <div class="col-md-3 oneArea text-center" area=${result[i].strArea}  >
      <div class=" rounded-3 overflow-hidden position-relative text-white-50 text-center" role="button" >
      <i class="fa-solid fa-house-laptop fa-4x w-100 text-white"></i>
      <h2 class="ms-2 text-white">${result[i].strArea}</h2>
      
      </div>
    </div>`;

    cards += addText;
  }

  $(".meals").html(cards);
  $.map($(".oneArea"), function (i, val) {
    $(i).click(function (e) {
      let area = $(this).attr("area");
      let url = `www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
      getMeals(url, "", 20);
    });
  });
}
function displayIngs(result) {
  let cards = "";
  for (let i = 0; i < 20; i++) {
    let addText = ` <div class="col-md-3 oneIng text-center" ing=${
      result[i].strIngredient
    }  >
      <div class=" rounded-3 overflow-hidden position-relative text-white-50 text-center" role="button" >
      <i class="fa-solid fa-drumstick-bite fa-4x w-100 text-white"></i>
      <h2 class="ms-2 text-white">${result[i].strIngredient}</h2>
      <p class="mt-2">
      ${result[i].strDescription.slice(0, 99) + "&hellip;"} 
      
      </p>
      
      </div>
    </div>`;

    cards += addText;
  }

  $(".meals").html(cards);
  $.map($(".oneIng"), function (i, val) {
    $(i).click(function (e) {
      let ing = $(this).attr("ing");
      let url = `www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`;
      getMeals(url, "", 20);
    });
  });
}

function displayMealDetails(meal) {
  $(".mealDetails").show();
  $(".meals").hide();
  $("#searchInputs").hide();
  $("form").removeClass("d-flex").hide();
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
  <div class="col-md-4">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${ingredients}
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`;

  $("#rowData").html(cartoona);
}

// validation //////////////////////////
function nameValidation(name) {
  const nameRegex = new RegExp(/^[_A-z]*((-|\s)*[_A-z])*$/, "g");
  return nameRegex.test(name) && name.length > 0;
}

function emailValidation(email) {
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    "gm"
  );
  return emailRegex.test(email) && email.length > 0;
}

function phoneValidation(phone) {
  const phoneRegex = new RegExp(
    /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4,})$/,
    "gm"
  );
  return phoneRegex.test(phone) && phone.length > 0;
}

function ageValidation(age) {
  return age > 0 && age < 200;
}

function passValidation(pass) {
  const passRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "gm");
  return passRegex.test(pass) && pass.length > 0;
}

function repassValidation(repass) {
  return $("#pass").val() === $("#repass").val() && repass.length > 0;
}

function fieldValidation(field, fieldFunction) {
  $(`.${field}Error`).hide();
  if (!fieldFunction($(`#${field}`).val())) {
    $(`.${field}Error`).show();
    validation[field] = false;
  } else {
    validation[field] = true;
  }
  $(`#${field}`).val() === "" && $(`.${field}Error`).hide();
}

function submissionValidation() {
  Object.values(validation).every(Boolean)
    ? $("#submit").removeClass("disabled")
    : $("#submit").addClass("disabled");
}
