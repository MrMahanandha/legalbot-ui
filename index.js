import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/chat',
        { user_id: "user001", question: input }
      );
      setMessages(prev => [...prev, { type: 'bot', text: res.data.answer }]);
    } catch (e) {
      setMessages(prev => [...prev, { type: 'bot', text: 'เกิดข้อผิดพลาด API' }]);
    }
    setInput("");
  }

  return (
    <div className="max-w-md mx-auto p-4 flex flex-col h-screen">
      <div className="flex-grow border p-3 rounded overflow-y-auto space-y-2 mb-4">
        {messages.map((m,i) =>
          <div key={i} className={m.type==="user" ? "text-right" : "text-left"}>
            <div className={m.type==="user" ? "bg-blue-200 inline-block p-2 rounded" : "bg-gray-200 inline-block p-2 rounded"}>
              {m.text}
            </div>
          </div>
        )}
      </div>
      <div className="flex">
        <input
          className="flex-grow border px-3 py-2 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==='Enter' && handleSend()}
        />
        <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSend}>
          ส่ง
        </button>
      </div>
    </div>
  );
}
