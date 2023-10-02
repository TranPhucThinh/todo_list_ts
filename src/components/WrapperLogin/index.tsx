import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";

import logoImage from "../../assets/images/logo.png";
import "./loginAndRegister.scss";
import { Link } from "react-router-dom";

interface MyFormLogin {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .required("Required"),
});

const WrapperLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const initialValues: MyFormLogin = { email: "", password: "" };

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
        <h2 className="content__form--heading">Login</h2>
        <p className="content__form--greet">Hi, Welcome back! 👋</p>
        <Formik
          initialValues={initialValues}
          onSubmit={submitFormHandler}
          validationSchema={LoginSchema}
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
              <p className="form__forgot--password">Forgot Password?</p>
              <button type="submit" className="form__input--btn">
                Login
              </button>
              <div className="register__account">
                <span>
                  Not registered yet?
                  <span className="register__account--request">
                    {" "}
                    <Link to="/register">Create an account</Link>
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

export default WrapperLogin;
