"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import {
  User,
  Mail,
  Home,
  MapPin,
  Phone,
  Globe,
  Hash,
  CheckCircle,
} from "lucide-react";

const InputField = ({
  type,
  placeholder,
  name,
  handleChange,
  address,
  icon,
}: {
  type: string;
  placeholder: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  address: Record<string, string>;
  icon?: React.ReactNode;
}) => (
  <div className="relative w-full group">
    {icon && (
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300">
        {icon}
      </div>
    )}
    <input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
      className={`border border-gray-200 p-3 rounded-lg w-full bg-gray-50 focus:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:shadow ${
        icon ? "pl-10" : "pl-4"
      }`}
    />
  </div>
);

// Form Section Component
const FormSection = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 my-6">
    <div className="h-px bg-gray-200 flex-grow"></div>
    <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
    <div className="h-px bg-gray-200 flex-grow"></div>
  </div>
);

// Main Component
function AddAddress() {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mt-16 pb-16 max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1 bg-primary rounded-full"></div>
        <h1 className="text-2xl md:text-3xl text-gray-700 font-light">
          Add Shipping{" "}
          <span className="font-semibold text-primary">Address</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
        {/* Form Column */}
        <div className="flex-1 w-full lg:w-3/5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <form onSubmit={onSubmitHandler} className="space-y-6">
              <FormSection title="PERSONAL INFORMATION" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  icon={<User size={18} />}
                />
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  icon={<User size={18} />}
                />
              </div>

              <InputField
                handleChange={handleChange}
                address={address}
                name="email"
                type="email"
                placeholder="Email Address"
                icon={<Mail size={18} />}
              />

              <InputField
                handleChange={handleChange}
                address={address}
                name="phone"
                type="tel"
                placeholder="Phone Number"
                icon={<Phone size={18} />}
              />

              <FormSection title="ADDRESS DETAILS" />

              <InputField
                handleChange={handleChange}
                address={address}
                name="street"
                type="text"
                placeholder="Street Address"
                icon={<Home size={18} />}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="city"
                  type="text"
                  placeholder="City"
                  icon={<MapPin size={18} />}
                />
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="state"
                  type="text"
                  placeholder="State / Province"
                  icon={<MapPin size={18} />}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="zipcode"
                  type="text"
                  placeholder="Postal / Zip Code"
                  icon={<Hash size={18} />}
                />
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="country"
                  type="text"
                  placeholder="Country"
                  icon={<Globe size={18} />}
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/80 transition duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>

        {/* Image Column */}
        <div className="hidden lg:block lg:w-2/5">
          <div className="sticky top-20">
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
              <Image
                src={assets.add_address_iamge}
                alt="Add Address"
                className="w-full h-auto object-contain"
              />
              <div className="mt-6 bg-white p-4 rounded-lg border border-gray-100">
                <h3 className="text-gray-700 font-medium mb-2">
                  Why add a shipping address?
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-primary mt-1 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-600">
                      Fast checkout on future orders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-primary mt-1 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-600">
                      Accurate delivery of your packages
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-primary mt-1 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-600">
                      Save multiple addresses for home & work
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
