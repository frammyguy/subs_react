import React from "react";
import "./about.sass";

export default function About() {
  return (
    <div className="about">
      <div className="about_text">
        <h1>Our Story</h1>
        <div className="about_text_desc">
          Exoy was born in 2020 when Maksim Rolscikovs, a young entrepreneur
          from Latvia, decided to change the game in lighting. We started
          selling Infinity Lighting on Etsy and worked hard to build a solid
          reputation, earning an average of 4-star reviews. Our innovative ideas
          came to life in Latvia where we created all our products by ourselves.
          But in 2023, we decided to spread our wings and moved to the
          Netherlands. Here, we started working on an even more advanced LED
          Dodecahedron. At Exoy, we're a blend of young energy and professional
          know-how, thanks to our partnership with Dutch lighting experts from
          Stogger. Their expertise and our passion help us make truly unique and
          exciting products. But the real fuel for our journey comes from you -
          your ideas, your feedback. Our main market is in the US, and we're
          keen to build strong relationships there. We're launching a
          Kickstarter campaign in September, with delivery set for Christmas. We
          can't wait to share our newest creation with you.
        </div>
      </div>
      <div className="about_img">
        <img
          src="https://uploads-ssl.webflow.com/64a288e8c9120baf1b2a3e44/64c531876741cb0bb1aab232_AID_5659.webp"
          alt="random spotify office pic"
        />
        <div className="about_img_desc">`Working in spotify alike`</div>
      </div>
    </div>
  );
}
