import axios from "axios";
import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function ModifyLibrary({formAction}) {
    const [list, setList] = useState({
        author: "",
        service: "",
        desc: "",
        price: ""
    })

    const navigate = useNavigate();
    const location = useLocation().pathname.split('/')[2];

    const handleChange = (e) => {
        setList((prev) => ({...prev, [e.target.name]: e.target.value}));
    }
    const handleClick = async e => {
        e.preventDefault();
        try {
            list.author = "frammy";
            if(formAction === 'update') await axios.put("http://localhost:8800/library/"+location, list);
            if(formAction === 'add') await axios.put("http://localhost:8800/library/", list);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="form">
            <h1>Update a service</h1>
            <input type="text" placeholder="service" onChange={handleChange} name="service" />
            <input type="text" placeholder="description" onChange={handleChange} name="desc" id="desc" />
            <input type="number" placeholder="price" onChange={handleChange} step="0.01" name="price" id="price" />
            <button onClick={handleClick}>{formAction.charAt(0).toUpperCase() + formAction.slice(1)}</button>
        </div>
    )
}