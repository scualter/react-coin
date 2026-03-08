import { useState, useEffect } from "react";
import CoinCard from "../components/CoinCard";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetch("https://rest.coincap.io/v3/assets", {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setCoins(data.data); 
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [API_KEY]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "20px" }}>Cargando...</p>;

  return (
    <div className="home">
      <h1>Lista de Criptomonedas</h1>
      <div className="coins-list">
        {coins.map(coin => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}