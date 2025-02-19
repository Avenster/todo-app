import Image from "next/image";
import { Provider } from 'react-redux';
import Sidebar from "./components/Sidebar";

import Navbar from "./components/Navbar";
import HomePage from "./HomePage";

export default function Home() {
  return (
    <div>
      <HomePage/> 
    </div>
  );
}
