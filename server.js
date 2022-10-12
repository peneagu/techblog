const path = require('path');
const routes = require('./controllers');

const express = require('express');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
    helpers
});
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);


app.set( 'handlebars', 'view engine');


app.use(express.json());

app.use(session(sess));

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    saveUninitialized: true,
    resave: false,
    store: new SequelizeStore({
        db: sequelize,
        expiration: 1000 * 60 * 30,
        checkExpirationInterval: 1000 * 60 * 10 
 
    })
};

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}

));

app.use(routes);

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
});
