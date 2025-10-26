import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Unauthorized from "./components/Unauthorized";
import ProtectRoutes from "./configs/ProtectRoutes";
import Resources from "./pages/Resources";
import CreateBlog from "./components/CreateBlog";
import CreateResource from "./components/CreateResource";
import Profile from "./pages/Profile";
import AdminPanel from "./components/admin/AdminPanel";
import Dashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminRes from "./pages/admin/AdminRes";
import AdminComments from "./pages/admin/AdminComments";
import Blogs from "./pages/Blogs";
import SpecificBlog from "./pages/SpecificBlog";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (
    <div className="min-h-screen font-Inter bg-light-white pt-4">
      <Layout>
        <Routes>
          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectRoutes role="admin">
                <AdminPanel>
                  <Dashboard />
                </AdminPanel>
              </ProtectRoutes>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectRoutes role="admin">
                <AdminPanel>
                  <AdminUsers />
                </AdminPanel>
              </ProtectRoutes>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectRoutes role="admin">
                <AdminPanel>
                  <AdminBlogs />
                </AdminPanel>
              </ProtectRoutes>
            }
          />
          <Route
            path="/admin/resources"
            element={
              <ProtectRoutes role="admin">
                <AdminPanel>
                  <AdminRes />
                </AdminPanel>
              </ProtectRoutes>
            }
          />
          <Route
            path="/admin/comments"
            element={
              <ProtectRoutes role="admin">
                <AdminPanel>
                  <AdminComments />
                </AdminPanel>
              </ProtectRoutes>
            }
          />

          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes */}
          <Route
            path="/create-blog"
            element={
              <ProtectRoutes>
                <CreateBlog />
              </ProtectRoutes>
            }
          />
          <Route
            path="/create-resource"
            element={
              <ProtectRoutes>
                <CreateResource />
              </ProtectRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectRoutes>
                <Profile />
              </ProtectRoutes>
            }
          />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog/:blogId" element={<SpecificBlog />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
