


import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Coaching.css';






const Coaching: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [whyVolunteer, setWhyVolunteer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const maxLength = 300;





  const validatePhone = (number: string): boolean => {
    const phoneRegex = /^(\d{3,4}-\d{3}-\d{3,4}|\d{3}-\d{3}-\d{4})$/;
    return phoneRegex.test(number);
  };






  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phoneNumber)) {
      setError('Invalid phone number. Try formats like 1800-000-000 or 213-343-5464');
      return;
    }

    if (!role) {
      alert('Must Select Role of Your Interest');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://nextplayinternshipserver.onrender.com/coach/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone: phoneNumber,  role,  experience, whyVolunteer, }),
      });

      const data = await response.json();
      if (data.success) {
        navigate('/success-coaching');
      } else {
        setError(data.message || 'Submission failed.');
      }
    } catch (err) {
      setError('Submission failed. Please check your network.');
    } finally {
      setLoading(false);
    }
  };





  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);







  return (
    <div className="w-screen overflow-hidden p-4 min-h-screen text-center custom-coaching-container">
      <div className="flex justify-center text-4xl font-sans mb-4">
        <h3 className='sm:text-lg md:text-xl lg:text-3xl xl:text-4xl'>Volunteer With Next Play Nation</h3>
      </div>




      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 text-center">
        <div>
          <label className=' relative top-[0px] left-[-10px]  text-center'>Full Name</label>
          <input onChange={(e) => setFullName(e.target.value)} ref={nameInputRef}
            className=" relative top-[0px] left-[-10px] w-[80%] text-center border-4 border-black" value={fullName}
            placeholder="Full Name"
            required
          />
        </div>


        <div>
          <label  className=' relative top-[0px] left-[-10px] text-center'>Email</label>
          <input  onChange={(e) => setEmail(e.target.value)}
            className="relative top-[0px] left-[-10px] w-[90%] text-center border-4 border-black"
            value={email}
            placeholder="Email"
            type="email"
            required
          />
        </div>

        <div>
          <label className=' relative top-[0px] left-[-20px]'>Phone Number</label>
          <input onChange={(e) => setPhoneNumber(e.target.value)}
            className=" relative top-[0px] left-[-10px]  w-[70%] text-center border-4 border-black" value={phoneNumber}
            placeholder="e.g. 213-343-5464 or 1800-000-000"
            required />
        </div>


        <div>
          <label>Role Interested In</label>
          <select onChange={(e) => setRole(e.target.value)}
            className="relative top-[0px] left-[10px] w-[80%] text-center border-4 border-black hover:bg-green-300 cursor-pointer"
            value={role}
            required  >
            <option value="">Select a Role</option>
            <option value="Coach">Coach</option>
            <option value="Assistant">Assistant</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </div>



        <div>
          <label>Relevant Experience or Qualifications</label>
          <textarea onChange={(e) => setExperience(e.target.value)}
            className="border-4  w-[80%] border-black text-center resize-none"
            rows={3}
            value={experience}
            maxLength={maxLength}
            cols={40}
            placeholder="Your experience or qualifications..."
            required
          />
        </div>

        <div>
          <label>Why do you want to volunteer/coach?</label>
          <textarea  onChange={(e) => setWhyVolunteer(e.target.value)}
            className="border-4  w-[80%] border-black text-center resize-none"
            rows={3}
            value={whyVolunteer}
            maxLength={maxLength}
            cols={40}
            placeholder="Tell us your motivation..."
            required
          />
        </div>

        <button type="submit" className="bg-black text-white text-lg p-3  w-[50%] hover:bg-green-500">
          {loading ? <span>Submitting...</span> : <span>Join Us</span>}
        </button>

               { error && <div className="text-red-500">{error}</div> }


      </form>





      
    </div>
  );
};




export default Coaching;