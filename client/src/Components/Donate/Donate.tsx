






import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { data } from '../Data/data'
import { ArrowRight } from 'lucide-react';
import './Donate.css'




interface DonationType {
  header?: string;
}

const text: DonationType = {
  header: 'SUPPORT NEXT PLAY NATION – MAKE A DONATION TODAY'
}








const Donate: React.FC = () => {
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);




  useEffect(() => {
    // Animate when section scrolls into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          h3Ref.current?.classList.add('animate-header');
          ctaRef.current?.classList.add('animate-cta');
        }
      },
      { threshold: 0.5 }
    );

    if (h3Ref.current) observer.observe(h3Ref.current);

    return () => observer.disconnect();
  }, []);






  
  return (
    <div className='w-screen overflow-hidden bg-white p-10 custom-donate'>
      <div className='flex items-center justify-center mx-auto max-w-[800px]'>
        <h3 ref={h3Ref} className='text-2xl text-yellow-500 font-sans header-text'>
          {text.header}
        </h3>
      </div>

      <div className='flex items-center justify-around mx-auto max-w-[1000px] mt-[90px] custom-donate-two '>
        <div className='w-[310px] object-contain'>
          <img src={data[0].donationImage} alt='' loading="lazy" className="jiggle-image" />
        </div>


        <Link to="/donate">
          <div ref={ctaRef} className='text-2xl bg-black text-yellow-500 rounded-lg p-3 hover:text-green-400 cta-text'>
            Give Today Grow Tomorrow <button><span><ArrowRight size={31} /></span></button>
          </div>
        </Link>
      </div>



    </div>
  )
}

export default Donate