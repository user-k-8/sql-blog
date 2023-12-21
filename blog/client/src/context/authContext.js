// import { createContext, useEffect, useState } from "react";
// export const AuthContext = createContext()
// export const AuthContextProvider = ({children})=>{

// const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))
// const login = async(inputs)=>{

//     const response = await fetch('http://localhost:4000/api/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(inputs)
//     })

//     const data = await response.json()
//     setCurrentUser(data)
// }

// const logout = async()=>{

//     const response = await fetch('http://localhost:4000/api/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })

//     const data = await response.json()
//     setCurrentUser(null)
// }

// useEffect(()=>{
//     localStorage.setItem("user", JSON.stringify(currentUser))
// }, [currentUser])

// return (
//     <AuthContext.Provider value= {{currentUser, login, logout}}>
//         {children}
//     </AuthContext.Provider>
// )
// }