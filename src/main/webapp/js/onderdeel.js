openOnderdeel("toevoegen");

/* 
 * Clickables Tabel Toevoegen/Verwijderen/Wijzigen
 * */

$(document).on('click', '#deleteButton', function(e) { //knop verwijderen onderdeel
	deleteOnderdeel(e.target.value);
});

$(document).on('click', '#wijzigButton', function(e) { //knop wijzigen onderdeel
	$("#onderdeelWijzigen_naam").val(e.target.value);
});

$("#onderdeelWijzigen_button").click(function() { //knop opslaan bij wijzig scherm
	onderdeelNaam = $("#onderdeelWijzigen_naam").val();
	if(onderdeelNaam.length > 0 && onderdeelNaam != null) {
		wijzigOnderdeel(onderdeelNaam);
	}
});

$("#toevoegButton").click(function() { //knop toevoegen onderdeel
	toevoegenOnderdeel();
});

$("#button-voorraadinzien").click(function() { //knop zoeken voorraadinzien scherm
	zoekopdracht = $("#voorraadinzien-zoekbalk").val();
	getOnderdelen("voorraadinzien", zoekopdracht);
});

/*
 * Menu links aan linkerzijde van scherm
 */

$("#onderdeelToevoegen").click(function() {
	openOnderdeel("toevoegen");
	});

$("#onderdeelVerwijderen").click(function() {
	openOnderdeel("verwijderen");
	});

$("#onderdeelWijzigen").click(function() {
	openOnderdeel("wijzigen");
	});

$("#onderdeelVoorraadInzien").click(function() {
	openOnderdeel("voorraadinzien");
	});

$("#logout").click(function() {
	logout();
	});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

/*
 * Functies mbt ophalen/versturen van gegevens
 */

function clearFields(pagina) {
	if(pagina == "wijzigen") {
		$("#onderdeelWijzigen_naam").val("");
		$("#onderdeelWijzigen_prijs").val("");
		$("#onderdeelWijzigen_beschrijving").val("");
	}
	else if(pagina == "toevoegen") {
		$("#onderdeelToevoegen_naam").val("");
		$("#onderdeelToevoegen_prijs").val("");
		$("#onderdeelToevoegen_beschrijving").val("");
	}
}

function wijzigOnderdeel(naam) {
    var formData = new FormData(document.querySelector("#onderdeel-wijzigen"));
    var encData = new URLSearchParams(formData.entries());

    fetch("restservices/onderdelen/" + naam, { method: 'PUT', body: encData })
    .then(function(response) {
    	//console.log("wijzigen: ", response);
    	if(response.ok) {
    		alert(naam + " is gewijzigd!");
    	}
    	else {
    		alert("Fout bij wijzigen!");
    	}
    	clearFields("wijzigen");
		
		openOnderdeel("wijzigen");
    });
}

function toevoegenOnderdeel() {
    var formData = new FormData(document.querySelector("#onderdeel-toevoegen"));
    var encData = new URLSearchParams(formData.entries());
    
    fetch("restservices/onderdelen", { method: 'POST', body: encData})
    	.then(function (response) {
    		if(response.ok) {
    			alert($("#onderdeelToevoegen_naam").val() + " toegevoegd!");
    		}
    		else {
    			alert("Fout bij wijzigen!");
    		}
    		
    		clearFields("toevoegen");
    	});
}

function deleteOnderdeel(onderdeelNaam) {
	//console.log("clicked button val: " + onderdeelNaam);
	
    var formData = new FormData(document.querySelector("#onderdeel-verwijderen"));
    var encData = new URLSearchParams(formData.entries());
    
    fetch("restservices/onderdelen/" + onderdeelNaam, { method: 'DELETE', body: encData, headers: {'Authorization': 'Bearer ' + window.sessionStorage.getItem("myJWT")} })
    .then(function(response) {
    	if(response.ok) {
    		alert(onderdeelNaam + " is verwijderd.");
    		openOnderdeel("verwijderen");
    	}
    });
}

