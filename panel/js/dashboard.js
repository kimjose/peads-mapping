const countySelect = document.getElementById('countySelect')
const toSelect = document.getElementById('toSelect')
const facilitySelect = document.getElementById('facilitySelect')
var patientsData = null;
var allTos = null;
var allFacilities = null;
var allCounties = null;
var patientSuppressionChart = null
var ovcChart = null;
var otzChart = null;
var pamaChart = null;
var patientCategorizationChart = null;
var treatmentChart = null;
var regimenSuppressionChart = null;
var pediatricSummaryChart = null


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
            allFacilities = response.allFacilities
            allTos = response.technicalOfficers
            patientsData = response.patientsData
            let labelTimestamp = document.getElementById("labelTimestamp")
            if (response.timestamp != null) {
                labelTimestamp.innerText = "Data loaded on : " + response.timestamp
            }

            console.log(counties);

            counties.forEach(county => {
                let option = document.createElement('option')
                option.value = county.name;
                option.appendChild(document.createTextNode(county.name))
                countySelect.appendChild(option)
            })
            allFacilities.forEach(facility => {
                let option = document.createElement('option')
                option.value = facility.mfl_code
                option.appendChild(document.createTextNode(facility.name))
                facilitySelect.appendChild(option)
            })
            allTos.forEach(to => {
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
    let selected = countySelect.options[countySelect.selectedIndex].value;
    console.log(selected);
    if (selected == "") {

    } else if (selected == 0) {
        loadData(patientsData);
        $('#toSelect').find('option').remove().end().append('<option selected hidden value="">Select Technical Officer</option>')
            .val('').append('<option value="0">All Officers</option>').val('0');
        allTos.forEach(to => {
            let option = document.createElement('option')
            option.value = to.id;
            option.appendChild(document.createTextNode(to.names));
            toSelect.appendChild(option)
        });
        $('#facilitySelect').find('option').remove().end().append('<option selected hidden value="">Select Facility</option>')
            .val('').append('<option value="0">All Facilities</option>').val('0');
        allFacilities.forEach(facility => {
            let option = document.createElement('option')
            option.value = facility.mfl_code
            option.appendChild(document.createTextNode(facility.name))
            facilitySelect.appendChild(option)
        })
    } else {
        let filtered = [];
        let countyFacilities = [];
        $('#toSelect').find('option').remove().end().append('<option selected hidden value="">Select Technical Officer</option>')
            .val('').append('<option value="1">All Officers</option>').val('1');
        console.log(allTos);
        allTos.forEach(to => {
            if (to.county == selected) {
                let option = document.createElement('option')
                option.value = to.id
                option.appendChild(document.createTextNode(to.names))
                toSelect.appendChild(option)
            }
        });

        patientsData.forEach(patientData => {
            if (patientData.county == selected) {
                filtered.push(patientData)
            }
        })
        $('#facilitySelect').find('option').remove().end().append('<option selected hidden value="">Select Facility</option>')
            .val('').append('<option value="1">All Facilities</option>').val('1');
        allFacilities.forEach(facility => {
            if (facility.county == selected) {
                countyFacilities.push(facility);
                let option = document.createElement('option')
                option.value = facility.mfl_code
                option.appendChild(document.createTextNode(facility.name))
                facilitySelect.appendChild(option)
            }
        })
        loadData(filtered)
    }
}

function filterByTo() {
    let selected = toSelect.options[toSelect.selectedIndex].value
    console.log(selected)
    if (selected == "") {

    } else if (selected == 0) {
        loadData(patientsData)
    } else if (selected == 1) {
        let filtered = [];
        let selectedcounty = countySelect.options[countySelect.selectedIndex].value;
        patientsData.forEach(patientData => {
            if (patientData.county == selectedcounty) {
                filtered.push(patientData)
            }
        })
        loadData(filtered)
    } else {
        let filtered = [];
        let countyFacilities = [];
        let toFacilities = [];

        $('#facilitySelect').find('option').remove().end().append('<option selected hidden value="">Select Facility</option>')
            .val('').append('<option value="1">All Facilities</option>').val('1');
        allFacilities.forEach(fac => {
            if (fac.assignedto == selected) {
                toFacilities.push(fac)
                let option = document.createElement('option')
                option.value = fac.mfl_code
                option.appendChild(document.createTextNode(fac.name))
                facilitySelect.appendChild(option)
            }
        })

        patientsData.forEach(patientData => {
            console.log(patientData.to_id)
            if (patientData.to_id == selected) {
                filtered.push(patientData);
            }
        });

        loadData(filtered)
    }

}

function filterByFacility() {
    let selected = facilitySelect.options[facilitySelect.selectedIndex].value
    if (selected == "") {

    } else if (selected == 0) {
        loadData(patientsData)
    } else if (selected == 1) {
        let filtered = [];
        let selectedto = toSelect.options[toSelect.selectedIndex].value;
        patientsData.forEach(patientData => {
            if (patientData.to_id == selectedto) {
                filtered.push(patientData);
            }
        });

        loadData(filtered);
    } else {
        let filtered = [];
        patientsData.forEach(patientData => {
            if (patientData.facility == selected) {
                filtered.push(patientData)
            }
        })
        loadData(filtered)
    }

}

function loadData(data) {
    let ovcData = [];
    let otzData = []
    let pamaData = []
    let patientCategorizationData = [];
    let treatmentData = [];
    let regimenSuppressionDatasets = [];
    let regimenSuppressionTableData = [];
    let ageCat0 = 0, ageCat1 = 0, ageCat2 = 0, ageCat3 = 0;
    let ageCat4 = 0, ageCat5 = 0, ageCat6 = 0, ageCat7 = 0;
    let lpvr0 = 0, lpvr1 = 0, lpvr2 = 0, lpvr3 = 0
    let efv0 = 0, efv1 = 0
    let atvr0 = 0, atvr1 = 0, atvr2 = 0, atvr3 = 0
    let dtg0 = 0, dtg1 = 0, dtg2 = 0, dtg3 = 0
    let other0 = 0, other1 = 0
    let regimenSuppressionOptions = [
        'ABC+3TC+AZT', 'ABC+3TC+RAL', 'ABC+3TC+DTG', 'TDF+3TC+DTG', 'TDF+3TC+EFV', 'ABC+3TC+EFV', 'AZT+3TC+LPVr', 'ABC+3TC+LPVr',
        'AZT+3TC+EFV', 'TDF+3TC+LPVr', 'TDF+3TC+ATVr', 'AZT+3TC+ATVr', 'ABC+3TC+ATVr', 'AZT+3TC+DTG', 'TDF+3TC+DTG+DRVr', 'Totals'
    ]
    let regimenSuppressionValues = [
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

    let regimenSuppressionTotals = [
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    let pedSummaryDataset0 = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    let pedSummaryDataset1 = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    data.forEach(datum => {
        let age = calculateAge(new Date(datum.dob))
        let supressed = datum.vlOutcome === "Supressed"
        if (age >= 2 && age <= 19 && datum.statusAtOVCDiscontinuation === 'Active') ovcData.push(datum)
        if (age >= 10 && age <= 19 && datum.statusAtOTZTransition === 'Active') otzData.push(datum)
        if (age >= 1 && age <= 14 && datum.PAMAStatusCurrent === 'Active') pamaData.push(datum)
        if (datum.statusAtTransition === "Active") {
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
                || datum.currentRegimen === '') {
                //Do nothing if any of these conditions pass
            } else if (datum.currentRegimen.endsWith('LPVr')) {
                if (datum.regimenLine === "First Regimen Line" && datum.weight < 20) lpvr0++
                if (datum.regimenLine === "First Regimen Line" && datum.weight >= 20) lpvr1++
                if (datum.regimenLine === "Second Regimen Line" && datum.weight < 20) lpvr2++
                if (datum.regimenLine === "Second Regimen Line" && datum.weight >= 20) lpvr3++
            } else if (datum.currentRegimen.endsWith('EFV')) {
                if (datum.weight < 20) efv0++
                if (datum.weight >= 20) efv1++
            } else if (datum.currentRegimen.endsWith('ATVr')) {
                if (datum.regimenLine === "First Regimen Line" && datum.weight < 20) atvr0++
                if (datum.regimenLine === "First Regimen Line" && datum.weight >= 20) atvr1++
                if (datum.regimenLine === "Second Regimen Line" && datum.weight < 20) atvr2++
                if (datum.regimenLine === "Second Regimen Line" && datum.weight >= 20) atvr3++
            } else if (datum.currentRegimen.endsWith('DTG')) {
                if (datum.regimenLine === "First Regimen Line" && datum.weight < 20) dtg0++
                if (datum.regimenLine === "First Regimen Line" && datum.weight >= 20) dtg1++
                if (datum.regimenLine === "Second Regimen Line" && datum.weight < 20) dtg2++
                if (datum.regimenLine === "Second Regimen Line" && datum.weight >= 20) dtg3++

            } else {
                if (datum.weight < 20) other0++
                if (datum.weight >= 20) other1++

            }
            //pediatric summary
            if (age >= 0 && age <= 14) {
                pedSummaryDataset0[0]++
                if (datum.vlScoreType !== '') pedSummaryDataset0[1]++
                if (datum.disclosureStatus === "Not started") pedSummaryDataset0[2]++
                if (datum.disclosureStatus === "NA(below 5yrs)") pedSummaryDataset0[3]++
                if (datum.disclosureStatus === "Partial/Ongoingdisclosure") pedSummaryDataset0[4]++
                if (datum.disclosureStatus === "Fulldisclosure") pedSummaryDataset0[5]++
                if (datum.iptStatus === "Completed" || datum.iptStatus === "Started and ongoing"
                    || datum.iptStatus === "Discontinued") pedSummaryDataset0[6]++
                if (datum.iptStatus === "Not started") pedSummaryDataset0[7]++
                if (datum.iptStatus === "Completed") pedSummaryDataset0[8]++
            }
            if (age >= 15 && age <= 19) {
                pedSummaryDataset1[0]++
                if (datum.vlScoreType !== '') pedSummaryDataset1[1]++
                if (datum.disclosureStatus === "Not started") pedSummaryDataset1[2]++
                if (datum.disclosureStatus === "NA(below 5yrs)") pedSummaryDataset1[3]++
                if (datum.disclosureStatus === "Partial/Ongoingdisclosure") pedSummaryDataset1[4]++
                if (datum.disclosureStatus === "Fulldisclosure") pedSummaryDataset1[5]++
                if (datum.iptStatus === "Completed" || datum.iptStatus === "Started and ongoing"
                    || datum.iptStatus === "Discontinued") pedSummaryDataset1[6]++
                if (datum.iptStatus === "Not started") pedSummaryDataset1[7]++
                if (datum.iptStatus === "Completed") pedSummaryDataset1[8]++
            }

        }
//For regimen suppression
        for (let i = 0; i < regimenSuppressionOptions.length; i++) {
            if (datum.statusAtTransition === "Active") {

                if (datum.currentRegimen === regimenSuppressionOptions[i]) {
                    if (age >= 0 && age <= 4) {
                        if (supressed) {
                            regimenSuppressionValues[i][0]++
                            regimenSuppressionValues[regimenSuppressionOptions.length - 1][0]++
                        }
                        regimenSuppressionTotals[i][0]++
                        regimenSuppressionTotals[regimenSuppressionOptions.length - 1][0]++
                    } else if (age >= 5 && age <= 9) {
                        if (supressed) {
                            regimenSuppressionValues[i][1]++
                            regimenSuppressionValues[regimenSuppressionOptions.length - 1][1]++
                        }
                        regimenSuppressionTotals[i][1]++
                        regimenSuppressionTotals[regimenSuppressionOptions.length - 1][1]++
                    } else if (age >= 10 && age <= 14) {
                        if (supressed) {
                            regimenSuppressionValues[i][2]++
                            regimenSuppressionValues[regimenSuppressionOptions.length - 1][2]++
                        }
                        regimenSuppressionTotals[i][2]++
                        regimenSuppressionTotals[regimenSuppressionOptions.length - 1][2]++
                    } else if (age >= 15 && age <= 19) {
                        if (supressed) {
                            regimenSuppressionValues[i][3]++
                            regimenSuppressionValues[regimenSuppressionOptions.length - 1][3]++
                        }
                        regimenSuppressionTotals[i][3]++
                        regimenSuppressionTotals[regimenSuppressionOptions.length - 1][3]++
                    }
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
        "under20": [dtg0, dtg2, efv0, lpvr0, lpvr2, atvr0, atvr2, other0],
        "over20": [dtg1, dtg3, efv1, lpvr1, lpvr3, atvr1, atvr3, other1]
    }
    for (let i = 0; i < regimenSuppressionOptions.length; i++) {
        let val0 = regimenSuppressionTotals[i][0] === 0 ? 0 : ((regimenSuppressionValues[i][0] / regimenSuppressionTotals[i][0]) * 100).toFixed(2)
        let val1 = regimenSuppressionTotals[i][1] === 0 ? 0 : ((regimenSuppressionValues[i][1] / regimenSuppressionTotals[i][1]) * 100).toFixed(2)
        let val2 = regimenSuppressionTotals[i][2] === 0 ? 0 : ((regimenSuppressionValues[i][2] / regimenSuppressionTotals[i][2]) * 100).toFixed(2)
        let val3 = regimenSuppressionTotals[i][3] === 0 ? 0 : ((regimenSuppressionValues[i][3] / regimenSuppressionTotals[i][3]) * 100).toFixed(2)
        let dataset = {
            label: regimenSuppressionOptions[i],
            data: [val0, val1, val2, val3],
            backgroundColor: "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")",
            borderColor: "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")",
        }
        let tableDatum = {
            suppressedValues: [regimenSuppressionValues[i][0], regimenSuppressionValues[i][1], regimenSuppressionValues[i][2], regimenSuppressionValues[i][3]],
            totals: [regimenSuppressionTotals[i][0], regimenSuppressionTotals[i][1], regimenSuppressionTotals[i][2], regimenSuppressionTotals[i][3]],
            suppressedPercentage: [val0, val1, val2, val3]
        }
        regimenSuppressionDatasets.push(dataset)
        regimenSuppressionTableData.push(tableDatum)
    }
    drawPatientSuppression(data)
    drawOvcData(ovcData)
    drawOtzData(otzData)
    drawPamaData(pamaData)
    drawPatientCategorization(patientCategorizationData)
    drawTreatmentChart(treatmentData)
    drawPediatricSummaryChart(pedSummaryDataset0, pedSummaryDataset1)
    drawRegimenSuppressionChart(regimenSuppressionDatasets)
    drawRegimenSuppressionTable(regimenSuppressionTableData, regimenSuppressionOptions);
}

function drawPatientSuppression(data) {
    let active = data.length
    let suppressed = 0
    let notSuppressed = 0
    let notDone = 0
    data.forEach(datum => {
        if (datum.vlOutcome === 'Supressed') suppressed++
        if (datum.vlOutcome === 'NotSupressed') notSuppressed++
        if (datum.vlOutcome === 'Not Done') notDone++
    })
    document.getElementById('tdTotalPatients').innerText = active
    document.getElementById('tdTotalSuppressed').innerText = suppressed + ''
    document.getElementById('tdSuppressionPercentage').innerText = ((suppressed / active) * 100).toFixed(2)
    if (patientSuppressionChart == null) {
        patientSuppressionChart = new Chart(document.getElementById("pieChartSuppression").getContext('2d'), {
            type: 'pie',
            data: {
                labels: ["S", "N.S", "NotDone"],
                datasets: [{
                    data: [300, 50, 40],
                    backgroundColor: ["#00FFCC", "#006699", "#DCDCDC"],
                    hoverBackgroundColor: ["#00FF33", "#0A6AC9", "#C0C0C0"]
                }]
            },
            options: {
                responsive: true
            }
        });
    }
    patientSuppressionChart.data.datasets[0].data = [suppressed, notSuppressed, notDone]
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
        let ctx = document.getElementById("treatmentChart").getContext('2d');
        treatmentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["DTG 1st Line", "DTG 2nd Line", "EFV", "LPV/r 1st Line", "LPV/r 2nd Line", "ATV/r 1st Line", "ATV/r 2nd Line", "Other"],
                datasets: [
                    {
                        label: '<20 Kgs',
                        data: [20, 20, 20, 20, 20, 20, 20, 20],
                        backgroundColor: '#98FF98',
                        borderColor: '#89FF88',
                    },
                    {
                        label: '>=20 Kgs',
                        data: [20, 20, 20, 20, 20, 20, 20, 20],
                        backgroundColor: '#2B60DE',
                        borderColor: '#1F45FC',
                    },
                ],
            },
            options: {
                responsive: true,
                tooltips: {
                    enabled: false
                },
                hover: {
                    animationDuration: 0
                },
                animation: {
                    duration: 1,
                    onComplete: function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                if (meta.hidden) ctx.fillText("", 0, 0)
                                else ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                }
            }
        });
    }
    treatmentChart.data.datasets[0].data = data.under20
    treatmentChart.data.datasets[1].data = data.over20
    treatmentChart.update()

}

