


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
        <div className='flex flex-col items-center justify-center mx-auto max-w[800px]'>
          
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

          <div className='w-[40%] object-contain'>
            <img src={data[0].missionImage} alt='' />
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



        </div>
      </div>
    </>
  );
};




export default TeamMember;