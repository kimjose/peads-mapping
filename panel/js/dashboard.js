const countySelect = document.getElementById('countySelect')
const toSelect = document.getElementById('toSelect')
const facilitySelect = document.getElementById('facilitySelect')
var patientsData = null;


initialize()
//pie
var pieChartOVC = document.getElementById("pieChartOVC").getContext('2d');
var ovcChart = new Chart(pieChartOVC, {
    type: 'pie',
    data: {
        labels: ["Enrolled", "Not Enrolled"],
        datasets: [{
            data: [300, 50],
            backgroundColor: ["#5AD3D1", "#4D360"],
            hoverBackgroundColor: ["#005699", "#4D5360"]
        }]
    },
    options: {
        responsive: true
    }
});

function initialize(){


    countySelect.addEventListener('change', ()=>filterByCounty())
    toSelect.addEventListener('change', ()=>filterByTo())
    facilitySelect.addEventListener('change', ()=>filterByFacility())

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
            tos.forEach( to => {
                let option = document.createElement('option')
                option.value = to.id
                option.appendChild(document.createTextNode(to.names))
                toSelect.appendChild(option)
            })

        }
    })
}

function filterByCounty(){
    let selected = countySelect.options[countySelect.selectedIndex].value
    if (selected === ""){

    } else if (selected == 0){

    } else {

    }
}

function filterByTo(){

}

function filterByFacility(){

}

function loadData(data){

}