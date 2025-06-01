


import React, { useState, useEffect, useRef } from 'react';
import './DonateNextPlay.css';
import { useNavigate } from 'react-router-dom';





interface DonatePage {
  donateText?: string;
}

const donate: DonatePage = {
  donateText: 'Make an Impact with Your Donation'
};





const DonateNextPlay: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientDonateType, setClientDonateType] = useState<string>('');
  const [buttonSpinner, setButtonSpinner] = useState<boolean>(false);
  const donateInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();







        // Client Side function  Logs client-side errors to the backend , Keeps the UI secure with a generic message.

        const DonateClientError = async (errorDetails: any) => {
          try {
            await fetch('http://3.15.232.45:3001/donate-next-play-nation-client-error', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                error: JSON.stringify(errorDetails),
                time: new Date().toISOString(),
                page: 'DonateNextPlay',
              }),
            });
          } catch (err) {
        
          }
        };








  const donateOption = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonSpinner(true);

    try {
      const response = await fetch('http://3.15.232.45:3001/donate/donate-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, clientPhone, clientEmail, clientDonateType })
      });

      const data = await response.json();
      if (data.success) {
        setError(data.message);
        setTimeout(() => navigate('/donate-success'), 3000);
      } else {
        setError(data.message);
        setButtonSpinner(false);
      }
    } catch (error) {
      await DonateClientError(error);
      setError(`Something went wrong. Please try again.`);
      setButtonSpinner(false);
    }
  };





  useEffect(() => {
    if (donateInput.current) {
      donateInput.current.focus();
    }
  }, []);






  return (
    <>
      <div className="w-screen overflow-hidden p-10 h-screen custom-donate-next-play-nation-container ">
        <div className="flex flex-col items-center justify-center p-6 mx-auto max-w-[700px] rounded-2xl bg-black">
          <div className="sm:text-lg md:text-lg lg:text-3xl xl:text-3xl text-yellow-500 font-sans mb-6 text-center">
            <h3>{donate.donateText}</h3>
          </div>



          <form onSubmit={donateOption} className="w-full flex flex-col items-center gap-4">
            {/* Name */}
            <div className="text-yellow-500 font-sans sm:text-lg md:text-lg lg:text-2xl xl:text-2xl text-center">
              <label htmlFor="fullname">Name</label>
            </div>
            <div className="flex justify-center w-full">
              <input
                className="text-center font-sans p-1 w-[70%]"
                onChange={(e) => setClientName(e.target.value)}
                type="text"
                value={clientName}
                ref={donateInput}
                placeholder="Name"
                required
              />
            </div>




            {/* Phone */}
            <div className="text-yellow-500 font-sans text-2xl text-center">
              <label className='sm:text-lg md:text-lg lg:text-2xl xl:text-2xl ' htmlFor="phone-number">Contact</label>
            </div>
            <div className="flex justify-center w-full">
              <input
                className="text-center font-sans p-1  w-[70%]"
                onChange={(e) => setClientPhone(e.target.value)}
                value={clientPhone}
                placeholder="e.g. 213-343-5464 or 1800-000-000"
                required
              />
            </div>

            {/* Email */}
            <div className="text-yellow-500 font-sans text-2xl text-center">
              <label className='sm:text-lg md:text-lg lg:text-2xl xl:text-2xl ' htmlFor="email">Email</label>
            </div>
            <div className="flex justify-center w-full">
              <input
                className="text-center font-sans p-1  w-[70%] "
                onChange={(e) => setClientEmail(e.target.value)}
                value={clientEmail}
                placeholder="Email"
                required
              />
            </div>

            {/* Donation Type */}
            <div className="text-yellow-500 font-sans text-lg text-center mt-4">
              <h3 className='sm:text-lg md:text-lg lg:text-xl xl:text-xl '>Donation Type</h3>
            </div>
            <div className="flex justify-center w-full">
              <select
                className="text-center border-4 border-black border-solid cursor-pointer hover:bg-green-400 w-[90%] "
                onChange={(e) => setClientDonateType(e.target.value)}
                value={clientDonateType}
                required
              >
                <option value="">Type of Donation</option>
                <option value="Individual">Individual</option>
                <option value="sponsors">Sponsors</option>
              </select>
            </div>

   
            <div className="flex justify-center w-full mt-2">
              <button
                className="bg-yellow-500 text-white text-lg px-4 py-2 border-none outline-none cursor-pointer hover:bg-green-500 w-[40%] h-[42px] rounded"
                type="submit" >
                {buttonSpinner ? (
                  <span className="spinner mx-auto"></span>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>

  
            <div className="text-center text-red-400 text-lg mt-2 min-h-[24px]">
              {error && <span>{error}</span>}
            </div>
          </form>





        </div>
      </div>
    </>
  );
};







export default DonateNextPlay;