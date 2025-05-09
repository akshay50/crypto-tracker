import { useState, useEffect } from 'react';
import './css/crypto.css';
import Chart from './Charts.jsx';
import Favorites from './Favorites.jsx';

export default function CryptoTable() {
  const [currency, setCurrency] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchURL =
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true';
        const response = await fetch(fetchURL);
        const data = await response.json();
        setCurrency(data);
      } catch (error) {
        console.log(`error while getting data: ${error}`);
      }
    };
    fetchData();
  }, []);

  const toggleFavorite = (coin) => {
    let updatedFavorites;
    if (favorites.includes(coin.id)) {
      updatedFavorites = favorites.filter((id) => id !== coin.id);
    } else {
      updatedFavorites = [...favorites, coin.id];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  console.log(currency, 'data in currency');

  return (
    <div className="crypto-prices">
      <div className="title">
        <h1>Tracker for Top Crypto Coins</h1>
      </div>
      <table>
        <thead>
          <tr>
            <td>Sr.</td>
            <td>Coin</td>
            <td>Current Price</td>
            <td>Market Cap</td>
            <td>Chart last 7 Days</td>
            <td>Favorites</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(currency) &&
            currency.map((coin, index) => (
              <tr key={coin.id}>
                <td>{coin.market_cap_rank}</td>
                <td>
                  <div className="coin">
                    <img src={coin.image} alt={coin.symbol} />
                    <h4>{coin.name}</h4>
                    <small>{coin.symbol}</small>
                  </div>
                </td>
                <td>${coin.current_price}</td>
                <td>${coin.market_cap}</td>
                <td>
                  <Chart data={coin.sparkline_in_7d.price} />
                </td>
                <td>
                  <button
                    onClick={() => toggleFavorite(coin)}
                    className="favorite-emoji"
                  >
                    {favorites.includes(coin.id) ? '❤️' : '🤍'}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Favorites
        favorites={favorites}
        currency={currency}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}
