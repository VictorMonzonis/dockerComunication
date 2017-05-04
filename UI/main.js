var mongoose = require('mongoose');

// Set a var in powershell: $env:NODE_ENV="deb4"; node .\UI\main.js
// with that we could distinguish if is executed from local host or from a docker container
console.log('##We are in: ' + process.env.NODE_ENV);

console.log("##Waiting for mongo")
setTimeout(function () { // we add a delay, It can be that the mongo DB still openning
  console.log("##End waiting for mongo")

  // mymongo is the name of mongoDB in the docker container, because: $> docker run --name mymongo -p 27017:27017 -d mongo
  // that works because they share docker network (take a glance at docker-compose.yml)
  mongoose.connect('mongodb://mymongo/myappdatabase');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, '##connection error:'));
  db.once('open', function () {
    // we're connected!
    var kittySchema = mongoose.Schema({
      name: String
    });

    var Kitten = mongoose.model('Kitten', kittySchema);
    var silence = new Kitten({ name: 'Silence' });
    console.log(silence.name); // 'Silence'
    silence.save(function (err, fluffy) {
      if (err)
        return console.error(err);
      else {
        console.log("##Added into the Mongo DB!!");
      }
    });

    Kitten.find({ name: /^Silence/ }, function (err, kittens) {
      console.log("##It has been inserted in the DB");
    })

  });
}, 10000);
