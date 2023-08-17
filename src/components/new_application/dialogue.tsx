import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Act_Service_card } from "../api_params/service_card";
import { json } from "stream/consumers";
import './dialogue.scss';


function NewApplication ({active, setActive}: {active: boolean; setActive: any}) {

  

  return (

          <div className={active ? "dialogue active" : "dialogue"}>
            <div className="dialogue__backdrop">&nbsp;</div>
            <div className="dialogue__card" onClick={e => e.stopPropagation()}>
              <div className="dialogue__card-header">
                <p className="dialogue__card-header-title">Регистрация завки</p>
                <span className="cb-icon cb-icon__size-24" onClick={() => setActive(false)}>
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" cliprule-rule="evenodd" d="M10.9394 12.9976L4.99805 18.9389L6.0587 19.9996L12.0001 14.0582L17.9414 19.9996L19.0021 18.9389L13.0607 12.9976L19.0015 7.05676L17.9408 5.99609L12.0001 11.9369L6.05927 5.99609L4.99861 7.05676L10.9394 12.9976Z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
              <div className="dialogue__card-body">
                <div className="form-card__list">
                  <div className="form-card__item">
                    <p className="form-card__item-title">Общая информация</p>
                    <div className="form-card__item-inner">
                      <div className="form-card__row">
                        <div className="cb-text-field">
                          <label className="cb-text-field__label">№ в реестре</label>
                          <div className="cb-text-field__value">
                              <input className="cb-text-field__input" type="text"/>
                              <div className="cb-text-field__group-icon">
                                  <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"/>
                                          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"/>
                                      </svg>
                                  </span>
                              </div>
                          </div>
                        </div>
                        <div className="cb-text-field">
                          <label className="cb-text-field__label">Название ЦП</label>
                          <div className="cb-text-field__value">
                              <input className="cb-text-field__input" type="text"/>
                              <div className="cb-text-field__group-icon">
                                  <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"/>
                                          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"/>
                                      </svg>
                                  </span>
                              </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-card__row">
                        <div className="cb-text-field">
                          <label className="cb-text-field__label">Поставщик</label>
                          <div className="cb-text-field__value">
                              <input className="cb-text-field__input" type="text"/>
                              <div className="cb-text-field__group-icon">
                                  <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"/>
                                          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"/>
                                      </svg>
                                  </span>
                              </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-card__row">
                        <div className="cb-text-field">
                          <label className="cb-text-field__label">Телефон</label>
                          <div className="cb-text-field__value">
                              <input className="cb-text-field__input" type="text"/>
                              <div className="cb-text-field__group-icon">
                                  <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"/>
                                          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"/>
                                      </svg>
                                  </span>
                              </div>
                          </div>
                        </div>
                        <div className="cb-text-field">
                          <label className="cb-text-field__label">Email</label>
                          <div className="cb-text-field__value">
                              <input className="cb-text-field__input" type="text"/>
                              <div className="cb-text-field__group-icon">
                                  <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"/>
                                          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"/>
                                      </svg>
                                  </span>
                              </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-card__row">
                        <div className="cb-text-field">
                          <label className="cb-text-field__label">ФИО представителя</label>
                          <div className="cb-text-field__value">
                              <input className="cb-text-field__input" type="text"/>
                              <div className="cb-text-field__group-icon">
                                  <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"/>
                                          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"/>
                                      </svg>
                                  </span>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-card__item">
                    <p className="form-card__item-title">Технические характеристики</p>
                    <div className="form-card__item-inner">
                      <div className="form-card__row">
                        <div className="cb-text-field">
                          <label className="cb-text-field__label">Тип ЦП</label>
                          <div className="cb-text-field__value">
                              <input className="cb-text-field__input" type="text"/>
                              <div className="cb-text-field__group-icon">
                                  <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"/>
                                          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"/>
                                      </svg>
                                  </span>
                              </div>
                          </div>
                        </div>
                        <div className="cb-text-field">
                          <label className="cb-text-field__label">Вид ЦП</label>
                          <div className="cb-text-field__value">
                              <input className="cb-text-field__input" type="text"/>
                              <div className="cb-text-field__group-icon">
                                  <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"/>
                                          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"/>
                                      </svg>
                                  </span>
                              </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-card__row">
                        <div className="cb-text-field">
                          <label className="cb-text-field__label">Класс ПО</label>
                          <div className="cb-text-field__value">
                              <input className="cb-text-field__input" type="text"/>
                              <div className="cb-text-field__group-icon">
                                  <span className="cb-icon cb-icon-clear cb-icon__size-24">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M3.92285 19.9238L19.9229 3.92383" stroke="currentColor" strokeWidth="1.5"/>
                                          <path d="M3.92285 3.92383L19.9229 19.9238" stroke="currentColor" strokeWidth="1.5"/>
                                      </svg>
                                  </span>
                              </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="form-card__item-inner is-uploader">
                      <div className="form-card__row">
                        <p className="form-card__row-title">Контейнер ЦП</p>
                        <div className="cb-file-uploader">
                          <input id="cb-file-uploader__field" type="file" className="cb-file-uploader__visually-hidden"/>
                          <p className="cb-file-uploader__text"/>Перетащите файл или выберите на компьютере
                          <label htmlFor="cb-file-uploader__field" className="cb-file-uploader__label">
                              <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                          </label>
                          </div>
                        </div>
                      
                      <div className="form-card__row">
                        <p className="form-card__row-title">Документация на ЦП</p>
                        <div className="cb-file-uploader">
                          <input id="cb-file-uploader__field" type="file" className="cb-file-uploader__visually-hidden"/>
                          <p className="cb-file-uploader__text"/>Перетащите файл или выберите на компьютере
                          <label htmlFor="cb-file-uploader__field" className="cb-file-uploader__label">
                              <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                          </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-card__row">
                        <p className="form-card__row-title">Файл IAM</p>
                        <div className="cb-file-uploader">
                          <input id="cb-file-uploader__field" type="file" className="cb-file-uploader__visually-hidden"/>
                          <p className="cb-file-uploader__text"/>Перетащите файл или выберите на компьютере
                          <label htmlFor="cb-file-uploader__field" className="cb-file-uploader__label">
                              <a href="" className="cb-file-uploader__link">Выбрать файл</a>
                          </label>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  
              <div className="dialogue__card-footer">
                <button className="cb-button">Отправить</button>
                <button className="cb-button cb-button-contour">Сохранить черновик</button>
              </div>
              </div>
            </div>

  );
}


export default NewApplication;
