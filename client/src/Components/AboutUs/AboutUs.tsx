






import React, { useEffect, useRef, useState } from 'react';
import { data } from '../Data/data';
import './AboutUs.css';






const AboutUs: React.FC = () => {
  const [animateAbout, setAnimateAbout] = useState(false);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  const [scrollKey, setScrollKey] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [animateAboutTwo, setAnimateAboutTwo] = useState(false);
  const aboutTwoRef = useRef<HTMLDivElement | null>(null);

  const [animateLeadership, setAnimateLeadership] = useState(false);
  const leadershipRef = useRef<HTMLDivElement | null>(null);

  const [animateSuccess, setAnimateSuccess] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  const [animateCommunity, setAnimateCommunity] = useState(false); // NEW
  const communityRef = useRef<HTMLDivElement | null>(null); // NEW






  useEffect(() => {
    const aboutEl = aboutRef.current;
    const scrollEl = scrollRef.current;
    const aboutTwoEl = aboutTwoRef.current;
    const leadershipEl = leadershipRef.current;
    const successEl = successRef.current;
    const communityEl = communityRef.current; // NEW

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target === aboutEl && entry.isIntersecting) {
          setAnimateAbout(true);
        }
        if (entry.target === scrollEl && entry.isIntersecting) {
          setScrollKey((prev) => prev + 1);
        }
        if (entry.target === aboutTwoEl && entry.isIntersecting) {
          setAnimateAboutTwo(true);
        }
        if (entry.target === leadershipEl && entry.isIntersecting) {
          setAnimateLeadership(true);
        }
        if (entry.target === successEl && entry.isIntersecting) {
          setAnimateSuccess(true);
        }
        if (entry.target === communityEl && entry.isIntersecting) {
          setAnimateCommunity(true); // NEW
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (aboutEl) observer.observe(aboutEl);
    if (scrollEl) observer.observe(scrollEl);
    if (aboutTwoEl) observer.observe(aboutTwoEl);
    if (leadershipEl) observer.observe(leadershipEl);
    if (successEl) observer.observe(successEl);
    if (communityEl) observer.observe(communityEl); // NEW

    return () => {
      if (aboutEl) observer.unobserve(aboutEl);
      if (scrollEl) observer.unobserve(scrollEl);
      if (aboutTwoEl) observer.unobserve(aboutTwoEl);
      if (leadershipEl) observer.unobserve(leadershipEl);
      if (successEl) observer.unobserve(successEl);
      if (communityEl) observer.unobserve(communityEl); // NEW
    };
  }, []);






  return (
    <div className='w-screen overflow-hidden p-4 bg-black custom-about-us'>

      {/* Section One */}
      <div ref={aboutRef} className={`flex flex-col items-center justify-center mx-auto max-w-[500px] transition-all duration-1000 ease-out ${
          animateAbout ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        }`} >
        <div className='text-5xl text-white font-serif font-bold custom-about-us'>
          <h3>Who We Are</h3>
        </div>
      </div>

      {/* Horizontal Scroll Section */}
      <div
        key={scrollKey}
        ref={scrollRef}
        className="mt-10 AboutUs-HorizontalScroll-Wrapper animate-about-scroll"
      >
        {[
          data[0].footballImage,
          data[0].baseBallImage,
          data[0].basketBallImage,
          data[0].swimmerImage,
          data[0].volleyBallImage,
          data[0].footballImage,
          data[0].baseBallImage,
          data[0].basketBallImage,
          data[0].swimmerImage,
          data[0].volleyBallImage,
        ].map((img, index) => (
          <div className='w-[410px] ' key={index}>
            <img src={img} alt=''  loading="lazy" />
          </div>
        ))}
      </div>

      {/* Section Two */}
      <div ref={aboutTwoRef} className='custom-about-us-three flex items-center justify-around mx-auto max-w-[1000px] mt-10 p-4 '>
        <div className={`w-[310px] object-contain transition-all duration-1000 ease-in-out ${
            animateAboutTwo ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
          <img src={data[0].aboutUsImage} alt='' loading="lazy" />
        </div>

        <div className={`text-white text-2xl font-sans text-center w-[310px] transition-all duration-1000 ease-in-out ${
            animateAboutTwo ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-full'
          }`}>
          <p  className='text-white text-lg font-sans w-[310px]'>
            Next Play Nation was founded to give athletes a second chance, a new opportunity, and a
            support system. Our mission is to empower youth through sports, mentorship, and
            leadership training, helping them prepare for what’s next — in the game and in life.
          </p>
        </div>
      </div>



      {/* Leadership Section */}
      <div ref={leadershipRef} className={` custom-about-us-three  flex items-center justify-around mx-auto max-w-[1000px] gap-4 mt-5 p-5 transition-all duration-1000 ease-in-out ${
          animateLeadership ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'  }`} >
        <div className='w-[310px] object-contain'>
          <img src={data[0].leadershipImage} alt=''  loading="lazy" />
        </div>



        <div>
          <div>
            <h3 className='text-white text-2xl font-serif'>Leadership & Coaching Staff</h3>
          </div>
          <br />
          <div>
            <p className='text-white text-lg font-sans  w-[310px]  '>
              Our team includes former athletes, certified trainers, and passionate community leaders. 
              With NFL-level coaching and nonprofit leadership, our staff is committed to athlete growth, safety,
              and success at every level.
            </p>
          </div>
        </div>

      </div>




      {/* Athlete Success Stories */}
      <div ref={successRef} className={`custom-about-us-three flex items-center justify-around mx-auto max-w-[1000px] gap-4 mt-5 p-5 transition-all duration-1000 ease-in-out ${
          animateSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} >
        <div className='w-[310px] object-contain'>
          <img  src={data[0].successImage} alt=''  loading="lazy" />
        </div>
        <div>
          <div className='text-white text-2xl font-serif'>
            <h3>Athlete Success Stories</h3>
          </div>
          <br />
          <div className='text-white text-lg font-sans w-[310px]'>
            <p>
              From local standouts to collegiate and international signings,
              Next Play Nation athletes are making waves. 
              Read inspiring stories of players who’ve used our programs as a 
              springboard to scholarships and professional opportunities.
            </p>
          </div>
        </div>

      </div>








      {/* Community Impact Section (New Animation) */}
      <div ref={communityRef} className={` custom-about-us-three flex items-center justify-around mx-auto max-w-[1000px] gap-4 mt-5 p-5 transition-all duration-1000 ease-in-out ${
          animateCommunity ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <div className='w-[310px] object-contain'>
          <img src={data[0].communityImage} alt=''  loading="lazy" />
        </div>


        <div className='text-white text-2xl font-serif'>
          <h3>Community Impact</h3>
          <br />

          <div className='text-white text-lg font-sans w-[310px]'>
          <p>
            Through camps, outreach events, and educational initiatives,
            we've served hundreds of families across Texas. Our programs provide resources, 
            mentorship, and access to underserved communities.
          </p>
        </div>
        </div>


      </div>



    </div>
  );
};

export default AboutUs;