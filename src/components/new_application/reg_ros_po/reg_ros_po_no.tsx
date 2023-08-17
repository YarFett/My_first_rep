import React, { ChangeEvent, Component, SyntheticEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from 'react-select';
import { Form, Link, To, redirect, useLocation, useNavigate } from "react-router-dom";
import "../constructor.scss"
import "../order-request.scss"
import "../../../css/style.css"
import PageHeader from "../../page-header/page-header";
import { SearchProvider } from "../../context_for_search";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../utils";
import Swal from "sweetalert2";
import { Type, View, ViewType } from "../../general/service";
import { NewAppContext } from "../../context_for_application";

function RegRosPoNo() {
    const location = useLocation();

    const [errpNumber, setErrpNumber] = useState('')

    const [view, setView] = useState('')
    const [type, setType] = useState('')
    const [viewName, setViewName] = useState('')
    const [typeName, setTypeName] = useState('')
    const [name, setName] = useState('')
    const [version, setVersion] = useState('')


    const [errp, setERRP] = useState(null)
    const [idErrp, setIdErrp] = useState('')

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
        const savedview = getItemFromLocalStorage('viewName');
        const savedtype = getItemFromLocalStorage('typeName');
        const savedname = getItemFromLocalStorage('name');
        const savedversion = getItemFromLocalStorage('version');

        if (savedview !== null) {
            setViewName(savedview);
        }
        if (savedtype !== null) {
            setTypeName(savedtype);
        }
        if (savedname !== null) {
            setName(savedname);
        }
        if (savedversion !== null) {
            setVersion(savedversion);
        }

    }, []);


    const handleInputName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setName(e.target.value);
    };

    const handleInputVersion = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setVersion(e.target.value);
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

    const onclick = (e: any) => {
        if (name.trim() === '') { alert("Введите нвзвание ЦП.") }
        if (view === '' || type === '') { alert("Выберете тип и вид.") }
        else {
            const newAnswer = [
                { create_body_cp: 'Сведения о ЦП' },
                [{ errpNumber: errpNumber },
                { form: view },
                { name: name },
                { version: version },
                ]
            ];

            setItemToLocalStorage('view', view)
            setItemToLocalStorage('type', type)
            setItemToLocalStorage('viewName', viewName)
            setItemToLocalStorage('typeName', typeName)
            setItemToLocalStorage('name', name)
            setItemToLocalStorage('version', version)
            setAnswer((prevAnswers: any) => [...prevAnswers, newAnswer]);
            history("/cp_har/", { state: newAnswer });
            console.log(viewName)
            console.log(typeName)
        }

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
                            <Link className="constructor__link-back" to={"/reg_ros_po"}>Назад</Link>
                            <p className="constructor__title">Сведения о ЦП</p>
                        </header>
                        <div className="constructor__inner">
                            <div className="constructor__card">
                                <div className="constructor__card-item">
                                    <div className="constructor__card-row">
                                        <div className="cb-text-field">
                                            <label className="cb-text-field__label cb-text-field">
                                                Название
                                                <input className="cb-text-field__input input" type="search" value={name} placeholder="Введите Название цифрового продукта"
                                                    onChange={handleInputName} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="constructor__card-item">
                                    <div className="constructor__card-row is-2fr-1fr">
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
                                        <div className="cb-text-field">
                                            <label className="cb-text-field__label cb-text-field">
                                                Версия
                                                <input className="cb-text-field__input input" type="search" value={version} placeholder="Введите версию"
                                                    onChange={handleInputVersion} />
                                            </label>
                                            <p className="cb-text-field__helper">При наличии</p>
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
export default RegRosPoNo;