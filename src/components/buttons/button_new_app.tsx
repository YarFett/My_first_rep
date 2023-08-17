import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { NewAppContext } from "../context_for_application";

function NewAppButton() {

  const [answers, setAnswer] = useContext(NewAppContext)
  const history = useNavigate();
  console.log(typeof (setAnswer))

  const onclick = (e: any) => {
    const newAnswer = {
      title: 'Новая заявка'
    };
    setAnswer(newAnswer);
    history("/how_to_fill/", { state: newAnswer });
    console.log(answers)
  }

  return (<button id="CreateNewOrder" className="cb-button" onClick={(e) => onclick(e)}>Новая заявка</button>);
}
export default NewAppButton;