function drawPediatricSummaryChart(dataset0, dataset1) {
    if (pediatricSummaryChart == null) {
        // let ctxPA = document.getElementById("pediatricSummaryChart").getContext('2d');
        pediatricSummaryChart = new Chart(document.getElementById("pediatricSummaryChart"), {
            showTooltips: false,
            type: "horizontalBar",
            data: {
                labels: ["Active in mapping tool", "Nutrition assessment(BMI, Zscore, MUAC)",
                    "Disclosure not started", "Disclosure not applicable", "Disclosure ongoing", "Disclosure Completed",
                    "IPT initiated", "IPT Not Started", "IPT Completed"],
                datasets: [
                    {
                        label: "0-14 yrs",
                        data: [22, 33, 55, 12, 86, 23, 14, 45, 34],
                        fill: false,
                        backgroundColor: '#0724ab',
                        borderColor: '#3895D3',
                        borderWidth: 1
                    },
                    {
                        label: "15-19 yrs",
                        data: [22, 33, 55, 12, 86, 23, 14, 45, 34],
                        fill: false,
                        backgroundColor: '#c6961c',
                        borderColor: '#e05e52',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                tooltips: {
                    enabled: false
                },
                hover: {
                    animationDuration: 0
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "No of patients",
                        },
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            drawOnChartArea: true,
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            drawOnChartArea: true,
                        },
                    }]
                },
                animation: {
                    duration: 1,
                    onComplete: function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        this.data.datasets.forEach(function (dataset, i) {
                            let meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                let data = dataset.data[index]
                                if (meta.hidden) ctx.fillText("", 0, 0)
                                else ctx.fillText(data, bar._model.x + 15, bar._model.y + 7)
                            });

                        });
                    }
                },
            }
        });
    }
    pediatricSummaryChart.data.datasets[0].data = dataset0
    pediatricSummaryChart.data.datasets[1].data = dataset1
    pediatricSummaryChart.update()
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
    regimenSuppressionChart.data.datasets = datasets;
    regimenSuppressionChart.update()
}

