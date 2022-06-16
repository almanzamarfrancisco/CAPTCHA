const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// View engine setup
app.set('view engine', 'ejs');
var captchaText = ""
router.get('/',function(req,res){
	let content = ""
	const obj = setStyle()
	console.log("Obtained", obj.bgimage, obj.color)
	res.render('index', {"content":content, "bgimage":obj.bgimage, "color":obj.color});
});
router.get('/captcha',function(req,res){
	const { Captcha } = require('captcha-canvas');
	const { writeFileSync } = require('fs');
	const captcha = new Captcha(); //create a captcha canvas of 100x300.
	captcha.async = false //Sync
	captcha.addDecoy(); //Add decoy text on captcha canvas.
	captcha.drawTrace(); //draw trace lines on captcha canvas.
	captcha.drawCaptcha(); //draw captcha text on captcha canvas.

	console.log(captcha.text); //log captcha text. 
	captchaText = captcha.text
	writeFileSync('public/images/captcha.png', captcha.png); //create 'captcha.png' file in your directory.
	res.render('captcha');
});
router.post('/captcha', function(req,res){
	res.setHeader('Content-Type', 'application/json');
	console.log(captchaText, req.body.answer, captchaText == req.body.answer)
	let response = {passed: "false"}
	if(captchaText == req.body.answer)
		response.passed = "true"
    res.end(JSON.stringify(response, null, 3));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

const setStyle = () => {
	let number = Math.floor(Math.random() * 3)
	let randomColor = Math.floor(Math.random()*16777215).toString(16);
	return {bgimage: `images/captcha-bg${number}.png`, color: `#${randomColor}`}
}