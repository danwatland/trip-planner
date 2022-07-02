const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static('dist'));

app.get('*', (req, res) => {
    res.render('index.html');
});

app.listen(80, () => {
    console.log('Server listening at port 80');
});