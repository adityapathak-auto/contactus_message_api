const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");


const Port = process.env.port || 5009;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(Port, () => console.log("Server Running"));


var contactEmail = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1707fbbd87081f",
    pass: "598fcd13de46e8"
  }
});

  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

  router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
      from: name,
      to: "manhit8899@gmail.com",
      subject: "Contact Form Submission",
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Message Sent" });
      }
    });
  });