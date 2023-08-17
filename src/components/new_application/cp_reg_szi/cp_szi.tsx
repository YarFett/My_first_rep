import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "../constructor.scss"
import "../order-request.scss"
import PageHeader from "../../page-header/page-header";
import { SearchProvider } from "../../context_for_search";
import { NewAppContext } from "../../context_for_application";
import { setItemToLocalStorage } from "../utils";


function CpSzi(){

    const location = useLocation();
    const [resourse, setResourse] = useContext(NewAppContext)
    const data = location.state;
    // const rightData = Object.entries(data)

    useEffect(() => {
        console.log('Current data is ', resourse);
      }, [resourse]);


    const [sziNumber, setSziNumber] = useState('')
    const [answers, setAnswer] = useContext(NewAppContext)
    const history = useNavigate();

    const handleInputSziNumber= (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSziNumber(e.target.value);
        };

    const onclick = (e:any) => {
    
        const newAnswer= [
            {reg_number_szi: 'Регистрационный номер'},
            [{szi_number: sziNumber}
            ]
            ];
            setAnswer((prevAnswers: any) =>[...prevAnswers, newAnswer]);
            setItemToLocalStorage('szi_number', sziNumber)
            history("/prod_docs/", {state: newAnswer});}

    return(
        <div>
         <SearchProvider>
        <PageHeader/>
        </SearchProvider>
        <div className="order-request">
        <div className="order-request__container">
        <div className="constructor">
            <header className="constructor__header">
                <a href="" className="constructor__link-back"><Link to={"/cp_reg_szi"}>Назад</Link></a>
                <p className="constructor__title">ЦП в реестре СЗИ</p>
            </header>
            <div className="constructor__inner">
                <div className="constructor__card">
                <div className="constructor__card-item">
                    <div className="constructor__card-row is-small">
                    <div className="cb-text-field">
                        <label className="cb-text-field__label">Номер</label>
                        <div className="cb-text-field__value">
                            <input className="cb-text-field__input" type="text" value={sziNumber} placeholder="Введите номер..." onChange={handleInputSziNumber}/>
                            <div className="cb-text-field__group-icon">
                                <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <button className="cb-button" onClick={onclick}>Далее</button>
            </div>
            </div>
        </div>
        </div>
        </div>

        )
}
export default CpSzi;