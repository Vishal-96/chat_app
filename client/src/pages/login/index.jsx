import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";

import { loginUserWithEmail, loadMe } from "../../store/actions/authActions";
import { loginSchema } from "./validation";
import "./styles.css";

const Login = ({ auth, loginUserWithEmail, loadMe }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUserWithEmail(values, () => navigate("/dashboard"));
    },
  });

  useEffect(() => {
    if (auth && auth.isAuthenticated) loadUser();
  }, []);

  const loadUser = async () => {
    try {
      loadMe();
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Row className="vh-100 m-0 p-0">
      <Col xs={12} sm={6} className="mx-auto d-none d-sm-block">
        <img
          className="regiter-img"
          src="./public/images/login.jpg"
          alt="register-img"
          width={"100%"}
        />
      </Col>
      <Col xs={12} sm={6} className="login">
        <div className="container">
          <h1 className="fw-bold mb-5">Log in</h1>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                placeholder="Email address"
                name="email"
                className="text mt-2 form-control"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="error">{formik.errors.email}</p>
              ) : null}
              <input
                placeholder="Password"
                name="password"
                type="password"
                className="text mt-2 form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="error">{formik.errors.password}</p>
              ) : null}
            </div>
            {auth.error && <p className="error">{auth.error}</p>}
            <div className="mt-3 align-items-end d-flex justify-content-center">
              <Button
                className="btn submit"
                disabled={!formik.isValid}
                type="submit"
              >
                Log in now
              </Button>
            </div>
            <div className="mt-2">
              Don't have an account?{" "}
              <Link className="bold" to="/register">
                Register
              </Link>
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(
  connect(mapStateToProps, { loginUserWithEmail, loadMe })
)(Login);
