"use client";
import { useState, useEffect, useRef } from "react";
import {
  Users,
  Building,
  Award,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Clock,
  Truck,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState({
    cities: 0,
    products: 0,
    customers: 0,
    deliveries: 0,
  });

  const toggleAccordion = (index: any) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const teamMembers = [
    {
      name: "Nish Patel",
      role: "Founder & CEO",
      bio: "Nish founded GreenCart with a vision to revolutionize grocery delivery through technology and sustainability.",
      image:
        "https://nish.techifive.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-img.9bcc8eea.png&w=1920&q=75",
    },
    {
      name: "Om Patel",
      role: "Operations Director",
      bio: "Om ensures our delivery network runs smoothly across all our service areas.",
      image:
        "https://om.techifive.com/_next/image?url=%2Fom-patel.jpg&w=640&q=75",
    },
    {
      name: "Michael Chen",
      role: "Tech Lead",
      bio: "Michael heads our engineering team, building the technology that powers our lightning-fast deliveries.",
      image: "/michael.jpg",
    },
    {
      name: "Priya Sharma",
      role: "Sustainability Officer",
      bio: "Priya leads our initiatives to make GreenCart environmentally friendly at every step.",
      image: "/priya.jpg",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "GreenCart Founded",
      description:
        "Nish Patel started GreenCart with just 3 delivery partners in a single neighborhood.",
    },
    {
      year: "2021",
      title: "Expansion to 10 Cities",
      description:
        "Rapid growth allowed us to serve customers across 10 major urban centers.",
    },
    {
      year: "2022",
      title: "Sustainable Packaging Launch",
      description:
        "Introduced 100% biodegradable packaging for all our deliveries.",
    },
    {
      year: "2023",
      title: "15-Minute Delivery Promise",
      description:
        "Launched our signature 15-minute delivery guarantee in selected areas.",
    },
  ];

  const values = [
    {
      title: "Speed",
      description: "We believe fresh groceries shouldn't make you wait.",
      icon: <Clock className="h-6 w-6 text-primary" />,
    },
    {
      title: "Quality",
      description: "Only the freshest products make it to your doorstep.",
      icon: <ShoppingBag className="h-6 w-6 text-primary" />,
    },
    {
      title: "Reliability",
      description: "Count on us to deliver what you need, when you need it.",
      icon: <Truck className="h-6 w-6 text-primary" />,
    },
    {
      title: "Sustainability",
      description: "Eco-friendly practices at every step of our operation.",
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
  ];

  const accordionItems = [
    {
      title: "Our Mission",
      content:
        "To make fresh, quality groceries accessible to everyone through lightning-fast delivery and transparent pricing. We're committed to removing the hassle from grocery shopping while supporting local farmers and sustainable practices.",
    },
    {
      title: "Our Vision",
      content:
        "We envision a world where getting fresh groceries is as easy as checking your phone. GreenCart aims to be the most reliable, sustainable, and customer-focused grocery delivery service that transforms how people shop for essentials.",
    },
    {
      title: "Our Approach",
      content:
        "We combine strategic warehouse locations, efficient delivery routes, and cutting-edge technology to ensure your groceries arrive in record time. Our drivers are trained professionals who handle your items with care and respect.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (statsVisible) {
      const interval = setInterval(() => {
        setCounts((prev) => {
          const newCounts = { ...prev };
          if (newCounts.cities < 50) newCounts.cities += 1;
          if (newCounts.products < 5000) newCounts.products += 100;
          if (newCounts.customers < 100000) newCounts.customers += 2000;
          if (newCounts.deliveries < 1000000) newCounts.deliveries += 20000;

          if (
            newCounts.cities >= 50 &&
            newCounts.products >= 5000 &&
            newCounts.customers >= 100000 &&
            newCounts.deliveries >= 1000000
          ) {
            clearInterval(interval);
          }

          return newCounts;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [statsVisible]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-green-100 text-primary px-4 py-1 rounded-full mb-4 font-medium animate-pulse">
              Fresh Groceries Delivered in Minutes
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-green-700 bg-clip-text text-transparent">
              About GreenCart
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              The fastest way to get fresh groceries delivered to your doorstep.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Shop Now
              </button>
              <button className="bg-white border-2 border-primary text-primary font-medium py-3 px-6 rounded-lg hover:bg-primary/5 transition-all flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Our Services
              </button>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,122.7C96,149,192,203,288,208C384,213,480,171,576,154.7C672,139,768,149,864,170.7C960,192,1056,224,1152,224C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-[1.02] duration-500">
                <Image
                  src="/about1.png"
                  alt="GreenCart delivery"
                  layout="responsive"
                  width={1024}
                  height={1024}
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 md:p-6 rounded-lg shadow-lg hidden md:block transform hover:rotate-3 transition-transform duration-300">
                <p className="text-lg font-bold">Founded 2020</p>
                <p>by Nish Patel</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="inline-block bg-green-100 text-primary px-3 py-1 rounded-full mb-4 text-sm font-medium">
                Our Journey
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The GreenCart Story
              </h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020 by Nish Patel, GreenCart began with a simple
                question: Why should getting fresh groceries take so much time?
                What started as a small operation in one neighborhood has since
                grown into a service that's transforming how people shop for
                groceries.
              </p>
              <p className="text-gray-600 mb-6">
                We combine strategically located micro-warehouses with
                cutting-edge logistics technology to deliver fresh groceries in
                record time. Our mission is to make quality groceries accessible
                to everyone while supporting sustainable practices.
              </p>

              {/* Accordion */}
              <div className="mt-8">
                {accordionItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200">
                    <button
                      className="flex justify-between items-center w-full py-4 text-left font-medium text-lg"
                      onClick={() => toggleAccordion(index)}
                    >
                      {item.title}
                      {activeAccordion === index ? (
                        <ChevronUp className="h-5 w-5 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeAccordion === index
                          ? "max-h-96 pb-4 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-green-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-green-100 text-primary px-3 py-1 rounded-full mb-4 text-sm font-medium">
              What We Believe
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Core Values
            </h2>
            <p className="text-gray-600">
              The principles that guide everything we do at GreenCart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-green-100 text-primary px-3 py-1 rounded-full mb-4 text-sm font-medium">
              The People
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet Our Team
            </h2>
            <p className="text-gray-600">
              The talented individuals who make GreenCart's lightning-fast
              deliveries possible.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm">{member.bio}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-green-100 text-primary px-3 py-1 rounded-full mb-4 text-sm font-medium">
              Our Progress
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              GreenCart Journey
            </h2>
            <p className="text-gray-600">
              Key milestones in our fast-growing history.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div
                    className={`md:flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="md:w-1/2 p-4 flex justify-center md:justify-end">
                      {index % 2 === 0 ? (
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mr-0 md:mr-8 hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
                          <div className="text-primary font-bold text-2xl mb-2">
                            {milestone.year}
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">
                            {milestone.description}
                          </p>
                        </div>
                      ) : (
                        <div className="hidden md:block w-full" />
                      )}
                    </div>

                    {/* Circle in the middle */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rounded-full border-4 border-white hidden md:block"></div>

                    <div className="md:w-1/2 p-4 flex justify-center md:justify-start">
                      {index % 2 !== 0 ? (
                        <div className="bg-white p-6 rounded-lg shadow-md max-w-md ml-0 md:ml-8 hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
                          <div className="text-primary font-bold text-2xl mb-2">
                            {milestone.year}
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600">
                            {milestone.description}
                          </p>
                        </div>
                      ) : (
                        <div className="hidden md:block w-full" />
                      )}
                    </div>
                  </div>

                  {/* Mobile version - always visible */}
                  <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto md:hidden">
                    <div className="text-primary font-bold text-2xl mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-16 md:py-24 bg-gradient-to-r from-primary to-green-700 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {counts.cities}+
              </div>
              <p className="text-green-100">Cities Served</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {counts.products.toLocaleString()}+
              </div>
              <p className="text-green-100">Products Available</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {counts.customers.toLocaleString()}+
              </div>
              <p className="text-green-100">Happy Customers</p>
            </div>
            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {counts.deliveries.toLocaleString()}+
              </div>
              <p className="text-green-100">Deliveries Made</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Experience the GreenCart Difference
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Fresh groceries delivered to your doorstep in minutes. Join
                thousands of happy customers who have made grocery shopping
                faster and easier.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/products">
                  <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Shop Now
                  </button>
                </Link>
                <Link href="/products">
                  <button className="bg-white border-2 border-primary text-primary font-medium py-3 px-8 rounded-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                    <Users className="h-5 w-5" />
                    Join Our Team
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
