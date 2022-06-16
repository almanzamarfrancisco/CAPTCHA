const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static('public'))
// View engine setup
app.set('view engine', 'ejs');

router.get('/',function(req,res){
	let content = ""
	const obj = setStyle()
	console.log("Obtained", obj.bgimage, obj.color)
	res.render('index', {"content":content, "bgimage":obj.bgimage, "color":obj.color});
});
router.get('/recaptcha',function(req,res){
	res.render('recaptcha');
});
router.post('/recaptcha',function(req,res){
	res.render('successrecaptcha');
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