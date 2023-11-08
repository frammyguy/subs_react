import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";

export default function ModifyLibrary({ formAction }) {
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];

  const [data, setData] = React.useState([]);

  const fetchUpdate = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/updateget/" + location
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUpdate();
  }, []);

  const [list, setList] = useState({
    author: "",
    service: "",
    desc: "",
    price: "",
  });

  const handleChange = (e) => {
    setList((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (list.service === '') document.getElementById('warnService').removeAttribute('hidden')
      else document.getElementById('warnService').setAttribute('hidden', 'hidden');
      if (list.service === '') return null;
      list.author = localStorage.getItem("FlowtrackToken");
      if (formAction === "update")
        await axios.put(
          "http://localhost:8800/" + formAction + "/" + location,
          list
        );
      if (formAction === "add")
        await axios.post("http://localhost:8800/" + formAction + "/", list);
      navigate("/library");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
        {formAction.charAt(0).toUpperCase()+formAction.slice(1) === "Update" ? (
          <Button id="headName" variant="warning">
            {formAction.charAt(0).toUpperCase()+formAction.slice(1)}
          </Button>
        ) : (
          <Button id="headName" variant="success">
            {formAction.charAt(0).toUpperCase()+formAction.slice(1)}
          </Button>
        )}
      <div className="form_butt">
      {formAction.charAt(0).toUpperCase()+formAction.slice(1) === "Add" ? (
        <select
          onChange={handleChange}
          name="service"
          id="serviceName"
        >
          <option value="DEFAULT" hidden></option>
        {data.map(e => {
          return React.Children.toArray(
            <option value={e.Name}>{e.Name}</option>
          )})}
          
        </select>
      ) : (
        <input
        type="text"
        placeholder={data[0] !== undefined ? (data[0].Service !== '' ? '\"'+data[0].Service+'\"' : "Name") : "Name"}
        onChange={handleChange}
        name="service"
        id="serviceName"
      />
      )}
        <input
          type="text"
          placeholder={data[0] !== undefined ? (data[0].Description !== '' ? '\"'+data[0].Description+'\"' : "Description") : "Description"}
          onChange={handleChange}
          name="desc"
          id="desc"
        />
        <input
          type="number"
          placeholder={data[0] !== undefined ? (data[0].Price !== 0 ? '\"'+data[0].Price+'\"' : "Price") : "Price"}
          onChange={handleChange}
          step="0.01"
          name="price"
          id="price"
        />
      </div>
        <Form.Text id="warnService" className="warn" hidden>
          Enter the name of service!
        </Form.Text>
      <Button variant="light" onClick={handleClick}>
        {formAction.charAt(0).toUpperCase() + formAction.slice(1)}
      </Button>
    </div>
  );
}
