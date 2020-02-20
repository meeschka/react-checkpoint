const PhoneReminder = require('./models/phonereminder')
require('dotenv').config();

function sendNotifications() {
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const now = new Date().getTime()
    let phoneList = []
    PhoneReminder.find({ datetime: { $lte: now}}, function(err, reminders){
        if (err) {console.log(err)} else {
            reminders.forEach(reminder => {
                phoneList.push(reminder.phoneNum)
            })
            PhoneReminder.deleteMany({ datetime: {$lte: now}}, function(err){
                console.log(err)
            })
        }
    })
    console.log(phoneList)
    phoneList = [16474548976]
    phoneList.forEach(function(phoneNum) {
        const options = {
            to: `+${phoneNum}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            body: `Hi from checkpoint! This is your reminder to log your daily progress and persue your goals :)`,
        };

        client.messages.create(options, function(err, response) {
            if (err) {
                console.error(err);
            } else {
                console.log(`Message sent `);
            }
        });
    });
}
sendNotifications()