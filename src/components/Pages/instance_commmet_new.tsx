// import '.comments-page.scss'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../new_application/utils";
// import {CommentPage} from "./comment_page";

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


function InstanceComment(props:any) {

  let id_instance = getItemFromLocalStorage('id_instance')
  // let { id, id_check, id_instance } = useParams();
  let errors_api = false
  const [instance, setInstance] = useState<Instance>()
  const [listComments, setListComments] = useState<Comment[]>()
  const [stateInstance, setStateInstance] = useState<string>('')
  const [expert, setExpert] = useState('1')
  const [newComment, setNewComment] = useState<string>()


  useEffect(() => {
    axios.all([axios.get(`checks/expert/${id_instance}/`)])
      .then(axios.spread(function (res_instance) {
        setStateInstance(general_status(res_instance.data.states))
        setListComments(res_instance.data.comments)
        setInstance(res_instance.data)
        console.log(res_instance.data.states)
      }))
      .catch(errors => {
        errors_api = true
        console.log(errors)
      })

  }, [])
  
  
  const handleCloseModal =() => {
    try{
    // props.onUpdate(listCommentsLength)
    window.location.reload()
    props.onClose()
    // localStorage.clear()
  }
    catch(error){console.log(error)}
  }


  const handleSubmitComment = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      "comment": newComment,
      "expert": expert
    }
    const target = event.target as HTMLFormElement
    target.reset()

    axios.post(`checks/expert/${id_instance}/newcomment/`, data)
      .then((response) => {
        setNewComment('');
        listComments?.push(response.data)
      });

  };
 

  // const handleSubmitComment = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target as HTMLFormElement)
  //   formData.append('expert', '1')

  //   axios.post(`checks/expert/${id_instance}/newcomment/`, formData)
  //     .then((response) => {
  //       listComments?.push(response.data)
  //     });
  //   const target = event.target as HTMLFormElement
    
  // };


  return (
    <>
      <div className="order__container container">
        <div className="dialogue__backdrop">&nbsp;</div>
        <div className="dialogue__card">
          <div className="dialogue__card-header">
            <p className="dialogue__card-header-title">{instance?.name}</p>
            <button className="cb-icon cb-icon__size-24" onClick={handleCloseModal} style={{padding: 0, border: "none", backgroundColor: "transparent"}}>
              {/*<span className="cb-icon cb-icon__size-24">*/}
              <svg width="24" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9394 12.9976L4.99805 18.9389L6.0587 19.9996L12.0001 14.0582L17.9414 19.9996L19.0021 18.9389L13.0607 12.9976L19.0015 7.05676L17.9408 5.99609L12.0001 11.9369L6.05927 5.99609L4.99861 7.05676L10.9394 12.9976Z" fill="currentColor"></path>
              </svg>
            {/*</span>*/}
            </button>
          </div>
          <div className="comments-page__item-body">
            <p>{instance?.description}</p>
          </div>
          <div className="dialogue__card-body">
            <div className="comments-page__dialogue">
              <div className="comments-page__dialogue-list">
                <p className="comments-page__dialogue-headline">Комментарии</p>
                {listComments?.map(result => (
                  <div className="comments-page__dialogue-item">
                    <div className="comments-page__dialogue-header">
                      <p className="comments-page__dialogue-title">{result.expert_name}</p>
                    </div>
                    <div className="comments-page__dialogue-body">
                      <time dateTime={result.date} className="comments-page__dialogue-time">
                        {result.date.split('T')[0]} {result.date.split('T')[1].split('.')[0].split(':')[0]}
                        :{result.date.split('T')[1].split('.')[0].split(':')[1]}
                      </time>
                      <p className="comments-page__dialogue-comment">{result.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmitComment} className="comments-page__form">
                <div className="cb-textarea">
                  <label className="cb-textarea__label">Написать комментарий</label>
                  <textarea required name='new_comment' className="cb-textarea__input"
                  onChange={(e) => setNewComment(e.target.value)}></textarea>
                </div>
                <div className="dialogue__card-footer">
                  <button type="submit" className="cb-button">Отправить комментарий </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default InstanceComment;