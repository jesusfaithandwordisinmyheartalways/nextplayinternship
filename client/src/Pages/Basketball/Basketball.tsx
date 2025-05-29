






import React, { useEffect, useRef, useState } from 'react'
import './Basketball.css'
import { data } from '../../Components/Data/data'







const Basketball: React.FC = () => {

  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)



  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // run only once
        }
      },
      { threshold: 0.4 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])











  return (
    <>
      <div  ref={sectionRef} className='w-screen h-screen flex flex-col bg-black overflow-hidden p-3 custom-basketball-container '>
        <div className='flex items-center justify-center mx-auto max-w-[800px]'>
          <div className={`text-white text-5xl mt-[90px] ${
              isVisible ? 'animate-title' : 'hidden-title' }`} >
            <h3 className='sm:text-lg md:text-xl lg:text-3xl xl:text-5xl '>Basketball</h3>
          </div>
        </div>


        <div className='flex items-center justify-around mx-auto max-w-[800px] relative top-[30px] custom-basketball-section '>
          <div  className={` ${
              isVisible ? 'animate-image' : 'hidden-image' }`} >
            <img className='w-[40%] object-contain ' src={data[0].basketBallImage} alt='' />
          </div>


          <div className=' text-white text-lg text-center w-[60%]'><p>
          Our adult recreational league and youth development clinics help players grow their
           game and gain competitive experience. With certified refs and full uniforms, 
           we run a first-class operation.
          </p></div>


        </div>
        

        

        {/* This div grows to fill remaining space */}
        <div className='flex-grow'></div>




      </div>


      
    </>
  )
}





export default Basketball