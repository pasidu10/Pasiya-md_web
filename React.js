jsx
import React, { useEffect, useState } from 'react';

export default function BotCounter() {
  const [count, setCount] = useState(75000);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/botcount');
        const data = await res.json();
        setCount(data.count);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCount(); 
const interval = setInterval(fetchCount, 2000); // Poll API every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      fontFamily: 'Poppins, sans-serif',
      textAlign: 'center',
      padding: '30px',
      background: '#0e0e0e',
      color: '#00ff99',
      borderRadius: '15px',
      width: '350px',
      margin: '50px auto',
      boxShadow: '0 0 15px #00ff99'
    }}>
      <h1>PASIYA-MD Prime Bot</h1>
      <h2>Live Deployed Bot Count</h2>
      <p style={{ fontSize: '4rem', margin: '20px 0', fontWeight: '700' }}>{count.toLocaleString()}</p>
      <p style={{ fontSize: '1.1rem', color: '#aaa' }}>Updating every 7.5 seconds</p>
    </div>
  );
}
```

---

Summary  
- Backend: Every 7.5 seconds increases bot count by ~6-8.  
- Frontend: Polls backend every 2 seconds & updates the counter.  
- Simple sleek dark UI with green neon style for "luxury" vibe.

---

ඔබට ඕනම් මෙහෙම කොඩ්ස් හොස්ට් කරලා බලන්න පුළුවන්, මම help ඕනම දේවල් කියන්නම්! 😎👍
