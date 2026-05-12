```jsx
import './App.css';
import axios from "axios";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaShieldAlt } from "react-icons/fa";

function App() {

  const [history, setHistory] = useState([]);
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const chartData = [
    {
      name: "Safe",
      value: history.filter(h => h.riskLevel === "LOW").length
    },
    {
      name: "Medium",
      value: history.filter(h => h.riskLevel === "MEDIUM").length
    },
    {
      name: "High",
      value: history.filter(h => h.riskLevel === "HIGH").length
    }
  ];

  const analyze = async () => {

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        sender: "A",
        receiver: "B",
        amount: parseFloat(amount),
        location: "Delhi",
        status: "PENDING"
      };

      const res = await axios.post(
        "http://localhost:8000/predict",
        payload
      );

      if (res.data.riskLevel === "HIGH") {
        toast.error("High Risk Fraud Detected!");
      }

      setResult(res.data);

      setHistory((prev) => [
        ...prev,
        {
          amount: parseFloat(amount),
          ...res.data
        }
      ]);

    } catch (error) {
      console.error(error);
      alert("Backend Error");
    } finally {
      setLoading(false);
    }
  };

  const getColor = () => {
    if (!result) return "#999";
    if (result.riskLevel === "HIGH") return "#ff4d4d";
    if (result.riskLevel === "MEDIUM") return "#ffaa00";
    return "#00c853";
  };

  return (
    <div className="container">

      <div className="card">

        <h1>
          <FaShieldAlt />
          Financial Fraud Analyzer
        </h1>

        <p className="subtitle">
          AI-powered fraud detection system
        </p>

        <input
          type="number"
          placeholder="Enter Transaction Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={analyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Transaction"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="resultBox">

            <h2 style={{ color: getColor() }}>
              {result.riskLevel} RISK
            </h2>

            <div className="scoreContainer">
              <div
                className="scoreBar"
                style={{
                  width: `${result.fraudScore * 100}%`,
                  background: getColor()
                }}
              />
            </div>

            <p>
              <strong>Fraud Score:</strong>{" "}
              {(result.fraudScore * 100).toFixed(0)}%
            </p>

            <p>
              <strong>Action:</strong> {result.action}
            </p>

          </div>
        )}

        {/* HISTORY */}
        {history.length > 0 && (
          <div className="history">

            <h2>Transaction History</h2>

            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Fraud Score</th>
                  <th>Risk</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {history.map((item, index) => (
                  <tr key={index}>
                    <td>₹{item.amount}</td>
                    <td>
                      {item.fraudScore !== undefined
                        ? (item.fraudScore * 100).toFixed(0) + "%"
                        : "N/A"}
                    </td>
                    <td>{item.riskLevel}</td>
                    <td>{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

        {/* CHART */}
        {history.length > 0 && (
          <div style={{ marginTop: "40px" }}>

            <h2>Fraud Analytics</h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#00c853" />
                  <Cell fill="#ffaa00" />
                  <Cell fill="#ff4d4d" />
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;
```
