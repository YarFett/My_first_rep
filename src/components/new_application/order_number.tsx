import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "./constructor.scss"
import "./order-request.scss"
import PageHeader from "../page-header/page-header";
import NewAppButton from "../buttons/button_new_app";
// import Component1 from "../comp1";
import { SearchContext, SearchProvider } from "../context_for_search";
import { NewAppContext } from "../context_for_application";
import Entity from "./faces/entity";
import "./modal.css"
import Modal from "react-modal";
import EntityModal from "./modal_dublicates/modal_entity";
import RegRosPoYesModal from "./modal_dublicates/modal_reg_ros_po_yes";
import CpHarModal from "./modal_dublicates/modal_cp_har";
import CpInfoModal from "./modal_dublicates/modal_cp_info";
import ProdDocsModal from "./modal_dublicates/modal_prod_docs";
import CpDocsModal from "./modal_dublicates/modal_cp_docs";
// import { NewAppParams } from "../api_params/params_for_new_app";
import { number } from "prop-types";
import { getItemFromLocalStorage, setItemToLocalStorage } from "./utils";
import CertFstekModal from "./modal_dublicates/modal_cert_fstek";
import { decode as atob } from 'base-64';
import MySpinner from "./MySpinner";
import { Type, View, ViewType } from "../general/service";




