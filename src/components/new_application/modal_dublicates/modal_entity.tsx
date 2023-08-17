import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "../constructor.scss"
import "../order-request.scss"
import "../modal.css"
import PageHeader from "../../page-header/page-header";
import { SearchProvider } from "../../context_for_search";
import { NewAppContext } from "../../context_for_application";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils";


function EntityModal(props: any) {
  const location = useLocation();
  const [resourse, setResourse] = useContext(NewAppContext)
  const data = location.state;

  const [answers, setAnswer] = useContext(NewAppContext)
  const history = useNavigate();

  const [fullName, setFullName] = useState(getItemFromLocalStorage('full_name'))
  const [shortName, setShortName] = useState(getItemFromLocalStorage('short_name'))
  const [inn, setInn] = useState(getItemFromLocalStorage('inn'))
  const [ogrnin, setOgrnin] = useState(getItemFromLocalStorage('ogrnin'))
  const [email, setEmail] = useState(getItemFromLocalStorage('email'))
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputFullName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFullName(e.target.value);
  };

  const handleInputShortName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setShortName(e.target.value);
  };
  const handleInputInn = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInn(e.target.value);
  };
  const handleInputOgrnin = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setOgrnin(e.target.value);
  };
  const handleInputEmail = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handleCloseModal = () => {
    try {
      setItemToLocalStorage('full_name', fullName)
      setItemToLocalStorage('short_name', shortName)
      setItemToLocalStorage('inn', inn)
      setItemToLocalStorage('ogrnin', ogrnin)
      setItemToLocalStorage('email', email)
      // props.onUpdate(listCommentsLength)
      // window.location.reload()
      props.onClose()
      // localStorage.clear()
    }
    catch (error) { console.log(error) }
  }

  const onclick = (e: any) => {
    if (!file) { return; }

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
    history("/reg_ros_po/", { state: newAnswer });
  }
  // const rightData = Object.entries(data)

  useEffect(() => {
    console.log('Current data is ', resourse);
  }, [resourse]);

  return (
    <div className="order-request__container">
      <div className="constructor">
        <div className="constructor__inner">
          <div className="constructor__card" style={{boxShadow: 'none'}}>
            <header className="constructor__header">
              <p className="constructor__title">Юридическое лицо</p>
            </header>
            <div className="constructor__card-item">
              <div className="constructor__card-row is-inn">
                <div className="cb-text-field">
                  <label className="cb-text-field__label cb-text-field">
                    ИНН
                    <input className="cb-text-field__input input" type="text" value={inn}
                           placeholder="Введите ИНН..." onChange={handleInputInn} />
                  </label>
                  {/*<label className="cb-text-field__label cb-text-field">ИНН</label>*/}
                  {/*<div className="cb-text-field__value">*/}
                  {/*  <input className="cb-text-field__input input" type="text" value={inn} placeholder="Введите ИНН..." onChange={handleInputInn} />*/}
                  {/*  <div className="cb-text-field__group-icon">*/}
                  {/*    /!* <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                  {/*      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                  {/*          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" stroke-width="1.5"/>*/}
                  {/*          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" stroke-width="1.5"/>*/}
                  {/*      </svg>*/}
                  {/*  </span> *!/*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
                <div className="cb-text-field">
                  <label className="cb-text-field__label cb-text-field">
                    ОГРНИП
                    <input className="cb-text-field__input input" type="text" value={ogrnin}
                           placeholder="Введите ОГРНИН..." onChange={handleInputOgrnin} />
                  </label>
                  {/*<label className="cb-text-field__label cb-text-field">ОГРНИП</label>*/}
                  {/*<div className="cb-text-field__value">*/}
                  {/*  <input className="cb-text-field__input input" type="text" value={ogrnin} placeholder="Введите ОГРНИН..." onChange={handleInputOgrnin} />*/}
                  {/*  <div className="cb-text-field__group-icon">*/}
                  {/*    /!* <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                  {/*      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                  {/*          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" stroke-width="1.5"/>*/}
                  {/*          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" stroke-width="1.5"/>*/}
                  {/*      </svg>*/}
                  {/*  </span> *!/*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
              <div className="constructor__card-row">
                <div className="cb-text-field">
                  <label className="cb-text-field__label cb-text-field">
                    Полное наименование
                    <input className="cb-text-field__input input" type="text" value={fullName}
                           placeholder="Введите полное имя..." onChange={handleInputFullName} />
                  </label>
                  {/*<label className="cb-text-field__label cb-text-field">Полное наименование</label>*/}
                  {/*<div className="cb-text-field__value">*/}
                  {/*  <input className="cb-text-field__input input" type="text" value={fullName}*/}
                  {/*         placeholder="Введите полное имя..." onChange={handleInputFullName} />*/}
                  {/*  <div className="cb-text-field__group-icon">*/}
                  {/*    /!* <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                  {/*      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                  {/*          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" stroke-width="1.5"/>*/}
                  {/*          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" stroke-width="1.5"/>*/}
                  {/*      </svg>*/}
                  {/*  </span> *!/*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
              <div className="constructor__card-row">
                <div className="cb-text-field">
                  <label className="cb-text-field__label cb-text-field">
                    Сокращенное наименование
                    <input className="cb-text-field__input input" type="text" value={shortName}
                           placeholder="Введите сокращенное имя..." onChange={handleInputShortName} />
                  </label>
                  {/*<label className="cb-text-field__label cb-text-field">Сокращенное наименование</label>*/}
                  {/*<div className="cb-text-field__value">*/}
                  {/*  <input className="cb-text-field__input input" type="text" value={shortName}*/}
                  {/*         placeholder="Введите сокращенное имя..." onChange={handleInputShortName} />*/}
                  {/*  <div className="cb-text-field__group-icon">*/}
                  {/* <span className="cb-icon cb-icon-clear cb-icon__size-24">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" stroke-width="1.5"/>
                              <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" stroke-width="1.5"/>
                          </svg>
                      </span> */}
                  {/*</div>*/}
                  {/*</div>*/}
                </div>
              </div>
              <div className="constructor__card-row">
                <div className="cb-text-field">
                  <label className="cb-text-field__label cb-text-field">
                    Email
                    <input className="cb-text-field__input input" type="text" value={email}
                           placeholder="Введите email..." onChange={handleInputEmail} />
                  </label>
                  {/*<label className="cb-text-field__label cb-text-field">Email</label>*/}
                  {/*<div className="cb-text-field__value">*/}
                  {/*  <input className="cb-text-field__input input" type="text" value={email}*/}
                  {/*         placeholder="Введите email..." onChange={handleInputEmail} />*/}
                  {/*  <div className="cb-text-field__group-icon">*/}
                  {/*    /!* <span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                  {/*      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                  {/*          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" stroke-width="1.5"/>*/}
                  {/*          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" stroke-width="1.5"/>*/}
                  {/*      </svg>*/}
                  {/*  </span> *!/*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
              {/* <div className="constructor__card-row">
            <p className="constructor__card-row-text-helper">Подтверждение полномочий лица, подписавшего заявление</p>
            <div className="constructor__row">
                              <span className="cb-icon cb-icon__size-48">
                                  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                                  <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                                  <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                                  <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                                  </svg>
                              </span>
                              <a href="#" className="constructor__file">{file && `${file.name} - ${file.type}`}</a>
                              <span className="cb-icon cb-icon__size-24">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor"/>
                                  </svg>
                              </span>
                              </div>
            <div className="cb-file-uploader">
              <input id="cb-file-uploader__field" type="file" className="cb-file-uploader__visually-hidden" onChange={handleFileChange} multiple/>
              <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
              <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
              <label htmlFor="cb-file-uploader__field" className="cb-file-uploader__label">
                  <a href="" className="cb-file-uploader__link" >Выбрать файл</a>
              </label>
            </div>
          </div> */}
            </div>
            <div style={{textAlign: "center"}}>
              <button className="cb-button" onClick={handleCloseModal}>Сохранить и закрыть</button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}

export default EntityModal;