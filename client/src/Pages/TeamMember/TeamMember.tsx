


import React, { useEffect, useRef } from 'react';
import './TeamMember.css';
import { data } from '../../Components/Data/data';
import { useQuery, gql } from '@apollo/client';




const GET_MEMBER = gql`
  query teamMember {
    OUR_TEAM {
      data
    }
  }
`;



const TeamMember = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { loading, error, data: graphQLData } = useQuery(GET_MEMBER);



  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.classList.add('visible');
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


  if (loading) return <p>Loading team members...</p>;
  if (error) return <p>Error loading team members: {error.message}</p>;






  return (
    <>
      <div ref={sectionRef} className='team-section fade-in w-screen overflow-hidden p-10 custom-team-member-container '>
        <div className='flex flex-col gap-10 items-center justify-center mx-auto max-w[800px]'>
          
          <div className='sm:text-lg md:text-xl lg:text-3xl xl:text-4xl text-black font-sans p-10'>
            {graphQLData?.OUR_TEAM?.map((element: { data: string }, index: number) => (
              <div key={index}>
                <h3>{element.data}</h3>
              </div>
            ))}
          </div>

          <div className='sm:text-lg md:text-xl lg:text-xl xl:text-xl text-black font-sans p-10'>
            <h4>Founder and CEO of Next Play Nation</h4>
          </div>

          <div className=' sm:text-lg md:text-xl lg:text-xl xl:text-xl text-black font-sans  custom-team-member-ceo '>
            <span>Jerrit Judie</span>
          </div>

          <div className='w-[25%] object-contain'>
            <img src={data[0].missionImage} alt=''  loading="lazy" />
          </div>

          <div className='w-[70%] text-center font-serif text-md p-10'>
            <p>
              a nonprofit dedicated to developing athletes through mentorship, exposure,
              and competitive opportunities. Based in Texas, Jerrit leads a wide range of
              youth and adult sports programs while also overseeing brand partnerships and
              player development. His mission is to create lasting impact both on and off
              the field.
            </p>
          </div>



          <div className='w-[21%] object-contain custom-bio-header'>
            <img src={data[0].felixImage} alt=''  loading="lazy" />
            <div className=' w-70% font-sans text-center text-black font-bold'><h3>Felix Joyner</h3></div>
            <div className=' w-70% font-sans text-center text-black font-bold'><h3> Athlete Mentor</h3></div>
            <div className=' w-70% font-sans text-center text-yellow-500'><h3>Youth Advocate</h3></div>
              <div className='  w-[100%]  font-sans text-center sm:text-lg md:text-lg lg:text-md xl:text-md'>
                <p>A former pro running back with a 14-year career across the NFL, CFL, and international leagues, 
                  Felix Joyner now empowers the next generation through mentorship, training, and youth development.
                   As founder of FJ1 Sports
                   and a respected leader in the space, he brings elite experience, purpose-driven leadership, and 
                   a passion for helping athletes succeed on and off the field.</p>
              </div>

          </div>







          <div className='w-[21%] object-contain custom-bio-header'>
            <img src={data[0].tdImage} alt=''  loading="lazy" />
            <div className=' w-70% font-sans text-center text-black font-bold'><h3>Coach TNT</h3></div>
            <div className=' w-70% font-sans text-center text-black font-bold'><h3> Tony “Terror in the Trenches</h3></div>
              <div className=' w-[100%] font-sans text-center sm:text-lg md:text-lg lg:text-md xl:text-md'>
                <p>Global lineman coach and Director of the U.S. Army Bowl, 
                  Coach TNT is known for developing elite trench talent with unmatched intensity 
                  and precision. With a worldwide reputation and a passion for building leaders on and off the field,
                   he’s a force in the game and a mentor to the next generation.</p>
              </div>

          </div>









       



        </div>
      </div>
    </>
  );
};




export default TeamMember;