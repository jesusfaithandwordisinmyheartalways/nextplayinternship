


import React, { useEffect, useRef } from 'react';
import './SocialMedia.css';
import { data } from '../../Components/Data/data';
import { Link } from 'react-router-dom';





const SocialMedia = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);




  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            sectionRef.current.classList.add('fade-in-visible');
            observer.unobserve(entry.target); // trigger only once
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);







  return (
    <>
      <div
        className='w-screen  h-screen mt-[-30px] overflow-hidden bg-black fade-in custom-social-container '
        ref={sectionRef}
      >
        <div className='flex flex-col gap-10 items-center justify-center mx-auto max-w-[800px] mt-10'>

          <div>
            <h3 className='sm:text-lg md:text-xl lg:text-3xl xl:text-4xl text-white font-sans'>Social Media Feeds</h3>
          </div>

          <div>
            <h4 className='sm:text-lg md:text-xl lg:text-xl xl:text-xl text-yellow-500  font-sans'>See Latest Post from Next Play Nation</h4>
          </div>



              <div className=' flex items-center justify-around mx-auto max-w-[800px] custom-social-media-wrapper '>

              <Link to="https://www.facebook.com/profile.php?id=61573644021377">
            <div className='w-[180px] object-contain cursor-pointer'>
              <img
                src={data[0].fbImage}
                alt='Facebook Feed'
              />
            </div>
          </Link>

          <Link to="https://www.instagram.com/tnpn25_/">
            <div className='w-[210px] object-contain cursor-pointer'>
              <img
                src={data[0].instagramImage}
                alt='Instagram Feed'
              />
            </div>
          </Link>

          <Link to="https://www.linkedin.com/in/jerrit-a-judie-141b32174/">
            <div className='w-[210px] object-contain cursor-pointer'>
              <img
                src={data[0].linkedinImage}
                alt='LinkedIn Feed'
              />
            </div>
          </Link>
              </div>

        </div>
      </div>
    </>
  );
};

export default SocialMedia;