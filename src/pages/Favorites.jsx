import { useEffect, useState } from "react";
import CoinCard from "../components/CoinCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    // Actualizamos precios en tiempo real
    Promise.all(
      favs.map(fav =>
        fetch(`https://rest.coincap.io/v3/assets/${fav.id}`, {
          headers: { Authorization: `Bearer ${API_KEY}` }
        })
          .then(res => res.json())
          .then(data => data.data)
      )
    ).then(updated => setFavorites(updated));
  }, []);

  if (favorites.length === 0) return <p>No hay criptomonedas favoritas.</p>;

  return (
    <div className="favorites">
      <h1>Favoritos</h1>
      <div className="coins-list">
        {favorites.map(coin => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;