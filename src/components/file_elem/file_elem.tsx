import React from "react";
import axios from "axios";

interface FileInfo {
  id_file: number,
  name_file: string,
  documentUrl: string
  // file_size: number,
}


export class FileElem extends React.Component<FileInfo> {

  openWindow =() => {
    window.open(this.props.name_file, '_blank')
  }

  render() {
    return (
      <div className="order__files-item">
        <div className="order__files-col">
          {/*<span className="cb-icon cb-icon__size-48">*/}
          {/*  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
          {/*    <path*/}
          {/*      d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z"*/}
          {/*      fill="#FF8A00" />*/}
          {/*    <path*/}
          {/*      d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z"*/}
          {/*      fill="white" />*/}
          {/*    <path*/}
          {/*      d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z"*/}
          {/*      fill="white" />*/}
          {/*    <path*/}
          {/*      d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z"*/}
          {/*      fill="white" />*/}
          {/*  </svg>*/}
          {/*</span>*/}
        </div>
        <div className="order__files-col">
          <p className="order__files-title">{this.props.name_file} 
          {/* | */}
           <span className="order__files-size">
            {/* {this.props.file_size} байт */}
            </span>
          </p>
          {/*<p className="order__files-title">{this.props.name_file}</p>*/}
          <div className="order__files-action">
            {/*<a href="" className="order__files-link">Посмотреть</a>*/}
            <a href={`${axios.defaults.baseURL}services/documents/${this.props.id_file}/get_file/`} className="order__files-link">Скачать</a>
            <a href='#' className="order__files-link" onClick={this.openWindow}>Посмотреть</a>
          </div>
        </div>
        {/*<div className="order__files-col">*/}
        {/*  <a href="" className="order__files-link">Удалить</a>*/}
        {/*</div>*/}
      </div>
    );
  }
}