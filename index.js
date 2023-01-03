const express = require('express')
const app = express()
const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
	username:String,
	email:String,
	phone:String,
	isClient:String,
	subject:String,
	message:String
})

var userModel = mongoose.model('form',Schema)

const connectionString = "mongodb+srv://qirjakoAdmin:password@cluster0.okdkob0.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});
app.use(express.json());
const port = process.env.PORT || 3000
app.use(express.static(__dirname+ '/public/'))
app.get('/',(req,res)=>{
	
	res.sendFile(__dirname+'/index.html')
})

app.post('/api/send',(req,res)=>{
	const params = req.body
	var addForm = new userModel({
		username:params[0].username,
		email:params[3].email,
		isclient:params[1].isClient,
		phone:params[2].phone,
		subject:params[4].subject,
		message:params[5].message
	})


	addForm.save((err)=>{
		if(!err){
			console.log('success')
			res.json({res:'Success'})
		}
		else{
			console.log(err)
			res.json({res:'error'})
		}
	})

})

app.listen(port)