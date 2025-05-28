"use client";

import { useState } from "react";
import clsx from "clsx";

// Department content data
const departmentContent = {
  IT: {
    title: "IT",
    description: "Streamline your IT operations and enhance security by connecting all your systems and teams with automated workflows and real-time monitoring tools.",
    ctaText: "Automate IT Operations",
    image: "/DepartmantImages/IT.webp",
    features: [
      {
        icon: "🔒",
        title: "Security Monitoring",
        description: "Real-time threat detection"
      },
      {
        icon: "⚡",
        title: "System Integration",
        description: "Connect all your tools"
      }
    ],
    bottomText: "Respond to new security threats thanks to 2,000+ pre-built apps - and enjoy the flexibility of integrating anything with an API"
  },
  Operations: {
    title: "Operations",
    description: "Keep your operations running smoothly across siloed systems by connecting your teams and the key project management and data synchronization tools that your business relies on.",
    ctaText: "Automate Operations",
    image: "/DepartmantImages/Operations_.webp",
    features: [
      {
        icon: "📊",
        title: "Watch for new rows",
        description: "Monitor data changes"
      },
      {
        icon: "📤",
        title: "Export to database",
        description: "Sync your data automatically"
      }
    ],
    bottomText: "Respond to new market demands thanks to 2,000+ pre-built apps - and enjoy the flexibility of integrating anything with an API"
  },
  Marketing: {
    title: "Marketing",
    description: "Accelerate your marketing campaigns and improve ROI by automating lead nurturing, social media management, and campaign analytics across all your marketing platforms.",
    ctaText: "Automate Marketing",
    image: "/DepartmantImages/Marketing_.webp",
    features: [
      {
        icon: "📈",
        title: "Campaign Analytics",
        description: "Track performance metrics"
      },
      {
        icon: "🎯",
        title: "Lead Management",
        description: "Automate lead nurturing"
      }
    ],
    bottomText: "Scale your marketing efforts thanks to 2,000+ pre-built apps - and enjoy the flexibility of integrating anything with an API"
  },
  Sales: {
    title: "Sales",
    description: "Boost your sales performance and close more deals by automating lead qualification, follow-ups, and CRM updates across your entire sales pipeline.",
    ctaText: "Automate Sales",
    image: "/DepartmantImages/sales-automation.webp",
    features: [
      {
        icon: "💰",
        title: "Deal Tracking",
        description: "Monitor sales pipeline"
      },
      {
        icon: "📞",
        title: "Follow-up Automation",
        description: "Never miss a lead"
      }
    ],
    bottomText: "Convert more leads thanks to 2,000+ pre-built apps - and enjoy the flexibility of integrating anything with an API"
  },
  Finance: {
    title: "Finance",
    description: "Streamline your financial processes and ensure accuracy by automating invoice processing, expense tracking, and financial reporting across all departments.",
    ctaText: "Automate Finance",
    image: "/DepartmantImages/Finance___1_.webp",
    features: [
      {
        icon: "📋",
        title: "Invoice Processing",
        description: "Automate billing workflows"
      },
      {
        icon: "💳",
        title: "Expense Tracking",
        description: "Monitor company spending"
      }
    ],
    bottomText: "Optimize financial operations thanks to 2,000+ pre-built apps - and enjoy the flexibility of integrating anything with an API"
  },
  "Customer Experience": {
    title: "Customer Experience",
    description: "Deliver exceptional customer service and support by connecting your helpdesk, communication tools, and customer data to provide seamless experiences.",
    ctaText: "Enhance Customer Experience",
    image: "/DepartmantImages/Customer_Support.webp",
    features: [
      {
        icon: "🎧",
        title: "Support Tickets",
        description: "Manage customer issues"
      },
      {
        icon: "💬",
        title: "Live Chat Integration",
        description: "Real-time customer support"
      }
    ],
    bottomText: "Improve customer satisfaction thanks to 2,000+ pre-built apps - and enjoy the flexibility of integrating anything with an API"
  },
  People: {
    title: "People",
    description: "Optimize your HR processes and employee experience by automating onboarding, performance tracking, and communication workflows across your organization.",
    ctaText: "Automate HR Processes",
    image: "/DepartmantImages/People.webp",
    features: [
      {
        icon: "👥",
        title: "Employee Onboarding",
        description: "Streamline new hire process"
      },
      {
        icon: "📊",
        title: "Performance Tracking",
        description: "Monitor team productivity"
      }
    ],
    bottomText: "Enhance employee experience thanks to 2,000+ pre-built apps - and enjoy the flexibility of integrating anything with an API"
  }
};

