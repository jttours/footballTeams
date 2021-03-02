function remove(phoneId, callback) {
    fs.readFile('phones.json', function readFileCallback(err, data) {
        obj = JSON.parse(data);

        const phone = obj.phones.find(p => p.id === phoneId);
        obj.phones.splice(obj.phones.indexOf(phone) - 1, 1);
        callback(null, true);
    });
}