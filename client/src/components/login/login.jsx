import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./login.sass";

export default function Login() {
  const [user, setUser] = React.useState({
    username: '',
    password: ''
  });
  const [list, setList] = React.useState([]);

const navigate = useNavigate();

const handleChange = (e) => {
    setUser((prev) => ({...prev, [e.target.name]: e.target.value}));
}
const handleClick = async e => {
    e.preventDefault();
    try {
        if (user.username === '') document.getElementById('warnNickname').removeAttribute('hidden')
        else document.getElementById('warnNickname').setAttribute('hidden', 'hidden')
        if (user.password === '') document.getElementById('warnPassword').removeAttribute('hidden')
        else document.getElementById('warnPassword').setAttribute('hidden', 'hidden')
        if (user.username === '' || user.password === '') return null;
        const res = await axios.post("http://localhost:8800/login/", user);
        setList(res.data);
        console.log(1);
        if (list.success === true) {
          localStorage.setItem('FlowtrackToken', list.token);
          navigate('/library');
          window.location.reload();
        }
        else console.log('Something going wrong: ' + list.message);
    } catch (err) {
        console.log(err);
    }
}

  return (
    <div className="login">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nickname</Form.Label>
          <Form.Control onChange={handleChange} name="username" type="text" placeholder="Enter nickname" />
          <Form.Text id="warnNickname" className="warn" hidden>
            Enter the nickname!
          </Form.Text>
          <Form.Text className="text-muted">
            We'll never share your data with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
          <Form.Text id="warnPassword" className="warn" hidden>
            Enter the password!
          </Form.Text>
          <Form.Text className="text-muted">
            <Link to="/register" >Create account</Link>
          </Form.Text>
        </Form.Group>
        <Button onClick={handleClick} variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
