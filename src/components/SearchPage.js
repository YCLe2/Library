import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?keyword=${keyword}`);
  };

  return (
      <div className="divContents1">
        <div className="divSearch">
          <div className="searchTab">
            <p class = "searchBox">
              <input
                type="text"
                className="searchInput"
                placeholder="검색어를 입력하세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input type="image" src="https://library.handong.edu/image/ko/local/main/searchBtn.png" alt="검색" title="검색" class="searchBtn" onClick={handleSearch}/>
            </p>
          </div>
        </div>
      </div>
  );
};

export default SearchPage;