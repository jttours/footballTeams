const fs = require('fs');
const os = require('os');

const express = require('express');
const bodyParser = require('body-parser');

const phoneDb = require('./phone.db');

const PORT = 15500;
const app = express();
app.use(bodyParser.json());

app.get('/phone', function(req, res) {
    phoneDb.read(function(err, phonesData) {
        if (err) return res.status(500).send('The phone with the given id was not found.');

        res.json(phonesData);
    });
});

app.post('/phone', function(req, res) {
    const phone = req.body;
    phoneDb.create(phone, function(err, phoneData) {
        if (err) return res.status(500).send(err);

        res.status(201).json(phoneData);
        //console.log(phoneData);

        // var jsonContent = JSON.stringify(phoneData);
        // console.log(jsonContent);

        // fs.appendFile("phones.json", jsonContent, function(err) {
        //     if (err) {
        //         console.log("An error occured while writing JSON Object to File.");
        //         return console.log(err);
        //     }

        //     console.log("JSON file has been saved.");
        // });
    });
});

app.put('/phone', (req, res) => {
    const phone = req.body;
    phoneDb.update(phone, function(err, success) {
        if (err) return res.status(500).send();

        res.status(200).json(success);
    });
});

app.delete('/phone', function(req, res) {
    const { phone_id } = req.query;
    phoneDb.remove(phone_id, function(err, data) {
        if (err) return res.status(500).send();

        res.status(204).send();
    });
});


app.listen(PORT, () => console.log(`server started at port ${PORT}`));










// node modules imports





// const express = require('express');
// const bodyParser = require('body-parser');

// my modules imports
// const phoneDb = require('./phone.db');

// configurations
// const PORT = 14400;
// const app = express();
// app.use(bodyParser.json());

// CRUD operations (Create (post), Read (get), Update (put), Delete)

// app.get('/phone', function(req, res) {
//     phoneDb.read(function(err, phonesData) {
//         if (err) return res.status(500).send();

//         res.json(phonesData);
//     });
// });

// app.post('/phone', function(req, res) {
//     const phone = req.body;
//     phoneDb.create(phone, function(err, phoneData) {
//         if (err) return res.status(500).send(err);

//         res.status(201).json(phoneData);
//     });
// });



// app.put('/phone', function (req, res) {
//     const phone = req.body;
//     phoneDb.update(phone, function (err, success) {
//         if (err) return res.status(500).send();

//         res.status(200).json(success);
//     });
// });

// app.delete('/phone', function (req, res) {
//     const { phone_id } = req.query;
//     teamDb.remove(phone_id, function (err, data) {
//         if (err) return res.status(500).send();

//         res.status(204).send();
//     });
// });

// app.listen(PORT, () => console.log(`server started at port ${PORT}`));