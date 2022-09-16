import { Outlet } from "react-router-dom";
import "./App.css";
import FooterIndex from "./components/FooterIndex/FooterIndex";
import HeaderIndex from "./components/HeaderIndex/HeaderIndex";

function App() {
  return (
    <div>
      <HeaderIndex />
      <Outlet />
      <FooterIndex />
    </div>
  );
}

export default App;
