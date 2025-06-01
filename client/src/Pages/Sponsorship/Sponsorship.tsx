



import React, { useEffect, useRef } from 'react'
import './Sponsorship.css'
import { data } from '../../Components/Data/data'
import { Link } from 'react-router-dom'
import Sponsors from '../../Components/Sponsors/Sponsors';





const Sponsorship: React.FC = () => {
  const sectionRefs = useRef<HTMLDivElement[]>([])

  // Clear refs on rerender
  sectionRefs.current = []

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }






  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.2 }
    )

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])




  
  return (
    <div className='w-screen overflow-hidden p-10 custom-sponsorship-container'>
      <div className='fade-in-section flex flex-col items-center justify-center mx-auto max-w-[800px]' ref={addToRefs}
      >
        <div className=' sm:text-lg md:text-xl lg:text-3xl xl:text-4xl text-black font-sans'>
          <h3>Sponsorship & Donor Information</h3>
        </div>
        <div className=' sm:text-lg md:text-lg lg:text-xl xl:text-xl text-black text-center font-mono w-[80%] mt-10'>
          <p>
            Support our mission and receive brand exposure at our events.
            We offer tiered sponsorship packages for businesses, organizations,
            and individual donors.
          </p>
        </div>
      </div>

      {[
        { image: data[0].imageThree, link: 'https://fj1sports.com/' },
        { image: data[0].imageFour, link: 'https://www.terrorinthetrenches.com/' },
        { image: data[0].imageFive, link: 'https://teavoila.com/' },
        { image: data[0].awakeImage, link: 'https://awakeint.org/' }
      ].map((sponsor, index) => (
        <div
          key={index}
          className='fade-in-section flex flex-col items-center justify-center mx-auto mt-[90px] max-w-[800px] text-center'
          ref={addToRefs}
        >
          <div className='w-[20%]'><img src={sponsor.image} alt=''  loading="lazy" /></div>
          <Link to={sponsor.link}>
            <div className='hover:text-green-500 '>
              <p className=' text-base sm:text-lg md:text-lg lg:text-sm xl:text-xl'>Visit our sponsor’s profile to learn more</p>
            </div>
          </Link>
        </div>
      ))}

      <div
        className='fade-in-section flex flex-col items-center justify-center mx-auto mt-[90px] max-w-[800px] gap-[50px] text-center'
        ref={addToRefs}
      >
        <div className='text-3xl font-sans'>
          <h3>Other Sponsors</h3>
        </div>
        <div className='w-[20%]'><img src={data[0].nextUpImage} alt=''  loading="lazy" /></div>
        <div className='w-[20%]'><img src={data[0].shoeSponsorImage} alt=''  loading="lazy" /></div>
      </div>
    </div>
  )
}





export default Sponsorship