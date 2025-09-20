import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';

const socket = io('http://localhost:3000');

export default function App() {
  const [botCount, setBotCount] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.on('botCountUpdate', (count) => {
      setBotCount(count);
      setHistory(prev => [...prev, count].slice(-20)); // keep last 20 points
    });

    return () => socket.off('botCountUpdate');
  }, []);

  const data = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Bots Deployed',
        data: history,
        borderColor: 'rgb(34,197,94)',
        backgroundColor: 'rgba(34,197,94,0.5)',
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-green-400">PASIYA-MD Bot Deployment Dashboard</h1>
      <div className="text-center text-6xl font-extrabold mb-8">{botCount.toLocaleString()}</div>
      <div>
        <Line data={data} />
      </div>
    </div>
  );
}
