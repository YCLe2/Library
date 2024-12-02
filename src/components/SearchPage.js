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
              <a href="/results?keyword=컴퓨터">컴퓨터</a>
            </li>
            <li>
              <a href="/results?keyword=프로그래밍">프로그래밍</a>
            </li>
            <li>
              <a href="/results?keyword=인공지능">인공지능</a>
            </li>
            <li>
              <a href="/results?keyword=빅데이터">빅데이터</a>
            </li>
            <li>
              <a href="/results?keyword=자료구조">자료구조</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;