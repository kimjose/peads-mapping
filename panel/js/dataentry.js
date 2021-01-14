// const otzmodulesdiv = document.getElementById("otzmodulesdiv");
const userName = document.getElementById("userName");
const lastLoginDate = document.getElementById("lastLoginDate");
const dataEntryDate = document.getElementById("dataEntryDate");
const cccNoInput = document.getElementById("cccNo");
const btnSearch = document.getElementById("btnSearch");
const mflcodeInput = document.getElementById("mflcode");
// const facilityInput = document.getElementById("facility");
const facilitySelector = document.getElementById("facilitySelect");
const countyInput = document.getElementById("county");
const genderSelect = document.getElementById("genderSelect");
const dobInput = document.getElementById("dob");
const dohdInput = document.getElementById("dohd");
const decInput = document.getElementById("dec");
const ageatenrollmentInput = document.getElementById("ageatenrollment");
const currentageInput = document.getElementById("currentage");
const startregimenSelect = document.getElementById("startregimenSelect");
const dsaInput = document.getElementById("dsa");
const startformulationSelect = document.getElementById(
    "startformulationSelect"
);
const currentregimenSelect = document.getElementById("currentregimenSelect");
const regimenlineSelect = document.getElementById("regimenlineSelect");
const dscrInput = document.getElementById("dscr");
const currentKaletraformulationSelect = document.getElementById(
    "currentformulationSelect"
);
const isLDL1 = document.getElementById("isLDL1");
const vlcopiesInput = document.getElementById("vlcopies");
const vldateInput = document.getElementById("vldate");
// const vloutcomestatusInput = document.getElementById("vloutcomestatus");
const currentvlstatustSelect = document.getElementById(
    "currentvlstatustSelect"
);
const isZScoreCheck = document.getElementById("isZScore");
const isMUACCheck = document.getElementById("isMUAC");
const isBMICheck = document.getElementById("isBMI");
const zscoreInput = document.getElementById("zscore");
const currentoiSelect = document.getElementById("currentoiSelect");
const disclosureStatusSelect = document.getElementById(
    "disclosureStatusSelect"
);
const iptstatusSelect = document.getElementById("iptstatusSelect");
const schoolingstatusSelect = document.getElementById("schoolingstatusSelect");
const statusAtTransitionSelect = document.getElementById(
    "statusAtTransitionSelect"
);
const ovcenrolledSelect = document.getElementById("ovcenrolledSelect");
const ovcEnrollmentDateInput = document.getElementById("ovcEnrollmentDate");
const ovcCpmisSelect = document.getElementById("ovcCpmisSelect");
const cpmisNumberInput = document.getElementById("cpmisNumber");
const isLDL2 = document.getElementById("isLDL2");
const ovcVLcopiesInput = document.getElementById("ovcVLcopies");
const ovcVLDateInput = document.getElementById("ovcvldate");
const ovcDiscontinuedDateInput = document.getElementById("ovcDiscontinuedDate");
const ovcDiscontinuationStatusSelect = document.getElementById(
    "ovcDiscontinuationStatusSelect"
);
const otzenrolledSelect = document.getElementById("otzenrolledSelect");
const otzEnrollmentDateInput = document.getElementById("otzenrollmentdate");
const otzregimenSelect = document.getElementById("otzregimenSelect");
const isLDL4 = document.getElementById("isLDL4")
const otzVlInput = document.getElementById("otzvl");
const otzVlDateInput = document.getElementById("otzvldate");
// const missedLastAppointmentSelect = document.getElementById(
//   "missedLastAppointmentSelect"
// );
const otzNextAppointmentDateInput = document.getElementById("otzNextAppointmentDate");
const otzLastAttendDateInput = document.getElementById("otzlastAttendDate");
const artAssessmentSelect = document.getElementById("artassessmentSelect");
const otzModulesSelect = document.getElementById("modulesSelect");
const otzTransitionStatusSelect = document.getElementById(
    "otzTransitionStatusSelect"
);
const otzDiscontinuedDateInput = document.getElementById("otzDiscontinuedDate");
const pamaEnrolledSelect = document.getElementById("pamaEnrolledSelect");
const pamaEnrollmentDateInput = document.getElementById("pamaEnrollmentDate");
const caregiverenrolledSelect = document.getElementById(
    "caregiverenrolledSelect"
);
// const caregivertypeSelect = document.getElementById("caregivertypeSelect");
const caregiver1cccnoInput = document.getElementById("caregiver1cccno");
const caregiver2cccnoInput = document.getElementById("caregiver2cccno");
const isLDL5 = document.getElementById("isLDL5");
const caregiver3cccnoInput = document.getElementById("caregiver3cccno");
// const mothervlcopiesInput = document.getElementById("mothervlcopies");
// const motherlastvlDateInput = document.getElementById("motherlastvlDate");
// const fathervlcopiesInput = document.getElementById("fathervlcopies");
// const fatherlastvlDateInput = document.getElementById("fatherlastvlDate");
// const guardianvlcopiesInput = document.getElementById("guardianvlcopies");
// const guardianlastvlDateInput = document.getElementById("guardianlastvlDate");
const caregivervlInput = document.getElementById("caregivervl");
const caregivervlddateInput = document.getElementById("caregivervlddate");

const tbodyMother = document.getElementById("tbodyMother");
const isLDLmother = document.getElementById("isLDLmother");
const motherVlCopiesInput = document.getElementById("mothervlcopies");
const motherlastvlDateInput = document.getElementById("motherlastvlDate");

const tbodyFather = document.getElementById("tbodyFather");
const isLDLfather = document.getElementById("isLDLfather");
const fatherVlCopiesInput = document.getElementById("fathervlcopies");
const fatherlastvlDateInput = document.getElementById("fatherlastvlDate");

const tbodyGuardian = document.getElementById("tbodyGuardian");
const isLDLguardian = document.getElementById("isLDLguardian");
const guardianVlCopiesInput = document.getElementById("guardianvlcopies");
const guardianlastvlDate = document.getElementById("guardianlastvlDate");

const caregivervlstatustSelect = document.getElementById(
    "caregivervlstatustSelect"
);
const pamastatusat3Select = document.getElementById("pamastatusat3Select");
const pamastatusat6Select = document.getElementById("pamastatusat6Select");
const pamastatusat12Select = document.getElementById("pamastatusat12Select");
const pamastatusat24Select = document.getElementById("pamastatusat24Select");
const currentPamaStatusSelect = document.getElementById(
    "currentpamastatusSelect"
);
const pamaStatusAtTransitionSelect = document.getElementById(
    "pamastatusattransitionSelect"
);
const pamaDiscontinuedDateInput = document.getElementById(
    "pamadiscontinueddate"
);
const commentArea = document.getElementById("commentArea");
const btnSubmit = document.getElementById("btnSubmit");
const mappingform = document.getElementById("mappingform");
const addNewPatient = document.getElementById("addNewPatient");
const guardianchkbox = document.getElementById("guardianchkbox");
const fatherchkbox = document.getElementById("fatherchkbox");
const motherchkbox = document.getElementById("motherchkbox");

const errorDiv = document.querySelector("#error-modal");

motherchkbox.addEventListener('change', () => {
    guardianchkbox.checked = false;
    caregiverChanged();
});
isLDLmother.addEventListener('change', () => {
    if (isLDLmother.checked) {
        motherVlCopiesInput.value = '';
        motherVlCopiesInput.readOnly = true;
    } else motherVlCopiesInput.readOnly = true;
});
fatherchkbox.addEventListener('change', () => {
    guardianchkbox.checked = false;
    caregiverChanged();
});
isLDLfather.addEventListener('change', () => {
    if (isLDLfather.checked) {
        fatherVlCopiesInput.value = '';
        fatherVlCopiesInput.readOnly = true;
    } else fatherVlCopiesInput.readOnly = false;
});
guardianchkbox.addEventListener('change', () => {
    motherchkbox.checked = false;
    fatherchkbox.checked = false;
    caregiverChanged();
});
isLDLguardian.addEventListener('change', () => {
    if (isLDLguardian.checked) {
        guardianVlCopiesInput.value = '';
        guardianVlCopiesInput.readOnly = true;
    } else guardianVlCopiesInput.readOnly = false;
});

