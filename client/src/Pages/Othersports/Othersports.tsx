





import React, {useState, useRef, useEffect} from 'react'
import './Othersports.css'
import { data } from '../../Components/Data/data'





const Othersports:React.FC= () => {
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


     <div ref={sectionRef} className='w-screen h-screen flex flex-col bg-black overflow-hidden p-3 custom-other-sports-container '>
            <div className='flex flex-col items-center justify-center mx-auto max-w-[800px]'>
              <div className={` mt-[90px] ${
                  isVisible ? 'animate-title' : 'hidden-title' }`} >
                <h3 className='sm:text-lg md:text-xl lg:text-3xl xl:text-4xl text-white font-sans '>Other Sports & Future Expansion</h3>
              </div>

            </div>
    
    
            <div className='flex flex-row items-center justify-around mx-auto max-w-[800px] custom-other-sports-wrapper '>
              <div  className={`w-[50%] object-contain ${ isVisible ? 'animate-image' : 'hidden-image' }`} >
                <img src={data[0].baseBallImage} alt=''  loading="lazy" />
                <img src={data[0].swimmerImage} alt=''   loading="lazy"/>
                <img src={data[0].volleyBallImage} alt=''  loading="lazy" />
              </div>
    
              <div >
                <p className=' sm:text-lg md:text-xl lg:text-2xl xl:text-xl text-white text-center w-[99%]'>
                We plan to expand into baseball,
                 volleyball, swimming, and even esports. Our long-term goal is 
                 to create an all-inclusive sports facility and nationwide impact.
              </p>
              </div>
    
    
            </div>
            
    
            
    
            {/* This div grows to fill remaining space */}
            <div className='flex-grow'></div>
    
    
    
    
          </div>
    
    
    
    
    
    </>
  )
}




export default Othersports
