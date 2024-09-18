import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import "./App.css";

const UserProfileForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/users/add",
        values
      );
      console.log("Success:", response.data);
      alert("User profile created successfully!");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create user profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: "", lastName: "", email: "", age: "", mobile: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = "Required";
        if (!values.lastName) errors.lastName = "Required";
        if (!values.email) {
          errors.email = "Required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
          errors.email = "Invalid email address";
        }
        if (!values.age) errors.age = "Required";
        if (!values.mobile) errors.mobile = "Required";
        else if (!/^\d{10}$/.test(values.mobile)) {
          errors.mobile = "Invalid mobile number";
        }
        return errors;
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="user-profile-form">
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <Field type="text" name="name" className="form-field" />
            <ErrorMessage name="name" component="div" className="form-error" />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <Field type="text" name="lastName" className="form-field" />
            <ErrorMessage
              name="lastName"
              component="div"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="form-field" />
            <ErrorMessage name="email" component="div" className="form-error" />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <Field type="number" name="age" className="form-field" />
            <ErrorMessage name="age" component="div" className="form-error" />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <Field type="text" name="mobile" className="form-field" />
            <ErrorMessage
              name="mobile"
              component="div"
              className="form-error"
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="form-button">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;
