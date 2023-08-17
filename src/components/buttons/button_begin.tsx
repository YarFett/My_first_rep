import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { NewAppContext } from "../context_for_application";
import { SearchContext } from "../context_for_search";
import { Service } from "../api_params/service";
import { setItemToLocalStorage } from "../new_application/utils";
import { ServiceCard } from "../general/service";
import axios from "axios";


function BeginButton() {
  const [answers, setAnswer] = useContext(NewAppContext)
  const history = useNavigate();
  const [serviceNew, setServiceNew] = useState<ServiceCard[]>([])

    useEffect(() => {
      axios.get(`/services/service/`)
        .then(response =>
            setServiceNew(response.data)
            )
        .catch(error => console.log(error))
    }, []);

  const onclick = (e: any) => {
    // const newIdd = serviceNew?.map((result) => (result.id))
    if (serviceNew.length === 0) {
      const newId = 1
      const newAnswer = {
        app_number: `${newId}`
      };
      console.log(newId)
      setAnswer((prevAnswers: any) => [...prevAnswers, newAnswer]);
      setItemToLocalStorage('app_number', newAnswer.app_number)
      history("/prod_info/", { state: newAnswer });
    } else {

      const newId = serviceNew[serviceNew.length - 1].id + 1
      console.log(newId)
      const newAnswer = {
        app_number: `${newId}`
      };
      setAnswer((prevAnswers: any) => [...prevAnswers, newAnswer]);
      setItemToLocalStorage('app_number', newAnswer.app_number)
      console.log(newId)
      history("/prod_info/", { state: newAnswer });
    }
    // window.location.assign('http://localhost:3001/how_to_fill/');
  }


  return (<button id="NextToProdInfo" className="cb-button" onClick={(e) => onclick(e)}>Начать</button>);
}
export default BeginButton;