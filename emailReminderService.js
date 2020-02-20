const Checkpoint = require('./models/checkpoint')
const EmailReminder = require('./models/emailreminder')
const emailjs = require('emailjs-com')
// const server = emailjs.server.connect({
//     user: "checkpointtrackerSEI@gmail.com",
//     password: process.env.EMAIL_PASS,
//     host: "smtp.gmail.com",
//     ssl: true
// })

const sendEmails = () => {
    const now = new Date().getTime()
    console.log(now)
    let emailList = []
    EmailReminder.find({ datetime: { $lte: now}}, function(err, reminders){
        if (err) {console.log(err)} else {
            reminders.forEach(reminder => {
                emailList.push(reminder.email)
            })
            EmailReminder.deleteMany({ datetime: {$lte: now}}, function(err){
                console.log(err)
            })
        }
    })
}

const sendSingleEmail = (emailAddr) => {
    //server.send('gmail', 'template_lWIp5bPm', { email: emailAddr})
    emailjs.send('gmail', 'template_lWIp5bPm', { email: emailAddr})
    .then(res => console.log('email sent'))
    .catch(err => console.log(err))
}

//just realized that this will only send emails to the 
