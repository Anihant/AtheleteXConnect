const db = require("../config/db");
const razorpay = require("../config/razorpayconfig");
const { updateStats } = require("./statsController");
const { mailer } = require("../services/mailer");

exports.register = async (req, res) => {
  var options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11", // check about this
  };
  try {
    const category = db.collection(req.body.category);
    const order = razorpay.orders.create(options, async function (err, order) {
      if (err) {
        console.log(err);
        return res.send({ status: false, data: req.body });
      } else {
        await category
          .add({
            ...req.body,
            payment_status: false,
            order_id: order.id,
          })
          .then(() => {
            res.send({
              status: true,
              order_id: order.id,
              category: req.body.category,
            });
          })
          .catch((error) => {
            console.error("Error adding document:", error);
            res.send({
              status: false,
              data: req.body,
              message: "Error registering your payment, please try later",
            });
          });
      }
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: false,
      data: req.body,
      message: "Error registering your payment, please try later",
    });
  }
};
exports.success = async (req, res) => {
  const category = db.collection(req.body.category);
  const team = await category.where("order_id", "==", req.body.order_id).get();
  if (team.empty) {
    res.send({ status: false, message: "no such order id found" });
  } else {
    let registrationData;
    team.forEach(async (doc) => {
      registrationData = doc.data();
      await category.doc(doc.id).update({
        payment_status: true,
        payment_id: req.body.payment_id,
      });
    });
    try {
      const regType =
        registrationData.category === "Accommodation"
          ? "accommodation"
          : "sports";
      await updateStats(registrationData, regType)
        .then(() => {
          res.send({
            status: true,
            message: "payment success and updated in database",
          });
        })
        .catch((err) => {
          console.error("Error updating stats:", err);
          res.send({
            status: true,
            message: "payment success, but error updating stats",
          });
        });
      await mailer(
        registrationData.payersContact.email,
        registrationData.order_id,
        registrationData.payersContact.name,
        registrationData.amount
      );
    } catch (error) {
      res.send({
        status: true,
        message: "payment success, but error updating stats",
      });
      if (registrationData)
        await mailer(
          registrationData.payersContact.email,
          registrationData.order_id,
          registrationData.payersContact.name,
          registrationData.amount
        );
    }
  }
};
