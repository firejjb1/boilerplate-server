const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
// "mongodb+srv://shallow:UzmHUKJFHuyBpsau@dev.v0oyv.mongodb.net/warbler?retryWrites=true&w=majority"
mongoose.connect("mongodb://localhost/warbler", {
  keepAlive: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
    console.log('connected')
});
module.exports.User = require("./user");
module.exports.Message = require("./message");