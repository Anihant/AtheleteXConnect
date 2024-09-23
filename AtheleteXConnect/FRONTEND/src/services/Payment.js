import axios from "axios";
const razorpay_key = import.meta.env.VITE_RAZORPAY_KEY;
const server_url = import.meta.env.VITE_SERVER_URL;

export default function paymentHandler(e, price, navigate,context) {
  axios
  .post(`${server_url}/register`, {
    category: e.category,
    amount: price,
    ...e,
  })
  .then((res) => {
      if (res.data.status) {
        // for register route, which saves data in database
        var options = {
          key: razorpay_key, // Enter the Key ID generated from the Dashboard
          amount: price * 100,
          currency: "INR",
          name: "VNR VJIET",
          description: "Pay for the sports fest",
          image: "https://example.com/your_logo",
          prefill: {
            name: e.payersContact.name,
            email: e.payersContact.email,
            contact: e.payersContact.mobileNumber,
          },
          order_id: res.data.order_id,
          callback_url: `${server_url}/success`,
          handler: function (response) {
            axios
              .post(
                `${server_url}/success`,
                {
                  response: response,
                  category: res.data.category,
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((res) => {
                if (res.data.status) {
                  navigate("/success", {
                    state: { data: response, success: true },
                  })
                }
                else{
                  navigate("/failure", {
                    state: { error: "Error in backend, if you receive confirmation mail don't worry you data has been updated.." },
                  });
                  console.log(res.data);
                  console.log(response.razorpay_order_id);
                  console.log(response.razorpay_payment_id);
                  console.log(response.razorpay_signature);
                }
              })
              .catch((err) => {
                console.error(err);
                navigate("/failure", {
                  state: { error: "Payment confirmation failed" },
                });
              });
              context.setLoading(false);
          },
          notes: {
            name: e.payersContact.name,
            email: e.payersContact.email,
            category: res.data.category,
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        // eslint-disable-next-line no-undef
        var rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          console.error("Payment failed:", response.error);
          navigate("/failure", {
            state: {
              error: response.error.description || "Payment failed",
              reason: response.error.reason || "Unknown",
            },
          });
        });
        rzp1.open();
      }
      else{
       alert(res.data.message);
      }
    }
  )
  .catch((err) => {
    console.log(err);
    });
}
