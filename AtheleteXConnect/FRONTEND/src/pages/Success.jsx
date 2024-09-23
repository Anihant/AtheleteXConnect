/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    console.log(location.state);
    if(!location.state.success)
      navigate('/')
  })
  return (
    <div className="bg-green-400 w-96 rounded m-auto p-8">
      <h1 className="text-5xl text-gray-200 m-auto pt-2 w-fit">Success</h1>
      <p className="text-xl pt-3">Order_id : {location?.state?.data?.razorpay_order_id}</p>
      <p className="text-xl pt-3">Payment_id : {location?.state?.data?.razorpay_payment_id}</p>
    </div>
  );
}

export default Success;