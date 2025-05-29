



import React from 'react'
import './ SkillDevelopment.css'
import { data } from '../../Components/Data/data'




export interface Development {
   videoSrc: string;
   videoSrcTwo:string;
   title:string;
   subHeader:string;

}


const SkillDevelopment:React.FC = () => {

  const Skill:Development = {
    videoSrc: '/videos/football_IQ.mp4',
    videoSrcTwo:'/videos/football_IQ_two.mp4',
    title: 'Training & Skill Development',
    subHeader: 'Group Sessions'
  }






  return (
 
    <>
      <div className='w-screen bg-white overflow-hidden p-10 custom-skill-dev-container  '>

        <div className='flex items-center justify-center p-10 mx-auto max-w-[800px]'>
             <div className='sm:text-lg md:text-lg lg:text-3xl xl:text-3xl font-sans text-yellow-500'><h3>{Skill.title}</h3></div>
        </div>

        <div  className='flex items-center justify-center p-10 mx-auto max-w-[800px]'>
          <div className='sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-black font-sans text-3xl'><h3>{Skill.subHeader}</h3></div>
        </div>

      </div>



      <div className='w-screen overflow-hidden bg-black min-h-[80vh] p-4 custom-skill-dev-container-two '>

          <div className='flex items-center justify-around mx-auto mt-9 custom-skill-dev-wrapper  '>
             <video className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[15%] cursor-pointer" controls>
               <source src={Skill.videoSrc} type="video/mp4" />
                 Your browser does not support the video tag.
          </video>


          <video className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[15%] cursor-pointer"  controls>
               <source src={Skill.videoSrcTwo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>


          </div>

        






      </div>
    
    
    
    
    
    </>


  )
}



export default  SkillDevelopment
