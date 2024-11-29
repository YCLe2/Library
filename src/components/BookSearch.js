import React, { useState } from "react";

const BookSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            검색
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookSearch;
