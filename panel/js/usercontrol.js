const usersTab = document.getElementById("usersTab");
const userrolesTab = document.getElementById("userrolesTab");

initialize();

function initialize() {
  let userObject = sessionStorage.getItem("user");
  if (userObject == null) {
    window.location.replace("login.html");
    return;
  }

  var loggedinuser = JSON.parse(userObject);
  console.log(loggedinuser.permissions);

  var permissionslist = loggedinuser.permissions;

  String.prototype.inList = function (list) {
    return list.indexOf(this.toString()) != -1;
  };

  if (!"1".inList(permissionslist)){
    usersTab.classList.add("d-none");
  }

  if (!"4".inList(permissionslist)){
    userrolesTab.classList.add("d-none");
  }
}