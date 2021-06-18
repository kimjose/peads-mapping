const inputSearch = document.getElementById("inputSearch")
const divClientSearchResult = document.getElementById("divClientSearchResult")
const btnSearchClient = document.getElementById("btnSearchClient")
const divClientsDetails = document.getElementById("divClientsDetails")
const divHeiTracingCard = document.getElementById("divHeiTracingCard")

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

const labelTracingErrors = document.getElementById("labelTracingErrors")
const labelClientErrors = document.getElementById("labelClientErrors")

var activeClient = null
var editedClientId = ''
var editedTraceId = ''



initialize();

function initialize(){
    $("#heiClientDialog").on("hide.bs.modal", () => {
        clearHeiClientDialog()
    });
    $("#traceDialog").on("hide.bs.modal", () => {
        clearTraceDialog()
    });

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
    btnSearchClient.addEventListener('click', () => searchClient())
    document.getElementById('btnEditClient').addEventListener('click', () => editClient())

    selectTracingOutcome.addEventListener('change', ()=>outcomeChanged())
    selectHivTested.addEventListener('change', ()=>testedChanged())
    selectLinked.addEventListener('change', ()=>linkedChanged())
    selectTestResult.addEventListener('change', ()=>testResultChanged())
}

function outcomeChanged(){
    let selected = selectTracingOutcome.options[selectTracingOutcome.selectedIndex].value
    console.log(selected)
    if (selected == 'Confirmed Effective Transfer' ||
        selected == 'Traced Back'){
        selectHivTested.removeAttribute('disabled')
        selectTestType.removeAttribute('disabled')
        selectTestResult.removeAttribute('disabled')
        selectLinked.removeAttribute('disabled')
        inputDateTested.removeAttribute('disabled')
        inputCccNo.removeAttribute('disabled')

    } else {

        selectHivTested.selectedIndex = 0
        selectTestResult.selectedIndex = 0
        selectTestType.selectedIndex = 0
        selectLinked.selectedIndex = 0
        inputDateTested.value = ''
        inputCccNo.value = ''
        selectHivTested.setAttribute('disabled', '')
        selectTestType.setAttribute('disabled', '')
        selectTestResult.setAttribute('disabled', '')
        selectLinked.setAttribute('disabled', '')
        inputDateTested.setAttribute('disabled', '')
        inputCccNo.setAttribute('disabled', '')
    }
}

function linkedChanged(){
    let selected = selectLinked.options[selectLinked.selectedIndex].value
    if (selected == 'Yes') inputCccNo.removeAttribute('disabled')
    else {
        inputCccNo.value = ''
        inputCccNo.setAttribute('disabled', '')
    }
}

function testedChanged(){
    let selected = selectHivTested.options[selectHivTested.selectedIndex].value
    if (selected === "Yes"){
        if (selectTestType.hasAttribute('disabled')) selectTestType.removeAttribute('disabled')
        if (selectTestResult.hasAttribute('disabled')) selectTestResult.removeAttribute('disabled')
        if (inputDateTested.hasAttribute('disabled')) inputDateTested.removeAttribute('disabled')
    } else{
        console.log("Here now.")
        $('#selectTestResult').val('')
        $('#selectTestType').val('')
        inputDateTested.value = ''

        testResultChanged()
        selectTestType.setAttribute('disabled', '')
        selectTestResult.setAttribute('disabled', '')
        inputDateTested.setAttribute('disabled', '')
    }
}

function testResultChanged(){
    let selected = selectTestResult.options[selectTestResult.selectedIndex].value
    console.log(selected)
    if (selected == 'Positive'){
        selectLinked.removeAttribute('disabled')
        inputCccNo.removeAttribute('disabled')

    } else {
        selectLinked.selectedIndex = 0
        selectLinked.setAttribute('disabled', '')
        inputCccNo.setAttribute('disabled', '')
        inputCccNo.value = ''
    }
}

function saveClient(){
    labelClientErrors.innerText = ''
    let errors = ''
    let hei_number = inputHeiNo.value
    let facility_code = selectFacility.options[selectFacility.selectedIndex].value
    let dob = inputDob.value
    let gender = selectGender.options[selectGender.selectedIndex].value
    let name = inputHeiName.value
    let pmtct_enrollment_date = inputDatePmtctEnrolled.value
    let status = selectStatus.options[selectStatus.selectedIndex].value
    let status_date = inputStatusDate.value
    let data = new FormData()
    data.append('id', activeClient == null ? '' : activeClient.id)
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
                loadClient(mResponse.data)
                $("#heiClientDialog").modal("hide");
            } else {

            }
        },
        error : ()=>{

        }
    })
}

