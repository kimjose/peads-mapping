const inputSearch = document.getElementById("inputSearch")
const divClientSearchResult = document.getElementById("divClientSearchResult")

const tdClientNo = document.getElementById("tdClientNo")
const tdClientName = document.getElementById("tdClientName")
const tdClientDob = document.getElementById("tdClientDob")
const tdClientGender = document.getElementById("tdClientGender")
const tdFacilityName = document.getElementById("tdFacilityName")
const tdFacilityCode = document.getElementById("tdFacilityCode")
const tdPmtctDate = document.getElementById("tdPmtctDate")
const tdHeiStatus = document.getElementById("tdHeiStatus")
const tdStatusDate = document.getElementById("tdStatusDate")
const btnEditClient = document.getElementById("btnEditClient")


const labelTraceId = document.getElementById("labelTraceId")
const inputDot = document.getElementById("inputDot")
const selectTracingMode = document.getElementById("selectTracingMode")
const selectTracingOutcome = document.getElementById("selectTracingOutcome")
const selectHivTested = document.getElementById("selectHivTested")
const selectTestType = document.getElementById("selectTestType")
const inputDateTested = document.getElementById("inputDateTested")
const selectTestResult = document.getElementById("selectTestResult")
const selectLinked = document.getElementById("selectLinked")
const inputCccNo = document.getElementById("inputCccNo")
const inputRecommendation = document.getElementById("inputRecommendation")
const btnAddTrace = document.getElementById("btnAddTrace")
const btnSaveTrace = document.getElementById("btnSaveTrace")

const inputHeiNo = document.getElementById("inputHeiNo")
const inputHeiName = document.getElementById("inputHeiName")
const inputDob = document.getElementById("inputDob")
const selectGender = document.getElementById("selectGender")
const selectFacility = document.getElementById("selectFacility")
const inputDatePmtctEnrolled = document.getElementById("inputDatePmtctEnrolled")
const selectStatus = document.getElementById("selectStatus")
const inputStatusDate = document.getElementById("inputStatusDate")
const saveClientBtn = document.getElementById("saveClientBtn")

var client_id = 0

function initialize(){
    $.ajax({
        dataType: "json",
        url: "data.json",
        success: function (data) {
            let tracingModes = data.tracingModes;
            tracingModes.forEach(tracingMode => {
                let option = document.createElement("option")
                option.setAttribute("value", tracingMode)
                option.appendChild(document.createTextNode(tracingMode))
                selectTracingMode.appendChild(option)
            })
            let tracingOutcomes = data.tracingOutcomes
            tracingOutcomes.forEach(tracingOutcome => {
                let option = document.createElement("option")
                option.setAttribute("value", tracingOutcome)
                option.appendChild(document.createTextNode(tracingOutcome))
                selectTracingOutcome.appendChild(option)
            })
            let heiStatuses = data.heiStatuses
            heiStatuses.forEach(heiStatus => {
                let option = document.createElement("option")
                option.setAttribute("value", heiStatus)
                option.appendChild(document.createTextNode(heiStatus))
                selectStatus.appendChild(option)
            })
            let hivTestTypes = data.hivTestTypes
            hivTestTypes.forEach(hivTestType => {
                let option = document.createElement("option")
                option.setAttribute("value", hivTestType)
                option.appendChild(document.createTextNode(hivTestType))
                selectTestType.appendChild(option)
            })
            let hivTestResults = data.hivTestResults
            hivTestResults.forEach(hivTestResult => {
                let option = document.createElement("option")
                option.setAttribute("value", hivTestResult)
                option.appendChild(document.createTextNode(hivTestResult))
                selectTestResult.appendChild(option)
            })
        },
        error: (error) => {
            handleError(error.status, error.message);
        }
    })
    $.ajax({
        type : "GET",
        url : "get_facilities",
        success : response => {
            let mResponse = JSON.parse(response)
            if (mResponse.code === 200) {
                let facilities = mResponse.data
                facilities.forEach(facility => {
                    let option = document.createElement("option")
                    option.setAttribute("value", facility.mfl_code)
                    option.appendChild(document.createTextNode(facility.name))
                    selectFacility.appendChild(option)
                })
            }
        },
        error : err => {

        }
    })
    saveClientBtn.addEventListener('click', (event) => saveClient())
    btnSaveTrace.addEventListener('click', () => saveTracing())
}

