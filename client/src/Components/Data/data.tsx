


import NPN_LOGO from '../Images/logo.png'
import SPONSOR_IMAGE from '../Images/Sponsor_image.png'
import SPONSOR_IMAGE_TWO from '../Images/Sponsor_image_two.png'
import SPONSOR_IMAGE_THREE from '../Images/Sponsor_image_three.png'
import SPONSOR_IMAGE_FIVE from '../Images/Sponsor_image_five.png'
import MISSION_IMAGE from '../Images/mission_image.png'
import FEATURES_IMAGE from '../Images/features.png'
import ABOUT_US_IMAGE from '../Images/about_us.png'
import VOLLEYBALLIMAGE from '../Images/volleyball.png'
import BASEBALLIMAGE from '../Images/baseball.png'
import FOOTBALLIMAGE from '../Images/football.png'
import BASKETBALLIMAGE from '../Images/golden-basketball.png'
import SWIMMERIMAGE from '../Images/swimmer.png'
import LEADERSHIP_IMAGE from '../Images/leadership.png'
import SUCCESS_IMAGE from '../Images/success.png'
import COMMUNITY_IMAGE from '../Images/community.png'
import GOOGLE_PAY_LOGO_IMAGE from '../Images/google_play_logo.png'
import APPLE_STORE_LOGO_IMAGE from '../Images/apple_store_logo.png'
import FOOTBALL_IMAGE from '../Images/football_image.png'
import AWAKE_IMAGE from '../Images/awake_image.png'
import SHOE_SPONSOR from '../Images/shoe_image.png'
import NEXT_UP from '../Images/next_up.png'
import Linkedin from '../Images/Linkedin.png'
import INSTAGRAM from '../Images/instagram.png'
import FB from '../Images/facebook.png'
import PHOTO from '../Images/photo.png'
import DONATION from '../Images/donation.png'
import FELIX_PHOTO from '../Images/FelixJoyner.png'
import TD_PHOTO from '../Images/CoachTNT.png'








interface Images<T> {
    image: T;
    imageTwo:T;
    imageThree:T;
    imageFour:T;
    imageFive:T;
    awakeImage:T,
    missionImage:T;
    featuresImage:T;
    aboutUsImage:T,
    volleyBallImage:T,
    baseBallImage:T,
    footballImage:T,
    basketBallImage:T,
    swimmerImage:T,
    leadershipImage:T,
    successImage:T,
    communityImage:T,
    googlePayImage:T,
    appleStoreImage:T,
    footBallPlayersImage:T,
    shoeSponsorImage:T,
    nextUpImage:T,
    instagramImage:T,
    fbImage:T,
    linkedinImage:T,
    photoImage:T,
    donationImage:T,
    felixImage:T,
    tdImage:T,
  
}



const data:Images<string>[] = [
    { 
        image: NPN_LOGO,
        imageTwo:SPONSOR_IMAGE,
        imageThree:SPONSOR_IMAGE_TWO,
        imageFour:SPONSOR_IMAGE_THREE,
        imageFive:SPONSOR_IMAGE_FIVE,
        missionImage:MISSION_IMAGE,
        featuresImage:FEATURES_IMAGE,
        aboutUsImage:ABOUT_US_IMAGE,
        volleyBallImage:VOLLEYBALLIMAGE,
        baseBallImage: BASEBALLIMAGE,
        footballImage: FOOTBALLIMAGE,
        basketBallImage:BASKETBALLIMAGE,
        swimmerImage:SWIMMERIMAGE,
        leadershipImage:LEADERSHIP_IMAGE,
        successImage:SUCCESS_IMAGE,
        communityImage:COMMUNITY_IMAGE,
        googlePayImage:GOOGLE_PAY_LOGO_IMAGE,
        appleStoreImage:APPLE_STORE_LOGO_IMAGE,
        footBallPlayersImage:FOOTBALL_IMAGE,
        awakeImage: AWAKE_IMAGE,
        shoeSponsorImage: SHOE_SPONSOR,
        nextUpImage: NEXT_UP,
        instagramImage:INSTAGRAM,
        fbImage:FB,
        linkedinImage:Linkedin,
        photoImage: PHOTO,
        donationImage: DONATION,
        felixImage:FELIX_PHOTO,
        tdImage: TD_PHOTO

    }
]






export { data }