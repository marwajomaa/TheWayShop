import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import RoomIcon from "@material-ui/icons/Room";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import { socialIcons, information, contact } from "../../constants/SocialIcons";

import "./style.css";

const showIcon = (icon) => {
  switch (icon) {
    case "facebook":
      return <FacebookIcon />;
    case "instagram":
      return <InstagramIcon />;
    case "twitter":
      return <TwitterIcon />;
    case "linkedIn":
      return <LinkedInIcon />;
    case "whatsApp":
      return <WhatsAppIcon />;
    default:
      return null;
  }
};

const showContactIcon = (icon) => {
  switch (icon) {
    case "location":
      return <RoomIcon />;
    case "phone":
      return <PhoneIcon />;
    case "email":
      return <EmailIcon />;
    default:
      return null;
  }
};

function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_items">
        <div className="footer_item">
          <h4 className="footer_item__title">ABOUT THEWAYSHOP</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <ul className="footer_item__list">
            {socialIcons.map((icon) => {
              return (
                <Link to="#" className="footer_item__icon">
                  {showIcon(icon)}
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="footer_item">
          <h4 className="footer_item__title">INFORMATION</h4>
          <ul className="footer_item__list">
            {information.map((info) => {
              return (
                <div className="footer_item__info">
                  <Link to="#" className="footer_item__infolink">
                    {info}
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="footer_item">
          <h4 className="footer_item__title">CONTACT US</h4>
          <ul className="footer_item__list">
            {contact.map((item) => {
              return (
                <div>
                  <Link to="#" className="footer_item__contactLink">
                    {showContactIcon(item.icon)}
                    <span style={{ marginLeft: "5px" }}>
                      {item.text}: {item.address}
                    </span>
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="footer_copyright">
        All Rights Reserved. © 2018 ThewayShop Design By : html design
      </div>
    </div>
  );
}

export default Footer;
