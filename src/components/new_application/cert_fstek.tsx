import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "./constructor.scss"
import "./order-request.scss"
import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import Swal from "sweetalert2";
import { NewAppContext } from "../context_for_application";
import { Url } from "url";
import { getItemFromLocalStorage, setItemToLocalStorage } from "./utils";

export interface CertInfo {
  id: number,
  cert_number: string,
  cert_date_from: string,
  cert_date_to: string,
  new_tool: string,
  name_doc_consensus: string,
  cert_schema: string,
  testing_laboratory: string,
  cert_org: string,
  cert_software_vendor: string,
  cert_software_vendor_requisites: string,
  cert_date_end: string,
}


function CertFstek() {

  const location = useLocation();
  const [resourse, setResourse] = useContext(NewAppContext)
  const data = location.state;

  const [answers, setAnswer] = useContext(NewAppContext)
  const history = useNavigate();

  const [fstekId, setFstekId] = useState('')
  const [certNumber, setCertNumber] = useState('');
  const [cert_date_from, setCert_date_from] = useState('');
  const [cert_date_to, setCert_date_to] = useState('');
  const [name_tool, setName_tool] = useState('');
  const [name_doc_consensus, setName_doc_consensus] = useState('');
  const [cert_software_vendor, setCert_software_vendor] = useState('');
  const [file, setFile] = useState<File>();


  const [rosData, setRosDaata] = useState<CertInfo>()


  useEffect(() => {
    const savedcertNumber = getItemFromLocalStorage('certNumber');
    const savedcert_date_from = getItemFromLocalStorage('cert_date_from');
    const savedcert_date_to = getItemFromLocalStorage('cert_date_to');
    const savedname_tool = getItemFromLocalStorage('name_tool');
    const savedname_doc_consensus = getItemFromLocalStorage('name_doc_consensus');
    const savedcert_software_vendor = getItemFromLocalStorage('cert_software_vendor');
    // const savedfile = getItemFromLocalStorage('full_name');

    if (savedcertNumber !== null) {
      setCertNumber(savedcertNumber);
    }
    if (savedcert_date_from !== null) {
      setCert_date_from(savedcert_date_from);
    }
    if (savedcert_date_to !== null) {
      setCert_date_to(savedcert_date_to);
    }
    if (savedname_tool !== null) {
      setName_tool(savedname_tool);
    }
    if (savedname_doc_consensus !== null) {
      setName_doc_consensus(savedname_doc_consensus);
    }
    if (savedcert_software_vendor !== null) {
      setCert_software_vendor(savedcert_software_vendor);
    }

  }, []);

  const handleInputCertNumber = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCertNumber(e.target.value);
  };
  const handleInputCert_date_from = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCert_date_from(e.target.value);
  };
  const handleInputCert_date_to = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCert_date_to(e.target.value);
  };
  const handleInputName_tool = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setName_tool(e.target.value);
  };
  const handleInputName_doc_consensus = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setName_doc_consensus(e.target.value);
  };
  const handleInputCert_software_vendor = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCert_software_vendor(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0] as Blob;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const newFile = new Uint8Array(reader.result as ArrayBuffer);
        setItemToLocalStorage('cert_fileData', Array.from(newFile));
        console.log(newFile)
      }
      setFile(e.target.files[0]);
    }
  };

  const getDataFromNumber = async () => {
    try {
      const url = `services/cert_reg/get_by_number/?cert_number=${certNumber}`
      const response = await axios.get(url);
      const newData = await response.data;

      setRosDaata(newData);
      setFstekId(`${newData[0]?.id}`)
      setCertNumber(`${newData[0]?.cert_number}`)
      setCert_date_from(`${newData[0]?.cert_date_from}`)
      setCert_date_to(`${newData[0]?.cert_date_to}`)
      setName_tool(`${newData[0]?.name_tool}`)
      setName_doc_consensus(`${newData[0]?.name_doc_consensus}`)
      setCert_software_vendor(`${newData[0]?.cert_software_vendor}`)

      console.log(newData[0])
      if (newData.detail === 'Not found.') {
        setRosDaata(newData);
        setCertNumber('')
        setCert_date_from('')
        setCert_date_to('')
        setName_tool('')
        setName_tool('')
        setName_doc_consensus('')
        setCert_software_vendor('')
        Swal.fire({
          title: 'Номер не найден',
          text: 'Попробуйте ввести другой номер',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      if (newData.length === 0) {
        setCertNumber('')
        setCert_date_from('')
        setCert_date_to('')
        setName_tool('')
        setName_tool('')
        setName_doc_consensus('')
        setCert_software_vendor('')
        Swal.fire({
          title: 'Номер не найден',
          text: 'Попробуйте ввести другой номер',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }

    } catch (error) {
      if (error) {
        setCertNumber('')
        setCert_date_from('')
        setCert_date_to('')
        setName_tool('')
        setName_tool('')
        setName_doc_consensus('')
        setCert_software_vendor('')
        Swal.fire({
          title: 'Номер не найден',
          text: 'Попробуйте ввести другой номер',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      if (certNumber === '') {
        setCertNumber('')
        setCert_date_from('')
        setCert_date_to('')
        setName_tool('')
        setName_tool('')
        setName_doc_consensus('')
        setCert_software_vendor('')
        Swal.fire({
          title: 'Введите номер патента',
          confirmButtonText: 'OK'
        });
      }
      console.error("Вот твоя ошибка", error)
    }
  };

  const onclick = (e: any) => {
    if (certNumber.trim() === '') { alert("Введите номер сертификата.") }
    else {
      if (file) {

        let data_files = new FormData()
        data_files.append('cert_file', file)

        const newAnswer = [''];

        setItemToLocalStorage('fstekId', fstekId)
        setItemToLocalStorage('certNumber', certNumber)
        setItemToLocalStorage('cert_date_from', cert_date_from)
        setItemToLocalStorage('cert_date_to', cert_date_to)
        setItemToLocalStorage('name_tool', name_tool)
        setItemToLocalStorage('name_doc_consensus', name_doc_consensus)
        setItemToLocalStorage('cert_software_vendor', cert_software_vendor)
        setItemToLocalStorage('cert_file', file.name)
        setItemToLocalStorage('cert_file_type', file.type)

        // setAnswer((prevAnswers: any) =>[...prevAnswers, newAnswer]);
        history("/prod_docs/", {});
      }
      else { alert("Выберете файл.") }
    }
  }
  // const rightData = Object.entries(data)

  useEffect(() => {
    console.log('Current data is ', resourse);
  }, [resourse]);

  const clickBack = (e: any) => {
    history(-1)
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
              <a className="constructor__link-back" onClick={clickBack}>Назад</a>
              {/* <Link className="constructor__link-back" to={"/where_got_cert"}>Назад</Link> */}
              <p className="constructor__title">Сертификат ФСТЭК</p>
            </header>
            <div className="cb-text-field__label">
              <button id="GetFromCertNumberButton" className="cb-button"
                onClick={getDataFromNumber}
              >Найти по номеру сертификата
              </button>
            </div>
            <div className="constructor__inner">
              <div className="constructor__card">
                <div className="constructor__card-item">
                  <div className="cb-text-field">
                    <label className="cb-text-field__label cb-text-field">
                      Номер сертификата
                      <input id="CertNumberInput" className="cb-text-field__input input" type="search" value={certNumber}
                        placeholder="Введите номер сертификата..."
                        onChange={handleInputCertNumber} />
                    </label>
                  </div>
                  <div className="cb-text-field">
                    <label className="cb-text-field__label cb-text-field">
                      Дата внесения в реестр
                      <input disabled id="CertDateFromInput" className="cb-text-field__input input" type="search" value={cert_date_from}
                        placeholder="Дата"
                        onChange={handleInputCert_date_from} />
                    </label>
                    {/*<label className="constructor__description-label">Дата внесения в реестр</label>*/}
                    {/*<div className="cb-text-field__value">*/}
                    {/*  <input className="cb-text-field__input" type="text" value={cert_date_from} placeholder="Введите дату" onChange={handleInputCert_date_from} />*/}
                    {/*</div>*/}
                  </div>
                  <div className="cb-text-field">
                    <label className="cb-text-field__label cb-text-field">
                      Наименование средства
                      <input disabled id="NameToolInput" className="cb-text-field__input input" type="search" value={name_tool}
                        placeholder="Наименование"
                        onChange={handleInputName_tool} />
                    </label>
                  </div>
                  <div className="cb-text-field">
                    <label className="cb-text-field__label cb-text-field">
                      Срок действия сертификата
                      <input disabled id="CertDateToInput" className="cb-text-field__input input" type="search" value={cert_date_to}
                        placeholder="Окончание действия сертификата"
                        onChange={handleInputCert_date_to} />
                    </label>
                  </div>
                  <div className="cb-text-field">
                    <label className="cb-text-field__label cb-text-field">
                      Наименование документов, которым соответствуют
                      <input disabled id="NameDocConsensusInput" className="cb-text-field__input input" type="search" value={name_doc_consensus}
                        placeholder="Наименование документов"
                        onChange={handleInputName_doc_consensus} />
                    </label>
                  </div>
                  <div className="cb-text-field">
                    <label className="cb-text-field__label cb-text-field">
                      Заявитель
                      <input disabled id="CertSoftwareVendorInput" className="cb-text-field__input input" type="search" value={cert_software_vendor}
                        placeholder="Заявитель"
                        onChange={handleInputCert_software_vendor} />
                    </label>
                  </div>
                  <div className="constructor__card-row">
                    <p className="constructor__card-row-text-helper">Копия сертификата</p>
                    <div className="constructor__row">
                      <a href="#" className="constructor__file">{file && `${file.name}`}</a>
                      <span className="cb-icon cb-icon__size-24">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="cb-file-uploader">
                    <input id="cb-file-uploader__field" type="file" className="cb-file-uploader__visually-hidden" onChange={handleFileChange} multiple />
                    <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                    <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                    <label htmlFor="cb-file-uploader__field" className="cb-file-uploader__label">
                      <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                    </label>
                  </div>
                </div>
              </div>
              <button id="CertFstekNextButton" className="cb-button" onClick={onclick}>Далее</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default CertFstek;