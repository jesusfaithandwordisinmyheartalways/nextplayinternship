





import React from 'react'
import './Footer.css'
import { data } from '../Data/data'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Linkedin } from 'lucide-react';




const Footer:React.FC = () => {



  return (
   <>
        <div className=' w-screen overflow-hidden relative bottom-0 bg-gray-400 h-[210px] custom-footer-container'>
            <div className=' flex items-center justify-between mx-auto max-w-[1000px] custom-footer '>

                <div className=' w-[20%] object-contain'><img src={data[0].image} alt=''  loading="lazy" ></img></div>

                <div className=' flex gap-3 custom-footer-two '>
                    <div className='sm:text-lg md:text-xl lg:text-xl xl:text-xl  text-white font-serif custom-download-app '>Download our App</div>

                    <Link to="https://apps.apple.com/us/app/teamsideline/id1232007355">
                    <div className=' w-[90px] object-contain cursor-pointer'><img src={data[0].googlePayImage} alt=''  loading="lazy" ></img></div>
                    </Link>

                    <Link to="https://play.google.com/store/apps/details?id=com.teamsideline.teamsites&hl=en">
                        <div className=' w-[90px] object-contain cursor-pointer'><img src={data[0].appleStoreImage} alt=''  loading="lazy"  ></img></div>

                    </Link>

                </div>


                <div className=' flex flex-row gap-3 custom-footer-three '>

                    <Link to="https://www.linkedin.com/in/jerrit-a-judie-141b32174/">
                      <div className=' cursor-pointer'><Linkedin className='footer-icon' size={31} color={'blue'} /></div>
                    </Link>

                    <Link to="https://www.instagram.com/tnpn25_/">
                      <div className=' cursor-pointer'><Instagram className='footer-icon' size={31} color={'orange'} /></div>
                    </Link>


                    <Link to="https://www.facebook.com/people/The-Next-Play-Basketball-League/61573644021377/">
                      <div className=' cursor-pointer'><Facebook className='footer-icon' size={31} color={'blue'} /></div>
                    </Link>


                    <Link to="/admin">
                    <div className=' admin-footer sm:text-lg md:text-xl lg:text-xl xl:text-xl  text-md text-white font-mono hover:text-green-500 '><h3>Admin Login</h3></div>
                    </Link>


                  

                </div>





            </div>
        </div>
   
   
   
   </>
  )
}



export default Footer
