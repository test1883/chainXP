import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/address.jpg";
import { Connector, useAccount, useConnect, useDisconnect } from "wagmi";
import { useEthersSigner } from "../../utils/ethers";
import { getProfile } from "../../utils/functions";

// import logo from "../assets/img/logo.png";

const Navbar = () => {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const [profileImage, setProfile] = useState();

  const signer = useEthersSigner();

  useEffect(() => {
    if (signer) {
      (async () => {
        const prof = await getProfile(address);
        console.log(prof);
        setProfile("https://ipfs.particle.network/" + prof.profile);
      })();
    }
  }, [signer]);

  return (
    <header
      id="header"
      className="header fixed-top d-flex
     align-items-center"
    >
      <div className="d-flex align-items-center justify-content-between">
        <i
          className="bi bi-list toggle-sidebar-btn
        hover:text-black mr-3
        lg:hidden"
        ></i>
        <Link to="/" className="logo d-flex align-items-center">
          <img src={logo} alt="" className="h-[70px] w-[70px] object-cover" />
          <span className="d-none d-lg-block">ChainXP</span>
        </Link>
      </div>
      {/* End Logo */}

      {/* End Search Bar */}
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li class="nav-item">
            <Link class="nav-link nav-icon" to="/settings">
              <i class="bi bi-gear"></i>
            </Link>
          </li>

          {isConnected ? (
            <>
              <li className="nav-item pe-3">
                <Link
                  className="nav-link nav-profile d-flex align-items-center pe-0"
                  to="/profile"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <span className="d-none d-md-block ps-2">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                </Link>
              </li>
              <li className="nav-item pe-3">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    disconnect();
                  }}
                >
                  Disconnect
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item pe-3">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => connect({ connector: connectors[0] })}
              >
                Connect Wallet {address}
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* End Icons Navigation */}
    </header>
    /* End Header */
  );
};

export default Navbar;
