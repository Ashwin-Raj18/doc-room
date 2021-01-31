const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user                  : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'user'
	},
	organization          : {
		type : String
	},
	website               : {
		type : String
	},
	location              : {
		type : String
	},
	status                : {
		type     : String,
		required : true
	},
	expertise             : {
		type     : [ String ],
		required : true
	},
	bio                   : {
		type : String
	},
	research_publications : {
		type : [ String ]
	},
	experience            : [
		{
			title        : {
				type     : String,
				required : true
			},
			organization : {
				type     : String,
				required : true
			},
			location     : {
				type : String
			},
			from         : {
				type     : Date,
				required : true
			},
			to           : {
				type : Date
			},
			current      : {
				type    : Boolean,
				default : false
			},
			description  : {
				type : String
			}
		}
	],
	education             : [
		{
			school       : {
				type     : String,
				required : true
			},
			degree       : {
				type     : String,
				required : true
			},
			fieldofstudy : {
				type     : String,
				required : true
			},
			from         : {
				type     : Date,
				required : true
			},
			to           : {
				type : Date
			},
			current      : {
				type    : Boolean,
				default : false
			},
			description  : {
				type : String
			}
		}
	],
	social                : {
		youtube   : {
			type : String
		},
		twitter   : {
			type : String
		},
		facebook  : {
			type : String
		},
		linkedin  : {
			type : String
		},
		instagram : {
			type : String
		}
	},
	date                  : {
		type    : Date,
		default : Date.now
	},
	displayPic            : {
		fileUrl   : {
			type : String
		},
		filePath  : {
			type : String
		},
		createdAt : {
			default : Date.now(),
			type    : Date
		}
	}
});

module.exports = mongoose.model('profile', ProfileSchema);
