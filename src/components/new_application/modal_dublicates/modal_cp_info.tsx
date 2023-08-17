import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "../constructor.scss"
import "../order-request.scss"
import "../../../css/style.css"
import { SearchProvider } from "../../context_for_search";
import { NewAppContext } from "../../context_for_application";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils";
import { Url } from "url";
import Swal from "sweetalert2";

export interface CpInfo {
  id: number,
  registration_number: string,
  registration_date: string,
  application_number: number,
  application_date: string,
  authors: string,
  authors_count: number,
  right_holders: string,
  contact_to_third_parties: string,
  program_name: string,
  creation_year: string,
  registration_publish_date: string,
  registration_publish_number: number,
  actual: boolean,
  publication_URL: Url,
}

export interface ErrorDetail {
  detail: string,
}

function CpInfoModal(props: any) {

  const location = useLocation();
  const [resourse, setResourse] = useContext(NewAppContext)
  const data = location.state;

  const [answers, setAnswer] = useContext(NewAppContext)
  const history = useNavigate();

  const [rusId, setRusId] = useState('')
  const [ctru, setCtru] = useState('')
  const [okpd, setOkpd] = useState('')
  const [nfap, setNfap] = useState('')
  const [website_har, setWebSiteHar] = useState('')
  const [website_prod, setWebSiteProd] = useState('')
  const [registration_number, setRegistration_number] = useState('');
  const [date_reg, setDateReg] = useState('')
  const [date_pub, setDatePub] = useState('')

  const [rosData, setRosDaata] = useState<CpInfo>()

  const [infoAuthor, setInfoAuthor] = useState('')
  const [infoMaster, setInfoMaster] = useState('')
  const [contacts, setСontacts] = useState('')
  const [evm, setEvm] = useState('')
  const [yearCreate, setYearCreate] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    const savedrusId = getItemFromLocalStorage('rusId');
    const savedctru = getItemFromLocalStorage('ctru');
    const savedokpd = getItemFromLocalStorage('okpd');
    const savednfap = getItemFromLocalStorage('nfap');
    const savedwebsite_har = getItemFromLocalStorage('website_har');
    const savedwebsite_prod = getItemFromLocalStorage('website_prod');
    const savedregistration_number = getItemFromLocalStorage('number');
    const saveddate_reg = getItemFromLocalStorage('date_reg');
    const saveddate_pub = getItemFromLocalStorage('date_pub');
    const savedinfoAuthor = getItemFromLocalStorage('infoAuthor');
    const savedinfoMaster = getItemFromLocalStorage('infoMaster');
    const savedcontacts = getItemFromLocalStorage('contacts');
    const savedevm = getItemFromLocalStorage('evm');
    const savedyearCreate = getItemFromLocalStorage('yearCreate');
    const savedurl = getItemFromLocalStorage('url');


    // const savedfile = getItemFromLocalStorage('full_name');

    if (savedrusId !== null) {
      setRusId(savedrusId);
    }
    if (savedctru !== null) {
      setCtru(savedctru);
    }
    if (savedokpd !== null) {
      setOkpd(savedokpd);
    }
    if (savednfap !== null) {
      setNfap(savednfap);
    }
    if (savedwebsite_har !== null) {
      setWebSiteHar(savedwebsite_har);
    }
    if (savedwebsite_prod !== null) {
      setWebSiteProd(savedwebsite_prod);
    }
    if (savedregistration_number !== null) {
      setRegistration_number(savedregistration_number);
    }
    if (saveddate_reg !== null) {
      setDateReg(saveddate_reg);
    }
    if (saveddate_pub !== null) {
      setDatePub(saveddate_pub);
    }
    if (savedinfoAuthor !== null) {
      setInfoAuthor(savedinfoAuthor);
    }
    if (savedinfoMaster !== null) {
      setInfoMaster(savedinfoMaster);
    }
    if (savedcontacts !== null) {
      setСontacts(savedcontacts);
    }
    if (savedevm !== null) {
      setEvm(savedevm);
    }
    if (savedyearCreate !== null) {
      setYearCreate(savedyearCreate);
    }
    if (savedurl !== null) {
      setUrl(savedurl);
    }

  }, []);


  const handleInputCtru = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCtru(e.target.value);
  };
  const handleInputOkpd = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setOkpd(e.target.value);
  };
  const handleInputNfap = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNfap(e.target.value);
  };
  const handleInputWebSiteHar = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setWebSiteHar(e.target.value);
  };
  const handleInputWebSiteProd = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setWebSiteProd(e.target.value);
  };

  const handleInputNumber = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setRegistration_number(e.target.value);
  };
  const handleInputDateReg = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDateReg(e.target.value);
  };
  const handleInputDatePub = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDatePub(e.target.value);
  };

  const handleInputContacts = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setСontacts(e.target.value);
  };

  const handleInputYearCreate = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setYearCreate(e.target.value);
  };

  const getDataFromNumber = async () => {
    try {
      const url = `services/ruspatent_reg/get_by_number/?registration_number=${registration_number}`
      const response = await axios.get(url);
      const newData = await response.data;
      setRosDaata(newData);
      setRusId(`${newData[0]?.id}`)
      setRegistration_number(`${newData[0]?.registration_number}`)
      setInfoAuthor(`${newData[0]?.authors}`)
      setInfoMaster(`${newData[0]?.right_holders}`)
      setСontacts(`${newData[0]?.contact_to_third_parties}`)
      setEvm(`${newData[0]?.program_name}`)
      setUrl(`${newData[0]?.publication_URL}`)
      setDateReg(`${newData[0]?.registration_date}`)
      setDatePub(`${newData[0]?.registration_publish_date}`)
      setYearCreate(`${newData[0]?.creation_year}`)
      console.log(newData[0])
      if (newData.detail === 'Not found.') {
        setRegistration_number('')
        setInfoAuthor('')
        setInfoMaster('')
        setСontacts('')
        setEvm('')
        setUrl('')
        setDateReg('')
        setDatePub('')
        setYearCreate('')
        Swal.fire({
          title: 'Номер не найден',
          text: 'Попробуйте ввести другой номер',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      if (newData.length === 0) {
        setRegistration_number('')
        setInfoAuthor('')
        setInfoMaster('')
        setСontacts('')
        setEvm('')
        setUrl('')
        setDateReg('')
        setDatePub('')
        setYearCreate('')
        Swal.fire({
          title: 'Номер не найден',
          text: 'Попробуйте ввести другой номер',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }

    } catch (error) {
      if (error) {
        setRegistration_number('')
        setInfoAuthor('')
        setInfoMaster('')
        setСontacts('')
        setEvm('')
        setUrl('')
        setDateReg('')
        setDatePub('')
        setYearCreate('')
        Swal.fire({
          title: 'Номер не найден',
          text: 'Попробуйте ввести другой номер',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      if (registration_number === '') {
        setRegistration_number('')
        setInfoAuthor('')
        setInfoMaster('')
        setСontacts('')
        setEvm('')
        setUrl('')
        setDateReg('')
        setDatePub('')
        setYearCreate('')
        Swal.fire({
          title: 'Введите номер патента',
          confirmButtonText: 'OK'
        });
      }
      console.error("Вот твоя ошибка", error)
    }
  };

  const handleCloseModal = () => {
    try {
      setItemToLocalStorage('ctru', ctru)
      setItemToLocalStorage('okpd', okpd)
      setItemToLocalStorage('nfap', nfap)
      setItemToLocalStorage('website_har', website_har)
      setItemToLocalStorage('website_prod', website_prod)
      setItemToLocalStorage('number', registration_number)
      setItemToLocalStorage('date_reg', date_reg)
      setItemToLocalStorage('date_pub', date_pub)
      setItemToLocalStorage('rusId', rusId)
      setItemToLocalStorage('infoAuthor', infoAuthor)
      setItemToLocalStorage('infoMaster', infoMaster)
      setItemToLocalStorage('contacts', contacts)
      setItemToLocalStorage('evm', evm)
      setItemToLocalStorage('yearCreate', yearCreate)
      setItemToLocalStorage('url', url)
      // props.onUpdate(listCommentsLength)
      // window.location.reload()
      props.onClose()
      // localStorage.clear()
    }
    catch (error) { console.log(error) }
  }

  const onclick = (e: any) => {
    setItemToLocalStorage('ctru', ctru)
    setItemToLocalStorage('okpd', okpd)
    setItemToLocalStorage('nfap', nfap)
    setItemToLocalStorage('website_har', website_har)
    setItemToLocalStorage('website_prod', website_prod)
    setItemToLocalStorage('number', registration_number)
    setItemToLocalStorage('date_reg', date_reg)
    setItemToLocalStorage('date_pub', date_pub)
    setItemToLocalStorage('rusId', rusId)
    setItemToLocalStorage('infoAuthor', infoAuthor)
    setItemToLocalStorage('infoMaster', infoMaster)
    setItemToLocalStorage('contacts', contacts)
    setItemToLocalStorage('evm', evm)
    setItemToLocalStorage('yearCreate', yearCreate)
    setItemToLocalStorage('url', url)
    //   setAnswer((prevAnswers: any) => [...prevAnswers, newAnswer]);
    //   history("/cert_of_def/", {state: newAnswer});
  }
  // const rightData = Object.entries(data)

  useEffect(() => {
    console.log('Current data is ', resourse);
  }, [resourse]);

  return (
    <div className="constructor">
      <div className="constructor__inner">
        <div className="constructor__card" style={{ boxShadow: 'none', marginTop: '220px'}}>
          <header className="constructor__header">
            {/* <a href="" className="constructor__link-back"><Link to={"/cp_har"}>Назад</Link></a> */}
            <p className="constructor__title">Сведения о ЦП</p>
          </header>
          <div className="constructor__card-item">
            <div className="constructor__card-row" style={{ display: "flex" }}>
              <div className="cb-text-field">
                <label className="cb-text-field__label cb-text-field">
                  Код КТРУ
                  <input className="cb-text-field__input input" type="search" value={ctru}
                         placeholder="..."
                         onChange={handleInputCtru} />
                </label>
                {/*<label className="cb-text-field__label">Код КТРУ</label>*/}
                {/*<div className="cb-text-field__value">*/}
                {/*  <input className="cb-text-field__input" type="text" value={ctru} placeholder="..."*/}
                {/*         onChange={handleInputCtru}/>*/}
                {/*  <div className="cb-text-field__group-icon">*/}
                {/*              <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                {/*                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
                {/*                       xmlns="http://www.w3.org/2000/svg">*/}
                {/*                      <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor"*/}
                {/*                            strokeWidth="1.5"/>*/}
                {/*                      <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor"*/}
                {/*                            strokeWidth="1.5"/>*/}
                {/*                  </svg>*/}
                {/*              </span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
              <div className="cb-text-field">
                <label className="cb-text-field__label cb-text-field">
                  Код ОКПД2
                  <input className="cb-text-field__input input" type="search" value={okpd}
                         placeholder="..."
                         onChange={handleInputOkpd} />
                </label>
                {/*<label className="cb-text-field__label">Код ОКПД2</label>*/}
                {/*<div className="cb-text-field__value">*/}
                {/*  <input className="cb-text-field__input" type="text" value={okpd} placeholder="..."*/}
                {/*         onChange={handleInputOkpd}/>*/}
                {/*  <div className="cb-text-field__group-icon">*/}
                {/*              <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                {/*                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
                {/*                       xmlns="http://www.w3.org/2000/svg">*/}
                {/*                      <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor"*/}
                {/*                            strokeWidth="1.5"/>*/}
                {/*                      <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor"*/}
                {/*                            strokeWidth="1.5"/>*/}
                {/*                  </svg>*/}
                {/*              </span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
              <div className="cb-text-field">
                <label className="cb-text-field__label cb-text-field">
                  № в НФАП
                  <input className="cb-text-field__input input" type="search" value={nfap}
                         placeholder="..."
                         onChange={handleInputNfap} />
                </label>
                {/*<label className="cb-text-field__label">№ в НФАП</label>*/}
                {/*<div className="cb-text-field__value">*/}
                {/*  <input className="cb-text-field__input" type="text" value={nfap} placeholder="..."*/}
                {/*         onChange={handleInputNfap}/>*/}
                {/*  <div className="cb-text-field__group-icon">*/}
                {/*              <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                {/*                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
                {/*                       xmlns="http://www.w3.org/2000/svg">*/}
                {/*                      <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor"*/}
                {/*                            strokeWidth="1.5"/>*/}
                {/*                      <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor"*/}
                {/*                            strokeWidth="1.5"/>*/}
                {/*                  </svg>*/}
                {/*              </span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
            <div className="constructor__card-row">
              <div className="cb-text-field">
                <label className="cb-text-field__label cb-text-field">
                  Сайт с характеристиками ЦП
                  <input className="cb-text-field__input input" type="search" value={website_har}
                         placeholder="..."
                         onChange={handleInputWebSiteHar} />
                </label>
                {/*<label className="cb-text-field__label">Сайт с характеристиками ЦП</label>*/}
                {/*<div className="cb-text-field__value">*/}
                {/*  <input className="cb-text-field__input" type="text" value={website_har} placeholder="..."*/}
                {/*         onChange={handleInputWebSiteHar}/>*/}
                {/*  <div className="cb-text-field__group-icon">*/}
                {/*              <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                {/*                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
                {/*                       xmlns="http://www.w3.org/2000/svg">*/}
                {/*                      <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor"*/}
                {/*                            strokeWidth="1.5"/>*/}
                {/*                      <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor"*/}
                {/*                            strokeWidth="1.5"/>*/}
                {/*                  </svg>*/}
                {/*              </span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
            <div className="constructor__card-row">
              <div className="cb-text-field">
                <label className="cb-text-field__label cb-text-field">
                  Сайт поставщика с экземпляром ЦП
                  <input className="cb-text-field__input input" type="search" value={website_prod}
                         placeholder="..."
                         onChange={handleInputWebSiteProd} />
                </label>
                {/*<label className="cb-text-field__label">Сайт поставщика с экземпляром ЦП</label>*/}
                {/*<div className="cb-text-field__value">*/}
                {/*  <input className="cb-text-field__input" type="text" value={website_prod} placeholder="..."*/}
                {/*         onChange={handleInputWebSiteProd}/>*/}
                {/*  <div className="cb-text-field__group-icon">*/}
                {/*              <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                {/*                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
                {/*                       xmlns="http://www.w3.org/2000/svg">*/}
                {/*                      <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor"*/}
                {/*                            strokeWidth="1.5"/>*/}
                {/*                      <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor"*/}
                {/*                            strokeWidth="1.5"/>*/}
                {/*                  </svg>*/}
                {/*              </span>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
          <div className="constructor__card-item">
            <div className="cb-text-field__label">
              <button className="cb-button" onClick={getDataFromNumber}>
                Найти по номеру Роспатента
              </button>
            </div>
            <p className="constructor__card-item-title">Реквизиты Роспатента</p>
            <div className="cb-text-field">
              <label className="cb-text-field__label cb-text-field">
                Номер
                <input className="cb-text-field__input input" type="search" value={registration_number}
                       placeholder="Введите № Роспатента..."
                       onChange={handleInputNumber} />
              </label>
              {/*<label className="cb-text-field__label">Номер</label>*/}
              {/*<div className="cb-text-field__value">*/}
              {/*  <input className="cb-text-field__input" type="text" value={registration_number}*/}
              {/*         placeholder="Введите № Роспатента" onChange={handleInputNumber}/>*/}
              {/*  <div className="cb-text-field__group-icon">*/}
              {/*                <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
              {/*                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
              {/*                         xmlns="http://www.w3.org/2000/svg">*/}
              {/*                        <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor"*/}
              {/*                              strokeWidth="1.5"/>*/}
              {/*                        <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor"*/}
              {/*                              strokeWidth="1.5"/>*/}
              {/*                    </svg>*/}
              {/*                </span>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
            <div className="constructor__card-row is-1fr-1fr-1fr">
              <div className="cb-datepicker">
                <label className="cb-datepicker__label">Дата публикации</label>
                <div className="cb-datepicker__value">
                  <div className="cb-datepicker__field">
                    <input type="text" className="cb-datepicker__input" value={date_pub} placeholder="__.__.____"
                           onChange={handleInputDatePub} />
                    <div className="cb-datepicker__group-icon cb-datepicker__group-icon--calendar">
                            <span className="cb-datepicker__icon cb-icon cb-icon-calendar cb-icon__size-24">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M19.2 4.875H17.55V3.75C17.55 3.375 17.25 3 16.8 3C16.425 3 16.05 3.3 16.05 3.75V4.875H7.875V3.75C7.875 3.375 7.575 3 7.125 3C6.75 3 6.375 3.3 6.375 3.75V4.875H4.8C3.825 4.875 3 5.625 3 6.675V19.2C3 20.175 3.825 21 4.8 21H19.2C20.175 21 21 20.175 21 19.2V6.675C21 5.625 20.175 4.875 19.2 4.875ZM7.2 7.2C7.575 7.2 7.95 6.9 7.95 6.45V6.3H16.125V6.45C16.125 6.825 16.425 7.2 16.875 7.2C17.25 7.2 17.625 6.9 17.625 6.45V6.3H19.2C19.425 6.3 19.65 6.525 19.65 6.75V8.475H4.425V6.75C4.425 6.525 4.65 6.3 4.875 6.3H6.45V6.45C6.45 6.825 6.75 7.2 7.2 7.2ZM19.575 19.125C19.575 19.35 19.35 19.575 19.125 19.575H4.875C4.65 19.575 4.425 19.35 4.425 19.125V13.65V9.975H19.575V19.125Z"
                                  fill="currentColor" />
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 14.5L8.96891 10.75L15.0311 10.75L12 14.5Z"
                                            fill="currentColor" />
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 14.5L8.96891 10.75L15.0311 10.75L12 14.5Z"
                                            fill="currentColor" />
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
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M10.2107 4.39382C9.70499 3.86873 8.88503 3.86873 8.3793 4.39382C7.87357 4.91892 7.87357 5.77027 8.3793 6.29536L14.7893 12.9508C15.295 13.4759 16.115 13.4759 16.6207 12.9508C17.1264 12.4257 17.1264 11.5743 16.6207 11.0492L10.2107 4.39382Z"
                                    fill="currentcolor" />
                                  <path
                                    d="M8.3795 17.7046C7.87376 18.2297 7.87376 19.0811 8.3795 19.6062C8.88523 20.1313 9.70519 20.1313 10.2109 19.6062L16.6207 12.9508C17.1264 12.4257 17.1264 11.5743 16.6207 11.0492C16.115 10.5241 15.2952 10.5241 14.7895 11.0492L8.3795 17.7046Z"
                                    fill="currentcolor" />
                                </svg>
                              </span>
                        <span className="cb-icon cb-icon-arrow-bold-left cb-icon__size-24">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M13.7893 19.6062C14.295 20.1313 15.115 20.1313 15.6207 19.6062C16.1264 19.0811 16.1264 18.2297 15.6207 17.7046L9.21072 11.0492C8.70499 10.5241 7.88503 10.5241 7.3793 11.0492C6.87357 11.5743 6.87357 12.4257 7.3793 12.9508L13.7893 19.6062Z"
                                    fill="currentcolor" />
                                  <path
                                    d="M15.6205 6.29537C16.1262 5.77027 16.1262 4.91892 15.6205 4.39382C15.1148 3.86873 14.2948 3.86873 13.7891 4.39382L7.3793 11.0492C6.87357 11.5743 6.87357 12.4257 7.3793 12.9508C7.88503 13.4759 8.70479 13.4759 9.21053 12.9508L15.6205 6.29537Z"
                                    fill="currentcolor" />
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
              <div className="cb-datepicker">
                <p className="cb-datepicker__label">Дата регистрации</p>
                <div className="cb-datepicker__value">
                  <div className="cb-datepicker__field">
                    <input type="text" className="cb-datepicker__input" value={date_reg} placeholder="__.__.____"
                           onChange={handleInputDateReg} />
                    <div className="cb-datepicker__group-icon cb-datepicker__group-icon--calendar">
                            <span className="cb-datepicker__icon cb-icon cb-icon-calendar cb-icon__size-24">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M19.2 4.875H17.55V3.75C17.55 3.375 17.25 3 16.8 3C16.425 3 16.05 3.3 16.05 3.75V4.875H7.875V3.75C7.875 3.375 7.575 3 7.125 3C6.75 3 6.375 3.3 6.375 3.75V4.875H4.8C3.825 4.875 3 5.625 3 6.675V19.2C3 20.175 3.825 21 4.8 21H19.2C20.175 21 21 20.175 21 19.2V6.675C21 5.625 20.175 4.875 19.2 4.875ZM7.2 7.2C7.575 7.2 7.95 6.9 7.95 6.45V6.3H16.125V6.45C16.125 6.825 16.425 7.2 16.875 7.2C17.25 7.2 17.625 6.9 17.625 6.45V6.3H19.2C19.425 6.3 19.65 6.525 19.65 6.75V8.475H4.425V6.75C4.425 6.525 4.65 6.3 4.875 6.3H6.45V6.45C6.45 6.825 6.75 7.2 7.2 7.2ZM19.575 19.125C19.575 19.35 19.35 19.575 19.125 19.575H4.875C4.65 19.575 4.425 19.35 4.425 19.125V13.65V9.975H19.575V19.125Z"
                                  fill="currentColor" />
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 14.5L8.96891 10.75L15.0311 10.75L12 14.5Z"
                                            fill="currentColor" />
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
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 14.5L8.96891 10.75L15.0311 10.75L12 14.5Z"
                                            fill="currentColor" />
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
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M10.2107 4.39382C9.70499 3.86873 8.88503 3.86873 8.3793 4.39382C7.87357 4.91892 7.87357 5.77027 8.3793 6.29536L14.7893 12.9508C15.295 13.4759 16.115 13.4759 16.6207 12.9508C17.1264 12.4257 17.1264 11.5743 16.6207 11.0492L10.2107 4.39382Z"
                                    fill="currentcolor" />
                                  <path
                                    d="M8.3795 17.7046C7.87376 18.2297 7.87376 19.0811 8.3795 19.6062C8.88523 20.1313 9.70519 20.1313 10.2109 19.6062L16.6207 12.9508C17.1264 12.4257 17.1264 11.5743 16.6207 11.0492C16.115 10.5241 15.2952 10.5241 14.7895 11.0492L8.3795 17.7046Z"
                                    fill="currentcolor" />
                                </svg>
                              </span>
                        <span className="cb-icon cb-icon-arrow-bold-left cb-icon__size-24">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M13.7893 19.6062C14.295 20.1313 15.115 20.1313 15.6207 19.6062C16.1264 19.0811 16.1264 18.2297 15.6207 17.7046L9.21072 11.0492C8.70499 10.5241 7.88503 10.5241 7.3793 11.0492C6.87357 11.5743 6.87357 12.4257 7.3793 12.9508L13.7893 19.6062Z"
                                    fill="currentcolor" />
                                  <path
                                    d="M15.6205 6.29537C16.1262 5.77027 16.1262 4.91892 15.6205 4.39382C15.1148 3.86873 14.2948 3.86873 13.7891 4.39382L7.3793 11.0492C6.87357 11.5743 6.87357 12.4257 7.3793 12.9508C7.88503 13.4759 8.70479 13.4759 9.21053 12.9508L15.6205 6.29537Z"
                                    fill="currentcolor" />
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
            <div className="constructor__card-item">
              <ul className="constructor__description">
                <li className="constructor__description-item">
                  <p className="constructor__description-label">Сведения об авторах</p>
                  <p className="constructor__description-value">{infoAuthor}</p>
                </li>
                <li className="constructor__description-item">
                  <p className="constructor__description-label">Сведения о правообладателе(ях)</p>
                  <p className="constructor__description-value">{infoMaster}</p>
                </li>
                <li className="constructor__description-item" style={{ display: "flex" }}>
                  <p className="constructor__description-label">
                    Контактные реквизиты для предоставления третьим лицам
                  </p>
                  <input style={{ width: '55%', margin: 0, padding: '6px 7px' }}
                         className="cb-text-field__input input" type="search" value={contacts}
                         placeholder="Введите контакты..." onChange={handleInputContacts} />
                </li>
                <li className="constructor__description-item">
                  <p className="constructor__description-label">Название программы для ЭВМ</p>
                  <p className="constructor__description-value">{evm}</p>
                </li>
                <li className="constructor__description-item" style={{ display: "flex" }}>
                  <p className="constructor__description-label">
                    Год создания
                  </p>
                  <input style={{ width: '55%', margin: 0, padding: '6px 7px' }}
                         className="cb-text-field__input input" type="search" value={yearCreate ? yearCreate : ''}
                         placeholder="Введите год..." onChange={handleInputYearCreate} />
                </li>
                <li className="constructor__description-item">
                  <p className="constructor__description-label">URL публикации в открытых реестрах сайта ФИПС</p>
                  <a href={url} className="constructor__description-value">{url}</a>
                </li>
              </ul>
            </div>
            <div style={{ textAlign: "center" }}>
              <button className="cb-button" onClick={handleCloseModal}>Сохранить и закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CpInfoModal;