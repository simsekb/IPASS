//console.log("JWT login: " + window.sessionStorage.getItem("myJWT"));

$("#wrapper").toggleClass("toggled");

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
                return response.json();
            }
            else {
            	$("#errorline").removeClass('d-none');
            }
        })
        .then(function(myJson) {
        	window.sessionStorage.setItem("myJWT", myJson.JWT);
        	
            window.location.href = "home.html";
            $("#errorline").addClass('d-none');
            openOnderdeel("toevoegen");
        });
}