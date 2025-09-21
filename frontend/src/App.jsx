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

function App() {
  return (
    <div className="min-h-screen font-Inter bg-light-white pt-4">
      <Layout>
        <Routes>
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
          <Route path="/resources" element={<Resources />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
