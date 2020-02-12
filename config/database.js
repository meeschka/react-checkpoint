const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,
    {useNewUrlParser: true,
    useUnifiedTopology: true}
)

let db = mongoose.connection;
db.on('connected', function(){
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

module.exports = mongoose;