// App categories for each department
const appCategories = {
  IT: [
    {
      name: "Slack",
      icon: "💬",
      color: "bg-purple-500",
      description: "Team communication"
    },
    {
      name: "AWS",
      icon: "☁️",
      color: "bg-orange-500",
      description: "Cloud infrastructure"
    },
    {
      name: "GitHub",
      icon: "📝",
      color: "bg-gray-800",
      description: "Code repository"
    }
  ],
  Operations: [
    {
      name: "monday.com",
      icon: "📊",
      color: "bg-pink-500",
      description: "Project management"
    },
    {
      name: "Trello",
      icon: "📋",
      color: "bg-blue-500",
      description: "Task organization"
    },
    {
      name: "Asana",
      icon: "✅",
      color: "bg-red-500",
      description: "Team collaboration"
    }
  ],
  Marketing: [
    {
      name: "HubSpot",
      icon: "🎯",
      color: "bg-orange-500",
      description: "Marketing automation"
    },
    {
      name: "Mailchimp",
      icon: "📧",
      color: "bg-yellow-500",
      description: "Email marketing"
    },
    {
      name: "Google Analytics",
      icon: "📈",
      color: "bg-blue-600",
      description: "Web analytics"
    }
  ],
  Sales: [
    {
      name: "Salesforce",
      icon: "💼",
      color: "bg-blue-500",
      description: "CRM platform"
    },
    {
      name: "Pipedrive",
      icon: "📊",
      color: "bg-green-500",
      description: "Sales pipeline"
    },
    {
      name: "Zoom",
      icon: "🎥",
      color: "bg-blue-400",
      description: "Video conferencing"
    }
  ],
  Finance: [
    {
      name: "QuickBooks",
      icon: "💰",
      color: "bg-green-600",
      description: "Accounting software"
    },
    {
      name: "Stripe",
      icon: "💳",
      color: "bg-purple-600",
      description: "Payment processing"
    },
    {
      name: "Xero",
      icon: "📊",
      color: "bg-blue-500",
      description: "Financial management"
    }
  ],
  "Customer Experience": [
    {
      name: "Zendesk",
      icon: "🎧",
      color: "bg-green-500",
      description: "Customer support"
    },
    {
      name: "Intercom",
      icon: "💬",
      color: "bg-blue-500",
      description: "Customer messaging"
    },
    {
      name: "Freshdesk",
      icon: "📞",
      color: "bg-orange-500",
      description: "Help desk software"
    }
  ],
  People: [
    {
      name: "BambooHR",
      icon: "👥",
      color: "bg-green-500",
      description: "HR management"
    },
    {
      name: "Workday",
      icon: "📋",
      color: "bg-orange-500",
      description: "Human capital management"
    },
    {
      name: "Slack",
      icon: "💬",
      color: "bg-purple-500",
      description: "Team communication"
    }
  ]
};

/**
 * A vertical tab navigation for department-based feature pages.
 *
 * @example
 * ```jsx
 * <DepartmentalNav onChange={console.log} />
 * ```
 */
export default function DepartmentalNav({
  items = [
    "IT",
    "Operations",
    "Marketing",
    "Sales",
    "Finance",
    "Customer Experience",
    "People",
  ],
  onChange,
}) {
  const [active, setActive] = useState(items[0]);

  const handleSelect = (label) => {
    setActive(label);
    onChange?.(label);
  };

  const currentContent = departmentContent[active];
  const currentApps = appCategories[active] || [];

  return (
    <div
      className="w-full max-w-6xl mx-auto pt-12 pb-16"
    >
      {/* Header Section */}
      <div className="text-center mb-12 w-[90%] mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
          Accelerate innovation across your business
        </h2>
        <p className="text-md text-slate-600 max-w-3xl mx-auto">
          Make drives efficiencies, solves problems and speeds innovation by
          breaking down silos across your business
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 px-6">
        {/* Navigation */}
        <div className="lg:w-1/3">
          <nav
            role="tablist"
            aria-label="Departments"
            className="w-full max-w-md mx-auto lg:mx-0 select-none"
          >
            <ul className="space-y-3">
              {items.map((label) => {
                const isActive = active === label;
                return (
                  <li key={label} className="relative">
                    <button
                      role="tab"
                      aria-selected={isActive}
                      className={clsx(
                        "w-full text-center font-semibold tracking-tight py-2 focus:outline-none transition-colors duration-150",
                        isActive
                          ? "text-fuchsia-600"
                          : "text-zinc-900 hover:text-fuchsia-600"
                      )}
                      onClick={() => handleSelect(label)}
                    >
                      {label}
                    </button>

                    {/* underline */}
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "absolute inset-x-0 bottom-0 h-1 transition-colors duration-150",
                        isActive ? "bg-fuchsia-600" : "bg-zinc-200"
                      )}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            {/* Department Title */}
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {currentContent.title}
            </h3>

            {/* Description */}
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {currentContent.description}
            </p>

            {/* CTA Button */}
            <button className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:from-fuchsia-600 hover:to-purple-700 transition-all duration-200 mb-12">
              {currentContent.ctaText}
            </button>

            {/* Image */}
            <div className="mb-8">
              <img
                src={currentContent.image}
                alt={`${currentContent.title} workflow`}
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>

            {/* Bottom Text */}
            <div className="pt-8">
              <p className="text-lg text-slate-700 leading-relaxed">
                {currentContent.bottomText}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Apps Section */}
      <div className="mt-16 text-center">
        <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
          {currentApps.map((app, index) => (
            <div 
              key={app.name}
              className="flex flex-col items-center"
            >
              <div className={clsx(
                "w-16 h-16 rounded-full flex items-center justify-center mb-3",
                app.color
              )}>
                <span className="text-2xl">{app.icon}</span>
              </div>
              <h4 className="font-semibold text-slate-900 text-center">
                {app.name}
                <br/>
                <span className="text-sm text-slate-600">{app.description}</span>
              </h4>
            </div>
          ))}
        </div>

        {/* Dots indicator - representing departments */}
        <div className="flex justify-center gap-2 mb-8">
          {items.map((department, index) => (
            <button
              key={department}
              className={clsx(
                "w-3 h-3 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer",
                active === department ? "bg-fuchsia-600" : "bg-slate-300 hover:bg-slate-400"
              )}
              onClick={() => handleSelect(department)}
              aria-label={`Show ${department} apps`}
            />
          ))}
        </div>

        {/* Browse apps button */}
        <button className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold px-12 py-4 rounded-full hover:from-fuchsia-600 hover:to-purple-700 transition-all duration-200 text-lg">
          Browse apps
        </button>
      </div>
    </div>
  );
}
