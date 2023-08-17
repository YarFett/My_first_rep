import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "../constructor.scss"
import "../order-request.scss"
import PageHeader from "../../page-header/page-header";
import { SearchProvider } from "../../context_for_search";
import CpRegSziYesButton from "../../buttons/button_cp_reg_szi._yes";
import { NewAppContext } from "../../context_for_application";


function CpRegSzi(){

    const location = useLocation();
    const [resourse, setResourse] = useContext(NewAppContext)
    const data = location.state;
    // const rightData = Object.entries(data)

    useEffect(() => {
        console.log('Current data is ', resourse);
      }, [resourse]);


    return(
        <div>
        <SearchProvider>
        <PageHeader/>
        </SearchProvider>
        <div className="order-request">
        <div className="order-request__container">
        <div className="constructor">
        <header className="constructor__header">
            <a href="" className="constructor__link-back"><Link to={"/cert_fstek"}>Назад</Link></a>
            <p className="constructor__title">ЦП зарегистрирован в реестре СЗИ?</p>
        </header>
        <div className="constructor__inner">
            <CpRegSziYesButton/>
            <div className="cb-quiz">
            <p className="cb-quiz__title">Нет
                <span className="cb-icon cb-icon-quiz cb-icon__size-24"><Link to={"/cp_def_info"}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.21072 4.39382C8.70499 3.86873 7.88503 3.86873 7.3793 4.39382C6.87357 4.91892 6.87357 5.77027 7.3793 6.29536L13.7893 12.9508C14.295 13.4759 15.115 13.4759 15.6207 12.9508C16.1264 12.4257 16.1264 11.5743 15.6207 11.0492L9.21072 4.39382Z" fill="currentColor"/>
                        <path d="M7.3795 17.7046C6.87376 18.2297 6.87376 19.0811 7.3795 19.6062C7.88523 20.1313 8.70519 20.1313 9.21092 19.6062L15.6207 12.9508C16.1264 12.4257 16.1264 11.5743 15.6207 11.0492C15.115 10.5241 14.2952 10.5241 13.7895 11.0492L7.3795 17.7046Z" fill="currentColor"/>
                    </svg></Link>
                </span>
            </p>
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}
    
    export default CpRegSzi;