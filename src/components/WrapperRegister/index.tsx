import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";

import logoImage from "../../assets/images/logo.png";
import "./loginAndRegister.scss";
import { Link } from "react-router-dom";

interface MyFormRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const WrapperRegister: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues: MyFormRegister = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const submitFormHandler = (values: object) => {
    console.log("submitFormHandler ~ values:", values);
  };

  return (
    <div className="wrapper__form">
      <div className="header__form">
        <div className="wrapper__logo">
          <img src={logoImage} alt="logo" className="logo__img" />
        </div>
      </div>
      <div className="content__form">
        <h2 className="content__form--heading">Register</h2>
        <p className="content__form--greet">
          Hi, Welcome to Todo-List! Create an account 📃
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={submitFormHandler}
          validationSchema={RegisterSchema}
        >
          {({ errors }) => (
            <Form>
              <div className="input__field">
                <label htmlFor="email">Email</label>
                <Field
                  className={
                    errors.email ? "input__error input__enter" : "input__enter"
                  }
                  id="email"
                  name="email"
                  placeholder="Email@gmail.com"
                />
                {errors.email ? (
                  <div className="error__field">{errors.email}</div>
                ) : null}
              </div>
              <div className="input__field">
                <label htmlFor="password">Password</label>
                <div className="field__password">
                  <Field
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="*******"
                    className={
                      errors.email
                        ? "input__error input__enter"
                        : "input__enter"
                    }
                  />
                  {errors.password ? (
                    <div className="error__field">{errors.password}</div>
                  ) : null}
                  <div className="hide__password" onClick={showPasswordHandler}>
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    <p className="tooltip__password">Show Password</p>
                  </div>
                </div>
              </div>
              <div className="input__field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="field__password">
                  <Field
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="*******"
                    className={
                      errors.email
                        ? "input__error input__enter"
                        : "input__enter"
                    }
                  />
                  {errors.confirmPassword ? (
                    <div className="error__field">{errors.confirmPassword}</div>
                  ) : null}
                  <div className="hide__password" onClick={showPasswordHandler}>
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    <p className="tooltip__password">Show Password</p>
                  </div>
                </div>
              </div>
              <button type="submit" className="form__input--btn">
                Login
              </button>
              <div className="register__account">
                <span>
                  Already have an account?
                  <span className="register__account--request">
                    {" "}
                    <Link to="/login">Login Here</Link>
                  </span>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WrapperRegister;
