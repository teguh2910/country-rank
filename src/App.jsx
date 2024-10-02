import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import Home from "./components/pages/Home";
import CountryComparation from "./components/pages/CountryComparation";
import CountryComparationResult from "./components/pages/CountryComparisonResult";
import News from "./components/pages/News";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<CountryComparationResult />} />
        <Route path="/country_comparation" element={<CountryComparation />} />
        <Route path="/news" element={<News />} />        
      </Routes>
    </div>
  );
}

export default App;
