import PageHeader from "../page-header/page-header";
import { SearchProvider } from "../context_for_search";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FormData from "form-data";
import { number } from "prop-types";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

interface Instance {
  id: number,
  name: string,
  description: string,
}

interface Comment {
  comment: string,
  expert: number,
  expert_name: string
  date: string,
}

function general_status(list_instance: string[]) {
  if (list_instance.length == 0) {
    return 'Не началась'
  }
  else if (list_instance.every((x) => x === 'Пройдена')) {
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

function InstanceCard() {
  let { id, id_check, id_instance } = useParams();
  let errors_api = false
  const [instance, setInstance] = useState<Instance>()
  const [listComments, setListComments] = useState<Comment[]>()
  const [stateInstance, setStateInstance] = useState<string>('')
  const [expert, setExpert] = useState('1')
  const [newStateInstance, setNewStateInstance] = useState<number>()
  const [newComment, setNewComment] = useState<string>()
  useEffect(() => {
    axios.all([axios.get(`checks/expert/${id_instance}/`)])
      .then(axios.spread(function (res_instance) {
        setStateInstance(general_status(res_instance.data.states))
        // console.log(res_instance.data.comments)
        setListComments(res_instance.data.comments)
        setInstance(res_instance.data)
        console.log(res_instance.data)


        // setServiceCard(res_service.data)
      }))
      .catch(errors => {
        errors_api = true
        console.log(errors)
      })
    console.log(id_instance)
  }, [])
  // console.log(listComments)
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //
  //   fetch(`checks/expert/${id_instance}/check/`, {
  //     method: 'POST',
  //     body: formData
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setstateInstance(result);
  //     });
  // };
  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const data = {
  //     "check_status": newStateInstance,
  //     "expert": expert
  //   }
  //   const target = event.target as HTMLFormElement
  //   target.reset()
  //   // const formData = new FormData(target)
  //   // console.log(target.getAttribute('input'))
  //   // const target = event.target as HTMLFormElement;
  //   // console.log(target.value)
  //
  //   // const formData = new FormData(target);
  //   // console.log(formData);
  //   //
  //   axios.post(`checks/expert/${id_instance}/check/`, data)
  //     .then((response) => {
  //       if (newStateInstance === 4) {
  //         setStateInstance('Пройдена')
  //       } else {
  //         setStateInstance('Началась')
  //       }
  //     });
  // };

  const handleState = (event: number) => {
    const data = {
      "check_status": event,
      "expert": expert
    }
    // const target = event.target as HTMLFormElement
    // target.reset()
    axios.post(`checks/expert/${id_instance}/check/`, data)
      .then((response) => {
        if (event === 4) {
          setStateInstance('Пройдена')
        } else {
          setStateInstance('Началась')
        }
      });
  };

  const handleSubmitComment = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      "comment": newComment,
      "expert": expert
    }
    const target = event.target as HTMLFormElement
    target.reset()
    // console.log(data)
    // const form = event.target as HTMLFormElement;
    // const formData = new FormData(form)
    // console.log(formData.get('new_comment') as string)

    axios.post(`checks/expert/${id_instance}/newcomment/`, data)
      .then((response) => {
        setNewComment('');
        listComments?.push(response.data)
      });
  };

  return (
    <>
      <SearchProvider>
        <PageHeader />
      </SearchProvider>
      <main className="page-main">
        <div className="order__container container">
          <div className="order__header">
            <Link className="order__link-back" to={"../services/service/" + id + "/list_of_checks/" + id_check + "/"}>Назад</Link>
          </div>
          <div className="dialogue__card-header">
            <h1 className="dialogue__card-header-title">{instance?.name}</h1>
            <div>{stateInstance}</div>
            {/*<span className="cb-icon cb-icon__size-24">*/}
            {/*  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*    <path fill-rule="evenodd" clip-rule="evenodd"*/}
            {/*      d="M10.9394 12.9976L4.99805 18.9389L6.0587 19.9996L12.0001 14.0582L17.9414 19.9996L19.0021 18.9389L13.0607 12.9976L19.0015 7.05676L17.9408 5.99609L12.0001 11.9369L6.05927 5.99609L4.99861 7.05676L10.9394 12.9976Z"*/}
            {/*      fill="currentColor" />*/}
            {/*  </svg>*/}
            {/*</span>*/}
          </div>
          <div className="dialogue__card-body">
            <div className="comments-page__dialogue">
              <p className="comments-page__dialogue-text">{instance?.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="cb-button" type="submit" onClick={() => handleState(4)}>Принять</button>
                <button className="cb-button" type="submit" onClick={() => handleState(3)}>Отклонить</button>
              </div>
              {/*<form onSubmit={handleSubmit}>*/}
              {/*  /!*<input name='expert'/>*!/*/}
              {/*  <button className="cb-button" value='Принять' type="submit">Принять</button>*/}
              {/*  <button className="cb-button" value="Отклонить" type="submit">Отклонить</button>*/}
              {/*  /!*<div>*!/*/}
              {/*  /!*  <label className="comments-page__item-label-radio">*!/*/}
              {/*  /!*    <input onClick={() => setNewStateInstance(4)} className="comments-page__item-input-radio" value={4} name={"check_status"} type="radio" />*!/*/}
              {/*  /!*    <span>Принять</span>*!/*/}
              {/*  /!*  </label>*!/*/}
              {/*  /!*  <label className="comments-page__item-label-radio">*!/*/}
              {/*  /!*    <input onClick={() => setNewStateInstance(3)} className="comments-page__item-input-radio" value={3} name={"check_status"} type="radio" />*!/*/}
              {/*  /!*    <span>Отклонить</span>*!/*/}
              {/*  /!*  </label>*!/*/}
              {/*  /!*</div>*!/*/}
              {/*  /!*<button className="cb-button" type="submit">Изменить статус проверки</button>*!/*/}
              {/*</form>*/}
              {/*<form onSubmit={handleSubmit}>*/}
              {/*  /!*<input name='expert'/>*!/*/}
              {/*  <div>*/}
              {/*    <label className="comments-page__item-label-radio">*/}
              {/*      <input onClick={() => setNewStateInstance(4)} className="comments-page__item-input-radio" value={4} name={"check_status"} type="radio" />*/}
              {/*      <span>Принять</span>*/}
              {/*    </label>*/}
              {/*    <label className="comments-page__item-label-radio">*/}
              {/*      <input onClick={() => setNewStateInstance(3)} className="comments-page__item-input-radio" value={3} name={"check_status"} type="radio" />*/}
              {/*      <span>Отклонить</span>*/}
              {/*    </label>*/}
              {/*  </div>*/}
              {/*  <button className="cb-button" type="submit">Изменить статус проверки</button>*/}
              {/*</form>*/}
            </div>
          </div>
          <div className="dialogue__card-footer">
            <div className="comments-page__dialogue-list">
              <p className="comments-page__dialogue-headline">Комментарии</p>
              {listComments?.map(result => (
                <div className="comments-page__dialogue-item">
                  <div className="comments-page__dialogue-header">
                    <p className="comments-page__dialogue-title">{result.expert_name}</p>
                    {/*<a href="" className="comments-page__dialogue-link">Удалить</a>*/}
                  </div>
                  <div className="comments-page__dialogue-body">
                    <time dateTime={result.date} className="comments-page__dialogue-time">
                      {result.date.split('T')[0]} {result.date.split('T')[1].split('.')[0].split(':')[0]}
                      :{result.date.split('T')[1].split('.')[0].split(':')[1]}
                    </time>
                    <p style={{wordBreak: "break-word"}} className="comments-page__dialogue-comment">{result.comment}</p>
                    {/*<a href="" className="comments-page__dialogue-link">Убрать из протокола</a>*/}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmitComment} className="comments-page__form">
              <div className="cb-textarea">
                <label className="cb-textarea__label">Написать комментарий</label>
                <textarea
                  required
                  onChange={(e) => setNewComment(e.target.value)}
                  name='new_comment'
                  className="cb-textarea__input"></textarea>
              </div>
              <button type="submit" className="cb-button">Сохранить комментарий</button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default InstanceCard