function caregiverChanged() {
    if (guardianchkbox.checked) {
        tbodyGuardian.removeAttribute('hidden');
    } else tbodyGuardian.setAttribute('hidden', '');
    if (fatherchkbox.checked) {
        tbodyFather.removeAttribute('hidden');
    } else tbodyFather.setAttribute('hidden', '');
    if (motherchkbox.checked) {
        tbodyMother.removeAttribute('hidden');
    } else tbodyMother.setAttribute('hidden', '');
}

function handleError(errorCode, errorMessage) {
    if (errorCode === 401) window.location.replace("login.html");
    else {
        errorDiv.querySelector("p").innerText = errorMessage;
        errorDiv.style.display = "block";
    }
}
document.getElementById("errorModalDismiss").addEventListener('click', () => {
    errorDiv.style.display = "none";
});
var dob, dateenrolled;
var facilities;

var newpatient = false;

addNewPatient.addEventListener("click", () => {
    newpatient = true;

    mappingform.reset();
    mflcodeInput.innerHTML = "";
    currentageInput.innerHTML = "";
    ageatenrollmentInput.innerHTML = "";
    let cccNo = sessionStorage.getItem("cccNo");
    console.log(cccNo);
    cccNoInput.value = cccNo;

    $("#addpatientmodal").modal("hide");
});

initialize();
// $("#currentoiSelect").select2();

$.ajax({
    dataType: "json",
    url: "data.json",
    success: function (data) {
        var opportunisticInfections = data.opportunisticInfections;
        opportunisticInfections.sort();
        opportunisticInfections.forEach((oi) => {
            let option = document.createElement("option");
            option.setAttribute("value", oi);
            option.appendChild(document.createTextNode(oi));
            currentoiSelect.appendChild(option);
        });
    },
    error: (error) =>{
        handleError(error.status, error.message);
    }
});

btnSearch.addEventListener("click", () => loadPreviousObservation());

btnSubmit.addEventListener("click", () => submitPatientData());

function initialize() {
    let userObject = sessionStorage.getItem("user");
    if (userObject == null) {
        window.location.replace("login.html");
        return;
    }
    var loggedinuser = JSON.parse(userObject);
    console.log(loggedinuser);

    userName.innerText = loggedinuser.names;
    lastLoginDate.innerHTML = loggedinuser.last_login;
    var d = new Date().toLocaleString();
    dataEntryDate.innerHTML = d;

    const inputHandler = function (e) {
        console.log(e.target.value);
        if (e.target.value < 1000) {
            $("#currentvlstatustSelect").val("Supressed");
        } else if (e.target.value >= 1000) {
            $("#currentvlstatustSelect").val("NotSupressed");
        }
    }

    vlcopiesInput.addEventListener('input', inputHandler);
    vlcopiesInput.addEventListener('propertychange', inputHandler); // for IE8

    isLDL1.addEventListener("click", () => {
        if (isLDL1.checked) {
            vlcopiesInput.value = "";
            vlcopiesInput.disabled = true;
            $("#currentvlstatustSelect").val("Supressed");
        } else {
            vlcopiesInput.disabled = false;
            // $("#currentvlstatustSelect").val("");
        }
    });


    isLDL2.addEventListener('click', () => {
        if (isLDL2.checked) {
            ovcVLcopiesInput.value = '';
            ovcVLcopiesInput.readOnly = true;
        } else {
            ovcVLcopiesInput.readOnly = false;
        }
    });

    isLDL4.addEventListener('click', () => {
        if (isLDL4.checked) {
            otzVlInput.value = '';
            otzVlInput.readOnly = true;
        } else {
            otzVlInput.readOnly = false;
        }
    });
    /*
      isLDL5.addEventListener('click', () => {
        if (isLDL5.checked) {
          caregivervlInput.value = '';
          caregivervlInput.readOnly = true;
        } else {
          caregivervlInput.readOnly = false;
        }
      });

    */
    isBMICheck.addEventListener("click", () => {
        if (isBMICheck.checked) {
            isZScoreCheck.checked = false;
            isMUACCheck.checked = false;
        }
    });

    isZScoreCheck.addEventListener("click", () => {
        if (isZScoreCheck.checked) {
            isBMICheck.checked = false;
            isMUACCheck.checked = false;
        }
    });

    isMUACCheck.addEventListener("click", () => {
        if (isMUACCheck.checked) {
            isBMICheck.checked = false;
            isZScoreCheck.checked = false;
        }
    });

    ovcenrolledSelect.addEventListener('click', () => ovcOptionChanged());
    otzenrolledSelect.addEventListener('click', () => otzOptionChanged());
    pamaEnrolledSelect.addEventListener('click', () => pamaOptionChanged())

    $.ajax({
        type: "GET",
        url: "datascript?request=get_otz_modules",
        success: function (response) {
            response = response.replace('/^s+|s+$/g, ""');
            var mResponse = JSON.parse(response);
            var code = mResponse.code;
            if (code == 200) {
                var modules = mResponse.data;
                for (let i = 0; i < modules.length; i++) {
                    const module = modules[i];
                    let option = document.createElement("option");
                    option.setAttribute("value", module.id);
                    option.appendChild(document.createTextNode(module.name));
                    otzModulesSelect.appendChild(option);
                    // console.log(modules);
                    // loadtocheckbox(modules);
                }
            } else {
                handleError(code, mResponse.message);
            }
        },
        error: error => handleError(error.status, error.message)
    });

    $.ajax({
        type: "GET",
        url: "datascript?request=get_regimens",
        success: function (response) {
            var mResponse = JSON.parse(response);
            let code = mResponse.code;
            if (code == 200) {
                var regimens = mResponse.data;
                for (let i = 0; i < regimens.length; i++) {
                    const regimen = regimens[i];
                    let option = document.createElement("option");
                    option.setAttribute("value", regimen.name);
                    option.appendChild(document.createTextNode(regimen.name));
                    currentregimenSelect.appendChild(option);
                    startregimenSelect.appendChild(option.cloneNode(true));
                    otzregimenSelect.appendChild(option.cloneNode(true));
                    startRegimenDialogSelect.appendChild(option.cloneNode(true));
                }
            }else {
                handleError(code, mResponse.message);
            }
        },
        error: error => handleError(error.status, error.message)
    });

    // $("#facilitySelect").select2();

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
                    facilitySelector.appendChild(option);
                    facilityDialogSelect.appendChild(option.cloneNode(true));
                }
            }else {
                handleError(code, mResponse.message);
            }
        },
        error: error => handleError(error.status, error.message)
    });
}

