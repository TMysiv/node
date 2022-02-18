const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

const users = [];

app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/users', ({query}, res) => {
    if (Object.keys(query).length) {
        let array = [...users];
        if (query.age) {
            array = array.filter(arr => arr.age === query.age);
        }
        if (query.city) {
            array = array.filter(arr => arr.city === query.city);
        }
        res.render('users', {users: array})
        return
    }
    res.render('users', {users})
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const oneUser = users.find(user => user.id === +id);
    res.render('oneUser', {oneUser});
    if (!oneUser) {
        res.redirect('notFound')
    }
})

app.get('/error', (req, res) => {
    res.render('error')
});

app.get('/signIn',(req,res)=>{
    res.render('signIn')
})

app.post('/login', ({body}, res) => {
    const sameEmail = users.find(user => user.email === body.email);
    if (sameEmail) {
        res.redirect('/error')
    } else {
        users.push({...body, id: users.length ? users[users.length - 1].id + 1 : 1})
        res.redirect('/users')
    }
});

app.post('/signIn',({body},res)=>{
    const oneUser = users.find(user => user.email === body.email);
    const samePassword = users.find(user => user.password === body.password);
    if (oneUser && samePassword){
        res.render('oneUser',{oneUser})
    }
})

app.use((req, res) => {
    res.render('notFound')
});

app.listen(5000, () => {
    console.log('Server started')
});
