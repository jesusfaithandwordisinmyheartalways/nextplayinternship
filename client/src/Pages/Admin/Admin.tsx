



import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AdminLoginStatusContext } from '../../Context/LoginStatusProvider';
import './Admin.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';





export interface Header {
  header?: string;
}


const AdminHeader: Header = {
  header: 'Next Play Nation Admin Login'
}






const Admin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [hoveredLink, setHoveredLink] = useState<HTMLInputElement | null>(null);
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [passwordText, setPasswordText] = useState<string>("");
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const adminRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { login } = useContext(AdminLoginStatusContext)



  

  const usernameFormat = (login: string): boolean => {
    const adminUsername = /^(?=.*[A-Z])(?=.*[^\w\s<>()[\]^]).{8,15}$/;
    return adminUsername.test(login);
  }

  const passwordFormat = (password: string): boolean => {
    const adminPassword = /^(?=.*[A-Z])(?=.*[^\w\s<>()[\]^]).{8,15}$/;
    return adminPassword.test(password);
  }







  const adminLogClientError = async (error: unknown, context: string) => {
    try {
      await fetch('http://3.15.232.45:3001/admin-client-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  message: String(error), context, timeStamp: new Date().toISOString() })
      });
    } catch (err) {
    }
  };








  const adminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameFormat(username)) {
      setErrorMessage('Admin Username requirements: (?=.*[A-Z]) → at least one uppercase letter, {8,15} → total length between 8 and 15 characters, (?=.*[^\w\s<>()[\]^]) → at least one special character that is not a word character, whitespace, or any of the forbidden: < > ( ) [ ] ^ ');
      return;
    }

    if (!passwordFormat(password)) {
      setErrorMessage('Admin Password requirements: (?=.*[A-Z]) → at least one uppercase letter, {8,15} → total length between 8 and 15 characters, (?=.*[^\w\s<>()[\]^]) → at least one special character that is not a word character, whitespace, or any of the forbidden: < > ( ) [ ] ^ ');
      return;
    }



    setButtonSpinner(true);

    try {
      const response = await fetch('http://3.15.232.45:3001/admin/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, email })
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        window.location.href = '/admin-dashboard'
        login(); // from context
        setButtonSpinner(false)
      } else {
        setErrorMessage(data.message);
        setButtonSpinner(false);
      }
  
    } catch (error) {
      await adminLogClientError(error, 'adminLogin');
      setErrorMessage('Something went wrong. Please try again later.');
      setButtonSpinner(false);
    }
    
  }













  
  useEffect(() => {
    if (adminRef.current) {
      adminRef.current.focus();
    }
  }, []);










  return (
    <>
      <div className='w-screen overflow-hidden p-4 h-screen custom-admin-login-container '>
        <div className='flex items-center justify-center mx-auto max-w-[800px]'>


          <div className='text-black sm:text-xl  md:text-xl lg:text-4xl xl:text-4xl font-sans animate-header'>
            <h3>{AdminHeader.header}</h3>
          </div>
        </div>



        <div className='flex items-center justify-center m-9 mx-auto max-w-[800px] text-center '>
          <form onSubmit={adminLogin}>
            <div className='animate-input1'>
              <label htmlFor='username'>Admin UserName</label>
              <div>
                <input
                  className='text-center p-1 w-[90%]  border-4 border-solid border-black focus:border-none'
                  onChange={(e) => setUsername(e.target.value)}
                  ref={adminRef}
                  type='text'
                  value={username}
                  placeholder='Username'
                  required
                />
              </div>
            </div>

            <div className="relative w-[90%] mx-auto mt-2 animate-input2">
              <label htmlFor='password'>Admin Password</label>
              <input
                className="text-center w-full p-1 border-4 border-solid border-black focus:border-none"
                onChange={(e) => setPassword(e.target.value)}
                type={passwordIcon ? "text" : "password"}
                value={password}
                placeholder="Password"
                required
              />

              <span
                className="absolute top-2 right-2 cursor-pointer z-10"
                onClick={() => setPasswordIcon(!passwordIcon)}
                onMouseEnter={() => setPasswordText(passwordIcon ? "Show Password" : "Hide Password")}
                onMouseLeave={() => setPasswordText("")}
              >
                <div className="icon-password">{passwordIcon ? <EyeOff /> : <Eye />}</div>
              </span>

              {passwordText && (
                <span className="tooltip">{passwordText}</span>
              )}
            </div>

            <div className='animate-input3'>
              <label htmlFor='email'>Admin Email</label>
              <div>
                <input
                  className='text-center p-1 w-[90%] border-4 border-solid border-black focus:border-none'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder='Email'
                  type='email'
                  required
                />
              </div>
            </div>

            <div className='animate-button'>
              <button
                className='bg-black w-[90%] text-white text-lg p-2 border-none outline-none cursor-pointer hover:bg-green-500'
                type='submit'
              >
                {buttonSpinner ? (
                  <span className="spinner"></span>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>

            <div>{errormessage && (<span>{errormessage}</span>)}</div>



            <Link to="/admin-login-forgot">
                <div className=' relative top-[50px] left-[-110px] cursor-pointer hover:text-green-500 text-md font-sans text-blue-800 custom-forgot-admin-password '>
                  <span>Forgot Admin Credentials ?</span></div>
            </Link>






          </form>
        </div>




      </div>
    </>
  );
}





export default Admin;