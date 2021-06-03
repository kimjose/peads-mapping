const inputCadreDesc = document.getElementById("cadredesc");
const inputCadreName = document.getElementById("cadreName");
const adduserrole = document.getElementById("addrolebtn");
const addUserDialog = document.getElementById("addcadremodal");
const rolesDataTable = document.getElementById("rolesDataTable");
var permdiv = document.getElementById("permissionsdiv");
adduserrole.addEventListener("click", () => addRole());
const addUserBtn = document.getElementById("addUserBtn");
addUserBtn.addEventListener("click", () => clearDialog());
var checkboxdiv;
var roleid = 0;

initialize();

function initialize() {

    $.ajax({
        type: "GET",
        url: "get_user_categories",
        success: function (response) {
            var mResponse = JSON.parse(response);
            var code = mResponse.code;
            if (code == 200) {
                var categories = mResponse.data;
                loadDataToTable(categories);
            } else {
                var error = [];
                error.status = code;
                error.message = mResponse.message;
                handleAjaxError(error);
            }
        },
        error: function (error) {
            // handleAjaxError(error);
            console.log(error);
        },
    });

    $.ajax({
        type: "GET",
        url: "get_permissions",
        success: function (response) {
            response = response.replace('/^s+|s+$/g, ""');
            var mResponse = JSON.parse(response);
            var code = mResponse.code;
            if (code == 200) {
                var permissions = mResponse.data;
                console.log(permissions);
                loadtocheckbox(permissions);
            } else {
                var error = [];
                error.status = code;
                error.message = mResponse.message;
                // handleAjaxError(error);
            console.log(error);
            }
        },
        error: function (error) {
            // handleAjaxError(error);
            console.log(error);
        },
    });
}

function loadtocheckbox(permissions) {
    for (var i = 0; i < permissions.length; i++) {
        let permissionname = permissions[i];
        console.log(permissionname.permission);

        // create the div container for the checkbox
        checkboxdiv = document.createElement("div");
        checkboxdiv.classList.add("custom-control");
        checkboxdiv.classList.add("custom-checkbox");
        checkboxdiv.classList.add("ml-2");

        //create checkbox
        var checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.classList.add("custom-control-input");
        checkBox.setAttribute("id", permissionname.id);

        // create a label for the checkbox
        var label = document.createElement("label");
        label.setAttribute("for", permissionname.id);
        label.classList.add("custom-control-label");

        label.appendChild(document.createTextNode(permissionname.permission));

        checkboxdiv.appendChild(checkBox);
        checkboxdiv.appendChild(label);

        permdiv.appendChild(checkboxdiv);
    }
}

function addRole() {
    var name = inputCadreName.value;
    var description = inputCadreDesc.value;
    var chkboxes = permdiv.querySelectorAll("input");
    let permissions = [];
    for (let c = 0; c < chkboxes.length; c++) {
        let chkbox = chkboxes[c];
        if (chkbox.checked == true) {
            permissions.push(chkbox.id);
            console.log(chkbox.id);
        }
    }
    console.log(permissions);
    console.log(roleid);

    $.ajax({
        type: "POST",
        url: "save_user_category",
        data: {
            roleid: roleid,
            name: name,
            description: description,
            permissions: permissions,
        },
        success: function (response) {
            var mResponse = JSON.parse(response);
            let code = mResponse.code;
            if (code == 200) {
                $(addUserDialog).modal("hide");
                var userroles = mResponse.data;
                loadDataToTable(userroles);
            } else {
                var error = [];
                error.status = code;
                error.message = mResponse.message;
                console.log(error);
                // handleAjaxError(error);
            }
        },
        error: function (error) {
            console.log(error);
            //   handleAjaxError(error);
        },
    });
}

function loadDataToTable(userroles) {
    console.log(userroles);
    var tbody = rolesDataTable.querySelector("tbody");
    rolesDataTable.removeChild(tbody);
    var newBody = document.createElement("tbody");
    for (var i = 0; i < userroles.length; i++) {
        let userrole = userroles[i];
        console.log(userrole);
        let name = userrole.name;
        let description = userrole.description;
        let permission = userrole.permissionname;

        var permissionlist = document.createElement("ul");
        permissionlist.classList.add("list-inline");

        for (let z = 0; z < permission.length; z++) {
            let perm = permission[z];

            var permissionitem = document.createElement("li");
            permissionitem.classList.add("permission-tag");
            permissionitem.appendChild(document.createTextNode(perm));

            permissionlist.appendChild(permissionitem);
        }

        console.log(permission);

        var editUserCategory = document.createElement("a");
        editUserCategory.setAttribute("href", "#");
        editUserCategory.setAttribute("data-toggle", "modal");
        editUserCategory.setAttribute("data-target", "#addcadremodal");
        editUserCategory.setAttribute("data-tooltip", "tooltip");
        editUserCategory.setAttribute("title", "Edit User Category Details");
        editUserCategory.setAttribute("data-placement", "bottom");
        editUserCategory.classList.add("btn");
        editUserCategory.classList.add("btn-light");
        editUserCategory.classList.add("btn-circle");
        editUserCategory.classList.add("btn-sm");
        editUserCategory.classList.add("app-button");
        editUserCategory.innerHTML = '<i class="fas fa-edit"></i>';
        editUserCategory.addEventListener("click", () => funEditUserRole(userrole.id, name, description, userrole.permissions));

        var deleteUserCategory = document.createElement("a");
        deleteUserCategory.setAttribute("href", "#");
        deleteUserCategory.setAttribute("data-tooltip", "tooltip");
        deleteUserCategory.setAttribute("title", "Delete User Category");
        deleteUserCategory.setAttribute("data-placement", "bottom");
        deleteUserCategory.classList.add("btn");
        deleteUserCategory.classList.add("btn-light");
        deleteUserCategory.classList.add("btn-circle");
        deleteUserCategory.classList.add("btn-sm");
        deleteUserCategory.classList.add("app-button");
        deleteUserCategory.innerHTML = '<i class="fas fa-trash"></i>';
        // deleteUser.addEventListener("click", () => funDeleteUser(user.id));

        var row = newBody.insertRow(i);
        row.insertCell(0).appendChild(document.createTextNode(name));
        var permissioncol = row.insertCell(1);
        permissioncol.setAttribute("width", "60%");
        permissioncol.appendChild(permissionlist);
        var actionsCell = row.insertCell(2);

        var actionDiv = document.createElement("div");
        actionDiv.classList.add("row");

        //actionDiv.appendChild(viewUser);
        actionDiv.appendChild(editUserCategory);
        actionDiv.appendChild(deleteUserCategory);
        actionsCell.appendChild(actionDiv);
    }
    rolesDataTable.appendChild(newBody);
    $('[data-tooltip="tooltip"]').tooltip();
    $(rolesDataTable).DataTable();
}

function funEditUserRole(id, name, description, permissions) {
    console.log(permissions);
    roleid = id;
    inputCadreName.value = name;
    inputCadreDesc.value = description;
    var chkboxes = permdiv.querySelectorAll("input");
    for (let c = 0; c < chkboxes.length; c++) {
        let box = chkboxes[c];
        box.checked = false;

        for (let p = 0; p < permissions.length; p++) {
            let permission = permissions[p];
            if (box.id == permission) {
                box.checked = true;
            } 
            
        }
    }
}

function clearDialog() {

    var inputs = addUserDialog.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = "";
    });

    var chkboxes = permdiv.querySelectorAll("input");
    for (let c = 0; c < chkboxes.length; c++) {
        let box = chkboxes[c];
        if (box.checked = true) {
            box.checked = false;
        }
    }
}  