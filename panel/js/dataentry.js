const otzmodulesdiv = document.getElementById("otzmodulesdiv");
const userName = document.getElementById("userName");
const lastLoginDate = document.getElementById("lastLoginDate");
const dataEntryDate = document.getElementById("dataEntryDate");
const cccNoInput = document.getElementById("cccNo");
const btnSearch = document.getElementById("btnSearch");
const mflcodeInput = document.getElementById("mflcode");
// const facilityInput = document.getElementById("facility");
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
const currentvlstatustSelect = document.getElementById("currentvlstatustSelect");
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
const cpmisNumberInput = document.getElementById("cpmisNumber");
const isLDL2 = document.getElementById("isLDL2");
const ovcVLcopiesInput = document.getElementById("ovcVLcopies");
const ovcDiscontinuedDateInput = document.getElementById("ovcDiscontinuedDate");
const ovcDiscontinuationStatusSelect = document.getElementById(
  "ovcDiscontinuationStatusSelect"
);
const otzenrolledSelect = document.getElementById("otzenrolledSelect");
const otzEnrollmentDateInput = document.getElementById("otzenrollmentdate");
const otzregimenSelect = document.getElementById("otzregimenSelect");
const otzVlInput = document.getElementById("otzvl");
const otzVlDateInput = document.getElementById("otzvldate");
const missedLastAppointmentSelect = document.getElementById(
  "missedLastAppointmentSelect"
);
const artAssessmentSelect = document.getElementById("artassessmentSelect");
const otzTransitionStatusSelect = document.getElementById(
  "otzTransitionStatusSelect"
);
const otzDiscontinuedDateInput = document.getElementById("otzDiscontinuedDate");
const pamaEnrolledSelect = document.getElementById("pamaEnrolledSelect");
const pamaEnrollmentDateInput = document.getElementById("pamaEnrollmentDate");
const caregiverenrolledSelect = document.getElementById(
  "caregiverenrolledSelect"
);
const caregivertypeSelect = document.getElementById("caregivertypeSelect");
const caregiver1cccnoInput = document.getElementById("caregiver1cccno");
const caregiver2cccnoInput = document.getElementById("caregiver2cccno");
const caregivervlInput = document.getElementById("caregivervl");
const caregivervlddateInput = document.getElementById("caregivervlddate");
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
const facilitySelector = document.getElementById("facilitySelect");
const addNewPatient = document.getElementById("addNewPatient");

var dob, dateenrolled;
var facilities;

var newpatient = false;

addNewPatient.addEventListener("click", () => {
  newpatient = true;
  $("#addpatientmodal").modal("hide");
});

