import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const SearchContext = createContext<any | undefined>(undefined)

export const SearchProvider = ({ children }: any) => {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(`services/service/?search=`)
      .then(response => {setData(response.data)
        // console.log(response.data)
      })
      .catch(error => console.log('Вот твоя ошибка', error))
  }, []);

  return (
    <SearchContext.Provider value={[data, setData]}>
      {children}
    </SearchContext.Provider>
  )

}