const facilitySelector = document.querySelector("#facilitySelect");
const searchPatientsBtn = document.querySelector("#searchPatientsBtn");
const patientsDataTable = document.querySelector("#patientsDataTable");


init()

function init() {
    $.ajax({
        type: "GET",
        url: "get_facilities",
        success: function (response) {
            var mResponse = JSON.parse(response);
            var code = mResponse.code;
            if (code == 200) {
                facilities = mResponse.data;
                for (let i = 0; i < facilities.length; i++) {
                    const facility = facilities[i];
                    let option = document.createElement("option");
                    option.setAttribute("value", facility.mfl_code);
                    option.appendChild(document.createTextNode(facility.name));
                    facilitySelector.appendChild(option);
                    facilityDialogSelect.appendChild(option.cloneNode(true));
                }
            } else {
                handleError(code, mResponse.message);
            }
        },
        error: error => handleError(error.status, error.message)
    });
}

searchPatientsBtn.addEventListener('click',() => {
    let facility = facilitySelector.options[facilitySelector.selectedIndex].value;
    if (facility === "") {
        return
    }
    $.ajax({
        type: "GET",
        url: "get_facility_patient/" + facility,
        success: function (response) {
            var mResponse = JSON.parse(response);
            var code = mResponse.code;
            if (code == 200) {
                loadToTable(mResponse.data);
            }
        },
        error: error => handleError(error.status, error.message)
    });

});

function loadToTable(patients) {
    var tbody = patientsDataTable.querySelector("tbody");
    patientsDataTable.removeChild(tbody);
    var newBody = document.createElement("tbody");
    for (let i = 0; i<patients.length;i++){
        let patient = patients[i];
        let cccno = patient.cccNo;
        let dob = patient.dob;
        var gender;
        if (patient.sex === "M") {
            gender = "Male";
        } else if (patient.sex === "F" ) {
            gender = "Female";
        }
        var viewPatient = document.createElement("a");
        viewPatient.setAttribute("href", "#");
        viewPatient.classList.add("btn");
        viewPatient.classList.add("btn-light");
        viewPatient.classList.add("btn-circle");
        viewPatient.classList.add("btn-sm");
        viewPatient.classList.add("app-button");
        viewPatient.innerHTML = '<i class="fas fa-eye"></i>';

        var row = newBody.insertRow(i);
        row.insertCell(0).appendChild(document.createTextNode(i + 1));
        row.insertCell(1).appendChild(document.createTextNode(cccno));
        row.insertCell(2).appendChild(document.createTextNode(patient.sex));
        row.insertCell(3).appendChild(document.createTextNode(dob));
        row.insertCell(4).appendChild(document.createTextNode(patient.lastEntryDate));
        var actionsCell = row.insertCell(5);

        var actionDiv = document.createElement("div");
        actionDiv.classList.add("row");

        viewPatient.addEventListener("click", () => {
            sessionStorage.setItem('cccNo', patient.cccNo);
            window.location.replace("dataentry.html");
        });


        actionDiv.appendChild(viewPatient);


        actionsCell.appendChild(actionDiv);

    }
    patientsDataTable.appendChild(newBody);
    $("#patientsDataTable").DataTable();
}