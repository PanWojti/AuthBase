const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
const passport = require('passport');
const passportConfig = require('./config/passport');
const session = require('express-session');

// set handlebars as view engine
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

// standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

//start session
app.use(session({
  secret: 'whatEver321',
  resave: true,
  saveUninitialized: true
}));
//Integrate passport with app
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
