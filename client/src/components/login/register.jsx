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
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password*</Form.Label>
          <Form.Control
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
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
