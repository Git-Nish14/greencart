"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Home,
  MapPin,
  Phone,
  Globe,
  Hash,
  Pencil,
  Trash2,
  CheckCircle,
} from "lucide-react";

interface Address {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

const emptyAddress: Address = {
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  phone: "",
};

const ProfilePage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user-addresses");
    if (saved) setAddresses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("user-addresses", JSON.stringify(addresses));
  }, [addresses]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...addresses];
      updated[editingIndex] = address;
      setAddresses(updated);
      setEditingIndex(null);
    } else {
      setAddresses([...addresses, address]);
    }
    setAddress(emptyAddress);
  };

  const handleEdit = (index: number) => {
    setAddress(addresses[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const filtered = addresses.filter((_, i) => i !== index);
    setAddresses(filtered);
    if (editingIndex === index) {
      setEditingIndex(null);
      setAddress(emptyAddress);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Profile Information
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="firstName"
            placeholder="First Name"
            icon={<User />}
            value={address.firstName}
            onChange={handleChange}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            icon={<User />}
            value={address.lastName}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            icon={<Mail />}
            value={address.email}
            onChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="Phone"
            icon={<Phone />}
            value={address.phone}
            onChange={handleChange}
          />
          <Input
            name="street"
            placeholder="Street"
            icon={<Home />}
            value={address.street}
            onChange={handleChange}
          />
          <Input
            name="city"
            placeholder="City"
            icon={<MapPin />}
            value={address.city}
            onChange={handleChange}
          />
          <Input
            name="state"
            placeholder="State"
            icon={<MapPin />}
            value={address.state}
            onChange={handleChange}
          />
          <Input
            name="zipcode"
            placeholder="Zipcode"
            icon={<Hash />}
            value={address.zipcode}
            onChange={handleChange}
          />
          <Input
            name="country"
            placeholder="Country"
            icon={<Globe />}
            value={address.country}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
        >
          {editingIndex !== null ? "Update Address" : "Add Address"}
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {addresses.map((addr, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <p className="font-semibold">
              {addr.firstName} {addr.lastName}
            </p>
            <p className="text-sm text-gray-600">
              {addr.email} | {addr.phone}
            </p>
            <p className="text-sm text-gray-600">
              {addr.street}, {addr.city}, {addr.state} - {addr.zipcode},{" "}
              {addr.country}
            </p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(idx)}
                className="text-blue-600 flex items-center gap-1 hover:underline"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(idx)}
                className="text-red-600 flex items-center gap-1 hover:underline"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Input = ({ name, placeholder, value, onChange, icon }: any) => (
  <div className="relative w-full">
    {icon && (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
    )}
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className={`pl-10 py-2 px-3 border border-gray-300 rounded-md w-full bg-white focus:outline-none focus:ring-2 focus:ring-primary/30`}
    />
  </div>
);

export default ProfilePage;
