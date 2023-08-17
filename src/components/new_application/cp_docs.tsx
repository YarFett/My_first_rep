import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "./constructor.scss"
import "./order-request.scss"
import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import { NewAppContext } from "../context_for_application";
import { setItemToLocalStorage } from "./utils";


function CpDocs() {

  const location = useLocation();
  const [resourse, setResourse] = useContext(NewAppContext)
  const data = location.state;
  // const rightData = Object.entries(data)

  useEffect(() => {
    console.log('Current data is ', resourse);
  }, [resourse]);

  const [fileDocumentation, setFileDocumentation] = useState<File>();
  const [fileProject, setFileProject] = useState<File>();
  const [fileDeclaration, setFileDeclaration] = useState<File>();
  const [fileTestsProgramm, setFileTestsProgramm] = useState<File>();
  const [fileArchitecture, setFileArchitecture] = useState<File>();

  const [answers, setAnswer] = useContext(NewAppContext)
  const history = useNavigate();

  const handleFileChangeDocumentation = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0] as Blob;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const newFile = new Uint8Array(reader.result as ArrayBuffer);
        setItemToLocalStorage('fileDocumentationData', Array.from(newFile));
        console.log(newFile)
      }
      setFileDocumentation(e.target.files[0]);
    }
  };
  const handleFileChangeProject = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0] as Blob;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const newFile = new Uint8Array(reader.result as ArrayBuffer);
        setItemToLocalStorage('fileProjectData', Array.from(newFile));
        console.log(newFile)
      }
      setFileProject(e.target.files[0]);
    }
  };
  const handleFileChangeDeclaration = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0] as Blob;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const newFile = new Uint8Array(reader.result as ArrayBuffer);
        setItemToLocalStorage('fileDeclarationData', Array.from(newFile));
        console.log(newFile)
      }
      setFileDeclaration(e.target.files[0]);
    }
  };
  const handleFileProgramm = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0] as Blob;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const newFile = new Uint8Array(reader.result as ArrayBuffer);
        setItemToLocalStorage('fileTestsProgrammData', Array.from(newFile));
        console.log(newFile)
      }
      setFileTestsProgramm(e.target.files[0]);
    }
  };

  const handleFileChangeArchitecture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0] as Blob;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        const newFile = new Uint8Array(reader.result as ArrayBuffer);
        setItemToLocalStorage('fileArchitectureData', Array.from(newFile));
        console.log(newFile)
      }
      setFileArchitecture(e.target.files[0]);
    }
  };

  const onclick = (e: any) => {
    if (fileDocumentation) {

      let data_fileDocumentation = new FormData()
      data_fileDocumentation.append('Documentation', fileDocumentation)
      setItemToLocalStorage('fileDocumentation', fileDocumentation.name)
      setItemToLocalStorage('fileDocumentationType', fileDocumentation.type)
    }


    if (fileProject) {

      let data_fileProject = new FormData()
      data_fileProject.append('Project', fileProject)
      setItemToLocalStorage('fileProject', fileProject.name)
      setItemToLocalStorage('fileProjectType', fileProject.type)
    }

    if (fileDeclaration) {

      let data_fileDeclaration = new FormData()
      data_fileDeclaration.append('LawOfUse', fileDeclaration)
      setItemToLocalStorage('fileDeclaration', fileDeclaration.name)
      setItemToLocalStorage('fileDeclarationType', fileDeclaration.type)
    }

    if (fileTestsProgramm) {

      let data_fileTestsProgramm = new FormData()
      data_fileTestsProgramm.append('TestsProgramm', fileTestsProgramm)
      setItemToLocalStorage('fileTestsProgramm', fileTestsProgramm.name)
      setItemToLocalStorage('fileTestsProgrammType', fileTestsProgramm.type)
    }

    if (fileArchitecture) {

      let data_fileArchitecture = new FormData()
      data_fileArchitecture.append('License', fileArchitecture)
      setItemToLocalStorage('fileArchitecture', fileArchitecture.name)
      setItemToLocalStorage('fileArchitectureType', fileArchitecture.type)
    }

    // const newAnswer= [
    //     {cp_docs: 'Документы цп'},
    //     [
    //     {fileDocumentation: fileDocumentation.name},
    //     {fileProject: fileProject.name},
    //     {fileDeclaration: fileDeclaration.name},
    //     {fileTestsProgramm: fileTestsProgramm.name},
    //     {fileArchitecture: fileArchitecture.name},
    //     ]
    //     ];
    // setAnswer((prevAnswers: any) =>[...prevAnswers, newAnswer]);
    // setItemToLocalStorage('fileDocumentation', fileDocumentation.name)
    // setItemToLocalStorage('fileProject', fileProject.name)
    // setItemToLocalStorage('fileDeclaration', fileDeclaration.name)
    // setItemToLocalStorage('fileTestsProgramm', fileTestsProgramm.name)
    // setItemToLocalStorage('fileArchitecture', fileArchitecture.name)
    // setItemToLocalStorage('fileDocumentationType', fileDocumentation.type)
    // setItemToLocalStorage('fileProjectType', fileProject.type)
    // setItemToLocalStorage('fileDeclarationType', fileDeclaration.type)
    // setItemToLocalStorage('fileTestsProgrammType', fileTestsProgramm.type)
    // setItemToLocalStorage('fileArchitectureType', fileArchitecture.type)
    history("/order_number/", {});
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
              <Link id="GoBack" className="constructor__link-back" to={"/prod_docs"}>Назад</Link>
              <p className="constructor__title">Документы на ЦП</p>
            </header>
            <div className="constructor__inner">
              <div className="constructor__card">
                <div className="cb-spoiler is-toggle">
                  <div className="cb-spoiler__field cb-spoiler__field--substrate">
                    <div className="cb-spoiler__value">
                      <div className="cb-spoiler__group-icon">
                        {/* <span className="cb-spoiler__item cb-icon cb-icon-dropdown cb-icon__size-24">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.29537 10.7195C5.90154 10.3261 5.90154 9.68836 6.29537 9.29501C6.68919 8.90166 7.3277 8.90166 7.72152 9.29501L12.7131 14.2805C13.1069 14.6739 13.1069 15.3116 12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705L6.29537 10.7195Z" fill="currentColor"/>
                                        <path d="M16.2785 9.29516C16.6723 8.90181 17.3108 8.90181 17.7046 9.29516C18.0985 9.68851 18.0985 10.3263 17.7046 10.7196L12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705C10.8931 15.3116 10.8931 14.674 11.2869 14.2807L16.2785 9.29516Z" fill="currentColor"/>
                                    </svg>
                                </span> */}
                      </div>
                      <p className="cb-spoiler__input">Проектная и рабочая документация</p>
                    </div>
                    <div className="cb-spoiler__body">
                      <div className="constructor__row">
                        {/* <span className="cb-icon cb-icon__size-48">
                                <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                                <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                                <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                                <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                                </svg>
                            </span> */}
                        <a href="#" className="constructor__file">{fileDocumentation && `${fileDocumentation.name}`}</a>
                        <span className="cb-icon cb-icon__size-24">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                      </svg>
                    </span>
                      </div>
                      <div className="cb-file-uploader">
                        <input type="file" className="cb-file-uploader__visually-hidden" id="fileDocumentation" onChange={handleFileChangeDocumentation} multiple />
                        <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                        <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                        <label htmlFor="fileDocumentation" className="cb-file-uploader__label">
                          <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="constructor__card">
                <div className="cb-spoiler is-toggle">
                  <div className="cb-spoiler__field cb-spoiler__field--substrate">
                    <div className="cb-spoiler__value">
                      <div className="cb-spoiler__group-icon">
                        {/* <span className="cb-spoiler__item cb-icon cb-icon-dropdown cb-icon__size-24">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.29537 10.7195C5.90154 10.3261 5.90154 9.68836 6.29537 9.29501C6.68919 8.90166 7.3277 8.90166 7.72152 9.29501L12.7131 14.2805C13.1069 14.6739 13.1069 15.3116 12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705L6.29537 10.7195Z" fill="currentColor"/>
                                        <path d="M16.2785 9.29516C16.6723 8.90181 17.3108 8.90181 17.7046 9.29516C18.0985 9.68851 18.0985 10.3263 17.7046 10.7196L12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705C10.8931 15.3116 10.8931 14.674 11.2869 14.2807L16.2785 9.29516Z" fill="currentColor"/>
                                    </svg>
                                </span> */}
                      </div>
                      <p className="cb-spoiler__input">Проект договора(соглашения)</p>
                    </div>
                    <div className="cb-spoiler__body">
                      <div className="constructor__row">
                        {/* <span className="cb-icon cb-icon__size-48">
                                <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                                <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                                <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                                <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                                </svg>
                            </span> */}
                        <a href="#" className="constructor__file">{fileProject && `${fileProject.name}`}</a>
                        <span className="cb-icon cb-icon__size-24">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                      </svg>
                    </span>
                      </div>
                      <div className="cb-file-uploader">
                        <input type="file" className="cb-file-uploader__visually-hidden" id="fileProject" onChange={handleFileChangeProject} multiple />
                        <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                        <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                        <label htmlFor="fileProject" className="cb-file-uploader__label">
                          <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="constructor__card">
                <div className="cb-spoiler is-toggle">
                  <div className="cb-spoiler__field cb-spoiler__field--substrate">
                    <div className="cb-spoiler__value">
                      <div className="cb-spoiler__group-icon">
                        {/* <span className="cb-spoiler__item cb-icon cb-icon-dropdown cb-icon__size-24">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.29537 10.7195C5.90154 10.3261 5.90154 9.68836 6.29537 9.29501C6.68919 8.90166 7.3277 8.90166 7.72152 9.29501L12.7131 14.2805C13.1069 14.6739 13.1069 15.3116 12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705L6.29537 10.7195Z" fill="currentColor"/>
                                        <path d="M16.2785 9.29516C16.6723 8.90181 17.3108 8.90181 17.7046 9.29516C18.0985 9.68851 18.0985 10.3263 17.7046 10.7196L12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705C10.8931 15.3116 10.8931 14.674 11.2869 14.2807L16.2785 9.29516Z" fill="currentColor"/>
                                    </svg>
                                </span> */}
                      </div>
                      <p className="cb-spoiler__input">Декларация о соответствии требованиям "ГосТех"</p>
                    </div>
                    <div className="cb-spoiler__body">
                      <div className="constructor__row">
                        {/* <span className="cb-icon cb-icon__size-48">
                                <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                                <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                                <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                                <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                                </svg>
                            </span> */}
                        <a href="#" className="constructor__file">{fileDeclaration && `${fileDeclaration.name}`}</a>
                        <span className="cb-icon cb-icon__size-24">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                      </svg>
                    </span>
                      </div>
                      <div className="cb-file-uploader">
                        <input type="file" className="cb-file-uploader__visually-hidden" id="fileDeclaration" onChange={handleFileChangeDeclaration} multiple />
                        <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                        <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                        <label htmlFor="fileDeclaration" className="cb-file-uploader__label">
                          <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="constructor__card">
                <div className="cb-spoiler">
                  <div className="cb-spoiler__field cb-spoiler__field--substrate">
                    <div className="cb-spoiler__value">
                      <div className="cb-spoiler__group-icon">
                        {/* <span className="cb-spoiler__item cb-icon cb-icon-dropdown cb-icon__size-24">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.29537 10.7195C5.90154 10.3261 5.90154 9.68836 6.29537 9.29501C6.68919 8.90166 7.3277 8.90166 7.72152 9.29501L12.7131 14.2805C13.1069 14.6739 13.1069 15.3116 12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705L6.29537 10.7195Z" fill="currentColor"/>
                                        <path d="M16.2785 9.29516C16.6723 8.90181 17.3108 8.90181 17.7046 9.29516C18.0985 9.68851 18.0985 10.3263 17.7046 10.7196L12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705C10.8931 15.3116 10.8931 14.674 11.2869 14.2807L16.2785 9.29516Z" fill="currentColor"/>
                                    </svg>
                                </span> */}
                      </div>
                      <p className="cb-spoiler__input">Программа и методика испытаний ЦП</p>
                    </div>
                    <div className="cb-spoiler__body">
                      <div className="constructor__row">
                        {/* <span className="cb-icon cb-icon__size-48">
                                <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                                <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                                <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                                <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                                </svg>
                            </span> */}
                        <a href="#" className="constructor__file">{fileTestsProgramm && `${fileTestsProgramm.name}`}</a>
                        <span className="cb-icon cb-icon__size-24">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                      </svg>
                    </span>
                      </div>
                      <div className="cb-file-uploader">
                        <input type="file" className="cb-file-uploader__visually-hidden" id="fileTestsProgramm" onChange={handleFileProgramm} multiple />
                        <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                        <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                        <label htmlFor="fileTestsProgramm" className="cb-file-uploader__label">
                          <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="constructor__card">
                <div className="cb-spoiler">
                  <div className="cb-spoiler__field cb-spoiler__field--substrate">
                    <div className="cb-spoiler__value">
                      <div className="cb-spoiler__group-icon">
                        {/* <span className="cb-spoiler__item cb-icon cb-icon-dropdown cb-icon__size-24">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.29537 10.7195C5.90154 10.3261 5.90154 9.68836 6.29537 9.29501C6.68919 8.90166 7.3277 8.90166 7.72152 9.29501L12.7131 14.2805C13.1069 14.6739 13.1069 15.3116 12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705L6.29537 10.7195Z" fill="currentColor"/>
                                        <path d="M16.2785 9.29516C16.6723 8.90181 17.3108 8.90181 17.7046 9.29516C18.0985 9.68851 18.0985 10.3263 17.7046 10.7196L12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705C10.8931 15.3116 10.8931 14.674 11.2869 14.2807L16.2785 9.29516Z" fill="currentColor"/>
                                    </svg>
                                </span> */}
                      </div>
                      <p className="cb-spoiler__input">Целевая архитектура развертывания ЦП</p>
                    </div>
                    <div className="cb-spoiler__body">
                      <div className="constructor__row">
                        {/* <span className="cb-icon cb-icon__size-48">
                                <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z" fill="#FF8A00"/>
                                <path d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z" fill="white"/>
                                <path d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z" fill="white"/>
                                <path d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z" fill="white"/>
                                </svg>
                            </span> */}
                        <a href="#" className="constructor__file">{fileArchitecture && `${fileArchitecture.name}`}</a>
                        <span className="cb-icon cb-icon__size-24">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                      </svg>
                    </span>
                      </div>
                      <div className="cb-file-uploader">
                        <input type="file" className="cb-file-uploader__visually-hidden" id="fileArchitecture" onChange={handleFileChangeArchitecture} multiple />
                        <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                        <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                        <label htmlFor="fileArchitecture" className="cb-file-uploader__label">
                          <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button id="CpDocsNextButton" className="cb-button" onClick={onclick}>Далее</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CpDocs;