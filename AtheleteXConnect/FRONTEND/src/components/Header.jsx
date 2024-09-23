import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="header px-10 border-b-2 pb-1 bg-[#86322f] z-50 md:mb-2 md:sticky md:top-0">
      <div className="header-title flex flex-col md:flex-row md:align-middle">
        <div className="flex flex-col justify-center items-center">
          <img src="VNRVJIET.png" alt="" className="w-16 aspect-square" />
          <h1 className="hidden md:block text-slate-100 md:text-sm">VNR VJIET</h1>
        </div>
        <div className="flex items-center grow justify-center order-last md:order-1">
          <div className="header-links">
            <Link to="/" className="navlink">
              Home
            </Link>
            <Link to="/register" className="navlink">
              Register
            </Link>
            <Link to="/accommodation" className="navlink">
              Accommodation
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:order-2">
            <h1 className="text-slate-100 text-xl">VNR VJIET</h1>
            <h1 className="text-slate-100">SPORTS FEST</h1>
        </div>
      </div>
    </div>
  );
}
