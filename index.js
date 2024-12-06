const express = require('express');
const path = require('path')
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index.ejs', { username: 'Guest' });
});


app.get('/login', (req, res) => {
    // const { username } = req.body;
    res.render('login.ejs'); 
});

app.get('/signup', (req, res) => {
    // const { username } = req.body;
    res.render('signup.ejs'); 
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});