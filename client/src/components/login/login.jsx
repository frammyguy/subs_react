import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./login.sass";

export default function Login() {
  
  const [list, setList] = useState({
    username: '',
    password: '',
    email: ''
})

const navigate = useNavigate();

const handleChange = (e) => {
    setList((prev) => ({...prev, [e.target.name]: e.target.value}));
}
const handleClick = async e => {
    e.preventDefault();
    try {
        await axios.put("http://localhost:8800/login/", list);
        navigate('/');
    } catch (err) {
        console.log(err);
    }
}

  return (
    <div className="login">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email or nickname</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
