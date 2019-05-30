const express = require('express');
const session = require('express-session');
const { Firestore } = require('@google-cloud/firestore');
const { FirestoreStore } = require('@google-cloud/connect-firestore');

const app = express();


app.use(
    session({
        store: new FirestoreStore({
            dataset: new Firestore({
                kind: 'express-sessions',
            }),
        }),
        secret: 'my-secret',
        resave: false,
        saveUninitialized: true,
    })
);

const greetings = ['Hello World', 'Hallo Welt', 'Hola mundo', 'Salut le Monde', 'Ciao Mondo'];

app.get('/', (req, res) => {
    console.log(req.session.id);
    if (!req.session.views) {
        req.session.views = 0;
        req.session.greeting = greetings[Math.floor(Math.random() * 5)]
    }
    const views = req.session.views++;
    res.send(`${views} views for "${req.session.greeting}"`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});