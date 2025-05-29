


// to track admin login status.
import React, {createContext, useState, useEffect} from 'react'




export const AdminLoginStatusContext = createContext<any>(null)





const LoginStatusProvider:React.FC<{ children: React.ReactNode}> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [justLoggedIn, setJustLoggedIn] = useState<boolean>(false);
  




  useEffect(() => {
    const isAdminStored = localStorage.getItem('isAdmin');
    setIsAdmin(isAdminStored === 'true');
  }, []);




const login = (): void => {
  setIsAdmin(true);
  setJustLoggedIn(true); 
  localStorage.setItem('isAdmin', "true");
  sessionStorage.setItem('isAdmin', "true");
  
};




const logout = (): void => {
  setIsAdmin(false);
  setJustLoggedIn(false); 
  localStorage.removeItem('isAdmin');
  sessionStorage.removeItem('isAdmin');
};




  return (
    <>
      <AdminLoginStatusContext.Provider value={{ isAdmin, setIsAdmin, login, logout, justLoggedIn, setJustLoggedIn  }}>
            {children}
      </AdminLoginStatusContext.Provider>
    
    
    
    </>
  )
}





export default LoginStatusProvider
