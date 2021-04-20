const addPatientForm = document.getElementById('addPatientForm');
const facilityDialogSelect = document.getElementById('facilityDialogSelect');
const addPatientDialog = document.getElementById('addPatientDialog');
const linkChildDialog = document.getElementById('linkChildDialog');
const cccNoDialogInput = document.getElementById('cccNoDialogInput');
const clientnames = document.getElementById('clientnames');
const dateclienttestedinput = document.getElementById('dateclienttestedinput');
const dateclientlistedinput = document.getElementById('dateclientlistedinput');
const dateclientenrolledinput = document.getElementById('dateclientenrolledinput');
const clientstatusSelect = document.getElementById('clientstatusSelect');
const errorDisplayDiv = document.querySelector(".error-class");
const patientsearchresult = document.getElementById('patientsearchresult')
const indexclientdetails = document.getElementById('indexclientdetails');
const savePatientBtn = document.getElementById('savePatientBtn');
var userObject;

//patientdetails
const clientcccno = document.getElementById('clientcccno');
const  clientnamedisplay = document.getElementById('clientname');
const dateclienttesteddisplay = document.getElementById('dateclienttested');
const mflcodedisplay = document.getElementById('mflcode');
const facilityname = document.getElementById('facilityname')
const countydisplay = document.getElementById('county');
const childrennumber = document.getElementById('childrennumber');
const dateclientlisteddisplay = document.getElementById('dateclientlisted');
const dateclientenrolleddisplay = document.getElementById('dateclientenrolled');
const indexclientstatusdisplay = document.getElementById('indexclientstatus');

var patientid = 0;
const linkchildform = document.getElementById('linkchildform');
const indexclientsearch = document.getElementById('indexclientsearch');
const btnSearchClient = document.getElementById('btnSearchClient');


//link child modal
const labelChildID = document.getElementById('labelChildID');
const childnamesinput = document.getElementById('childnames');
const dobinput = document.getElementById('dob');
const datelistedinput = document.getElementById('datelisted');
const childTestedSelect = document.getElementById('childTestedSelect');
const datetestedinput = document.getElementById('datetested');
const testOutcomeSelect = document.getElementById('testOutcomeSelect');
const linkedSelect = document.getElementById('linkedSelect');
const childcccnoinput = document.getElementById('childcccno');

//test child modal
const childtestform = document.getElementById('childtestform');
const ChildID = document.getElementById('ChildID');
const childTestedSelect2 = document.getElementById('childTestedSelect2');
const datetestedinput2 = document.getElementById('datetested2');
const testOutcomeSelect2 = document.getElementById('testOutcomeSelect2');
const linkedSelect2 = document.getElementById('linkedSelect2');
const childcccnoinput2 = document.getElementById('childcccno2');

const addChildBtn = document.getElementById('addChildBtn');
const savechildbtn = document.getElementById('savechildbtn');
const childrenlistedcard = document.getElementById('childrenlistedcard');
const savechildtestbtn = document.getElementById('savechildtestbtn');

initialize();

childTestedSelect.addEventListener('click', () => initialchildTestOptionChanged());
linkedSelect.addEventListener('click', () => initialTestOutcomeOptionChanged());

childTestedSelect2.addEventListener('click', () => otherchildTestOptionChanged());
linkedSelect2.addEventListener('click', () => otherTestOutcomeOptionChanged());

savePatientBtn.addEventListener('click', () => {
    savePatient();
});

btnSearchClient.addEventListener('click', () => {

    indexclientdetails.classList.add('d-none');
    $('#addChildBtn').attr('disabled', 'disabled');
    $('#childrenlistedcard').empty();
    patientid = 0;
    let searchcred = indexclientsearch.value;
    let indexccc = 0, indexname = '';
    let error = false;
    if (searchcred.length < 3) {
        error = true;
        let errorDisplay = document.getElementById("search-error");
        errorDisplay.classList.add("errors-showing");
    } else {
        if (!isNaN(searchcred)) {
            indexccc = searchcred;
            indexname = '';
        } else {
            indexccc = 0;
            indexname = searchcred;
        }
    }
    if (error) {
        return;
    } else {
        $.ajax({
            type: "GET",
            url: "datascript?request=get_patient&indexccc=" + indexccc + "&indexname=" + indexname,
            success: function (response) {
                var mResponse = JSON.parse(response);
                let code = mResponse.code;
                console.log(mResponse);
                if (code == 200) {
                    let patients = mResponse.data;
                    showPatientList(patients);
                    indexclientsearch.value = '';
                } else {
                    var error = [];
                    error.status = code;
                    error.message = mResponse.message;
                    handleAjaxError(error);
                }
            },
            error: (err) => handleAjaxError(err),
        });
    }
});