function saveTracing() {
    labelTracingErrors.innerText = ''
    let errors = ''


    let date = inputDot.value
    let mode = selectTracingMode.options[selectTracingMode.selectedIndex].value
    let outcome = selectTracingOutcome.options[selectTracingOutcome.selectedIndex].value
    let tested = selectHivTested.options[selectHivTested.selectedIndex].value
    let test_type = selectTestType.options[selectTestType.selectedIndex].value
    let test_date = inputDateTested.value
    let test_results = selectTestResult.options[selectTestResult.selectedIndex].value
    let linked_to_care = selectLinked.options[selectLinked.selectedIndex].value
    let ccc_no = inputCccNo.value.trim()
    let recommendations = inputRecommendation.value

    if (date == '') errors += "\n Enter a valid date of tracing."
    if (mode == '') errors += "\n Select a valid tracing mode."
    if (outcome == '') errors += "\n Select a valid tracing outcome."

    if (outcome == 'Confirmed Effective Transfer'
    || outcome == 'Traced Back'){
        if (tested == '') errors += "\n Select a valid option for HIV tested."
        if (tested == 'Yes') {
            if (test_type == '') errors += "\n Select a valid test type."
            if (test_date == '') errors += "\n Enter a valid test date."
            if (test_results == '') errors += "\n Enter results of the HIV test."
            if (test_results == 'Positive') {
                if (linked_to_care == '') errors += "\n Select a valid option for linked to care."
            }
            if (linked_to_care == 'Yes') {
                if (ccc_no == '' ||ccc_no.length != 10) errors += "\n Enter a valid ccc number."
            }
        }
    }
    errors = errors.trim()
    console.log(errors)
    if (errors != '') {
        labelTracingErrors.innerText = errors
        return
    }
    let data = new FormData()
    data.append("date", date)
    data.append("id", editedTraceId)
    data.append("client_id", activeClient.id)
    data.append("mode", mode)
    data.append("outcome", outcome)
    data.append("tested", tested)
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
        processData : false,
        cache: false,
        contentType: false,
        success : response => {
            let mResponse = JSON.parse(response)
            if (mResponse.code == 200){
                loadTracings(mResponse.data)
                $("#traceDialog").modal("hide");
            }
        },
        error : err => {}
    })
}

