const countySelect = document.getElementById('countySelect')
const toSelect = document.getElementById('toSelect')
const facilitySelect = document.getElementById('facilitySelect')
var patientsData = null;
var patientSuppressionChart = null
var ovcChart = null;
var otzChart = null;
var pamaChart = null;
var patientCategorizationChart = null;
var treatmentChart = null;
var regimenSuppressionChart = null;



initialize()

function initialize() {


    countySelect.addEventListener('change', () => filterByCounty())
    toSelect.addEventListener('change', () => filterByTo())
    facilitySelect.addEventListener('change', () => filterByFacility())

    $.ajax({
        dataType: "json",
        url: "../assets/dashboard_data.json",
        success: response => {

            let counties = response.allCounties
            let facilities = response.allFacilities
            let tos = response.technicalOfficers
            patientsData = response.patientsData

            counties.forEach(county => {
                let option = document.createElement('option')
                option.value = county;
                option.appendChild(document.createTextNode(county))
                countySelect.appendChild(option)
            })
            facilities.forEach(facility => {
                let option = document.createElement('option')
                option.value = facility.mfl_code
                option.appendChild(document.createTextNode(facility.name))
                facilitySelect.appendChild(option)
            })
            tos.forEach(to => {
                let option = document.createElement('option')
                option.value = to.id
                option.appendChild(document.createTextNode(to.names))
                toSelect.appendChild(option)
            })
            loadData(patientsData)
        }
    })
}

function filterByCounty() {
    let selected = countySelect.options[countySelect.selectedIndex].value
    if (selected === "") {

    } else if (selected == 0) {

    } else {

    }
}

function filterByTo() {

}

function filterByFacility() {

}

