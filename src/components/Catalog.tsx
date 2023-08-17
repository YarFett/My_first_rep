import '../css/style.css'
import PageHeader from "./page-header/page-header";
import Filter from "./filter/filter";
import AppList from "./app-list/app-list";
import { ChangeEvent, Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/style.css"
import NewAppButton from './buttons/button_new_app';
import { SearchProvider } from './context_for_search';
import { NewAppProvider } from './context_for_application';
import './Pages/review.scss'
import React from 'react';
import axios from 'axios';

function Catalog(props: any) {
  const [file, setFile] = useState<File>();
  const [classNameForLoadingLogs, setclassNameForLoadingLogs] = useState('review__item')

  const handleFile = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement)

    setclassNameForLoadingLogs('review__item is-loader')

    axios.post('services/issue/create_from_file/', formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    const target = event.target as HTMLFormElement
    target.reset()
    const timer = setTimeout(() => {
      setclassNameForLoadingLogs('review__item')
      window.location.reload()
    }, 4000);

  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };


  return (
    <>
      <SearchProvider>
        <NewAppProvider>
          <PageHeader />
          <div className="catalog__container container">
            <div className="catalog__headline">
              <h1 className="catalog__headline-text">Каталог ЦП</h1>
            </div>
            <div className="catalog__headline">
              <div className={classNameForLoadingLogs}>
              <form id="MainForm" onSubmit={handleFile} >
                <p className="comments-page__subtitle">Отправить заявку с помощью файла XML</p>
                <input id="InputCreateFromFIle" name='file' type="file" accept="text/xml" className="btn btn-sm btn-outline-secondary"
                  // onChange={handleFileChange}
                  multiple />
                <div>{file && `${file.name} - ${file.type}`}</div>
                <button id='ButtonCreateFromFIle' type='submit' className="btn btn-sm btn-outline-secondary"
                // onClick={handleUploadClick}
                >Отправить</button>
              </form>
              </div>
              {/* <form onSubmit={handleFile}>
            <div className="constructor__card">
                <div className="constructor__card-item">
                  <div className="constructor__card-row">
                    <p className="constructor__card-row-text">Создать заявку через XML файл</p>
                    <p className="constructor__card-row-text-helper">Прикрепите файл формата XML</p>
                    <div className="cb-file-uploader">
                    <div className="constructor__file">{file && `${file.name}`}</div>
                      <input id="fileIbImpMeasures" name='file' type="file" accept="text/xml" className="cb-file-uploader__visually-hidden" multiple />
                      <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                      <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                      <label htmlFor="fileIbImpMeasures" className="cb-file-uploader__label">
                        <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                      </label>
                    </div>
                  </div>
                  <button type='submit' className="cb-button">Отправить файл</button>
                </div>
              </div>
              </form> */}
              <NewAppButton />
            </div>
            <Filter />
            <AppList />
          </div>
        </NewAppProvider>
      </SearchProvider>
    </>
  )
}

export default Catalog;