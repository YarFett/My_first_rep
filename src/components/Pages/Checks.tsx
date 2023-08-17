import '../check_instance_elem/comments-page.scss'
import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ServiceCard } from "../general/service";
import { InstanceElem } from "../check_instance_elem/instance_elem";
import './review.scss'
import '../new_application/dialogue.scss'
import { instanceOf, number } from "prop-types";
import DateConvert from "../general/date";
import { title } from 'process';
import { Modal } from 'reactstrap';
import general_status from '../check_instance_elem/instance_elem';
import LogsMetrics from './LogsMetrics';


interface Instance {
  service: number,
  id: number,
  name: string,
  description: string,
  comments: Comment[],
  states: string[],
  parent_id: number,
  parent_name: string,
}

interface Comment {
  id: number,
  comment: string,
  expert: number,
  expert_name: string
  date: string,
  in_protocol: boolean,
}

interface SortInstance {
  key: number,
  items: Instance[],
}

interface TechChekLogs {
  service: number,
  id: number,
  name: string,
  description: string,
  comments: Comment[],
  states: string[],
  parent_id: number,
}

const groupByStage = (data: Instance[]) => {
  const result: { [key: number]: Instance[] } = {};

  data.forEach((instance) => {
    if (!instance.hasOwnProperty('parent_id')) {
      return;
    }
    const stage = Number(instance.parent_id);
    if (!result.hasOwnProperty(stage)) {
      result[stage] = [instance];
    } else {
      result[stage].push(instance);
    }
  });
  return Object.keys(result).map((key) => ({ key: parseInt(key), items: result[parseInt(key)] }));
};

interface LogsMetricsTable {
  id: number,
  description: string,
  states: string[],
}

function LogsMetricTable(instance: LogsMetricsTable) {

  let logMetricStatus = 'review__table-status'

  let agr_state = general_status(instance.states || [])

  if (agr_state === 'Пройдена') {
    logMetricStatus = 'review__table-status is-ok'
  }
  else if (agr_state !== 'Не началась') {
    logMetricStatus = 'review__table-status is-error'
  }

  return (
    <div className="review__table-row">
      <div className="review__table-col"><span className={instance.id + ' ' + logMetricStatus}>&nbsp;</span></div>
      <div className="review__table-col is-title">{instance.description}</div>
      <div className="review__table-col">{instance.states}</div>
    </div>
  )
}

