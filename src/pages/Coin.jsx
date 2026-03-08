import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Coin() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    fetch(`https://rest.coincap.io/v3/assets/${id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    })
      .then(res => res.json())
      .then(data => setCoin(data.data))
      .catch(err => console.error(err));
  }, [id]);

  const toggleFavorite = () => {
    let updatedFavorites = [...favorites];
    const exists = favorites.find(f => f.id === coin.id);

    if (exists) {
      updatedFavorites = favorites.filter(f => f.id !== coin.id);
    } else {
      updatedFavorites.push(coin);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (!coin) return <p>Cargando...</p>;

  const isFav = favorites.find(f => f.id === coin.id);

  return (
    <div className="coin-detail">
      <h1>{coin.name}</h1>
      <p>Symbol: {coin.symbol}</p>
      <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p>Market Cap: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
      <button onClick={toggleFavorite}>
        {isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      </button>
    </div>
  );
}

export default Coin;