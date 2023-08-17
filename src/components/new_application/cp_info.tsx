import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "./constructor.scss"
import "./order-request.scss"
import "../../css/style.css"
import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import { NewAppContext } from "../context_for_application";
import { Url } from "url";
import Swal from "sweetalert2";
import { getItemFromLocalStorage, setItemToLocalStorage } from "./utils";

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

function CpInfo() {

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
      if (newData[0]?.contact_to_third_parties === ''){
        setСontacts('Не указаны')
      }
      if (newData[0]?.creation_year === null) {
        setYearCreate('Не указан')
      }
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

  const onclick = (e: any) => {
    if (registration_number.trim() === '') { alert("Введите номер роспатента.") }
    else {
      const newAnswer = [
        { cp_info: 'Сведения о ЦП' },
        [{ ctru: ctru },
        { okpd: okpd },
        { nfap: nfap },
        { website_har: website_har },
        { website_prod: website_prod },
        { number: registration_number },
        { date_reg: date_reg },
        { date_pub: date_pub }
        ]
      ];
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
      setAnswer((prevAnswers: any) => [...prevAnswers, newAnswer]);
      history("/cert_of_def/", { state: newAnswer });
    }
  }
  // const rightData = Object.entries(data)

  useEffect(() => {
    console.log('Current data is ', resourse);
  }, [resourse]);


  return (
    <>
      <SearchProvider>
        <PageHeader />
      </SearchProvider>
      <div className="order-request">
        <div className="order-request__container">
          <div className="constructor">
            <header className="constructor__header">
              <a href="" className="constructor__link-back"><Link id="GoBack" to={"/cp_har"}>Назад</Link></a>
              <p className="constructor__title">Сведения о ЦП</p>
            </header>
            <div className="constructor__inner">
              <div className="constructor__card">
                <div className="constructor__card-item">
                  <div className="constructor__card-row" style={{ display: "flex" }}>
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Код КТРУ
                        <input id="KtruInput" className="cb-text-field__input input" type="search" value={ctru}
                          placeholder="Введите КТРУ"
                          onChange={handleInputCtru} />
                      </label>
                    </div>
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Код ОКПД
                        <input id="OkpdInput" className="cb-text-field__input input" type="search" value={okpd}
                          placeholder="Введите ОКПД"
                          onChange={handleInputOkpd} />
                      </label>
                    </div>
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        № в НФАП
                        <input id="NfapInput" className="cb-text-field__input input" type="search" value={nfap}
                          placeholder="Введите НФАП"
                          onChange={handleInputNfap} />
                      </label>
                    </div>
                  </div>
                  <div className="constructor__card-row">
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Сайт с характеристиками ЦП
                        <input id="WebsiteHarInput" className="cb-text-field__input input" type="search" value={website_har}
                          placeholder="Введите адрес"
                          onChange={handleInputWebSiteHar} />
                      </label>
                    </div>
                  </div>
                  <div className="constructor__card-row">
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Сайт поставщика с экземпляром ЦП
                        <input id="WebsiteProdInput" className="cb-text-field__input input" type="search" value={website_prod}
                          placeholder="Введите адрес"
                          onChange={handleInputWebSiteProd} />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="constructor__card-item">
                  <div className="cb-text-field__label">
                    <button id="SearchFromRosReestrButton" className="cb-button" onClick={getDataFromNumber}>
                      Найти по номеру Роспатента
                    </button>
                  </div>
                  <p className="constructor__card-item-title">Реквизиты Роспатента</p>
                  <div className="cb-text-field">
                    <label className="cb-text-field__label cb-text-field">
                      Номер
                      <input id="RosReestrNumberInput" className="cb-text-field__input input" type="search" value={registration_number}
                        placeholder="Введите № Роспатента..."
                        onChange={handleInputNumber} />
                    </label>
                  </div>
                  <div className="constructor__card-row is-1fr-1fr-1fr">
                    <div className="cb-datepicker">
                      <label className="cb-datepicker__label">Дата публикации</label>
                      <div className="cb-datepicker__value">
                          <p id="DatePubInput" className="cb-datepicker__input" placeholder="__.__.____">{date_pub}</p>
                      </div>
                    </div>
                    <div className="cb-datepicker">
                      <p className="cb-datepicker__label">Дата регистрации</p>
                      <div className="cb-datepicker__value">
                          <p id="DateRegInput" className="cb-datepicker__input" placeholder="__.__.____">{date_reg}</p>
                      </div>
                    </div>
                  </div>
                  <div className="constructor__card-item">
                    <ul className="constructor__description">
                      <li className="constructor__description-item">
                        <p className="constructor__description-label">Сведения об авторах</p>
                        <p id="InfoAuthor" className="constructor__description-value">{infoAuthor}</p>
                      </li>
                      <li className="constructor__description-item">
                        <p className="constructor__description-label">Сведения о правообладателе(ях)</p>
                        <p id="InfoMaster" className="constructor__description-value">{infoMaster}</p>
                      </li>
                      <li className="constructor__description-item" style={{ display: "flex" }}>
                        <p className="constructor__description-label">
                          Контактные реквизиты для предоставления третьим лицам
                        </p>
                        <p id="ContactsInput" className="constructor__description-value">{contacts ? contacts: ''}</p>
                      </li>
                      {/*<div className="cb-text-field">*/}
                      {/*  /!*<label className="constructor__description-label">Контактные реквизиты для предоставления третьим лицам</label>*!/*/}
                      {/*  <label className="cb-text-field__label cb-text-field">*/}
                      {/*    <span className="constructor__description-label">*/}
                      {/*      Контактные реквизиты для предоставления третьим лицам*/}
                      {/*    </span>*/}
                      {/*    <input className="cb-text-field__input input" type="search" value={contacts}*/}
                      {/*           placeholder="Введите контакты..."*/}
                      {/*           onChange={handleInputContacts}/>*/}
                      {/*  </label>*/}
                      {/*  /!*<div className="cb-text-field__value">*!/*/}
                      {/*  /!*  <input className="cb-text-field__input" type="text" value={contacts}*!/*/}
                      {/*  /!*         placeholder="Введите контакты" onChange={handleInputContacts}/>*!/*/}
                      {/*  /!*</div>*!/*/}
                      {/*  /!* <p className="constructor__description-value">{contacts}</p> *!/*/}
                      {/*</div>*/}
                      <li className="constructor__description-item">
                        <p className="constructor__description-label">Название программы для ЭВМ</p>
                        <p id="Evm" className="constructor__description-value">{evm}</p>
                      </li>
                      <li className="constructor__description-item" style={{ display: "flex" }}>
                        <p className="constructor__description-label">
                          Год создания
                        </p>
                        <p id="YearCreateInput" className="constructor__description-value">
                          {yearCreate ? yearCreate : ''}
                        </p>
                      </li>
                      {/*<div className="cb-text-field">*/}
                      {/*  <label className="cb-text-field__label cb-text-field">*/}
                      {/*    <span className="constructor__description-label">*/}
                      {/*      Год создания*/}
                      {/*    </span>*/}
                      {/*    <input className="cb-text-field__input input" type="search" value={yearCreate ? yearCreate :''}*/}
                      {/*           placeholder="Введите год..."*/}
                      {/*           onChange={handleInputYearCreate}/>*/}
                      {/*  </label>*/}
                      {/*  /!*<label className="constructor__description-label">Год создания</label>*!/*/}
                      {/*  /!*<div className="cb-text-field__value">*!/*/}
                      {/*  /!*  <input className="cb-text-field__input" type="text" value={yearCreate}*!/*/}
                      {/*  /!*         placeholder="Введите год" onChange={handleInputYearCreate}/>*!/*/}
                      {/*  /!*</div>*!/*/}
                      {/*  /!* <p className="constructor__description-value">{yearCreate}</p> *!/*/}
                      {/*</div>*/}
                      <li className="constructor__description-item">
                        <p className="constructor__description-label">URL публикации в открытых реестрах сайта ФИПС</p>
                        <a id="Url" href={url} className="constructor__description-value">{url}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <button id="CpInfoNextButton" className="cb-button" onClick={onclick}>Далее</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CpInfo;