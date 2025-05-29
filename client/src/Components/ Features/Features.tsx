


import React, { useEffect, useRef, useState } from 'react'
import './Features.css'
import { data } from '../Data/data'





const Features: React.FC = () => {
  const [animateTitle, setAnimateTitle] = useState(false)
  const [titleShown, setTitleShown] = useState(false)

  const [animateContent, setAnimateContent] = useState(false)
  const [contentShown, setContentShown] = useState(false)

  const [animateCTA, setAnimateCTA] = useState(false)
  const [ctaShown, setCtaShown] = useState(false)

  const titleRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const ctaRef = useRef<HTMLDivElement | null>(null)


  

  // Animate H3 Title
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !titleShown) {
          setAnimateTitle(true)
          setTitleShown(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (titleRef.current) observer.observe(titleRef.current)

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
    }
  }, [titleShown])

  // Animate Image and Paragraph
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !contentShown) {
          setAnimateContent(true)
          setContentShown(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (contentRef.current) observer.observe(contentRef.current)

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current)
    }
  }, [contentShown])

  // Animate Call to Action
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ctaShown) {
          setAnimateCTA(true)
          setCtaShown(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (ctaRef.current) observer.observe(ctaRef.current)

    return () => {
      if (ctaRef.current) observer.unobserve(ctaRef.current)
    }
  }, [ctaShown])





  return (
    <div className='w-screen overflow-hidden bg-yellow-500 p-10 custom-mission-container'>
      <div className='custom-feature-section-two flex items-center justify-center mx-auto'>
        <div
          ref={titleRef}
          className={`text-4xl text-black font-serif font-bold transition-all duration-1000 ease-out ${
            animateTitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
          } mobile-h3-fix`}
        >
          <h3>FEATURES, EVENTS, & NEWS</h3>
        </div>
      </div>

      <div
        ref={contentRef}
        className='flex items-center justify-around gap-3 p-7 mx-auto max-w-[1300px] custom-mission-two flex-wrap'
      >
        <div
          className={`w-[310px] object-contain transform transition-all duration-[2000ms] ease-out ${
            animateContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
          }`}
        >
          <div>
            <img src={data[0].featuresImage} alt='' />
          </div>
        </div>

        <div
          className={`text-2xl text-white font-sans text-center w-[310px] transform transition-all duration-[3000ms] ease-out ${
            animateContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          }`}
        >
          <p>
            Stay updated with our latest camps, league announcements, player highlights, and
            community news. From special guest appearances to athlete signings, this is your hub for
            all things Next Play Nation.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div ref={ctaRef} className='flex flex-col items-center justify-center mx-auto p-10 custom-mission-three'>
        <div
          className={`text-3xl text-black font-sans text-center transform transition-all duration-1000 ease-out ${
            animateCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        >
          <h3>Call to Action</h3>
        </div>

        <div
          className={`custom-feature-section mt-3 font-light text-center transform transition-all duration-1000 ease-out delay-200 ${
            animateCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        >
          <p>
            Join the movement. Whether you're a player, coach, parent, or supporter — there’s a
            place for you at Next Play Nation. [Volunteer, Donate, Register, or Sponsor Today]
          </p>
        </div>
      </div>
    </div>
  )
}

export default Features