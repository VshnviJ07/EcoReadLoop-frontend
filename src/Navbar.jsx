import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Home,
  User,
  Phone,
  BookOpen,
  HelpCircle,
  MessageSquare,
  LogOut,
  Heart,
  X,
} from "lucide-react";
import { formatCategoryForUrl } from "./utils";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState("");
  const [categories, setCategories] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const actions = ["Buy", "Rent", "Sell", "Donate"];
  const token = localStorage.getItem("token");
  const backendUrl = "http://localhost:5000";

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/books/categories`);
        if (res.data.success && Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    setOpen(false); // Close drawer on sign out
  };

  const NavItem = ({ to, icon: Icon, text, onClick }) => (
    <Link
      to={to}
      onClick={() => {
        if (onClick) onClick();
        setOpen(false); // Auto-close drawer on click
      }}
      className="flex items-center gap-2 p-3 rounded-lg bg-gray-800 hover:bg-blue-600 transition"
    >
      <Icon size={18} /> <span>{text}</span>
    </Link>
  );

  const CategoryLinks = () =>
    categories.length > 0
      ? categories.map((cat) => (
          <Link
            key={cat}
            to={`/books/category/${formatCategoryForUrl(cat)}`}
            className="block text-sm hover:text-blue-400 ml-4"
            onClick={() => setOpen(false)} // Auto-close drawer
          >
            {cat}
          </Link>
        ))
      : null;

  const MobileCategoryLinks = () => {
    const [mobileExpand, setMobileExpand] = useState(false);
    return (
      <div className="bg-gray-800 rounded-lg p-3">
        <button
          className="flex items-center gap-2 w-full font-semibold hover:text-blue-400"
          onClick={() => setMobileExpand(!mobileExpand)}
        >
          <BookOpen size={18} /> Categories
        </button>
        {mobileExpand && <CategoryLinks />}
      </div>
    );
  };

  const MobileMyBooks = () => {
    const [mobileExpand, setMobileExpand] = useState(false);
    const [actionExpand, setActionExpand] = useState("");
    return (
      <div className="bg-gray-800 rounded-lg p-3">
        <button
          className="flex items-center gap-2 w-full font-semibold hover:text-blue-400"
          onClick={() => setMobileExpand(!mobileExpand)}
        >
          <BookOpen size={18} /> My Books
        </button>
        {mobileExpand &&
          actions.map((action) => (
            <div key={action}>
              <button
                onClick={() =>
                  setActionExpand(actionExpand === action ? "" : action)
                }
                className="block w-full text-left font-medium hover:text-blue-300 ml-2"
              >
                {action}
              </button>
              {actionExpand === action &&
                categories.map((cat) => (
                  <Link
                    key={cat}
                    to={`/books/${action.toLowerCase()}/${formatCategoryForUrl(
                      cat
                    )}`}
                    className="block text-sm hover:text-blue-400 ml-6"
                    onClick={() => setOpen(false)} // Auto-close drawer
                  >
                    {cat}
                  </Link>
                ))}
            </div>
          ))}
      </div>
    );
  };

  const drawerWidth = screenWidth < 640 ? "75%" : "18rem";

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex-col p-6 z-50">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-blue-500 p-2 rounded-full">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">Eco Read Loop</h2>
        </div>

        <nav className="space-y-3 flex flex-col h-full">
          <NavItem to="/" icon={Home} text="Home" />
          <NavItem to="/profile" icon={User} text="Profile" />
          {token && <NavItem to="/wishlist" icon={Heart} text="Wishlist" />}

          <div className="bg-gray-800 rounded-lg p-3">
            <Link
              to="/categories"
              className="flex items-center gap-2 w-full font-semibold hover:text-blue-400"
              onClick={() =>
                setExpand(expand === "categories" ? "" : "categories")
              }
            >
              <BookOpen size={18} /> Categories
            </Link>
            {expand === "categories" && <CategoryLinks />}
          </div>

          {token && (
            <div className="bg-gray-800 rounded-lg p-3">
              <Link
                to="/mybooks"
                className="flex items-center gap-2 w-full font-semibold hover:text-blue-400"
                onClick={() => setExpand(expand === "books" ? "" : "books")}
              >
                <BookOpen size={18} /> My Books
              </Link>

              {expand === "books" &&
                actions.map((action) => (
                  <div key={action}>
                    <button
                      onClick={() => setExpand(expand === action ? "" : action)}
                      className="block w-full text-left font-medium hover:text-blue-300"
                    >
                      {action}
                    </button>
                    {expand === action &&
                      categories.map((cat) => (
                        <Link
                          key={cat}
                          to={`/books/${action.toLowerCase()}/${formatCategoryForUrl(
                            cat
                          )}`}
                          className="block text-sm hover:text-blue-400 ml-4"
                          onClick={() => setOpen(false)} // Auto-close drawer
                        >
                          {cat}
                        </Link>
                      ))}
                  </div>
                ))}
            </div>
          )}

          <NavItem to="/contact" icon={Phone} text="Contact Us" />
          <NavItem to="/help" icon={HelpCircle} text="Help" />
          <NavItem to="/feedback" icon={MessageSquare} text="Feedback" />

          {token && (
            <div className="mt-auto">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 p-3 rounded-lg bg-gray-800 hover:bg-red-600 transition w-full"
              >
                <LogOut size={18} /> <span>Sign Out</span>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Mobile / Tablet Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 bg-gray-800 text-white rounded-lg"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile / Tablet Drawer */}
      <div
  className="lg:hidden fixed top-0 left-0 h-full bg-gray-900 text-white flex flex-col p-6 z-40 transition-transform duration-300"
  style={{
    width: drawerWidth,
    transform: open ? "translateX(0)" : "translateX(-100%)",
  }}
>

        <div className="flex items-center gap-2 mb-8">
          <div className="bg-blue-500 p-2 rounded-full">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold">Eco Read Loop</h2>
        </div>

        <NavItem to="/" icon={Home} text="Home" />
        <NavItem to="/profile" icon={User} text="Profile" />
        {token && <NavItem to="/wishlist" icon={Heart} text="Wishlist" />}

        <MobileCategoryLinks />
        {token && <MobileMyBooks />}

        <NavItem to="/contact" icon={Phone} text="Contact Us" />
        <NavItem to="/help" icon={HelpCircle} text="Help" />
        <NavItem to="/feedback" icon={MessageSquare} text="Feedback" />

        {token && (
          <div className="mt-auto">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 p-3 rounded-lg bg-gray-800 hover:bg-red-600 transition w-full"
            >
              <LogOut size={18} /> <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>

      {/* Overlay for Mobile/Tablet */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}