function OrderNumber() {
  interface Extensions {
    id: number;
    extention: string;
    content_type: string;
  }


  const [viewTypeList, setViewTypeList] = useState<ViewType[]>()
  const [viewList, setViewList] = useState<View[]>()
  const [typeList, setTypeList] = useState<Type[]>()

  // function get_view(listViewType: ViewType[]) {
  //   var newList: View[] = []
  //   listViewType.map((elem) => {
  //     if (newList.find(e => e.view_service === elem.view[0].view_service) === undefined) {
  //       newList.push(elem.view[0])
  //       console.log(elem.view[0])
  //     }
  //   })
  //   return newList
  // }

  // useEffect(() => {

  //   axios.all([
  //     axios.get(`services/view_type/`)])
  //     .then(axios.spread(function (res) {
  //       setViewTypeList(res.data)
  //       setViewList(res.data)
  //       console.log(res.data)
  //       }

  //     ))
  //     .catch(errors => {
  //       console.log(errors)
  //     })
  // }, [])
  // const saveStateFile = JSON.parse(getItemFromLocalStorage('fileStatementData'))
  // const formStateFileData = new FormData()
  // for (const [name, value] of saveStateFile) {formStateFileData.append(name, value)}
  // console.log(formStateFileData)

  // const [appNumber, setAppNumber] = useState(getItemFromLocalStorage('app_number'))
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [resourse, setResourse] = useContext(NewAppContext)
  // const [resSearch, setResSearch] = useContext(SearchContext)
  const data = location.state;
  const [extentions, setExtentions] = useState<Extensions[]>()

  // const rightData = Object.entries(data)
  const history = useNavigate();

  const [modalEntityActive, setModalEntityActive] = useState(false)
  const openModalEntity = () => { setModalEntityActive(true) }
  const closeModalEntity = () => {
    setModalEntityActive(false)
  }

  const [modalRegRosPoYesActive, setModalRegRosPoYesActive] = useState(false)
  const openModalRegRosPoYes = () => { setModalRegRosPoYesActive(true) }
  const closeModalRegRosPoYes = () => { setModalRegRosPoYesActive(false) }

  const [modalCpHarActive, setModalCpHarActive] = useState(false)
  const openModalCpHar = () => { setModalCpHarActive(true) }
  const closeModalCpHar = () => { setModalCpHarActive(false) }

  const [modalCpInfoActive, setModalCpInfoActive] = useState(false)
  const openModalCpInfo = () => { setModalCpInfoActive(true) }
  const closeModalCpInfo = () => { setModalCpInfoActive(false) }

  const [modalCpDocsActive, setModalCpDocsActive] = useState(false)
  const openModalCpDocs = () => { setModalCpDocsActive(true) }
  const closeModalCpDocs = () => { setModalCpDocsActive(false) }

  const [modalProdDocsActive, setModalProdDocsActive] = useState(false)
  const openModalProdDocs = () => { setModalProdDocsActive(true) }
  const closeModalProdDocs = () => { setModalProdDocsActive(false) }

  const [modalCpSziActive, setModalCpSziActive] = useState(false)
  const openModalCpSzi = () => { setModalCpSziActive(true) }
  const closeModalCpSzi = () => { setModalCpSziActive(false) }

  const [modalCertFstekActive, setModalCertFstekActive] = useState(false)
  const openModalCertFstek = () => { setModalCertFstekActive(true) }
  const closeModalCertFstek = () => { setModalCertFstekActive(false) }


  const ifNothing = (name: string) => {
    const argument = getItemFromLocalStorage(name)
    return argument ? argument : "Не указан"
  }

  const ifNothingLink = (name: string) => {
    const argument = getItemFromLocalStorage(name)
    if (argument && argument.startsWith('http')) {
      return <a href={argument}>{argument}</a>;
    } else {
      return <p>{argument ? argument : "Не указан"}</p>;
    }
  }

  const modalCpDocsContent = (
    <>
      <CpDocsModal />
      <p className="modal__content">
        <a href="" className="constructor__link-back" onClick={closeModalCpDocs}>Сохранить изменения и закрыть</a>
      </p>
    </>
  )

  const modalProdDocsContent = (
    <>
      <ProdDocsModal />
      <p className="modal__content">
        <a href="" className="constructor__link-back" onClick={closeModalProdDocs}>Сохранить изменения и закрыть</a>
      </p>
    </>
  )

  const [file1, setFile1] = useState(null)
  const [file2, setFile2] = useState(null)
  const [file3, setFile3] = useState(null)
  const [file4, setFile4] = useState(null)
  const [file5, setFile5] = useState(null)
  const [file6, setFile6] = useState(null)
  const [file7, setFile7] = useState(null)
  const [file8, setFile8] = useState(null)
  const [file9, setFile9] = useState(null)
  const [file10, setFile10] = useState(null)
  const [file11, setFile11] = useState(null)
  const [file12, setFile12] = useState(null)

  useEffect(() => {
    const storedValue1 = getItemFromLocalStorage('file');
    const storedValue2 = getItemFromLocalStorage('fileDes');
    const storedValue3 = getItemFromLocalStorage('cert_file');
    const storedValue4 = getItemFromLocalStorage('fileStatement');
    const storedValue5 = getItemFromLocalStorage('fileCopyOfCharter');
    const storedValue6 = getItemFromLocalStorage('fileLawOfUse');
    const storedValue7 = getItemFromLocalStorage('fileLicense');
    const storedValue8 = getItemFromLocalStorage('fileDocumentation');
    const storedValue9 = getItemFromLocalStorage('fileProject');
    const storedValue10 = getItemFromLocalStorage('fileDeclaration');
    const storedValue11 = getItemFromLocalStorage('fileTestsProgramm');
    const storedValue12 = getItemFromLocalStorage('fileArchitecture');
    if (storedValue1) {
      setFile1(storedValue1);
    }
    if (storedValue2) {
      setFile2(storedValue2);
    }
    if (storedValue3) {
      setFile3(storedValue3);
    }
    if (storedValue4) {
      setFile4(storedValue4);
    }
    if (storedValue5) {
      setFile5(storedValue5);
    }
    if (storedValue6) {
      setFile6(storedValue6);
    }
    if (storedValue7) {
      setFile7(storedValue7);
    }
    if (storedValue8) {
      setFile8(storedValue8);
    }
    if (storedValue9) {
      setFile9(storedValue9);
    }
    if (storedValue10) {
      setFile10(storedValue10);
    }
    if (storedValue11) {
      setFile11(storedValue11);
    }
    if (storedValue12) {
      setFile12(storedValue12);
    }
  }, []);


  useEffect(() => {
    axios.get(`services/documents/extensions/`)
      .then(response => {
        setExtentions(response.data)
        console.log(response.data)
      }
      )
      .catch(error => console.log(error))
  }, []);

  function DownLoadFile(data: any, filename: any) {
    try {
      // Создание объекта URL из байтов файла
      const fileUrl = new Uint8Array(data);
      const file = new File([fileUrl], filename)
      const url = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      console.log(fileUrl)
      console.log(file)

    } catch (e) {
      console.log('Error decoding data:', e);
    }

  }

  let [newId, setNewId] = useState<Number>()

  const handleClickPostData = () => {
    setIsLoading(true)
    const my_data = {
      producer: {
        delegate: "<string>",
        producer_email: getItemFromLocalStorage('email') || "<string>",
        producer_phone: "<string>",
      },
      ruspatent_url: {},
      jwt_token: "<string>",
      NFAP_number: getItemFromLocalStorage('nfap') || "<string>",
      ktru: getItemFromLocalStorage('ktru') || "<string>",
      number_id_document: "<string>",
      address_reg: "<string>",
      temporary_service_name: getItemFromLocalStorage('name') || "<string>",
      temporary_alternative_service_name: "<string>",
      temporary_inn: getItemFromLocalStorage('inn') || "<string>",
      temporary_ogrn: getItemFromLocalStorage('ogrin') || "<string>",
      software_registry: getItemFromLocalStorage('errpNumber'),
      viewtype: getItemFromLocalStorage('viewTypeId'),
      ruspatent: getItemFromLocalStorage('rusId'),
      fstec_number: getItemFromLocalStorage('fstekId'),
    }

    try {
      axios.post('services/service/', my_data)
        .then(response => {
          UpLoadFile(getItemFromLocalStorage('fileData'), getItemFromLocalStorage('file'), getItemFromLocalStorage('file_type'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('fileDesData'), getItemFromLocalStorage('fileDes'), getItemFromLocalStorage('fileDesType'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('cert_fileData'), getItemFromLocalStorage('cert_file'), getItemFromLocalStorage('cert_file_type'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('fileStatementData'), getItemFromLocalStorage('fileStatement'), getItemFromLocalStorage('fileStatementType'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('fileCopyOfCharterData'), getItemFromLocalStorage('fileCopyOfCharter'), getItemFromLocalStorage('fileCopyOfCharterType'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('fileLawOfUseData'), getItemFromLocalStorage('fileLawOfUse'), getItemFromLocalStorage('fileLawOfUseType'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('fileLicenseData'), getItemFromLocalStorage('fileLicense'), getItemFromLocalStorage('fileLicenseType'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('fileDocumentationData'), getItemFromLocalStorage('fileDocumentation'), getItemFromLocalStorage('fileDocumentationType'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('fileProjectData'), getItemFromLocalStorage('fileProject'), getItemFromLocalStorage('fileProjectType'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('fileDeclarationData'), getItemFromLocalStorage('fileDeclaration'), getItemFromLocalStorage('fileDeclarationType'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('fileTestsProgrammData'), getItemFromLocalStorage('fileTestsProgramm'), getItemFromLocalStorage('fileTestsProgrammType'), response.data.id);
          UpLoadFile(getItemFromLocalStorage('fileArchitectureData'), getItemFromLocalStorage('fileArchitecture'), getItemFromLocalStorage('fileArchitectureType'), response.data.id);
        }
        )
        ;
    } catch (error) {
      console.log(error)
    }
  }
  async function UpLoadFile(file: any, fileName: any, fileType: any, serId: any) {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    if (!file) {
      return;
    }
    const fileUrl = new Uint8Array(file);
    const newFile = new File([fileUrl], fileName)
    const extensionToFind = fileType
    const extNum = extentions?.findIndex((item) => item.content_type === extensionToFind)
    // 👇 Create new FormData object and append files
    const myfile = new FormData()
    myfile.append('name_file', fileName)
    myfile.append('size', `${newFile.size}`)
    myfile.append('file', newFile)
    myfile.append('service', String(Number(serId)))
    // myfile.append('service', '3')
    // myfile.append('issue_service', '1')
    myfile.append('attachment_type', '2')
    myfile.append('extension', (String(Number(extNum) + 1)))

    await axios.post('services/documents/', myfile)
      .then((res) => console.log(data))
      .then((myfile) => console.log(myfile))
      .catch((err) => console.error(err));

  }
  async function Clear() {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    localStorage.clear()
    history("/", {});
    setIsLoading(false)
  }

  const extensionToFind = getItemFromLocalStorage('file_type')
  const extNum = extentions?.findIndex((item) => item.content_type === extensionToFind)

  return (
    <div>
      <SearchProvider>
        <PageHeader />
      </SearchProvider>
      <div className="order-request">
        <div className="order-request__container">
          <div className="constructor__request">
            <header className="constructor__header">
              <Link id="GoBack" className="constructor__link-back" to={"/cp_docs"}>Назад</Link>
              <p className="constructor__title">
                <a>Новая заявка</a>
              </p>
            </header>
            <div className="constructor__request-body">
              <div className="constructor__request-item">
                <p className="constructor__request-item-title">Поставщик</p>
                <ul className="constructor__description">
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Полное название</p>
                    <p className="constructor__description-value">
                      {getItemFromLocalStorage('full_name')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Сокращенное название</p>
                    <p id="ShortName" className="constructor__description-value">
                      {getItemFromLocalStorage('short_name')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">ИНН</p>
                    <p id="Inn" className="constructor__description-value">
                      {getItemFromLocalStorage('inn')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">ОГРНИП</p>
                    <p id="Ogrin" className="constructor__description-value">
                      {getItemFromLocalStorage('ogrnin')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">EMAIL</p>
                    <p id="Email" className="constructor__description-value">
                      {getItemFromLocalStorage('email')}
                    </p>
                  </li>
                  <li className="constructor__description-item is-link">
                    <a id="OpenModalEntityClick" className="constructor__description-link" onClick={openModalEntity}>Изменить</a>
                    <Modal className="modal" isOpen={modalEntityActive} >
                      <EntityModal onClose={closeModalEntity} />
                    </Modal>
                  </li>
                </ul>
                {/*<a id="OpenModalEntityClick" className="is-link" onClick={openModalEntity}>Изменить</a>*/}
                {/*<Modal className="modal" isOpen={modalEntityActive} >*/}
                {/*  <EntityModal onClose={closeModalEntity} />*/}
                {/*</Modal>*/}
              </div>
              <div className="constructor__request-item">
                <p className="constructor__request-item-title">Цифровой продукт</p>
                <ul className="constructor__description">
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Описание</p>
                    <p className="constructor__description-value">Характеристики и функциональные возможности:</p>
                    <p id="Description" className="constructor__description-value">
                      {getItemFromLocalStorage('description')}
                    </p>
                  </li>
                  <li className="constructor__description-item is-link">
                    <a id="OpenModalCpHarClick" className="constructor__description-link" onClick={openModalCpHar}>Изменить</a>
                    <Modal className="modal" isOpen={modalCpHarActive} >
                      <CpHarModal onClose={closeModalCpHar} />
                    </Modal>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">№ в реестре</p>
                    <p id="ErrpNumber" className="constructor__description-value">
                      {getItemFromLocalStorage('errpNumber')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Название</p>
                    <p id="ErrpName" className="constructor__description-value">
                      {getItemFromLocalStorage('name')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Класс ПО</p>
                    <p id="PoClass" className="constructor__description-value">
                      {getItemFromLocalStorage('poClass')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Вид и тип</p>
                    <p className="constructor__description-value">
                      <p id="ViewName">Вид: {getItemFromLocalStorage('viewName')}</p>
                      <p id="TypeName">Тип: {getItemFromLocalStorage('typeName')}</p>
                    </p>
                  </li>
                  <li className="constructor__description-item is-link">
                    <a id="OpenModalRegRosPoYesClick" className="constructor__description-link" onClick={openModalRegRosPoYes}>Изменить</a>
                    <Modal className="modal" isOpen={modalRegRosPoYesActive} >
                      <RegRosPoYesModal onClose={closeModalRegRosPoYes} />
                    </Modal>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">№ в НФАП</p>
                    <p id="Nfap" className="constructor__description-value">
                      {ifNothing('nfap')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Код КТРУ</p>
                    <p id="Ctru" className="constructor__description-value">
                      {ifNothing('ctru')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Код ОКПД</p>
                    <p id="Okpd" className="constructor__description-value">
                      {ifNothing('okpd')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Сайт с характеристикам</p>
                    <p id="WebsiteHar" className="constructor__description-value">
                      {ifNothingLink('website_har')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Сайт с экземпляром ЦП</p>
                    <p id="WebsiteProd" className="constructor__description-value">
                      {ifNothingLink('website_prod')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">№ государственной регистрации</p>
                    <p id="RegRosNumber" className="constructor__description-value">
                      {getItemFromLocalStorage('number')}
                    </p>
                  </li>
                  <li className="constructor__description-item is-link">
                    <a id="OpenModalCpInfoClick" className="constructor__description-link" onClick={openModalCpInfo}>Изменить</a>
                    <Modal className="modal" isOpen={modalCpInfoActive} >
                      <CpInfoModal onClose={closeModalCpInfo} /></Modal>
                  </li>
                </ul>
              </div>
              <div className="constructor__request-item">
                <p className="constructor__request-item-title">Сведения по сертификату ФСТЭК</p>
                <ul className="constructor__description">
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Номер сертификата</p>
                    <p id="CertNumber" className="constructor__description-value">
                      {getItemFromLocalStorage('certNumber')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Дата внесения в реестр</p>
                    <p id="CertDateFrom" className="constructor__description-value">
                      {getItemFromLocalStorage('cert_date_from')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Наименование средства</p>
                    <p id="NameTool" className="constructor__description-value">
                      {getItemFromLocalStorage('name_tool')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Дата окончания сертификата</p>
                    <p id="CertDateTo" className="constructor__description-value">
                      {getItemFromLocalStorage('cert_date_to')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Наименование документов</p>
                    <p id="NameDocConsensus" className="constructor__description-value">
                      {getItemFromLocalStorage('name_doc_consensus')}
                    </p>
                  </li>
                  <li className="constructor__description-item">
                    <p className="constructor__description-label">Заявитель</p>
                    <p id="CertSoftwareVendor" className="constructor__description-value">
                      {getItemFromLocalStorage('cert_software_vendor')}
                    </p>
                  </li>
                  <li className="constructor__description-item is-link">
                    <a id="OpenModalCertFstekClick" className="constructor__description-link" onClick={openModalCertFstek}>Изменить</a>
                    <Modal className="modal" isOpen={modalCertFstekActive} >
                      <CertFstekModal onClose={closeModalCertFstek} /></Modal>
                  </li>
                </ul>
              </div>
              <li className="constructor__description-item">
                <p className="constructor__description-label">Подтверждение полномочий лица, подписавшего заявление</p>
                <ul className="constructor__description-sublist is-file-list">
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="fileDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileData'), getItemFromLocalStorage('file'))} className="constructor__description-subitem-file">
                      <a id="FileName">
                        {/* {getItemFromLocalStorage('file')} */}
                        {file1 ? file1 : null}
                      </a>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="constructor__description-item">
                <p className="constructor__description-label">Документ с описанием характеристик</p>
                <ul className="constructor__description-sublist is-file-list">
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileDesDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileDesData'), getItemFromLocalStorage('fileDes'))} className="constructor__description-subitem-file">
                      <a id="FileDesName">
                        {/* {getItemFromLocalStorage('fileDes')} */}
                        {file2 ? file2 : null}
                      </a>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="constructor__description-item">
                <p className="constructor__description-label">Копия сертификата</p>
                <ul className="constructor__description-sublist is-file-list">
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileCertDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('cert_fileData'), getItemFromLocalStorage('cert_file'))} className="constructor__description-subitem-file">
                      <a id="FileCertName">
                        {/* {getItemFromLocalStorage('cert_file')} */}
                        {file3 ? file3 : null}
                      </a>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="constructor__description-item">
                <p className="constructor__description-label">Документы поставщика</p>
                <ul className="constructor__description-sublist is-file-list">
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileStatementDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileStatementData'), getItemFromLocalStorage('fileStatement'))} className="constructor__description-subitem-file">
                      {getItemFromLocalStorage('fileStatement')}
                    </a>
                  </li>
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileCopyOfCharacterDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileCopyOfCharterData'), getItemFromLocalStorage('fileCopyOfCharter'))} className="constructor__description-subitem-file">
                      {getItemFromLocalStorage('fileCopyOfCharter')}
                    </a>
                  </li>
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileLawOfUseDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileLawOfUseData'), getItemFromLocalStorage('fileLawOfUse'))} className="constructor__description-subitem-file">
                      {getItemFromLocalStorage('fileLawOfUse')}
                    </a>
                  </li>
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileLicenseDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileLicenseData'), getItemFromLocalStorage('fileLicense'))} className="constructor__description-subitem-file">
                      {getItemFromLocalStorage('fileLicense')}
                    </a>
                  </li>
                </ul>
              </li>
              {/* <li className="constructor__description-item is-link">
                    <a className="constructor__description-link" onClick={openModalProdDocs}>Изменить</a>
                    <Modal className="modal" isOpen={modalProdDocsActive} onRequestClose={closeModalProdDocs}>{modalProdDocsContent}</Modal>
                    </li> */}
              <li className="constructor__description-item">
                <p className="constructor__description-label">Документы на ЦП</p>
                <ul className="constructor__description-sublist is-file-list">
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileDocumentationDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileDocumentationData'), getItemFromLocalStorage('fileDocumentation'))} className="constructor__description-subitem-file">
                      <a>{getItemFromLocalStorage('fileDocumentation')}</a>
                    </a>
                  </li>
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileProjectDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileProjectData'), getItemFromLocalStorage('fileProject'))} className="constructor__description-subitem-file">
                      <a>{getItemFromLocalStorage('fileProject')}</a>
                    </a>
                  </li>
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileDeclarationDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileDeclarationData'), getItemFromLocalStorage('fileDeclaration'))} className="constructor__description-subitem-file">
                      <a>{getItemFromLocalStorage('fileDeclaration')}</a>
                    </a>
                  </li>
                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileTestsProgrammDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileTestsProgrammData'), getItemFromLocalStorage('fileTestsProgramm'))} className="constructor__description-subitem-file">
                      <a>{getItemFromLocalStorage('fileTestsProgramm')}</a>
                    </a>
                  </li>

                  <li className="constructor__description-subitem">
                    {/* <span className="cb-icon cb-icon__size-48">
                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                            <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                            <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                            <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                            </svg>
                        </span> */}
                    <a id="FileArchitectureDataDownLoad" onClick={() => DownLoadFile(getItemFromLocalStorage('fileArchitectureData'), getItemFromLocalStorage('fileArchitecture'))} className="constructor__description-subitem-file">
                      <a>{getItemFromLocalStorage('fileArchitecture')}</a>
                    </a>
                  </li>
                </ul>
              </li>
              {/* <li className="constructor__description-item is-link">
                    <a className="constructor__description-link" onClick={openModalCpDocs}>Изменить</a>
                    <Modal className="modal" isOpen={modalCpDocsActive} onRequestClose={closeModalCpDocs}>{modalCpDocsContent}</Modal>
                    </li> */}
              {/*<div className="constructor__request-item">*/}
              {/*  /!* <ul className="constructor__description">*/}
              {/*      <li className="constructor__description-item">*/}
              {/*      <p className="constructor__description-label">Заполненная печатная форма</p>*/}
              {/*      <button className="cb-button cb-button-contour" type="button">Скачать</button>*/}
              {/*      </li> */}
              {/*  </ul> *!/*/}
              {/*</div>*/}
            </div>
            {isLoading && <MySpinner />}
            <button id="GenerateNewOrder" type="button" className="cb-button" onClick={() => {
              handleClickPostData();
              Clear();
            }}>Отправить заявку</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderNumber;