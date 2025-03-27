const nodemailer =require("nodemailer")

const transport = nodemailer.createTransport({
    service:"gmail",
    auth :{
        user :"testmail.ebramha@gmail.com",
        pass :"ityp zlok axxi xzcx",
    },
})
module.exports =transport