import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?keyword=${keyword}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">도서 검색</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchPage;