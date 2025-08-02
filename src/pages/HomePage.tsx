import React from "react";
import landingImage from "@/assets/landingImage.png";
import downloadApp from "@/assets/downloadApp.png";

const HomePage = () => {
  return (
    <div className="felx flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Delicious meals delivered to your door</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="Landing Image" className="mt-16"/>
        <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="font-bold text-3xl tracking-tight ">
                Order takeaway even faster than eating out.
            </span>
            <span>
                Download the app and order from the best restaurants near you.
            </span>
            <img src={downloadApp} alt="Download App" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
