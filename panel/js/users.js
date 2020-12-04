/***For saving user info */
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
// const inputEmail = document.getElementById("email");
const inputPasswordConfirm = document.getElementById("confirmpassword");
const inputFirstname = document.getElementById("firstname");
// const inputMiddlename = document.getElementById("middlename");
const inputSurname = document.getElementById("surname");
// const inputPhoneNumber = document.getElementById("phonenumber");
const inputCounty = document.getElementById("county");
// const genderSelect = document.getElementById("genderSelect");
const facilitySelector = document.getElementById("facilitySelect");
const cadreSelect = document.getElementById("cadreSelect");
const statuscheck = document.getElementById("statuscheck");
const addUserDialog = document.getElementById("adduserprofile");
const labelId = document.getElementById("label-id");
const body = document.querySelector("body");
document.getElementById("saveUser").addEventListener("click", () => saveUser());
const userDataTable = document.getElementById("userDataTable");
document
  .getElementById("addUserBtn")
  .addEventListener("click", () => clearDialog());

initialize();

function initialize() {
  let userObject = sessionStorage.getItem("user");
  if (userObject == null) {
    window.location.replace("login.html");
    return;
  }
  var loggedinuser = JSON.parse(userObject);
  $.ajax({
    type: "GET",
    url: "datascript?request=get_users",
    success: function (response) {
      var mResponse = JSON.parse(response);
      var code = mResponse.code;
      if (code == 200) {
        var users = mResponse.data;
        loadDataToTable(users);
      } else {
        //todo: display error message
      }
    },
  });

  $.ajax({
    type: "GET",
    url: "datascript?request=get_facilities",
    success: function (response) {
      var mResponse = JSON.parse(response);
      var code = mResponse.code;
      if (code == 200) {
        var facilities = mResponse.data;
        for (let i = 0; i < facilities.length; i++) {
          const facility = facilities[i];
          let option = document.createElement("option");
          option.setAttribute("value", facility.id);
          option.appendChild(document.createTextNode(facility.name));
          facilitySelector.appendChild(option);
        }
      }
    },
  });

  $.ajax({
    type: "GET",
    url: "datascript?request=get_cadres",
    success: function (response) {
      var mResponse = JSON.parse(response);
      var code = mResponse.code;
      if (code == 200) {
        var usercategories = mResponse.data;
        for (let j = 0; j < usercategories.length; j++) {
          const category = usercategories[j];
          let option = document.createElement("option");
          option.setAttribute("value", category.id);
          option.appendChild(document.createTextNode(category.name));
          cadreSelect.appendChild(option);
        }
      }
    },
  });
}

