import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Pages
import Signin from "./Signin";
import Signup from "./Signup";
import ForgotPasswordFlow from "./ForgotPasswordFlow";

// Main App Pages
import HomePage from "./HomePage";
import Profile from "./Profile";
import UploadBook from "./UploadBook";
import Contact from "./Contact";
import Help from "./Help";
import Feedback from "./Feedback";
import Wishlist from "./wishlist";
import MyBook from "./MyBooks";

import Categories from "./Categories";
import CategoryPage from "./CategoryPage";
import AdminDashboard from "./AdminDashboard";
import AdminLogin from "./AdminLogin";
import BackgroundVideo from "./BackgroundVideo";
import Navbar from "./Navbar";

// ----- Main Layout -----
const MainLayout = ({ children }) => {
  return (
    <div className="relative w-full h-screen flex">
      <BackgroundVideo />
      {/* Sidebar */}
      <Navbar />
      {/* Main content with margin on desktop */}
      <div className="flex-1 lg:ml-64 relative z-10 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes (no Sidebar) */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPasswordFlow />} />

        {/* Main App Layout */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="home" element={<HomePage />} />
                <Route path="profile" element={<Profile />} />
                <Route path="upload" element={<UploadBook />} />
                <Route path="contact" element={<Contact />} />
                <Route path="help" element={<Help />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="wishlist" element={<Wishlist />} />

                {/* MyBook Section */}
                <Route path="mybooks" element={<MyBook />} />

                {/* Categories Section */}
                <Route path="categories" element={<Categories />} />
                <Route
                  path="/categories/:backendCategory"
                  element={<CategoryPage />}
                />

                {/* Admin */}
                <Route path="admin/login" element={<AdminLogin />} />
                <Route path="admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
