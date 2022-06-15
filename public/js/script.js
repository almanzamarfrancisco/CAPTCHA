const reloadBtn = document.querySelector(".reload-btn"),
inputField = document.querySelector(".input-area input"),
checkBtn = document.querySelector(".check-btn"),
statusTxt = document.querySelector(".status-text");

document.addEventListener('contextmenu', event => event.preventDefault());

//storing all captcha characters in array
const allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function getCaptcha(){
	let ftext = document.querySelector(".ftext")
	ftext.textContent  = ""
	for (let i = 0; i < 6; i++) { //getting 6 random characters from the array
		let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
		ftext.textContent  += ` ${randomCharacter}`; //passing 6 random characters inside captcha
	}
	console.log(ftext.textContent.replace(/\s/g, ''))
}
getCaptcha()
//calling getCaptcha & removeContent on the reload btn click
reloadBtn.addEventListener("click", ()=>{
	removeContent();
	location.reload()
});
checkBtn.addEventListener("click", e =>{
	e.preventDefault(); //preventing button from it's default behaviour
	statusTxt.style.display = "block";
	//adding space after each character of user entered values because I've added spaces while generating captcha
	ftextcmp = ftext.textContent.replace(/\s/g, '')
	let inputVal = inputField.value.replace(/\s/g, '');
	if(inputVal == ftextcmp){ //if captcha matched
		statusTxt.style.color = "#4db2ec";
		statusTxt.innerText = "Nice! You don't appear to be a robot.";
		setTimeout(()=>{ //calling removeContent & getCaptcha after 3 seconds
			removeContent();
			getCaptcha();
		}, 3000);
	}else{
		statusTxt.style.color = "#ff0000";
		statusTxt.innerText = "Captcha not matched. Please try again!";
	}
});
function removeContent(){
 inputField.value = "";
 ftext.textContent = "";
 statusTxt.style.display = "none";
}