function loadPreviousObservation() {
    let cccNo = cccNoInput.value;
    if (cccNo.length < 10 || cccNo.length > 10) {
        alert("Enter a valid CCC number");
        return;
    }
    $.ajax({
        type: "GET",
        url: "datascript?request=get_last_vls&cccNo=" + cccNo,
        success: function (response) {
            var mResponse = JSON.parse(response);
            console.log(mResponse.data);
            data = mResponse.data;
            for (var i = 0; i < data.length; i++) {
                let dataobj = data[i];

            }
        },
        error: error => handleError(error.status, error.message)
    });

    $.ajax({
        type: "GET",
        url: "datascript?request=load_prev_obs&cccNo=" + cccNo,
        success: function (response) {
            console.log(response);
            var mResponse = JSON.parse(response);
            let code = mResponse.code;
            if (code == 200) {
                //Ok data
                btnSubmit.removeAttribute("disabled")
                let patient = mResponse.data.patient;
                var observation = mResponse.data.observation;
                var facil = patient.facility;
                var facilities = facilitySelector.options;
                for (var i = 0; i < facilities.length; i++) {
                    let facilityOption = facilities[i];
                    if (facilityOption.value == patient.facility) {
                        facilitySelector.selectedIndex = i;
                    }
                }
                mflcodeInput.innerHTML = patient.facilityData.mfl_code;
                countyInput.innerHTML = patient.county;
                $("#genderSelect").val(patient.sex);
                dobInput.value = patient.dob;
                dob = new Date(patient.dob);
                dateenrolled = new Date(patient.date_enrolled);
                getAge(dob, dateenrolled);
                let currentAge = calculateAgeDifference(dob);
                if (currentAge < 10 || currentAge > 19) {//disable OTZ
                    otzenrolledSelect.setAttribute("disabled", "")
                } else {
                    if (otzenrolledSelect.hasAttribute("disabled")) otzenrolledSelect.removeAttribute("disabled");
                }
                if (currentAge > 15) {//disable pama
                    pamaEnrolledSelect.setAttribute("disabled", "");
                } else {
                    if (pamaEnrolledSelect.hasAttribute("disabled")) pamaEnrolledSelect.removeAttribute("disabled")
                }
                dohdInput.value = patient.date_of_hiv_diagnosis;
                decInput.value = patient.date_enrolled;
                dsaInput.value = patient.dateStartedART;
                $("#startregimenSelect").val(patient.startRegimen);
                $("#startformulationSelect").val(patient.startKaletraFormulation);
                loadObsData(observation);
            } else if (code == 201) {
                //Empty obs
                btnSubmit.removeAttribute("disabled")
                let patient = mResponse.data.patient;
                var facil = patient.facility;
                $("#facilitySelect").val(facil);
                // facilitySelector.disabled=true;
                // facilityInput.value = patient.facilityData.name;
                mflcodeInput.innerHTML = patient.facilityData.mfl_code;
                countyInput.innerHTML = patient.county;
                var genders = genderSelect.options;
                $("#genderSelect").val(patient.sex);
                /*for (let i = 0; i < genders.length; i++) {
                  const gender = genders[i];
                  if (patient.sex == gender.value) {
                    genderSelect.selectedIndex = i;
                  }
                }*/
                dobInput.value = patient.dob;
                dob = new Date(patient.dob);
                dateenrolled = new Date(patient.date_enrolled);
                getAge(dob, dateenrolled);
                dohdInput.value = patient.date_of_hiv_diagnosis;
                decInput.value = patient.date_enrolled;
                dsaInput.value = patient.dateStartedART;
                $("#startregimenSelect").val(patient.startRegimen);
                $("#startformulationSelect").val(patient.startKaletraFormulation);
            } else {
                sessionStorage.setItem("cccNo", cccNo);
                $("#addpatientmodal").modal("show");
            }
        },
        error: error => {
            sessionStorage.setItem("cccNo", cccNo);
            $("#addpatientmodal").modal("show");
            handleError(error.status, "Error encountered.")
        }
    });
}

function getAge(dob, dateenrolled) {
    var now = new Date();

    var agediff = now.getTime() - dob.getTime();
    var age = Math.floor(agediff / (1000 * 60 * 60 * 24 * 365.25));

    console.log(age);
    currentageInput.innerHTML = age + " years";

    var enrolleddiff = dateenrolled.getTime() - dob.getTime();
    var agewhenenrolled = Math.floor(
        enrolleddiff / (1000 * 60 * 60 * 24 * 365.25)
    );

    console.log(agewhenenrolled);
    ageatenrollmentInput.innerHTML = agewhenenrolled + " years";
}

function calculateAgeDifference(date1, date2 = null) {
    let startDate = new Date(date1);
    let endDate = date2 == null ? new Date() : new Date(date2);
    return endDate.getTime() - startDate.getTime();
}

