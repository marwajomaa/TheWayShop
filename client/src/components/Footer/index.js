import React from "react";
import "./style.css";

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
                <Link to="#">
                  <li key={icon}>{icon}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="footer_item">
          <h4 className="footer_item__title">INFORMATION</h4>
        </div>
        <div className="footer_item">
          <h4 className="footer_item__title">CONTACT US</h4>
        </div>
      </div>

      <div className="footer_copyright">copyright@</div>
    </div>
  );
}

export default Footer;
