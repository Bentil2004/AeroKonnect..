import { insert } from "@supabase/supabase-js";
const supabaseUrl = "https://ucusngylouypldsoltnd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdXNuZ3lsb3V5cGxkc29sdG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNjgxMDksImV4cCI6MjAzMjg0NDEwOX0.cQlMeHLv1Dd6gksfz0lO6Sd3asYfgXZrkRuCxIMnwqw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

var nodemailer = require("nodemailer");

const handleAerokonnectUserSubmit = async (fname, lname, birthdate) => {
  const data = {
    fname: fname,
    lname: lname,
    birthdate: birthdate,
  };
  console.log(data);
  insert("users", data, { returning: true })
    .then((result) => {
      const todo = result.returning[0];
      console.log(`Inserted user: ${todo}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.handleAerokonnectUserSubmit = handleAerokonnectUserSubmit;

function generateFourDigitCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export const emailHandler = (email) => {
  var code = generateFourDigitCode();
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fiifiampoma69@gmail.com",
      pass: "@Fiifi2004",
    },
  });

  var mailOptions = {
    from: "fiifiampoma69@gmail.com",
    to: String(email),
    subject: "Aekonnect bullshit",
    text: `Your code is ${code}.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
