


import React, {useState, useRef, useEffect }from 'react'
import { useNavigate } from "react-router-dom";
import './GeneralInquiries.css'








const GeneralInquiries:React.FC = () => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [telephone, setTelePhone] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const maxLength = 300
    const [textMessage, setTextMessage] = useState('')
    const [errormessage, setErrorMessage] = useState('')
    const [buttonSpinner, setButtonSpinner] = useState(false) // Add state for button spinner
    const [verfication, setVerfication] = useState() // state for character verification
    const navigate = useNavigate()
    const contactInputRef = useRef<HTMLInputElement | null>(null)



    const contactPhoneFormat = (contactTelePhone:string):boolean => {
        const phoneFormat = /^(\d{3,4}-\d{3}-\d{4})$/;
        return phoneFormat.test(contactTelePhone)
    }







     // Client Side function  Logs client-side errors to the backend , Keeps the UI secure with a generic message.
     const GeneralInquiryClientError = async (error: any) => {
        try {
            await fetch('http://localhost:3001/inquiries-client-error', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    errorDetails: {
                        message: error?.message || 'Unknown error',
                        stack: error?.stack || '',
                        location: 'GeneralInquiries',
                        userInputs: { name, lastName, telephone, emailAddress }
                    }
                })
            });
        } catch (err) {
        }
    };







    const contactUSForm = async(e:React.FormEvent) => {
        e.preventDefault()
        
        if(!contactPhoneFormat(telephone)) {
            setErrorMessage('Invalid phone number. Format: 123-456-7890 or 1800-123-4568')
            return;
        }

        if(textMessage.length === 0) {
            alert('please enter enter your message')
            return;
        }

        setButtonSpinner(true)

        try {
            const response = await fetch('http://localhost:3001/contact/inquiries', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name, lastName, telephone, textMessage, emailAddress })
            })
            const data = await response.json()
            if(data.success) {
                setErrorMessage(data.message)
                setTimeout(() => {
                    navigate('/success-contact')
                    setButtonSpinner(false)
                }, 3000)
            } else {
                    setErrorMessage(data.message)
                    setButtonSpinner(false)
                }
        }catch(error) {
            setErrorMessage('Error has occurred, please check your network');
            setButtonSpinner(false);
            GeneralInquiryClientError(error);
        }
    }





    useEffect(() => {
        if(contactInputRef.current) {
            contactInputRef.current.focus()
        }
    }, [])








  return (
    <>
        <div className=' w-screen overflow-hidden p-4 h-screen custom-general-container '>
            <div className=' flex items-center justify-center mx-auto max-w-[800px]'>
                <div className=' sm:text-lg md:text-xl lg:text-3xl xl:text-4xl  font-sans '><h3>Contact Next Play Nation</h3></div>
            </div>



            <div className=' flex items-center justify-center mx-auto max-w-[800px] p-3 text-center'>
                <form onSubmit={contactUSForm}>
                    <div>
                        <label className=' sm:text-lg md:text-lg lg:text-xl xl:text-xl font-mono' htmlFor='first name' >First Name</label>
                        <div><input className='text-center w-[60%] border-4 border-solid border-black focus:border-none' 
                        onChange={(e) => setName(e.target.value)} ref={contactInputRef} type='text' value={name}
                         placeholder='first name' required/></div>
                    </div>

                    <div>
                        <label className=' sm:text-lg md:text-lg lg:text-xl xl:text-xl font-mono' htmlFor='last name' >Last Name</label>
                        <div><input className='text-center w-[60%] border-4 border-solid border-black focus:border-none' 
                         onChange={(e) => setLastName(e.target.value)} type='text' value={lastName}
                          placeholder='last name' required/></div>
                    </div>

                    <div>
                        <label className=' sm:text-lg md:text-lg lg:text-xl xl:text-xl font-mono' htmlFor='contact number'>Contact Number</label>
                        <div> <input className='text-center w-[60%] border-4 border-solid border-black focus:border-none' 
                         onChange={(e) => setTelePhone(e.target.value)} value={telephone}
                         placeholder='123-456-7890 or 1800-123-4568' required  />
                        </div>
                    </div>


                    <div>
                        <label className=' sm:text-lg md:text-lg lg:text-xl xl:text-xl font-mono'  htmlFor='email' >Email</label>
                        <div>
                            <input className='text-center w-[60%] border-4 border-solid border-black focus:border-none' 
                            onChange={(e) => setEmailAddress(e.target.value)} value={emailAddress} placeholder='email' 
                            type='email' required></input></div>
                    </div>

                    


                    <div>
                    <label className=' sm:text-lg md:text-lg lg:text-xl xl:text-xl font-mono' htmlFor='message' >Message to Our Team</label>
                      <div>
                        <textarea className='text-center w-[60%] border-solid border-black border-4 resize-none focus:border-none' 
                        onChange={(e) => setTextMessage(e.target.value)} maxLength={maxLength} cols={90} rows={3} 
                        value={textMessage} placeholder='message' required/></div>

                    </div>
                    

                    <div>
                        <button className='bg-black w-[40%] text-white text-lg p-3 border-none outline-none cursor-pointer hover:bg-green-500' 
                            type='submit'>
                            {buttonSpinner ? (
                                <span className="spinner"></span>
                            ) : (
                                <span>Contact Us</span>
                            )}
                        </button>
                    </div>


                    <div>{errormessage && (<span>{errormessage}</span>)}</div>





                </form>
            </div>







        </div>
    
    
    
    
    </>
  )
}

export default GeneralInquiries
