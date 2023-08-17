import React, { ChangeEvent, Component, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useNavigate } from "react-router-dom";
import "./constructor.scss"
import "./order-request.scss"
import PageHeader from "../page-header/page-header";
import { setItemToLocalStorage } from "./utils";
import { SearchProvider } from "../context_for_search";


function TrustMark() {

    const history = useNavigate();
    const [fileResult, setFileResult] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0] as Blob;
            const reader = new FileReader();
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
                const newFile = new Uint8Array(reader.result as ArrayBuffer);
                setItemToLocalStorage('fileResutData', Array.from(newFile));
                console.log(newFile)
            }
            setFileResult(e.target.files[0]);
        }
    };

    const onclick = (e: any) => {
        if (fileResult) {

            let data_files = new FormData()
            data_files.append('resultFile', fileResult)

            setItemToLocalStorage('trust_mark', true)
            setItemToLocalStorage('fileResult', fileResult.name)
            setItemToLocalStorage('fileResultType', fileResult.type)
            history("/prod_docs/", {});
        }
        else { alert('Выберите файл') }

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
                            {/* <a href="" className="constructor__link-back"><Link to={"/cp_mark_trust"}>Назад</Link></a> */}
                            <p className="constructor__title">Оценка уровня доверия </p>
                        </header>
                        <div className="constructor__inner">
                            <div className="constructor__card">
                                <div className="constructor__card-item">
                                    <div className="constructor__card-row">
                                        <div className="constructor__index">
                                            <p className="constructor__index-label">Показатель</p>
                                            <div className="constructor__index-list">
                                                <p className="constructor__index-item is-active">1</p>
                                                <p className="constructor__index-item">2</p>
                                                <p className="constructor__index-item">3</p>
                                                <p className="constructor__index-item">4</p>
                                                <p className="constructor__index-item">5</p>
                                                <p className="constructor__index-item">6</p>
                                                <p className="constructor__index-item">7</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="constructor__card-item">
                                    <div className="constructor__card-row">
                                        <p className="constructor__card-row-text-helper">Заключение испытательной лаборотории</p>
                                        <a className="constructor__file">{fileResult && `${fileResult.name}`}</a>
                                        <div className="cb-file-uploader">
                                            <input id="cb-file-uploader__field" type="file" className="cb-file-uploader__visually-hidden" onChange={handleFileChange} multiple/>
                                            <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                                            <a href="" className="cb-file-uploader__link cb-file-uploader__link--make-photo">Сделать фото</a>
                                            <label htmlFor="cb-file-uploader__field" className="cb-file-uploader__label">
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

export default TrustMark;