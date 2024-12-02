import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'; // 스타일 파일 가져오기
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from "./components/SearchPage";
import ResultsPage from "./components/ResultsPage";
import DetailedSearchPage from "./components/DetailedSearchPage";
import Header from "./components/header";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/detailed-search" element={<DetailedSearchPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;