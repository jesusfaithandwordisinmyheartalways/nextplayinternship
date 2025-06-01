




import React from 'react'
import './Articles.css'
import { Link } from 'react-router-dom'







const Articles:React.FC = () => {


  return (
   <>
   <div className='w-screen overflow-hidden min-h-screen p-10 custom-articles-container '>
    <div className='flex flex-col items-center justify-center mx-auto max-w-[800px]'>
        <div className=' sm:text-lg md:text-xl lg:text-3xl xl:text-4xl font-sans'><h3>Blog & Articles</h3></div>

        <div className=' text-center font-sans w-[80%] p-10'>
          <h4 className='w-[100%] sm:text-xl md:text-xl lg:text-xl xl:text-xl text-green-500'>
           Leading the Way in Global Athlete Branding
            </h4>

        </div>


        <div className=' text-center  w-[70%] sm:text-lg md:text-lg lg:text-lg xl:text-lg'>
          <p>NEXT PLAY NATION is making headlines in the world of sports marketing, recently featured in the Associated Press for its groundbreaking
             role in athlete representation. In a major milestone, athlete Luke Francis Jr. signed a landmark NIL (Name, Image, and Likeness) deal with
              TeaVoila—an achievement that signals a new era for international athlete branding and showcases the power of NEXT PLAY NATION’s platform. 
              With a sharp focus on elevating talent beyond the game, 
            NEXT PLAY NATION continues to lead the charge in helping athletes worldwide unlock their full branding potential both on and off the field.</p>
        </div>

        

        <Link to="https://apnews.com/press-release/ein-presswire-newsmatics/luke-francis-jr-compensation-in-sports-e40177238e44f5b06897a7ea886a15ad">
            <div className='article-span sm:text-lg md:text-lg lg:text-xl xl:text-xl text-yellow-500 hover:text-green-600'><span>See Our Article</span></div>
        </Link>




        <div className=' text-center font-sans w-[80%] p-10'>
            <p>We believe that knowledge is just as powerful as practice. That’s why we’re excited to announce that our
                 Blog & Articles section is coming soon! This upcoming feature will offer valuable insights, inspiring stories,
                  expert advice, and up-to-date information on everything from athlete development and leadership to mental health and community impact. 
                Stay tuned as we prepare to launch a space dedicated to helping you grow on and off the field—because your journey deserves to be informed, supported, and celebrated.</p>
            </div>





    </div>
   </div>
   
   
   
   
   
   
   </>
  )
}

export default Articles