savechildbtn.addEventListener('click', () => {
    console.log(patientid);
    let childid = labelChildID.innerHTML;
    let childnames = childnamesinput.value;
    let dob = dobinput.value;
    let datelisted = datelistedinput.value;
    let childtested = childTestedSelect.options[childTestedSelect.selectedIndex].value;
    let datetested = datetestedinput.value;
    let testoutcome = testOutcomeSelect.options[testOutcomeSelect.selectedIndex].value;
    let islinked = linkedSelect.options[linkedSelect.selectedIndex].value;
    let childcccno = childcccnoinput.value;

    let error = false;

    if (childnames.length < 2) {
        error = true;
        let errorDisplay = document.getElementById("name-error");
        errorDisplay.classList.add("errors-showing");
    }
    if (dob.length < 1) {
        error = true;
        let errorDisplay = document.getElementById("dob-error");
        errorDisplay.classList.add("errors-showing");
    }
    let age = getAge(dob);
    if (age > 19) {
        error = true;
        let errorDisplay = document.getElementById("dob-error");
        errorDisplay.classList.add("errors-showing");
        errorDisplay.innerHTML = "The child has to be less than 19 years"
    }
    if (datelisted.length < 1) {
        error = true;
        let errorDisplay = document.getElementById("dcl-error");
        errorDisplay.classList.add("errors-showing");
    }
    if (childtested.length < 1) {
        error = true;
        let errorDisplay = document.getElementById("tested-error");
        errorDisplay.classList.add("errors-showing");
    }
    if (childtested == 'Y') {
        if (datetested.length < 1) {
            error = true;
            let errorDisplay = document.getElementById("dct-error");
            errorDisplay.classList.add("errors-showing");
        }
        if (testoutcome.length < 1) {
            error = true;
            let errorDisplay = document.getElementById("outcome-error");
            errorDisplay.classList.add("errors-showing");
        }
    }
    if (testoutcome == 'Positive') {
        if (islinked.length < 1) {
            error = true;
            let errorDisplay = document.getElementById("linked-error");
            errorDisplay.classList.add("errors-showing");
        }
    }

    if (islinked == 'Y' && testoutcome == 'Positive') {
        if (childcccno.length != 10) {
            error = true;
            let errorDisplay = document.getElementById("ccc-error");
            errorDisplay.classList.add("errors-showing");
        }
    }

    if (error) {
        return;
    } else {
        $.ajax({
            type: "POST",
            url: "datascript?request=link_child",
            data: {
                childid: childid,
                childnames: childnames,
                patientid: patientid,
                datelisted: datelisted,
                dob: dob,
                childtested: childtested,
                datetested: datetested,
                testoutcome: testoutcome,
                islinked: islinked,
                childcccno: childcccno
            },
            success: function (response) {
                var mResponse = JSON.parse(response);
                let code = mResponse.code;
                console.log(mResponse);
                if (code == 200) {
                    let patient = mResponse.data;
                    $(linkChildDialog).modal("hide");
                    populatepatientdate(patient);
                } else {
                    var error = [];
                    error.status = code;
                    error.message = mResponse.message;
                    handleAjaxError(error);
                }
            },
            error: (err) => handleAjaxError(err),
        });
    }
});

