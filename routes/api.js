// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Profile = require('../models/Profile')
const Team = require('../models/Team')

// Reading routes
router.get('/profile', (req,res) => {

	//const query = req.query

	let filters = req.query
	if (req.query.age != null) {
		filters = {
			age: {$gt: req.query.age}
		}
	}

	Profile.find(filters)
	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: profiles
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})


/* Testing update (Should be done with a put instead of get) 
 * NON-RESTful
 */
router.get('/profile/update', (req,res) => {
	const query = req.query
	const profileId = query.id
	delete query['id']

	Profile.findByIdAndUpdate(profileId, query, {new:true})
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Failed to update profile ' + profileId + ' \n ' + err.message
		})
	})
})
/* ... End testing update */

/**
 * Testing Remove using get (should be done using delete) ...
 * NON-RESTful
 */
router.get('/profile/remove', (req,res) => {
	const query = req.query
	const profileId = query.id

	Profile.findByIdAndRemove(profileId)
	.then(data => {
		res.json({
			confirmation: 'success',
			message: 'Profile ' + profileId + ' successfully removed.'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Failed to remove profile ' + profileId + ' \n ' + err.message
		})
	})
})

/* ... End testing Remove */

router.get('/profile/:id', (req,res) => {

	const id = req.params.id

	Profile.findById(id)
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Profile (' + id + ') not found!'
		})
	})

})

router.get('/team', (req,res) => {
	let filters = req.query

	Team.find(filters)
	.then(teams => {
		res.json({
			confirmation: 'success',
			data: teams
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})

/**
 * Testing Update using get (put should be used instead) ...
 * NON-RESTful
 */
router.get('/team/update', (req,res) => {
	const query = req.query
	const teamId = query.id
	delete query['id']

	Team.findByIdAndUpdate(teamId, query, {new:true})
	.then(team => {
		res.json({
			confirmation: 'success',
			data: team
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Failed to update team ' + teamId + ' \n ' + err.message
		})
	})
})
/* ... End Testing Update using get */



router.get('/team/:id', (req,res) => {
	
	const id = req.params.id

	Team.findById(id)
	.then(team => {
		res.json({
			confirmation: 'success',
			data: team
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Team (' + id + ') not found!'
		})
	})

})
// End Reading routes


// Create routes
router.post('/profile', (req,res) => {

	Profile.create(req.body)
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Failed to add profile!\n' + err.message
		})
	})
})

router.post('/team', (req,res) => {

	Team.create(req.body)
	.then(team => {
		res.json({
			confirmation: 'success',
			data: team
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Failed to add team!\n' + err.message
		})
	})
})


// End Create routes

/*  This is a sample API route. */
/*
router.get('/:resource', (req, res) => {
	res.json({
		confirmation: 'success',
		resource: req.params.resource,
		query: req.query // from the url query string
	})
})

router.get('/:resource/:id', (req, res) => {
	res.json({
		confirmation: 'success',
		resource: req.params.resource,
		id: req.params.id,
		query: req.query // from the url query string
	})
})
*/

module.exports = router