function loadObsData(observation) {
    var regimens = currentregimenSelect.options;
    for (var i = 0; i < regimens.length; i++) {
        const regimen = regimens[i];
        console.log(regimen.value);
        if (regimen.value == observation.currentRegimen) {
            currentregimenSelect.selectedIndex = i;
        }
    }
    var regLines = regimenlineSelect.options;
    for (var i = 0; i < regLines.length; i++) {
        const regLine = regLines[i];
        if (regLine.value == observation.regimenLine) {
            regimenlineSelect.selectedIndex = i;
        }
    }
    vldateInput.value = observation.vlDate;
    dscrInput.value = observation.regimenStartDate;
    var kaletraFormulations = currentKaletraformulationSelect.options;
    for (var i = 0; i < kaletraFormulations.length; i++) {
        const kaletraFormulation = kaletraFormulations[i];
        if (kaletraFormulation.value == observation.kaletraFormulation) {
            currentKaletraformulationSelect.selectedIndex = i;
        }
    }
    if (observation.vlCopies == "LDL") {
        isLDL1.checked = true;
        vlcopiesInput.value = '';
    } else vlcopiesInput.value = observation.vlCopies;
    // vloutcomestatusInput.value = observation.vlOutcome;
    $("#currentvlstatustSelect").val(observation.vlOutcome);
    isZScoreCheck.checked = false;
    isMUACCheck.checked = false;
    isBMICheck.checked = false;
    if (observation.vlScoreType == "ZScore") isZScoreCheck.checked = true;
    else if (observation.vlScoreType == "MUAC") isMUACCheck.checked = true;
    else if (observation.vlScoreType == "BMI") isBMICheck.checked = true;

    zscoreInput.value = observation.latestZScore;
    var opprtunisticInfections = currentoiSelect.options;
    for (var i = 0; i < opprtunisticInfections.length; i++) {
        const opprtunisticInfection = opprtunisticInfections[i];
        if (opprtunisticInfection.value == observation.opportunisticInfection) {
            currentoiSelect.selectedIndex = i;
        }
    }
    var disclosureStatuses = disclosureStatusSelect.options;
    for (var i = 0; i < disclosureStatuses.length; i++) {
        const disclosureStatus = disclosureStatuses[i];
        if (disclosureStatus.value == observation.disclosureStatus) {
            disclosureStatusSelect.selectedIndex = i;
        }
    }

    var disclosurestatus = $("#disclosureStatusSelect").val();
    if (disclosurestatus == "Full") {
        disclosureStatusSelect.disabled = true;
    }

    var iptStatuses = iptstatusSelect.options;
    for (var i = 0; i < iptStatuses.length; i++) {
        const iptStatus = iptStatuses[i];
        if (iptStatus.value == observation.iptStatus) {
            iptstatusSelect.selectedIndex = i;
        }
    }

    var iptstatus = $("#iptstatusSelect").val();
    if (iptstatus == "Completed") {
        iptstatusSelect.disabled = true;
    }

    var schoolingStatuses = schoolingstatusSelect.options;
    for (var i = 0; i < schoolingStatuses.length; i++) {
        const schoolingStatus = schoolingStatuses[i];
        if (schoolingStatus.value == observation.schooling) {
            schoolingstatusSelect.selectedIndex = i;
        }
    }
    var tranStatuses = statusAtTransitionSelect.options;
    for (var i = 0; i < tranStatuses.length; i++) {
        const tranStatus = tranStatuses[i];
        if (tranStatus.value == observation.statusAtTransition) {
            statusAtTransitionSelect.selectedIndex = i;
        }
    }

    var currentTransitionStatus = $("#statusAtTransitionSelect").val();
    if (currentTransitionStatus !== "Transfer Out") {
        facilitySelector.disabled = true;
    }

    //OVC Work---.
    var ovcOptions = ovcenrolledSelect.options;
    for (var i = 0; i < ovcOptions.length; i++) {
        const ovcOption = ovcOptions[i];
        if (ovcOption.value == observation.enrolledInOVC) {
            ovcenrolledSelect.selectedIndex = i;
        }
    }

    ovcOptionChanged(true);

    ovcEnrollmentDateInput.value = observation.dateEnrolledInOVC;
    if (
        observation.dateEnrolledInOVC !== "" &&
        observation.dateEnrolledInOVC !== "0000-00-00"
    ) {
        ovcEnrollmentDateInput.readOnly = true;
    }
    cpmisNumberInput.value = observation.CPMISNumber;
    if (observation.CPMISNumber !== 0) {
        cpmisNumberInput.readOnly = true;
    }
    if (observation.ovcVLCopies == "LDL") {
        isLDL2.checked = true;
        ovcVLcopiesInput.value = '';
        ovcVLcopiesInput.readOnly = true;
    } else ovcVLcopiesInput.value = observation.ovcVLCopies
    ovcDiscontinuedDateInput.value = observation.dateDiscontinuedFromOVC;
    var ovcDisStatuses = ovcDiscontinuationStatusSelect.options;
    for (var i = 0; i < ovcDisStatuses.length; i++) {
        const ovcDisStatus = ovcDisStatuses[i];
        if (ovcDisStatus.value == observation.statusAtOVCDiscontinuation) {
            ovcDiscontinuationStatusSelect.selectedIndex = i;
        }
    }

    //OTZ work ---->
    var otzEnrolledOptions = otzenrolledSelect.options;
    for (var i = 0; i < otzEnrolledOptions.length; i++) {
        const otzEnrolledOption = otzEnrolledOptions[i];
        if (otzEnrolledOption.value == observation.enrolledInOTZ) {
            otzenrolledSelect.selectedIndex = i;
        }
    }
    otzOptionChanged(true);
    otzEnrollmentDateInput.value = observation.dateEnrolledInOTZ;
    for (var i = 0; i < regimens.length; i++) {
        const regimen = regimens[i];
        if (regimen.value == observation.OTZArtRegimen) {
            otzregimenSelect.selectedIndex = i;
        }
    }
    if (observation.OTZVL == "LDL") {
        isLDL4.checked = true;
        otzVlInput.value = '';
        otzVlInput.readOnly = true;
    } else otzVlInput.value = observation.ovcVLCopies
    otzVlInput.value = observation.OTZVL;
    otzVlDateInput.value = observation.OTZVLDate;
    /*var missedOptions = missedLastAppointmentSelect.options;
    for (var i = 0; i < missedOptions.length; i++) {
      const missedOption = missedOptions[i];
      if (missedOption.value == observation.missedLastAppointment) {
        missedLastAppointmentSelect.selectedIndex = i;
      }
    }*/
    var artAssessmentOptions = artAssessmentSelect.options;
    for (var i = 0; i < artAssessmentOptions.length; i++) {
        const artAssessmentOption = artAssessmentOptions[i];
        if (artAssessmentOption.value == observation.ArtAdherenceAssessment) {
            artAssessmentSelect.selectedIndex = i;
        }
    }
    otzLastAttendDateInput.value = observation.lastAttendDate;
    otzNextAppointmentDateInput.value = observation.nextAppointmentDate;
    var otzModules = otzModulesSelect.options;
    for (var i = 0; i < otzModules.length; i++) {
        const otzModule = otzModules[i];
        if (otzModule.value < observation.completedOTZModules){
            otzModule.setAttribute("disabled", "");
        }
        if (otzModule.value == observation.completedOTZModules) {
            otzModulesSelect.selectedIndex = i;
        }
    }
    var tranStatOptions = otzTransitionStatusSelect.options;
    for (var i = 0; i < tranStatOptions.length; i++) {
        const tranStatOption = tranStatOptions[i];
        if (tranStatOption.value == observation.statusAtOTZTransition) {
            otzTransitionStatusSelect.selectedIndex = i;
        }
    }
    otzDiscontinuedDateInput.value = observation.dateDiscontinuedFromOTZ;

    //PAMA--------->
    var pamaEnrolledOptions = pamaEnrolledSelect.options;
    for (var i = 0; i < pamaEnrolledOptions.length; i++) {
        const pamaEnrolledOption = pamaEnrolledOptions[i];
        if (pamaEnrolledOption.value == observation.enrolledInPAMA) {
            pamaEnrolledSelect.selectedIndex = i;
        }
    }
    pamaOptionChanged(true);
    pamaEnrollmentDate.value = observation.dateEnrolledInPAMA;
    var cgInPamaOptions = caregiverenrolledSelect.options;
    for (var i = 0; i < cgInPamaOptions.length; i++) {
        const cgInPamaOption = cgInPamaOptions[i];
        if (cgInPamaOption.value == observation.caregiverInSameFacility) {
            caregiverenrolledSelect.selectedIndex = i;
        }
    }
    /*var cgTypeOptions = caregivertypeSelect.options;
    for (var i = 0; i < cgTypeOptions.length; i++) {
      const cgTypeOption = cgTypeOptions[i];
      if (cgTypeOption.value == observation.caregiverType) {
        caregivertypeSelect.selectedIndex = i;
      }
    }*/

    let cgType = observation.caregiverType;
    if (cgType == "Mother") {
        motherchkbox.checked = true;
        guardianchkbox.checked = false;
        caregiverChanged();
        caregiver1cccnoInput.value = observation.caregiver1CCC;
        if (observation.caregiver1VL == "LDL") {
            isLDLmother.checked = true;
            motherVlCopiesInput.value = '';
            motherVlCopiesInput.readOnly = true;
        } else motherVlCopiesInput.value = observation.caregiver1VL;
        motherlastvlDateInput.value = observation.caregiver1VLDate;
    } else if (cgType == "Father") {
        fatherchkbox.checked = true;
        guardianchkbox.checked = false;
        caregiverChanged();
        caregiver2cccnoInput.value = observation.caregiver2CCC;
        if (observation.caregiver2VL == "LDL") {
            isLDLfather.checked = true;
            fatherVlCopiesInput.value = '';
            fatherVlCopiesInput.readOnly = true;
        } else fatherVlCopiesInput.value = observation.caregiver2VL;
    } else if (cgType == "Guardian") {
        guardianchkbox.checked = true;
        fatherchkbox.checked = false;
        motherchkbox.checked = false;
        caregiverChanged();
        caregiver3cccnoInput.value = observation.caregiver1CCC;
        if (observation.caregiver1VL == "LDL") {
            isLDLguardian.checked = true;
            guardianVlCopiesInput.value = '';
            guardianVlCopiesInput.readOnly = true;
        } else guardianlastvlDate.value = observation.caregiver1VL;
        guardianlastvlDate.value = observation.caregiver1VLDate;
    } else if (cgType == "Mother + Father") {
        motherchkbox.checked = true;
        fatherchkbox.checked = true;
        guardianchkbox.checked = false;
        caregiverChanged();
        caregiver1cccnoInput.value = observation.caregiver1CCC;
        caregiver2cccnoInput.value = observation.caregiver2CCC;
        if (observation.caregiver1VL == "LDL") {
            isLDLmother.checked = true;
            motherVlCopiesInput.value = '';
            motherVlCopiesInput.readOnly = true;
        } else motherVlCopiesInput.value = observation.caregiver1VL;
        if (observation.caregiver2VL == "LDL") {
            isLDLfather.checked = true;
            fatherVlCopiesInput.value = '';
            fatherVlCopiesInput.readOnly = true;
        } else fatherVlCopiesInput.value = observation.caregiver2VL;
        motherlastvlDateInput.value = observation.caregiver1VLDate;
        fatherlastvlDateInput.value = observation.caregiver2VLDate;
    }
    // caregiver1cccnoInput.value = observation.caregiver1CCC;
    // caregiver2cccnoInput.value = observation.caregiver2CCC;

    // caregivervlddateInput.value = observation.caregiver1VLDate;
    /* var cgVLOptions = caregivervlstatustSelect.options;
     for (var i = 0; i < cgVLOptions.length; i++) {
       const cgVLOption = cgVLOptions[i];
       if (cgVLOption.value == observation.caregiverType) {
         caregivervlstatustSelect.selectedIndex = i;
       }
     }*/
    var pamaStatusOptions = pamastatusat3Select.options;
    for (var i = 0; i < pamaStatusOptions.length; i++) {
        const pamaStatusOption = pamaStatusOptions[i];
        if (pamaStatusOption.value == observation.PAMAStatus3) {
            pamastatusat3Select.selectedIndex = i;
        }
        if (pamaStatusOption.value == observation.PAMAStatus6) {
            pamastatusat6Select.selectedIndex = i;
        }
        if (pamaStatusOption.value == observation.PAMAStatus12) {
            pamastatusat12Select.selectedIndex = i;
        }
        if (pamaStatusOption.value == observation.PAMAStatus24) {
            pamastatusat24Select.selectedIndex = i;
        }
    }
    var pamaStatusOptions2 = currentPamaStatusSelect.options;
    for (var i = 0; i < pamaStatusOptions2.length; i++) {
        const pamaStatusOption = pamaStatusOptions2[i];
        if (pamaStatusOption.value == observation.PAMAStatusCurrent) {
            currentPamaStatusSelect.selectedIndex = i;
        }
        if (pamaStatusOption.value == observation.PAMAStatusTransition) {
            pamaStatusAtTransitionSelect.selectedIndex = i;
        }
    }

    pamaDiscontinuedDateInput.value = observation.dateDiscontinuedFromPAMA;
    commentArea.value = observation.comment;

    /********************************
     * 'currentRegimen', 'regimenLine', 'regimenStartDate',  'kaletraFormulation', 'vlDate', 'vlOutcome',
     'latestZScore', 'opportunisticInfection', 'disclosureStatus', 'iptStatus', 'schooling', 'statusAtTransition', 'enrolledInOVC',
     'dateEnrolledInOVC', 'CPMISNumber', 'dateDiscontinuedFromOVC', 'statusAtOVCDiscontinuation', 'enrolledInOTZ', 'dateEnrolledInOTZ',
     'OTZArtRegimen', 'OTZVL', 'OTZVLDate', 'missedLastAppointment', 'ArtAdherenceAssessment', 'completedOTZModules', 'statusAtOTZTransition',
     'dateDiscontinuedFromOTZ', 'enrolledInPAMA', 'dateEnrolledInPAMA', 'caregiverInSameFacility', 'caregiverType', 'caregiver1CCC',
     'caregiver2CCC', 'caregiverVL', 'caregiverVLDate', 'caregiverVLStatus', 'PAMAStatus3',
     'PAMAStatus6', 'PAMAStatus12', 'PAMAStatus24', 'PAMAStatusCurrent', 'PAMAStatusTransition', 'dateDiscontinuedFromPAMA', 'comment'
     *
     *
     */
}

