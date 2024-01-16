import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import {Service} from "../api_params/service";
import {Link} from "react-router-dom";
import './app-list.scss';
import PageHeader from "../page-header/page-header";
import {SearchContext} from "../context_for_search";
import _ from "lodash";
import {ServiceCard} from "../general/service";
import DateConvert from "../general/date";


interface ServiceNew {
  "results": ServiceCard[]
}

function AppList() {

  const [service] = useContext(SearchContext)
  const [serviceNew, setServiceNew] = useState<ServiceCard[]>()

  return (
    <table className="app-list">
      <thead>
        <tr>
          <th className="app-list__headlines">
            <div className="app-list__headlines-title">Заявка</div>
            <div className="app-list__headlines-title">Цифровой продукт</div>
            <div className="app-list__headlines-title">Поставщик</div>
            <div className="app-list__headlines-title">№ в реестре</div>
          </th>
        </tr>
      {/*<tr>*/}
      {/*  <th className="app-list__headlines-title">*/}
      {/*    Заявка*/}
      {/*  </th>*/}
      {/*  <th className="app-list__headlines-title">*/}
      {/*    Цифровой продукт*/}
      {/*  </th>*/}
      {/*  <th className="app-list__headlines-title">*/}
      {/*    Поставщик*/}
      {/*  </th>*/}
      {/*  <th className="app-list__headlines-title">*/}
      {/*    № в реестре*/}
      {/*  </th>*/}
      {/*</tr>*/}
      </thead>
      {/* {JSON.stringify(serviceNew)} */}
      {/* {service.map(
        (service: Service) => {
          return (
            <tr key={service.id}>
              <div className="app-list__inner is-special">
                <div className="app-list__item is-draft">
                  <div className="app-list__item-col">
                    <div className="app-list__item-status"></div>
                  </div>
                  <div className="app-list__item-col">
                    <p className="app-list__item-title">{service.id}</p>
                    <p className="app-list__item-text-helper">{service.create_date}</p>
                  </div>
                  <div className="app-list__item-col">
                    <p className="app-list__item-row">
                      <span className="app-list__item-title">{service.service_name}</span>
                      <span className="app-list__item-icon cb-icon cb-icon__size-24">
                        <Link to={`/services/issue/${service.id}/`}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd"
                                d="M7 5.5H11V4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V13H18.5V17C18.5 17.8284 17.8284 18.5 17 18.5H7C6.17157 18.5 5.5 17.8284 5.5 17V7C5.5 6.17157 6.17157 5.5 7 5.5ZM15 5.5L17.4394 5.5L8.96967 13.9697L10.0303 15.0303L18.5 6.56072V9.00001H20V4.75C20 4.33579 19.6642 4.00001 19.25 4L15 4L15 5.5Z"
                                fill="currentColor"/>
                        </svg></Link>
                      </span>
                    </p>
                    <p className="app-list__item-text-helper">{service.viewtype_name}</p>
                  </div>
                  <div className="app-list__item-col">
                    <p className="app-list__item-title">{service.producer}</p>
                    <p className="app-list__item-text-helper app-list__item-text-helper--icon">с 25 авг 2020</p>
                  </div>
                  <div className="app-list__item-col is-center">
                    <p className="app-list__item-row app-list__item-text-helper">
                      <span className="app-list__item-text-helper">8678</span>
                      <span className="app-list__item-icon cb-icon cb-icon__size-24">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd"
                                d="M8 6H4C3.44772 6 3 6.44772 3 7V21C3 21.5523 3.44772 22 4 22H15C15.5523 22 16 21.5523 16 21V18H20C20.5523 18 21 17.5523 21 17V5C21 3.34315 19.6569 2 18 2H9C8.44772 2 8 2.44772 8 3V6ZM9.5 6H13C14.6569 6 16 7.34315 16 9V16.5H19.5V5C19.5 4.17157 18.8284 3.5 18 3.5H9.5V6ZM4.5 20.5V7.5H13C13.8284 7.5 14.5 8.17157 14.5 9V20.5H4.5Z"
                                fill="currentColor"/>
                        </svg>
                      </span>
                    </p>
                  </div>
                  <div className="app-list__item-col is-center">
                    <span className="app-list__item-prompt is-active cb-icon cb-icon__size-24">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B1F33" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M17.3788 16.5L16.7683 8.65106C16.5861 6.30819 14.6318 4.5 12.2819 4.5H11.7181C9.36818 4.5 7.41389 6.30819 7.23167 8.65105L6.6212 16.5L17.3788 16.5ZM5.73619 8.53474L5.11667 16.5L4 16.5V18L5 18H6.50453H8.12602C8.57006 19.7252 10.1362 21 12 21C13.8638 21 15.4299 19.7252 15.874 18H17.4955H19H20V16.5H18.8833L18.2638 8.53474C18.0208 5.41092 15.4151 3 12.2819 3H11.7181C8.58487 3 5.97915 5.41092 5.73619 8.53474ZM14.292 18L9.70802 18C10.0938 18.883 10.9748 19.5 12 19.5C13.0252 19.5 13.9062 18.883 14.292 18Z"
                              fill="currentColor"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </tr>
          )
        }
      )} */}
      <tbody>
      {service?.map((service: ServiceCard) => (
        <tr key={service.id}  className="app-list__inner is-special">
          <td className="app-list__item is-draft">
            <div className="app-list__item-col">
              <div className="app-list__item-status"></div>
            </div>
            <div className="app-list__item-col">
              <p className="app-list__item-title">{service.id}</p>
              <p className="app-list__item-text-helper">
                {DateConvert(service.create_date, true)}
                {/*{service.create_date.split('T')[0]} {service.create_date.split('T')[1].split('.')[0].split(':')[0]}*/}
                {/*:{service.create_date.split('T')[1].split('.')[0].split(':')[1]}*/}
              </p>
              {/* <p className="app-list__item-text-helper">{service.create_date}</p> */}
            </div>
            <div className="app-list__item-col">
              <p className="app-list__item-row">
                <span className="app-list__item-title">{service.software_registry.service_name}</span>
                <span className="app-list__item-icon cb-icon cb-icon__size-24">
                    <Link to={`/services/service/${service.id}/`} id={String(service.id) + '_service'}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M7 5.5H11V4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V13H18.5V17C18.5 17.8284 17.8284 18.5 17 18.5H7C6.17157 18.5 5.5 17.8284 5.5 17V7C5.5 6.17157 6.17157 5.5 7 5.5ZM15 5.5L17.4394 5.5L8.96967 13.9697L10.0303 15.0303L18.5 6.56072V9.00001H20V4.75C20 4.33579 19.6642 4.00001 19.25 4L15 4L15 5.5Z"
                              fill="currentColor"/>
                      </svg>
                    </Link>
                  </span>
              </p>
              <p className="app-list__item-text-helper">Вид: {service.viewtype.view[0].view_service}</p>
              <p className="app-list__item-text-helper">Тип: {service.viewtype.type[0].type_service}</p>
            </div>
            <div className="app-list__item-col">
              <p className="app-list__item-title">{service.software_registry.producer}</p>
              <p className="app-list__item-text-helper app-list__item-text-helper--icon">с {DateConvert(service.create_date, true)} {service.create_date.split('T')[1].split('.')[0].split(':')[0]}
                :{service.create_date.split('T')[1].split('.')[0].split(':')[1]}</p>
            </div>
            <div className="app-list__item-col is-center">
              <p style={{display: "flex"}} className="app-list__item-row app-list__item-text-helper">
                <span className="app-list__item-text-helper">{service.software_registry.id}</span>
                <span className="app-list__item-icon cb-icon cb-icon__size-24">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 6H4C3.44772 6 3 6.44772 3 7V21C3 21.5523 3.44772 22 4 22H15C15.5523 22 16 21.5523 16 21V18H20C20.5523 18 21 17.5523 21 17V5C21 3.34315 19.6569 2 18 2H9C8.44772 2 8 2.44772 8 3V6ZM9.5 6H13C14.6569 6 16 7.34315 16 9V16.5H19.5V5C19.5 4.17157 18.8284 3.5 18 3.5H9.5V6ZM4.5 20.5V7.5H13C13.8284 7.5 14.5 8.17157 14.5 9V20.5H4.5Z"
                            fill="currentColor"/>
                    </svg>
                  </span>
              </p>
            </div>
            <div className="app-list__item-col is-center">
                <span className="app-list__item-prompt is-active cb-icon cb-icon__size-24">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0B1F33" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.3788 16.5L16.7683 8.65106C16.5861 6.30819 14.6318 4.5 12.2819 4.5H11.7181C9.36818 4.5 7.41389 6.30819 7.23167 8.65105L6.6212 16.5L17.3788 16.5ZM5.73619 8.53474L5.11667 16.5L4 16.5V18L5 18H6.50453H8.12602C8.57006 19.7252 10.1362 21 12 21C13.8638 21 15.4299 19.7252 15.874 18H17.4955H19H20V16.5H18.8833L18.2638 8.53474C18.0208 5.41092 15.4151 3 12.2819 3H11.7181C8.58487 3 5.97915 5.41092 5.73619 8.53474ZM14.292 18L9.70802 18C10.0938 18.883 10.9748 19.5 12 19.5C13.0252 19.5 13.9062 18.883 14.292 18Z"
                          fill="currentColor"/>
                  </svg>
                </span>
            </div>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default AppList;