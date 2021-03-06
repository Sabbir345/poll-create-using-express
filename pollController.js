const Poll =  require('./Poll')

exports.createPollGetController = (req , res , next) =>{
	res.render('create_poll')
}

exports.createPollPostController = async (req , res , next) => {

	let {title, description,options} = req.body

	options = options.map(opt => {
		return {
			name:opt,
			vote:0
		}
	})

	let poll = new Poll({
		title,
		description,
		options,

	})

	try {
		console.log(res.body)

		await poll.save()

		res.redirect('/polls')
	}catch(e){
		console.log(e)
	}

}

exports.getAllPolls = async (req , res , next) => {
	try{
		let polls = await Poll.find()

		res.render('pollList', {polls})
	}catch (e){
		console.log(e)
	}

}

