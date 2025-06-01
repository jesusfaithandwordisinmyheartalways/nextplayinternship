



import React from 'react'
import './VideoGallery.css'
import { data } from '../../Components/Data/data'






interface Video<T> {
    src: T,
    two:T,
    three:T,
    four:T,
    five:T,
    six:T
}





const VideoGallery:React.FC= () => {
    const videoGallery:Video<string> = {
        src: '/videos/mediaintro.mp4',
        two: '/videos/media_two.mp4',
        three: '/videos/media_three.mp4',
        four: '/videos/media_six.mp4',
        five: '/videos/media_four.mp4',
        six: '/videos/media_five.mp4'

    }





    

  return (
    <>
    <div className='w-screen overflow-hidden min-h-screen p-10 custom-video-container '>
        <div className='flex flex-col items-center justify-center mx-auto max-w-[1300px] text-center'>
            <div className='sm:text-lg md:text-xl lg:text-3xl xl:text-4xl  font-sans'><h3>Photo & Video Gallery</h3></div>
            
            
            
            <div className='sm:text-lg md:text-xl lg:text-xl xl:text-xl  p-10  font-sans'>  CEO of Next Play Nation</div>

                    <div className='  p-10'>
                    <video className=" w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] cursor-pointer" controls>
                        <source src={videoGallery.src} type="video/mp4" />
                          Your browser does not support the video tag.
                    </video>

                    </div>




                    <div className=' p-10'>
                    <video className="w-[99%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] cursor-pointer"  controls>
                        <source src={videoGallery.three} type="video/mp4" />
                          Your browser does not support the video tag.
                    </video>

                    </div>



                    <div className='  p-10'>
                    <video className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] cursor-pointer"  controls>
                        <source src={videoGallery.four} type="video/mp4" />
                          Your browser does not support the video tag.
                    </video>

                    </div>




                    <div className='  sm:w-[70%] md:w-[50%] lg:w-[40%]  p-10'>
                        <div className=' object-contain'><img src={data[0].photoImage} alt='' loading="lazy"></img></div>
                    </div>





           








        </div>
    </div>
    
    
    
    
    
    
    </>
  )
}

export default VideoGallery
