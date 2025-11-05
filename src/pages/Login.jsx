import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setMsg("✅ Login Successful!");
    } catch {
      setMsg("❌ Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Login | PASIYA-MD TEAM</h1>
      <input className="p-2 text-black m-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="p-2 text-black m-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login} className="bg-blue-500 px-4 py-2 rounded mt-2 hover:bg-blue-600">Login</button>
      <p className="mt-3">{msg}</p>
    </div>
  );
}
