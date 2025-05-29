


import React from "react"
import './Location.css'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Linkedin } from 'lucide-react';






interface MediaLocation {
    title?:string;
    address?:string,
    follow?:string
}






const Location:React.FC = () => {




    const CompanyInformation:MediaLocation = {
        title: 'Our Location',
        address: '111 Stovall Lane Caddo Mills, TX 75135 ',
        follow: 'Follow Next Play Nation on Instagram, Facebook or Linkedin'
    }




    

    return (
        <>
        <div className='w-screen h-screen overflow-hidden bg-black p-10 custom-location-container '> 
            <div className=' flex flex-col items-center justify-center mx-auto max-w-[800px]'>
                <div className=' sm:text-lg md:text-xl lg:text-3xl xl:text-4xl  text-yellow-500 font-sans '><h3>{CompanyInformation.title}</h3></div>
            </div>



            <div className=' flex items-center justify-center mx-auto max-w-[800px] mt-10'>
               <div className=' sm:text-lg md:text-xl lg:text-xl xl:text-xl  text-white font-serif '><p>{CompanyInformation.address}</p></div>
            </div>


            <div className=' flex flex-col items-center justify-center mx-auto max-w-[800px] mt-10'>
                
                <div className=' sm:text-lg md:text-xl lg:text-lg xl:text-lg  text-yellow-500 font-serif '><p>{CompanyInformation.follow}</p></div>



                    <Link to="https://www.linkedin.com/in/jerrit-a-judie-141b32174/">
                    <div className=' m-10 cursor-pointer'><Linkedin size={41} color={'white'} /></div>
                        </Link>
                        
                        <Link to="https://www.instagram.com/tnpn25_/">
                         <div className=' m-10 cursor-pointer'><Instagram size={41}  color={'white'} /></div>
                          </Link>
                          
                          
                          <Link to="https://www.facebook.com/people/The-Next-Play-Basketball-League/61573644021377/">
                            <div className=' cursor-pointer'><Facebook size={41}  color={'white'} /></div>
                            </Link>



                
            </div>







        </div>

        
        
        
        
        </>
    )
}


export default Location