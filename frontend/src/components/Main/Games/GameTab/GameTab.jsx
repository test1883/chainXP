import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getGames } from "../../../../utils/functions";

const GameTab = () => {
  const [games, setGames] = useState([])
  const [search, setSearch] = useState(null)
  const location = useLocation();
  const { hash, pathname, search: searchQuery } = location;
  useEffect(() => {
    (async () => {
      const res = await getGames()
      console.log(res)
      setGames(res)
    })()
  }, [])
  return (
    <aside id="sidebar" className={`sidebar ${"ml-[300px]"}`}>
      <ul className="sidebar-nav" id="sidebar-nav">
        <div className="search-bar">
          <div className="search-form d-flex align-items-center justify-content-between">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: "10px", borderRadius: "20px" }}
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
              }}
              type="button"
              title="Search"
              className="btn btn-warning"
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>
        <li className="nav-heading">Game</li>
        {games.map((game, key) => {
          if (!search || (game.name.toLowerCase().indexOf(search.toLowerCase()) > -1)) {
            return (
            <li key={key} className={"nav-item"}>
              <Link className={"nav-link gap-1 collapsed" + ((pathname=="/games" && (parseInt(searchQuery.split("=")[1]) == game.game_id)) ? " selected" : "")} to={"/games?id="+game.game_id}>
                <img
                  src={"https://ipfs.particle.network/" + game.logo}
                  alt=""
                  className=""
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                  }}
                />
                <span>{game.name}</span>
              </Link>
            </li>
          )

          }
        })}
      </ul>
    </aside>
  );
};

export default GameTab;
