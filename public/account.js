let twitchHash = localStorage.twitchHash = document.location.hash.substr(1); // Remove the hashtag
let parsedHash = parseHash(twitchHash);
let id_token = localStorage.id_token = parsedHash.id_token;
let access_token = localStorage.access_token = parsedHash.access_token;
let scope = localStorage.scope = parsedHash.scope;

getXMLDoc("https://id.twitch.tv/oauth2/keys",(response)=>{
	let isValid = KJUR.jws.JWS.verifyJWT(
		id_token,
		KEYUTIL.getKey(response.keys[0]),
		{alg: ['RS256']}
	);
	
	/* Log validity */
	console.log(isValid);
	
	let result;
	if (isValid){
		let jws = new KJUR.jws.JWS();
		jws.parseJWS(id_token);
		localStorage.parsedJWT = jws.parsedJWS.payloadS;
		result = JSON.parse(jws.parsedJWS.payloadS);
	}
	
	function feedbackValidation(validity){
		if (validity){
			document.getElementById("load").style.display = "none";
			document.getElementById("verify").style.color = "#2f2";
			document.getElementById("verify").innerHTML = "Verified!";
			
			document.getElementById("result").style.display = "block";
			document.getElementById("name").innerHTML = result.preferred_username;
		} else {
			let dancers = document.getElementsByClassName("dancer");
			for (let d of dancers){
				d.style.display = "none";
			}
			document.getElementById("load").style.display = "none";
			document.getElementById("verify").style.color = "#d00";
			document.getElementById("verify").innerHTML = "Failed to verify D:";
		}
	}
	
	if (document.readyState === "interactive" || document.readyState === "complete"){
		feedbackValidation(isValid);
	} else {
		window.addEventListener("DOMContentLoaded",()=>{
			feedbackValidation(isValid);
		},false);
	}
});

function getXMLDoc(doc,callback){
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			callback(xmlhttp.response);
  		}
	}
	xmlhttp.open("GET",doc,true);
	xmlhttp.responseType = "json";
	xmlhttp.setRequestHeader("Accept", "application/json");
	xmlhttp.send();
}

function parseHash(hash){
	var arr = hash.split("&");
	var obj = {};
	for (let val of arr){
		var keyval = val.split("=");
		obj[keyval[0]] = keyval[1];
	}
	return obj;
}