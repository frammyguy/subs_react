import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./login.sass";

export default function Register() {
  const navigate = useNavigate();
  const [list, setList] = useState({
    username: "",
    password: "",
    photo: ""
  });

  const handleChange = (e) => {
    setList((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (list.username === '') document.getElementById('warnNickname').removeAttribute('hidden')
    else document.getElementById('warnNickname').setAttribute('hidden', 'hidden')
    if (list.password === '') document.getElementById('warnPassword').removeAttribute('hidden')
    else document.getElementById('warnPassword').setAttribute('hidden', 'hidden')
    if (list.username === '' || list.password === '') return null;
    try {
      list.author = localStorage.getItem("FlowtrackToken");
      await axios.post("http://localhost:8800/register", list);
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>Nickname*</Form.Label>
          <Form.Control
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="Enter nickname"
          />
          <Form.Text id="warnNickname" className="warn" hidden>
            Enter the nickname!
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password*</Form.Label>
          <Form.Control
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
          <Form.Text id="warnPassword" className="warn" hidden>
            Enter the password!
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            name="photo"
            onChange={handleChange}
            type="text"
            placeholder="Image link"
          />
          <Form.Text className="text-muted">
            You can set photo in your profile
          </Form.Text>
        </Form.Group>

        <Button variant="primary" onClick={handleClick}>
          Register
        </Button>
      </Form>
    </div>
  );
}