function searchClient(){
    let searchString = inputSearch.value.trim()
    if (searchString.length > 1) {
        divHeiTracingCard.innerHTML = ''
        divClientsDetails.classList.add('d-none')
        btnAddTrace.setAttribute("disabled", "")
        activeClient = null

        $.ajax({
            type : "GET",
            url: "search_hei_clients/" + searchString,
            success : response => {
                let mResponse = JSON.parse(response)
                if (mResponse.code == 200){
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
    let currentButtons = divClientSearchResult.querySelectorAll('button')
    currentButtons.forEach(currentButton => {
        divClientSearchResult.removeChild(currentButton)
    })
    heiClients.forEach(client => {
        let button = document.createElement('button');
        button.setAttribute("type", "button");
        button.setAttribute("id", client.id);
        button.classList.add("list-group-item", "list-group-item-action")
        button.addEventListener("click",() => {
            loadClient(client)
        })
        button.innerHTML = "<b>" + client.name + "</b> <br/> " + client.hei_number;

        divClientSearchResult.appendChild(button);
        divClientSearchResult.classList.remove('d-none');
    })
}

function loadClient(client){
    activeClient = client
    tdClientNo.innerText = client.hei_number
    tdClientName.innerText = client.name
    tdClientDob.innerText = client.dob
    tdClientGender.innerText = client.gender
    tdFacilityCode.innerText = client.facility_code
    tdFacilityName.innerText = client.facility_name
    tdPmtctDate.innerText = client.pmtct_enrollment_date
    tdHeiStatus.innerText = client.status
    tdStatusDate.innerText = client.status_date
    divClientSearchResult.classList.add('d-none')
    divClientsDetails.classList.remove('d-none')
    loadTracings(client.tracings)
}

function loadTracings(tracings){
    if (btnAddTrace.hasAttribute("disabled")){
        btnAddTrace.removeAttribute("disabled")
    }
    divHeiTracingCard.innerHTML = ''
    tracings.forEach(tracing => {

        var card = document.createElement('div');
        card.classList.add("card", "shadow", "mb-3");

        const headerlink = document.createElement('a');
        headerlink.setAttribute('href', '#collapseCard' + tracing.id);
        headerlink.classList.add("d-block", "card-header", "py-3");
        headerlink.setAttribute('data-toggle', "collapse");
        headerlink.setAttribute('role', "button");
        headerlink.setAttribute('aria-expanded', "true");
        headerlink.setAttribute('aria-controls', "collapseCard" + tracing.id);

        const cardTitle = document.createElement('h6');
        cardTitle.classList.add("m-0", "font-weight-bold", "text-primary", "text-center");
        cardTitle.innerHTML = "Tracing " + tracing.date;
        headerlink.appendChild(cardTitle);

        const divCollapsable = document.createElement("div");
        divCollapsable.classList.add("collapse", "hide");
        divCollapsable.setAttribute('id', 'collapseCard' + tracing.id);

        const cardBody = document.createElement('div');
        cardBody.classList.add("card-body");
        var rowdiv = document.createElement('div');
        rowdiv.classList.add("row", "justify-content-center");

        var divcol = document.createElement('div');
        divcol.classList.add("col-auto");

        var table = document.createElement('table');
        table.classList.add("table", "table-responsive", "table-striped",  "table-bordered");
        table.setAttribute('width', "100%");
        var tbody = document.createElement('tbody');


        let cssClasses = ["row", "m-0"]
        let tr1 = createRow(cssClasses, ['Mode of tracing.', tracing.mode], 2)
        let tr2 = createRow(cssClasses, ['Tracing Outcome.', tracing.outcome], 2)
        let tr3 = createRow(cssClasses, ['HIV test done.', tracing.hiv_tested], 2)
        let tr4 = createRow(cssClasses, ['Type of HIV Test.', tracing.hiv_test_type], 2)
        let tr5 = createRow(cssClasses, ['Date HIV test done .', tracing.hiv_test_date], 2)
        let tr6 = createRow(cssClasses, ['HIV test results (PCR or Antibody).', tracing.hiv_test_results], 2)
        let tr7 = createRow(cssClasses, ['Linked to Care .', tracing.linked_to_care], 2)
        let tr8 = createRow(cssClasses, ['CCC Number .', tracing.ccc_no], 2)
        let tr9 = createRow(cssClasses, ['Recommendations.', tracing.recommendations], 2)
        tbody.append(tr1,tr2, tr3, tr4, tr5, tr6, tr7, tr8, tr9)
        table.appendChild(tbody)

        const editbtn = document.createElement('div');
        editbtn.classList.add("btn", "btn-primary", "mr-2");
        editbtn.setAttribute('data-toggle', "modal");
        editbtn.setAttribute("data-target", "#traceDialog");
        editbtn.innerHTML = 'Edit Details';
        editbtn.addEventListener('click', () => editTracing(tracing));

        var buttondiv = document.createElement('div');
        buttondiv.classList.add("float-right", "mb-4");
        buttondiv.append(editbtn)
        divcol.appendChild(table)
        rowdiv.appendChild(divcol)
        cardBody.appendChild(rowdiv)
        cardBody.appendChild(buttondiv)

        divCollapsable.appendChild(cardBody)

        card.appendChild(headerlink)
        card.appendChild(divCollapsable)

        divHeiTracingCard.appendChild(card);
    })
}

function clearHeiClientDialog(){
    editedClientId = ''
    document.getElementById('clientForm').reset()
}

function clearTraceDialog(){
    editedTraceId = ''
    document.getElementById('tracingForm').reset()
    labelTracingErrors.innerHTML = ''
}

function createRow(rowClasses, texts, cols){
    const tr = document.createElement('tr');
    rowClasses.forEach(rowClass => tr.classList.add(rowClass))
    tr.classList.add(rowClasses);
    for (let i = 0; i < cols; i++){
        const td = document.createElement('td');
        td.classList.add("d-inline-block", "col-6");
        td.innerHTML = texts[i];
        tr.appendChild(td)
    }
    return tr
}

function editClient(){
    editedClientId = activeClient.id
    inputHeiName.value = activeClient.name
    inputHeiNo.value = activeClient.hei_number
    inputDob.value =activeClient.dob
    $('#selectGender').val(activeClient.gender)
    $('#selectFacility').val(activeClient.facility_code)
    $('#selectStatus').val(activeClient.status)
    inputDatePmtctEnrolled.value = activeClient.pmtct_enrollment_date
    inputStatusDate.value = activeClient.status_date
}

function editTracing(tracing){
    editedTraceId = tracing.id
    inputDot.value = tracing.date
    $('#selectTracingMode').val(tracing.mode)
    $('#selectTracingOutcome').val(tracing.outcome)
    $('#selectHivTested').val(tracing.hiv_tested)
    $('#selectTestType').val(tracing.hiv_test_type)
    $('#selectTestResult').val(tracing.hiv_test_results)
    $('#selectLinked').val(tracing.linked_to_care)
    inputDateTested.value = tracing.hiv_test_date
    inputCccNo.value = tracing.ccc_no
    inputRecommendation.value = tracing.recommendations
    outcomeChanged()
    testedChanged()
    linkedChanged()
    testResultChanged()
}


//todo logics and safety checks & error handling
