// import '.comments-page.scss'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import InstanceComment from "../Pages/instance_commmet_new";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../new_application/utils";
import axios from "axios";
import { number } from "prop-types";
import {renderToString} from "react-dom/server";
import DateConvert from "../general/date";

interface Instance {
  root_id?: string,
  service?: number,
  id?: number,
  title: string,
  description?: string,
  status?: string[],
  comments?: Comment[],
  ShowParams?: any
}

interface Comment {
  id: number,
  comment: string,
  expert: number,
  expert_name: string
  date: string,
  in_protocol: boolean,
}

function general_status(list_instance: string[]): string {
  if (list_instance.length == 0) {
    return 'Не началась'
  }
  else if (list_instance.every((x) => x === 'Пройдена')) {
    return 'Пройдена'
  }
  else if (list_instance.every((x) => x === 'Соответствует')) {
    return 'Пройдена'
  }
  else if (list_instance.every((x) => x === 'Не начато')) {
    return 'Не началась'
  }
  else if (list_instance.every((x) => x === 'Не назначено (1)')) {
    return 'Не началась'
  }
  else if (list_instance.every((x) => x === 'Не назначено (4)')) {
    return 'Не началась'
  }
  else {
    return 'Началась'
  }
}

export class InstanceElem extends React.Component<Instance>{

  state = {
    modalIsOpen: false,
    StateInstance: number || 0,
    commentsLength: this.props.comments ? this.props.comments.length : 0,
    listComment: this.props.comments || [],
    lastComment: this.props.comments ? this.props.comments[this.props.comments.length - 1] : undefined,
    // showParams: false,
  }

  // toggleText = () => {
  //   this.setState(prevState => ({
  //     showParams: !prevState.showParams
  //   }));
  // };

  openModal = () => {
    this.setState({ modalIsOpen: true });
    document.body.style.overflow = 'hidden'
    // var elem_header = document.getElementsByTagName('header')
    // elem_header[0].style.zIndex = '0'
    // var elem = document.getElementsByClassName('comments-page__header')
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    document.body.style.overflow = 'scroll'
    // var elem_header = document.getElementsByTagName('header')
    // elem_header[0].style.zIndex = '1'
  }

