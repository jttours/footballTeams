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

                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data);
                    if (obj.phones.find(p => p.id === phone.id)) {
                        return callback('phone already exist');
                    }
                    obj.phones.push(phone);
                    var jsonContent = JSON.stringify(obj);


                    //let json = JSON.stringify(obj);
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