import { useState } from "react";
import axios from "axios";

export default function ChatAI() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    const res = await axios.post("http://localhost:5000/api/ai/chat", { message });
    setReply(res.data.reply);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">EduAI Chat 🤖</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-2 text-black w-80 h-32"
        placeholder="Enter your question..."
      />
      <button onClick={send} className="bg-blue-600 px-4 py-2 rounded mt-2">Send</button>
      <p className="mt-4 text-lg">{reply}</p>
    </div>
  );
}
