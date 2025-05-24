import React, { useState } from 'react';

// --- Icon Components (from previous version, for a more polished look) ---
const ChevronDownIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className} transition-transform duration-300`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const LeafIcon = ({ className = "w-8 h-8 text-green-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

const MagnifyingGlassIcon = ({ className = "w-10 h-10 text-green-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const SecurePaymentIcon = ({ className = "w-10 h-10 text-green-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

const ChartBarIcon = ({ className = "w-10 h-10 text-green-700" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 9.75 19.875V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const ExpertIcon = ({ className = "w-10 h-10 text-green-700" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);


export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Plans', href: '#plans' },
    { name: 'FAQs', href: '#faqs' },
  ];

  const howItWorksSteps = [
    {
      id: 1,
      icon: MagnifyingGlassIcon,
      title: 'Choose a Plan',
      description: 'Select a plan that suits your budget and goals. Browse our curated selection of impactful agricultural projects.',
    },
    {
      id: 2,
      icon: SecurePaymentIcon,
      title: 'Fund Investment',
      description: 'Make secure payments and allocate your capital. Your investment directly supports real farm ventures.',
    },
    {
      id: 3,
      icon: ChartBarIcon,
      title: 'Watch Growth',
      description: 'Track your farm investments and ROI in real-time through your personal dashboard. Watch your financial future flourish.',
    },
  ];

  const whyAgriVestFeatures = [
      { title: 'Secure Transactions', description: 'Bank-level security for all your investments.', icon: SecurePaymentIcon },
      { title: 'Transparent ROI', description: 'View accurate and timely earnings reports.', icon: ChartBarIcon },
      { title: 'Real-Time Tracking', description: 'Follow your farm’s progress from anywhere.', icon: MagnifyingGlassIcon }, // Re-using, consider a unique icon
      { title: 'Backed by Experts', description: 'Each farm is vetted by agricultural and financial professionals.', icon: ExpertIcon },
  ];

  const investmentPlans = [
    { id: 'starter', name: 'Starter Farm', roi: 'Up to 15%', minInvestment: '$100', duration: "12 Months", details: 'Ideal for first-time green investors. Diversified across low-risk crops like maize and vegetables. Lower risk, steady returns.', color: "bg-green-100", textColor: "text-green-800", buttonColor: "bg-green-600 hover:bg-green-700" },
    { id: 'growth', name: 'Growth Orchard', roi: 'Up to 25%', minInvestment: '$500', duration: "24 Months", details: 'Focus on high-yield fruit orchards (e.g., mangoes, avocados) with medium-term growth potential. Balanced risk-reward.', color: "bg-emerald-100", textColor: "text-emerald-800", buttonColor: "bg-emerald-600 hover:bg-emerald-700" },
    { id: 'premium', name: 'Premium Livestock', roi: 'Up to 35%', minInvestment: '$1000', duration: "36 Months", details: 'Invest in sustainable livestock farming (e.g., poultry, fishery) for premium returns. Higher potential, managed risk.', color: "bg-teal-100", textColor: "text-teal-800", buttonColor: "bg-teal-600 hover:bg-teal-700" },
  ];

  const faqsData = [
    {
      question: 'What is AgriVest?',
      answer: 'AgriVest is a fintech platform that connects investors with curated agricultural projects, allowing you to invest in sustainable farming and earn returns while making a positive impact on food security and rural livelihoods.',
    },
    {
      question: 'How is my investment secured?',
      answer: 'We partner with established farms and cooperatives, implement rigorous due diligence, and utilize secure payment gateways. All projects are vetted for viability, sustainability, and potential risks. While all investments carry inherent risks, we prioritize transparency and risk mitigation strategies.',
    },
    {
      question: 'How can I track my ROI and investment progress?',
      answer: 'Once you invest, you will gain access to a personalized dashboard on the AgriVest platform. This dashboard will provide real-time updates on your investment performance, ROI calculations, farm progress reports, and payout schedules.',
    },
    {
      question: 'What are the typical investment terms and payout frequencies?',
      answer: 'Investment terms (duration, minimum investment, expected ROI) vary by project and plan. These details are clearly outlined for each investment opportunity. Payouts are typically disbursed quarterly or semi-annually, depending on the agricultural cycle of the specific project.',
    },
    {
      question: 'Are there any fees involved?',
      answer: 'AgriVest charges a small percentage-based management fee on the profits generated from your investment. This fee structure ensures that we are aligned with your success. All fees are transparently disclosed before you make an investment.',
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };


  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-md sticky top-0 bg-white z-50">
        <a href="/" className="flex items-center space-x-2">
          {/* **IMPORTANT**: Place your logo (e.g., agrivest-logo.jpg) in the `public` folder of your Next.js project */}
          <img src="/agrivest-logo.jpg" alt="AgriVest Logo" className="h-10 w-auto" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x40/2E7D32/FFFFFF?text=AgriVest&font=sans')} />
          <span className="text-2xl font-bold text-green-700">AgriVest</span>
        </a>
        <nav className="hidden md:flex space-x-6 text-sm font-medium items-center">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="hover:text-green-700 transition-colors duration-300">{link.name}</a>
          ))}
          {/* TODO: Replace with Next/Link for client-side navigation if this is a Next.js app */}
          <a href="/signin" className="text-gray-600 hover:text-green-700 transition-colors duration-300">Sign In</a>
          <a href="/signup" className="bg-green-600 text-white px-5 py-2.5 rounded-full hover:bg-green-700 transition-colors duration-300 text-sm font-semibold">Get Started</a>
        </nav>
        <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-green-700 focus:outline-none">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
          <div className="md:hidden absolute top-[76px] left-0 right-0 bg-white shadow-xl z-40 pb-4">
            <nav className="flex flex-col space-y-2 px-6 py-4">
                {navLinks.map(link => (
                    <a key={link.name} href={link.href} className="block py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors duration-300" onClick={() => setMobileMenuOpen(false)}>{link.name}</a>
                ))}
                <a href="/signin" className="block py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors duration-300" onClick={() => setMobileMenuOpen(false)}>Sign In</a>
                <a href="/signup" className="mt-2 w-full text-center bg-green-600 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-green-700 transition-colors duration-300">
                    Get Started
                </a>
            </nav>
          </div>
        )}


      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 md:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-800 leading-tight">
            Invest in Agriculture. <span className="block md:inline">Grow Your Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            AgriVest helps you fund, track, and profit from real-time farm-based projects. Join us in cultivating sustainable growth and impactful returns.
          </p>
          <a href="/signup" className="inline-block bg-green-600 text-white px-8 py-3.5 rounded-full text-lg font-semibold hover:bg-green-700 transition-transform duration-300 transform hover:scale-105 shadow-lg">
            Explore Plans & Get Started
          </a>
        </div>
        {/* **IMPORTANT**: Place your hero image (e.g., hero-farm-illustration.svg) in the `public` folder */}
        <img 
            src="/hero-image.svg" 
            alt="Illustration of a thriving farm with financial growth symbols" 
            className="w-full md:w-1/2 lg:w-2/5 mt-10 md:mt-0 rounded-lg"
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400/E0F2F1/00796B?text=Future+of+Farming&font=sans')} 
        />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 md:px-20 py-16 md:py-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-16">How AgriVest Works</h2>
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 text-center">
          {howItWorksSteps.map((step) => (
            <div key={step.id} className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 bg-green-100 rounded-full mb-5">
                <step.icon className="w-12 h-12 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Investment Plans Section */}
      <section id="plans" className="px-6 md:px-20 py-16 md:py-20 bg-green-50">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Explore Our Investment Plans</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Choose a plan that aligns with your financial goals and contributes to sustainable agriculture.
            </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentPlans.map((plan) => (
              <div key={plan.id} className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col border-t-4 ${plan.textColor.replace('text-', 'border-')}`}>
                <div className={`mb-4 p-3 rounded-full self-start ${plan.color}`}>
                    <LeafIcon className={`w-8 h-8 ${plan.textColor}`} />
                </div>
                <h3 className={`text-2xl font-semibold ${plan.textColor} mb-2`}>{plan.name}</h3>
                <p className="text-3xl font-bold text-gray-800 mb-1">{plan.roi}</p>
                <p className="text-sm text-gray-500 mb-3">Projected Monthly ROI</p>
                <p className="text-gray-700 mb-1"><span className="font-semibold">Min. Investment:</span> {plan.minInvestment}</p>
                <p className="text-gray-700 mb-4"><span className="font-semibold">Duration:</span> {plan.duration}</p>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{plan.details}</p>
                <a href={`/signup?plan=${plan.id}`} className={`mt-auto ${plan.buttonColor} text-white text-center font-semibold py-3 px-6 rounded-lg transition duration-300 w-full block`}>
                  Invest in {plan.name}
                </a>
              </div>
            ))}
        </div>
      </section>

      {/* Why AgriVest Section */}
      <section id="why-agrivest" className="px-6 md:px-20 py-16 md:py-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-16">Why Choose AgriVest?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyAgriVestFeatures.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center">
               <div className="p-3 bg-green-100 rounded-full mb-4">
                <feature.icon className="w-10 h-10 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* FAQs Section */}
      <section id="faqs" className="px-6 md:px-20 py-16 md:py-20 bg-green-50">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Find answers to common questions about investing with AgriVest.
            </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-xl">
            {faqsData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center py-5 text-left text-lg font-medium text-gray-700 hover:text-green-700 focus:outline-none"
                >
                  <span className="flex-1">{faq.question}</span>
                  <ChevronDownIcon className={`w-6 h-6 text-green-600 transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="pb-5 pt-2 text-gray-600 leading-relaxed text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <a href="/" className="flex items-center space-x-2 mb-3">
                <img src="/agrivest-logo.jpg" alt="AgriVest Logo" className="h-8 w-auto brightness-0 invert" onError={(e) => (e.currentTarget.style.display = 'none')} />
                 {/* Fallback text if image fails and onError hides it */}
                <span className="text-xl font-bold text-white">AgriVest</span>
              </a>
              <p className="text-sm text-gray-400">Invest in Agriculture. Grow Your Future.</p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-white mb-3 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-green-400 transition">How It Works</a></li>
                <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Careers</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-white mb-3 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#plans" className="hover:text-green-400 transition">Investment Plans</a></li>
                <li><a href="#faqs" className="hover:text-green-400 transition">FAQs</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Risk Disclosure</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-white mb-3 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Terms of Service</a></li>
              </ul>
              {/* Add social media icons here later */}
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} AgriVest. All rights reserved. Cultivating a prosperous and sustainable future.</p>
            <p className="mt-1">Remember: All investments carry risk. Please invest responsibly.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
