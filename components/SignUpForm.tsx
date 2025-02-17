"use client";
import { useState } from "react";
import { signUp } from "@aws-amplify/auth"; // ✅ Use AWS Amplify v5+

export default function SignUpForm() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signUp({
        username: form.username, // ✅ Uses `signUp()` with Amplify v5+
        password: form.password,
        options: {
          userAttributes: { email: form.email }, // ✅ Corrected attribute format
        },
      });
      alert("Sign-up successful! Check your email for verification.");
    } catch (err: any) {
      setError(err.message || "Sign-up failed. Please try again.");
      console.error("Sign-up failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md">
      <h2 className="text-lg font-bold mb-2">Sign Up</h2>
      
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="mb-2 p-2 border rounded w-full" />
      <input type="email" name="email" placeholder="Email (optional)" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="mb-2 p-2 border rounded w-full" />
      
      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded w-full">
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
}

