import React, { ChangeEvent, Component, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useNavigate } from "react-router-dom";
import "./constructor.scss"
import "./order-request.scss"
import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import { setItemToLocalStorage } from "./utils";


function DevGost() {

    const history = useNavigate();
    const [fileDevGost, setFileDevGost] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0] as Blob;
            const reader = new FileReader();
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                const newFile = new Uint8Array(reader.result as ArrayBuffer);
                setItemToLocalStorage('fileDevGostData', Array.from(newFile));
                console.log(newFile)
            }
            setFileDevGost(e.target.files[0]);
        }
    };

    const onclickYes = (e: any) => {
        if (fileDevGost) {

            let data_files = new FormData()
            data_files.append('devGost', fileDevGost)

            setItemToLocalStorage('dev_gost', true)
            setItemToLocalStorage('fileDevGostName', fileDevGost.name)
            setItemToLocalStorage('fileDevGostType', fileDevGost.type)
            history("/cp_mark_trust/", {});
        }
        else { alert('Выберите файл') }



    }
    const onclickNo = (e: any) => {
        setItemToLocalStorage('dev_gost', false)
        history("/cp_mark_trust/", {});

    }

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
                            {/* <a href="" className="constructor__link-back"><Link to={"/cp_def_info"}>Назад</Link></a> */}
                            <p className="constructor__title">Разработка проводится по ГОСТ Р 56939-2016?</p>
                            <p className="constructor__card-row-text">ГОСТ Р 56939-2016 "Защита информации. Разработка безопасного программного обеспечения. Общие требования"</p>
                        </header>
                        <div className="constructor__inner">
                            <div className="cb-quiz is-disabled">
                                <p className="cb-quiz__title" onClick={onclickYes}>Да
                                    <span className="cb-icon cb-icon-quiz cb-icon__size-24">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.21072 4.39382C8.70499 3.86873 7.88503 3.86873 7.3793 4.39382C6.87357 4.91892 6.87357 5.77027 7.3793 6.29536L13.7893 12.9508C14.295 13.4759 15.115 13.4759 15.6207 12.9508C16.1264 12.4257 16.1264 11.5743 15.6207 11.0492L9.21072 4.39382Z" fill="currentColor" />
                                            <path d="M7.3795 17.7046C6.87376 18.2297 6.87376 19.0811 7.3795 19.6062C7.88523 20.1313 8.70519 20.1313 9.21092 19.6062L15.6207 12.9508C16.1264 12.4257 16.1264 11.5743 15.6207 11.0492C15.115 10.5241 14.2952 10.5241 13.7895 11.0492L7.3795 17.7046Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </p>
                                <p className="cb-quiz__subtitle">Чтобы пройти дальше, загрузите руководство по разработке безопасного ПО</p>
                                <div className="cb-quiz-inner">
                                    <div className="cb-file-uploader">
                                        <a className="constructor__file">{fileDevGost && `${fileDevGost.name}`}</a>
                                        <input id="cb-file-uploader__field" type="file" className="cb-file-uploader__visually-hidden" onChange={handleFileChange} multiple />
                                        <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                                        <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                                        <label htmlFor="cb-file-uploader__field" className="cb-file-uploader__label">
                                            <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="cb-quiz">
                                <p className="cb-quiz__title" onClick={onclickNo}>Нет
                                    <span className="cb-icon cb-icon-quiz cb-icon__size-24">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.21072 4.39382C8.70499 3.86873 7.88503 3.86873 7.3793 4.39382C6.87357 4.91892 6.87357 5.77027 7.3793 6.29536L13.7893 12.9508C14.295 13.4759 15.115 13.4759 15.6207 12.9508C16.1264 12.4257 16.1264 11.5743 15.6207 11.0492L9.21072 4.39382Z" fill="currentColor" />
                                            <path d="M7.3795 17.7046C6.87376 18.2297 6.87376 19.0811 7.3795 19.6062C7.88523 20.1313 8.70519 20.1313 9.21092 19.6062L15.6207 12.9508C16.1264 12.4257 16.1264 11.5743 15.6207 11.0492C15.115 10.5241 14.2952 10.5241 13.7895 11.0492L7.3795 17.7046Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DevGost;