


import React, { useState, useEffect } from 'react'
import './RecoverAdminLogin.css'
import { useNavigate } from 'react-router-dom';






export interface AdminRecovery {
    title?: String;
}

const adminLogin: AdminRecovery = {
    title: 'Admin Login Recovery'
}







const RecoverAdminLogin: React.FC = () => {
    const [error, setError] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const navigate = useNavigate()







    const adminEmailFormat = (format: string): boolean => {
        const emailFormat = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|co)$/i
        return emailFormat.test(format)
    }




    useEffect(() => {
        const lockEnd = localStorage.getItem('adminRecoveryLockEnd');
        if (lockEnd && Date.now() < Number(lockEnd)) {
            setIsDisabled(true);
            const timeout = Number(lockEnd) - Date.now();
            setTimeout(() => setIsDisabled(false), timeout);
        }
    }, []);
    
    
    
    
    
    
    // Client Side function  Logs client-side errors to the backend , Keeps the UI secure with a generic message.
    const AdminLoginRecoveryClientError = async (error: any) => {
        try {
            await fetch('http://3.15.232.45:3001/admin-email-recover-client-error', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    errorDetails: {
                        message: error?.message || 'Unknown error',
                        stack: error?.stack || '',
                        location: 'RecoverAdminLogin',
                        userInputs: { email }
                    }
                })
            });
        } catch (err) {
            // do nothing — don't break UI if logging fails
        }
    }





    const recoveryAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('') // Clear previous error

        if (!adminEmailFormat(email)) {
            setError('Please enter a valid email address.')
            return
        }

        try {
            const response = await fetch('http://3.15.232.45:3001/email/admin-recover', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email })
            })

            const data = await response.json()

            if (data.lockedUntil) {
                localStorage.setItem('adminRecoveryLockEnd', data.lockedUntil.toString());
                setIsDisabled(true);
                setTimeout(() => setIsDisabled(false), data.lockedUntil - Date.now());
            }

            if (data.success) {
                setError('The Admin Credentials has been sent to the Admin Email we have on file.')
                setTimeout(() => navigate('/admin'), 3000)
            } else {
                setError(data.message)
            }

        } catch (error) {
            setError('There was a problem recovering the admin login.')
            AdminLoginRecoveryClientError(error)
        }
    }





    return (
        <div className='w-screen overflow-hidden p-4 h-screen custom-recovery-admin-login-container '>
            <div className='flex items-center justify-center mx-auto max-w-[800px] p-10'>
                <div className=' sm:text-lg md:text-lg lg:text-3xl xl:text-3xl font-sans '><h3>{adminLogin.title}</h3></div>
            </div>

            <div className='flex flex-col items-center justify-center mx-auto max-w-[800px] text-center mt-[10px]'>
                <form onSubmit={recoveryAdminLogin}>
                    <div className='text-yellow-500 font-sans sm:text-lg md:text-lg lg:text-xl xl:text-xl '>
                        <label>Enter Email on File</label>
                    </div>

                    <div className='m-10'>
                        <input className='text-center xl:w-[80%] p-3 border-4 border-black border-solid focus:border-none'
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isDisabled}
                            type='email'
                            value={email}
                            placeholder='Enter Admin Email'
                            required />
                    </div>

                    <div className='m-10   xl:w-[79%] cursor-pointer bg-yellow-500 border-none outline-none p-2 font-sans hover:bg-green-500 hover:text-white'>
                        <button disabled={isDisabled} type='submit'>Submit</button>
                    </div>

                    {error && (   <div className="text-red-600 font-bold text-lg mt-4"><span>{error}</span></div> )}
                </form>




            </div>
        </div>
    )
}



export default RecoverAdminLogin
