const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//connect to db
connectDB();

//middleware to recieve json only
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//serve files from server
app.use(express.static(path.join(__dirname, 'public')));

//setting root folder of application
global.__basedir = __dirname;
// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//for uploading to server , url to mongoDB
const uploads = require('./routes/fileUploadHandler');
const fileUploads = require('./routes/api/FileUpload');
app.use('/api/profile', fileUploads(uploads));
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
