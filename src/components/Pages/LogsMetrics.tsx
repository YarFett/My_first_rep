import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

interface LogsMetricsShow {
  id:any,
  logs_metrics:any
}

function LogsMetrics(way: LogsMetricsShow)  {
  // let {id, logs_metrics} = useParams()
  const params = useParams()
  const [answer, setAnswer] = useState<string>('')
  useEffect(() => {
    axios.all([axios.get(`services/getlogsmetrics/${way.id}/${way.logs_metrics}/`)])
      .then(axios.spread(function (res_instance) {
        console.log(res_instance.data)
        setAnswer(res_instance.data)
      }))
      .catch(errors => {
        console.log(errors)
      })

  }, [])

  return (
    <>
      <div
        dangerouslySetInnerHTML={{__html: answer}}
      >
      {/*{answer}*/}
      </div>
    </>
  )
}

export default LogsMetrics;