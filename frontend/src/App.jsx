import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8080/api/db-test')
      .then((res) => setResponse(res.data))
      .catch((err) => {
        console.error("API 호출 실패:", err);
        setResponse("❌ API 호출 실패");
      });
  }, []);

  return (
    <div>
      <h1>axios로 API 호출</h1>
      <p>{response}</p>
    </div>
  );
}

export default App;
