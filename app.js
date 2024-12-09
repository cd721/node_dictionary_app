import express from 'express';
const app = express();
import exphbs from 'express-handlebars';
import routes from './routes/index.js'; // Import your route definitions

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars setup
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers: {
    inc: (value) => parseInt(value) + 1
  }
}));
app.set('view engine', 'handlebars');

// Use the routes defined in routes/index.js
routes(app);

// Start the server
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

export default app;