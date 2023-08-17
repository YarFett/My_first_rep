import '../../css/style.css'
import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import PageHeader from "../page-header/page-header";
import { SearchProvider } from '../context_for_search';
import {OrderCard} from "../order-card/order-card";
import {ServiceCard} from "../general/service";
import {FileElem} from "../file_elem/file_elem";
import DateConvert from "../general/date";

interface Instance {
  check_instance_id: number;
  check_status: string;
  stage_name: string;
}

interface SortInstance {
  key: string,
  items: Instance[]
}

interface Docs {
  id: number,
  name_file: string,
  file_size: number,
  docUrl: string
}

interface Data {
  stage_id: number,
}

interface FileType {
  id: number,
  extension: string,
  content_type: string,
}

function general_status(list_instance: any[]) {
  const test_list_status = list_instance.map(elem => elem.check_status)
  if (test_list_status.every((x) => x === 'Пройдена')) {
    return 'Пройдена'
  }
  else if (test_list_status.every((x) => x === 'Не начато')) {
    return 'Не началась'
  }
  else if (test_list_status.every((x) => x === 'Не назначено (1)')) {
    return 'Не началась'
  }
  else if (test_list_status.every((x) => x === 'Не назначено (4)')) {
    return 'Не началась'
  }
  else {
    return 'Началась'
  }
}

