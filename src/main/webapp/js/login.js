$("#login").click(function() {
	login();
	});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

function login() {
    var formData = new FormData(document.querySelector("#loginForm"));
    var encData = new URLSearchParams(formData.entries());

    fetch("restservices/authentication", { method: 'POST', body: encData })
        .then(function(response) {
            if (response.ok) {
                window.location.href = "home.html";
                //console.log("Login successful.");
                $("#errorline").addClass('d-none');
                openOnderdeel("toevoegen");
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