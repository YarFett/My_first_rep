import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, Link, Route, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "../constructor.scss"
import "../order-request.scss"
import "../../../css/style.css"
import PageHeader from "../../page-header/page-header";
import { SearchProvider } from "../../context_for_search";
import { NewAppContext } from "../../context_for_application";
import Select from 'react-select';
import { CustomSelect } from "../../../UI-Kit/elements/select/select";
import { Url } from "url";
import Swal from 'sweetalert2';
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils";
import { Type, View, ViewType } from "../../general/service";

export interface Errp {
  id: number,
  service_name: string,
  class_service: string,
  producer: string,
}

function RegRosPoYes(props: any) {
  const location = useLocation();
  const [resourse, setResourse] = useContext(NewAppContext)
  const data = location.state;
  // const rightData = Object.entries(data)

  const [errpNumber, setErrpNumber] = useState(getItemFromLocalStorage('errpNumber'))
  // const [errp, setERRP] = useState(null)
  const [view, setView] = useState(getItemFromLocalStorage('view'))
  const [type, setType] = useState(getItemFromLocalStorage('type'))
  const [viewName, setViewName] = useState(getItemFromLocalStorage('viewName'))
  const [typeName, setTypeName] = useState(getItemFromLocalStorage('typeName'))
  const [name, setName] = useState(getItemFromLocalStorage('name'))
  const [producer, setProducer] = useState(getItemFromLocalStorage('producer'))
  const [version, setVersion] = useState(getItemFromLocalStorage('version'))
  const [poClass, setPoClass] = useState(getItemFromLocalStorage('poClass'))


  const [errp, setERRP] = useState(null)

  const [errpData, setErrpData] = useState<Errp>()

  const [idErrp, setIdErrp] = useState(getItemFromLocalStorage('errpNumber'))

  const [answers, setAnswer] = useContext(NewAppContext)
  const history = useNavigate();
  const [viewTypeList, setViewTypeList] = useState<ViewType[]>()
  const [viewList, setViewList] = useState<View[]>()
  const [typeList, setTypeList] = useState<Type[]>()

  function get_view(listViewType: ViewType[]) {
    var newList: View[] = []
    listViewType.map((elem) => {
      if (newList.find(e => e.view_service === elem.view[0].view_service) === undefined) {
        newList.push(elem.view[0])
      }
    })
    return newList
  }

  useEffect(() => {

    axios.all([
      axios.get(`services/view_type/`)])
      .then(axios.spread(function (res) {
        setViewTypeList(res.data)
        setViewList(get_view(res.data))
      }
      ))
      .catch(errors => {
        console.log(errors)
      })
  }, [])

  useEffect(() => {
    console.log('Current data is ', resourse);
  }, [resourse]);

  // const handleInputerrpNumber = (e: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setErrpNumber(e.target.value);
  // };

  // const handleInputVersion = (e: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setVersion(e.target.value);
  // };

  // const handleViewERRP = (newValue: any) => {
  //   setIdErrp(newValue.value);
  // };
  // const handleViewChange = (newValue: any) => {
  //   setView(newValue.id);
  // };
  // const handleTypeChange = (newValue: any) => {
  //   setType(newValue.type[0].id);
  // };
  // const json_errp = [{ value: 1, label: '1' },
  // { value: 2, label: '2' },
  // { value: 3, label: '3' }]

  // const getValueERRP = () => {
  //   console.log()
  //   return idErrp ? json_errp.find(c => c.value === view) : ' '
  // }
  const handleInputerrpNumber = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setErrpNumber(e.target.value);
  };

  const handleInputVersion = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setVersion(e.target.value);
  };

  const handleViewERRP = (newValue: any) => {
    setIdErrp(newValue.value);
  };
  const handleViewChange = (newValue: any) => {
    setView(newValue.id);
    setViewName(newValue.view_service)
    setType('')
    var newTypeList: Type[] = []
    viewTypeList?.filter(elem => {
      if (elem.view[0].id === newValue.id) {
        newTypeList.push(elem.type[0])
        // console.log(elem.type[0])
      }
    })
    setTypeList(newTypeList)
  };
  const handleTypeChange = (newValue: any) => {
    setType(newValue.id);
    setTypeName(newValue.type_service)
  };
  const getDataFromErrp = async () => {
    try {
      const url = `http://localhost:8000/api/services/software_reg/${errpNumber}/`
      const response = await fetch(url);
      const newData = await response.json();
      setErrpData(newData);
      setIdErrp(`${newData?.id}`)
      setName(`${newData?.service_name}`)
      setProducer(`${newData?.producer}`)
      setPoClass(`${newData?.class_service}`)
      console.log(newData)

    } catch (error) {
      if (error) {
        setName('')
        setProducer('')
        setVersion('')
        setPoClass('')
        Swal.fire({
          title: '№ не найден',
          text: 'Попробуйте ввести другой №',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      if (idErrp === '') {
        setName('')
        setProducer('')
        setVersion('')
        setPoClass('')
        Swal.fire({
          title: 'Введите №',
          confirmButtonText: 'OK'
        });
      }
      console.error("Вот твоя ошибка", error)
    }
  };

  const test_json_view = [
    {
      "id": '1',
      "view_service": "Базовый сервис платформы"
    },
    {
      "id": '2',
      "view_service": "Сервис инфраструктуры"
    },
    {
      "id": '3',
      "view_service": "Дополнительный сервис платформы"
    },
    {
      "id": '4',
      "view_service": "Цифровой продукт защиты информации"
    }
  ]
  const test_view_type_id_view = [
    {
      "id": 21,
      "view": [
        {
          "id": 3,
          "view_service": "Дополнительный сервис платформы"
        }
      ],
      "type": [
        {
          "id": '21',
          "type_service": "Сервис ГК"
        }
      ]
    },
    {
      "id": 22,
      "view": [
        {
          "id": 3,
          "view_service": "Дополнительный сервис платформы"
        }
      ],
      "type": [
        {
          "id": '22',
          "type_service": "Сервис вендора"
        }
      ]
    },
    {
      "id": 23,
      "view": [
        {
          "id": 3,
          "view_service": "Дополнительный сервис платформы"
        }
      ],
      "type": [
        {
          "id": '23',
          "type_service": "Публикуемый SaaS"
        }
      ]
    }
  ]
  const json_type = [{ value: 1, label: 'Тип1' },
  { value: 2, label: 'Тип2' },
  { value: 3, label: 'Тип3' }]

  const handleCloseModal = () => {
    try {
      setItemToLocalStorage('IderrpNumber', idErrp)
      setItemToLocalStorage('errpNumber', errpNumber)
      setItemToLocalStorage('view', view)
      setItemToLocalStorage('type', type)
      setItemToLocalStorage('viewName', viewName)
      setItemToLocalStorage('typeName', typeName)
      setItemToLocalStorage('name', name)
      setItemToLocalStorage('producer', producer)
      setItemToLocalStorage('version', version)
      setItemToLocalStorage('poClass', poClass)
      // props.onUpdate(listCommentsLength)
      // window.location.reload()
      props.onClose()
      // localStorage.clear()
    }
    catch (error) { console.log(error) }
  }

  const onclick = (e: any) => {

    const newAnswer = [
      { create_body_cp: 'Сведения о ЦП' },
      [{ errpNumber: errpNumber },
      { form: view },
      { name: name },
      { producer: producer },
      { version: version },
      { poClass: poClass },
      ]
    ];
    setItemToLocalStorage('IderrpNumber', idErrp)
    setItemToLocalStorage('errpNumber', errpNumber)
    setItemToLocalStorage('view', view)
    setItemToLocalStorage('type', type)
    setItemToLocalStorage('viewName', viewName)
    setItemToLocalStorage('typeName', typeName)
    setItemToLocalStorage('name', name)
    setItemToLocalStorage('producer', producer)
    setItemToLocalStorage('version', version)
    setItemToLocalStorage('poClass', poClass)
    setAnswer((prevAnswers: any) => [...prevAnswers, newAnswer]);
    history("/cp_har/", { state: newAnswer });
  }


  return (
    <div className="order-request__container">
      <div className="constructor">
        <div className="constructor__inner">
          <div className="constructor__card" style={{ boxShadow: 'none' }}>
            <div className="constructor__header">
              <p className="constructor__title">Сведения о ЦП</p>
            </div>
            <div>
              <button className="cb-button" onClick={getDataFromErrp}>Найти по ЕРРП</button>
            </div>
            <div className="constructor__card-item">
              <div className="constructor__card-row is-cp">
                <div className="cb-combo-box">
                  <label className="cb-text-field__label cb-text-field"> № в Реестр Российского ПО
                    <input className="cb-text-field__input input" type="text" value={errpNumber} placeholder="Введите номер..." onChange={handleInputerrpNumber} />
                  </label>
                </div>
                {/*<label className="cb-combo-box__label">№ в ЕРРП</label>*/}
                {/*<div className="cb-text-field__value">*/}
                {/*  <input className="cb-text-field__input" type="text" value={errpNumber} placeholder="Введите номер..." onChange={handleInputerrpNumber}/>*/}
                {/*      </div>*/}

                {/* <>
                          <Select
                              onChange={handleViewERRP}
                              value={getValueERRP()}
                              options={json_errp}
                              placeholder='Выберите номер ЕРРП'
                              classNamePrefix="select"
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
                              </> */}

                <div className="cb-select">
                  <label className="cb-select__label">Вид</label>
                  <Select
                    onChange={handleViewChange}
                    getOptionLabel={option => option.view_service}
                    getOptionValue={option => String(option.id)}
                    options={viewList}
                    placeholder='Выберите вид ЦП'
                    classNamePrefix="select"
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
                </div>
                <div className="cb-select">
                  <label className="cb-select__label">Тип</label>
                  <Select
                    isDisabled={view == null}
                    onChange={handleTypeChange}
                    getOptionLabel={option => option.type_service}
                    getOptionValue={option => String(option.id)}
                    options={typeList}
                    placeholder='Выберите тип ЦП'
                    classNamePrefix="select"
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
                </div>
              </div>
              {/*<CustomSelect*/}
              {/*  label='Label'*/}
              {/*  placeholder='Placeholder'*/}
              {/*  // onClick={handleTypeChange}*/}
              {/*  value={getValueERRP}*/}
              {/*  options={json_errp}*/}
              {/*  // isDisabled={}*/}
              {/*  // onChange={}*/}
              {/*  // getOptionLabel={}*/}
              {/*  // getOptionValue={}*/}
              {/*  // options={}*/}
              {/*  // placeholder_name={'Выберите'}*/}
              {/*/>*/}


            </div>
            <div className="constructor__card-item">
              <ul className="constructor__description">
                <li className="constructor__description-item">
                  <p className="constructor__description-label">Название</p>
                  <p className="constructor__description-value">{name}</p>
                </li>
                <li className="constructor__description-item">
                  <p className="constructor__description-label">Поставщик</p>
                  <p className="constructor__description-value">{producer}</p>
                </li>
                <li className="constructor__description-item" style={{ display: "flex" }}>
                  <p className="constructor__description-label" style={{ width: '296px' }}>Версия</p>
                  <input style={{ width: '55%', margin: 0, padding: '6px 7px' }}
                    className="cb-text-field__input input" type="text" value={version}
                    placeholder="Введите версию..." onChange={handleInputVersion} />
                </li>
                <li className="constructor__description-item">
                  <p className="constructor__description-label">Класс ПО</p>
                  <p className="constructor__description-value">{poClass}</p>
                </li>
              </ul>
            </div>
            <div style={{ textAlign: "center" }}>
              <button className="cb-button" onClick={handleCloseModal}>Сохранить и закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default RegRosPoYes;