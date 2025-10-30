import React, { useState, useCallback, useEffect } from "react";
import type { Problem, FAQItem } from "./types";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  WorkflowIcon,
  SkillsIcon,
  TimeIcon,
  CommunicationIcon,
  MotivationIcon,
  QualityControlIcon,
  TeamworkIcon,
  ReportingIcon,
} from "./components/icons";

const problemsData: Problem[] = [
  {
    id: 1,
    title: "ওয়ার্কফ্লো সমস্যা",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
    points: [
      "স্পস্ট গাইডলাইন না থাকায় কাজের ধারা ভেঙে যায়।",
      "একই কাজে অনেক বার কাজ করতে সময় ও মান নষ্ট হয়।",
    ],
    icon: <WorkflowIcon className="w-8 h-8 text-white" />,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "দক্ষতার অভাব",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    points: ["ট্রেনিং এর অভাব।", "কাজের দায়িত্তের অস্পষ্টতা।"],
    icon: <SkillsIcon className="w-8 h-8 text-white" />,
    color: "from-green-500 to-green-600",
  },
  {
    id: 3,
    title: "সময় ব্যবস্থাপনার দুর্বলতা",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
    points: ["সময়মতো কাজ শেষ না হওয়া।", "কার্যকরী প্ল্যানের অভাব।"],
    icon: <TimeIcon className="w-8 h-8 text-white" />,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: 4,
    title: "কমিউনিকেশন সমস্যা",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=300&fit=crop",
    points: [
      "সুপারভাইজার ও শ্রমিকদের মধ্যে ভুল বোঝাবুঝি।",
      "এক বিভাগের কাজ অন্য বিভাগে বিলম্বিত করা।",
    ],
    icon: <CommunicationIcon className="w-8 h-8 text-white" />,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 5,
    title: "মোটিভেশন ও মনোবল হ্রাস",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
    points: [
      "কর্মীরা তাদের গুরুত্ব ও লক্ষ্য সম্পর্কে অজ্ঞ।",
      "উৎসাহমূলক পরিবেশের অভাব।",
    ],
    icon: <MotivationIcon className="w-8 h-8 text-white" />,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 6,
    title: "মান নিয়ন্ত্রণ দুর্বলতা",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
    points: ["রিওয়ার্ক ও রিপেয়ার বেশি।", "ক্লায়েন্ট কমপ্লেইনের হার বেশি।"],
    icon: <QualityControlIcon className="w-8 h-8 text-white" />,
    color: "from-red-500 to-red-600",
  },
  {
    id: 7,
    title: "টিমওয়ার্কের অভাব",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=300&fit=crop",
    points: ["সঠিক সমন্বয় এর অভাব।"],
    icon: <TeamworkIcon className="w-8 h-8 text-white" />,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: 8,
    title: "রিপোর্টিং ও ডেটা ট্র্যাকিং দুর্বলতা",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    points: ["কাজের অগ্রগতি পরিমাপ সম্ভব নয়।", "কে কী কাজ করছে, তা স্পষ্ট নয়।"],
    icon: <ReportingIcon className="w-8 h-8 text-white" />,
    color: "from-teal-500 to-teal-600",
  },
];

