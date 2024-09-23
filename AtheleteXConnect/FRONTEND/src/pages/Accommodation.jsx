import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import paymentHandler from "../services/Payment";
import LoadingContext from "../context/LoadingContext";
import "../index.css";

export default function Accommodation() {
  const context = useContext(LoadingContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // You can adjust this price as needed
  const accommodationPrice = 1000;

  const onSubmit = (data) => {
    data.category = "Accommodation";
    console.log("Accommodation data: ");
    console.log(data);
    context.setLoading(true);
    paymentHandler(data, accommodationPrice, navigate, context);
  };

  return (
    <>
      {context.loading ? (
        <div><span className="loader"></span></div>
      ) : (
        <form
          className="w-[90%] lg:w-2/4 mx-auto my-8 p-6 bg-white border border-gray-200 rounded-lg shadow"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl pb-2">Book an accommodation here</h1>
          <h2>Note: Accomodation is free but you have to pay a caution deposit of 2000/- which will be refunded.</h2>
          <div>
            <label className="form-label" htmlFor="name">
              Full Name:
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              {...register("payersContact.name", {
                required: "Name is required",
              })}
            />
            {errors.payersContact?.name && (
              <span className="form-error">{errors.payersContact.name.message}</span>
            )}
          </div>

          <div>
            <label className="form-label" htmlFor="mobileNumber">
              Mobile Number:
            </label>
            <input
              className="form-input"
              type="tel"
              id="mobileNumber"
              {...register("payersContact.mobileNumber", {
                required: "Mobile number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid mobile number",
                },
              })}
            />
            {errors.payersContact?.mobileNumber && (
              <span className="form-error">{errors.payersContact.mobileNumber.message}</span>
            )}
          </div>

          <div>
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              {...register("payersContact.email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.payersContact?.email && (
              <span className="form-error">{errors.payersContact.email.message}</span>
            )}
          </div>
          <div>
            <label className="form-label" htmlFor="gender">
              Gender:
            </label>
            <select
              className="form-select"
              id="gender"
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="form-error">{errors.gender.message}</span>}
          </div>
          <div>
            <label className="form-label" htmlFor="age">
              Age:
            </label>
            <input
              className="form-input"
              type="number"
              id="age"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 16,
                  message: "Age must be at least 16",
                },
                max: {
                  value: 99,
                  message: "Age must be less than 100",
                },
              })}
            />
            {errors.age && <span className="form-error">{errors.age.message}</span>}
          </div>

          <div>
            <label className="form-label" htmlFor="bloodGroup">
              Blood Group:
            </label>
            <select
              className="form-select"
              id="bloodGroup"
              {...register("bloodGroup", {
                required: "Blood group is required",
              })}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && <span className="form-error">{errors.bloodGroup.message}</span>}
          </div>

          <div>
            <label className="form-label" htmlFor="collegeName">
              College Name:
            </label>
            <input
              className="form-input"
              type="text"
              id="collegeName"
              {...register("collegeName", {
                required: "College name is required",
              })}
            />
            {errors.collegeName && <span className="form-error">{errors.collegeName.message}</span>}
          </div>

          <div>
            <label className="form-label" htmlFor="collegeId">
              College ID / Roll Number:
            </label>
            <input
              className="form-input"
              type="text"
              id="collegeId"
              {...register("collegeId", {
                required: "College ID / Roll Number is required",
              })}
            />
            {errors.collegeId && <span className="form-error">{errors.collegeId.message}</span>}
          </div>

          <div>
            <label className="form-label" htmlFor="yearOfStudy">
              Year of Study:
            </label>
            <select
              className="form-select"
              id="yearOfStudy"
              {...register("yearOfStudy", {
                required: "Year of study is required",
              })}
            >
              <option value="">Select Year</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>
            {errors.yearOfStudy && <span className="form-error">{errors.yearOfStudy.message}</span>}
          </div>

          <button className="submit-button" type="submit" disabled={context.loading}>
            {context.loading? "Loading.." :"Book Accommodation"}
          </button>
        </form>
      )}
    </>
  );
}
