import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { NewAppContext } from "../context_for_application";

 function RegRosPoYesNextButton() {
    const [answers, setAnswer] = useContext(NewAppContext)
    const history = useNavigate();

    const onclick = (e:any) => {
        const newAnswer= {
            create_body: 'Основное тело данных'
          };
          setAnswer((prevAnswers: any) =>[...prevAnswers, newAnswer]);
          history("/cp-har/", {state: newAnswer});
          
      // window.location.assign('http://localhost:3001/how_to_fill/');
    }

      return (<a onClick={(e) => onclick(e)}>Далее</a>);
  }
export default RegRosPoYesNextButton;