import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./about.sass";

export default function About() {
  const navigate = useNavigate();
  const [list, setList] = useState({
    email: "",
    message: ""
  });
  const handleChange = (e) => {
    setList((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (list.email === '' || list.message === '') return null;
      await axios.post("http://localhost:8800/aboutsend",list);
      navigate("/about");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="about_h1">Our servise</h1>
      <div className="about">
        <div className="about_text">
          <div className="about_text_desc">
            We provide you a <b>brilliant</b> way to use all imaginable services
            for
            <b> lower</b> prices, so you can feel yourself good about you are{" "}
            <span>legally </span>
            using <i>premium</i> features and also not being broke because of
            prices, that companies set nowadays.
          </div>

          <Form className="about_form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll contact you on your issue
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control onChange={handleChange} name="message" type="text" rows={3} placeholder="Write feedback here" />
            </Form.Group>
            <Button onClick={handleClick} variant="primary">
              Send
            </Button>
          </Form>
        </div>
        <div className="about_img">
          <img
            src="https://cdn.discordapp.com/attachments/546779000928731174/1169592220689645609/duckie.jpg?ex=6555f6a3&is=654381a3&hm=03b25c8f238d87bf05b83d7de75b327c9e1c5b0e62e8340f3c78eab7da0df104&"
            alt="a little duckie"
          />
          <div className="about_img_desc">`Employee of the month`</div>
        </div>
      </div>
      <h1 className="about_h1">Our workers</h1>
      <div className="about">
        <div className="about_worker">
          <img
            src="https://cdn.discordapp.com/attachments/546779000928731174/1164946451873407006/photo_2020-09-11_13-56-18.jpg?ex=65450fed&is=65329aed&hm=4ecb125fee0f8b0e1d6585cc78f8ff0f62b0f281fc54af101b53bb05b32b21b2&"
            alt="vlad"
          />
          <div className="about_worker_name">Vlad</div>
          <div className="about_worker_desc">Unemployed, reckless driver</div>
        </div>
        <div className="about_worker">
          <img
            src="https://cdn.discordapp.com/attachments/546779000928731174/1164950736040382494/photo_2023-10-20_18-38-03.jpg?ex=654513eb&is=65329eeb&hm=02c88f9e7ab0a4ca432e2c5cb331f35c564d35670eaef2202291967c09582f60&"
            alt="kiril"
          />
          <div className="about_worker_name">Kirils</div>
          <div className="about_worker_desc">
            Geoguessr monster, understand 15000 languages
          </div>
        </div>
        <div className="about_worker">
          <img
            src="https://cdn.discordapp.com/attachments/546779000928731174/1164951255081308160/photo_2023-10-20_18-40-12.jpg?ex=65451466&is=65329f66&hm=87cdc98667aa6fc16d3d8336f56cce8f06a6e524610edf6434151493d6ce26f2&"
            alt="edan"
          />
          <div className="about_worker_name">Edan</div>
          <div className="about_worker_desc">Truck driver, hitman</div>
        </div>
        <div className="about_worker">
          <img
            src="https://cdn.discordapp.com/attachments/546779000928731174/1164951766220165141/photo_2023-10-20_18-42-14.jpg?ex=654514e0&is=65329fe0&hm=bedbf6b4117ac1586427727da4a00e2aa966e0c01ee81a6b74a4ed461554f188&"
            alt="alisa"
          />
          <div className="about_worker_name">Alisa</div>
          <div className="about_worker_desc">Best student and co-worker.</div>
        </div>
      </div>
    </div>
  );
}
