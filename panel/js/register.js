
var btnRegister = document.getElementById('btnRegister');
var inputNames = document.getElementById('inputNames');
var inputPassword = document.getElementById('inputPassword');
var inputRepeatPassword = document.getElementById('inputRepeatPassword');
const loginError = document.getElementById("loginError");


btnRegister.addEventListener('click', ()=>{
    let names = inputNames.value;
    let password = inputPassword.value;
    let confirmPassword = inputRepeatPassword.value;
    let error = false;
    if(names.length <1){
        error = true;
    }
    if(password.length < 4){
        error = true;
    }
    if(confirmPassword != password){
        error = true;
    }
    if(error) return;
    $.ajax({
        type : "POST",
        url: "datascript?request=register",
        data: {
            names: names,
            password: password
        },
        success : function(){
            window.open("login.html");
        },
        error : function(err){
            loginError.classList.add('errors-showing');
        }
    });

});