const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
var fs = require('fs');
const path = require('path');

module.exports = (upload) => {
	/*
        POST: Upload a single image/file to Image collection
    */
	router
		.route('/updateDisplayPic')
		.post(upload.single('profileImg'), auth, (req, res, next) => {
			const url = req.protocol + '://' + req.get('host');
			Profile.findOne({ user: req.user.id })
				.then((profile) => {
					//delete previous pic if exists
					if (profile.displayPic.filePath != '') {
						fs.unlink(path.join(__basedir, profile.displayPic.filePath), function (
							error
						) {
							if (error) {
								console.log(error);
								return;
							}
							console.log('Deleted file :', profile.displayPic.filePath);
						});
					}
					//change picture
					profile.displayPic = {
						fileUrl  : url + '/assets/userDp/' + req.file.filename,
						filePath : 'public/assets/userDp/' + req.file.filename
					};
					profile
						.save()
						.then((result) => {
							res.status(200).json(result);
						})
						.catch((err) => res.status(500).json(err));
				})
				.catch((err) => res.status(500).json(err));
		});

	return router;
};
