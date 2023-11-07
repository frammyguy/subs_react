import React from "react";
import {useNavigate} from "react-router-dom";
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
        const res = await axios.post("http://localhost:8800/login/", user);
        setList(res.data);
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
          <Form.Text className="text-muted">
            We'll never share your data with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
        </Form.Group>
        <Button onClick={handleClick} variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