function loadData(data) {
    let ovcData = [];
    let otzData = []
    let pamaData = []
    let patientCategorizationData = [];
    let treatmentData = [];
    let regimenSuppressionDatasets = [];
    let ageCat0 = 0, ageCat1 = 0, ageCat2 = 0, ageCat3 = 0;
    let ageCat4 = 0, ageCat5 = 0, ageCat6 = 0, ageCat7 = 0;
    let lpvr0 = 0, lpvr1 = 0, lpvr2 = 0, lpvr3 = 0, lpvr4 = 0;
    let efv0 = 0, efv1 = 0, efv2 = 0, efv3 = 0, efv4 = 0;
    let nvp0 = 0, nvp1 = 0, nvp2 = 0, nvp3 = 0, nvp4 = 0;
    let dtg0 = 0, dtg1 = 0, dtg2 = 0, dtg3 = 0, dtg4 = 0;
    let other0 = 0, other1 = 0, other2 = 0, other3 = 0, other4 = 0;
    let regimenSuppressionOptions = [
        'ABC+3TC+AZT', 'ABC+3TC+RAL', 'ABC+3TC+DTG', 'TDF+3TC+DTG', 'TDF+3TC+EFV', 'ABC+3TC+EFV', 'AZT+3TC+LPVr','ABC+3TC+LPVr',
        'AZT+3TC+EFV', 'TDF+3TC+LPVr', 'TDF+3TC+ATVr', 'AZT+3TC+ATVr', 'ABC+3TC+ATVr', 'AZT+3TC+DTG', 'TDF+3TC+DTG+DRVr'
    ]
    let regimenSuppressionValues = [
        [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0],
        [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0], [0,0,0,0]]

    let regimenSuppressionTotals = [
        [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0],
        [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0], [0,0,0,0]]
    data.forEach(datum => {
        let age = calculateAge(new Date(datum.dob))
        let supressed = datum.vlOutcome === "Supressed"
        if (age >= 2 && age <= 19) ovcData.push(datum)
        if (age >= 10 && age <= 19) otzData.push(datum)
        if (age >= 1 && age <= 14) pamaData.push(datum)
        if (datum.sex === 'M') {
            if (age >= 0 && age <= 4) ageCat0++
            else if (age >= 5 && age <= 9) ageCat1++
            else if (age >= 10 && age <= 14) ageCat2++
            else if (age >= 15 && age <= 19) ageCat3++
        } else if (datum.sex === 'F') {
            if (age >= 0 && age <= 4) ageCat4++
            else if (age >= 5 && age <= 9) ageCat5++
            else if (age >= 10 && age <= 14) ageCat6++
            else if (age >= 15 && age <= 19) ageCat7++
        }
//get regimen, weight
        if (datum.weight == null || datum.weight === ''
        || datum.currentRegimen == null
        || datum.currentRegimen === ''){
            //Do nothing if any of these conditions pass
        } else if (datum.currentRegimen.endsWith('LPVr')){
            if (datum.regimenLine === "First Regimen Line" && datum.weight < 20) lpvr0++
            if (datum.regimenLine === "First Regimen Line" && datum.weight >= 20) lpvr1++
            if (datum.regimenLine === "Second regimen" && datum.weight < 20) lpvr2++
            if (datum.regimenLine === "Second regimen" && datum.weight >= 20) lpvr3++
            lpvr4++
        } else if (datum.currentRegimen.endsWith('EFV')){
            if (datum.regimenLine === "First Regimen Line" && datum.weight < 20) efv0++
            if (datum.regimenLine === "First Regimen Line" && datum.weight >= 20) efv1++
            if (datum.regimenLine === "Second regimen" && datum.weight < 20) efv2++
            if (datum.regimenLine === "Second regimen" && datum.weight >= 20) efv3++
            efv4++
        } else if (datum.currentRegimen.endsWith('NVP')){
            if (datum.regimenLine === "First Regimen Line" && datum.weight < 20) nvp0++
            if (datum.regimenLine === "First Regimen Line" && datum.weight >= 20) nvp1++
            if (datum.regimenLine === "Second regimen" && datum.weight < 20) nvp2++
            if (datum.regimenLine === "Second regimen" && datum.weight >= 20) nvp3++
            nvp4++
        }  else if (datum.currentRegimen.endsWith('DTG')){
            if (datum.regimenLine === "First Regimen Line" && datum.weight < 20) dtg0++
            if (datum.regimenLine === "First Regimen Line" && datum.weight >= 20) dtg1++
            if (datum.regimenLine === "Second regimen" && datum.weight < 20) dtg2++
            if (datum.regimenLine === "Second regimen" && datum.weight >= 20) dtg3++
            dtg4++
        }  else {
            if (datum.regimenLine === "First Regimen Line" && datum.weight < 20) other0++
            if (datum.regimenLine === "First Regimen Line" && datum.weight >= 20) other1++
            if (datum.regimenLine === "Second regimen" && datum.weight < 20) other2++
            if (datum.regimenLine === "Second regimen" && datum.weight >= 20) other3++
            other4++
        }
//For regimen suppression
        for (let i = 0; i < regimenSuppressionOptions.length; i++ ){
            if (datum.currentRegimen === regimenSuppressionOptions[i]) {
                if (age >= 0 && age <= 4) {
                    if (supressed) regimenSuppressionValues[i][0]++
                    regimenSuppressionTotals[i][0]++
                }
                else if (age >= 5 && age <= 9) {
                    if (supressed) regimenSuppressionValues[i][1]++
                    regimenSuppressionTotals[i][1]++
                }
                else if (age >= 10 && age <= 14) {
                    if (supressed) regimenSuppressionValues[i][2]++
                    regimenSuppressionTotals[i][2]++
                }
                else if (age >= 15 && age <= 19) {
                    if (supressed) regimenSuppressionValues[i][3]++
                    regimenSuppressionTotals[i][3]++
                }
            }
        }
    })
    let maleAgeCategories = [ageCat0, ageCat1, ageCat2, ageCat3]
    let femaleAgeCategories = [ageCat4, ageCat5, ageCat6, ageCat7]
    patientCategorizationData = {
        "males": maleAgeCategories,
        "females": femaleAgeCategories
    }
    treatmentData = {
        "lpvr" : [lpvr0, lpvr1, lpvr2, lpvr3, lpvr4],
        "efv" : [efv0, efv1, efv2, efv3, efv4],
        "nvp" : [nvp0, nvp1, nvp2, nvp3, nvp4],
        "dtg" : [dtg0, dtg1, dtg2, dtg3, dtg4],
        "other" : [other0, other1, other2, other3, other4],
    }
    for (let i = 0; i < regimenSuppressionOptions.length; i++ ){
        let val0 = regimenSuppressionTotals[i][0] === 0 ? 0 : ((regimenSuppressionValues[i][0]/regimenSuppressionTotals[i][0]) * 100).toFixed(2)
        let val1 = regimenSuppressionTotals[i][1] === 0 ? 0 : ((regimenSuppressionValues[i][1]/regimenSuppressionTotals[i][1]) * 100).toFixed(2)
        let val2 = regimenSuppressionTotals[i][2] === 0 ? 0 : ((regimenSuppressionValues[i][2]/regimenSuppressionTotals[i][2]) * 100).toFixed(2)
        let val3 = regimenSuppressionTotals[i][3] === 0 ? 0 : ((regimenSuppressionValues[i][3]/regimenSuppressionTotals[i][3]) * 100).toFixed(2)
        let dataset = {
            label: regimenSuppressionOptions[i],
            data: [val0, val1, val2, val3],
            backgroundColor: "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","+ Math.floor(Math.random() * 255) + ")",
            borderColor: "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ","+ Math.floor(Math.random() * 255) + ")",
        }
        regimenSuppressionDatasets.push(dataset)
    }
    drawPatientSuppression(data)
    drawOvcData(ovcData)
    drawOtzData(otzData)
    drawPamaData(pamaData)
    drawPatientCategorization(patientCategorizationData)
    drawTreatmentChart(treatmentData)
    drawRegimenSuppressionChart(regimenSuppressionDatasets)
}