  render() {

    let newListComment: Comment[] = this.props.comments || []

    let changeStatus = true
    if (this.props.root_id === '3') {
      changeStatus = false
    }
    let aggregate_status = general_status(this.props.status || [])
    let classStatus = 'comments-page__item'
    if (aggregate_status === 'Пройдена') {
      classStatus += ' is-ok'
    }
    else if (aggregate_status !== 'Не началась') {
      classStatus += ' is-error'
    }
    // let lastComment = this.props.comments[this.props.comments.length - 1]

    const ChangeState = (status: number) => {
      if (status === 4) {
        const elem = document.getElementsByClassName(String(this.props.id))
        elem[0].classList.remove('is-error')
        elem[0].classList.add('is-ok')
      }
      else {
        const elem = document.getElementsByClassName(String(this.props.id))
        elem[0].classList.remove('is-ok')
        elem[0].classList.add('is-error')
      }
    }

    const AddProtocol = (event: boolean, id_comment: number, index_comment: number) => {

      axios.patch(`checks/expert/${id_comment}/upcomment/`, { "in_protocol": event })
        .then((response) => {
          var NewList = [...this.state.listComment]
          NewList[index_comment].in_protocol = response.data.in_protocol
          this.setState({ listComment: NewList });
        })
    }

    const handleSubmitComment = (event: React.FormEvent) => {
      event.preventDefault();

      const data = new FormData(event.target as HTMLFormElement)
      data.append('expert', '1')

      axios.post(`checks/expert/${this.props.id}/newcomment/`, data)
        .then((response) => {
          this.setState({ lastComment: response.data })
          // lastComment = response.data
          this.state.commentsLength += 1
          var newList = [...this.state.listComment]
          newList.push(response.data)
          console.log(newList)
          this.setState({ listComment: newList })

        });

      const target = event.target as HTMLFormElement
      target.reset()

    };

    return (
      <>
        <div className={this.props.id + ' ' + classStatus}>
          <div className="comments-page__item-col">
            <span className="comments-page__item-status"></span>
          </div>
          <div className="comments-page__item-col">
            <div className="comments-page__item-header">
              <p className="comments-page__item-title">{this.props.title}</p>
              {/*<div className="comments-page__item-chat">*/}
              {/*  <span className="cb-icon cb-icon__size-24">*/}
              {/*    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
              {/*      <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12.4893H6.64618L6.32966 12.6474L3.5 14.061L3.5 5C3.5 4.17157 4.17157 3.5 5 3.5L15 3.5C15.8284 3.5 16.5 4.17157 16.5 5V10.9893C16.5 11.8177 15.8284 12.4893 15 12.4893L7 12.4893ZM7.5 13.9893L7.5 16.9857C7.5 17.8141 8.17157 18.4857 9 18.4857L17 18.4857H17.3773L17.7097 18.6642L20.5 20.1627V10.9955C20.5 10.1671 19.8284 9.49554 19 9.49554H18V10.9893C18 12.6461 16.6569 13.9893 15 13.9893L7.5 13.9893ZM18 7.99554V5C18 3.34315 16.6569 2 15 2H5C3.34315 2 2 3.34314 2 5L2 14.8697C2 15.6129 2.78202 16.0964 3.4469 15.7642L6 14.4888V16.9857C6 18.6426 7.34315 19.9857 9 19.9857L17 19.9857L20.5269 21.8797C21.1931 22.2375 22 21.7549 22 20.9987V10.9955C22 9.33869 20.6569 7.99554 19 7.99554H18Z" fill="currentColor"/>*/}
              {/*    </svg>*/}
              {/*  </span>*/}
              {/*</div>*/}
            </div>
            <div className="comments-page__item-body">
              <p>{this.props.description}</p>
            </div>
            {changeStatus && (
              <div className="comments-page__item-row is-action">
                <label className='label_radio'>
                  <input id={String(this.props.id) + '_Принять'} name={String(this.props.id)} value={4} type="radio"
                         onChange={() => ChangeState(4)} className='input_radio' />
                  <span>Принять</span>
                </label>
                <label className='label_radio'>
                  <input id={String(this.props.id) + '_Отклонить'} name={String(this.props.id)} value={3} type="radio"
                         onChange={() => ChangeState(3)} className='input_radio' />
                  <span>Отклонить</span>
                </label>
              </div>
            )}
            {this.props.root_id !== '3' && (
            <ul style={{ margin: 0, padding: 0 }} className="comments-page__comment">
              <div className="comments-page__comment-header">
                <p className="comments-page__comment-label">Комментарий</p>
                <span className="comments-page__comment-value">{this.state.commentsLength}</span>
              </div>

              {this.state.lastComment &&
                <li style={{ margin: 0 }} className="comments-page__comment-body">
                  <div className="comments-page__comment-row">
                    <p className="comments-page__comment-author">{this.state.lastComment.expert_name}</p>
                    <time dateTime={this.state.lastComment.date} className="comments-page__comment-time">
                      {DateConvert(this.state.lastComment.date, false)} {this.state.lastComment.date.split('T')[1].split('.')[0].split(':')[0]}
                      :{this.state.lastComment.date.split('T')[1].split('.')[0].split(':')[1]}
                    </time>
                  </div>
                  <p style={{ wordBreak: "break-word" }} className="comments-page__comment-text">{this.state.lastComment.comment}</p>
                </li>
              }
            </ul>
            )}
            {this.props.root_id !== '3' && (
            <div className="comments-page__item-row">
              <a id={String(this.props.id) + '_Comments'} className="constructor__description-link" onClick={this.openModal}>Посмотреть комментарии</a>
              <Modal className="modal" isOpen={this.state.modalIsOpen} >
                <div className="order__container container">
                  <div className="dialogue__backdrop">&nbsp;</div>
                  <div className="dialogue__card">
                    <div className="dialogue__card-header">
                      <p className="dialogue__card-header-title">{this.props.title}</p>
                      <button id='close' className="cb-icon cb-icon__size-24" onClick={this.closeModal} style={{padding: 0, border: "none", backgroundColor: "transparent"}}>
                      {/*<button className="cb-icon cb-icon__size-24" onClick={handleCloseModal} style={{padding: 0, border: "none", backgroundColor: "transparent"}}>*/}
                        {/*<span className="cb-icon cb-icon__size-24">*/}
                        <svg width="24" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9394 12.9976L4.99805 18.9389L6.0587 19.9996L12.0001 14.0582L17.9414 19.9996L19.0021 18.9389L13.0607 12.9976L19.0015 7.05676L17.9408 5.99609L12.0001 11.9369L6.05927 5.99609L4.99861 7.05676L10.9394 12.9976Z" fill="currentColor"></path>
                        </svg>
                        {/*</span>*/}
                      </button>
                    </div>
                    <div className="dialogue__card-body">
                      <p className="comments-page__item-body">
                        {this.props.description}
                      </p>
                      <div className="comments-page__dialogue">
                        <ul style={{margin: 0, padding: 0}} className="comments-page__dialogue-list">
                          <h3 className="comments-page__dialogue-headline">Комментарии</h3>
                          {this.state.listComment.map((value, index, array) => (
                            <li id={String(value.id)} className=" comments-page__dialogue-item" style={{display: "block"}}>
                              <div className="comments-page__dialogue-header" style={{marginBottom: '8px'}}>
                                <p className="comments-page__dialogue-title">{value.expert_name}</p>
                              </div>
                              <div className="comments-page__dialogue-body">
                                <time dateTime={value.date} className="comments-page__dialogue-time">
                                  {DateConvert(value.date, false)} {value.date.split('T')[1].split('.')[0].split(':')[0]}
                                  :{value.date.split('T')[1].split('.')[0].split(':')[1]}
                                </time>
                                <p style={{ wordBreak: "break-word" }} className="comments-page__dialogue-comment">{value.comment}</p>
                              </div>
                              {value.in_protocol ? (
                                <button id={String(value.id) + '_DeleteFromProtocol'} style={{
                                  border: 'none', backgroundColor: 'transparent', marginTop: '8px', padding: 0, color: '#0D4CD3'
                                }} onClick={() => AddProtocol(false, value.id, index)}>
                                  Удалить из протокола
                                </button>
                              ) : (
                                <button id={String(value.id) + '_AddToProtocol'} style={{
                                  border: 'none', backgroundColor: 'transparent', marginTop: '8px', padding: 0, color: '#0D4CD3'
                                }} onClick={() => AddProtocol(true, value.id, index)}>
                                  Добавить в протокол
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                        <form onSubmit={handleSubmitComment} className="comments-page__form">
                          <div className="cb-textarea">
                            <label className="cb-textarea__label">Комментарий</label>
                            <textarea required id='textarea' name='comment'
                                      // name='new_comment'
                                      className="cb-textarea__input" placeholder={'Введите комментарий...'}
                                      // onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                          </div>
                          <div style={{width: '100%'}} className="dialogue__card-footer"></div>
                          <button id='SendComment' type="submit" className="cb-button">Отправить комментарий</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/*<InstanceComment listComment={this.props.comments} onClose={this.closeModal}*/}
                {/*//  onUpdate={this.handleUpdate}*/}
                {/* />*/}
              </Modal>
              {/*<Link to={"../services/service/" + this.props.service + "/list_of_checks/" + this.props.root_id +*/}
              {/*  "/instance/" + this.props.id + "/"} className="constructor__description-link">Подробнее</Link>*/}
            </div>
            )}
          </div>
          {/*<CommentPage isShow={true} hide={}/>*/}
        </div>
      </>
    );
  }
}

export default general_status;