savechildtestbtn.addEventListener('click', () => {
    let childid = ChildID.innerHTML;
    let childtested = childTestedSelect2.options[childTestedSelect2.selectedIndex].value;
    let datetested = datetestedinput2.value;
    let testoutcome = testOutcomeSelect2.options[testOutcomeSelect2.selectedIndex].value;
    let islinked = linkedSelect2.options[linkedSelect2.selectedIndex].value;
    let childcccno = childcccnoinput2.value;

    let error = false;

    if (childtested.length < 1) {
        error = true;
        let errorDisplay = document.getElementById("tested-error2");
        errorDisplay.classList.add("errors-showing");
    }
    if (childtested == 'Y') {
        if (datetested.length < 1) {
            error = true;
            let errorDisplay = document.getElementById("dct-error2");
            errorDisplay.classList.add("errors-showing");
        }
        if (testoutcome.length < 1) {
            error = true;
            let errorDisplay = document.getElementById("outcome-error2");
            errorDisplay.classList.add("errors-showing");
        }
    }
    if (testoutcome == 'Positive') {
        if (islinked.length < 1) {
            error = true;
            let errorDisplay = document.getElementById("linked-error2");
            errorDisplay.classList.add("errors-showing");
        }
    }

    if (islinked == 'Y' && testoutcome == 'Positive') {
        if (childcccno.length != 10) {
            error = true;
            let errorDisplay = document.getElementById("ccc-error2");
            errorDisplay.classList.add("errors-showing");
        }
    }

    if (error) {
        return;
    } else {
        $.ajax({
            type: "POST",
            url: "datascript?request=add_child_test_results",
            data: {
                patientid: patientid,
                childid: childid,
                childtested: childtested,
                datetested: datetested,
                testoutcome: testoutcome,
                islinked: islinked,
                childcccno: childcccno
            },
            success: function (response) {
                var mResponse = JSON.parse(response);
                let code = mResponse.code;
                console.log(mResponse);
                if (code == 200) {
                    let patient = mResponse.data;
                    $(ChildTestDialog).modal("hide");
                    populatepatientdate(patient);
                } else {
                    var error = [];
                    error.status = code;
                    error.message = mResponse.message;
                    handleAjaxError(error);
                }
            },
            error: (err) => handleAjaxError(err),
        });
    }
});

function initialize(){
    userObject = sessionStorage.getItem("user");
    if (userObject == null) {
        window.location.replace("login.html");
        return;
    }
    var loggedinuser = JSON.parse(userObject);
    console.log(loggedinuser);

    $.ajax({
        type: "GET",
        url: "datascript?request=get_facilities",
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
                    facilityDialogSelect.appendChild(option);
                }
            }else {
                var error = [];
                error.status = code;
                error.message = mResponse.message;
                handleAjaxError(error);
            }
        },
        error: error => handleAjaxError(error)
    });
}

function savePatient() {
    let clientccc = cccNoDialogInput.value;
    let clientname = clientnames.value;
    let dateclienttested = dateclienttestedinput.value;
    let facility = facilityDialogSelect.options[facilityDialogSelect.selectedIndex].value;
    let date_listed = dateclientlistedinput.value;
    let dateEnrolledToCare = dateclientenrolledinput.value;
    let currentStatus = clientstatusSelect.options[clientstatusSelect.selectedIndex].value;

    let error = false;

    if (clientccc.length < 10 || clientccc.length > 10) {
        error = true;
        let errorDisplay = document.getElementById("client-ccc-error");
        errorDisplay.classList.add("errors-showing");
    }
    if (clientname.length <= 0) {
        error = true;
        let errorDisplay = document.getElementById("client-name-error");
        errorDisplay.classList.add("errors-showing");
    }
    if (dateclienttested.length <= 0) {
        error = true;
        let errorDisplay = document.getElementById("dclienttested-error");
        errorDisplay.classList.add("errors-showing");
    }
    if (date_listed.length <= 0) {
        error = true;
        let errorDisplay = document.getElementById("dclientlisted-error");
        errorDisplay.classList.add("errors-showing");
    }
    if (dateEnrolledToCare.length <= 0) {
        error = true;
        let errorDisplay = document.getElementById("dclientenrolled-error");
        errorDisplay.classList.add("errors-showing");
    }
    if (facility.length < 1) {
        error = true;
        var errorDisplay = document.getElementById("facility-error");
        errorDisplay.classList.add("errors-showing");
    }
    if (currentStatus.length < 1) {
        error = true;
        var errorDisplay = document.getElementById("clientstatus-error");
        errorDisplay.classList.add("errors-showing");
    }
    if (error) {
        return;
    } else {
        $.ajax({
            type: "POST",
            url: "datascript?request=save_index_client",
            data: {
                clientccc: clientccc,
                clientname: clientname,
                dateclienttested: dateclienttested,
                facility: facility,
                date_listed: date_listed,
                dateEnrolledToCare: dateEnrolledToCare,
                currentStatus: currentStatus,
            },
            success: function (response) {
                var mResponse = JSON.parse(response);
                let code = mResponse.code;
                console.log(mResponse);
                if (code == 200) {
                    $(addPatientDialog).modal("hide");
                } else {
                    var error = [];
                    error.status = code;
                    error.message = mResponse.message;
                    handleAjaxError(error);
                }
            },
            error: (err) => handleAjaxError(err),
        });
    }
}