export function Service_card() {
  let { id } = useParams();

  const [service_card, setServiceCard] = useState<ServiceCard>()
  const [instance, setInstance] = useState<SortInstance[]>()
  const [fileList, setFileList] = useState<Docs[]>();
  const [fileStatement, setFileStatement] = useState<File>();
  let errors_api = false

  const groupByStage = (data: Data[]) => {
    const result: {[key: number]: Data[]} = {};

    data.forEach((instance) => {
      if (!instance.hasOwnProperty('stage_id')) {
        return;
      }
      const stage = instance.stage_id;
      if (!result.hasOwnProperty(stage)) {
        result[stage] = [instance];
      } else {
        result[stage].push(instance);
      }
    });
    return Object.keys(result).map((key) => ({ key: parseInt(key), items: result[parseInt(key)] }));
  };

  useEffect(() => {
    axios.all([
      axios.get(`services/service/${id}/`),
      axios.get(`checks/status/${id}/service/`),
      axios.get(`services/documents/${id}/service/`)])
        .then(axios.spread(function (res_service, res_instance, res_docs) {
          setServiceCard(res_service.data)
          const sort_instance = groupByStage(res_instance.data)
          setInstance(sort_instance as unknown as SortInstance[] | undefined)
          setFileList(res_docs.data)
        }))
        .catch(errors => {
          errors_api = true
          console.log(errors)
        })
  }, [])
  console.log(fileList)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

  if (e.target.files){
    // setFileStatement(e.target.files[0])
    const file = e.target.files[0]
    const myfile = new FormData()
    myfile.append('name_file', file.name)
    myfile.append('file', file)
    myfile.append('service', String(id))
    // myfile.append('issue_service', '1')
    myfile.append('attachment_type', '1')
    myfile.append('file_size', String(file.size))

    axios.get('services/documents/extensions/')
      .then(res => {
        const type = res.data.filter((value: FileType) => (value.extension === file.name.split('.')[1]))
        myfile.append('extension', type[0].id)
        axios.post(`services/documents/`, myfile)
          .then((response) => {
            // console.log(response.data)
            // console.log(response.data.name_file)
            fileList?.push(response.data)
            window.location.reload()
            // console.log(fileList)
          });
      })

    // axios.post(`services/documents/`, myfile)
    //   .then((response) => {
    //     console.log(response.data)
    //     // console.log(response.data.name_file)
    //     fileList?.push(response.data)
    //     // console.log(fileList)
    //   });
}
  };

  if (errors_api) {
    return (
      <>
        <p>Проблемы с подключением</p>
      </>
    )
  } else {
    return (
      <>
        <SearchProvider>
          <PageHeader/>
        </SearchProvider>
        <main className="page-main">
          <div className="order__container container">
            <div className="order__header">
              <Link className="order__link-back" to={"/"}>Назад</Link>
              <h1 className="order__title">Заявка № {service_card?.id}</h1>
            </div>
            <div className="order__inner">
              <div className="order__card is-negative">
                  <div className="order__card-header">
                    <p className="order__card-state">Проверка и экспертиза</p>
                    <div className="order__card-action">
                      {/*<a href="" className="order__card-link">Редактировать</a>*/}
                      {/*<a href="" className="order__card-link">Удалить</a>*/}
                    </div>
                  </div>
                  <div className="order__card-body">
                    <div className="order__card-headline">
                      <h2 className="order__card-title">{service_card?.software_registry.service_name}</h2>
                      <span className="cb-icon cb-icon__size-24">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M17.3788 16.5L16.7683 8.65106C16.5861 6.30819 14.6318 4.5 12.2819 4.5H11.7181C9.36818 4.5 7.41389 6.30819 7.23167 8.65105L6.6212 16.5L17.3788 16.5ZM5.73619 8.53474L5.11667 16.5L4 16.5V18L5 18H6.50453H8.12602C8.57006 19.7252 10.1362 21 12 21C13.8638 21 15.4299 19.7252 15.874 18H17.4955H19H20V16.5H18.8833L18.2638 8.53474C18.0208 5.41092 15.4151 3 12.2819 3H11.7181C8.58487 3 5.97915 5.41092 5.73619 8.53474ZM14.292 18L9.70802 18C10.0938 18.883 10.9748 19.5 12 19.5C13.0252 19.5 13.9062 18.883 14.292 18Z"
                          fill="currentColor"/>
                  </svg>
                </span>
                    </div>
                    <div className="order__card-info">
                      <div className="order__card-col">
                        <p className="order__card-label">Поставщик</p>
                        <p className="order__card-value">{service_card?.software_registry.producer}</p>
                      </div>
                      <div className="order__card-col">
                        <p className="order__card-label">№ в реестре</p>
                        <p className="order__card-value">{service_card?.software_registry.id}</p>
                      </div>
                      <div className="order__card-col">
                        <p className="order__card-label">Дата регистрации</p>
                        <p className="order__card-value">
                          {DateConvert(String(service_card?.create_date), true)}
                        </p>
                      </div>
                      <div className="order__card-col">
                        <p className="order__card-label">Вид</p>
                        <p className="order__card-value">{service_card?.viewtype.view[0].view_service}</p>
                      </div>
                      <div className="order__card-col">
                        <p className="order__card-label">Тип</p>
                        <p className="order__card-value">{service_card?.viewtype.type[0].type_service}</p>
                      </div>
                      <div className="order__card-col">
                        <p className="order__card-label">Класс ПО</p>
                        <p className="order__card-value">{service_card?.software_registry.class_service}</p>
                      </div>
                    </div>
                    <div className="order__files">
                      <h3 className="order__files-text">Документы</h3>
                      <div className="order__files-list">
                        {fileList?.map((file_info) => (
                          <FileElem id_file={file_info.id} name_file={file_info.name_file} documentUrl={file_info.docUrl}
                          // file_size={file_info.file_size}
                          />
                        ))}
                      {/*  <div className="order__files-item">*/}
                      {/*    <div className="order__files-col">*/}
                      {/*<span className="cb-icon cb-icon__size-48">*/}
                      {/*  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                      {/*    <path*/}
                      {/*      d="M6.98555 24C3.89359 24 1.97073 20.6418 3.53589 17.9752L11.1809 4.9504C12.6173 2.50318 15.2426 1 18.0802 1H43.9996C46.2087 1 47.9996 2.79086 47.9996 5V20C47.9996 22.2091 46.2087 24 43.9996 24H6.98555Z"*/}
                      {/*      fill="#FF8A00"/>*/}
                      {/*    <path*/}
                      {/*      d="M19.9025 14.4379V18.0009H18.0195V7.87891H21.3095C21.9861 7.87891 22.5718 7.95824 23.0665 8.11691C23.5611 8.27558 23.9695 8.49724 24.2915 8.78191C24.6135 9.06658 24.8515 9.40724 25.0055 9.80391C25.1641 10.2006 25.2435 10.6346 25.2435 11.1059C25.2435 11.5959 25.1618 12.0462 24.9985 12.4569C24.8351 12.8629 24.5901 13.2129 24.2635 13.5069C23.9368 13.8009 23.5261 14.0296 23.0315 14.1929C22.5415 14.3562 21.9675 14.4379 21.3095 14.4379H19.9025ZM19.9025 12.9679H21.3095C21.6548 12.9679 21.9558 12.9259 22.2125 12.8419C22.4691 12.7532 22.6815 12.6296 22.8495 12.4709C23.0221 12.3076 23.1505 12.1116 23.2345 11.8829C23.3185 11.6496 23.3605 11.3906 23.3605 11.1059C23.3605 10.8352 23.3185 10.5902 23.2345 10.3709C23.1505 10.1516 23.0245 9.96491 22.8565 9.81091C22.6885 9.65691 22.4761 9.54024 22.2195 9.46091C21.9628 9.37691 21.6595 9.33491 21.3095 9.33491H19.9025V12.9679Z"*/}
                      {/*      fill="white"/>*/}
                      {/*    <path*/}
                      {/*      d="M35.6052 12.9399C35.6052 13.6819 35.4816 14.3632 35.2342 14.9839C34.9869 15.6046 34.6392 16.1389 34.1912 16.5869C33.7432 17.0349 33.2042 17.3826 32.5742 17.6299C31.9442 17.8772 31.2442 18.0009 30.4742 18.0009H26.6172V7.87891H30.4742C31.2442 7.87891 31.9442 8.00491 32.5742 8.25691C33.2042 8.50424 33.7432 8.85191 34.1912 9.29991C34.6392 9.74324 34.9869 10.2752 35.2342 10.8959C35.4816 11.5166 35.6052 12.1979 35.6052 12.9399ZM33.6732 12.9399C33.6732 12.3846 33.5986 11.8876 33.4492 11.4489C33.3046 11.0056 33.0922 10.6322 32.8122 10.3289C32.5369 10.0209 32.2009 9.78524 31.8042 9.62191C31.4122 9.45858 30.9689 9.37691 30.4742 9.37691H28.5072V16.5029H30.4742C30.9689 16.5029 31.4122 16.4212 31.8042 16.2579C32.2009 16.0946 32.5369 15.8612 32.8122 15.5579C33.0922 15.2499 33.3046 14.8766 33.4492 14.4379C33.5986 13.9946 33.6732 13.4952 33.6732 12.9399Z"*/}
                      {/*      fill="white"/>*/}
                      {/*    <path*/}
                      {/*      d="M43.5813 7.87891V9.37691H39.0873V12.3729H42.8813V13.8779H39.0873V18.0009H37.1973V7.87891H43.5813Z"*/}
                      {/*      fill="white"/>*/}
                      {/*  </svg>*/}
                      {/*</span>*/}
                      {/*    </div>*/}
                      {/*    <div className="order__files-col">*/}
                      {/*      <p className="order__files-title">Методические рекомендации | <span*/}
                      {/*        className="order__files-size">0.7 Мб</span></p>*/}
                      {/*      <div className="order__files-action">*/}
                      {/*        <a href="" className="order__files-link">Посмотреть</a>*/}
                      {/*        <a href="" className="order__files-link">Скачать</a>*/}
                      {/*      </div>*/}
                      {/*    </div>*/}
                      {/*    <div className="order__files-col">*/}
                      {/*      <a href="" className="order__files-link">Удалить</a>*/}
                      {/*    </div>*/}
                      {/*  </div>*/}
                      </div>
                      {/*<div className="order__files-row">*/}
                      {/*  <a href="" className="order__files-link">Показать ещё</a>*/}
                      {/*</div>*/}
                      <form action="">
                      <div className="cb-file-uploader">
                        {/*<p className="cb-file-uploader__text">Выберите файл на компьютере</p>*/}
                        <p className="cb-file-uploader__text">Перетащите файл или выберите на компьютере</p>
                        <label htmlFor="cb-file-uploader__field" className="cb-file-uploader__label">
                          <span className="cb-file-uploader__link">Выбрать файл</span>
                            <input onChange={handleFileChange} id="cb-file-uploader__field" type="file" className="cb-file-uploader__visually-hidden"/>
                        </label>
                          {/*<button style={{marginTop: '8px'}} className="cb-button">Отправить</button>*/}
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
              <div className="order__aside">
                <div className="order__helper">
                    <p className="order__helper-title">Где найти детали?</p>
                    <p className="order__helper-text">Кнопка “Редактировать” позволит перейти в Резюме заявки и
                      исправить
                      данные.
                    </p>
                    <p className="order__helper-text">Для редактирования данных с самого начала перейдите в&nbsp;
                      <a href="" className="order__helper-link">Квиз заявки.</a>
                    </p>
                  </div>
                  {/*<button className="cb-button cb-button-contour">Новая заявка</button>*/}
                {/* <Link
                  style={{textDecoration: 'none'}}
                  to={`../service/${id}/tech_settings`}
                  className="cb-button">Настройка технических проверок</Link> */}
                <a
                  id='DownloadProtocolDOCX'
                  style={{textDecoration: 'none'}}
                  href={`${axios.defaults.baseURL}services/service/${id}/create_protocol_docx/`}
                  className="cb-button cb-button-contour">Скачать протокол docx</a>
                <a
                  id='DownloadProtocolPDF'
                  style={{textDecoration: 'none'}}
                  href={`${axios.defaults.baseURL}services/service/${id}/create_protocol_pdf/`}
                  className="cb-button cb-button-contour">Скачать протокол pdf</a>
                </div>
            </div>
            <div className="order__history">
              <div className="order__history-item is-done">
                  <div className="order__history-wrapper">
                    <p className="order__history-step">1</p>
                  </div>
                  <div className="order__history-inner">
                    <h2 className="order__history-title order__history-title_check_status">Проверка</h2>
                    <div className="order__history-cards">
                      <OrderCard
                        id_service={Number(service_card?.id)}
                        id_stage={0}
                        title={'Проверка комплектности'}
                        state={'Пройдена'}
                        experts={['Анатольев Анатолий', 'Константинопольский Василий']}
                        comments={5}/>
                    </div>
                  </div>
                </div>
              <div className="order__history-item is-done">
                  <div className="order__history-wrapper">
                    <p className="order__history-step">2</p>
                  </div>
                  <div className="order__history-inner">
                    <h2 className="order__history-title order__history-title_check_status">Экспертиза</h2>
                    <div className="order__history-cards">
                      {instance?.map(({key, items}) => (
                          <OrderCard
                            id_service={Number(service_card?.id)}
                            id_stage={Number(key)}
                            title={items[0].stage_name}
                            state={general_status(items)}
                            experts={['Анатольев Анатолий', 'Константинопольский Василий', 'Татьяна Жилина']}
                            comments={0}/>))}
                    </div>
                  </div>
                </div>
              <div className="order__history-item">
                  <div className="order__history-wrapper">
                    <p className="order__history-step">3</p>
                  </div>
                  <div className="order__history-inner">
                    <h2 className="order__history-title order__history-title_check_status">Каталог</h2>
                    <div className="order__history-cards">
                      <OrderCard
                        id_service={Number(service_card?.id)}
                        id_stage={0}
                        title='Включение в каталог'
                        state='Не началось'
                        experts={[]}
                        comments={0}/>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}