/**
 * Verify data before submitting
 *
 * @return {array[ boolean, string ]}
 */
function verify() {
    var error = false;
    var errorMessage = '';
    var formData = new FormData();

    //Changing information-------->
    let currentRegimen = currentregimenSelect.options[currentregimenSelect.selectedIndex].value;
    let regimenLine = regimenlineSelect.options[regimenlineSelect.selectedIndex].value;
    let regimenStartDate = dscrInput.value;
    let kaletraFormulation = currentKaletraformulationSelect.options[currentKaletraformulationSelect.selectedIndex].value;
    let vlDate = vldateInput.value;
    let vlCopies = isLDL1.checked ? "LDL" : vlcopiesInput.value;
    let vlOutcome = "Not Done";
    if (isLDL1.checked || vlcopiesInput.value < 1000) vlOutcome = "Supressed";
    else if (vlCopies.value >= 1000) vlOutcome = "Not Supressed";
    // let vlOutcome = currentvlstatustSelect.options[currentvlstatustSelect.selectedIndex].value;
    let vlScoreType = "";
    if (isBMICheck.checked) vlScoreType = "BMI";
    else if (isZScoreCheck.checked) vlScoreType = "ZScore";
    else if (isMUACCheck.checked) vlScoreType = "MUAC";
    let latestZScore = zscoreInput.value;
    let opportunisticInfection = currentoiSelect.options[currentoiSelect.selectedIndex].value;
    let disclosureStatus = disclosureStatusSelect.options[disclosureStatusSelect.selectedIndex].value;
    let iptStatus = iptstatusSelect.options[iptstatusSelect.selectedIndex].value;
    let schooling = schoolingstatusSelect.options[schoolingstatusSelect.selectedIndex].value;
    let statusAtTransition = statusAtTransitionSelect.options[statusAtTransitionSelect.selectedIndex].value;
    formData.append("currentRegimen", currentRegimen);
    formData.append("regimenLine", regimenLine);
    formData.append("regimenStartDate", regimenStartDate);
    formData.append("kaletraFormulation", kaletraFormulation);
    formData.append("vlDate", vlDate);
    formData.append("vlCopies", vlCopies);
    formData.append("vlOutcome", vlOutcome);
    formData.append("vlScoreType", vlScoreType);
    formData.append("latestZScore", latestZScore);
    formData.append("opportunisticInfection", opportunisticInfection);
    formData.append("disclosureStatus", disclosureStatus);
    formData.append("iptStatus", iptStatus);
    formData.append("schooling", schooling);
    formData.append("statusAtTransition", statusAtTransition);

    //OVC---->
    let enrolledInOVC = ovcenrolledSelect.options[ovcenrolledSelect.selectedIndex].value;
    let dateEnrolledInOVC = ovcEnrollmentDateInput.value;
    let ovcWithCpmisNo = ovcCpmisSelect.options[ovcCpmisSelect.selectedIndex].value;
    let CPMISNumber = cpmisNumberInput.value;
    let ovcVLCopies = '';
    let baselineOvcVlDate = ovcVLDateInput.value;
    if (isLDL2.checked) ovcVLCopies = "LDL";
    else ovcVLCopies = ovcVLcopiesInput.value;
    let dateDiscontinuedFromOVC = ovcDiscontinuedDateInput.value;
    let statusAtOVCDiscontinuation = ovcDiscontinuationStatusSelect.options[ovcDiscontinuationStatusSelect.selectedIndex].value;
    if (enrolledInOVC === 'Y') {//Tests for OVC enrollred
        if (dateEnrolledInOVC == null || dateEnrolledInOVC === "") {
            error = true;
            errorMessage += "Enter date enrolled in OVC.\n"
        }
        if (ovcWithCpmisNo === 'Y' && CPMISNumber === '') {
            error = true;
            errorMessage += "Enter date enrolled in OVC.\n"
        }
        if (ovcVLCopies !== '' && baselineOvcVlDate === '') {
            error = true;
            errorMessage += "Enter date of baseline OVC VL.\n"
        }
    }
    formData.append("enrolledInOVC", enrolledInOVC);
    formData.append("dateEnrolledInOVC", dateEnrolledInOVC);
    formData.append("CPMISNumber", CPMISNumber);
    formData.append("ovcVLCopies", ovcVLCopies);
    formData.append("baselineOvcVlDate", baselineOvcVlDate);
    formData.append("dateDiscontinuedFromOVC", dateDiscontinuedFromOVC);
    formData.append("statusAtOVCDiscontinuation", statusAtOVCDiscontinuation);


    //OTZ---->
    let enrolledInOTZ = otzenrolledSelect.options[otzenrolledSelect.selectedIndex].value;
    let dateEnrolledInOTZ = otzEnrollmentDateInput.value;
    let OTZArtRegimen = otzregimenSelect.options[otzregimenSelect.selectedIndex].value;
    let OTZVL = '';
    if (isLDL4.checked) OTZVL = "LDL";
    else OTZVL = otzVlInput.value;
    let OTZVLDate = otzVlDateInput.value;
    /*let missedLastAppointment =
      missedLastAppointmentSelect.options[
        missedLastAppointmentSelect.selectedIndex
      ].value;*/
    let lastAttendDate = otzLastAttendDateInput.value;
    let nextAppointmentDate = otzNextAppointmentDateInput.value;
    let ArtAdherenceAssessment = artAssessmentSelect.options[artAssessmentSelect.selectedIndex].value;
    let completedOTZModules = otzModulesSelect.options[otzModulesSelect.selectedIndex].value;
    let statusAtOTZTransition = otzTransitionStatusSelect.options[otzTransitionStatusSelect.selectedIndex].value;
    let dateDiscontinuedFromOTZ = otzDiscontinuedDateInput.value;
    if (enrolledInOTZ === 'Y') {//Tests for enrolled in OTZ
        if (dateEnrolledInOTZ == null || dateEnrolledInOTZ === "") {
            error = true;
            errorMessage += "Enter date enrolled in OTZ.\n"
        }
        if (OTZArtRegimen === '') {
            error = true;
            errorMessage += "OTZ ART regimen is required.\n"
        }
    }
    formData.append("enrolledInOTZ", enrolledInOTZ);
    formData.append("dateEnrolledInOTZ", dateEnrolledInOTZ);
    formData.append("OTZArtRegimen", OTZArtRegimen);
    formData.append("OTZVL", OTZVL);
    formData.append("OTZVLDate", OTZVLDate);
    // formData.append("missedLastAppointment", missedLastAppointment);
    formData.append("lastAttendDate", lastAttendDate);
    formData.append("nextAppointmentDate", nextAppointmentDate);
    formData.append("ArtAdherenceAssessment", ArtAdherenceAssessment);
    formData.append("completedOTZModules", completedOTZModules);
    formData.append("statusAtOTZTransition", statusAtOTZTransition);
    formData.append("dateDiscontinuedFromOTZ", dateDiscontinuedFromOTZ);

    //pama--->const caregiverenrolledSelect = document.getElementById("caregiverenrolledSelect");
    let enrolledInPAMA = pamaEnrolledSelect.options[pamaEnrolledSelect.selectedIndex].value;
    let dateEnrolledInPAMA = pamaEnrollmentDateInput.value;
    let caregiverInSameFacility = caregiverenrolledSelect.options[caregiverenrolledSelect.selectedIndex].value;
    let caregiverType = ''
    if (guardianchkbox.checked) caregiverType = "Guardian";
    else if (motherchkbox.checked && fatherchkbox.checked) caregiverType = "Mother + Father";
    else if (motherchkbox.checked) caregiverType = "Mother";
    else if (fatherchkbox.checked) caregiverType = "Father";
    let caregiver1CCC = '';
    let caregiver2CCC = '';
    let caregiver1VL = '';
    let caregiver2VL = '';

    let caregiver1VLDate = '';
    let caregiver1VLStatus = '';
    let caregiver2VLDate = '';

    if (guardianchkbox.checked) {
        caregiver1CCC = caregiver3cccnoInput.value;
        if (isLDLguardian.checked) caregiver1VL = "LDL";
        else caregiver1VL = guardianVlCopiesInput.value;
        caregiver1VLDate = guardianlastvlDate.value;
        if (caregiver1CCC !== '' && caregiver1CCC.length !== 10){
            error = true;
            errorMessage += "Enter a valid Guardian CCC number.\n"
        }
    } else {
        if (motherchkbox.checked) {
            if (isLDLmother.checked) caregiver1VL = "LDL";
            else caregiver1VL = motherVlCopiesInput.value;
            caregiver1VLDate = motherlastvlDateInput.value;
            caregiver1CCC = caregiver1cccnoInput.value;
            if (caregiver1CCC !== '' && caregiver1CCC.length !== 10){
                error = true;
                errorMessage += "Enter a valid mother CCC number.\n"
            }
        }
        if (fatherchkbox.checked) {
            if (isLDLfather.checked) caregiver2VL = "LDL";
            else caregiver2VL = fatherVlCopiesInput.value;
            caregiver2CCC = caregiver2cccnoInput.value;
            caregiver2VLDate = fatherlastvlDateInput.value;
            if (caregiver1CCC !== '' && caregiver1CCC.length !== 10){
                error = true;
                errorMessage += "Enter a valid father CCC number.\n"
            }
        }
    }

    let PAMAStatus3 = pamastatusat3Select.options[pamastatusat3Select.selectedIndex].value;
    let PAMAStatus6 = pamastatusat6Select.options[pamastatusat6Select.selectedIndex].value;
    let PAMAStatus12 = pamastatusat12Select.options[pamastatusat12Select.selectedIndex].value;
    let PAMAStatus24 = pamastatusat24Select.options[pamastatusat24Select.selectedIndex].value;
    let PAMAStatusCurrent = currentPamaStatusSelect.options[currentPamaStatusSelect.selectedIndex].value;
    let PAMAStatusTransition = pamaStatusAtTransitionSelect.options[pamaStatusAtTransitionSelect.selectedIndex].value;
    let dateDiscontinuedFromPAMA = pamaDiscontinuedDateInput.value;
    let comment = commentArea.value;
    if (enrolledInPAMA === 'Y') {

    }
    formData.append("enrolledInPAMA", enrolledInPAMA);
    formData.append("dateEnrolledInPAMA", dateEnrolledInPAMA);
    formData.append("caregiverInSameFacility", caregiverInSameFacility);
    formData.append("caregiverType", caregiverType);
    formData.append("caregiver1CCC", caregiver1CCC);
    formData.append("caregiver2CCC", caregiver2CCC);
    formData.append("caregiver1VL", caregiver1VL);
    formData.append("caregiver1VLDate", caregiver1VLDate);
    formData.append("caregiver2VL", caregiver2VL);
    formData.append("caregiver2VLDate", caregiver2VLDate);
    formData.append("caregiver1VLStatus", caregiver1VLStatus);
    formData.append("PAMAStatus3", PAMAStatus3);
    formData.append("PAMAStatus6", PAMAStatus6);
    formData.append("PAMAStatus12", PAMAStatus12);
    formData.append("PAMAStatus24", PAMAStatus24);
    formData.append("PAMAStatusCurrent", PAMAStatusCurrent);
    formData.append("PAMAStatusTransition", PAMAStatusTransition);
    formData.append("dateDiscontinuedFromPAMA", dateDiscontinuedFromPAMA);
    formData.append("comment", comment);

    //Other data------>
    let patientCCC = cccNoInput.value;
    let userId = 1;
    let mflCode = facilitySelector.options[facilitySelector.selectedIndex].value;
    formData.append("patientCCC", patientCCC);
    formData.append("userId", userId);
    formData.append("mflCode", mflCode);

    if (error) {
        handleError(-1, errorMessage);
    }else {
        submitData(formData);
    }
}

