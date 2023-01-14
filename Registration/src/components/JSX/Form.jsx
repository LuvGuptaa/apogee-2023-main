import React, { Component } from "react";
import Button from "../Button";
import "../CSS/Form.css";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

const Form = () => {
  const events = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const colleges = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const years = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div className="reg-form">
      <form className="form">
        <div className="form-inputs-container">
          <div className="form-inputs" id="inputs-left">
            <TextInput 
              type="text" 
              field="name" 
              name="name" 
            />
            <TextInput 
              type="email" 
              field="email" 
              name="email id" 
            />
            <TextInput 
              type="number" 
              field="phone" 
              name="phone number" 
            />
            <RadioInput 
              field="gender" 
              name="gender" 
            />
          </div>

          <div className="form-inputs" id="inputs-right">
            <SelectInput
              options={events}
              field="events"
              name="events"
              isMulti={true}
            />
            <SelectInput
              options={colleges}
              field="college"
              name="college"
              isMulti={false}
            />
            <SelectInput
              options={years}
              field="year"
              name="year of study"
              isMulti={false}
            />
            <TextInput 
              type="text" 
              field="city" 
              name="city" 
            />
          </div>
        </div>

        <div className="btn-container">
          <Button type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Form;