function saveClient(){
    let hei_number = inputHeiNo.value
    let facility_code = selectFacility.options[selectFacility.selectedIndex].value
    let dob = inputDob.value
    let gender = selectGender.options[selectGender.selectedIndex].value
    let name = inputHeiName.value
    let pmtct_enrollment_date = inputDatePmtctEnrolled.value
    let status = selectStatus.options[selectStatus.selectedIndex].value
    let status_date = inputStatusDate.value
    let data = new FormData()
    data.append("hei_number", hei_number)
    data.append("facility_code", facility_code)
    data.append("dob", dob)
    data.append("gender", gender)
    data.append("name", name)
    data.append("status", status)
    data.append("status_date", status_date)
    data.append("pmtct_enrollment_date", pmtct_enrollment_date)

    $.ajax({
        type : "POST",
        url : "save_hei_client",
        processData : false,
        cache: false,
        contentType: false,
        data : data,
        success : response =>{
            let mResponse = JSON.parse(response)
            if (mResponse.code === 200){

            } else {

            }
        },
        error : ()=>{

        }
    })
}

function saveTracing() {

    let date = inputDot.value
    let mode = selectTracingMode.options[selectTracingMode.selectedIndex].value
    let outcome = selectTracingOutcome.options[selectTracingOutcome.selectedIndex].value
    let test_type = selectTestType.options[selectTestType.selectedIndex].value
    let test_date = inputDateTested.value
    let test_results = selectTestResult.options[selectTestResult.selectedIndex].value
    let linked_to_care = selectLinked.options[selectLinked.selectedIndex].value
    let ccc_no = inputCccNo.value
    let recommendations = inputRecommendation.value
    let id = labelTraceId.value

    let data = new FormData()
    data.append("date", date)
    data.append("id", id)
    data.append("mode", mode)
    data.append("outcome", outcome)
    data.append("test_type", test_type)
    data.append("test_date", test_date)
    data.append("test_results", test_results)
    data.append("linked_to_care", linked_to_care)
    data.append("ccc_no", ccc_no)
    data.append("recommendations", recommendations)

    $.ajax({
        type : "POST",
        url : "save_hei_tracing",
        data : data,
        success : response => {

        },
        error : err => {}
    })
}

function searchClient(){
    let searchString = inputSearch.value.trim()
    if (searchString.length > 0) {
        ajax({
            type : "GET",
            url: "/search_hei_clients/" + searchString,
            success : response => {
                let mResponse = JSON.parse(response)
                if (mResponse.code === 200){
                    let searchMatches = mResponse.data
                    loadMatches(searchMatches)
                } else {

                }
            },
            error : err => {

            }
        })
    } else {
        alert("Enter HEI no or initials to search")
    }
}

function loadMatches(heiClients) {
    heiClients.forEach(client => {
        let button = document.createElement('button');
        button.setAttribute("type", "button");
        button.setAttribute("id", client.id);
        button.classList.add("list-group-item", "list-group-item-action")
        button.addEventListener("click",() => {
            loadClient(client)
        })
        let name = client.name;
        pbutton.innerHTML = "<b>" + client.name + "</b> <br/> " + patient.hei_number;

        divClientSearchResult.appendChild(pbutton);
        divClientSearchResult.classList.remove('d-none');
    })
}

function loadClient(client){

}
function clearHeiClientDialog(){}

function clearTraceDialog(){}
















initialize()