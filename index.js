'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

// Mongoose Server URI
const MONGOOSE_URI = 'mongodb+srv://hanna9:estifaman9@cluster0-s90so.mongodb.net/test?retryWrites=true&w=majority';

// Connect
mongoose.connect(MONGOOSE_URI, {useNewUrlParser: true,});


// Start the web server
require('./src/app.js').start(process.env.PORT);
