
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import UserInterface from './pages/UserInterface';
import "./global.css"
import Login from "./pages/Login";

function App() {
  return (
<Routes>
      
      <Route path="/" element={<Dashboard />} />
      <Route path="/userinterface" element={<UserInterface />} />
      <Route path="/login" element={<Login />} />
  </Routes>
  );
}

export default App;
