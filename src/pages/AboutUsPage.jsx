import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData4 from "./AnimationIcons.json";
import "./AboutUsPage.css";

const AboutUsPage = () => {
  const animationContainerRef = useRef(null);

  useEffect(() => {
    if (animationContainerRef.current) {
      const anim = lottie.loadAnimation({
        container: animationContainerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData4,
      });
      anim.setSpeed(0.2);

      return () => anim.destroy();
    }
  }, []);
  return (
    <div>
      {}
      <div className="about-us-content">
        <h1>About Us</h1>
        <p>
          This business app is a marketplace where you can buy and sell
          products. Once registered, you can create your own card to sell your
          products. Try it now! We believe that trading is more than just buying
          and selling; it's a way of life. Therefore, we created this app.
        </p>

        <h2>Operating Instructions</h2>
        <p>
          To navigate and utilize this app effectively, here are the
          instructions:
        </p>
        <ul>
          <li>
            <strong>Homepage:</strong> View all the cards available for buying
            or selling.
          </li>
          <li>
            <strong>About Us:</strong> Information about the business and app
            usage guidance.
          </li>
          <li>
            <strong>Register/Login Page:</strong> Where you can register or log
            into the app.
          </li>
          <li>
            <strong>Liked Page:</strong> Displays all the cards you have liked.
            (Only registered users can access this page)
          </li>
          <li>
            <strong>My Cards:</strong> Shows all the cards you have created.
            (Only registered business users can access this page)
          </li>
          <li>
            <strong>Create New Card:</strong> Allows you to create a new card.
            (Only registered business users can access this page)
          </li>
          <li>
            <strong>Sandbox:</strong> Accessible only by admins, here you can
            follow user activities, change their status, and delete them.
          </li>
        </ul>
        <p>
          Every these actions are also available on the left drawer as well as
          the footer navigation bar, making it convenient for you to navigate
          through the app from anywhere.
        </p>
        <p>
          Every major action within the app will prompt a confirmation message.
          After three unsuccessful attempts to connect to the server, the app
          will block the user for 24 hours to ensure security.
        </p>

        <h2>Our Story</h2>
        <p>
          Founded by Oran Meir, our company has only been operational for a few
          years but has already experienced tremendous success stories. We look
          forward to working with you.
        </p>

        <h2>Contact Us</h2>
        <p>
          For support or inquiries about this app, feel free to call us at any
          time: <strong>050-33333574</strong>.
        </p>
      </div>

      {}
      <div ref={animationContainerRef} className="animation-container"></div>
    </div>
  );
};

export default AboutUsPage;
