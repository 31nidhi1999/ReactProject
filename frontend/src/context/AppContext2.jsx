import { createContext } from "react";
import { hospitals } from "../assets/assets";
export const AppContext2=createContext()
const AppContext2Provider = (props)=>{
    const value={
        hospitals
    }
    return(
        <AppContext2.Provider value={value}>
            {props.children}
        </AppContext2.Provider>
    )
}

export default AppContext2Provider