"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import CapsuleSearch from "@/components/CapsuleSearch";
import Modal from "@/components/Modal";

interface Rocket {
  id: string;
  rocket_name: string;
  first_flight: string;
  description: string;
  country: string;
  cost_per_launch: number;
  active: boolean;
  height: {
    meters: number;
    feet: number;
  };
  diameter: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  wikipedia: string;
  // Add other properties as needed
}

const Home: React.FC = () => {
  const [rocketData, setRocketData] = useState<Rocket[]>([]);
  const rocketImages = [
    "https://www.universetoday.com/wp-content/uploads/2008/08/pr46.jpg",
    "https://www.spacex.com/static/images/falcon-9/F9_10.jpg",
    "https://www.spacex.com/static/images/falcon-heavy/FH_1.jpg",
    "https://www.spacex.com/vehicles/starship/assets/images/Starhip_website-crop20230126_dji_0199_01.jpg",
  ];

  const rocketFlag = [
    "https://upload.wikimedia.org/wikipedia/commons/2/2e/Flag_of_the_Marshall_Islands.svg",
    "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
  ];
  useEffect(() => {
    // Define a function to fetch search results
    const fetchRockets = async () => {
      try {
        const response = await fetch(`https://api.spacexdata.com/v3/rockets/`);
        const data = await response.json();
        setRocketData(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchRockets();
  }, []);

  const scrollToRockets = () => {
    const rocketsDiv = document.getElementById("rockets");
    if (rocketsDiv) {
      rocketsDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [selectedData, setSelectedData] = useState<Rocket | null>(null);
  const openModal = (data: Rocket) => {
    setSelectedData(data);
  };

  const closeModal = () => {
    setSelectedData(null);
  };


  return (
    <main className="flex flex-col items-center justify-between">
      <section className="bg-spacex flex flex-col items-center px-10 lg:px-24 py-5">
        <header>
          <Image src="/logo.png" alt="spacex logo" width={200} height={100} />
        </header>
        <div className="flex  flex-col items-center lg:items-start">
          <h2 className="mt-12 lg:mt-20 text-3xl lg:text-5xl lg:w-3/4 md:w-4/5 lg:text-start text-center">
            Beyond Boundaries, Among the Stars: SpaceX - Pioneering the Future
            of Space Exploration
          </h2>
          <p className="lg:text-xl lg:text-start text-center lg:w-3/5 md:w-3/5  text-lg mt-10">
            Embrace the Extraordinary: With Our Unwavering Support, Transcend
            Your Comfort Zone and Venture into the Unknown, Where Growth Awaits
            Beyond Boundaries.
          </p>
          <div className="flex lg:flex-row flex-col gap-4 mt-14 items-center">
            <button
              className="btn-spacex hover:bg-blue-900 rounded-md px-5 py-3"
              onClick={scrollToRockets}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2
          id="rockets"
          className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Our cool Rockets
        </h2>
        <div className="flex flex-col lg:flex-row min-h-full justify-center px-6 py-12 lg:px-8 gap-5 ">
          {rocketData.map((rocket, i) => (
            <div
              className="flex flex-col border rounded-md gap-2 cursor-pointer"
              key={rocket.id}
              onClick={() => openModal(rocket)}
            >
              <div
                className=""
                style={{
                  backgroundImage: `url(${rocketImages[i]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "200px",
                  height: "120px",
                  borderRadius: "6px 6px 0 0",
                }}
              />
              <div className="p-2">
                <div
                  className="rounded-full mt-[-25px]"
                  style={{
                    backgroundImage: `url(${rocketFlag[i]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "30px",
                    height: "30px",
                  }}
                />
                <p className=" mt-3 text-start font-semibold text-18 text-gray-900">
                  {rocket.rocket_name}
                </p>
                <div className="flex text-gray-600 items-center gap-1">
                  <IoCalendarOutline size={14} />
                  <p className="text-start text-sm text-gray-600">
                    {rocket.first_flight}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {selectedData && (
            <Modal rocket={selectedData} isOpen={true} onClose={closeModal} />
          )}
        </div>
      </section>
      <section>
        <CapsuleSearch />
      </section>
    </main>
  );
};

export default Home;
