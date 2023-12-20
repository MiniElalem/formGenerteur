import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import Viewform from "./pages/Viewform";
import PublicForm from "./components/viewSubmissions";
import Buildform from "./pages/buildform";
import ResponsiveAppBar from "./components/Appbar"; // Import the ResponsiveAppBar component

function App() {
  return (
    <div className="App">
      <HashRouter>
        {/* Place ResponsiveAppBar component outside the Routes */}
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/buildform" element={<Buildform />} />
          <Route path="/dashboard/viewform/:id" element={<Viewform />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
