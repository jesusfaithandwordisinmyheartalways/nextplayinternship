



import React from 'react'
import './OfferedSports.css'
import { data } from '../../Components/Data/data'






const OfferedSports: React.FC = () => {


  return (
    <>
      <div className='w-screen overflow-hidden p-3 bg-black min-h-screen flex-grow custom-offer-sports-container'>
        <div className='fade-in flex flex-col items-center justify-center mx-auto max-w-[800px] p-3 gap-3'>
          <div >
            <h3 className='text-base sm:text-lg  md:text-3xl lg:text-4xl xl:text-5xl text-white font-sans'> 
              Overview of All Sports Offered</h3>
          </div>

          <div className='text-base sm:text-lg md:text-2xl lg:text-2xl xl:text-3xl text-white font-sans w-[60%] text-center p-10'>
            <p>
              Next Play Nation offers football,
              basketball, and year-round training programs.
              We're expanding to include more sports based on community needs
              and athlete interest.
            </p>
          </div>
        </div>

        {/* Extra space at bottom for scrolling */}
        <div className="h-20"></div>
      </div>
    </>
  )
}

export default OfferedSports