function loadDataToTable(users) {
    var tbody = userDataTable.querySelector("tbody");
    userDataTable.removeChild(tbody);
    var newBody = document.createElement("tbody");
    for (var i = 0; i < users.length; i++) {
      let user = users[i];
      let names = user.firstName + " " + user.surname;
      let username = user.username;
    //   let mobile = user.mobile;
    //   let email = user.email;
      let cadre = user.cadreName;
      let facility = user.facilityName;
      let county = user.county;
    //   let gender = user.gender;
      let statusid = user.active;
  
      var status = "";
  
      if (statusid == 1) {
        status = "Active";
      } else {
        status = "Inactive";
      }
  
      var viewUser = document.createElement("a");
      viewUser.setAttribute("href", "#");
      viewUser.classList.add("btn");
      viewUser.classList.add("btn-light");
      viewUser.classList.add("btn-circle");
      viewUser.classList.add("btn-sm");
      viewUser.classList.add("app-button");
      viewUser.innerHTML = '<i class="fas fa-eye"></i>';
      viewUser.addEventListener("click", () => funViewUser(user));
  
      var editUser = document.createElement("a");
      editUser.setAttribute("href", "#");
      editUser.setAttribute("data-toggle", "modal");
      editUser.setAttribute("data-target", "#adduserprofile");
      editUser.classList.add("btn");
      editUser.classList.add("btn-light");
      editUser.classList.add("btn-circle");
      editUser.classList.add("btn-sm");
      editUser.classList.add("app-button");
      editUser.innerHTML = '<i class="fas fa-edit"></i>';
      editUser.addEventListener("click", () =>
        funEditUser(
          user.id,
          user.username,
          user.firstName,
          user.surname,
          user.cadre,
          user.facility,
          user.county,
          user.active
        )
      );
  
      var deleteUser = document.createElement("a");
      deleteUser.setAttribute("href", "#");
      deleteUser.classList.add("btn");
      deleteUser.classList.add("btn-light");
      deleteUser.classList.add("btn-circle");
      deleteUser.classList.add("btn-sm");
      deleteUser.classList.add("app-button");
      deleteUser.innerHTML = '<i class="fas fa-trash"></i>';
      deleteUser.addEventListener("click", () => funDeleteUser(user.id));
  
      var row = newBody.insertRow(i);
      row.insertCell(0).appendChild(document.createTextNode(i + 1));
      row.insertCell(1).appendChild(document.createTextNode(names));
      row.insertCell(2).appendChild(document.createTextNode(username));
      row.insertCell(3).appendChild(document.createTextNode(cadre));
      row.insertCell(4).appendChild(document.createTextNode(county));
      row.insertCell(5).appendChild(document.createTextNode(facility));
      row.insertCell(6).appendChild(document.createTextNode(status));
      var actionsCell = row.insertCell(7);
  
      var actionDiv = document.createElement("div");
      actionDiv.classList.add("row");
  
    //   if (user.active == 1 && user.username !== "admin") {
    //     actionDiv.appendChild(viewUser);
    //   }
      actionDiv.appendChild(editUser);
      actionDiv.appendChild(deleteUser);
      actionsCell.appendChild(actionDiv);
    }
    userDataTable.appendChild(newBody);
    $(userDataTable).DataTable();
  }
  function funViewUser(user) {
    console.log(user);
    sessionStorage.setItem("vieweduser", JSON.stringify(user));
    window.location.replace("viewUserDetails.html");
  }
  
  function funEditUser(
    id,
    username,
    firstName,
    surname,
    cadre,
    facility,
    county,
    active
  ) {
    labelId.innerText = id;
    inputUsername.value = username;
    inputFirstname.value = firstName;
    // inputMiddlename.value = middleName;
    inputSurname.value = surname;
    var cad = cadre;
    $("#cadreSelect").val(cad);
    var facil = facility;
    $("#facilitySelect").val(facil);
    // inputEmail.value = email;
    // inputPhoneNumber.value = phone;
    inputCounty.value = county;
    statuscheck.checked = active;
  }
  
  function funDeleteUser(id) {
    var r = confirm("Are you sure you want to delete this user?");
    if (r == true) {
      $.ajax({
        type: "DELETE",
        url: "datascript?request=delete_user&id=" + id,
        success: function (response) {
          var mResponse = JSON.parse(response);
          var code = mResponse.code;
          if (code == 200) loadDataToTable(mResponse.data);
          else {
            //todo: display error
            console.log(mResponse.message);
          }
        },
        fail: function (XMLHttpRequest, textStatus, errorThrown) {
          //todo display error
        },
      });
    }
  }
  
  function clearDialog() {
    var errors = document.querySelectorAll(".errors");
    errors.forEach((error) => {
      if (error.classList.contains("errors-showing")) {
        error.classList.remove("errors-showing");
      }
    });
    labelId.innerText = "";
    var inputs = addUserDialog.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  function saveUser() {
    var errors = document.querySelectorAll(".errors");
    errors.forEach((error) => {
      if (error.classList.contains("errors-showing")) {
        error.classList.remove("errors-showing");
      }
    });
    var username = inputUsername.value;
    var password = inputPassword.value;
    // var email = inputEmail.value;
    // var phoneNumber = inputPhoneNumber.value;
    var county = inputCounty.value;
    var passwordConfirm = inputPasswordConfirm.value;
    var firstName = inputFirstname.value;
    // var middleName = inputMiddlename.value;
    var surname = inputSurname.value;
    var active = statuscheck.checked;
    var statusid = 0;
    if (active == true) {
      statusid = 1;
    }
    // var gender = genderSelect.options[genderSelect.selectedIndex].value;
    var facility = facilitySelector.options[facilitySelector.selectedIndex].value;
    var cadre = cadreSelect.options[cadreSelect.selectedIndex].value;
  
    var error = false;
  
    if (username.length < 1) {
      error = true;
      var errorDisplay = document.getElementById("username-error");
      errorDisplay.classList.add("errors-showing");
      errorDisplay.innerHTML = "Username cannot be empty";
    }
  
    // if (email.length < 1) {
    //   error = true;
    //   var errorDisplay = document.getElementById("email-error");
    //   errorDisplay.classList.add("errors-showing");
    //   errorDisplay.innerHTML = "Email cannot be empty.";
    // }
    // if (phoneNumber.length < 1) {
    //   error = true;
    //   var errorDisplay = document.getElementById("phonenumber-error");
    //   errorDisplay.classList.add("errors-showing");
    //   errorDisplay.innerHTML = "Phone number cannot be empty.";
    // }
    if (county.length < 1) {
      error = true;
      var errorDisplay = document.getElementById("county-error");
      errorDisplay.classList.add("errors-showing");
      errorDisplay.innerHTML = "County cannot be empty.";
    }
    if (firstName.length < 1) {
      error = true;
      var errorDisplay = document.getElementById("firstname-error");
      errorDisplay.classList.add("errors-showing");
      errorDisplay.innerHTML = "Firstname cannot be empty.";
    }
    // if (middleName.length < 1) {
    //   error = true;
    //   var errorDisplay = document.getElementById("middlename-error");
    //   errorDisplay.classList.add("errors-showing");
    //   errorDisplay.innerHTML = "MiddleName cannot be empty.";
    // }
    if (labelId.innerText == null || labelId.innerText == "") {
      if (password.length < 1) {
        error = true;
        var errorDisplay = document.getElementById("password-error");
        errorDisplay.classList.add("errors-showing");
        errorDisplay.innerHTML =
          "Password is too short. 6+ characters are required.";
      }
    }
    if (password != passwordConfirm) {
      error = true;
      var errorDisplay = document.getElementById("confirm-error");
      errorDisplay.classList.add("errors-showing");
      errorDisplay.innerHTML = "Enter similar password.";
    }
    if (surname.length < 1) {
      error = true;
      var errorDisplay = document.getElementById("surname-error");
      errorDisplay.classList.add("errors-showing");
      errorDisplay.innerHTML = "Surname cannot be empty.";
    }
    if (error) {
      return;
    }
    //console.log(data);
    $.ajax({
      type: "POST",
      url: "datascript?request=save_user",
      data: {
        id: labelId.innerText,
        username: username,
        firstname: firstName,
        // middlename: middleName,
        // gender: gender,
        surname: surname,
        cadre: cadre,
        facility: facility,
        county: county,
        // mobile: phoneNumber,
        // email: email,
        password: password,
        active: statusid,
      },
      success: function (response) {
        var mResponse = JSON.parse(response);
        let code = mResponse.code;
        if (code == 200) {
          $(addUserDialog).modal("hide");
          loadDataToTable(mResponse.data);
        } else {
          //todo: display error
        }
      },
      fail: (XMLHttpRequest, textStatus, errorThrown) => {
        alert(errorThrown.message);
      },
    });
  }
  
