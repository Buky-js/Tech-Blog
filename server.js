const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 3001;
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'handlebars');
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);

const sess = {
    secret: 'very coded secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

sequelize.sync({
    force: false
}).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}.`)
    })
})