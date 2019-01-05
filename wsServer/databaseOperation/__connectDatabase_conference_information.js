let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
    conferenceId: {type: String, default: ""},
    member: [String],
    timeStamp: Date
});
let db = mongoose.connection;
let collectionName = 'conference_information';
let dbConnection = mongoose.model('conference_information', UserSchema, collectionName);
mongoose.connect('mongodb://localhost:27017/local',{ useNewUrlParser: true });

db.once('open', function () {
    console.log("Mongo is working!");
});
db.once('close', function () {
    console.log("Mongo is closed!")
});

dbConnection.insertData = function (insertObj) {
    dbConnection.create(insertObj, function (err) {
        if (err) {
            console.log("insert data failure!");
        } else {
            console.log("insert data success!");
        }
    });
}

dbConnection.findData = function (target) {
    dbConnection.find(target, function (err, data) {
        if (err) {
            console.log("find failure!");
        } else {
            console.log("find success!");
            data.forEach((item) => console.log(item));
        }
    });
}

dbConnection.updateData = function (searchData, updateData) {
    dbConnection.findOneAndUpdate(searchData, updateData, function (err, data) {
        if (err) {
            console.log("update failure!");
        } else {
            console.log("update success!");
        }
    });
}

module.exports = dbConnection



