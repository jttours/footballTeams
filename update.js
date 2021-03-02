function update(phone, callback) {
    fs.readFile('phones.json', function readFileCallback(err, data) {
        obj = JSON.parse(data);
        if (obj.phones.find(p => p.id === phone.id)) {
            const _phone = obj.phones.find(p => p.id === phone.id);
            let newPhone = Object.assign(_phone, phone);
            obj.phones.splice(phones.indexOf(_phone), 1, newPhone);

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
            return callback('phone does not exist');
        }
    })




    callback(null, true);
}