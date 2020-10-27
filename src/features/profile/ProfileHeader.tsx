import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProfile } from "./profileSlice";

import blogIcon from '../../assets/icons/blog-icon.svg';
import facebookIcon from '../../assets/icons/facebook-grey-icon.svg';
import googleIcon from '../../assets/icons/google-icon.svg';
import linkedinIcon from '../../assets/icons/linkedin-icon.svg';
import twitterIcon from '../../assets/icons/twitter-grey-icon.svg';
import websiteIcon from '../../assets/icons/website-icon.svg';
import youtubeIcon from '../../assets/icons/youtube-icon.svg';
import ProfileDefaultAvatar from "../../components/Svgs/ProfileDefaultAvatar";
import { Link } from "react-router-dom";

const icons: {[index: string]: string} = {
  blog: blogIcon,
  facebook: facebookIcon,
  google: googleIcon,
  linkedin: linkedinIcon,
  twitter: twitterIcon,
  website: websiteIcon,
  youtube: youtubeIcon
};

const ProfileHeader: React.FC = () => {
  const profile = useSelector(selectProfile);
  const [hatName, setHatName] = useState("");
  const [hatDomain, setHatDomain] = useState("");
  
  useEffect(() => {
    const host = window.location.hostname;

    setHatName(host.substring(0, host.indexOf('.')));
    setHatDomain(host.substring(host.indexOf('.') + 1));
  }, []);
    
  return (
    <div className={'profile-header'}>
      <div className={'profile-header-box'}>
        <div className={'profile-header-photo-container'}>
          {!profile?.data.photo && <ProfileDefaultAvatar />}

          {profile?.data.photo.avatar && <img src={profile.data.photo.avatar} alt={'Profile avatar'} /> }
        </div>

        <div className={'profile-header-link-to-public'}>
          <Link to={'/public/profile'}>
            <i className={'material-icons'}>exit_to_app</i>
          </Link>
        </div>

        <div className="profile-header-hat-domain-wrapper">
          <div className="hat-name">
            {hatName}
          </div>

          <div className="hat-domain">
          .{hatDomain}
          </div>
        </div>

        <p>
          {profile?.data.online &&
            <span className={'profile-header-social-links'}>
              {Object.entries(profile.data.online).map(([key, value], index) => {
                if (!value) return null;

                return <a href={value} target={'_blank'} rel="noopener noreferrer" key={key + index}>
                  <img src={icons[key]} alt={`${ key } social link`}/>
                </a>;
              })}
            </span>
          }
        </p>
      </div>
    </div>
  );
};
export default ProfileHeader;
