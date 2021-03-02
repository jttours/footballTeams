const fs = require('fs');
const { isNull } = require('util');

// o = {
//     age: '',
//     id: '',
//     imageUrl: '',
//     name: '',
//     snippet: ''
// }

let obj = {
    phones: []
};

// const phones = [];

function read(callback) {
    callback(null, phones);
}



function create(phone, callback) {

    fs.access('phones.json', fs.F_OK, (err) => {
        if (err) {
            console.log('The file does not exist');
            obj.phones.push(phone);
            var jsonContent = JSON.stringify(obj);

            fs.writeFile("phones.json", jsonContent, function(err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }

                console.log("JSON file has been saved.");
                console.log(obj);
            });
        } else {
            fs.readFile('phones.json', function readFileCallback(err, data) {
                obj = JSON.parse(data);

                if (obj.phones.find(p => p.id === phone.id)) {
                    return console.log('Phone already exists'); /*callback('phone already exist')*/ ;
                } else {

                    console.log('object before     - ', obj);


                    obj.phones.push(phone);
                    console.log(obj);
                    var jsonContent = JSON.stringify(obj);


                    fs.writeFile("phones.json", jsonContent, function(err) {
                        if (err) {
                            console.log("An error occured while writing JSON Object to File.");
                            return console.log(err);
                        }

                        console.log("JSON file has been saved.");
                        //console.log(obj);
                    });
                }
            });


            console.log("yes file exists");
        }


    });
    callback(null, phone);
}


function update(phone, callback) {
    fs.readFile('phones.json', function readFileCallback(err, data) {
        obj = JSON.parse(data);
        //console.log(obj);
        if (obj.phones.find(p => p.id === phone.id)) {
            const _phone = obj.phones.find(p => p.id === phone.id);
            let newPhone = Object.assign(_phone, phone);
            obj.phones.splice(obj.phones.indexOf(_phone), 1, newPhone);

            var jsonContent = JSON.stringify(obj);

            fs.writeFile("phones.json", jsonContent, function(err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }

                console.log("JSON file has been saved.");
                //console.log(obj);
            });

        } else {
            console.log('cannot update, phone does not exist');
            return callback('phone does not exist');
        }
    })




    callback(null, true);
}

// function update(phone, callback) {
//     const _phone = phones.find(p => p.id === phone.id);
//     let newPhone = Object.assign(_phone, phone);
//     phones.splice(phones.indexOf(_phone), 1, newPhone);

//     callback(null, true);
// }


function remove(phoneId, callback) {
    fs.readFile('phones.json', function readFileCallback(err, data) {
        obj = JSON.parse(data);

        const phone = obj.phones.find(p => p.id === phoneId);
        obj.phones.splice(obj.phones.indexOf(phone) - 1, 1);
        callback(null, true);

        var jsonContent = JSON.stringify(obj);

        fs.writeFile("phones.json", jsonContent, function(err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
            //console.log(obj);
        });
    });
}
// function remove(phoneId, callback) {
//     const phone = phones.find(p => p.id === phoneId);
//     phones.splice(phones.indexOf(phone) - 1, 1);
//     callback(null, true);
// }


// function update(phone, callback) {
//     const _phone = phones.find(p => p.id === phone.id);
//     // if (!_phone) return res.status(404).send('The phone with the given id was not found.');
//     console.log(_phone);

//     let newPhone = Object.assign(_phone, phone);
//     phones.splice(phones.indexOf(_phone), 1, newPhone);

//     callback(null, true);
// }



module.exports = {
    read: read,
    create: create,
    update: update,
    remove: remove
}