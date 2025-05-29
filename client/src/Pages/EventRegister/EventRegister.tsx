





import React, { useState , useEffect, useRef} from 'react'
import './EventRegister.css'
import { useNavigate } from "react-router-dom";







 // Client Side function  Logs client-side errors to the backend , Keeps the UI secure with a generic message.
 const EventClientError = async (errorDetails: any) => {
    try {
      await fetch("http://localhost:3001/event-register-client-side-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ errorDetails }),
      });
    } catch (error) {
     
    }
  };







const EventRegister:React.FC = () => {
         const [name, setName] = useState('')
        const [email, setEmail] = useState('')
        const [phoneNumber, setPhoneNumber] = useState('')
        const [textMessage, setTextMessage] = useState('')
        const maxLength = 240
        const [errorMsg, setErrorMsg] = useState('')
        const [buttonSpinner, setButtonSpinner] = useState(false) // Add state for button spinner
        const [eventSelect, setEventSelect] = useState('') // state for select event
        const navigate = useNavigate()
        const nameInputRef = useRef<HTMLInputElement | null>(null)
        
    
    


        const phoneNumberFormat = (number:string):boolean => {
            const numberFormat = /^(\d{3,4}-\d{3}-\d{4})$/;
            return numberFormat.test(number)
        }


    

               







        const clientRegisterEvent = async(e:React.FormEvent) => {
                e.preventDefault()

                if(!phoneNumberFormat(phoneNumber)){
                    setErrorMsg('Invalid phone number. Format: 123-456-7890 or 1800-123-4568')
                    return;
                }

                if(textMessage.length === 0) {
                    alert('please enter enter your message')
                    return;
                }

                if(!eventSelect) {
                    alert('please select an type of event')
                    return
                }
                setButtonSpinner(true)
                
                
            try {
                const response = await fetch('http://localhost:3001/register/events', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json' },
                    body: JSON.stringify({ name, email, phoneNumber, textMessage, eventSelect })
                })
                    const data = await response.json()
                    if(data.success) {
                        setErrorMsg(data.message)
                        setTimeout(() => {
                            navigate('/event-registration-success')
                            setButtonSpinner(false)
                        }, 3000)
                    } else {
                        setErrorMsg(data.message)
                        setButtonSpinner(false)
                    }
            }catch(error) {
                await EventClientError({
                    location: "clientRegisterEvent",
                    message: (error as Error)?.message,
                    stack: (error as Error)?.stack,
                    time: new Date().toISOString(),
                  });
            
                  setErrorMsg("Error has occurred. Please try again later.");
                  setButtonSpinner(false);
    
            }
        }
    
    
    
    
        useEffect(() => {
                if(nameInputRef.current) {
                    nameInputRef.current.focus()
                }
          
    
        }, [])
    
    




  return (
    <>

        <div className=' w-screen overflow-hidden p-10 custom-event-registration'>

            <div className=' flex flex-col items-center justify-center mx-auto max-w-[800px]'>
                <div className='sm:text-lg md:text-xl lg:text-3xl xl:text-4xl text-black font-sans '><h3>Event Registration</h3></div>
                <div className=' text-base sm:text-md  md:text-lg lg:text-xl xl:text-xl font-thin'><p>Register for Upcoming Events  — your next play starts here</p></div>
            </div>



           <div className=' flex flex-col items-center justify-center mx-auto max-w-[1000px] text-center mt-6 h-[310px] custom-event-registration-wrapper '>
             <form onSubmit={clientRegisterEvent}>
              <div className=' cursor-pointer' >
                <input className='border-2 border-solid border-yellow-500 p-1 text-center w-[80%] cursor-pointer focus:border-none'
                 onChange={(e) => setName(e.target.value)} type='text' 
                value={name} placeholder='name' ref={nameInputRef} required />
                </div>
                  
              <div className=' m-3 '>
                <input className='border-2 border-solid border-yellow-500 p-1 text-center w-[80%] cursor-pointer focus:border-none ' 
                  onChange={(e) => setEmail(e.target.value)} type='email' value={email} placeholder='email' required />
              </div> 


              <div className=' m-3 '>
                <input  className='border-2 border-solid border-yellow-500 p-1 text-center w-[80%] cursor-pointer focus:border-none ' 
                 onChange={(e) => setPhoneNumber(e.target.value)} type='tel' value={phoneNumber} placeholder='contact., 123-456-7890 or 1800-123-4568' />
              </div>


              <div >
                <textarea className='border-2 border-solid border-yellow-500 p-1 text-center w-[99%] cursor-pointer resize-none focus:border-none' 
                onChange={(e) => setTextMessage(e.target.value)} maxLength={maxLength} cols={46} rows={3}  value={textMessage} 
                placeholder='enter message. max 240 characters' />
                </div>


          
                <div className='my-3'>
                            <select
                                className='border-4 border-solid border-yellow-500 bg-black text-white p-1 text-center w-[80%] cursor-pointer'
                                value={eventSelect}
                                onChange={(e) => setEventSelect(e.target.value)}
                                required
                            >
                                <option value=''>-- Select an event --</option>
                                <option value='Athletic Training Camps - elite-level training'>Athletic Training Camps - elite-level training</option>
                                <option value='Mentorship & Networking Workshops - network with coaches, agents, and mentors'>
                                    Mentorship & Networking Workshops - network with coaches, agents, and mentors
                                </option>
                                <option value='Community Outreach - Next Play Nation is committed to giving back'>
                                    Community Outreach - Next Play Nation is committed to giving back
                                </option>

                                
                            </select>
                        </div>




                <div className='mt-3'>
                    <button disabled={buttonSpinner} className=' outline-none bg-green-600 text-white
                     p-3 w-[80%] text-center border-none font-sans cursor-pointer hover:bg-yellow-600' type='submit'>
                        {buttonSpinner ? (
                            <span className="spinner"></span>
                        ): (
                            <span>Register</span>
                        )}
                     </button>
                </div>


                       <div className=' custom-event-message ' >{ errorMsg && <div><span>{errorMsg}</span></div> }  </div>


            </form>


           </div>





        </div>

    
    
    
    
    
    
    </>
  )
}

export default EventRegister
