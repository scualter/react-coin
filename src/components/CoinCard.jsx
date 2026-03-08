import { Link } from "react-router-dom";

function CoinCard({ coin }) {
  return (
    <div className="coin-card">
      <Link to={`/coin/${coin.id}`}>
        <h3>{coin.name}</h3>
        <p>Symbol: {coin.symbol}</p>
        <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      </Link>
    </div>
  );
}

export default CoinCard;