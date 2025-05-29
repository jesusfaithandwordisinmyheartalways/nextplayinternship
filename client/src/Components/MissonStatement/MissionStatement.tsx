import React, { useEffect, useRef, useState } from 'react'
import './MissionStatement.css'
import { data } from '../Data/data'

const MissionStatement: React.FC = () => {
  const [animateTitle, setAnimateTitle] = useState(false)
  const [titleShown, setTitleShown] = useState(false)

  const [animateContent, setAnimateContent] = useState(false)
  const [contentShown, setContentShown] = useState(false)

  const titleRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  // Animate Title
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !titleShown) {
          setAnimateTitle(true)
          setTitleShown(true)

          // Add mobile-specific class
          if (window.innerWidth <= 420 && titleRef.current) {
            titleRef.current.classList.add('animate')
          }
        }
      },
      { threshold: 0.5 }
    )

    if (titleRef.current) observer.observe(titleRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
    }
  }, [titleShown])

  // Animate Content
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !contentShown) {
          setAnimateContent(true)
          setContentShown(true)
        }
      },
      { threshold: 0.5 }
    )

    if (contentRef.current) observer.observe(contentRef.current)

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current)
    }
  }, [contentShown])





  return (
    <div className='w-screen overflow-hidden bg-black p-3 custom-mission-container'>
      <div className='flex items-center justify-center mx-auto'>
        <div
          ref={titleRef}
          className={`text-5xl text-white font-serif font-bold transition-all duration-1000 ease-out ${
            animateTitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
          } mobile-slide-up`}
        >
          <h3>MISSION STATEMENT</h3>
        </div>
      </div>

      <div
        ref={contentRef}
        className='flex items-center justify-around gap-3 p-7 mx-auto max-w-[1300px] custom-mission-two'
      >
        <div
          className={ ` custom-mission-two w-[310px] object-contain transform transition-all duration-[2000ms] ease-out ${
            animateContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
          }`}
        >
          <div>
            <img src={data[0].missionImage} alt='' />
          </div>
        </div>

        <div
          className={`text-2xl text-white font-sans text-center w-[310px] transform transition-all duration-[3000ms] ease-out ${
            animateContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          }`}
        >
          <p>
            Next Play Nation is a nonprofit dedicated to athlete development, life skills, and
            community empowerment. We bridge the gap between youth sports and long-term opportunity
            by offering leagues, training, mentorship, and educational resources to help athletes
            succeed on and off the field.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MissionStatement