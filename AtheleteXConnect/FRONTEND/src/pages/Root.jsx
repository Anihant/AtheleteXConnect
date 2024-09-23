import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Root() {
  return (
    <div className="root-element flex flex-col min-h-screen">
      <Header />
      <div className="outlet flex justify-center items-center  flex-grow">
          <Outlet />
      </div>
      <Footer />
    </div>
  );
}
