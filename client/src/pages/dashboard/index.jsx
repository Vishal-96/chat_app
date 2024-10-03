import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";

import { socket } from "../../socket";

import { loadMe, logOutUser } from "../../store/actions/authActions";
import { getUsers } from "../../store/actions/usersActions";

import { LogoutSGV } from "../../components/icons";
import "./styles.css";

const Dashboard = ({ auth, users, loadMe, logOutUser, getUsers }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([]);

  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(redirectToLogin);
  };

  useEffect(() => {
    if (!auth.token || !auth.isAuthenticated) redirectToLogin();
    else if (!auth.me) loadMe();
    getUsers();

    socket.on("chatMessage", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });

    socket.on('typing',(msg)=>{
      console.log({msg})
    })

    return () => {
      socket.off("chatMessage");
    }
  }, []);

  const sendMessage = () => {
    const data = {
      message: message,
      author: auth.me
    }
    socket.emit("chatMessage",data );
    setMessage('')
  };

  const handleInputChange = (e) =>{
    setMessage(e.target.value);
  }

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
          Welcome{" "}
          <span className="name">{auth && auth.me && auth.me.name}</span>!
        </p>
        <Row>
          <h3>Common Chat</h3>
          <div className="w-100 h-75vh chat-container p-4">
           {chatMessages.map((m,idx) => 
             <p key={idx}>
              <span className="message">
                {m.author.name} : {m.message}
              </span>
             </p>
           )}
          </div>
        </Row>
        <Row className="justify-content-end">
          <Col xs={8} sm={10} md={11}>
            <input
              name="chat_message"
              type="text"
              value={message}
              className="form-control"
              placeholder="Enter message"
              onChange={handleInputChange}
            />
          </Col>
          <Col xs={4} sm={2} md={1}>
            <Button onClick={sendMessage}>Send</Button>
          </Col>
        </Row>
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
