import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";

import { loadMe, logOutUser } from "../../store/actions/authActions";
import { getUsers } from "../../store/actions/usersActions";

import { LogoutSGV } from "../../components/icons";
import "./styles.css";

const Dashboard = ({ auth, users, loadMe, logOutUser, getUsers }) => {
  const navigate = useNavigate();
  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(redirectToLogin);
  };

  useEffect(() => {
    if (!auth.token || !auth.isAuthenticated) redirectToLogin();
    else if (!auth.me) loadMe();
    getUsers();
  }, []);

  const redirectToLogin = () => navigate("/");

  return (
    <div className="home-page">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>
            <img
              src="/images/logo.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top me-3"
              alt="React Bootstrap logo"
            />
            MERN APP
          </Navbar.Brand>
          <Navbar className="justify-content-end">
            <Nav className="me-auto">
              <Navbar.Text>
                Signed in as: {(auth && auth.me && auth.me.name) || "GUEST"}
              </Navbar.Text>
              <Nav.Link role="button" title="logout" onClick={onLogOut}>
                <LogoutSGV width={30} />
              </Nav.Link>
            </Nav>
          </Navbar>
        </Container>
      </Navbar>
      <Container>
        <h1>Home page</h1>
        <p>
          Welcome <span className="name">Hellow dashboard</span>!
        </p>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default compose(
  connect(mapStateToProps, { loadMe, logOutUser, getUsers })
)(Dashboard);
