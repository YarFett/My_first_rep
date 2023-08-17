import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Url } from "url"

export const NewAppContext = createContext<any | undefined>(undefined)


export const NewAppProvider = ({ children }:any) => {
    const [data, setData] = useState([]);

    
    return (
        <NewAppContext.Provider value={[ data, setData ]}>
          {children}
        </NewAppContext.Provider>
      )
    }