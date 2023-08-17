import React, { ChangeEvent, Component, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, Route, Router, Routes, To, redirect, useNavigate } from "react-router-dom";
import PageHeader from "../page-header/page-header";
import {SearchProvider} from "../context_for_search";
// import DataDisplay from "../comp3";
// import AddData from "../comp4";
// import FirstPage from "../comp3";

function Main() {

  const [file, setFile] = useState<File>();

  const handleFile = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement)

    axios.post('services/issue/create_from_file/', formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    const target = event.target as HTMLFormElement
    target.reset()
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // const handleUploadClick = () => {
  //   if (!file) {
  //     return;
  //   }
  //
  //   // 👇 Create new FormData object and append files
  //   let data = new FormData()
  //   data.append('file', file)
  //
  //   // 👇 Uploading the files using the fetch API to the server
  //   axios.post('services/issue/create_from_file/', data)
  //     .then((res) => console.log(data))
  //     .catch((err) => console.error(err));
  // };

  return (
    <>
      <SearchProvider>
        <PageHeader/>
      </SearchProvider>
      {/*<div>*/}
      {/*<ul>*/}
      {/*  <li>*/}
      {/*    <Link to="/comp4">Add Data</Link>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <Link to="/comp3">Data List</Link>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    /!* <FirstPage/> *!/*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    /!* <Link to="/comp3">Data List</Link> *!/*/}
      {/*  </li>*/}
      {/*</ul>*/}

      {/*<hr />*/}

    {/*</div>*/}
      <main>
        <p>
          <a id="Download" href={`${axios.defaults.baseURL}services/issue/download_template/`} className="btn btn-sm btn-outline-secondary">Скачать шаблон</a>
          <form id="MainForm" onSubmit={handleFile}>
            <input id="InputCreateFromFIle" name='file' type="file" accept="text/xml" className="btn btn-sm btn-outline-secondary"
                   // onChange={handleFileChange}
                   multiple />
            <div>{file && `${file.name} - ${file.type}`}</div>
            <button id='ButtonCreateFromFIle' type='submit' className="btn btn-sm btn-outline-secondary"
                    // onClick={handleUploadClick}
            >Отправить</button>
          </form>
          <Link id="LinkToCatalog" to="/services/issue" className="btn btn-sm btn-outline-secondary">Перейти в каталог</Link>
        </p>
      </main>
    </>
  );
}


export default Main;