function submitData(formData = null) {
    // submitPatientData();
    if (formData == null) {
        var formData = new FormData();

        //Changing information-------->
        let currentRegimen =
            currentregimenSelect.options[currentregimenSelect.selectedIndex].value;
        let regimenLine =
            regimenlineSelect.options[regimenlineSelect.selectedIndex].value;
        let regimenStartDate = dscrInput.value;
        let kaletraFormulation =
            currentKaletraformulationSelect.options[
                currentKaletraformulationSelect.selectedIndex
                ].value;
        let vlDate = vldateInput.value;
        let vlCopies = isLDL1.checked ? "LDL" : vlcopiesInput.value;
        let vlOutcome = "Not Done";
        if (isLDL1.checked || vlcopiesInput.value < 1000) vlOutcome = "Supressed";
        else if (vlCopies.value >= 1000) vlOutcome = "Not Supressed";
        // let vlOutcome = currentvlstatustSelect.options[currentvlstatustSelect.selectedIndex].value;
        let vlScoreType = "";
        if (isBMICheck.checked) vlScoreType = "BMI";
        else if (isZScoreCheck.checked) vlScoreType = "ZScore";
        else if (isMUACCheck.checked) vlScoreType = "MUAC";
        let latestZScore = zscoreInput.value;
        let opportunisticInfection =
            currentoiSelect.options[currentoiSelect.selectedIndex].value;
        let disclosureStatus =
            disclosureStatusSelect.options[disclosureStatusSelect.selectedIndex].value;
        let iptStatus = iptstatusSelect.options[iptstatusSelect.selectedIndex].value;
        let schooling =
            schoolingstatusSelect.options[schoolingstatusSelect.selectedIndex].value;
        let statusAtTransition =
            statusAtTransitionSelect.options[statusAtTransitionSelect.selectedIndex]
                .value;
        formData.append("currentRegimen", currentRegimen);
        formData.append("regimenLine", regimenLine);
        formData.append("regimenStartDate", regimenStartDate);
        formData.append("kaletraFormulation", kaletraFormulation);
        formData.append("vlDate", vlDate);
        formData.append("vlCopies", vlCopies);
        formData.append("vlOutcome", vlOutcome);
        formData.append("vlScoreType", vlScoreType);
        formData.append("latestZScore", latestZScore);
        formData.append("opportunisticInfection", opportunisticInfection);
        formData.append("disclosureStatus", disclosureStatus);
        formData.append("iptStatus", iptStatus);
        formData.append("schooling", schooling);
        formData.append("statusAtTransition", statusAtTransition);

        //OVC---->
        let enrolledInOVC =
            ovcenrolledSelect.options[ovcenrolledSelect.selectedIndex].value;
        let dateEnrolledInOVC = ovcEnrollmentDateInput.value;
        let CPMISNumber = cpmisNumberInput.value;
        let ovcVLCopies = '';
        let baselineOvcVlDate = ovcVLDateInput.value;
        if (isLDL2.checked) ovcVLCopies = "LDL";
        else ovcVLCopies = ovcVLcopiesInput.value;
        let dateDiscontinuedFromOVC = ovcDiscontinuedDateInput.value;
        let statusAtOVCDiscontinuation =
            ovcDiscontinuationStatusSelect.options[
                ovcDiscontinuationStatusSelect.selectedIndex
                ].value;
        formData.append("enrolledInOVC", enrolledInOVC);
        formData.append("dateEnrolledInOVC", dateEnrolledInOVC);
        formData.append("CPMISNumber", CPMISNumber);
        formData.append("ovcVLCopies", ovcVLCopies);
        formData.append("baselineOvcVlDate", baselineOvcVlDate);
        formData.append("dateDiscontinuedFromOVC", dateDiscontinuedFromOVC);
        formData.append("statusAtOVCDiscontinuation", statusAtOVCDiscontinuation);

        //OTZ---->
        let enrolledInOTZ =
            otzenrolledSelect.options[otzenrolledSelect.selectedIndex].value;
        let dateEnrolledInOTZ = otzEnrollmentDateInput.value;
        let OTZArtRegimen =
            otzregimenSelect.options[otzregimenSelect.selectedIndex].value;
        let OTZVL = '';
        if (isLDL4.checked) OTZVL = "LDL";
        else OTZVL = otzVlInput.value;
        let OTZVLDate = otzVlDateInput.value;
        /*let missedLastAppointment =
          missedLastAppointmentSelect.options[
            missedLastAppointmentSelect.selectedIndex
          ].value;*/
        let lastAttendDate = otzLastAttendDateInput.value;
        let nextAppointmentDate = otzNextAppointmentDateInput.value;
        let ArtAdherenceAssessment =
            artAssessmentSelect.options[artAssessmentSelect.selectedIndex].value;
        let completedOTZModules = otzModulesSelect.options[otzModulesSelect.selectedIndex].value;
        // let completedOTZModules = [];
        // var checkBoxes = otzmodulesdiv.querySelectorAll('input[type="checkbox"]');
        // checkBoxes.forEach((checkBox) => {
        //   if (checkBox.checked == true) {
        //     completedOTZModules.push(checkBox.getAttribute("id"));
        //   }
        // });
        // console.log(completedOTZModules);
        let statusAtOTZTransition =
            otzTransitionStatusSelect.options[otzTransitionStatusSelect.selectedIndex]
                .value;
        let dateDiscontinuedFromOTZ = otzDiscontinuedDateInput.value;
        formData.append("enrolledInOTZ", enrolledInOTZ);
        formData.append("dateEnrolledInOTZ", dateEnrolledInOTZ);
        formData.append("OTZArtRegimen", OTZArtRegimen);
        formData.append("OTZVL", OTZVL);
        formData.append("OTZVLDate", OTZVLDate);
        // formData.append("missedLastAppointment", missedLastAppointment);
        formData.append("lastAttendDate", lastAttendDate);
        formData.append("nextAppointmentDate", nextAppointmentDate);
        formData.append("ArtAdherenceAssessment", ArtAdherenceAssessment);
        formData.append("completedOTZModules", completedOTZModules);
        formData.append("statusAtOTZTransition", statusAtOTZTransition);
        formData.append("dateDiscontinuedFromOTZ", dateDiscontinuedFromOTZ);

        //pama--->const caregiverenrolledSelect = document.getElementById("caregiverenrolledSelect");
        let enrolledInPAMA =
            pamaEnrolledSelect.options[pamaEnrolledSelect.selectedIndex].value;
        let dateEnrolledInPAMA = pamaEnrollmentDateInput.value;
        let caregiverInSameFacility =
            caregiverenrolledSelect.options[caregiverenrolledSelect.selectedIndex]
                .value;
        let caregiverType = ''
        if (guardianchkbox.checked) caregiverType = "Guardian";
        else if (motherchkbox.checked && fatherchkbox.checked) caregiverType = "Mother + Father";
        else if (motherchkbox.checked) caregiverType = "Mother";
        else if (fatherchkbox.checked) caregiverType = "Father";
        let caregiver1CCC = '';
        let caregiver2CCC = caregiver2cccnoInput.value;
        let caregiver1VL = '';
        let caregiver2VL = '';

        let caregiver1VLDate = '';
        let caregiver1VLStatus = '';
        let caregiver2VLDate = '';

        if (guardianchkbox.checked) {
            caregiver1CCC = caregiver3cccnoInput.value;
            if (isLDLguardian.checked) caregiver1VL = "LDL";
            else caregiver1VL = guardianVlCopiesInput.value;
            caregiver1VLDate = guardianlastvlDate.value;
        } else {
            if (motherchkbox.checked) {
                if (isLDLmother.checked) caregiver1VL = "LDL";
                else caregiver1VL = motherVlCopiesInput.value;
                caregiver1VLDate = motherlastvlDateInput.value;
                caregiver1CCC = caregiver1cccnoInput.value;
            }
            if (fatherchkbox.checked) {
                if (isLDLfather.checked) caregiver2VL = "LDL";
                else caregiver2VL = fatherVlCopiesInput.value;
                caregiver2VLDate = fatherlastvlDateInput.value;
            }
        }
        let PAMAStatus3 =
            pamastatusat3Select.options[pamastatusat3Select.selectedIndex].value;
        let PAMAStatus6 =
            pamastatusat6Select.options[pamastatusat6Select.selectedIndex].value;
        let PAMAStatus12 =
            pamastatusat12Select.options[pamastatusat12Select.selectedIndex].value;
        let PAMAStatus24 =
            pamastatusat24Select.options[pamastatusat24Select.selectedIndex].value;
        let PAMAStatusCurrent =
            currentPamaStatusSelect.options[currentPamaStatusSelect.selectedIndex]
                .value;
        let PAMAStatusTransition =
            pamaStatusAtTransitionSelect.options[
                pamaStatusAtTransitionSelect.selectedIndex
                ].value;
        let dateDiscontinuedFromPAMA = pamaDiscontinuedDateInput.value;
        let comment = commentArea.value;
        formData.append("enrolledInPAMA", enrolledInPAMA);
        formData.append("dateEnrolledInPAMA", dateEnrolledInPAMA);
        formData.append("caregiverInSameFacility", caregiverInSameFacility);
        formData.append("caregiverType", caregiverType);
        formData.append("caregiver1CCC", caregiver1CCC);
        formData.append("caregiver2CCC", caregiver2CCC);
        formData.append("caregiver1VL", caregiver1VL);
        formData.append("caregiver1VLDate", caregiver1VLDate);
        formData.append("caregiver2VL", caregiver2VL);
        formData.append("caregiver2VLDate", caregiver2VLDate);
        formData.append("caregiver1VLStatus", caregiver1VLStatus);
        formData.append("PAMAStatus3", PAMAStatus3);
        formData.append("PAMAStatus6", PAMAStatus6);
        formData.append("PAMAStatus12", PAMAStatus12);
        formData.append("PAMAStatus24", PAMAStatus24);
        formData.append("PAMAStatusCurrent", PAMAStatusCurrent);
        formData.append("PAMAStatusTransition", PAMAStatusTransition);
        formData.append("dateDiscontinuedFromPAMA", dateDiscontinuedFromPAMA);
        formData.append("comment", comment);

        //Other data------>
        let patientCCC = cccNoInput.value;
        let userId = 1;
        let mflCode = facilitySelector.options[facilitySelector.selectedIndex].value;
        formData.append("patientCCC", patientCCC);
        formData.append("userId", userId);
        formData.append("mflCode", mflCode);
    }
    $.ajax({
        type: "POST",
        url: "datascript?request=submit_form",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            clearForm();
        },
        error: error => handleError(error.status, error.message)
    });

    /********************************
     * 'currentRegimen', 'regimenLine', 'regimenStartDate',  'kaletraFormulation', 'vlDate', 'vlOutcome',
     'latestZScore', 'opportunisticInfection', 'disclosureStatus', 'iptStatus', 'schooling', 'statusAtTransition', 'enrolledInOVC',

     'dateEnrolledInOVC', 'CPMISNumber', 'dateDiscontinuedFromOVC', 'statusAtOVCDiscontinuation', 'enrolledInOTZ', 'dateEnrolledInOTZ',
     'OTZArtRegimen', 'OTZVL', 'OTZVLDate', 'missedLastAppointment', 'ArtAdherenceAssessment', 'completedOTZModules', 'statusAtOTZTransition',

     'dateDiscontinuedFromOTZ', 'enrolledInPAMA', 'dateEnrolledInPAMA', 'caregiverInSameFacility', 'caregiverType', 'caregiver1CCC',
     'caregiver2CCC', 'caregiverVL', 'caregiverVLDate', 'caregiverVLStatus', 'PAMAStatus3',
     'PAMAStatus6', 'PAMAStatus12', 'PAMAStatus24', 'PAMAStatusCurrent', 'PAMAStatusTransition', 'dateDiscontinuedFromPAMA', 'comment'
     *
     *
     */
}

