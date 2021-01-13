const addPatientForm = document.querySelector("#addPatientForm");
const cccNoDialogInput = document.querySelector("#cccNoDialogInput");
const dobDialogInput = document.querySelector("#dobDialogInput");
const genderDailogSelect = document.querySelector("#genderDailogSelect");
const facilityDialogSelect = document.querySelector("#facilityDialogSelect");
const dohdDialogInput = document.querySelector("#dohdDialogInput");
const deicDialogInput = document.querySelector("#deicDialogInput");
const startRegimenDialogSelect = document.querySelector("#startRegimenDialogSelect");
const dsaDialogInput = document.querySelector("#dsaDialogInput");
const startKaletraDialogSelect = document.querySelector("#startKaletraDialogSelect");
const savePatientBtn = document.querySelector("#savePatientBtn");
const loadDataBtn = document.querySelector("#loadDataBtn");


loadDataBtn.addEventListener("click", ()=>{
    let cccNo = cccNoDialogInput.value;
    if (cccNo.length !== 10){
        alert("Enter a valid ccc number")
        return
    }
    $.ajax({
        type:"GET",
        url: "datascript?request=get_transfer_patient&cccNo=" +cccNo,
        success: (response)=>{
            let mResponse = JSON.parse(response);
            let code =  mResponse.code;
            if (code === 200){
                var patientData = mResponse.data;
                if (patientData != null){
                    $("#genderDailogSelect").val(patientData.sex);
                    dobDialogInput.value = patientData.dob;
                    dohdDialogInput.value = patientData.date_of_hiv_diagnosis;
                    deicDialogInput.value = patientData.date_enrolled;
                    dsaDialogInput.value = patientData.dateStartedART;
                    $("#startRegimenDialogSelect").val(patientData.startRegimen);
                    $("#startKaletraDialogSelect").val(patientData.startKaletraFormulation);
                    $("#facilityDialogSelect").val(patientData.facility);
                    var elements = addPatientForm.querySelectorAll(".p-data");
                    elements.forEach(element=>{
                        element.setAttribute("disabled", "");
                    });
                    cccNoDialogInput.setAttribute("disabled", "");
                    savePatientBtn.removeAttribute("disabled");
                } else {

                }
            } else if (code === 201){
                alert("Patient not found. Do you wish to add a new patient")
            } else if (code === 202) {
                alert("Patient status is not transfer out")
            }
        },
        error: ()=>{}
    })
});
savePatientBtn.addEventListener("click", ()=>{
    let cccNo = cccNoDialogInput.value;
    let dob = dobDialogInput.value;
    let sex =genderDailogSelect.value;
    let facility = facilityDialogSelect.options[facilityDialogSelect.selectedIndex].value;
    let dohd = dohdDialogInput.value;
    let deic = deicDialogInput.value;
    let startRegimen = startRegimenDialogSelect.options[startRegimenDialogSelect.selectedIndex].value;
    let dsa = dsaDialogInput.value;
    let kaletraFormulation = startKaletraDialogSelect.options[startKaletraDialogSelect.selectedIndex].value;
    const formData = new FormData();
    formData.append("cccNo", cccNo);
    formData.append("dob", dob);
    formData.append("sex", sex);
    formData.append("facility", facility);
    formData.append("date_enrolled", deic);
    formData.append("date_of_hiv_diagnosis", dohd);
    formData.append("startRegimen", startRegimen);
    formData.append("dateStartedART", dsa);
    formData.append("startKaletraFormulation", kaletraFormulation);
    $.ajax({
        type: "POST",
        url: "datascript?request=transfer_in",
        data: formData,
        processData: false,
        contentType: false,
        success: (response)=>{
            let mResponse = JSON.parse(response);
            if (mResponse.code === 200){
                clearDialog();
            } else {
                alert("Unable to process request.");
            }
        },
        error: (err)=>{
            alert("Unable to process request.");
        }
    })
});
function clearDialog(){
    addPatientForm.reset();
    savePatientBtn.setAttribute("disabled", "");
    var elements = addPatientForm.querySelectorAll(".p-data");
    elements.forEach(element=>{
        element.removeAttribute("disabled");
    });
    cccNoDialogInput.removeAttribute("disabled");
}