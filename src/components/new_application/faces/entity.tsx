import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "../constructor.scss"
import "../order-request.scss"
import PageHeader from "../../page-header/page-header";
import { SearchProvider } from "../../context_for_search";
import { NewAppContext } from "../../context_for_application";
import Swal from "sweetalert2";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils";

export interface Entity {
  inn: number;
  ogrn: number;
  full_name: string;
  short_name: string
}


function Entity() {

  const location = useLocation();
  const [resourse, setResourse] = useContext(NewAppContext)
  const data = location.state;

  const [answers, setAnswer] = useContext(NewAppContext)
  const history = useNavigate();

  const [egrulData, setEgrulData] = useState<Entity>()

  const [fullName, setFullName] = useState('')
  const [shortName, setShortName] = useState('')
  const [inn, setInn] = useState('')
  const [ogrnin, setOgrnin] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<File>();


  useEffect(() => {
    const savedfullName = getItemFromLocalStorage('full_name');
    const savedshortName = getItemFromLocalStorage('short_name');
    const savedinn = getItemFromLocalStorage('inn');
    const savedogrnin = getItemFromLocalStorage('ogrnin');
    const savedemail = getItemFromLocalStorage('email');
    // const savedfile = getItemFromLocalStorage('full_name');

    if (savedfullName !== null) {
      setFullName(savedfullName);
    }
    if (savedshortName !== null) {
      setShortName(savedshortName);
    }
    if (savedinn !== null) {
      setInn(savedinn);
    }
    if (savedogrnin !== null) {
      setOgrnin(savedogrnin);
    }
    if (savedemail !== null) {
      setEmail(savedemail);
    }

  }, []);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0] as Blob;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const newFile = new Uint8Array(reader.result as ArrayBuffer);
        setItemToLocalStorage('fileData', Array.from(newFile));
        console.log(newFile)
      }
      setFile(e.target.files[0]);
    }
  };

  const handleInputInn = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInn(e.target.value);
  };


  const getDataFromInn = async () => {
    try {
      const url = `services/egrul/${inn}/egrul/`
      const response = await axios.get(url);
      const newData = await response.data;
      setEgrulData(newData);
      setInn(`${newData?.inn}`)
      setFullName(`${newData?.full_name}`)
      setShortName(`${newData?.short_name}`)
      setOgrnin(`${newData?.ogrn}`)
      console.log(newData)

    } catch (error) {
      if (error) {
        setInn('')
        setFullName('')
        setShortName('')
        setOgrnin('')
        Swal.fire({
          title: 'ИНН не найден',
          text: 'Попробуйте ввести другой ИНН',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      if (inn === '') {
        setInn('')
        setFullName('')
        setShortName('')
        setOgrnin('')
        Swal.fire({
          title: 'Введите ИНН',
          confirmButtonText: 'OK'
        });
      }
      console.error("Вот твоя ошибка", error)
    }
  };

  const onclick = (e: any) => {
    if (inn.trim() === '') { alert("Введите ИНН.") }
    else {
      if (file) {


        let data_files = new FormData()
        data_files.append('statement', file)

        const newAnswer = [
          { create_body_entity: 'Юридическое лицо' },
          [{ full_name: fullName },
          { short_name: shortName },
          { inn: inn },
          { ogrnin: ogrnin },
          { email: email },
          { file: file.name }
          ]
        ];
        setAnswer((prevAnswers: any) => [...prevAnswers, newAnswer]);
        setItemToLocalStorage('full_name', fullName)
        setItemToLocalStorage('short_name', shortName)
        setItemToLocalStorage('inn', inn)
        setItemToLocalStorage('ogrnin', ogrnin)
        setItemToLocalStorage('email', email)
        setItemToLocalStorage('file', file.name)
        setItemToLocalStorage('file_type', file.type)
        history("/reg_ros_po/", {})
      }
      else { alert("Выберете файл.") };
    }
  }
  // const rightData = Object.entries(data)

  // useEffect(() => {
  //     console.log('Current data is ', resourse);
  //   }, [resourse]);

  const handleInputFullName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFullName(e.target.value);
  };
  const handleInputShortName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setShortName(e.target.value);
  };
  const handleInputOgrnin = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setOgrnin(e.target.value);
  };
  const handleInputEmail = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <SearchProvider>
        <PageHeader />
      </SearchProvider>
      <div className="order-request">
        <div className="order-request__container">
          <div className="constructor">
            <header className="constructor__header">
              <Link to={"/prod_info"} className="constructor__link-back">Назад</Link>
              <h1 className="constructor__title">Юридическое лицо</h1>
            </header>
            <div>
              <button id="SearchFromInn" className="cb-button" onClick={getDataFromInn}>Найти данные по ИНН</button>
            </div>
            <div className="constructor__inner">
              <div className="constructor__card">
                <div className="constructor__card-item">
                  <div className="constructor__card-row is-inn">
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        ИНН
                        <input id="EntityInnInput" className="cb-text-field__input input" type="search" value={inn} placeholder="Введите ИНН"
                          onChange={handleInputInn} />
                      </label>

                      {/*<div className="cb-text-field__group-icon">*/}
                      {/*  <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                      {/*    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"*/}
                      {/*         xmlns="http://www.w3.org/2000/svg">*/}
                      {/*      <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" stroke-width="1.5"/>*/}
                      {/*      <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" stroke-width="1.5"/>*/}
                      {/*    </svg>*/}
                      {/*  </span>*/}
                      {/*</div>*/}
                    </div>
                    <div className="cb-text-field">
                      <label className="cb-text-field__label  cb-text-field">
                        ОГРН
                        <input id="EntityOgrinInput" disabled className="cb-text-field__input input" value={ogrnin} onChange={handleInputOgrnin} placeholder="ОГРН" />
                      </label>
                    </div>
                  </div>
                  <div className="constructor__card-row">
                    <div className="cb-text-field__label cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Полное наименование
                        <input id="EntityFullNameInput" disabled className="cb-text-field__input input" value={fullName} onChange={handleInputFullName} placeholder="Полное название" />
                      </label>
                    </div>
                  </div>
                  <div className="constructor__card-row">
                    <div className="cb-text-field__label cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Сокращенное наименование
                        <input id="EntityShortNameInput" disabled className="cb-text-field__input input" value={shortName} onChange={handleInputFullName} placeholder="Сокращенное название" />
                      </label>
                    </div>
                  </div>
                  <div className="constructor__card-row">
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Email
                        <input id="EntityEmailInput" className="cb-text-field__input input" type="search" value={email}
                          placeholder="Введите email"
                          onChange={handleInputEmail} />
                      </label>
                    </div>
                  </div>
                  <div className="constructor__card-row">
                    <p className="constructor__card-row-text-helper">Подтверждение полномочий лица, подписавшего
                      заявление</p>
                    <div className="constructor__row">
                      <a href="#" className="constructor__file">{file && `${file.name}`}</a>
                      <span className="cb-icon cb-icon__size-24">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z"
                            fill="currentColor" />
                        </svg>
                      </span>
                    </div>
                    <div className="cb-file-uploader">
                      <input id="cb-file-uploader__field" type="file" className="cb-file-uploader__visually-hidden"
                        onChange={handleFileChange} multiple />
                      <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                      <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                      <label htmlFor="cb-file-uploader__field" className="cb-file-uploader__label">
                        <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button id="EntityNextButton" className="cb-button" onClick={onclick}>Далее</button>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Entity;