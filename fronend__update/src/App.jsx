import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Create from "./components/Create";
import Upcoming from "./components/Upcoming";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Create />
      <Upcoming />
      <FAQ />
      <Footer />
    </>
  );
}
