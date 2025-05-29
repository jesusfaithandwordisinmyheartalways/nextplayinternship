






import React from 'react'
import './Football.css'
import { data } from '../../Components/Data/data'




 interface MP4VideoPlayer {
  src:string;
  src_two:string;
  src_three:string;
  videoTitle?:string;
}




const Football: React.FC = () => {


  const videoPlayer:MP4VideoPlayer = {
    src: '/videos/film.mp4',
    src_two:'/videos/film_two.mp4',
    src_three: '/videos/film_three.mp4',
    videoTitle: 'Next Play Nation Fundamentals '
  }

    



  
  return (
    <>
      <div className='w-screen bg-white overflow-hidden p-10 custom-football-container'>
        <div className='flex items-center justify-around gap-3 p-10 mx-auto max-w-[2000px]'>

          <div className='animate-image-left w-[21%] object-contain'>
            <img src={data[0].footballImage} alt='' />
          </div>

          <div className='animate-text-up  sm:text-lg md:text-xl lg:text-3xl xl:text-5xl font-sans text-yellow-500'>
            <h3>Football</h3>
          </div>

          <div className='animate-image-right w-[21%] object-contain'>
            <img src={data[0].footBallPlayersImage} alt='' />
          </div>

        </div>

      </div>





      <div className='w-screen overflow-hidden bg-black min-h-[60vh] p-4 custom-football-container-two'>
          <div className='flex flex-col items-center justify-center mx-auto max-w-[800px]'>
             <h3 className='text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-white font-bold font-sans'>{videoPlayer.videoTitle}</h3>
                <hr className='text-white text-1xl font-bold w-[90%]' />
                <div className="w-[50%] mt-3 text-center">
                  <p className=" sm:text-sm md:text-lg lg:text-lg xl:text-xl text-white font-bold font-sans">
                  From youth fundamentals to 7-on-7 leagues and high school showcases,
                  our football program develops skills, confidence, and exposure. Led by
                    experienced coaches and NFL trainers.
                   </p>
                  </div>
          </div>


          <div className='flex items-center justify-around mx-auto mt-9 custom-football-container-two '>
                      <video className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] cursor-pointer" controls>
              <source src={videoPlayer.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] cursor-pointer" controls>
              <source src={videoPlayer.src_two} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <video className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] cursor-pointer" controls>
              <source src={videoPlayer.src_three} type="video/mp4" />
              Your browser does not support the video tag.
            </video>


          </div>

        </div>
    </>
  )
}







export default Football