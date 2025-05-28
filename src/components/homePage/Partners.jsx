import React from "react";
import Image from "next/image";

const Partners = () => {
  const partners = [
    {
      name: "Bamboo HR",
      logo: "/partnersImages/Bamboo_HR_logo.webp",
    },
    {
      name: "BNY",
      logo: "/partnersImages/BNY_logo.webp",
    },
    {
      name: "Finn",
      logo: "/partnersImages/Finn_logo.webp",
    },
    {
      name: "Bolt",
      logo: "/partnersImages/Bolt_logo.webp",
    },
    {
      name: "Fonds Finanz",
      logo: "/partnersImages/fonds-finanz.webp",
    },
    {
      name: "Tally",
      logo: "/partnersImages/tally.webp",
    },
    {
      name: "Gojob",
      logo: "/partnersImages/gojob.webp",
    },
  ];

  return (
    <div className="w-full bg-white py-8 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Mobile-first layout: 4 on top, 3 on bottom */}
        <div className="flex flex-col items-center gap-6">
          {/* First row - 4 logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 w-full">
            {partners.slice(0, 4).map((partner, index) => (
              <div key={index} className="flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={80}
                  height={40}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>

          {/* Second row - 3 logos */}
          <div className="flex justify-center items-center gap-8 md:gap-12 w-full">
            {partners.slice(4, 7).map((partner, index) => (
              <div key={index + 4} className="flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={80}
                  height={40}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