function clearPatientDialog() {
    addPatientForm.reset();
    let errors = addPatientForm.querySelectorAll(".errors");
    errors.forEach((error) => {
        if (error.classList.contains("errors-showing")) {
            error.classList.remove("errors-showing");
        }
    });
    let inputs = addPatientDialog.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = "";
    });

    facilityDialogSelect.selectedIndex=0;
}

function clearChildDialog() {
    linkchildform.reset();
    let errors = linkchildform.querySelectorAll(".errors");
    errors.forEach((error) => {
        if (error.classList.contains("errors-showing")) {
            error.classList.remove("errors-showing");
        }
    });
    let inputs = linkchildform.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = "";
    });

    labelChildID.innerHTML = "";
    $('#childTestedSelect').removeAttr("disabled");
}

function handleAjaxError(err) {
    if (err.status == 401) window.location.replace("login.html");
    else {
        errorDisplayDiv.querySelector("p").innerText = err.message;
        errorDisplayDiv.style.display = "block";
    }
}

function showPatientList(patients) {
    for (let p = 0; p < patients.length; p++) {
        let patient = patients[p];

        $('#patientsearchresult').empty();

        var pbutton = document.createElement('button');
        pbutton.setAttribute("type", "button");
        pbutton.setAttribute("id", patient.id);
        pbutton.classList.add("list-group-item", "list-group-item-action")
        pbutton.addEventListener("click",() => {
            console.log(patient)
            populatepatientdate(patient);
        })
        let name = patient.names;
        pbutton.innerHTML = "<b>" + patient.names + "</b> <br/> " + patient.cccNo;

        patientsearchresult.appendChild(pbutton);
        patientsearchresult.classList.remove('d-none');

    }
}

function populatepatientdate(patient) {
    patientsearchresult.classList.add("d-none")
    patientid = patient.id;

    let children = patient.children;

    //populate index client data
    clientcccno.innerHTML = patient.cccNo;
    clientnamedisplay.innerHTML = patient.names;
    dateclienttesteddisplay.innerHTML = patient.date_tested;
    mflcodedisplay.innerHTML = patient.facility.mfl_code;
    facilityname.innerHTML = patient.facility.name;
    countydisplay.innerHTML = patient.facility.county;
    childrennumber.innerHTML = children.length;
    dateclientlisteddisplay.innerHTML = patient.date_listed;
    dateclientenrolleddisplay.innerHTML = patient.dateEnrolledToCare;
    indexclientstatusdisplay.innerHTML = patient.currentStatus;

    indexclientdetails.classList.remove('d-none');
    $('#addChildBtn').removeAttr('disabled');
    $('#childrenlistedcard').empty();

    populateChildren(children);
}

