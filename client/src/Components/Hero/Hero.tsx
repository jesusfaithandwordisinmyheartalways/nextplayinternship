

import React from "react"
import './Hero.css'
import { data } from "../Data/data"


const Hero:React.FC = () => {



    return (
        <>

        <div className=" w-screen overflow-hidden bg-white sm:h-[30vh] xl:h-[90vh] custom-hero-container ">
            <div className=" flex flex-col items-center justify-center gap-10 mx-auto">
                <div className="  custom-hero-image">
                    <img src={data[0].image} alt="Next Play Nation Logo"></img></div>    
            </div>
        </div>
        
        
        
        </>
    )
}


export default Hero