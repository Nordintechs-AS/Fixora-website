import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";
import { Navbar } from "./components/navigation/navbar";
import { Footer } from "./components/footer/footer";
import { PricePage } from "./pages/price";

function App() {
    return (
        <BrowserRouter>
            <div className="main-content">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/price" element={<PricePage />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
