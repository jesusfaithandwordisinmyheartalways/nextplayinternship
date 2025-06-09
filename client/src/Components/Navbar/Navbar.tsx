



import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { data } from '../Data/data';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { AdminLoginStatusContext } from '../../Context/LoginStatusProvider';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';





const Navbar: React.FC = () => {
    const [navbarSticky, setNavbarSticky] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 420);

    const navigate = useNavigate();
    const { isAdmin } = useContext(AdminLoginStatusContext);
    const location = useLocation();








    useEffect(() => {
        const navbarScroll = () => {
            setNavbarSticky(window.scrollY > 20);
        };
        window.addEventListener('scroll', navbarScroll);

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 420);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', navbarScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    
    const userMouseEnter = (section: string): void => {
        setActiveDropdown(section);
    };



    const userMouseOut = (): void => {
        setActiveDropdown(null);
    };




    if (isAdmin && location.pathname === '/admin-dashboard') return null;

    
    







    return (
        <>
            {/* LAPTOP MENU CODE */}
            <div className={`${navbarSticky ? "sticky" : ""} custom-navbar-container`}>
                <div className='custom-navbar-wrapper p-3'>
                    <Link to="/">
                        <div className="cursor-pointer w-[130px] object-contain custom-logo-navbar">
                            <img src={data?.[0]?.image || "/fallback-logo.png"} alt="Logo" />
                        </div>
                    </Link>

                    <div className="navbar-animated-hover-container custom-animated-hover-container" onMouseLeave={userMouseOut}>
                        <div className="navbar-animated-wrapper">
                            {["Programs & Sports", "Event & Workshops", "Get Involved", "Resources For Athletes", "Media & News", "Contact"].map((label) => (
                                <div
                                    onMouseEnter={() => userMouseEnter(label)}
                                    key={label}
                                    className="navbar-middle-section"
                                >
                                    <div><span>{label}</span></div>
                                    <div>{activeDropdown === label ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                                </div>
                            ))}
                        </div>

                        <div className="navbar-hover-section">
                            <div className={`dropdown-menu dropdown-menu-programs ${activeDropdown === "Programs & Sports" ? "show" : ""}`} onMouseEnter={() => userMouseEnter("Programs & Sports")} onMouseLeave={userMouseOut}>
                                <Link className="link-section" to="/offeredsports">Overview of All Sports Offered</Link>
                                <Link className="link-section" to="/football">Football</Link>
                                <Link className="link-section" to="/basketball">Basketball</Link>
                                <Link className="link-section" to="/other-sports">Other Sports (Future Expansion)</Link>
                                <Link className="link-section" to="/training">Training & Skill Development</Link>
                            </div>

                            <div className={`dropdown-menu dropdown-menu-events ${activeDropdown === "Event & Workshops" ? "show" : ""}`} onMouseEnter={() => userMouseEnter("Event & Workshops")} onMouseLeave={userMouseOut}>
                                <Link className="link-section" to="/events">Upcoming Events Calendar</Link>
                                <Link className="link-section" to="/athletics">Athletic Training Camps</Link>
                                <Link className="link-section" to="/network">Mentorship & Networking Workshops</Link>
                                <Link className="link-section" to="/outreach">Community Outreach & Volunteer Events</Link>
                                <Link className="link-section" to="/event-registration">Event Registration</Link>
                            </div>

                            <div className={`dropdown-menu dropdown-menu-intelligent ${activeDropdown === "Get Involved" ? "show" : ""}`} onMouseEnter={() => userMouseEnter("Get Involved")} onMouseLeave={userMouseOut}>
                                <Link className="link-section" to="/volunteer">Volunteer & Coaching Opportunities</Link>
                                <Link className="link-section" to="/donor">Sponsorship & Donor Information</Link>
                                <Link className="link-section" to="/partner">Partner Organizations</Link>
                                <Link className="link-section" to="/internship">Internship & Career Opportunities</Link>
                            </div>

                            <div className={`dropdown-menu dropdown-menu-resources ${activeDropdown === "Resources For Athletes" ? "show" : ""}`} onMouseEnter={() => userMouseEnter("Resources For Athletes")} onMouseLeave={userMouseOut}>
                                <Link className="link-section" to="/bio-profile">Team Members</Link>
                                <Link className="link-section" to="/academic">Scholarships & Academic Support</Link>
                                <Link className="link-section" to="/health">Nutrition & Health Tips</Link>
                                <Link className="link-section" to="/development">Training & Development Guides</Link>
                            </div>

                            <div className={`dropdown-menu dropdown-menu-media ${activeDropdown === "Media & News" ? "show" : ""}`} onMouseEnter={() => userMouseEnter("Media & News")} onMouseLeave={userMouseOut}>
                                <Link className="link-section" to="/articles">Blog & Articles</Link>
                                <Link className="link-section" to="/social">Social Media Feed Integration</Link>
                                <Link className="link-section" to="/press">Press Releases & News Coverage</Link>
                                <Link className="link-section" to="/photo">Photo & Video Gallery</Link>
                            </div>

                            <div className={`dropdown-menu dropdown-menu-contact ${activeDropdown === "Contact" ? "show" : ""}`} onMouseEnter={() => userMouseEnter("Contact")} onMouseLeave={userMouseOut}>
                                <Link className="link-section" to="/inquires">General Inquiries</Link>
                                <Link className="link-section" to="/sponsor">Partnerships & Sponsorships</Link>
                                <Link className="link-section" to="/coach">Coaching & Volunteering</Link>
                                <Link className="link-section" to="/location">Location & Social Media Links</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU - Render only on screen width <= 420px */}
            {isMobile && (
                <div className="mobile-navbar-wrapper">
                    <div className="mobile-header">
                        <Link to="/">
                            <img src={data?.[0]?.image || "/fallback-logo.png"} alt="Logo" className="mobile-logo" />
                        </Link>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-button">
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {mobileMenuOpen && (
                        <div className="mobile-menu-container">
                            {[
                                {
                                    label: "Programs & Sports",
                                    links: [
                                        ["/offeredsports", "Overview of All Sports Offered"],
                                        ["/football", "Football"],
                                        ["/basketball", "Basketball"],
                                        ["/other-sports", "Other Sports (Future Expansion)"],
                                        ["/training", "Training & Skill Development"],
                                    ],
                                },
                                {
                                    label: "Event & Workshops",
                                    links: [
                                        ["/events", "Upcoming Events Calendar"],
                                        ["/athletics", "Athletic Training Camps"],
                                        ["/network", "Mentorship & Networking Workshops"],
                                        ["/outreach", "Community Outreach & Volunteer Events"],
                                        ["/event-registration", "Event Registration"],
                                    ],
                                },
                                {
                                    label: "Get Involved",
                                    links: [
                                        ["/volunteer", "Volunteer & Coaching Opportunities"],
                                        ["/donor", "Sponsorship & Donor Information"],
                                        ["/partner", "Partner Organizations"],
                                        ["/internship", "Internship & Career Opportunities"],
                                    ],
                                },
                                {
                                    label: "Resources For Athletes",
                                    links: [
                                        ["/bio-profile", "Team Members"],
                                        ["/academic", "Scholarships & Academic Support"],
                                        ["/health", "Nutrition & Health Tips"],
                                        ["/development", "Training & Development Guides"],
                                    ],
                                },
                                {
                                    label: "Media & News",
                                    links: [
                                        ["/articles", "Blog & Articles"],
                                        ["/social", "Social Media Feed Integration"],
                                        ["/press", "Press Releases & News Coverage"],
                                        ["/photo", "Photo & Video Gallery"],
                                    ],
                                },
                                {
                                    label: "Contact",
                                    links: [
                                        ["/inquires", "General Inquiries"],
                                        ["/sponsor", "Partnerships & Sponsorships"],
                                        ["/coach", "Coaching & Volunteering"],
                                        ["/location", "Location & Social Media Links"],
                                    ],
                                },
                            ].map((section) => (
                                <div key={section.label} className="mobile-menu-section">
                                    <div className="mobile-menu-title" onClick={() => setMobileDropdown(mobileDropdown === section.label ? null : section.label)}>
                                        <span>{section.label}</span>
                                        {mobileDropdown === section.label ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </div>
                                    {mobileDropdown === section.label && (
                                        <div className="mobile-submenu">
                                            {section.links.map(([path, text]) => (
                                                <Link key={path} to={path} className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
                                                    {text}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}


        </>

        
    );
};

export default Navbar;