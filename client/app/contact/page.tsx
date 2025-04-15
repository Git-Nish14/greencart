"use client";

import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Send, User, Mail, MessageSquare, PhoneCall } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading("🍏 Verifying your cart...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      toast.dismiss(loadingToast);

      if (data.success) {
        toast.success(
          "🥦 Order placed! Your greens are getting ready for the trip!",
          {
            duration: 5000,
            icon: "🌿",
          }
        );
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("⚠️ Cart jam! Please double-check and resubmit.", {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("🍅 Uh-oh... looks like something slipped off the shelf.", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Contact Page Content */}
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 pt-[4.5rem] pb-16">
        {/* Toast Notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "text-sm",
            style: {
              background: "#f0fdf4",
              color: "#166534",
              border: "1px solid #dcfce7",
            },
          }}
        />

        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-green-100 opacity-50"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-green-200 opacity-40"></div>
          <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-green-300 opacity-20"></div>
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full bg-green-100 opacity-30"></div>
        </div>

        {/* Contact Header */}
        <div className="relative z-10 text-center mb-8 mt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800">
            Get In Touch
          </h1>
          <p className="text-gray-600 mt-2">
            We're here to help with any questions you may have
          </p>
        </div>

        {/* Contact Form */}
        <section className="relative z-10 px-6 md:px-12 w-full max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg overflow-hidden border border-green-200">
            <div className="grid md:grid-cols-5">
              {/* Left Info Block */}
              <div className="hidden md:block md:col-span-2 bg-green-700 p-8 relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-green-300"></div>
                  <div className="absolute top-2/3 left-1/3 w-16 h-16 rounded-full bg-green-500"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-center">
                  <h2 className="text-white text-3xl font-bold mb-6">
                    Let's Connect
                  </h2>
                  <p className="text-green-100 mb-8">
                    We value your feedback and questions. Reach out and we'll
                    respond as soon as possible.
                  </p>

                  <div className="space-y-4 text-green-100">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-600 p-2 rounded-full">
                        <Mail size={18} className="text-white" />
                      </div>
                      <span>contact@greencart.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-600 p-2 rounded-full">
                        <PhoneCall size={18} className="text-white" />
                      </div>
                      <span>Support available 9am-5pm</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Block */}
              <div className="p-6 md:p-8 md:col-span-3 backdrop-blur-sm bg-white/50">
                <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
                  Contact Us
                </h3>
                <p className="text-gray-600 mb-8">
                  Have questions or feedback? We're here to help.
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700"
                    />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                      className="w-full border border-green-200 bg-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                      className="w-full border border-green-200 bg-white rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <MessageSquare
                      size={18}
                      className="absolute left-3 top-4 text-green-700"
                    />
                    <textarea
                      placeholder="Your Message"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      required
                      className="w-full border border-green-200 bg-white rounded-lg px-10 py-3 h-40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium px-6 py-3 rounded-lg w-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 shadow-md"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message <Send size={16} className="inline ml-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
