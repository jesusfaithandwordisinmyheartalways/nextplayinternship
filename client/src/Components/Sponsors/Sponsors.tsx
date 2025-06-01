





import React, { useEffect, useRef, useState } from 'react'
import './Sponsors.css'
import { data } from '../Data/data'




const Sponsors:React.FC = () => {
  const [animateHeader, setAnimateHeader] = useState(false)
  const headerRef = useRef(null)





  useEffect(() => {
    const hasAnimated = localStorage.getItem('headerAnimated')
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setAnimateHeader(true)
          localStorage.setItem('headerAnimated', 'true')
        }
      },
      { threshold: 0.5 }
    )
  
    if (headerRef.current) {
      observer.observe(headerRef.current)
    }
  
    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current)
      }
    }
  }, [])



  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('headerAnimated')
  })




  

  return (
    <>
     <div className='HorizontalScroll-Container custom-sponsors-container '>
        <div  ref={headerRef}  className={`HorizontalScroll-Header-Wrapper ${animateHeader ? 'animate-header' : ''}`}   >
          <div className='sm:text-xl md:text-xl lg:text-4xl xl:text-4xl text-yellow-500'><h3> Our Sponsors</h3></div>
        </div>

        <div className='HorizontalScroll-Wrapper'>
          <div className=' w-[410px]'><img  src={data[0].imageTwo} alt=''  loading="lazy" /></div>
          <div className=' w-[410px]'><img src={data[0].imageThree} alt=''  loading="lazy" /></div>
          <div className=' w-[410px]'><img src={data[0].imageFour} alt=''  loading="lazy" /></div>
          <div className=' w-[410px]'><img src={data[0].imageFive} alt=''  loading="lazy" /></div>

          {/* Duplicate images for seamless loop */}
          <div className=' w-[410px]'><img src={data[0].imageTwo} alt=''  loading="lazy" /></div>
          <div className=' w-[410px]'><img src={data[0].imageThree} alt=''  loading="lazy" /></div>
          <div className=' w-[410px]'><img src={data[0].imageFour} alt=''  loading="lazy" /></div>
          <div className=' w-[410px]'><img src={data[0].imageFive} alt=''  loading="lazy" /></div>



        </div>
      </div>
    
    
    
    
    </>


  )
}


export default Sponsors