function clearForm() {
    mappingform.reset();
    mflcodeInput.innerHTML = "";
    currentageInput.innerHTML = "";
    ageatenrollmentInput.innerHTML = "";
}

function showMflCode(str) {
    // console.log(str);
    // console.log(facilities);
    for (let i = 0; i < facilities.length; i++) {
        var facility = facilities[i];
        if (facility.mfl_code == str) {
            mflcodeInput.innerHTML = facility.mfl_code;
            countyInput.innerHTML = facility.county;
        }
    }
}

function showNumberInput(value) {
    if (value == "Y") {
        cpmisNumberInput.disabled = false;
    } else if (value == "N") {
        cpmisNumberInput.disabled = true;
    }
}

function submitPatientData() {
    let cccNo = cccNoInput.value;
    let facility = facilitySelector.options[facilitySelector.selectedIndex].value;
    let county = countyInput.innerHTML;
    let sex = genderSelect.options[genderSelect.selectedIndex].value;
    let dob = dobInput.value;
    let dohd = dohdInput.value;
    let dec = decInput.value;
    let startRegimen =
        startregimenSelect.options[startregimenSelect.selectedIndex].value;
    let dsa = dsaInput.value;
    let startkaletra =
        startformulationSelect.options[startformulationSelect.selectedIndex].value;

    // if (newpatient == false) {
    $.ajax({
        type: "POST",
        url: "datascript?request=save_patient_data",
        data: {
            cccNo: cccNo,
            facility: facility,
            county: county,
            sex: sex,
            dob: dob,
            dohd: dohd,
            dec: dec,
            startRegimen: startRegimen,
            dsa: dsa,
            startkaletra: startkaletra,
            newpatient: newpatient,
        },
        success: function (response) {
            var mResponse = JSON.parse(response);
            let code = mResponse.code;
            if (code == 200) {
                console.log(mResponse.data);
                verify();
            } else {
                //todo: display error
            }
        },
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            alert(errorThrown.message);
        },
    });
}

