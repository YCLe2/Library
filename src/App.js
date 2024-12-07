import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'; // 스타일 파일 가져오기
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from "./components/SearchPage";
import ResultsPage from "./components/ResultsPage";
import Header from "./components/header";
import Create from "./components/Pages/CreatePage"; // Ensure proper casing
import Detail from "./components/Pages/DetailPage"; // Ensure proper casing
import ListPage from "./components/Pages/ListPage";
import Update from "./components/Pages/UpdatePage"; 
import About from "./components/aboutPage";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/myLibrary" element={<ListPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;