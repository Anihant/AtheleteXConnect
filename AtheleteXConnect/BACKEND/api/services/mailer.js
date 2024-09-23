const {transporter} = require("../config/nodemailerconfig");
async function mailer(receiver_email,payment_id,name,amount) {
    const info = await transporter.sendMail({
      from: '"parshipraneesh" <parshipraneesh8@gmail.com>', 
      to: receiver_email, 
      subject: "Your payment to VNR VJIET's sport fest is confirmed",
      html: `
      Your payment is confirmed with payment id : ${payment_id} under the name ${name} and amount ${amount} <br>
      <b>Thanks for registering follow vnrvjiet.ac.in for more updates..</b>`, 
    });
}

module.exports = {mailer};