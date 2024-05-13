import React from "react";
import { Carousel } from "flowbite-react";

const Banner = () => {
  return (
    <div className="mt-5 mb-20">
      <div className="h-56 sm:h-64 xl:h-[700px] 2xl:h-96">
        <Carousel
          onSlideChange={(index) => console.log("onSlideChange()", index)}
        >
          <div
            className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
            style={{
              backgroundImage: "url(https://i.ibb.co/Hxd6VNK/about-img-03.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
            }}
          >
            <div className="lg:pl-[650px] text-white pl-8">
              <h1 className="lg:text-3xl font-bold text-white">
              Digital Operation 
              </h1>
              <p>Digital Opration is a technique used for thousands</p>
            </div>
          </div>
          <div
            className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/THDtFQr/banner2.webp)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
            }}
          >
            <div className="lg:pr-[400px] pl-5">
              <h1 className="text-black font-bold lg:text-3xl">
                Bringing you the Best HealthCare
              </h1>
              <p>
              Health professionals use a wide range of instruments 
              </p>
            </div>
          </div>
          <div
            className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/tsr9hww/Fotolia-26234759-Subscription-Monthly-XXL-940x380.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
            }}
          >
            <div className="lg:pr-[500px] pl-3">
              <h1 className="lg:text-3xl font-bold">
              Different Types of Doctors & <br /> Medical Specialists
              </h1>
              <p>If you're diagnosed with skin cancer, dermatologists <br /> can provide treatments</p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
