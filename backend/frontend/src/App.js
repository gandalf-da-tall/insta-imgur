import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import PostScreen from "./screens/postScreen/PostScreen";
import UploadScreen from "./screens/uploadScreen/UploadScreen";
import ScrollToTop from "./components/helpers/ScrollToTop";
import "./App.css";

// main app component where the routing happens
function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container fluid className={"mainContainer"}>
          <ScrollToTop />{" "}
          <Routes>
            {" "}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/post/:id" element={<PostScreen />} exact />
            <Route path="/upload" element={<UploadScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
