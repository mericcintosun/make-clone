import React from "react";

const PlatformBenefits = () => {
  const AutomationIcon = () => (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="30" fill="url(#automation-gradient)" />
      <path
        d="M30 18L33.5 21.5L30 25L26.5 21.5L30 18Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
      />
      <circle cx="30" cy="30" r="4" fill="white" />
      <path
        d="M42 30L38.5 26.5L35 30L38.5 33.5L42 30Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M18 30L21.5 33.5L25 30L21.5 26.5L18 30Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M30 42L26.5 38.5L30 35L33.5 38.5L30 42Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient
          id="automation-gradient"
          x1="0"
          y1="0"
          x2="60"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );

  const GrowthIcon = () => (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="30" fill="url(#growth-gradient)" />
      <path
        d="M20 35L35 20L40 25L35 30L45 20L45 30L35 30"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 22L43 22L43 28"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="growth-gradient"
          x1="0"
          y1="0"
          x2="60"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
      </defs>
    </svg>
  );

  const CollaborationIcon = () => (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="30" fill="url(#collaboration-gradient)" />
      <path
        d="M25 28C25 28 27 30 30 30C33 30 35 28 35 28C35 28 37 26 40 26C42 26 42 28 42 30C42 32 40 34 37 34H23C20 34 18 32 18 30C18 28 20 26 22 26C25 26 25 28 25 28Z"
        fill="white"
      />
      <circle cx="23" cy="22" r="3" fill="white" />
      <circle cx="37" cy="22" r="3" fill="white" />
      <path
        d="M28 38L32 42L28 46"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="collaboration-gradient"
          x1="0"
          y1="0"
          x2="60"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#9333EA" />
        </linearGradient>
      </defs>
    </svg>
  );

  const benefits = [
    {
      icon: <AutomationIcon />,
      title: "Your automation headquarters",
      description:
        "Visualize and build at speed - whether setting up a single process or transforming your entire business model.",
    },
    {
      icon: <GrowthIcon />,
      title: "Visible and scalable impact",
      description:
        "From automating processes to managing intelligent AI agents, Make's visual platform gives you the power to speed innovation.",
    },
    {
      icon: <CollaborationIcon />,
      title: "A powerful collaboration engine",
      description:
        "With visual-first automation, teams can collaborate to design, refine, deploy and put AI to work faster.",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-6">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-12 leading-tight">
        Visualize a more productive
        <br />
        future with Make + AI
      </h1>

      <div className="space-y-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="w-[90%] mx-auto bg-gray-50 rounded-2xl p-8 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex-shrink-0">{benefit.icon}</div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {benefit.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformBenefits;
