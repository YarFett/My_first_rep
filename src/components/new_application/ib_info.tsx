import React, { ChangeEvent, Component, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "./constructor.scss"
import "./order-request.scss"
import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import { setItemToLocalStorage } from "./utils";


function IbInfo() {
    const history = useNavigate();
    const [fileIbSecureDev, setFileIbSecureDev] = useState<File>();
    const [fileIbConclusion, setFileIbConclusion] = useState<File>();
    const [fileIbImpMeasures, setFileIbImpMeasures] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0] as Blob;
            const reader = new FileReader();
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                const newFile = new Uint8Array(reader.result as ArrayBuffer);
                setItemToLocalStorage('fileIbSecureDevData', Array.from(newFile));
                console.log(newFile)
            }
            setFileIbSecureDev(e.target.files[0]);
        }
    };
    const handleFileIbConclusionChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0] as Blob;
            const reader = new FileReader();
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                const newFile = new Uint8Array(reader.result as ArrayBuffer);
                setItemToLocalStorage('fileIbConclusionData', Array.from(newFile));
                console.log(newFile)
            }
            setFileIbConclusion(e.target.files[0]);
        }
    };
    const handleFileImpMeasuresChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0] as Blob;
            const reader = new FileReader();
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                const newFile = new Uint8Array(reader.result as ArrayBuffer);
                setItemToLocalStorage('fileImpMeasuresData', Array.from(newFile));
                console.log(newFile)
            }
            setFileIbImpMeasures(e.target.files[0]);
        }
    };

    const onclick = (e: any) => {
        if (fileIbSecureDev) {

            let data_files = new FormData()
            data_files.append('ibFile', fileIbSecureDev)

            setItemToLocalStorage('fileIb', fileIbSecureDev.name)
            setItemToLocalStorage('fileIbType', fileIbSecureDev.type)

        }
        // else { alert('Выберите файл') }
        if (fileIbConclusion) {

            let data_files = new FormData()
            data_files.append('ibFileConclusion', fileIbConclusion)

            setItemToLocalStorage('fileIbConclusion', fileIbConclusion.name)
            setItemToLocalStorage('fileIbConclusionType', fileIbConclusion.type)
        }

        if (fileIbImpMeasures) {

            let data_files = new FormData()
            data_files.append('ibFileImpMeasures', fileIbImpMeasures)

            setItemToLocalStorage('fileIbImpMeasures', fileIbImpMeasures.name)
            setItemToLocalStorage('fileIbImpMeasuresType', fileIbImpMeasures.type)
        }
        history("/cp_gost_vpn/", {});
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
                            {/* <Link className="constructor__link-back" to={"/cert_of_def"}>Назад</Link> */}
                            <p className="constructor__title">Сведения по ИБ</p>
                        </header>
                        <div className="constructor__inner">
                            <div className="constructor__card">
                                <div className="constructor__card-item">
                                    <div className="constructor__card-row">
                                        <p className="constructor__card-row-text">Руководство по безопасной разработке</p>
                                        {/* <p className="constructor__card-row-text-helper">Например, Требования к доверию, Требования к МЭ</p> */}
                                        <a href="#" className="constructor__file">{fileIbSecureDev && `${fileIbSecureDev.name}`}</a>
                                        <div className="cb-file-uploader">
                                            <input id="fileIbSecureDev" type="file" className="cb-file-uploader__visually-hidden" onChange={handleFileChange} multiple />
                                            <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                                            <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                                            <label htmlFor="fileIbSecureDev" className="cb-file-uploader__label">
                                                <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="constructor__card">
                                <div className="constructor__card-item">
                                    <div className="constructor__card-row">
                                        <p className="constructor__card-row-text">Заключение испытательной лаборатории</p>
                                        {/* <p className="constructor__card-row-text-helper">Например, Требования к доверию, Требования к МЭ</p> */}
                                        <a href="#" className="constructor__file">{fileIbConclusion && `${fileIbConclusion.name}`}</a>
                                        <div className="cb-file-uploader">
                                            <input id="fileIbConclusion" type="file" className="cb-file-uploader__visually-hidden" onChange={handleFileIbConclusionChange} multiple />
                                            <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                                            <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                                            <label htmlFor="fileIbConclusion" className="cb-file-uploader__label">
                                                <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="constructor__card">
                                <div className="constructor__card-item">
                                    <div className="constructor__card-row">
                                        <p className="constructor__card-row-text">Оценка соответствия реализованных мер по разработке безопасного программного обеспечения</p>
                                        {/* <p className="constructor__card-row-text-helper">Например, Требования к доверию, Требования к МЭ</p> */}
                                        <a href="#" className="constructor__file">{fileIbImpMeasures && `${fileIbImpMeasures.name}`}</a>
                                        <div className="cb-file-uploader">
                                            <input id="fileIbImpMeasures" type="file" className="cb-file-uploader__visually-hidden" onChange={handleFileImpMeasuresChange} multiple />
                                            <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                                            <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                                            <label htmlFor="fileIbImpMeasures" className="cb-file-uploader__label">
                                                <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="cb-button" onClick={onclick}>Далее</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IbInfo;