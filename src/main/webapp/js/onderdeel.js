openOnderdeel("toevoegen");

/* 
 * Clickables Tabel Toevoegen/Verwijderen/Wijzigen
 * */

$(document).on('click', '#deleteButton', function(e) {
	deleteOnderdeel(e.target.value);
});

$(document).on('click', '#wijzigButton', function(e) {
	//console.log(e.target.value);
});

$("#toevoegButton").click(function() {
	toevoegenOnderdeel();
});

$("#button-voorraadinzien").click(function() {
	zoekopdracht = $("#voorraadinzien-zoekbalk").val();
	getOnderdelen("voorraadinzien", zoekopdracht);
});

/*
 * Menu links
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

function toevoegenOnderdeel() {
    var formData = new FormData(document.querySelector("#onderdeel-toevoegen"));
    var encData = new URLSearchParams(formData.entries());
    
    fetch("restservices/onderdelen", { method: 'POST', body: encData})
    	.then(function (response) {
    		alert($("#onderdeelToevoegen_naam").val() + " toegevoegd!");
    		
    		$("#onderdeelToevoegen_naam").val("");
    		$("#onderdeelToevoegen_prijs").val("");
    		$("#onderdeelToevoegen_beschrijving").val("");
    		//console.log("toevoegen: ", response);
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
	            			"<td><button value='" + x.onderdeel_nr + "' id='wijzigButton' type='button'>Wijzig</button></td>" +
	        			"</tr>");
            	}
            }
            if(page == "voorraadinzien") {
            	$("#tableBody-voorraadinzien").empty();
            	for (const i in myJson) {
            		const x = myJson[i];
            		
            		if(zoekveld.length > 0) {
//            			console.log("xnaam: " + x.naam);
//            			console.log("contains: " + x.naam.includes(zoekveld));
//            			console.log("zoekveld: " + zoekveld);
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