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
            <div className="lg:pr-[650px]">
              <h1 className="text-3xl font-bold">
                Best Mordern Handmade <br />& Craft art Colllection{" "}
              </h1>
              <p>Designed by artists, made by us, just for you.</p>
            </div>
          </div>
          <div
            className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/CVpFBg2/Fotolia-37550732-Subscription-Monthly-XXL-940x380.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "100%",
            }}
          >
            <div>
              <h1 className="text-black font-bold text-3xl">
                Handmade with patience and love <br /> for the artisanal craft
              </h1>
              <p>
                Engage in family-friendly crafting activities, with step-by-step
                guides
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
            <div className=" text-white">
              <h1 className="text-3xl font-bold">
                Pamper Yourself with Handmade Bath <br /> and Beauty Products
              </h1>
              <p>Explore the intersection of crafting and culinary arts</p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