function populateChildren(children) {
    for (let c = 0; c < children.length; c++) {
        let child = children[c];

        console.log(child);
        let itemid = c+1;

        //create collapsible card for each child
        var card = document.createElement('div');
        card.classList.add("card", "shadow", "mb-3");

        var headerlink = document.createElement('a');
        headerlink.setAttribute('href', '#collapseCard' + c);
        headerlink.classList.add("d-block", "card-header", "py-3");
        headerlink.setAttribute('data-toggle', "collapse");
        headerlink.setAttribute('role', "button");
        headerlink.setAttribute('aria-expanded', "true");
        headerlink.setAttribute('aria-controls', "collapseCard" + c);

        var childname = document.createElement('h6');
        childname.classList.add("m-0", "font-weight-bold", "text-primary", "text-center");
        childname.innerHTML = "Child #" + itemid + ' ' + child.names;

        headerlink.appendChild(childname);

        var collapsablediv = document.createElement("div");
        collapsablediv.classList.add("collapse", "hide");
        collapsablediv.setAttribute('id', 'collapseCard' + c);

        var cardbody = document.createElement('div');
        cardbody.classList.add("card-body");

        var rowdiv = document.createElement('div');
        rowdiv.classList.add("row", "justify-content-center");

        var divcol = document.createElement('div');
        divcol.classList.add("col-auto");

        var table = document.createElement('table');
        table.classList.add("table", "table-responsive");
        table.setAttribute('width', "100%");

        var tbody = document.createElement('tbody');

        var tr1 = document.createElement('tr');

        var td1 = document.createElement('td');
        td1.setAttribute('scope', 'row');
        td1.classList.add("border-right", "border-top-0", "border-bottom-0");
        td1.innerHTML = "Date Listed";

        var td2 = document.createElement('td');
        td2.classList.add("border-right", "border-top-0", "border-bottom-0", "border-right-0");
        td2.innerHTML = child.date_listed;

        tr1.appendChild(td1);
        tr1.appendChild(td2);

        var tr2 = document.createElement('tr');

        var td3 = document.createElement('td');
        td3.setAttribute('scope', 'row');
        td3.classList.add("border-right", "border-bottom-0");
        td3.innerHTML = "Age";

        let age = getAge(child.dob);
        var td4 = document.createElement('td');
        td4.classList.add("border-right", "border-bottom-0", "border-right-0");
        td4.innerHTML = age + ' years';

        tr2.appendChild(td3);
        tr2.appendChild(td4);

        var tr3 = document.createElement('tr');

        var td5 = document.createElement('td');
        td5.setAttribute('scope', 'row');
        td5.classList.add("border-right", "border-bottom-0");
        td5.innerHTML = "Was the child tested at enrollment?";

        var td6 = document.createElement('td');
        td6.classList.add("border-right", "border-bottom-0", "border-right-0");
        td6.innerHTML = child.tested;

        tr3.appendChild(td5);
        tr3.appendChild(td6);

        var tr4 = document.createElement('tr');

        var td7 = document.createElement('td');
        td7.setAttribute('scope', 'row');
        td7.classList.add("border-right", "border-bottom-0");
        td7.innerHTML = "Test Outcome";

        var td8 = document.createElement('td');
        td8.classList.add("border-right", "border-bottom-0", "border-right-0");
        td8.innerHTML = child.test_outcome;

        tr4.appendChild(td7);
        tr4.appendChild(td8);

        var tr5 = document.createElement('tr');

        var td9 = document.createElement('td');
        td9.setAttribute('scope', 'row');
        td9.classList.add("border-right", "border-bottom-0");
        td9.innerHTML = "CCC Number";

        var td10 = document.createElement('td');
        td10.classList.add("border-right", "border-bottom-0", "border-right-0");
        td10.innerHTML = child.cccNo;

        tr5.appendChild(td9);
        tr5.appendChild(td10);

        tbody.appendChild(tr1);
        tbody.appendChild(tr2);
        tbody.appendChild(tr3);
        tbody.appendChild(tr4);
        tbody.appendChild(tr5);

        table.appendChild(tbody);
        divcol.appendChild(table);
        rowdiv.appendChild(divcol);

        var buttondiv = document.createElement('div');
        buttondiv.classList.add("float-right", "mb-4");

        let testbtn = document.createElement('button');
        testbtn.classList.add("btn", "btn-success", "mr-2");
        testbtn.setAttribute('data-toggle', "modal");
        testbtn.setAttribute("data-target", "#ChildTestDialog");
        testbtn.setAttribute("id", "testbutton"+ itemid);
        testbtn.innerHTML = 'Test Details';
        if (child.tested == 'Y') {
            testbtn.setAttribute('disabled', 'disabled');
        }
        testbtn.addEventListener('click', () => funTestChild(child));

        var editbtn = document.createElement('div');
        editbtn.classList.add("btn", "btn-primary", "mr-2");
        editbtn.setAttribute('data-toggle', "modal");
        editbtn.setAttribute("data-target", "#linkChildDialog");
        editbtn.innerHTML = 'Edit Details';
        editbtn.addEventListener('click', () => funEditChild(child));

        var deletechild = document.createElement('div');
        deletechild.classList.add("btn", "btn-danger");
        deletechild.innerHTML = 'Unlink';
        deletechild.addEventListener('click', () => funUnlinkChild(child.id));

        buttondiv.appendChild(testbtn);
        buttondiv.appendChild(editbtn);
        buttondiv.appendChild(deletechild);

        cardbody.appendChild(rowdiv);
        cardbody.appendChild(buttondiv);

        collapsablediv.appendChild(cardbody);

        card.appendChild(headerlink);
        card.appendChild(collapsablediv);

        childrenlistedcard.appendChild(card);
    }
}