function Checks() {

  const history = useNavigate();
  let { id, id_check } = useParams();
  const [service_card, setServiceCard] = useState<ServiceCard>()
  const [rootName, setRootName] = useState('')
  const [sortListChecks, setSortListChecks] = useState<SortInstance[]>([])
  const [techChecks, setTechChecks] = useState<boolean>()
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openResultLogs, setOpenResultLogs] = useState(false)
  const [openResultMetrics, setOpenResultMetrics] = useState(false)
  const [classNameForLoadingLogs, setclassNameForLoadingLogs] = useState('review__item')
  const [classNameForLoadingMetrics, setclassNameForLoadingMetrics] = useState('review__item')
  const [showResultsLogs, setShowResultsLogs] = useState(false)
  const [showResultsMetrics, setShowResultsMetrics] = useState(false)
  const [saveChanges, setSaveChanges] = useState('cb-button is-disabled')
  const [saveChangesNameButLog, setSaveChangesNameButLog] = useState('Запустить')
  const [saveChangesNameButMetric, setSaveChangesNameButMetric] = useState('Запустить')
  const [showModalLogs, setShowModalLogs] = useState(false)
  const [showModalMetrics, setShowModalMetrics] = useState(false)


  let [haveParent, setHaveParent] = useState<boolean>()
  let errors_api = false

  const handleButtonClickLogs = () => {
    setOpenResultLogs(true);
  };

  const handleButtonClickMetrics = () => {
    setOpenResultMetrics(true);
  };

  useEffect(() => {

    const responseForSett = axios.get(`services/settings/${id}/`)
    console.log(responseForSett)

    axios.all([axios.get(`services/service/${id}/`),
    axios.get(`checks/expert/?service=${id}&check_journal__root_id=${id_check}`)])
      .then(axios.spread(function (res_service, res_list_instance) {
        setRootName(res_list_instance.data[0].root_name)
        setServiceCard(res_service.data)
        const listChecks = groupByStage(res_list_instance.data)
        if (listChecks.length > 1) {
          setHaveParent(true)
        }
        // else if (listChecks[0].key !== res_list_instance.data[0].root_id) {
        //   setHaveParent(true)
        // }
        setSortListChecks(listChecks)

        // console.log(newObj);
        if (id_check === '3') {
          setTechChecks(true)
        }
      }))
      .catch(errors => {
        errors_api = true
        console.log(errors)
      })
  }, [])

  // console.log(formatedListTechChecksLogs)
  // console.log(formatedListTechChecksMetrics)

  const handleSubmitMetrics = (event: React.FormEvent) => {
    event.preventDefault();
    setclassNameForLoadingMetrics('review__item is-loader')

    axios.get(`checks/technical_checks/${id}/validate_metrics/`)
      .then((response) => {
        axios.get(`checks/expert/?service=${id}&check_journal__root_id=${id_check}`)
          .then((res_list_instance) => {
            console.log(res_list_instance.data)
            setSortListChecks(groupByStage(res_list_instance.data))
          });
      });
    const timer = setTimeout(() => {
      setclassNameForLoadingMetrics('review__item')
      setShowResultsMetrics(true)
      setSaveChanges('cb-button')
      setSaveChangesNameButMetric('Перезапустить')
    }, 4000);
  };

  const handleSubmitLogs = (event: React.FormEvent) => {
    event.preventDefault();

    setclassNameForLoadingLogs('review__item is-loader')
    axios.get(`checks/technical_checks/${id}/validate_logs/`)
      .then((response) => {
        console.log(response)
        axios.get(`checks/expert/?service=${id}&check_journal__root_id=${id_check}`)
          .then((res_list_instance) => {
            setSortListChecks(groupByStage(res_list_instance.data))
          });
      });
    const timer = setTimeout(() => {
      setclassNameForLoadingLogs('review__item')
      setShowResultsLogs(true)
      setSaveChanges('cb-button')
      setSaveChangesNameButLog('Перезапустить')
    }, 4000);
  };

  const handleSubmitInstances = (event: React.FormEvent) => {
    event.preventDefault();
    let formData = new FormData(event.target as HTMLFormElement)
    sortListChecks?.map(list_checks => (
      list_checks.items.map(inst => {
        if (formData.get(String(inst.id))) {
          var data = {
            "check_status": formData.get(String(inst.id)),
            "expert": 1
          }
          axios.post(`checks/expert/${inst.id}/check/`, data)
            .then((response) => {
              axios.get(`checks/expert/?service=${id}&check_journal__root_id=${id_check}`)
                .then((res_list_instance) => {
                  setSortListChecks(groupByStage(res_list_instance.data))
                });
            });
        }
      })
    ))
    const target = event.target as HTMLFormElement
    target.reset()
    setSaveChanges('cb-button is-disabled')
  };

  const handleGoToLogs = () => {
    setShowModalLogs(true)
  }

  const handleGoToMetrics = () => {
    setShowModalMetrics(true)
  }

  const handleGoBack = (e: any) => {
    history(-1);
  }

  const handleClick = () => {
    setIsSubmitted(true)
  }

  const [isWindowLogOpen, setIsWindowLogOpen] = useState(false);
  const [isWindowMetricsOpen, setIsWindowMetricsOpen] = useState(false);

  const toggleWindowLog = () => {
    setIsWindowLogOpen(!isWindowLogOpen);
  };
  const toggleWindowMetric = () => {
    setIsWindowMetricsOpen(!isWindowMetricsOpen);
  };

  console.log(sortListChecks)

  return (
    <>
      <SearchProvider>
        <PageHeader />
      </SearchProvider>
      <main>
        <form id='form-instance' onSubmit={handleSubmitInstances} className='comments-page__form-instance'>
          <div className="page-main">
            <div className="comments-page__container container">
              <div className="comments-page__header">
                <Link id='back' className="comments-page__link-back" to={"../services/service/" + String(id)}>Назад</Link>
                <div className="comments-page__header-row">
                  <h1 className="comments-page__title">{rootName}</h1>
                  {/*<div className="comments-page__informer is-positive">*/}
                  {/*  <div className="comments-page__informer-status">*/}
                  {/*  <span className="cb-icon cb-icon__size-24">*/}
                  {/*    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                  {/*      <path d="M1 13.5L7.5 20L23 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"*/}
                  {/*          strokeLinejoin="round"/>*/}
                  {/*    </svg>*/}
                  {/*  </span>*/}
                  {/*  </div>*/}
                  {/*  <div className="comments-page__informer-body">*/}
                  {/*    <p className="comments-page__informer-title">Проверка пройдена</p>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  {/*<button className="cb-button">Сохранить</button>*/}
                </div>
                <p className="comments-page__subtitle">Заявка № {id}</p>
              </div>
              <div className="comments-page__inner">
                <div className="comments-page__col">
                  {/* <div className="comments-page__list is-first-col"> */}
                  {/*{(techChecks === undefined) && (*/}
                  {/*  <button style={{ width: '50px', marginLeft: '64px'}} className="cb-button" type='submit'>Сохранить</button>*/}
                  {/*)}*/}

                  {sortListChecks?.map(check => (
                    <>
                      {/* {haveParent && (
                          <h2 className='review-expert__item-title'>
                            {check.items[0].parent_name}
                          </h2>
                        )} */}
                      {techChecks && (
                        !isSubmitted ? (
                          <div className="review__col">
                            <div className="review__list">
                              {check.key === 11 && (
                                <div className={classNameForLoadingLogs}>
                                  <div className="review__item-header">
                                    <p className="review__item-title">{sortListChecks[0].items[0].parent_name}</p>
                                  </div>
                                  <div className="review__item-body">
                                    <p className="review__item-helper-text">Для запуска диагностики журналирования нажмите на кнопку Запустить</p>
                                  </div>
                                  <div className="review__item-action">
                                    {showResultsLogs && (
                                      <>
                                        <a onClick={handleButtonClickLogs} className="review__item-link">Результат диагностики</a>
                                        <span className="cb-icon cb-icon__size-24" onClick={handleGoToLogs}>
                                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1703 4.9911C15.3033 4.59884 15.0932 4.17299 14.7009 4.03995C14.3086 3.9069 13.8828 4.11704 13.7497 4.5093L8.83173 19.0093C8.69869 19.4016 8.90883 19.8274 9.30109 19.9605C9.69336 20.0935 10.1192 19.8834 10.2523 19.4911L15.1703 4.9911ZM6.71823 7.4523C7.01112 7.74519 7.01112 8.22006 6.71823 8.51296L3.23156 11.9996L6.71823 15.4863C7.01112 15.7792 7.01112 16.2541 6.71823 16.547C6.42534 16.8398 5.95046 16.8398 5.65757 16.547L1.64057 12.53C1.49992 12.3893 1.4209 12.1985 1.4209 11.9996C1.4209 11.8007 1.49992 11.6099 1.64057 11.4693L5.65757 7.4523C5.95046 7.1594 6.42534 7.1594 6.71823 7.4523ZM17.2802 7.45236C17.573 7.15943 18.0479 7.15937 18.3408 7.45223L22.3588 11.4692C22.4995 11.6099 22.5785 11.8007 22.5785 11.9996C22.5785 12.1986 22.4995 12.3894 22.3588 12.53L18.3408 16.547C18.0479 16.8399 17.573 16.8398 17.2802 16.5469C16.9873 16.254 16.9874 15.7791 17.2803 15.4862L20.7678 11.9996L17.2803 8.51302C16.9874 8.22017 16.9873 7.74529 17.2802 7.45236Z" fill="currentColor" />
                                          </svg>
                                        </span>
                                      </>
                                    )}
                                    <Modal isOpen={showModalLogs} className="dialogue" style={{ marginTop: '500px' }}>
                                      <div className='dialogue__card is-size-custom' >
                                        <div className='dialogue__card-header'>
                                          <p className='dialogue__card-header-title'>Полученные логи</p>
                                          <span onClick={() => setShowModalLogs(false)} className="cb-icon cb-icon__size-24">
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9394 12.9976L4.99805 18.9389L6.0587 19.9996L12.0001 14.0582L17.9414 19.9996L19.0021 18.9389L13.0607 12.9976L19.0015 7.05676L17.9408 5.99609L12.0001 11.9369L6.05927 5.99609L4.99861 7.05676L10.9394 12.9976Z" fill="currentColor" />
                                            </svg>
                                          </span>
                                        </div>
                                        <div className='dialogue__card-body'>
                                          <div className='review__dialogue'>
                                            <div className='review__code'>
                                              <LogsMetrics
                                                id={id}
                                                logs_metrics='get_logs'
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Modal>
                                    <Modal isOpen={openResultLogs} className="dialogue">
                                      <div className='dialogue__backdrop'>
                                        <div className='dialogue__card'>
                                          <div className="dialogue__card-header">
                                            <p className="dialogue__card-header-title">Результат диагностики</p>
                                            <span onClick={() => setOpenResultLogs(false)} className="cb-icon cb-icon__size-24">
                                              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9394 12.9976L4.99805 18.9389L6.0587 19.9996L12.0001 14.0582L17.9414 19.9996L19.0021 18.9389L13.0607 12.9976L19.0015 7.05676L17.9408 5.99609L12.0001 11.9369L6.05927 5.99609L4.99861 7.05676L10.9394 12.9976Z" fill="currentColor" />
                                              </svg>
                                            </span>
                                          </div>
                                          <div className="review__table">
                                            <div className="review__table-titles">
                                              <p className="review__table-th">Класс</p>
                                              <p className="review__table-th">Название лога</p>
                                            </div>
                                            {check.items?.map((result) => (
                                              < LogsMetricTable
                                                id={result.id}
                                                description={result.description}
                                                states={result.states}
                                              />
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </Modal>

                                  </div>
                                  <div className="review__item-footer">
                                    <button onClick={handleSubmitLogs} className="cb-button cb-button-contour">{saveChangesNameButLog}</button>
                                  </div>
                                </div>

                              )}
                              {check.key === 12 && (
                                <div >
                                  <div className={classNameForLoadingMetrics}>
                                    <div className="review__item-header">
                                      <p className="review__item-title">{sortListChecks[1].items[0].parent_name}</p>
                                    </div>
                                    <div className="review__item-body">
                                      <p className="review__item-helper-text">Для запуска диагностики метрик нажмите на кнопку Запустить</p>
                                    </div>
                                    <div className="review__item-action">
                                      {showResultsMetrics && (
                                        <>
                                          <a onClick={handleButtonClickMetrics} className="review__item-link">Результат диагностики</a>
                                          <span className="cb-icon cb-icon__size-24" onClick={handleGoToMetrics}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1703 4.9911C15.3033 4.59884 15.0932 4.17299 14.7009 4.03995C14.3086 3.9069 13.8828 4.11704 13.7497 4.5093L8.83173 19.0093C8.69869 19.4016 8.90883 19.8274 9.30109 19.9605C9.69336 20.0935 10.1192 19.8834 10.2523 19.4911L15.1703 4.9911ZM6.71823 7.4523C7.01112 7.74519 7.01112 8.22006 6.71823 8.51296L3.23156 11.9996L6.71823 15.4863C7.01112 15.7792 7.01112 16.2541 6.71823 16.547C6.42534 16.8398 5.95046 16.8398 5.65757 16.547L1.64057 12.53C1.49992 12.3893 1.4209 12.1985 1.4209 11.9996C1.4209 11.8007 1.49992 11.6099 1.64057 11.4693L5.65757 7.4523C5.95046 7.1594 6.42534 7.1594 6.71823 7.4523ZM17.2802 7.45236C17.573 7.15943 18.0479 7.15937 18.3408 7.45223L22.3588 11.4692C22.4995 11.6099 22.5785 11.8007 22.5785 11.9996C22.5785 12.1986 22.4995 12.3894 22.3588 12.53L18.3408 16.547C18.0479 16.8399 17.573 16.8398 17.2802 16.5469C16.9873 16.254 16.9874 15.7791 17.2803 15.4862L20.7678 11.9996L17.2803 8.51302C16.9874 8.22017 16.9873 7.74529 17.2802 7.45236Z" fill="currentColor" />
                                            </svg>
                                          </span>
                                        </>
                                      )}
                                      <Modal isOpen={showModalMetrics} className="dialogue" style={{ marginTop: '500px' }}>
                                        <div className='dialogue__card is-size-custom' >
                                          <div className='dialogue__card-header'>
                                            <p className='dialogue__card-header-title'>Полученные метрики</p>
                                            <span onClick={() => setShowModalMetrics(false)} className="cb-icon cb-icon__size-24">
                                              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9394 12.9976L4.99805 18.9389L6.0587 19.9996L12.0001 14.0582L17.9414 19.9996L19.0021 18.9389L13.0607 12.9976L19.0015 7.05676L17.9408 5.99609L12.0001 11.9369L6.05927 5.99609L4.99861 7.05676L10.9394 12.9976Z" fill="currentColor" />
                                              </svg>
                                            </span>
                                          </div>
                                          <div className='dialogue__card-body'>
                                            <div className='review__dialogue'>
                                              <div className='review__code'>
                                                <LogsMetrics
                                                  id={id}
                                                  logs_metrics='get_metrics'
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Modal>
                                      <Modal isOpen={openResultMetrics} className="dialogue">
                                        <div className='dialogue__backdrop'>
                                          <div className='dialogue__card'>
                                            <div className="dialogue__card-header">
                                              <p className="dialogue__card-header-title">Результат диагностики</p>
                                              <span onClick={() => setOpenResultMetrics(false)} className="cb-icon cb-icon__size-24">
                                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9394 12.9976L4.99805 18.9389L6.0587 19.9996L12.0001 14.0582L17.9414 19.9996L19.0021 18.9389L13.0607 12.9976L19.0015 7.05676L17.9408 5.99609L12.0001 11.9369L6.05927 5.99609L4.99861 7.05676L10.9394 12.9976Z" fill="currentColor" />
                                                </svg>
                                              </span>
                                            </div>
                                            <div className="review__table">
                                              <div className="review__table-titles">
                                                <p className="review__table-th">Класс</p>
                                                <p className="review__table-th">Название метрики</p>
                                              </div>
                                              {check.items?.map((result) => (
                                                < LogsMetricTable
                                                  id={result.id}
                                                  description={result.description}
                                                  states={result.states}
                                                />
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </Modal>
                                    </div>
                                    <div className="review__item-footer">
                                      <button onClick={handleSubmitMetrics} className="cb-button cb-button-contour">{saveChangesNameButMetric}</button>
                                    </div>
                                  </div>
                                </div>)}
                            </div>
                            {/* <div className="review__buttons">
                                <button className="cb-button is-disabled">Отправить</button>
                                <button className="cb-button cb-button-contour">Отмена</button>
                              </div> */}
                          </div>
                        ) : (
                          <div>
                            {check.key === 11 && (
                              <div style={{ display: 'flex', flexDirection: 'row' }}>

                                {/*<a className="cb-button" href={`${axios.defaults.baseURL}services/getlogsmetrics/${id}/get_logs`}>*/}
                                {/*  Показ логов*/}
                                {/*</a>*/}
                                <div>
                                  {/* <p className='review-expert__helper-title'>Результат диагностики</p>
                                  <a className="constructor__description-link" onClick={toggleWindowLog}>{isWindowLogOpen ? 'Скрыть' : 'Развернуть'}</a> */}
                                  {/* {
                                  isWindowLogOpen &&  */}
                                  <div>
                                    {/* <a style={{ marginRight: '20px' }} onClick={handleSubmitLogs} type="submit" className="constructor__description-link">Проверка логов</a>
                                    <Link target={'_blank'} className="constructor__description-link" to={`/services/${id}/get_logs`}>Показ логов</Link> */}
                                    {/* {Object.values(formatedListTechChecksLogs['root_id'])} */}
                                    {
                                      // check.items?.map((result) => (
                                      <InstanceElem
                                        root_id={String(id_check)}
                                        title={check.items[0].parent_name}
                                        id={check.key}
                                        description='Анализ логов — один из базовых инструментов в работе ИТ-специалистов. Он помогает обнаружить источники многих проблем, выявить конфликты в конфигурационных файлах, отследить события, связанные с ИБ.'
                                      />
                                      // ))
                                    }
                                    <p style={{ display: 'flex', marginLeft: '64px' }} className='review-expert__helper-title'>Результат диагностики</p>
                                    {isWindowLogOpen && <div style={{ display: 'flex', marginLeft: '64px', marginTop: '24px' }} >
                                      <div className="review__table">
                                        <div className="review__table-titles">
                                          <p className="review__table-th">Класс</p>
                                          <p className="review__table-th">Название лога</p>
                                        </div>
                                        {check.items?.map((result) => (
                                          < LogsMetricTable
                                            id={result.id}
                                            description={result.description}
                                            states={result.states}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    }
                                    <a style={{ display: 'flex', marginLeft: '64px' }} className="constructor__description-link" onClick={toggleWindowLog}>{isWindowLogOpen ? 'Скрыть' : 'Развернуть'}</a>
                                  </div>
                                  {/* } */}
                                </div>
                              </div>
                            )}
                            {check.key === 12 && (
                              <div>
                                {/* <button style={{ marginRight: '20px' }} onClick={handleSubmitMetrics} type="submit" className="cb-button">Проверка метрик</button>
                                <Link target={'_blank'} className="cb-button cb-button-contour" to={`/services/${id}/get_metrics`}>Показ метрик</Link> */}
                                {/*<a href={`../service/${id}/tech_settings`}></a>*/}
                                <div>
                                  {/* {
                                    check.items?.map((result) => ( */}
                                  <InstanceElem
                                    root_id={String(id_check)}
                                    id={check.key}
                                    title={check.items[0].parent_name}
                                    ShowParams={<p className='review-expert__helper-title'>Результат диагностики</p>}
                                    description='Данные из разных точек среды собираются системой мониторинга, которая отвечает за хранение, агрегацию, визуализацию данных и автоматические реагирует на изменения.'
                                  />
                                  <p style={{ display: 'flex', marginLeft: '64px' }} className='review-expert__helper-title'>Результат диагностики</p>
                                  {isWindowMetricsOpen && <div style={{ display: 'flex', marginLeft: '64px', marginTop: '24px' }} >
                                    <div className="review__table">
                                      <div className="review__table-titles">
                                        <p className="review__table-th">Класс</p>
                                        <p className="review__table-th">Метрика</p>
                                      </div>
                                      {check.items?.map((result) => (
                                        < LogsMetricTable
                                          id={result.id}
                                          description={result.description}
                                          states={result.states}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  }
                                  {/* ))
                                    } */}

                                  <a style={{ display: 'flex', marginLeft: '64px' }} className="constructor__description-link" onClick={toggleWindowMetric}>{isWindowMetricsOpen ? 'Скрыть' : 'Развернуть'}</a>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                      <div className="comments-page__list is-first-col">
                        {!techChecks && check.items?.map((result) => (
                          <InstanceElem
                            root_id={String(id_check)}
                            service={result.service}
                            id={result.id}
                            title={result.name}
                            description={result.description}
                            comments={result.comments}
                            status={result.states}
                          />
                        ))}
                      </div>
                    </>
                  ))
                  }
                  {techChecks && (
                    !isSubmitted && (
                      <div className="review__buttons">
                        <button id='saveTech' type='submit' className={saveChanges}>Сохранить</button>
                        <button onClick={handleClick} className="cb-button">Вид Эксперта</button>
                      </div>
                    ))}
                  {/* </div> */}
                </div>
                <div className="comments-page__col is-sticky">
                  <div className="comments-page__card">
                    <div className="comments-page__card-header">
                      <p className="comments-page__card-title">{service_card?.software_registry.producer}</p>
                      <span className="cb-icon cb-icon__size-24">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 16.3077L12.6945 16.6704L17.5 19.1805V5C17.5 4.72386 17.2761 4.5 17 4.5H7C6.72386 4.5 6.5 4.72386 6.5 5V19.1805L11.3055 16.6704L12 16.3077ZM12 18L17.537 20.8921C18.2028 21.2399 19 20.7569 19 20.0057V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V20.0057C5 20.7569 5.79719 21.2399 6.46297 20.8921L12 18Z"
                            fill="currentColor" />
                        </svg>
                      </span>
                    </div>
                    <div className="comments-page__card-description">
                      <p className="comments-page__card-subtitle">{service_card?.software_registry.service_name}</p>
                      <p className="comments-page__card-text-helper">Вид: {service_card?.viewtype.view[0].view_service}</p>
                      <p className="comments-page__card-text-helper">Тип: {service_card?.viewtype.type[0].type_service}</p>
                    </div>
                    <div className="comments-page__card-info">
                      <p className="comments-page__card-subtitle">{service_card?.software_registry.producer}</p>
                      <div className="comments-page__card-row">
                        <p className="comments-page__card-text-helper">№ в реестре: {service_card?.software_registry.id}</p>
                        {/* <span className="cb-icon cb-icon__size-24">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M8 6H4C3.44772 6 3 6.44772 3 7V21C3 21.5523 3.44772 22 4 22H15C15.5523 22 16 21.5523 16 21V18H20C20.5523 18 21 17.5523 21 17V5C21 3.34315 19.6569 2 18 2H9C8.44772 2 8 2.44772 8 3V6ZM9.5 6H13C14.6569 6 16 7.34315 16 9V16.5H19.5V5C19.5 4.17157 18.8284 3.5 18 3.5H9.5V6ZM4.5 20.5V7.5H13C13.8284 7.5 14.5 8.17157 14.5 9V20.5H4.5Z"
                           fill="currentColor"/>
                   </svg>
                  </span> */}
                      </div>
                      <div className="comments-page__card-row is-space-between">
                        {/*<p className="comments-page__card-text-helper">*/}
                        {/*  Дата регистрации: {service_card?.create_date.split('T')[0]} {service_card?.create_date.split('T')[1].split('.')[0].split(':')[0]}*/}
                        {/*  :{service_card?.create_date.split('T')[1].split('.')[0].split(':')[1]}</p>*/}
                        <p className="comments-page__card-text-helper">
                          Дата регистрации: {DateConvert(String(service_card?.create_date), true)}</p>
                        {/*<a href="" className="comments-page__card-link">Подробнее</a>*/}
                      </div>
                    </div>
                  </div>
                  {(techChecks) && (
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`../service/${id}/tech_settings`}
                      className="cb-button">Настройка технических проверок</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {(techChecks === undefined) && (
            <div style={{
              position: "sticky", bottom: 0, padding: '0 auto',
              borderTopLeftRadius: '12px', borderTopRightRadius: '12px',
              backgroundColor: 'white', boxShadow: '0 1px 4px #e3ebfc'
            }}>

              <div className='container' style={{ padding: '10px 0', }}>
                <button id='save' style={{ width: '50px', marginLeft: '64px' }} className="cb-button" type='submit'>Сохранить</button>
                {/*<button style={{ width: '50px', marginLeft: '32px' }}*/}
                {/*        onClick={event => resetForm()}*/}
                {/*        className="cb-button cb-button-contour" type='button'>*/}
                {/*  Отменить*/}
                {/*</button>*/}
              </div>

            </div>
          )}
        </form>
      </main>
    </>
  )

}

export default Checks



