import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import Select from "react-select";
import { string } from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import './requirements.scss';
import '../new_application/dialogue.scss';
import { Modal } from "reactstrap";

function Requirements() {

    const history = useNavigate();
    const [showNewRequirement, setShowNewRequirement] = useState(false)

    const handleOpenNewReq = (event: React.FormEvent) => {
        setShowNewRequirement(true)
    }

    const handleBack = () => {
        history(-1)
    }

    return (
        <>
            <SearchProvider>
                <PageHeader />
            </SearchProvider>
            <main className="page-main">
                <div className="requirements">
                    <Modal isOpen={showNewRequirement} className="dialogue" style={{ marginTop: '500px' }}>
                        <div className="dialogue__backdrop">&nbsp;</div>
                        <div className="dialogue__card">
                            <div className="dialogue__card-header">
                                <p className="dialogue__card-header-title">Новое требование</p>
                                <span className="cb-icon cb-icon__size-24" onClick={() => setShowNewRequirement(false)}>
                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9394 12.9976L4.99805 18.9389L6.0587 19.9996L12.0001 14.0582L17.9414 19.9996L19.0021 18.9389L13.0607 12.9976L19.0015 7.05676L17.9408 5.99609L12.0001 11.9369L6.05927 5.99609L4.99861 7.05676L10.9394 12.9976Z" fill="currentColor" />
                                    </svg>
                                </span>
                            </div>
                            <div className="dialogue__card-body">
                                <div className="requirements__form__list">
                                    <div className="requirements__form-item">
                                        <div className="requirements__form-row">
                                            <div className="cb-text-field">
                                                <label className="cb-text-field__label">№ Пункта в МР</label>
                                                <div className="cb-text-field__value">
                                                    <input className="cb-text-field__input" type="text" />
                                                    <div className="cb-text-field__group-icon">
                                                        <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" stroke-width="1.5" />
                                                                <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" stroke-width="1.5" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cb-checkbox">
                                                <label className="cb-checkbox__field">
                                                    <input className="cb-checkbox__input" type="checkbox" />
                                                    <span className="cb-checkbox__flag">&nbsp;</span>
                                                    <span className="cb-checkbox__label">Нет в МР</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="requirements__form-row is-full-width">
                                            <div className="cb-text-field">
                                                <label className="cb-text-field__label">Название</label>
                                                <div className="cb-text-field__value">
                                                    <input className="cb-text-field__input" type="text" />
                                                    <div className="cb-text-field__group-icon">
                                                        <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" stroke-width="1.5" />
                                                                <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" stroke-width="1.5" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="requirements__form-row is-full-width">
                                            <div className="cb-textarea">
                                                <label className="cb-textarea__label">Описание</label>
                                                <div className="cb-textarea__field">
                                                    <textarea className="cb-textarea__input"></textarea>
                                                    <div className="cb-textarea__group-data">
                                                        <p className="cb-textarea__length">
                                                            <span className="cb-textarea__current-length">255</span>
                                                            <span className="cb-textarea__max-length">255</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="requirements__form-row">
                                            <div className="requirements__form-group">
                                                <p className="requirements__form-group-title">Объект проверки</p>
                                                <div className="cb-radio">
                                                    <label className="cb-radio__field">
                                                        <input className="cb-radio__input" type="radio" />
                                                        <span className="cb-radio__flag">&nbsp;</span>
                                                        <span className="cb-radio__label">Поставщик</span>
                                                    </label>
                                                </div>
                                                <div className="cb-radio">
                                                    <label className="cb-radio__field">
                                                        <input className="cb-radio__input" type="radio" />
                                                        <span className="cb-radio__flag">&nbsp;</span>
                                                        <span className="cb-radio__label">ЦП</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="requirements__form-row">
                                            <div className="requirements__form-group">
                                                <p className="requirements__form-group-title">Тип проверки</p>
                                                <div className="cb-checkbox">
                                                    <label className="cb-checkbox__field">
                                                        <input className="cb-checkbox__input" type="checkbox" />
                                                        <span className="cb-checkbox__flag">&nbsp;</span>
                                                        <span className="cb-checkbox__label">Документарная</span>
                                                    </label>
                                                </div>
                                                <div className="cb-checkbox">
                                                    <label className="cb-checkbox__field">
                                                        <input className="cb-checkbox__input" type="checkbox" />
                                                        <span className="cb-checkbox__flag">&nbsp;</span>
                                                        <span className="cb-checkbox__label">Техническая</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="requirements__form-row is-full-width">
                                            <div className="requirements__form-group">
                                                <p className="requirements__form-group-title">Тип проверки</p>
                                                <div className="requirements__item-tags">
                                                    <button className="cb-tag">ДРП</button>
                                                    <button className="cb-tag">ДПР</button>
                                                    <button className="cb-tag">ДАД</button>
                                                    <button className="cb-tag">ЦУМ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dialogue__card-footer is-center">
                                <button className="cb-button is-disabled">Сохранить</button>
                            </div>
                        </div>
                    </Modal>
                    <div className="requirements__container">
                        <header className="requirements__header">
                            <a className="requirements__link-back" onClick={handleBack}>Назад</a>
                            <div className="requirements__header-row">
                                <p className="requirements__title">Чек-листы</p>
                                <button onClick={handleOpenNewReq} className="cb-button cb-button-contour">Новое требование</button>
                            </div>
                            <a href="#" className="requirements__header-link">
                                <span className="cb-icon cb-icon__size-24">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 8.5H9.5V7V4.5H14.5V7V8.5H16H17.8787L12 14.3787L6.12132 8.5H8ZM8 4V5.5V7H6.5H4.91421C4.02331 7 3.57714 8.07714 4.20711 8.70711L11.2929 15.7929C11.6834 16.1834 12.3166 16.1834 12.7071 15.7929L19.7929 8.70711C20.4229 8.07714 19.9767 7 19.0858 7H17.5H16V5.5V4C16 3.44772 15.5523 3 15 3H9C8.44772 3 8 3.44772 8 4ZM2 19V16H3.5V19C3.5 19.2761 3.72386 19.5 4 19.5H20C20.2761 19.5 20.5 19.2761 20.5 19V16H22V19C22 20.1046 21.1046 21 20 21H4C2.89543 21 2 20.1046 2 19Z" fill="currentColor" />
                                    </svg>
                                </span>
                                Методичка и требования</a>
                        </header>
                        <div className="requirements__list">
                            <div className="requirements__item">
                                <div className="requirements__item-col">
                                    <p className="requirements__item-info">п. 4 &#124; Документарная</p>
                                    <p className="requirements__item-title">Требование к поставщику</p>
                                </div>
                                <div className="requirements__item-col">
                                    <div className="requirements__item-tags">
                                        <button className="cb-tag">ДРП</button>
                                        <button className="cb-tag is-color">ДПР</button>
                                        <button className="cb-tag">ДАД</button>
                                        <button className="cb-tag">ЦУМ</button>
                                    </div>
                                </div>
                                <div className="requirements__item-col">
                                    <span className="cb-icon cb-icon__size-24">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="requirements__item">
                                <div className="requirements__item-col">
                                    <p className="requirements__item-info">п. 4 &#124; Документарная Техническая</p>
                                    <p className="requirements__item-title">Требование к надежности</p>
                                </div>
                                <div className="requirements__item-col">
                                    <div className="requirements__item-tags">
                                        <button className="cb-tag">ДРП</button>
                                        <button className="cb-tag">ДПР</button>
                                        <button className="cb-tag is-color">ДАД</button>
                                        <button className="cb-tag is-color">ЦУМ</button>
                                    </div>
                                </div>
                                <div className="requirements__item-col">
                                    <span className="cb-icon cb-icon__size-24">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="requirements__item">
                                <div className="requirements__item-col">
                                    <p className="requirements__item-info">п. 5.1 &#124; Документарная</p>
                                    <p className="requirements__item-title">Требование к дистрибутиву</p>
                                </div>
                                <div className="requirements__item-col">
                                    <div className="requirements__item-tags">
                                        <button className="cb-tag">ДРП</button>
                                        <button className="cb-tag">ДПР</button>
                                        <button className="cb-tag">ДАД</button>
                                        <button className="cb-tag is-color">ЦУМ</button>
                                    </div>
                                </div>
                                <div className="requirements__item-col">
                                    <span className="cb-icon cb-icon__size-24">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="requirements__item">
                                <div className="requirements__item-col">
                                    <p className="requirements__item-info">п. 5.1 &#124; Техническая</p>
                                    <p className="requirements__item-title">Совместимость сервиса с ОС из Реестра ПО</p>
                                </div>
                                <div className="requirements__item-col">
                                    <div className="requirements__item-tags">
                                        <button className="cb-tag is-color">ДРП</button>
                                        <button className="cb-tag">ДПР</button>
                                        <button className="cb-tag">ДАД</button>
                                        <button className="cb-tag">ЦУМ</button>
                                    </div>
                                </div>
                                <div className="requirements__item-col">
                                    <span className="cb-icon cb-icon__size-24">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="requirements__item">
                                <div className="requirements__item-col">
                                    <p className="requirements__item-info">п. 5.1 &#124; Документарная</p>
                                    <p className="requirements__item-title">Использование МР по организации производственного процесса разработки ГИС и сервисов с использованием ЕЦП «ГосТех»</p>
                                </div>
                                <div className="requirements__item-col">
                                    <div className="requirements__item-tags">
                                        <button className="cb-tag is-color">ДРП</button>
                                        <button className="cb-tag">ДПР</button>
                                        <button className="cb-tag">ДАД</button>
                                        <button className="cb-tag">ЦУМ</button>
                                    </div>
                                </div>
                                <div className="requirements__item-col">
                                    <span className="cb-icon cb-icon__size-24">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="requirements__item">
                                <div className="requirements__item-col">
                                    <p className="requirements__item-info">п. 5.1 &#124; Документарная Техническая</p>
                                    <p className="requirements__item-title">Требование к содержанию и порядку выполнения работ, связанных с созданием безопасного (защищенного) ПО</p>
                                </div>
                                <div className="requirements__item-col">
                                    <div className="requirements__item-tags">
                                        <button className="cb-tag is-color">ДРП</button>
                                        <button className="cb-tag">ДПР</button>
                                        <button className="cb-tag">ДАД</button>
                                        <button className="cb-tag is-color">ЦУМ</button>
                                    </div>
                                </div>
                                <div className="requirements__item-col">
                                    <span className="cb-icon cb-icon__size-24">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99782 5.33184C8.20421 3.9903 9.35852 3 10.7158 3H13.2842C14.6415 3 15.7958 3.99031 16.0022 5.33184L16.105 5.99996H17.4955H19L19 6H20V7.5H18.8833L18.0486 18.2326C17.9271 19.7945 16.6242 21 15.0576 21H8.94239C7.37576 21 6.07291 19.7945 5.95143 18.2326L5.11667 7.5H4V6H5L5 5.99996H6.50453H7.89503L7.99782 5.33184ZM14.5873 5.99996H9.41268L9.48037 5.55993C9.57419 4.95014 10.0989 4.5 10.7158 4.5H13.2842C13.9011 4.5 14.4258 4.95014 14.5196 5.55993L14.5873 5.99996ZM6.6212 7.5L7.44691 18.1163C7.50765 18.8972 8.15908 19.5 8.94239 19.5H15.0576C15.8409 19.5 16.4923 18.8972 16.5531 18.1163L17.3788 7.5L6.6212 7.5Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>

    )
}

export default Requirements;