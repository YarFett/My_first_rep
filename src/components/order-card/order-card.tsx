import './order-card.scss'
import React from "react";
import {Link} from "react-router-dom";

interface OrderCardProps {
  id_service: number;
  id_stage: number;
  title: string;
  state: string;
  experts: string[];
  comments: number;
}

class OrderCardMain extends React.Component<{ experts: string[], comments: number }> {
  render() {
    let showExperts = false
    let showComment = false

    if (this.props.comments > 0) {
      showComment = true
    }

    if (this.props.experts.length > 0) {
      showExperts = true
    }

    return (
      <div className="cb-card__main">
        {showExperts &&
          <div className="cb-card__item">
            <h3 className="cb-card__data">Эксперты</h3>
            {this.props.experts.map(expert => (
              <p className="cb-card__data-value">{expert}</p>
            ))}
          </div>}
        {showComment &&
          <div className="cb-card__item">
            <p className="cb-card__data">Всего {this.props.comments} комментариев</p>
          </div>}
      </div>
    );
  }
}

export class OrderCard extends React.Component<OrderCardProps> {

  render() {

    let showStatusComment = false
    let showMain = false
    let showIcon = true


    let className = "cb-card";
    if (this.props.state === 'Пройдена') {
      className += ' is-ok';
      showIcon = true
      showMain = true
    } else if (this.props.state === 'Началась') {
      className += ' is-info';
      showStatusComment = true
      showIcon = true
      showMain = true
    } else {
      className += ' is-default';
    }

    return (
      <>
        <div className={className}>
          <div className="cb-card__header">
            <p className="cb-card__headline">{this.props.title}</p>
            {showIcon &&
              <div className="cb-card__group-icon">
                <Link id={String(this.props.id_stage) + '_stage'} className="cb-card__btn cb-card__btn--link"
                      to={"../services/service/" + this.props.id_service + "/list_of_checks/" + this.props.id_stage + "/"}>
                  <span className="cb-icon cb-icon-round cb-icon__size-24">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="#E4ECFD" />
                      <path
                        d="M8.51725 10.5036C8.23826 10.2252 7.78666 10.2251 7.50757 10.5034C7.22745 10.7826 7.22731 11.2363 7.50726 11.5157L11.2936 15.2949C11.6839 15.6845 12.3161 15.6845 12.7064 15.2949L16.4927 11.5157C16.7727 11.2363 16.7725 10.7826 16.4924 10.5034C16.2133 10.2251 15.7617 10.2252 15.4828 10.5036L12 13.9781L8.51725 10.5036Z"
                        fill="#0D4CD3" />
                    </svg>
                  </span>
                </Link>
              </div>}
          </div>
          <div className="cb-card__status">
            <p className="cb-card__status-title">{this.props.state}</p>
            {showStatusComment && <p className="cb-card__status-subtitle">По готовности придет уведомление</p>}
          </div>
          {showMain && <OrderCardMain experts={this.props.experts} comments={this.props.comments} />}
        </div>
      </>
    )
  }
}