function funEditChild(child) {
    let errors = linkchildform.querySelectorAll(".errors");
    errors.forEach((error) => {
        if (error.classList.contains("errors-showing")) {
            error.classList.remove("errors-showing");
        }
    });
    labelChildID.innerHTML = child.id;
    childnamesinput.value = child.names;
    dobinput.value = child.dob;
    datelistedinput.value = child.date_listed;
    $('#childTestedSelect').val(child.tested);
    $('#childTestedSelect').attr('disabled', 'disabled');
    datetestedinput.value = child.date_tested;
    $('#testOutcomeSelect').val(child.test_outcome);
    $('#linkedSelect').val(child.islinked);
    childcccnoinput.value = child.cccNo;
}

function funTestChild(child) {
    childtestform.reset();
    var errors = childtestform.querySelectorAll(".errors");
    errors.forEach((error) => {
        if (error.classList.contains("errors-showing")) {
            error.classList.remove("errors-showing");
        }
    });
    var inputs = childtestform.querySelectorAll("input");
    inputs.forEach((input) => {
        input.value = "";
    });

    ChildID.innerHTML = child.id;
    childTestedSelect2.selectedIndex=0;
    testOutcomeSelect2.selectedIndex=0;
    linkedSelect2.selectedIndex=0;
}

function funUnlinkChild(id) {
    var r = confirm("Are you sure you want to Unlink this child?");
    if (r == true) {
        $.ajax({
            type: "POST",
            url: "datascript?request=unlink_child",
            data: {
                id: id,
            },
            success: function (response) {
                var mResponse = JSON.parse(response);
                var code = mResponse.code;
                if (code == 200){
                    populatepatientdate(mResponse.data);
                } else {
                    var error = [];
                    error.status = code;
                    error.message = mResponse.message;
                    handleAjaxError(error);
                }
            },
            error: function (error) {
                handleAjaxError(error);
            },
        });
    }
}

function getAge(dOb) {
    var now = new Date();
    var dob = new Date(dOb);

    var agediff = now.getTime() - dob.getTime();
    var age = Math.floor(agediff / (1000 * 60 * 60 * 24 * 365.25));

    return age;
}

function initialchildTestOptionChanged() {
    var selectedValue =
        childTestedSelect.options[childTestedSelect.selectedIndex].value;
    var initialtestFields = document.querySelectorAll(".initialtestclass");
    if (selectedValue == "Y") {
        //if (disableOptions) ovcenrolledSelect.disabled = true;
        initialtestFields.forEach((initialtestField) => {
            initialtestField.removeAttribute("disabled");
        });
    } else {
        initialtestFields.forEach((initialtestField) => {
            initialtestField.setAttribute("disabled", "");
        });
    }
}

function initialTestOutcomeOptionChanged() {
    var selectedValue =
        linkedSelect.options[linkedSelect.selectedIndex].value;
    var initialoutcomeFields = document.querySelectorAll(".initialoutcomeclass");
    if (selectedValue == "Y") {
        //if (disableOptions) ovcenrolledSelect.disabled = true;
        initialoutcomeFields.forEach((initialoutcomeField) => {
            initialoutcomeField.removeAttribute("disabled");
        });
    } else {
        initialoutcomeFields.forEach((initialoutcomeField) => {
            initialoutcomeField.setAttribute("disabled", "");
        });
    }
}
function otherchildTestOptionChanged() {
    var selectedValue =
        childTestedSelect2.options[childTestedSelect2.selectedIndex].value;
    var othertestFields = document.querySelectorAll(".othertestclass");
    if (selectedValue == "Y") {
        othertestFields.forEach((othertestField) => {
            othertestField.removeAttribute("disabled");
        });
    } else {
        othertestFields.forEach((othertestField) => {
            othertestField.setAttribute("disabled", "");
        });
    }
}

function otherTestOutcomeOptionChanged() {
    var selectedValue =
        linkedSelect2.options[linkedSelect2.selectedIndex].value;
    var otheroutcomeFields = document.querySelectorAll(".otheroutcomeclass");
    if (selectedValue == "Y") {
        otheroutcomeFields.forEach((otheroutcomeField) => {
            otheroutcomeField.removeAttribute("disabled");
        });
    } else {
        otheroutcomeFields.forEach((otheroutcomeField) => {
            otheroutcomeField.setAttribute("disabled", "");
        });
    }
}