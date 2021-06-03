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
    });
}

function saveClient(){

}

function saveTrace() {

}

function searchClient(){
    let searchString = inputSearch.value.trim()
    if (searchString.length > 0) {
        ajax({
            type : "GET",
            url: "/search_hei_client/" + searchString,
            success : response => {
                let mResponse = JSON.parse(response)
                if (mResponse.code === 200){
                    let searchMatches = mResponse.data
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

}
















initialize()