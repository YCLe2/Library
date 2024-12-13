import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?keyword=${keyword}`);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      navigate(`/results?keyword=${keyword}`);
    }
  };

  return (
    <div className="divContents1">
      <div className="divSearch">
        <div className="searchTab">
          <h2>통합검색</h2>
          <p className="searchBox">
            <input
              type="text"
              className="searchInput"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type="image"
              src="https://library.handong.edu/image/ko/local/main/searchBtn.png"
              alt="검색"
              title="검색"
              className="searchBtn"
              onClick={handleSearch}
            />
          </p>
        </div>
        <div className="divRecommend">
          <h6>추천 검색어</h6>
          <ul>
            <li>
              <a href="/results?keyword=갈대상자">#갈대상자</a>
            </li>
            <li>
              <a href="/results?keyword=해리포터">#해리포터</a>
            </li>
            <li>
              <a href="/results?keyword=경영학">#경영학</a>
            </li>
            <li>
              <a href="/results?keyword=경제학">#경제학</a>
            </li>
            <li>
              <a href="/results?keyword=디자인">#디자인</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;