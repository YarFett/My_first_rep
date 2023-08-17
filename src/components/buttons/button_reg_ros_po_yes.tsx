import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { NewAppContext } from "../context_for_application";
import { setItemToLocalStorage } from "../new_application/utils";


 function RegRosPoYesButton() {
    const [answers, setAnswer] = useContext(NewAppContext)
    const history = useNavigate();

    const onclick = (e:any) => {
        const newAnswer= {
            registration: true
          };
          setAnswer((prevAnswers: any) =>[...prevAnswers, newAnswer]);
          setItemToLocalStorage('registration', true)
          history("/reg_ros_po_yes/", {state: newAnswer});
          
      // window.location.assign('http://localhost:3001/how_to_fill/');
    }

      return (
    <div id="RegRosPoYesClick" className="cb-quiz" onClick={(e) => onclick(e)}>
    <p className="cb-quiz__title" >Да
      <span className="cb-icon cb-icon-quiz cb-icon__size-24" >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.21072 4.39382C8.70499 3.86873 7.88503 3.86873 7.3793 4.39382C6.87357 4.91892 6.87357 5.77027 7.3793 6.29536L13.7893 12.9508C14.295 13.4759 15.115 13.4759 15.6207 12.9508C16.1264 12.4257 16.1264 11.5743 15.6207 11.0492L9.21072 4.39382Z" fill="currentColor"/>
          <path d="M7.3795 17.7046C6.87376 18.2297 6.87376 19.0811 7.3795 19.6062C7.88523 20.1313 8.70519 20.1313 9.21092 19.6062L15.6207 12.9508C16.1264 12.4257 16.1264 11.5743 15.6207 11.0492C15.115 10.5241 14.2952 10.5241 13.7895 11.0492L7.3795 17.7046Z" fill="currentColor"/>
        </svg>
      </span>
    </p>
    </div>
  );
  }
export default RegRosPoYesButton;