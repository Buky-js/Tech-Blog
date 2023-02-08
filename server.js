const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = 3001;


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'handlebars');
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.` )
})