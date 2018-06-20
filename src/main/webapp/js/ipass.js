function login() {
    var formData = new FormData(document.querySelector("#loginForm"));
    var encData = new URLSearchParams(formData.entries());

    fetch("restservices/authentication", { method: 'POST', body: encData })
        .then(function(response) {
            if (response.ok) {
                window.location.href = "index.html";
                //console.log("Login successful.");
                $("#errorline").addClass('d-none');
                return response.json();
            }
            else {
            	$("#errorline").removeClass('d-none');
                //console.log("Login failed.");
                // document.querySelector("#error").style.display = 'block';
            }
        })
        .then(myJson => window.sessionStorage.setItem("myJWT", myJson.JWT))
        .catch(error => console.log(error));
}
function logout() {
    window.sessionStorage.removeItem("myJWT");
    window.location.href = "login.html";
}

var inloggen = document.querySelector("#login");
if (inloggen) {
    inloggen.addEventListener("click", login);
}
var uitloggen = document.querySelector("#logout");
if (uitloggen) {
    uitloggen.addEventListener("click", logout);
}