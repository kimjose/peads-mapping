const otzmodulesdiv = document.getElementById("otzmodulesdiv");
const userName = document.getElementById("userName");
const lastLoginDate = document.getElementById("lastLoginDate");
const dataEntryDate = document.getElementById("dataEntryDate");

initialize();

function initialize() {
  let userObject = sessionStorage.getItem("user");
  if (userObject == null) {
    window.location.replace("login.html");
    return;
  }
  var loggedinuser = JSON.parse(userObject);
  console.log(loggedinuser);

  userName.innerText = loggedinuser.firstName + " " + loggedinuser.surname;
  lastLoginDate.innerHTML = loggedinuser.last_login;
  var d = new Date().toLocaleString();
  dataEntryDate.innerHTML = d;

  $.ajax({
    type: "GET",
    url: "datascript?request=get_otz_modules",
    success: function (response) {
      response = response.replace('/^s+|s+$/g, ""');
      var mResponse = JSON.parse(response);
      var code = mResponse.code;
      if (code == 200) {
        var modules = mResponse.data;
        console.log(modules);
        loadtocheckbox(modules);
      } else {
        //todo: display error message
      }
    },
  });
}

function loadtocheckbox(modules) {
  for (var i = 0; i < modules.length; i++) {
    let module = modules[i];
    console.log(module.name);

    // create the div container for the checkbox
    var checkboxdiv = document.createElement("div");
    checkboxdiv.classList.add("custom-control");
    checkboxdiv.classList.add("custom-checkbox");
    checkboxdiv.classList.add("ml-2");

    //create checkbox
    var checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("custom-control-input");
    checkBox.setAttribute("id", module.id);

    // create a label for the checkbox
    var label = document.createElement("label");
    label.setAttribute("for", module.id);
    label.classList.add("custom-control-label");

    label.appendChild(document.createTextNode(module.name));

    checkboxdiv.appendChild(checkBox);
    checkboxdiv.appendChild(label);

    otzmodulesdiv.appendChild(checkboxdiv);
  }
}
