



import React from 'react'
import './DonateSuccess.css'




    interface DonateSucess {
        success?:String,
        successTwo?:String;
    }


    const donateSuccess:DonateSucess = {
        success: 'THANK YOU FOR YOR REQUEST',
        successTwo: 'OUR TEAM WILL CONTACT YOU'
    }

const DonateSuccess:React.FC = () => {


  return (
   <>

   <div className=' w-screen overflow-hidden h-screen custom-donate-success-container ' >

    <div className=' flex  flex-col items-center  gap-3 justify-center mx-auto max-w-[800px]'>
        <div className=' sm:text-lg md:text-lg lg:text-3xl xl:text-3xl font-sans '><h3>{donateSuccess.success}</h3></div>
        <div className=' sm:text-lg md:text-lg lg:text-3xl xl:text-3xl  font-sans '><h3>{donateSuccess.successTwo}</h3></div>

    </div>



   </div>
   
   
   
   
   
   
   </>
  )
}

export default DonateSuccess
