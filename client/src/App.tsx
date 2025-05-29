



import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate, Link, Navigate } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import OfferedSports from './Pages/OfferedSports/OfferedSports';
import Football from './Pages/Football/Football';
import Basketball from './Pages/Basketball/Basketball';
import Othersports from './Pages/Othersports/Othersports';
import SkillDevelopment from './Pages/ SkillDevelopment/ SkillDevelopment';
import Events from './Pages/Events/Events';
import EventRegister from './Pages/EventRegister/EventRegister';
import EventSuccess from './Pages/EventSuccess/EventSuccess';
import GeneralInquiries from './Pages/GeneralInquiries/GeneralInquiries';
import ContactSuccess from './Pages/ContactSuccess/ContactSuccess';
import Community from './Pages/Community/Community';
import Networking from './Pages/Networking/Networking';
import Camps from './Pages/Camps/Camps';
import Internship from './Pages/Internship/Internship';
import Partner from './Pages/Partner/Partner';
import Sponsorship from './Pages/Sponsorship/Sponsorship';
import Coaching from './Pages/ Coaching/Coaching';
import Location from './Pages/Location/Location';
import Admin from './Pages/Admin/Admin';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import { socket } from './utils/socket';
import CoachingSuccess from './Pages/CoachingSuccess/CoachingSuccess';
import SocialMedia from './Pages/SocialMedia/SocialMedia';
import TeamMember from './Pages/TeamMember/TeamMember';
import AcademicSupport from './Pages/AcademicSupport/AcademicSupport';
import Nutrition from './Pages/Nutrition/Nutrition';
import Development from './Pages/Development/Development';
import Articles from './Pages/Articles/Articles';
import NewsCoverage from './Pages/ NewsCoverage/ NewsCoverage';
import VideoGallery from './Pages/VideoGallery/VideoGallery';
import RecoverAdminLogin from './Pages/RecoverAdminLogin/RecoverAdminLogin';
import DonateNextPlay from './Pages/DonateNextPlay/DonateNextPlay';
import DonateSuccess from './Pages/DonateSuccess/DonateSuccess';
import { AdminLoginStatusContext } from './Context/LoginStatusProvider';

export interface Admin<T> {
  adminData: T;
}

const AdminData: Admin<string> = {
  adminData: 'Admin Login'
};

const App: React.FC = () => {
  const [scrollToTopButton, setScrollToButton] = useState(false);
  const { isAdmin, setIsAdmin, login, logout, justLoggedIn, setJustLoggedIn } = useContext(AdminLoginStatusContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (authChecked && justLoggedIn && isAdmin) {
      setJustLoggedIn(false); // prevent infinite redirect
      navigate('/admin-dashboard');
    }
  }, [authChecked, justLoggedIn, isAdmin, navigate]);

  useEffect(() => {
   

    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/admin-authentication', {
          credentials: "include",
        });
        const data = await response.json();

        if (data.authenticated) {
          login(); // use context method so it sets cookies/localStorage together
        } else {
          logout(); // cleanly removes all auth state
        }
      } catch (_) {
        setIsAdmin(false);
        localStorage.setItem('isAdmin', 'false');
      } finally {
        setAuthChecked(true);
      }
    };

    

    checkAuth();
  }, [setIsAdmin]);

  // 🟢 Save last route for all users
  useEffect(() => {
    if (location.pathname !== '/admin-dashboard') {
      localStorage.setItem('lastRoute', location.pathname);
    }
  }, [location.pathname]);

  // 🟢 Restore last route for users (non-admin)
  useEffect(() => {
    const lastVisited = localStorage.getItem('lastRoute');
    const isAdminStored = localStorage.getItem('isAdmin');
  
    if (
      authChecked &&
      (!isAdmin || isAdminStored === 'false') &&
      lastVisited &&
      lastVisited !== location.pathname &&
      location.pathname !== '/admin-dashboard' // ✅ Prevent overriding admin redirect
    ) {
      navigate(lastVisited);
    }
  }, [authChecked, isAdmin, location.pathname, navigate]);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrollToButton(window.scrollY > 31);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  
  const scrollToTop = (): void => {
    const topPage = document.getElementById('top-page');
    if (topPage) {
      topPage.scrollIntoView({ behavior: 'smooth' });
    }
  };






  return (
    <>
      <div className="app-container">
      {authChecked && (!isAdmin || (isAdmin && location.pathname !== '/admin-dashboard')) && <Navbar />}

        <div className="content" id="top-page">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/offeredsports' element={<OfferedSports />} />
            <Route path='/football' element={<Football />} />
            <Route path='/basketball' element={<Basketball />} />
            <Route path='/other-sports' element={<Othersports />} />
            <Route path='/training' element={<SkillDevelopment />} />
            <Route path='/events' element={<Events />} />
            <Route path='/event-registration' element={<EventRegister />} />
            <Route path='/event-registration-success' element={<EventSuccess />} />
            <Route path='/inquires' element={<GeneralInquiries />} />
            <Route path='/success-contact' element={<ContactSuccess />} />
            <Route path='/outreach' element={<Community />} />
            <Route path='/network' element={<Networking />} />
            <Route path='/athletics' element={<Camps />} />
            <Route path='/internship' element={<Internship />} />
            <Route path='/partner' element={<Partner />} />
            <Route path='/donor' element={<Sponsorship />} />
            <Route path='/donate' element={<DonateNextPlay />} />
            <Route path='/donate-success' element={<DonateSuccess />} />
            <Route path='/volunteer' element={<Coaching />} />
            <Route path='/location' element={<Location />} />
            <Route path='/sponsor' element={<Sponsorship />} />
            <Route path='/social' element={<SocialMedia />} />
            <Route path='/coach' element={<Coaching />} />
            <Route path='/bio-profile' element={<TeamMember />} />
            <Route path='/success-coaching' element={<CoachingSuccess />} />
            <Route path='/academic' element={<AcademicSupport />} />
            <Route path='/health' element={<Nutrition />} />
            <Route path='/development' element={<Development />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/press' element={<NewsCoverage />} />
            <Route path='/photo' element={<VideoGallery />} />
            <Route path='/admin' element={<Admin />} />
            
                          <Route
                path="/admin-dashboard"
                element={
                  authChecked ? (
                    isAdmin ? (
                      <AdminDashboard />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  ) : null
                }
              />
            
            <Route path='/admin-login-forgot' element={<RecoverAdminLogin />} />
          </Routes>
        </div>

        <Footer />

        {scrollToTopButton && (
          <button onClick={scrollToTop} className="scroll-to-top">
            <ChevronUp size={31} />
          </button>
        )}

        {!isAdmin && <div></div>}

      </div>
    </>
  );
  
};

export default App;