function getOnderdelen(page, zoekveld = "") {
    fetch("restservices/onderdelen", { method: 'GET', headers: {'Authorization': 'Bearer ' + window.sessionStorage.getItem("myJWT")} })
        .then(response => response.json())
        .then(function (myJson) {
            if(page == "verwijderen") {
            	$("#tableBody-verwijderen").empty();
            	for (const i in myJson) {
            		const x = myJson[i];
	            	$("#tableBody-verwijderen").append(
	        			"<tr>" + 
	            			"<th scope='row'>" + x.onderdeel_nr + "</th>" +
	            			"<td>" + x.naam + "</td>" +
	            			"<td>" + x.prijs + "</td>" +
	            			"<td>" + x.beschrijving + "</td>" +
	            			"<td><button value='" + x.naam + "' id='deleteButton' type='button'>Verwijder</button></td>" +
	        			"</tr>");
            	}
            }
            if(page == "wijzigen") {
            	$("#tableBody-wijzigen").empty();
            	for (const i in myJson) {
            		const x = myJson[i];
	            	$("#tableBody-wijzigen").append(
	        			"<tr>" + 
	            			"<th scope='row'>" + x.onderdeel_nr + "</th>" +
	            			"<td>" + x.naam + "</td>" +
	            			"<td>" + x.prijs + "</td>" +
	            			"<td>" + x.beschrijving + "</td>" +
	            			"<td><button value='" + x.naam + "' id='wijzigButton' type='button'>Wijzig</button></td>" +
	        			"</tr>");
            	}
            }
            if(page == "voorraadinzien") {
            	$("#tableBody-voorraadinzien").empty();
            	for (const i in myJson) {
            		const x = myJson[i];
            		
            		if(zoekveld.length > 0) {
            			if(!x.naam.includes(zoekveld)) continue;
            		}
	            	$("#tableBody-voorraadinzien").append(
	        			"<tr>" + 
	            			"<th scope='row'>" + x.onderdeel_nr + "</th>" +
	            			"<td>" + x.naam + "</td>" +
	            			"<td>" + x.prijs + "</td>" +
	            			"<td>" + x.beschrijving + "</td>" +
	        			"</tr>");
            	}
            }
        });
}

function openOnderdeel(onderdeel) {
	if(onderdeel == "toevoegen") {
		$(".onderdeel-toevoegen").removeClass('d-none');
		$(".onderdeel-verwijderen").addClass('d-none');
		$(".onderdeel-wijzigen").addClass('d-none');
		$(".onderdeel-voorraadinzien").addClass('d-none');
		getOnderdelen("toevoegen");
	}
	if(onderdeel == "verwijderen") {
		$(".onderdeel-verwijderen").removeClass('d-none');
		$(".onderdeel-toevoegen").addClass('d-none');
		$(".onderdeel-wijzigen").addClass('d-none');
		$(".onderdeel-voorraadinzien").addClass('d-none');
		getOnderdelen("verwijderen");
	}
	if(onderdeel == "wijzigen") {
		$(".onderdeel-wijzigen").removeClass('d-none');
		$(".onderdeel-toevoegen").addClass('d-none');
		$(".onderdeel-verwijderen").addClass('d-none');
		$(".onderdeel-voorraadinzien").addClass('d-none');
		getOnderdelen("wijzigen");
	}
	if(onderdeel == "voorraadinzien") {
		$(".onderdeel-voorraadinzien").removeClass('d-none');
		$(".onderdeel-toevoegen").addClass('d-none');
		$(".onderdeel-verwijderen").addClass('d-none');
		$(".onderdeel-wijzigen").addClass('d-none');
		getOnderdelen("voorraadinzien");
	}
}

function logout() {
    window.sessionStorage.removeItem("myJWT");
    window.location.href = "login.html";
}