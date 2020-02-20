const Checkpoint = require('./models/checkpoint')
const EmailReminder = require('./models/emailreminder')
const emailjs = require('emailjs')

const sendEmails = () => {
    const now = new Date().getTime()
    console.log(now)
    EmailReminder.find({ datetime: { $lte: now}}, function(err, reminders){
        if (err) {console.log(err)} else {
            reminders.forEach(reminder => {
                sendSingleEmail(reminder.email)
            })
            EmailReminder.deleteMany({ datetime: {$lte: now}}, function(err){
                console.log(err)
            })
        }
    })
}

const sendSingleEmail = (emailAddr) => {
    emailjs.send('gmail', template_lWIp5bPm, { email: emailAddr})
    .then(res => console.log('email sent'))
    .catch(err => console.log(err))
}

//just realized that this will only send emails to the 

sendSingleEmail('michelle.m.pitts@gmail.com')