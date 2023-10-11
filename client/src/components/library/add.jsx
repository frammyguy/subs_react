import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Add() {
    const [list, setList] = useState({
        author: "",
        service: "",
        desc: "",
        price: ""
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setList((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    const handleClick = async e => {
        e.preventDefault();
        try {
            list.author = "frammy";
            await axios.post("http://localhost:8800/library", list);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="form">
            <h1>Add new Service</h1>
            <input type="text" placeholder="service" onChange={handleChange} name="service" />
            <input type="text" placeholder="description" onChange={handleChange} name="desc" id="desc" />
            <input type="number" placeholder="price" onChange={handleChange} step="0.01" name="price" id="price" />
            <button onClick={handleClick}>Add</button>
        </div>
    )
}