function drawRegimenSuppressionTable(tableData, options) {

    let regimenSuppressionTable = document.getElementById('regimenSuppressionTable')
    let tbody = regimenSuppressionTable.querySelector('.table_body')
    regimenSuppressionTable.removeChild(tbody)
    let newBody = document.createElement('tbody')
    newBody.classList.add('table_body')
    for (let i = 0; i < options.length; i++) {
        let row = newBody.insertRow(i)
        let rowDatum = tableData[i]
        let rowSuppressed = rowDatum.suppressedValues[0] + rowDatum.suppressedValues[1] + rowDatum.suppressedValues[2] + rowDatum.suppressedValues[3];
        let rowTotals = rowDatum.totals[0] + rowDatum.totals[1] + rowDatum.totals[2] + rowDatum.totals[3];
        let cat0Value = rowDatum.suppressedValues[0], cat0Total = rowDatum.totals[0],
            cat0Perc = rowDatum.suppressedPercentage[0]
        let cat1Value = rowDatum.suppressedValues[1], cat1Total = rowDatum.totals[1],
            cat1Perc = rowDatum.suppressedPercentage[1]
        let cat2Value = rowDatum.suppressedValues[2], cat2Total = rowDatum.totals[2],
            cat2Perc = rowDatum.suppressedPercentage[2]
        let cat3Value = rowDatum.suppressedValues[3], cat3Total = rowDatum.totals[3],
            cat3Perc = rowDatum.suppressedPercentage[3]

        row.insertCell(0).appendChild(document.createTextNode(options[i]))
        row.insertCell(1).appendChild(document.createTextNode(cat0Value + ' (' + cat0Perc + '%)'))
        row.insertCell(2).appendChild(document.createTextNode((cat0Total - cat0Value) + ' (' + (cat0Total === 0 ? 0 : (100 - cat0Perc)).toFixed(2) + '%)'))
        row.insertCell(3).appendChild(document.createTextNode(cat1Value + ' (' + cat1Perc + '%)'))
        row.insertCell(4).appendChild(document.createTextNode((cat1Total - cat1Value) + ' (' + (cat1Total === 0 ? 0 : (100 - cat1Perc)).toFixed(2) + '%)'))
        row.insertCell(5).appendChild(document.createTextNode(cat2Value + ' (' + cat2Perc + '%)'))
        row.insertCell(6).appendChild(document.createTextNode((cat2Total - cat2Value) + ' (' + (cat2Total === 0 ? 0 : (100 - cat2Perc)).toFixed(2) + '%)'))
        row.insertCell(7).appendChild(document.createTextNode(cat3Value + ' (' + cat3Perc + '%)'))
        row.insertCell(8).appendChild(document.createTextNode((cat3Total - cat3Value) + ' (' + (cat3Total === 0 ? 0 : (100 - cat3Perc)).toFixed(2) + '%)'))
        row.insertCell(9).appendChild(document.createTextNode(rowSuppressed + '/' + rowTotals + ' (' + (rowTotals === 0 ? 0 : ((rowSuppressed / rowTotals) * 100).toFixed(2)) + '%)'))
    }
    regimenSuppressionTable.appendChild(newBody)
}

function calculateAge(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}