const faqData: FAQItem[] = [
  {
    question: '"কি?" – আমরা কি অফার করছি?',
    answer:
      "আমরা এমন একটি প্র্যাকটিকাল থিওরি প্রয়োগ করি, যা কোম্পানির অভ্যন্তরীণ অপারেশন, সময় ব্যবস্থাপনা এবং কর্মী আউটপুট সরাসরি প্রভাব ফেলে। এই থিওরির মাধ্যমে কর্মীদের আউটপুট ট্র্যাক ও অপটিমাইজ করা যায়, কমিউনিকেশন ও কো-অর্ডিনেশন উন্নত হয়, এবং অপারেশনাল ভুল ও সময় অপচয় কমে যায়।",
  },
  {
    question: '"কেন?" – আমি এটা নেব কেনো?',
    answer:
      "বর্তমান প্রতিযোগিতাপূর্ণ বাজারে টিকে থাকার জন্য দক্ষ টিম ও কার্যকর অপারেশন অপরিহার্য। আমাদের সেবার মাধ্যমে ৩০-৫০% পর্যন্ত আউটপুট বৃদ্ধি (পরীক্ষিত), নতুন ও পুরাতন কর্মীদের দক্ষতা তৈরি, এবং কাজ ব্যক্তি নির্ভর না হয়ে প্রক্রিয়া নির্ভর হয়, যা আপনার কোম্পানিকে আরও স্কেলযোগ্য করে তুলবে।",
  },
  {
    question: '"কিভাবে?" – এটা কাজ করে কিভাবে?',
    answer:
      "আমরা প্রথমে আপনার কোম্পানির কাজের ধরণ বুঝে নিই, এরপর থিওরির আলোকে একটি কাস্টমাইজড স্ট্রাকচার তৈরি করি। আমরা রিয়েল-টাইম পর্যবেক্ষণ, হাতে-কলমে প্রশিক্ষণ, এবং মাইলস্টোন ম্যানেজমেন্ট সাপোর্ট এর মাধ্যমে ৩ থেকে ৬ সপ্তাহের মধ্যে কার্যকর পরিবর্তন নিয়ে আসি।",
  },
];

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <section className={`py-16 sm:py-24 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  </section>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
    {children}
  </h2>
);

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="text-2xl font-bold">
            <span className="text-gray-800">DataSync</span>{" "}
            <span className="text-blue-600">Solution</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Home
            </a>
            <a
              href="#problems"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Service
            </a>
            <a
              href="#process"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Program
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50"
            >
              Q&A
            </a>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors duration-200">
              Contact
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#problems"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Service
              </a>
              <a
                href="#process"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Program
              </a>
              <a
                href="#faq"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Q&A
              </a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 mt-2 mx-3">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const Hero: React.FC = () => (
  <div
    className="relative h-96 md:h-[500px] bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1920&h=1080&fit=crop')",
    }}
  >
    <div className="absolute inset-0 bg-black/60"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 animate-fade-in-down">
        DataSync Solution
      </h1>
      <p
        className="text-2xl md:text-4xl font-semibold animate-fade-in-up"
        style={{ animationDelay: "0.5s" }}
      >
        কাজ নয় কৌশল বদলান
      </p>
    </div>
  </div>
);

const AboutAndGoal: React.FC = () => (
  <Section id="about" className="bg-white">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">আমরা কে?</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            একটি উদ্ভাবনী কনসালটেন্সি প্রতিষ্ঠান, যা উৎপাদনমুখী এবং
            সার্ভিস-ভিত্তিক প্রতিষ্ঠানের প্রোডাক্টিভিটি বৃদ্ধিতে বিশেষভাবে কাজ
            করে।
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            আমাদের লক্ষ্য:
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            বাংলাদেশের উৎপাদন-ভিত্তিক কোম্পানিগুলোকে তাদের আসল সম্ভাবনায় পৌঁছাতে
            সাহায্য করা।
          </p>
        </div>
      </div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=600&h=500&fit=crop"
          alt="Team discussing charts"
          className="rounded-lg shadow-2xl w-full"
        />
      </div>
    </div>
  </Section>
);

interface ProblemCardProps {
  problem: Problem;
}
const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
    <div className="relative">
      <img
        src={problem.image}
        alt={problem.title}
        className="w-full h-48 object-cover"
      />
      <div
        className={`absolute top-4 right-4 bg-gradient-to-br ${problem.color} p-3 rounded-full shadow-lg`}
      >
        {problem.icon}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-3 text-gray-800">{problem.title}</h3>
      <ul className="space-y-2 text-gray-600">
        {problem.points.map((point, index) => (
          <li key={index} className="flex items-start">
            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const CommonProblems: React.FC = () => (
  <Section id="problems">
    <SectionTitle>প্রতিষ্ঠানগুলোর সাধারণ সমস্যা</SectionTitle>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {problemsData.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  </Section>
);

const HowWeWork: React.FC = () => {
  const steps = [
    {
      title: "অবজারভেশন ও অডিট",
      description: "বর্তমান কার্যক্রম ও কাজের ধরণ পর্যবেক্ষণ।",
    },
    {
      title: "গ্যাপ অ্যানালাইসিস",
      description: "সময়, শ্রম, দক্ষতার অপচয় চিহ্নিত করা।",
    },
    {
      title: "সিস্টেম ডিজাইন ও ম্যাপিং",
      description: "কাস্টমাইজড ওয়ার্কফ্লো তৈরি।",
    },
    {
      title: "বাস্তব প্রয়োগ (Implementation)",
      description: "ধাপে ধাপে থিওরির প্রয়োগ।",
    },
    {
      title: "টিম ট্রেনিং ও মনিটরিং",
      description: "হাতে-কলমে প্রশিক্ষণ ও ৩-৬ সপ্তাহ নিয়মিত পর্যবেক্ষণ।",
    },
    {
      title: "ফলাফল",
      description:
        "কাজের ধরণে পরিবর্তন, সময় বাঁচানো, এবং আউটপুট ও মানের উন্নতি।",
    },
  ];
  return (
    <Section id="process" className="bg-white">
      <SectionTitle>আমরা কিভাবে কাজ করি?</SectionTitle>
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-lg text-gray-600 mb-12">
          আমরা বাস্তবতাভিত্তিক এবং কোম্পানির ধরণ অনুযায়ী কাস্টমাইজড একটি সেবা
          অফার করি:
        </p>
        <div className="relative">
          <div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"
            aria-hidden="true"
          ></div>
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center w-full">
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                  }`}
                >
                  <h3 className="text-xl font-bold text-blue-600 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold z-10 flex-shrink-0">
                  {index + 1}
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const FAQAccordion: React.FC<{ items: FAQItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg text-gray-800 bg-white hover:bg-gray-50 rounded-t-lg"
            >
              <span>{item.question}</span>
              <ChevronDownIcon
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="p-5 bg-white border-t border-gray-200 rounded-b-lg">
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => (
  <Section id="faq">
    <SectionTitle>আপনার জিজ্ঞাস্য</SectionTitle>
    <FAQAccordion items={faqData} />
  </Section>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white">
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
      <p>
        &copy; {new Date().getFullYear()} DataSync Solution. All rights
        reserved.
      </p>
      <p className="text-sm text-gray-400 mt-2">কাজ নয় কৌশল বদলান</p>
    </div>
  </footer>
);

export default function App() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutAndGoal />
      <CommonProblems />
      <HowWeWork />
      <FAQSection />
      <Footer />
    </main>
  );
}
