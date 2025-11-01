import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link to="/"><h1 className="text-2xl font-bold text-primary">BookIt</h1></Link>
      <nav className="space-x-4 text-gray-600">
        <a href="/" className="hover:text-primary">
          Home
        </a>
        <a href="/my-bookings" className="hover:underline">
          My Bookings
        </a>
      </nav>
    </div>
  </header>
);
export default Header;
