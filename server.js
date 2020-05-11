const express = require('express')
const morgan  = require('morgan')
const mongoose = require('mongoose')

const pollController = require('./pollController')

const app = express()

app.set('view engine','ejs')

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) =>{
	res.render('home')
})

app.get('/create', pollController.createPollGetController)
app.post('/create', pollController.createPollPostController)
app.get('/polls', pollController.getAllPolls)

mongoose.connect('mongodb://localhost:27017/express-poll', {useNewUrlParser:true})
	.then(()=>{
		app.listen(4545,() => {
			console.log('Application is running')
		})
	})
	.catch(e => {
		console.log(e)
	})