import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "../constructor.scss"
import "../order-request.scss"
import PageHeader from "../../page-header/page-header";
import { SearchProvider } from "../../context_for_search";
import Swal from "sweetalert2";
import { NewAppContext } from "../../context_for_application";
import { Url } from "url";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils";

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


function CertFstekModal(props: any) {


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

  const handleCloseModal = () => {
    try {
      setItemToLocalStorage('fstekId', fstekId)
      setItemToLocalStorage('certNumber', certNumber)
      setItemToLocalStorage('cert_date_from', cert_date_from)
      setItemToLocalStorage('cert_date_to', cert_date_to)
      setItemToLocalStorage('name_tool', name_tool)
      setItemToLocalStorage('name_doc_consensus', name_doc_consensus)
      setItemToLocalStorage('cert_software_vendor', cert_software_vendor)
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

    setAnswer((prevAnswers: any) => [...prevAnswers, newAnswer]);
    history("/prod_docs/", {});
  }
  // const rightData = Object.entries(data)

  useEffect(() => {
    console.log('Current data is ', resourse);
  }, [resourse]);

  return (
        <div className="order-request__container">
          <div className="constructor">
            <div className="constructor__inner">
              <div className="constructor__card" style={{ boxShadow: 'none'}}>
                <header className="constructor__header">
                  <p className="constructor__title">Сертификат ФСТЭК</p>
                </header>
                <div className="constructor__inner">
                  <div className="constructor__card-item">
                    <div className="cb-text-field__label">
                      <button className="cb-button"
                        onClick={getDataFromNumber}
                      >Найти по номеру сертификата
                      </button>
                    </div>
                    <div className="constructor__card-item">
                      <div className="cb-text-field">
                        <label className="cb-text-field__label cb-text-field">
                          Номер сертификата
                          <input className="cb-text-field__input input" type="search" value={certNumber}
                            placeholder="Введите номер сертификата..."
                            onChange={handleInputCertNumber} />
                        </label>
                        {/*<label className="constructor__description-label">Номер сертификата</label>*/}
                        {/*<div className="cb-text-field__value">*/}
                        {/*  <input className="cb-text-field__input" type="text" value={certNumber} placeholder="Введите номер сертификата" onChange={handleInputCertNumber} />*/}
                        {/*</div>*/}
                      </div>
                      <div className="cb-text-field">
                        <label className="cb-text-field__label cb-text-field">
                          Дата внесения в реестр
                          <input className="cb-text-field__input input" type="search" value={cert_date_from}
                            placeholder="Введите дату..."
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
                          <input className="cb-text-field__input input" type="search" value={name_tool}
                            placeholder="Введите наименование..."
                            onChange={handleInputName_tool} />
                        </label>
                        {/*<label className="constructor__description-label">Наименование средства</label>*/}
                        {/*<div className="cb-text-field__value">*/}
                        {/*  <input className="cb-text-field__input" type="text" value={name_tool} placeholder="Введите наименование" onChange={handleInputName_tool} />*/}
                        {/*</div>*/}
                      </div>
                      <div className="cb-text-field">
                        <label className="cb-text-field__label cb-text-field">
                          Срок действия сертификата
                          <input className="cb-text-field__input input" type="search" value={cert_date_to}
                            placeholder="Введите окончание действия сертификата..."
                            onChange={handleInputCert_date_to} />
                        </label>
                        {/*<label className="constructor__description-label">Срок действия сертификата</label>*/}
                        {/*<div className="cb-text-field__value">*/}
                        {/*  <input className="cb-text-field__input" type="text" value={cert_date_to} placeholder="Введите окончание действия сертификата" onChange={handleInputCert_date_to} />*/}
                        {/*</div>*/}
                      </div>
                      <div className="cb-text-field">
                        <label className="cb-text-field__label cb-text-field">
                          Наименование документов, которым соответствуют
                          <input className="cb-text-field__input input" type="search" value={name_doc_consensus}
                            placeholder="Введите наименование документов..."
                            onChange={handleInputName_doc_consensus} />
                        </label>
                        {/*<label className="constructor__description-label">Наименование документов, которым соответствуют</label>*/}
                        {/*<div className="cb-text-field__value">*/}
                        {/*  <input className="cb-text-field__input" type="text" value={name_doc_consensus} placeholder="Введите наименование документов" onChange={handleInputName_doc_consensus} />*/}
                        {/*</div>*/}
                      </div>
                      <div className="cb-text-field">
                        <label className="cb-text-field__label cb-text-field">
                          Заявитель
                          <input className="cb-text-field__input input" type="search" value={cert_software_vendor}
                            placeholder="Введите заявителя..."
                            onChange={handleInputCert_software_vendor} />
                        </label>
                        {/*<label className="constructor__description-label">Заявитель</label>*/}
                        {/*<div className="cb-text-field__value">*/}
                        {/*  <input className="cb-text-field__input" type="text" value={cert_software_vendor} placeholder="Введите заявителя" onChange={handleInputCert_software_vendor} />*/}
                        {/*</div>*/}
                      </div>
                    </div>
                  </div>
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

export default CertFstekModal;