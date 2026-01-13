import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";
import { Navbar } from "./components/navigation/navbar";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<div>Contact Page</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
