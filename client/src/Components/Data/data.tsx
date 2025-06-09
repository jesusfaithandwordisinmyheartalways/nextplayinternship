

const NPN_LOGO = 'logo.png';
const SPONSOR_IMAGE = 'sponsor_image.png';
const SPONSOR_IMAGE_TWO = 'sponsor_image_two.png';
const SPONSOR_IMAGE_THREE = 'sponsor_image_three.png';
const SPONSOR_IMAGE_FIVE = 'sponsor_image_five.png';
const MISSION_IMAGE = 'mission_image.png';
const FEATURES_IMAGE = 'features.png';
const ABOUT_US_IMAGE = 'about_us.png';
const VOLLEYBALLIMAGE = 'volleyball.png';
const BASEBALLIMAGE = 'baseball.png';
const FOOTBALLIMAGE = 'football.png';
const BASKETBALLIMAGE = 'golden-basketball.png';
const SWIMMERIMAGE = 'swimmer.png';
const LEADERSHIP_IMAGE = 'leadership.png';
const SUCCESS_IMAGE = 'success.png';
const COMMUNITY_IMAGE = 'community.png';
const GOOGLE_PAY_LOGO_IMAGE = 'google_play_logo.png';
const APPLE_STORE_LOGO_IMAGE = 'apple_store_logo.png';
const FOOTBALL_IMAGE = 'football_image.png';
const AWAKE_IMAGE = 'awake_image.png';
const SHOE_SPONSOR = 'shoe_image.png';
const NEXT_UP = 'next_up.png';
const Linkedin = 'Linkedin.png';
const INSTAGRAM = 'instagram.png';
const FB = 'facebook.png';
const PHOTO = 'photo.png';
const DONATION = 'donation.png';
const FELIX_PHOTO = 'FelixJoyner.png';
const TD_PHOTO = 'CoachTNT.png';



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