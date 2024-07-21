"use client";
import React from "react";

// SocialMedia ajustado para responsividad
const SocialMedia = () => {
  return (
    <div className="w-full flex justify-center flex-wrap gap-4 p-4">
      <div className="flex justify-center items-center m-2 w-full sm:w-1/2 md:w-1/3">
        <script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          defer
        ></script>
        <div
          className="elfsight-app-e6bcf745-1ba9-4f93-911e-4e688f47ddbd"
          data-elfsight-app-lazy
        ></div>
      </div>
      <div className="flex justify-center items-center m-2  w-full sm:w-1/2 md:w-1/3">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fthenewschool95%2F&tabs=timeline&width=340&height=1200&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="340"
          height="700"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
};

export default SocialMedia;
