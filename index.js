const express = require('express');
const path = require('path')
const app = express();
const port = 3001;
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

app.get('/forgot-password', (req, res) => {
    res.render('forgotpassword.ejs', {
        message: '',
        uuid: '',
        clientId: '',
        emailOrPhone: '',
        countryCode: '+91'
    });
});

app.post('/auth/forgot-password/', (req, res) => {
    const emailOrPhone = req.body.contactNumber || req.body.email || '';
    const countryCode = req.body.countryCode || '+91';

    res.render('forgotpassword.ejs', {
        message: 'If this account exists, a reset link has been sent.',
        uuid: req.body.interactionId || '',
        clientId: req.body.clientId || '',
        emailOrPhone,
        countryCode
    });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});