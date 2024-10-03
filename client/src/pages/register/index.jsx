import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";

import { useFormik } from "formik";

import { registerUserWithEmail } from "../../store/actions/registerActions";
import { registerSchema } from "./validation";
import "./styles.css";
import { useEffect } from "react";

const Register = ({
  auth,
  register: { isLoading, error },
  registerUserWithEmail,
}) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      registerUserWithEmail(values, goToLogin);
    },
  });

  const goToLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    if (auth && auth.isAuthenticated) goToLogin();
  }, []);

  return (
    <Row className="vh-100 m-0 p-0">
      <Col xs={12} sm={6} className="mx-auto register">
        <div className="container">
          <h1 className="fw-bold mb-5">Register page</h1>
          <form onSubmit={formik.handleSubmit} noValidate>
            <h2>Create new account</h2>
            <div>
              <input
                placeholder="Name"
                name="name"
                className="mt-2 form-control"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="error">{formik.errors.name}</p>
              ) : null}
              <input
                placeholder="Username"
                name="username"
                className="mt-2 form-control"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <p className="error">{formik.errors.username}</p>
              ) : null}
              <input
                placeholder="Email address"
                name="email"
                className="mt-2 form-control"
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
                className="mt-2 form-control"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="error">{formik.errors.password}</p>
              ) : null}
            </div>
            {error && <p className="error">{error}</p>}
            <div className="mt-3 align-items-end d-flex justify-content-between">
              <Button
                className="btn submit mt-2"
                type="submit"
                disabled={isLoading || !formik.isValid}
              >
                Sign up now
              </Button>

              <div>
                Have an account?{" "}
                <Link className="bold" to="/">
                  Log In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Col>
      <Col xs={12} sm={6} className="mx-auto d-none d-sm-block">
        <img
          className="regiter-img"
          src="./public/images/register.jpg"
          alt="register-img"
          width={"100%"}
        />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  register: state.register,
});

export default compose(connect(mapStateToProps, { registerUserWithEmail }))(
  Register
);
