import { Link } from "react-router";
import cartLight from "../assets/cartLight.png";

const Header = () => {
  return (
    <div className="w-full h-20 bg-[#2269a7] sticky top-0 z-50">
      <div className="max-w-7xl h-full mx-auto flex items-center justify-between">
        <Link to="/">
          <img
            className="w-40 ml-2"
            src="/logo.svg"
            alt="Book of the Month"
          ></img>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8"></ul>
          <Link to="/cart">
            <div className="flex group-hover:text-[#800f00]">
              <img className="w-6 mr-2" src={cartLight} alt="shoppingCart" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
