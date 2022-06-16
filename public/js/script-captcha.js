const reloadBtn = document.querySelector(".reload-btn"),
inputField = document.querySelector(".input-area input"),
checkBtn = document.querySelector(".check-btn"),
statusTxt = document.querySelector(".status-text");

document.addEventListener('contextmenu', event => event.preventDefault());


//calling getCaptcha & removeContent on the reload btn click
reloadBtn.addEventListener("click", ()=>{
	removeContent();
	location.reload()
});
checkBtn.addEventListener("click", e =>{
	e.preventDefault(); //preventing button from it's default behaviour
	statusTxt.style.display = "block";
	let inputVal = inputField.value.replace(/\s/g, '');
	postData('http://localhost:3000/captcha', { answer: inputVal })
		.then(data => {
			if(data.passed == 'true'){ //if captcha matched
				statusTxt.style.color = "#4db2ec";
				statusTxt.innerText = "Nice! You don't appear to be a robot.";
				setTimeout(()=>{ //calling removeContent & getCaptcha after 3 seconds
					removeContent();
				}, 3000);
			}else{
				statusTxt.style.color = "#ff0000";
				statusTxt.innerText = "Captcha not matched. Please try again!";
			}
			console.log(data); // JSON data parsed by `data.json()` call
	});
});
function removeContent(){
	inputField.value = "";
	statusTxt.style.display = "none";
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}