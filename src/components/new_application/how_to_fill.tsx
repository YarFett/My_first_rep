import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "./constructor.scss"
import "./order-request.scss"
import "../../css/style.css"
import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import BeginButton from "../buttons/button_begin";
import { NewAppContext } from "../context_for_application";

function HowToFill() {

    const location = useLocation();
    const [resourse, setResourse] = useContext(NewAppContext)
    const data = location.state;
    // const rightData = Object.entries(data)

    useEffect(() => {
        console.log('Current data is ', resourse);
    }, [resourse]);


    return (
        <div>
            <SearchProvider>
                <PageHeader />
            </SearchProvider>
            <div className="order-request">
                <div className="order-request__container">
                    <div className="constructor">
                        <header className="constructor__header">
                            <a className="constructor__link-back"><Link id="GoBack" to={"/"}>Назад</Link></a>
                            <p className="constructor__title">Как заполнить заявку?</p>
                        </header>
                        <div className="constructor__inner">
                            <div className="constructor__card">
                                <div className="constructor__helper">
                                    <p className="constructor__helper-title">Потребуются</p>
                                    <ul className="constructor__helper-list">
                                        <li className="constructor__helper-item">Данные поставщика</li>
                                        <li className="constructor__helper-item">Общая информация о ЦП</li>
                                        <li className="constructor__helper-item">Сведения об информационной безопасности ЦП</li>
                                        <li className="constructor__helper-item">Документы</li>
                                    </ul>
                                    <div className="constructor__helper-card">
                                        <p className="constructor__helper-card-title">Черновик сохранится автоматически</p>
                                        <p className="constructor__helper-card-text">В любой момент вы можете выйти из формы заполнения, черновик всегда сохраняется в каталоге заявок на том месте, где вы остановились.</p>
                                    </div>
                                </div>
                            </div>
                            <BeginButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}




export default HowToFill;