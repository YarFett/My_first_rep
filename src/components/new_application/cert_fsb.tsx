import React, { ChangeEvent, Component, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, To, redirect, useNavigate } from "react-router-dom";
import "./constructor.scss"
import "./order-request.scss"
import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import { setItemToLocalStorage } from "./utils";


function CertFsb(){

    const history = useNavigate();
    const [fileFsb, setFileFsb] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files){
            const file = e.target.files[0] as Blob;
            const reader = new FileReader();
            reader.readAsArrayBuffer(file)
            reader.onload = () => {
               const newFile = new Uint8Array(reader.result as ArrayBuffer);
                setItemToLocalStorage('fileFsbData', Array.from(newFile));
                console.log(newFile)
            }
            setFileFsb(e.target.files[0]);
            }
        };

    const onclick = (e:any) => {
        if(fileFsb){
    
        let data_files = new FormData()
        data_files.append('statement', fileFsb)
        
            setItemToLocalStorage('fileFsb', fileFsb.name)
            setItemToLocalStorage('fileFsb', fileFsb.type)
            history("/prod_docs/", {});}
            else{alert('Выберите файл')}
        }

    const clickBack = (e:any) => {
        history(-1)
    }
    return(
        <div>
      <SearchProvider>
        <PageHeader />
      </SearchProvider>
        <div className="order-request">
        <div className="order-request__container">
        <div className="constructor">
            <header className="constructor__header">
                <Link className="constructor__link-back" to={"/where_got_cert"}>Назад</Link>
                <p className="constructor__title">Сертфикат ФСБ</p>
            </header>
            <div className="constructor__inner">
                <div className="constructor__card">
                <div className="constructor__card-item">
                    <div className="constructor__card-row">
                    <p className="constructor__card-row-text-helper">Копия сертификата</p>
                    <a href="#" className="constructor__file">{fileFsb && `${fileFsb.name}`}</a>
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

export default CertFsb;