var text_max = 100;
$("#count_message").html("0 / " + text_max);

$("#commentArea").keyup(function () {
    var text_length = $("#commentArea").val().length;
    var text_remaining = text_max - text_length;

    $("#count_message").html(text_length + " / " + text_max);
});

/**
 *
 * @param {boolean} disableOptions
 */
function ovcOptionChanged(disableOptions = false) {
    var selectedValue =
        ovcenrolledSelect.options[ovcenrolledSelect.selectedIndex].value;
    var ovcFields = document.querySelectorAll(".ovcClass");
    if (selectedValue == "Y") {
        if (disableOptions) ovcenrolledSelect.disabled = true;
        ovcFields.forEach((ovcField) => {
            ovcField.removeAttribute("disabled");
        });
    } else {
        ovcFields.forEach((ovcField) => {
            ovcField.setAttribute("disabled", "");
        });
    }
}

/**
 *
 * @param {boolean} disableOptions
 */
function otzOptionChanged(disableOptions = false) {
    var selectedValue =
        otzenrolledSelect.options[otzenrolledSelect.selectedIndex].value;
    var otzFields = document.querySelectorAll(".otzClass");
    if (selectedValue == "Y") {
        otzFields.forEach((otzField) => {
            otzField.removeAttribute("disabled");
        });
        if (disableOptions) {
            otzenrolledSelect.readOnly = true;
            otzEnrollmentDateInput.setAttribute("disabled", "");
            otzregimenSelect.setAttribute("disabled", "");
        }
    } else {
        otzFields.forEach((otzField) => {
            otzField.setAttribute("disabled", "");
        });
    }
}

/**
 *
 * @param {boolean} disableOptions
 */
function pamaOptionChanged(disableOptions = false) {
    var selectedValue =
        pamaEnrolledSelect.options[pamaEnrolledSelect.selectedIndex].value;
    var pamaFields = document.querySelectorAll(".pamaClass");
    if (selectedValue == "Y") {
        if (disableOptions) pamaEnrolledSelect.readOnly = true;
        pamaFields.forEach((pamaField) => {
            pamaField.removeAttribute("disabled");
        });
    } else {
        pamaFields.forEach((pamaField) => {
            pamaField.setAttribute("disabled", "");
        });
    }
}
