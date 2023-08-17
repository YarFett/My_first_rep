import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './filter.scss';


class Filter extends React.Component {

  state = {
    advancedFilter: false,
    selectFilter: false,
    search: null,
  }

  render() {
    const onClickFilter = () => {
      if (this.state.advancedFilter) {
        this.setState({advancedFilter: false})
      }
      else {
        this.setState({advancedFilter: true})
      }
    }

    const addFilter = (event: React.FormEvent) => {
      event.preventDefault();
      let formData = new FormData(event.target as HTMLFormElement)
      if (formData.get('search')) {
        this.setState({search: formData.get('search')})
      }
      else {
        this.setState({search: null})
      }
      this.setState({selectFilter: true})
    }
    return (
      <div className="filter">
        <form className="filter__card" onSubmit={addFilter}>
          <div className="filter__item filter__header">
            <h3 className='filter__heading'>Фильтр</h3>
            <button id="ClearFilter" className='filter__btn' type='reset'>Очистить</button>
          </div>
          <div className="filter__item">
            <div className="cb-text-field filter__search">
                <label className="cb-text-field__label filter__search">
                  Поиск
                  <input id="FilterInput" name='search' className="input" type="search"/>
                  {/*<span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                  {/*  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                  {/*    <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5" />*/}
                  {/*    <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5" />*/}
                  {/*  </svg>*/}
                  {/*</span>*/}
                </label>
              </div>
            <div>
              <button id="GetFilter" type='submit' className="cb-button cb-button-contour">
                Применить</button>
            </div>
          </div>
          <div className="filter__item">
            <button id='BigFilter' type='button' className='filter__btn' onClick={onClickFilter}>
              Расширенный фильтр
            {/*  <span className="cb-icon cb-icon-dropdown cb-icon__size-24">*/}
            {/*  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*    <path d="M6.29537 10.7195C5.90154 10.3261 5.90154 9.68836 6.29537 9.29501C6.68919 8.90166 7.3277 8.90166 7.72152 9.29501L12.7131 14.2805C13.1069 14.6739 13.1069 15.3116 12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705L6.29537 10.7195Z" fill="currentColor" />*/}
            {/*    <path d="M16.2785 9.29516C16.6723 8.90181 17.3108 8.90181 17.7046 9.29516C18.0985 9.68851 18.0985 10.3263 17.7046 10.7196L12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705C10.8931 15.3116 10.8931 14.674 11.2869 14.2807L16.2785 9.29516Z" fill="currentColor" />*/}
            {/*  </svg>*/}
            {/*</span>*/}
            </button>
          </div>
          {this.state.advancedFilter && (
            <>

              <div className="filter__item">
                <div className="cb-combo-box">
                  <p className="cb-combo-box__label">Цифровой продукт</p>
                  <div className="cb-combo-box__value">
                    <div className="cb-combo-box__field">
                      <input className="cb-combo-box__input" type="text" />
                      <div className="cb-combo-box__group-icon">
                    <span className="cb-icon cb-icon-dropdown cb-icon__size-24">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.29537 10.7195C5.90154 10.3261 5.90154 9.68836 6.29537 9.29501C6.68919 8.90166 7.3277 8.90166 7.72152 9.29501L12.7131 14.2805C13.1069 14.6739 13.1069 15.3116 12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705L6.29537 10.7195Z" fill="currentColor" />
                        <path d="M16.2785 9.29516C16.6723 8.90181 17.3108 8.90181 17.7046 9.29516C18.0985 9.68851 18.0985 10.3263 17.7046 10.7196L12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705C10.8931 15.3116 10.8931 14.674 11.2869 14.2807L16.2785 9.29516Z" fill="currentColor" />
                      </svg>
                    </span>
                        <span className="cb-icon cb-icon-clear cb-icon__size-24">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"></path>
                        <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"></path>
                      </svg>
                    </span>
                      </div>
                    </div>
                    <div className="cb-combo-box__option">
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">First item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Last item</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cb-text-field">
                  <label className="cb-text-field__label">
                    № в реестре
                    <input id="ReNumberInput" className="input" type="text"/>
                    {/*<span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                    {/*  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*    <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5" />*/}
                    {/*    <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5" />*/}
                    {/*  </svg>*/}
                    {/*</span>*/}
                  </label>
                  {/*<div className="cb-text-field__value">*/}
                  {/*  <input className="cb-text-field__input" type="text" />*/}
                  {/*  <div className="cb-text-field__group-icon">*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
                <div className="cb-combo-box">
                  <p className="cb-combo-box__label">Поставщик</p>
                  <div className="cb-combo-box__value">
                    <div className="cb-combo-box__field">
                      <input id="ProducerInput" className="cb-combo-box__input" type="text" />
                      <div className="cb-combo-box__group-icon">
                    <span className="cb-icon cb-icon-dropdown cb-icon__size-24">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.29537 10.7195C5.90154 10.3261 5.90154 9.68836 6.29537 9.29501C6.68919 8.90166 7.3277 8.90166 7.72152 9.29501L12.7131 14.2805C13.1069 14.6739 13.1069 15.3116 12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705L6.29537 10.7195Z" fill="currentColor" />
                        <path d="M16.2785 9.29516C16.6723 8.90181 17.3108 8.90181 17.7046 9.29516C18.0985 9.68851 18.0985 10.3263 17.7046 10.7196L12.7131 15.705C12.3193 16.0983 11.6807 16.0983 11.2869 15.705C10.8931 15.3116 10.8931 14.674 11.2869 14.2807L16.2785 9.29516Z" fill="currentColor" />
                      </svg>
                    </span>
                        <span className="cb-icon cb-icon-clear cb-icon__size-24">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"></path>
                        <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"></path>
                      </svg>
                    </span>
                      </div>
                    </div>
                    <div className="cb-combo-box__option">
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">First item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Item</span>
                        </div>
                      </div>
                      <div className="cb-combo-box__option-item">
                        <div className="cb-combo-box__option-item-wrapper">
                          <span className="cb-combo-box__option-text">Last item</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter__item">
                <div className="cb-text-field">
                  <label className="cb-text-field__label">
                    Статус заявки
                    <input id="OrderStatusInput" className="input" type="text"/>
                    {/*<span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                    {/*  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*    <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5" />*/}
                    {/*    <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5" />*/}
                    {/*  </svg>*/}
                    {/*</span>*/}
                  </label>
                  {/*<div className="cb-text-field__value">*/}
                  {/*  <input className="cb-text-field__input" type="text" />*/}
                  {/*  <div className="cb-text-field__group-icon">*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
                <div className="cb-text-field">
                  <label className="cb-text-field__label">
                    № заявки
                    <input id="OrderNumberInput" className="input" type="text"/>
                    {/*<span className="cb-icon cb-icon-clear cb-icon__size-24">*/}
                    {/*  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                    {/*    <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5" />*/}
                    {/*    <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5" />*/}
                    {/*  </svg>*/}
                    {/*</span>*/}
                  </label>
                  {/*<div className="cb-text-field__value">*/}
                  {/*  <input className="cb-text-field__input" type="text" />*/}
                  {/*  <div className="cb-text-field__group-icon">*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
            </>
          )}
        </form>
        {this.state.selectFilter && (
          <div className="filter__tags">
            {this.state.search && (
              <button id="ButtonForSearch" className="cb-tag cb-tag--icon">{this.state.search}
                <span className="cb-icon cb-icon-tag cb-icon__size-24">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.9396 11.9998L6.84814 16.0913L7.9088 17.152L12.0003 13.0605L16.0918 17.152L17.1524 16.0913L13.061 11.9998L17.1524 7.90832L16.0918 6.84766L12.0003 10.9392L7.90882 6.84766L6.84816 7.90832L10.9396 11.9998Z" fill="currentColor" />
              </svg>
            </span>
              </button>
            )}
          </div>
        )}
        {/*<div className="filter__tags">*/}
        {/*  {this.state.search && (*/}
        {/*    <button className="cb-tag cb-tag--icon">{this.state.search}*/}
        {/*      <span className="cb-icon cb-icon-tag cb-icon__size-24">*/}
        {/*      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
        {/*        <path fillRule="evenodd" clipRule="evenodd" d="M10.9396 11.9998L6.84814 16.0913L7.9088 17.152L12.0003 13.0605L16.0918 17.152L17.1524 16.0913L13.061 11.9998L17.1524 7.90832L16.0918 6.84766L12.0003 10.9392L7.90882 6.84766L6.84816 7.90832L10.9396 11.9998Z" fill="currentColor" />*/}
        {/*      </svg>*/}
        {/*    </span>*/}
        {/*    </button>*/}
        {/*  )}*/}

        {/*  /!*<button className="cb-tag cb-tag--icon">№ в реестре 8678*!/*/}
        {/*  /!*  <span className="cb-icon cb-icon-tag cb-icon__size-24">*!/*/}
        {/*  /!*    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*!/*/}
        {/*  /!*      <path fillRule="evenodd" clipRule="evenodd" d="M10.9396 11.9998L6.84814 16.0913L7.9088 17.152L12.0003 13.0605L16.0918 17.152L17.1524 16.0913L13.061 11.9998L17.1524 7.90832L16.0918 6.84766L12.0003 10.9392L7.90882 6.84766L6.84816 7.90832L10.9396 11.9998Z" fill="currentColor" />*!/*/}
        {/*  /!*    </svg>*!/*/}
        {/*  /!*  </span>*!/*/}
        {/*  /!*</button>*!/*/}
        {/*  /!*<button className="cb-tag cb-tag--icon">Помощник формирования цены*!/*/}
        {/*  /!*  <span className="cb-icon cb-icon-tag cb-icon__size-24">*!/*/}
        {/*  /!*    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*!/*/}
        {/*  /!*      <path fillRule="evenodd" clipRule="evenodd" d="M10.9396 11.9998L6.84814 16.0913L7.9088 17.152L12.0003 13.0605L16.0918 17.152L17.1524 16.0913L13.061 11.9998L17.1524 7.90832L16.0918 6.84766L12.0003 10.9392L7.90882 6.84766L6.84816 7.90832L10.9396 11.9998Z" fill="currentColor" />*!/*/}
        {/*  /!*    </svg>*!/*/}
        {/*  /!*  </span>*!/*/}
        {/*  /!*</button>*!/*/}
        {/*</div>*/}
      </div>

    )
  }
}




export default Filter;