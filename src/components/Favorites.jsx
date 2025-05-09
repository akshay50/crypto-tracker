import React from 'react';
import './css/favorite.css';

export default function Favorites({ favorites, currency, toggleFavorite }) {
  return (
    <div className="favorites">
      <h2>Favorite Coins</h2>
      {favorites.length === 0 ? (
        <p>No favorite coins added.</p>
      ) : (
        <ul>
          {favorites.map((favId) => {
            const favoriteCoin = currency.find((coin) => coin.id === favId);
            return favoriteCoin ? (
              <li key={favId}>
                {favoriteCoin.name}
                <button onClick={() => toggleFavorite(favoriteCoin)}>
                  Remove
                </button>
              </li>
            ) : null;
          })}
        </ul>
      )}
    </div>
  );
}
