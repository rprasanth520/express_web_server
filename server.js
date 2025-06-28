const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3500;

const { logger } = require('./middleware/logEvents');
const errorEvents = require('./middleware/errorEvents');

const cors = require('cors');
const whitelist = ['http://localhost:3500', 'https://example.com']; // Add your allowed origins here
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions)); // Enable CORS with the specified options

app.use(logger); // Use the logger middleware to log requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./router/rootDir')); // Use the root directory router
app.use('/subdir', require('./router/subDir')); // Use the subdirectory router
app.use('/api/employees', require('./router/api/empolyees')); // Use the employees API router

app.all(/.*/, (req, res) => {
    if (req.accepts('html')) {
        res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.status(404).json({ error: '404 Not Found' });
    } else {
        res.type('txt').status(404).send('404 Not Found');
    }
});

app.use(errorEvents); // Use the error handling middleware

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// This code sets up an Express server that serves static files and handles specific routes.
// It serves the index page at the root URL, redirects old pages to new ones, and
// serves a 404 page for any unmatched routes. The server listens on a specified port,
// defaulting to 3500 if not set in the environment variables. The static files are
// served from the 'public' directory, and the views are located in the 'views'
// directory. The server uses JSON and URL-encoded body parsing middleware for handling requests.
// The code also includes redirects for old pages to ensure users are directed to the correct content.