initialize();
$.ajax({
  dataType: "json",
  url: "data.json",
  success: function (data) {
    var opportunisticInfections = data.opportunisticInfections;
    opportunisticInfections.sort();
    opportunisticInfections.forEach(oi => {
      let option = document.createElement("option");
      option.setAttribute("value", oi);
      option.appendChild(document.createTextNode(oi));
      currentoiSelect.appendChild(option);
    });
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

  userName.innerText = loggedinuser.firstName + " " + loggedinuser.surname;
  lastLoginDate.innerHTML = loggedinuser.last_login;
  var d = new Date().toLocaleString();
  dataEntryDate.innerHTML = d;

  isLDL1.addEventListener('click', () => {
    if (isLDL1.checked) {
      vlcopiesInput.value = '';
      vlcopiesInput.disabled = true;
    } else {
      vlcopiesInput.disabled = false;
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

  isBMICheck.addEventListener('click', () => {
    if (isBMICheck.checked) {
      isZScoreCheck.checked = false;
      isMUACCheck.checked = false;
    }
  });

  isZScoreCheck.addEventListener('click', () => {
    if (isZScoreCheck.checked) {
      isBMICheck.checked = false;
      isMUACCheck.checked = false;
    }
  });

  isMUACCheck.addEventListener('click', () => {
    if (isMUACCheck.checked) {
      isBMICheck.checked = false;
      isZScoreCheck.checked = false;
    }
  });

  ovcenrolledSelect.addEventListener('click', ()=>ovcOptionChanged());
  otzenrolledSelect.addEventListener('click', ()=>otzOptionChanged());
  pamaEnrolledSelect.addEventListener('click', ()=>pamaOptionChanged())

  $.ajax({
    type: "GET",
    url: "datascript?request=get_otz_modules",
    success: function (response) {
      response = response.replace('/^s+|s+$/g, ""');
      var mResponse = JSON.parse(response);
      var code = mResponse.code;
      if (code == 200) {
        var modules = mResponse.data;
        // console.log(modules);
        loadtocheckbox(modules);
      } else {
        //todo: display error message
      }
    },
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
          option.setAttribute("value", regimen.id);
          option.appendChild(document.createTextNode(regimen.name));
          currentregimenSelect.appendChild(option);
          startregimenSelect.appendChild(option.cloneNode(true));
          otzregimenSelect.appendChild(option.cloneNode(true));
        }
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
        facilities = mResponse.data;
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
}

function loadtocheckbox(modules) {
  for (var i = 0; i < modules.length; i++) {
    let module = modules[i];
    // console.log(module.name);

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

function loadPreviousObservation() {
  let cccNo = cccNoInput.value;
  $.ajax({
    type: "GET",
    url: "datascript?request=load_prev_obs&cccNo=" + cccNo,
    success: function (response) {
      console.log(response);
      var mResponse = JSON.parse(response);
      let code = mResponse.code;
      if (code == 200) {
        //Ok data
        let patient = mResponse.data.patient;
        var observation = mResponse.data.observation;
        var facil = patient.facility;
        $("#facilitySelect").val(facil);
        // facilitySelector.disabled=true;
        // facilityInput.value = patient.facilityData.name;
        mflcodeInput.innerHTML = patient.facilityData.mfl_code;
        countyInput.innerHTML = patient.county;
        var genders = genderSelect.options;
        for (let i = 0; i < genders.length; i++) {
          const gender = genders[i];
          if (patient.sex == gender.value) {
            genderSelect.selectedIndex = i;
          }
        }
        dobInput.value = patient.dob;
        dob = new Date(patient.dob);
        dateenrolled = new Date(patient.date_enrolled);
        getAge(dob, dateenrolled);
        dohdInput.value = patient.date_of_hiv_diagnosis;
        decInput.value = patient.date_enrolled;
        dsaInput.value = patient.dateStartedART;
        $("#startregimenSelect").val(patient.startRegimen);
        $("#startformulationSelect").val(patient.startKaletraFormulation);
        loadObsData(observation);
      } else if (code == 201) {
        //Empty obs
        let patient = mResponse.data.patient;
        var facil = patient.facility;
        $("#facilitySelect").val(facil);
        // facilitySelector.disabled=true;
        // facilityInput.value = patient.facilityData.name;
        mflcodeInput.innerHTML = patient.facilityData.mfl_code;
        countyInput.innerHTML = patient.county;
        var genders = genderSelect.options;
        for (let i = 0; i < genders.length; i++) {
          const gender = genders[i];
          if (patient.sex == gender.value) {
            genderSelect.selectedIndex = i;
          }
        }
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
        $("#addpatientmodal").modal("show");
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      console.log(XMLHttpRequest);
      console.log(textStatus);
      console.log(errorThrown);
    },
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
  }else vlcopiesInput.value = observation.vlCopies;
  // vloutcomestatusInput.value = observation.vlOutcome;
  $("#currentvlstatustSelect").val(observation.vlOutcome);
  isZScoreCheck.checked = false;
  isMUACCheck.checked = false;
  isBMICheck.checked = false;
  if (observation.vlScoreType == 'ZScore') isZScoreCheck.checked = true;
  else if (observation.vlScoreType == 'MUAC') isMUACCheck.checked = true;
  else if (observation.vlScoreType == 'BMI') isBMICheck.checked = true;

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
  otzOptionChanged(true);
  for (var i = 0; i < otzEnrolledOptions.length; i++) {
    const otzEnrolledOption = otzEnrolledOptions[i];
    if (otzEnrolledOption.value == observation.enrolledInOTZ) {
      otzenrolledSelect.selectedIndex = i;
    }
  }
  otzEnrollmentDateInput.value = observation.dateEnrolledInOTZ;
  for (var i = 0; i < regimens.length; i++) {
    const regimen = regimens[i];
    if (regimen.value == observation.OTZArtRegimen) {
      otzregimenSelect.selectedIndex = i;
    }
  }
  otzVlInput.value = observation.OTZVL;
  otzVlDateInput.value = observation.OTZVLDate;
  var missedOptions = missedLastAppointmentSelect.options;
  for (var i = 0; i < missedOptions.length; i++) {
    const missedOption = missedOptions[i];
    if (missedOption.value == observation.missedLastAppointment) {
      missedLastAppointmentSelect.selectedIndex = i;
    }
  }
  var artAssessmentOptions = artAssessmentSelect.options;
  for (var i = 0; i < artAssessmentOptions.length; i++) {
    const artAssessmentOption = artAssessmentOptions[i];
    if (artAssessmentOption.value == observation.ArtAdherenceAssessment) {
      artAssessmentSelect.selectedIndex = i;
    }
  }
  var modulesCompleted = JSON.parse(observation.completedOTZModules);
  console.log(modulesCompleted);
  var checkBoxes = otzmodulesdiv.querySelectorAll('input[type="checkbox"]');
  checkBoxes.forEach((checkBox) => {
    if (modulesCompleted.indexOf(checkBox.getAttribute("id")) != -1) {
      checkBox.checked = true;
    }
  });
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
  var cgTypeOptions = caregivertypeSelect.options;
  for (var i = 0; i < cgTypeOptions.length; i++) {
    const cgTypeOption = cgTypeOptions[i];
    if (cgTypeOption.value == observation.caregiverType) {
      caregivertypeSelect.selectedIndex = i;
    }
  }
  caregiver1cccnoInput.value = observation.caregiver1CCC;
  caregiver2cccnoInput.value = observation.caregiver2CCC;
  caregivervlInput.value = observation.caregiverVL;
  caregivervlddateInput.value = observation.caregiverVLDate;
  var cgVLOptions = caregivervlstatustSelect.options;
  for (var i = 0; i < cgVLOptions.length; i++) {
    const cgVLOption = cgVLOptions[i];
    if (cgVLOption.value == observation.caregiverType) {
      caregivervlstatustSelect.selectedIndex = i;
    }
  }
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
function verify() { }

function submitData() {
  // submitPatientData();
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
  let vlOutcome = "Not Done"
  if (isLDL1.checked || vlcopiesInput.value < 1000) vlOutcome = "Supressed";
  else if (vlCopies.value >= 1000) vlOutcome = "Not Supressed";
  // let vlOutcome = currentvlstatustSelect.options[currentvlstatustSelect.selectedIndex].value;
  let vlScoreType = '';
  if (isBMICheck.checked) vlScoreType = 'BMI';
  else if (isZScoreCheck.checked) vlScoreType = 'ZScore';
  else if (isMUACCheck.checked) vlScoreType = 'MUAC';
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
  formData.append("dateDiscontinuedFromOVC", dateDiscontinuedFromOVC);
  formData.append("statusAtOVCDiscontinuation", statusAtOVCDiscontinuation);

  //OTZ---->
  let enrolledInOTZ =
    otzenrolledSelect.options[otzenrolledSelect.selectedIndex].value;
  let dateEnrolledInOTZ = otzEnrollmentDateInput.value;
  let OTZArtRegimen =
    otzregimenSelect.options[otzregimenSelect.selectedIndex].value;
  let OTZVL = otzVlInput.value;
  let OTZVLDate = otzVlDateInput.value;
  let missedLastAppointment =
    missedLastAppointmentSelect.options[
      missedLastAppointmentSelect.selectedIndex
    ].value;
  let ArtAdherenceAssessment =
    artAssessmentSelect.options[artAssessmentSelect.selectedIndex].value;
  let completedOTZModules = [];
  var checkBoxes = otzmodulesdiv.querySelectorAll('input[type="checkbox"]');
  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked == true) {
      completedOTZModules.push(checkBox.getAttribute("id"));
    }
  });
  console.log(completedOTZModules);
  let statusAtOTZTransition =
    otzTransitionStatusSelect.options[otzTransitionStatusSelect.selectedIndex]
      .value;
  let dateDiscontinuedFromOTZ = otzDiscontinuedDateInput.value;
  formData.append("enrolledInOTZ", enrolledInOTZ);
  formData.append("dateEnrolledInOTZ", dateEnrolledInOTZ);
  formData.append("OTZArtRegimen", OTZArtRegimen);
  formData.append("OTZVL", OTZVL);
  formData.append("OTZVLDate", OTZVLDate);
  formData.append("missedLastAppointment", missedLastAppointment);
  formData.append("ArtAdherenceAssessment", ArtAdherenceAssessment);
  formData.append("completedOTZModules", JSON.stringify(completedOTZModules));
  formData.append("statusAtOTZTransition", statusAtOTZTransition);
  formData.append("dateDiscontinuedFromOTZ", dateDiscontinuedFromOTZ);

  //pama--->const caregiverenrolledSelect = document.getElementById("caregiverenrolledSelect");
  let enrolledInPAMA =
    pamaEnrolledSelect.options[pamaEnrolledSelect.selectedIndex].value;
  let dateEnrolledInPAMA = pamaEnrollmentDateInput.value;
  let caregiverInSameFacility =
    caregiverenrolledSelect.options[caregiverenrolledSelect.selectedIndex]
      .value;
  let caregiverType =
    caregivertypeSelect.options[caregivertypeSelect.selectedIndex].value;
  let caregiver1CCC = caregiver1cccnoInput.value;
  let caregiver2CCC = caregiver2cccnoInput.value;
  let caregiverVL = caregivervlInput.value;
  let caregiverVLDate = caregivervlddateInput.value;
  let caregiverVLStatus = caregivervlstatustSelect.value;
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
  formData.append("caregiverVL", caregiverVL);
  formData.append("caregiverVLDate", caregiverVLDate);
  formData.append("caregiverVLStatus", caregiverVLStatus);
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
  formData.append("patientCCC", patientCCC);
  formData.append("userId", userId);

  $.ajax({
    type: "POST",
    url: "datascript?request=submit_form",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      clearForm();
    },
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
    if (facility.id == str) {
      mflcodeInput.innerHTML = facility.mfl_code;
      countyInput.innerHTML = facility.county;
    }
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

  if (newpatient == false) {
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
      },
      success: function (response) {
        var mResponse = JSON.parse(response);
        let code = mResponse.code;
        if (code == 200) {
          console.log(mResponse.data);
          submitData();
        } else {
          //todo: display error
        }
      },
      fail: (XMLHttpRequest, textStatus, errorThrown) => {
        alert(errorThrown.message);
      },
    });

  } else {

    $.ajax({
      type: "POST",
      url: "datascript?request=save_new_patient",
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
      },
      success: function (response) {
        var mResponse = JSON.parse(response);
        let code = mResponse.code;
        if (code == 200) {
          console.log(mResponse.data);
          submitData();
        } else {
          //todo: display error
        }
      },
      fail: (XMLHttpRequest, textStatus, errorThrown) => {
        alert(errorThrown.message);
      },
    });

  }
}

var text_max = 100;
$('#count_message').html('0 / ' + text_max );

$('#commentArea').keyup(function() {
  var text_length = $('#commentArea').val().length;
  var text_remaining = text_max - text_length;
  
  $('#count_message').html(text_length + ' / ' + text_max);
});
/**
 * 
 * @param {boolean} disableOptions 
 */
function ovcOptionChanged(disableOptions = false) {
  var selectedValue = ovcenrolledSelect.options[ovcenrolledSelect.selectedIndex].value;
  var ovcFields = document.querySelectorAll(".ovcClass");
  if (selectedValue == "Yes") {
    if (disableOptions) ovcenrolledSelect.disabled = true;
    ovcFields.forEach(ovcField => {
      ovcField.removeAttribute("disabled");
    });
  } else {
    ovcFields.forEach(ovcField => {
      ovcField.setAttribute("disabled", "");
    });
  }
}


/**
 * 
 * @param {boolean} disableOptions 
 */
function otzOptionChanged(disableOptions = false) {
  var selectedValue = otzenrolledSelect.options[otzenrolledSelect.selectedIndex].value;
  var otzFields = document.querySelectorAll(".otzClass");
  if (selectedValue == "Yes") {
    if (disableOptions) otzenrolledSelect.readOnly = true;
    otzFields.forEach(otzField => {
      otzField.removeAttribute("disabled");
    });
  } else {
    otzFields.forEach(otzField => {
      otzField.setAttribute("disabled", "");
    });
  }
}

/**
 * 
 * @param {boolean} disableOptions 
 */
function pamaOptionChanged(disableOptions = false) {
  var selectedValue = pamaEnrolledSelect.options[pamaEnrolledSelect.selectedIndex].value;
  var pamaFields = document.querySelectorAll(".pamaClass");
  if (selectedValue == "Yes") {
    if (disableOptions) pamaEnrolledSelect.readOnly = true;
    pamaFields.forEach(pamaField => {
      pamaField.removeAttribute("disabled");
    });
  } else {
    pamaFields.forEach(pamaField => {
      pamaField.setAttribute("disabled", "");
    });
  }
}