function drawPatientSuppression(data){
    let active = data.length
    let suppressed = 0
    data.forEach(datum => {
        if (datum.enrolledInOVC === 'Y') suppressed++
    })
    document.getElementById('tdTotalPatients').innerText = active
    document.getElementById('tdTotalSuppressed').innerText = suppressed + ''
    document.getElementById('tdSuppressionPercentage').innerText = ((suppressed / active) * 100).toFixed(2)
    if (patientSuppressionChart == null) {
        patientSuppressionChart = new Chart(document.getElementById("pieChartSuppression").getContext('2d'), {
            type: 'pie',
            data: {
                labels: ["Suppressed", "Not Suppressed"],
                datasets: [{
                    data: [300, 50],
                    backgroundColor: ["#00FFCC", "#DCDCDC"],
                    hoverBackgroundColor: ["#00FF33", "#C0C0C0"]
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    patientSuppressionChart.data.datasets[0].data = [suppressed, active - suppressed]
    patientSuppressionChart.update()
}

function drawPatientCategorization(data) {
    // Data
    if (patientCategorizationChart == null) {
        patientCategorizationChart = new Chart(document.getElementById('patientCategorizationChart'), {
            type: 'bar',
            data: {
                labels: ["0 - 4 years", "5 - 9 years", "10 - 14 years", "15 - 19 years"],

                datasets: [
                    {
                        label: 'Male',
                        data: [20, 20, 20, 20],
                        backgroundColor: '#3895D3',
                        borderColor: '#3895D3',
                    },
                    {
                        label: 'Female',
                        data: [20, 20, 20, 20],
                        backgroundColor: '#980147',
                        borderColor: '#980147',
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: "Age Range",
                            },
                            gridLines: {
                                drawOnChartArea: false,
                            },
                        }
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: "No. of Patients",
                            },
                            ticks: {
                                min: 0,
                                maxTicksLimit: 6,
                            },
                            gridLines: {
                                drawOnChartArea: false,
                            },
                        }
                    ]
                }
            },
        });
    }
    patientCategorizationChart.data.datasets[0].data = data.males
    patientCategorizationChart.data.datasets[1].data = data.females
    patientCategorizationChart.update()
}

function drawOvcData(data) {
    let active = data.length
    let enrolled = 0
    data.forEach(datum => {
        if (datum.enrolledInOVC === 'Y') enrolled++
    })
    document.getElementById('tdOvcActive').innerText = active
    document.getElementById('tdOvcEnrolled').innerText = enrolled + ''
    document.getElementById('tdOvcPercentage').innerText = ((enrolled / active) * 100).toFixed(2)
    if (ovcChart == null) {
        ovcChart = new Chart(document.getElementById("pieChartOVC").getContext('2d'), {
            type: 'pie',
            data: {
                labels: ["Enrolled", "Not Enrolled"],
                datasets: [{
                    data: [300, 50],
                    backgroundColor: ["#00FFCC", "#DCDCDC"],
                    hoverBackgroundColor: ["#00FF33", "#C0C0C0"]
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    ovcChart.data.datasets[0].data = [enrolled, active - enrolled]
    ovcChart.update()
}

function drawOtzData(data) {
    let active = data.length
    let enrolled = 0
    data.forEach(datum => {
        if (datum.enrolledInOTZ === 'Y') enrolled++
    })
    document.getElementById('tdOtzActive').innerText = active
    document.getElementById('tdOtzEnrolled').innerText = enrolled + ''
    document.getElementById('tdOtzPercentage').innerText = ((enrolled / active) * 100).toFixed(2)
    if (otzChart == null) {
        otzChart = new Chart(document.getElementById("pieChartOTZ").getContext('2d'), {
            type: 'pie',
            data: {
                labels: ["Enrolled", "Not Enrolled"],
                datasets: [{
                    data: [300, 50],
                    backgroundColor: ["#00FFCC", "#DCDCDC"],
                    hoverBackgroundColor: ["#00FF33", "#C0C0C0"]
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    otzChart.data.datasets[0].data = [enrolled, active - enrolled]
    otzChart.update()
}

function drawPamaData(data) {
    let active = data.length
    let enrolled = 0
    data.forEach(datum => {
        if (datum.enrolledInPAMA === 'Y') enrolled++
    })
    document.getElementById('tdPamaActive').innerText = active
    document.getElementById('tdPamaEnrolled').innerText = enrolled + ''
    document.getElementById('tdPamaPercentage').innerText = ((enrolled / active) * 100).toFixed(2)
    if (pamaChart == null) {
        pamaChart = new Chart(document.getElementById("pieChartPAMA").getContext('2d'), {
            type: 'pie',
            data: {
                labels: ["Enrolled", "Not Enrolled"],
                datasets: [{
                    data: [300, 50],
                    backgroundColor: ["#00FFCC", "#DCDCDC"],
                    hoverBackgroundColor: ["#00FF33", "#C0C0C0"]
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    pamaChart.data.datasets[0].data = [enrolled, active - enrolled]
    pamaChart.update()
}

function drawTreatmentChart(data) {
    if (treatmentChart == null) {
        treatmentChart = new Chart(document.getElementById("treatmentChart").getContext('2d'), {
            type: 'line',
            data: {
                labels: ["First line(<20kg)", "First line(>20Kg)", "Second line(<20kg)", "Second line(>20kg)", "Total"],
                datasets: [{
                    label: "LPV/r",
                    data: [65, 59, 80, 81, 56,],

                    borderColor: [
                        'rgba(200, 99, 132, .7)',
                    ],
                    borderWidth: 2
                },
                    {
                        label: "EFV",
                        data: [28, 48, 40, 19, 86,],

                        borderColor: [
                            'rgba(230, 210, 10, .7)',
                        ],
                        borderWidth: 2
                    },
                    {
                        label: "NVP",
                        data: [40, 19, 86, 27, 90],

                        borderColor: [
                            'rgba(10, 100, 10, .7)',
                        ],
                        borderWidth: 2
                    },
                    {
                        label: "DTG",
                        data: [48, 40, 19, 27, 90],

                        borderColor: [
                            'rgba(60, 10, 130, .7)',
                        ],
                        borderWidth: 2
                    },
                    {
                        label: "Other",
                        data: [48, 40, 19, 27, 90],

                        borderColor: [
                            'rgba(60, 10, 130, .7)',
                        ],
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
    }
    treatmentChart.data.datasets[0].data = data.lpvr
    treatmentChart.data.datasets[1].data = data.efv
    treatmentChart.data.datasets[2].data = data.nvp
    treatmentChart.data.datasets[3].data = data.dtg
    treatmentChart.data.datasets[4].data = data.other

}

function drawRegimenSuppressionChart(datasets) {
    if (regimenSuppressionChart == null) {
        regimenSuppressionChart = new Chart(document.getElementById('regimenSuppressionChart'), {
            type: 'bar',
            data: {
                labels: ["0 - 4 years", "5 - 9 years", "10 - 14 years", "15 - 19 years"],

                datasets: [
                    {
                        label: 'Male',
                        data: [20, 20, 20, 20],
                        backgroundColor: '#3895D3',
                        borderColor: '#3895D3',
                    },
                    {
                        label: 'Female',
                        data: [20, 20, 20, 20],
                        backgroundColor: '#980147',
                        borderColor: '#980147',
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: "Age Range",
                            },
                            gridLines: {
                                drawOnChartArea: false,
                            },
                        }
                    ],
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                labelString: "Percentage suppression",
                            },
                            ticks: {
                                min: 0,
                                maxTicksLimit: 6,
                            },
                            gridLines: {
                                drawOnChartArea: false,
                            },
                        }
                    ]
                }
            },
        });
    }
    console.log(regimenSuppressionChart.data.datasets)
    console.log(datasets)
    regimenSuppressionChart.data.datasets = datasets;
    regimenSuppressionChart.update()
}

function calculateAge(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
