import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import {calculateNewValue} from "@testing-library/user-event/dist/utils";
import Select from "react-select";
import {string} from "prop-types";
import { useDispatch, useSelector } from "react-redux";

interface Answer {
  service_diag_name: string | 'Введите наименование сервиса в логах',
  url_metrics: string,
  url_save_log: string,
  logs_display_url: string,
  metrics_display_url: string,
}

interface Metrics {
  id: number,
  m_metric: string,
  m_description: string,
  class_metric_name: string,
  type_metric: number
}

interface TypeMetrics {
  id: number,
  type_metric: string
}

function TechChecks() {
  let { id } = useParams();
  const history = useNavigate();

  const [answer, setAnswer] = useState<Answer>()
  const [metrics, setMetrics] = useState<Metrics[]>()
  const [types, setTypes] = useState<TypeMetrics[]>()
  const [serviceDiagName, setServiceDiagName] = useState<string>()
  const [urlMetrics, setUrlMetrics] = useState<string>()
  const [urlSaveLog, setUrlSaveLog] = useState<string>()
  const [urlMetricsDisplay, setUrlMetricsDisplay] = useState<string>()
  const [urlLogDisplay, setUrlLogDisplay] = useState<string>()
  let errors_api = false

  useEffect(() => {
    axios.all([
      axios.get(`services/settings/${id}/`),
      axios.get(`checks/monitoring_settings/${id}/get_by_service/`),
      axios.get(`checks/monitoring_type_metric/`)])
      .then(axios.spread(function (res_answer, res, res_type) {
        setAnswer(res_answer.data)
        setMetrics(res.data)
        setTypes(res_type.data)
      }))
      .catch(errors => {
        errors_api = true
        console.log(errors)
      })
  }, [])

  const handleSubmitTechSettings = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      "service_diag_name": serviceDiagName,
      "url_metrics": urlMetrics,
      "url_save_log": urlSaveLog,
      "logs_display_url": urlLogDisplay,
      "metrics_display_url": urlMetricsDisplay,
    }
    const target = event.target as HTMLFormElement
    target.reset()

    axios.put(`services/settings/${id}/`, data)
      .then((response) => {
        console.log(response)
        setAnswer(response.data)
      });
  };

  const handleSubmitMetrics = (event: React.FormEvent, id: number) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement)

    axios.put(`checks/monitoring_settings/${id}/`, formData)
      .then((response) => {
        console.log(response.data)
      });
  };

  const handleMetricDelete = (id: number, index: number) => {

    axios.delete(`checks/monitoring_settings/${id}/`)
      .then((response) => {
        var newList: Metrics[] = []
        metrics?.map(elem => (newList.push(elem)))
        newList = newList.filter(elem => (elem.id !== id))
        setMetrics(newList)
      });
  };

  const handleGoBack = (e: any) => {
    history(-1);
  }

  return (
    <>
      <SearchProvider>
        <PageHeader />
      </SearchProvider>
      <main className="order-request">
        <div className="order-request__container">
          <div className="constructor">
            <div className="constructor__header">
              <a className="constructor__link-back" onClick={handleGoBack}>Назад</a>

              <h1 className="constructor__title">Настройка технических проверок</h1>
            </div>
            <form className="constructor__inner" onSubmit={handleSubmitTechSettings}>
              <div className="constructor__card">
                <div className="constructor__card-item">
                  <div className="constructor__card-row">
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Наименование сервиса в логах
                        <input
                          required
                          className="cb-text-field__input input"
                          type="text"
                          name="service_diag_name"
                          defaultValue={answer?.service_diag_name}
                          placeholder='Введите наименование сервиса в логах...'
                          onChange={(e) => setServiceDiagName(e.target.value)} />
                      </label>
                    </div>
                  </div>
                  <div className="constructor__card-row">
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Адрес метрик
                        <input
                          required
                          className="cb-text-field__input input"
                          type="text"
                          name="url_metrics"
                          defaultValue={answer?.url_metrics}
                          placeholder='Введите адрес метрик...'
                          onChange={(e) => setUrlMetrics(e.target.value)} />
                      </label>
                    </div>
                  </div>
                  <div className="constructor__card-row">
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Адрес логов
                        <input
                          required
                          className="cb-text-field__input input"
                          type="text"
                          name="url_save_log"
                          defaultValue={answer?.url_save_log}
                          placeholder='Введите адрес логов...'
                          onChange={(e) => setUrlSaveLog(e.target.value)} />
                      </label>
                    </div>
                  </div>
                  <div className="constructor__card-row">
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Адрес показа метрик
                        <input
                          required
                          className="cb-text-field__input input"
                          type="text"
                          name="logs_display_url"
                          defaultValue={answer?.metrics_display_url}
                          placeholder='Введите адрес показа метрик...'
                          onChange={(e) => setUrlMetricsDisplay(e.target.value)} />
                      </label>
                    </div>
                  </div>
                  <div className="constructor__card-row">
                    <div className="cb-text-field">
                      <label className="cb-text-field__label cb-text-field">
                        Адрес показа логов
                        <input
                          required
                          className="cb-text-field__input input"
                          type="text"
                          name="metrics_display_url"
                          defaultValue={answer?.logs_display_url}
                          placeholder='Введите адрес показа логов...'
                          onChange={(e) => setUrlLogDisplay(e.target.value)} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="cb-button">Изменить настройки</button>
            </form>
            <div className="constructor__inner">
              <div className="constructor__card constructor__card_metrics">
                <h2 className="constructor__title">Метрики</h2>
                {metrics?.map((value, index, array) => (
                  <div style={{padding:'16px', borderRadius: '12px',border: '2px solid #99B1E6'}}>
                    <h3 className='comments-page__item-title' style={{marginBottom: '8px'}}>
                      {value.class_metric_name}
                    </h3>
                    <form onSubmit={e => handleSubmitMetrics(e, value.id)}
                          style={{display: "flex", alignItems:"center"}}>
                      <div
                        style={{
                          display:"flex", flexDirection: "column", width:'100%', marginRight: '20px', rowGap: '16px'
                      }}>
                        <label className='cb-text-field__label' htmlFor="m_metric">
                          Название метрики
                          <input required className="input" id='m_metric' name='m_metric'
                                 defaultValue={value.m_metric} type="text"/>
                        </label>
                        <label className='cb-text-field__label' htmlFor="m_description">
                          Описание метрики
                          <input required className="input" id='m_description'  name='m_description'
                                 defaultValue={value.m_description} type="text"/>
                        </label>
                        <label className='cb-text-field__label'>Тип метрики
                          <Select
                            required
                            name='type_metric'
                            getOptionLabel={option => option.type_metric}
                            getOptionValue={option => String(option.id)}
                            placeholder='Выберите тип метрики'
                            classNamePrefix="select"
                            options={types}
                            defaultValue={types?.filter(elem => (elem['id'] === value.type_metric))}
                            styles={{
                              control: (styles) => ({
                                ...styles,
                                height: '52px',
                                padding: '12px 16px',
                                background: '#F5F7FA',
                                border: '2px solid #F5F7FA',
                                boxShadow: 'none',
                                cursor: "pointer",
                                '&:hover': {
                                  borderColor: '#99b1e6',
                                },
                              }),
                              dropdownIndicator: (baseStyles, state) => ({
                                ...baseStyles,
                                color: state.isFocused ? '#0D4CD3' : '#86909C',
                                transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                                transition: 'all .3s ease',
                                '&:hover': {
                                  color: '#0D4CD3',
                                },
                              }),
                              menu: (baseStyles, state) => ({
                                ...baseStyles,
                                border: '2px solid #99b1e6',
                                borderTop: 'none',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                boxShadow: 'none',
                              }),
                              option: (baseStyles, state) => ({
                                ...baseStyles,
                                padding: '14px 16px',
                                cursor: "pointer",
                                '&:hover': {
                                  color: '#0D4CD3',
                                },
                              }),
                            }}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                          />
                        </label>
                      </div>
                      <div style={{display:"flex", flexDirection: "column", justifyContent: "space-between", height:'100%'}}>
                        <button className="cb-button cb-button-contour"
                                style={{maxHeight: '52px', marginBottom: '20px'}} type="submit">
                          Изменить метрику
                        </button>
                        <button className="cb-button" style={{maxHeight: '52px'}} type="button"
                                onClick={() => handleMetricDelete(value.id, index)}>
                          Удалить метрику
                        </button>
                      </div>
                    </form>
                  </div>
                ))}
                {/*<form action="">*/}
                {/*  /!*<button className="cb-button" style={{width: '100%'}}>Добавить метрику</button>*!/*/}
                {/*</form>*/}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export default TechChecks;