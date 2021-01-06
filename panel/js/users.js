const body = document.querySelector("body");
const userDataTable = document.getElementById("userDataTable");

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
    url: "datascript?request=get_cadres",
    success: function (response) {
      var mResponse = JSON.parse(response);
      var code = mResponse.code;
      if (code == 200) {
        var usercategories = mResponse.data;
        for (let j = 0; j < usercategories.length; j++) {
          const category = usercategories[j];
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
    let names = user.names;
    let cadre = user.cadreName;
    let statusid = user.active;

    var status = "";

    if (statusid == 1) {
      status = "Active";
    } else {
      status = "Inactive";
    }

    var row = newBody.insertRow(i);
    row.insertCell(0).appendChild(document.createTextNode(i + 1));
    row.insertCell(1).appendChild(document.createTextNode(names));
    row.insertCell(2).appendChild(document.createTextNode(cadre));
    row.insertCell(3).appendChild(document.createTextNode("5"));
    row.insertCell(4).appendChild(document.createTextNode(status));
  }
  userDataTable.appendChild(newBody);
  $(userDataTable).DataTable();
}



