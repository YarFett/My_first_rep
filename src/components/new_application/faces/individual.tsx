import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "../constructor.scss"
import "../order-request.scss"
import PageHeader from "../../page-header/page-header";
import { SearchProvider } from "../../context_for_search";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils";
import Swal from "sweetalert2";
import { NewAppContext } from "../../context_for_application";


function Individual() {

    const location = useLocation();
    const [resourse, setResourse] = useContext(NewAppContext)
    const data = location.state;

    const [answers, setAnswer] = useContext(NewAppContext)
    const history = useNavigate();

    const [fio, setFio] = useState('')
    const [series, setSeries] = useState('')
    const [passportNumber, setPassportNumber] = useState('')
    const [inn, setInn] = useState('')
    const [ogrin, setOgrnin] = useState('')
    const [whenIssued, setWhenIssued] = useState('')
    const [issuedBy, setIssuedBy] = useState('')
    const [regAdress, setRegAdress] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const savedfio = getItemFromLocalStorage('fio');
        const savedseries = getItemFromLocalStorage('series');
        const savedpassportNumber = getItemFromLocalStorage('passportNumber');
        const savedinn = getItemFromLocalStorage('inn');
        const savedogrnin = getItemFromLocalStorage('ogrnin');
        const savedwhenIssued = getItemFromLocalStorage('whenIssued');
        const savedissuedBy = getItemFromLocalStorage('issuedBy');
        const savedregAdress = getItemFromLocalStorage('regAdress');
        const savedemail = getItemFromLocalStorage('email');

        if (savedfio !== null) {
            setFio(savedfio);
        }
        if (savedseries !== null) {
            setSeries(savedseries);
        }
        if (savedpassportNumber !== null) {
            setPassportNumber(savedpassportNumber);
        }
        if (savedinn !== null) {
            setInn(savedinn);
        }
        if (savedogrnin !== null) {
            setOgrnin(savedogrnin);
        }
        if (savedwhenIssued !== null) {
            setWhenIssued(savedwhenIssued);
        }
        if (savedissuedBy !== null) {
            setIssuedBy(savedissuedBy);
        }
        if (savedregAdress !== null) {
            setRegAdress(savedregAdress);
        }
        if (savedemail !== null) {
            setEmail(savedemail);
        }

    }, []);


    const handleInputFio = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFio(e.target.value);
    };
    const handleInputSeries = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSeries(e.target.value);
    };
    const handleInputPassportNumber = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassportNumber(e.target.value);
    };
    const handleInputInn = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setInn(e.target.value);
    };
    const handleInputOgrin = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setOgrnin(e.target.value);
    };
    const handleInputWhenIssued = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setWhenIssued(e.target.value);
    };
    const handleInputIssuedBy = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setWhenIssued(e.target.value);
    };
    const handleInputRegAdress = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setWhenIssued(e.target.value);
    };
    const handleInputEmail = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const onclick = (e: any) => {

        setItemToLocalStorage('fio', fio)
        setItemToLocalStorage('inn', inn)
        setItemToLocalStorage('ogrnin', ogrin)
        setItemToLocalStorage('series', series)
        setItemToLocalStorage('passportNumber', passportNumber)
        setItemToLocalStorage('whenIssued', whenIssued)
        setItemToLocalStorage('email', email)
        history("/reg_ros_po/", {})

    }

    return (
        <div>
            <SearchProvider>
                <PageHeader />
            </SearchProvider>
            <div className="order-request">
                <div className="order-request__container">
                    <div className="constructor">
                        <header className="constructor__header">
                            <a href="" className="constructor__link-back"><Link to={"/prod_info"}>Назад</Link></a>
                            <p className="constructor__title">Физическое лицо</p>
                        </header>
                        <div className="constructor__inner">
                            <div className="constructor__card">
                                <div className="constructor__card-item">
                                    <div className="constructor__card-row">
                                        <div className="cb-text-field">
                                            <label className="cb-text-field__label cb-text-field">
                                                ФИО
                                                <input className="cb-text-field__input input" type="search" value={fio} placeholder="Введите ФИО"
                                                    onChange={handleInputFio} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="constructor__card-row is-inn">
                                        <div className="cb-text-field">
                                            <label className="cb-text-field__label cb-text-field">
                                                ИНН
                                                <input className="cb-text-field__input input" type="search" value={inn} placeholder="Введите ИНН..."
                                                    onChange={handleInputInn} />
                                            </label>
                                        </div>
                                        <div className="cb-text-field">
                                            <label className="cb-text-field__label cb-text-field">
                                                ОГРН
                                                <input className="cb-text-field__input input" type="search" value={ogrin} placeholder="Введите ОГРН"
                                                    onChange={handleInputOgrin} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="constructor__card-item">
                                    <p className="constructor__card-item-title">Паспорт РФ</p>
                                    <div className="constructor__card-row is-password">
                                        <div className="cb-text-field">
                                            <label className="cb-text-field__label cb-text-field">
                                                Серия
                                                <input className="cb-text-field__input input" type="search" value={series} placeholder="Введите серию"
                                                    onChange={handleInputSeries} />
                                            </label>
                                        </div>
                                        <div className="cb-text-field">
                                            <label className="cb-text-field__label cb-text-field">
                                                Номер
                                                <input className="cb-text-field__input input" type="search" value={passportNumber} placeholder="Введите номер"
                                                    onChange={handleInputPassportNumber} />
                                            </label>
                                        </div>
                                        <div className="cb-datepicker">
                                            <p className="cb-datepicker__label">Когда выдан</p>
                                            <div className="cb-datepicker__value">
                                                <div className="cb-datepicker__field">
                                                    <input type="date" className="cb-datepicker__input" value={whenIssued} placeholder="__.__.____" onChange={handleInputWhenIssued} />
                                                    <div className="cb-datepicker__group-icon cb-datepicker__group-icon--calendar">
                                                        <span className="cb-datepicker__icon cb-icon cb-icon-calendar cb-icon__size-24">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M19.2 4.875H17.55V3.75C17.55 3.375 17.25 3 16.8 3C16.425 3 16.05 3.3 16.05 3.75V4.875H7.875V3.75C7.875 3.375 7.575 3 7.125 3C6.75 3 6.375 3.3 6.375 3.75V4.875H4.8C3.825 4.875 3 5.625 3 6.675V19.2C3 20.175 3.825 21 4.8 21H19.2C20.175 21 21 20.175 21 19.2V6.675C21 5.625 20.175 4.875 19.2 4.875ZM7.2 7.2C7.575 7.2 7.95 6.9 7.95 6.45V6.3H16.125V6.45C16.125 6.825 16.425 7.2 16.875 7.2C17.25 7.2 17.625 6.9 17.625 6.45V6.3H19.2C19.425 6.3 19.65 6.525 19.65 6.75V8.475H4.425V6.75C4.425 6.525 4.65 6.3 4.875 6.3H6.45V6.45C6.45 6.825 6.75 7.2 7.2 7.2ZM19.575 19.125C19.575 19.35 19.35 19.575 19.125 19.575H4.875C4.65 19.575 4.425 19.35 4.425 19.125V13.65V9.975H19.575V19.125Z" fill="currentColor" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="cb-datepicker__dropdown">
                                                    <div className="cb-datepicker__dropdown-header">
                                                        <div className="cb-datepicker__select">
                                                            <div className="cb-datepicker__select-field">
                                                                <p className="cb-datepicker__select-input">Сентябрь</p>
                                                                <div className="cb-datepicker__group-icon cb-datepicker__group-icon--arrowTriangle">
                                                                    <span className="cb-icon cb-icon-arrow-triangle cb-icon__size-24">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M12 14.5L8.96891 10.75L15.0311 10.75L12 14.5Z" fill="currentColor" />
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="cb-datepicker__select-option">
                                                                <div className="cb-datepicker__select-wrapper">
                                                                    <p className="cb-datepicker__select-item">Январь</p>
                                                                    <p className="cb-datepicker__select-item is-hover">Февраль</p>
                                                                    <p className="cb-datepicker__select-item">Март</p>
                                                                    <p className="cb-datepicker__select-item">Апрель</p>
                                                                    <p className="cb-datepicker__select-item">Май</p>
                                                                    <p className="cb-datepicker__select-item">Июнь</p>
                                                                    <p className="cb-datepicker__select-item">Июль</p>
                                                                    <p className="cb-datepicker__select-item">Август</p>
                                                                    <p className="cb-datepicker__select-item">Сентябрь</p>
                                                                    <p className="cb-datepicker__select-item">Октябрь</p>
                                                                    <p className="cb-datepicker__select-item">Ноябрь</p>
                                                                    <p className="cb-datepicker__select-item">Декабрь</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cb-datepicker__select">
                                                            <div className="cb-datepicker__select-field">
                                                                <p className="cb-datepicker__select-input">2020</p>
                                                                <div className="cb-datepicker__group-icon cb-datepicker__group-icon--arrowTriangle">
                                                                    <span className="cb-icon cb-icon-arrow-triangle cb-icon__size-24">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M12 14.5L8.96891 10.75L15.0311 10.75L12 14.5Z" fill="currentColor" />
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="cb-datepicker__select-option">
                                                                <div className="cb-datepicker__select-wrapper">
                                                                    <p className="cb-datepicker__select-item">2022</p>
                                                                    <p className="cb-datepicker__select-item">2021</p>
                                                                    <p className="cb-datepicker__select-item">2020</p>
                                                                    <p className="cb-datepicker__select-item">2019</p>
                                                                    <p className="cb-datepicker__select-item">2018</p>
                                                                    <p className="cb-datepicker__select-item">2017</p>
                                                                    <p className="cb-datepicker__select-item">2016</p>
                                                                    <p className="cb-datepicker__select-item">2015</p>
                                                                    <p className="cb-datepicker__select-item">2014</p>
                                                                    <p className="cb-datepicker__select-item">2013</p>
                                                                    <p className="cb-datepicker__select-item">2012</p>
                                                                    <p className="cb-datepicker__select-item">2011</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cb-datepicker__group-icon">
                                                            <span className="cb-icon cb-icon-arrow-bold-rigth cb-icon__size-24">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.2107 4.39382C9.70499 3.86873 8.88503 3.86873 8.3793 4.39382C7.87357 4.91892 7.87357 5.77027 8.3793 6.29536L14.7893 12.9508C15.295 13.4759 16.115 13.4759 16.6207 12.9508C17.1264 12.4257 17.1264 11.5743 16.6207 11.0492L10.2107 4.39382Z" fill="currentcolor" />
                                                                    <path d="M8.3795 17.7046C7.87376 18.2297 7.87376 19.0811 8.3795 19.6062C8.88523 20.1313 9.70519 20.1313 10.2109 19.6062L16.6207 12.9508C17.1264 12.4257 17.1264 11.5743 16.6207 11.0492C16.115 10.5241 15.2952 10.5241 14.7895 11.0492L8.3795 17.7046Z" fill="currentcolor" />
                                                                </svg>
                                                            </span>
                                                            <span className="cb-icon cb-icon-arrow-bold-left cb-icon__size-24">
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M13.7893 19.6062C14.295 20.1313 15.115 20.1313 15.6207 19.6062C16.1264 19.0811 16.1264 18.2297 15.6207 17.7046L9.21072 11.0492C8.70499 10.5241 7.88503 10.5241 7.3793 11.0492C6.87357 11.5743 6.87357 12.4257 7.3793 12.9508L13.7893 19.6062Z" fill="currentcolor" />
                                                                    <path d="M15.6205 6.29537C16.1262 5.77027 16.1262 4.91892 15.6205 4.39382C15.1148 3.86873 14.2948 3.86873 13.7891 4.39382L7.3793 11.0492C6.87357 11.5743 6.87357 12.4257 7.3793 12.9508C7.88503 13.4759 8.70479 13.4759 9.21053 12.9508L15.6205 6.29537Z" fill="currentcolor" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="cb-datepicker__calendar-dates">
                                                        <div className="cb-datepicker__week">
                                                            <span className="cb-datepicker__week-item">пн</span>
                                                            <span className="cb-datepicker__week-item">вт</span>
                                                            <span className="cb-datepicker__week-item">ср</span>
                                                            <span className="cb-datepicker__week-item">чт</span>
                                                            <span className="cb-datepicker__week-item">пт</span>
                                                            <span className="cb-datepicker__week-item">сб</span>
                                                            <span className="cb-datepicker__week-item">вс</span>
                                                        </div>
                                                        <ul className="cb-datepicker__dates">
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">1</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">2</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">3</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">4</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">5</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">6</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">7</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">8</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">9</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">10</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">11</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">12</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">13</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">14</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">15</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">16</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">17</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">18</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">19</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">20</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">21</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">22</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">23</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">24</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">25</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item">
                                                                <span className="cb-datepicker__dates-text">26</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-disabled">
                                                                <span className="cb-datepicker__dates-text">27</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-disabled">
                                                                <span className="cb-datepicker__dates-text">28</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-disabled">
                                                                <span className="cb-datepicker__dates-text">29</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-disabled">
                                                                <span className="cb-datepicker__dates-text">30</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-disabled">
                                                                <span className="cb-datepicker__dates-text">31</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                            <li className="cb-datepicker__dates-item is-empty">
                                                                <span className="cb-datepicker__dates-text">&nbsp;</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="constructor__card-row">
                                        <div className="cb-textarea">
                                            <label className="cb-textarea__label">Кем выдан</label>
                                            <div className="cb-textarea__field">
                                                <textarea className="cb-textarea__input" value={issuedBy} onChange={handleInputIssuedBy}></textarea>
                                                <div className="cb-textarea__group-data">
                                                    <p className="cb-textarea__length">
                                                        {/* <span className="cb-textarea__current-length">255</span>
                                        <span className="cb-textarea__max-length">255</span> */}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="constructor__card-row">
                                        <div className="cb-textarea">
                                            <label className="cb-textarea__label">Адрес регистрации или фактический адрес</label>
                                            <div className="cb-textarea__field">
                                                <textarea className="cb-textarea__input" value={regAdress} onChange={handleInputRegAdress}></textarea>
                                                <div className="cb-textarea__group-data">
                                                    <p className="cb-textarea__length">
                                                        {/* <span className="cb-textarea__current-length">255</span>
                                        <span className="cb-textarea__max-length">255</span> */}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="constructor__card-row">
                                        <div className="cb-text-field">
                                            <label className="cb-text-field__label cb-text-field">
                                                Email
                                                <input className="cb-text-field__input input" type="search" value={email} placeholder="Введите email"
                                                    onChange={handleInputEmail} />
                                            </label>
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
export default Individual;