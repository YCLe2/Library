import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import './App.css'; // 스타일 파일 가져오기

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/detailed-search" element={<DetailedSearchPage />} />
      </Routes>
    </Router>
  );
};

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

const ResultsPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [innerSearchKeyword, setInnerSearchKeyword] = useState("");
  const [isInnerSearch, setIsInnerSearch] = useState(false);
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchBooks = async () => {
      const API_KEY = "3c36c118ce983ddd41fc444317cb1c81ed0d55637df22a53fae7f37a23edabd8";
      const BASE_URL = "https://www.nl.go.kr/NL/search/openApi/search.do";

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            key: API_KEY,
            srchTarget: "total",
            kwd: keyword,
            pageNum: 1,
            pageSize: 10,
            apiType: "json",
          },
        });

        setBooks(response.data.result || []);
        setFilteredBooks(response.data.result || []);
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        setBooks([]);
        setFilteredBooks([]);
      }
    };

    if (keyword) {
      fetchBooks();
    }
  }, [keyword]);

  const handleInnerSearch = () => {
    if (isInnerSearch) {
      setFilteredBooks(
        books.filter(book =>
          book.titleInfo.includes(innerSearchKeyword) ||
          book.authorInfo.includes(innerSearchKeyword) ||
          book.pubInfo.includes(innerSearchKeyword)
        )
      );
    } else {
      setFilteredBooks(books);
    }
  };

  React.useEffect(() => {
    handleInnerSearch();
  }, [innerSearchKeyword, isInnerSearch]);

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
        뒤로가기
      </button>
      <button className="btn btn-secondary mb-3 ms-2" onClick={() => navigate("/detailed-search")}>
        상세검색
      </button>
      <div className="d-flex justify-content-end mb-3">
        <input
          type="checkbox"
          checked={isInnerSearch}
          onChange={(e) => setIsInnerSearch(e.target.checked)}
        />
        <label className="ms-2">결과 내 검색</label>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="검색어를 입력하세요"
          value={innerSearchKeyword}
          onChange={(e) => setInnerSearchKeyword(e.target.value)}
          disabled={!isInnerSearch}
        />
        <button className="btn btn-primary" onClick={handleInnerSearch} disabled={!isInnerSearch}>
          검색
        </button>
      </div>
      <h4>검색 결과:</h4>
      {filteredBooks.length === 0 ? (
        <p>결과가 없습니다.</p>
      ) : (
        <ul className="list-group">
          {filteredBooks.map((book, index) => (
            <li className="list-group-item d-flex align-items-center" key={index}>
              {/* 썸네일 이미지 */}
              <img
                src={getThumbnailUrl(book.controlNo)}
                alt="책 썸네일"
                className="img-thumbnail me-3"
                style={{ width: "100px", height: "auto" }}
                onError={(e) => {
                  if(e.target.src === getThumbnailUrl(book.controlNo)) {
                    e.target.src = getThumbnailUrl2(book.controlNo);
                }else{
                  e.target.src = "https://library.handong.edu/image/ko/solution/local/noCoverImg.jpg";
                }
              }}
              />
              <div>
                <h5>{stripHtmlTags(book.titleInfo)}</h5>
                <p>저자: {stripHtmlTags(book.authorInfo)}</p>
                <p>출판사: {stripHtmlTags(book.pubInfo)}</p>
                <p>발행년도: {stripHtmlTags(book.pubYearInfo)}</p>
                <p>등록번호: {stripHtmlTags(book.id)}</p>
                <p>청구기호: {stripHtmlTags(book.callNo)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const DetailedSearchPage = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center">상세 검색</h1>
      {/* 상세 검색 폼을 여기에 추가 */}
    </div>
  );
};

const getThumbnailUrl = (bookId) => {
  return `http://cover.nl.go.kr/kolis/${bookId.slice(3, 7)}/${bookId}_thumbnail.jpg`;
};
const getThumbnailUrl2 = (bookId) => {
  return `http://cover.nl.go.kr/kolis/${bookId.slice(3, 7)}/${bookId}01_thumbnail.jpg`;
}

const stripHtmlTags = (html) => {
  if (!html) return "정보 없음"; // 데이터가 없을 경우 기본값
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // HTML 태그 제거
};

export default App;