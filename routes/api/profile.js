const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const axios = require('axios');
const mongoose = require('mongoose');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user : req.user.id
		}).populate('user', [ 'name', 'avatar' ]);

		if (!profile) {
			return res.status(400).json({ msg: 'There is no profile for this user' });
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'status is required').not().isEmpty(),
			check('expertise', 'plese mention your expertise').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
		}
		const {
			organization,
			location,
			website,
			bio,
			expertise,
			status,
			research_publications,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook
		} = req.body;
		//build profilefield
		const profileFields = {
			user                  : req.user.id,
			organization,
			location,
			website               :
				website && website !== '' ? normalize(website, { forceHttps: true }) : '',
			bio,
			expertise             : Array.isArray(expertise)
				? expertise
				: expertise.split(',').map((skill) => ' ' + skill.trim()),
			status,
			research_publications : Array.isArray(research_publications)
				? research_publications
				: research_publications.split(',').map((rp) => ' ' + rp.trim())
		};

		// Build social object and add to profileFields
		const socialfields = { youtube, twitter, instagram, linkedin, facebook };

		//combine both profile and social obj
		for (const [ key, value ] of Object.entries(socialfields)) {
			if (value && value.length > 0)
				socialfields[key] = normalize(value, { forceHttps: true });
		}
		profileFields.social = socialfields;

		try {
			// Using upsert option (creates new doc if no match is found):
			let profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true, upsert: true, setDefaultsOnInsert: true }
			);
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [ 'name', 'avatar' ]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});
// @route    post api/profilesByIds
// @desc     Get  dp by User Ids
// @access   Public
router.post('/dpByIds', async (req, res) => {
	try {
		const profiles = await Profile.find({
			user : {
				$in : req.body.userIds.map((id) => {
					return mongoose.Types.ObjectId(id);
				})
			}
		}).select([ 'displayPic', 'user' ]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async ({ params: { user_id } }, res) => {
	try {
		const profile = await Profile.findOne({
			user : user_id
		}).populate('user', [ 'name', 'avatar' ]);

		if (!profile) return res.status(400).json({ msg: 'Profile not found' });

		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server error' });
	}
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
	try {
		// Remove user posts
		await Post.deleteMany({ user: req.user.id });
		// Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		// Remove user
		await User.findOneAndRemove({ _id: req.user.id });

		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('organization', 'organization is required').not().isEmpty(),
			check('from', 'From date is required and needs to be from the past')
				.not()
				.isEmpty()
				.custom((value, { req }) => (req.body.to ? value < req.body.to : true))
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, organization, location, from, to, current, description } = req.body;

		const newExp = {
			title,
			organization,
			location,
			from,
			to,
			current,
			description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.experience.unshift(newExp);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		const foundProfile = await Profile.findOne({ user: req.user.id });

		foundProfile.experience = foundProfile.experience.filter(
			(exp) => exp._id.toString() !== req.params.exp_id
		);

		await foundProfile.save();
		return res.status(200).json(foundProfile);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Server error' });
	}
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'School is required').not().isEmpty(),
			check('degree', 'Degree is required').not().isEmpty(),
			check('fieldofstudy', 'Field of study is required').not().isEmpty(),
			check('from', 'From date is required and needs to be from the past')
				.not()
				.isEmpty()
				.custom((value, { req }) => (req.body.to ? value < req.body.to : true))
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { school, degree, fieldofstudy, from, to, current, description } = req.body;

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.education.unshift(newEdu);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		const foundProfile = await Profile.findOne({ user: req.user.id });
		foundProfile.education = foundProfile.education.filter(
			(edu) => edu._id.toString() !== req.params.edu_id
		);
		await foundProfile.save();
		return res.status(200).json(foundProfile);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Server error' });
	}
});

// @route    get api/profile/article/:user_id
//@desc get article links
//@access public

router.get('/article/:user_id', async ({ params: { user_id } }, res) => {
	try {
		const article = await Profile.find(
			{ user: user_id },
			{
				research_publications : 1
			}
		);

		if (!article) return res.status(400).json({ msg: 'Profile not found' });
		const urls = article[0].research_publications.map((url) => url);
		if (urls.length == 0) {
			return res.status(400).json({ msg: 'No publications' });
		}
		const urlData = await Promise.all(
			urls.map(async (url) => {
				let graphRes = await axios.post(
					`https://graph.facebook.com/v8.0/?scrape=true&id=${url}&access_token=755123608679060%7CRhH1lgF-p5r_WEXAQTkU6w7wne4`
				);
				return graphRes.data;
			})
		);

		return res.json(urlData);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server error' });
	}
});

module.exports = router;
