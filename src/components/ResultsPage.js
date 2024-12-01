import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import Pagination from "./Pagination";
import { getThumbnailUrl, getThumbnailUrl2, stripHtmlTags } from "./utils";

const ResultsPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [innerSearchKeyword, setInnerSearchKeyword] = useState("");
  const [innerSearchCategory, setInnerSearchCategory] = useState("title");
  const [sortOption, setSortOption] = useState("none");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [applySettings, setApplySettings] = useState(false);
  const [isInnerSearch, setIsInnerSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async (searchKeyword) => {
      const API_KEY = "3c36c118ce983ddd41fc444317cb1c81ed0d55637df22a53fae7f37a23edabd8";
      const BASE_URL = "https://www.nl.go.kr/NL/search/openApi/search.do";
      let allBooks = [];
      let pageNum = 1;
      let totalResults = 0;

      try {
        do {
          const response = await axios.get(BASE_URL, {
            params: {
              key: API_KEY,
              srchTarget: "total",
              kwd: searchKeyword,
              pageNum: pageNum,
              pageSize: 10,
              apiType: "json",
            },
          });

          const results = response.data.result || [];
          allBooks = [...allBooks, ...results];
          totalResults = response.data.total || 0;
          pageNum++;
        } while (allBooks.length < totalResults);

        setBooks(allBooks);
        setFilteredBooks(allBooks);
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        setBooks([]);
        setFilteredBooks([]);
      }
    };

    if (keyword) {
      fetchBooks(keyword);
    }
  }, [keyword]);

  const handleInnerSearch = () => {
    if (isInnerSearch) {
      let filtered = [];
      switch (innerSearchCategory) {
        case "title":
          filtered = books.filter(book => book.titleInfo.includes(innerSearchKeyword));
          break;
        case "author":
          filtered = books.filter(book => book.authorInfo.includes(innerSearchKeyword));
          break;
        case "publisher":
          filtered = books.filter(book => book.pubInfo.includes(innerSearchKeyword));
          break;
        default:
          filtered = books;
      }
      setFilteredBooks(filtered);
    } else {
      navigate(`/results?keyword=${innerSearchKeyword}`);
    }
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSort = (books) => {
    let sortedBooks = [...books];
    switch (sortOption) {
      case "title":
        sortedBooks.sort((a, b) => a.titleInfo.localeCompare(b.titleInfo));
        break;
      case "author":
        sortedBooks.sort((a, b) => a.authorInfo.localeCompare(b.authorInfo));
        break;
      case "publisher":
        sortedBooks.sort((a, b) => a.pubInfo.localeCompare(b.pubInfo));
        break;
      case "pubYear":
        sortedBooks.sort((a, b) => a.pubYearInfo.localeCompare(b.pubYearInfo));
        break;
      default:
        break;
    }
    if (sortOrder === "desc") {
      sortedBooks.reverse();
    }
    return sortedBooks;
  };

  const sortedBooks = applySettings ? handleSort(filteredBooks) : filteredBooks;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShowModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const handleApplySettings = () => {
    setApplySettings(true);
    setCurrentPage(1); // Reset to first page on new settings
  };

  const handleRentBook = async () => {
    if (selectedBook) {
      try {
        // Fetch existing records from the mock API
        const existingRecordsResponse = await axios.get("https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/my_library");
        const existingRecords = existingRecordsResponse.data;

        // Check if the selected book is already rented
        const isAlreadyRented = existingRecords.some(record => record.register_code === stripHtmlTags(selectedBook.id));

        if (isAlreadyRented) {
          alert("이미 대여한 책입니다.");
        } else {
          // Get today's date and the return date (7 days from today)
          const today = new Date();
          const rentalDate = today.toISOString().split('T')[0];
          const returnDate = new Date(today.setDate(today.getDate() + 7)).toISOString().split('T')[0];

          // Proceed with renting the book
          const response = await axios.post("https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/my_library", {
            register_code: stripHtmlTags(selectedBook.id),
            book_name: stripHtmlTags(selectedBook.titleInfo),
            writer: stripHtmlTags(selectedBook.authorInfo),
            publisher: stripHtmlTags(selectedBook.pubInfo),
            published_year: stripHtmlTags(selectedBook.pubYearInfo),
            call_num: selectedBook.callNo,
            rental_date: rentalDate,
            return_date: returnDate,
            nickname: nickname,
            ISBN: stripHtmlTags(selectedBook.isbn),
          });
          console.log("Book rented successfully:", response.data);
          alert("대여가 완료되었습니다.");
          setShowNicknameModal(false);
        }
      } catch (error) {
        console.error("Error renting book:", error);
        alert("대여 중 오류가 발생했습니다.");
      }
    }
  };

  const handleShowNicknameModal = () => {
    setShowModal(false);
    setShowNicknameModal(true);
  };

  const handleCloseNicknameModal = () => {
    setShowNicknameModal(false);
    setNickname("");
  };

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
      <div className="d-flex justify-content-end mb-3">
        <DropdownButton
          id="dropdown-basic-button"
          title={`${innerSearchCategory === "title" ? "제목" : innerSearchCategory === "author" ? "저자" : "출판사"}`}
          onSelect={(e) => setInnerSearchCategory(e)}
          variant="light"
        >
          <Dropdown.Item eventKey="title">제목</Dropdown.Item>
          <Dropdown.Item eventKey="author">저자</Dropdown.Item>
          <Dropdown.Item eventKey="publisher">출판사</Dropdown.Item>
        </DropdownButton>
        <div className="input-group ms-2" style={{ maxWidth: '300px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="검색어를 입력하세요"
            value={innerSearchKeyword}
            onChange={(e) => setInnerSearchKeyword(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleInnerSearch}>
            검색
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <DropdownButton
          id="dropdown-sort-button"
          title={`정렬: ${sortOption === "none" ? "정렬안함" : sortOption === "title" ? "제목" : sortOption === "author" ? "저자" : sortOption === "publisher" ? "출판사" : "발행년도"}`}
          onSelect={(e) => setSortOption(e)}
          variant="light"
        >
          <Dropdown.Item eventKey="none">정렬안함</Dropdown.Item>
          <Dropdown.Item eventKey="title">제목</Dropdown.Item>
          <Dropdown.Item eventKey="author">저자</Dropdown.Item>
          <Dropdown.Item eventKey="publisher">출판사</Dropdown.Item>
          <Dropdown.Item eventKey="pubYear">발행년도</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-order-button"
          title={`순서: ${sortOrder === "asc" ? "오름차순" : "내림차순"}`}
          onSelect={(e) => setSortOrder(e)}
          variant="light"
          className="ms-2"
        >
          <Dropdown.Item eventKey="asc">오름차순</Dropdown.Item>
          <Dropdown.Item eventKey="desc">내림차순</Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-results-per-page"
          title={`${booksPerPage}`}
          onSelect={(e) => setBooksPerPage(Number(e))}
          variant="light"
          className="ms-2"
        >
          <Dropdown.Item eventKey="10">10</Dropdown.Item>
          <Dropdown.Item eventKey="20">20</Dropdown.Item>
          <Dropdown.Item eventKey="30">30</Dropdown.Item>
          <Dropdown.Item eventKey="50">50</Dropdown.Item>
        </DropdownButton>
        <button className="btn btn-primary ms-2" onClick={handleApplySettings}>
          조회
        </button>
      </div>
      <h4>검색 결과:</h4>
      {currentBooks.length === 0 ? (
        <p>결과가 없습니다.</p>
      ) : (
        <ul className="list-group">
          {currentBooks.map((book, index) => (
            <li className="list-group-item d-flex align-items-center" key={index}>
              <div className="me-3">
                <span>{indexOfFirstBook + index + 1}.</span>
              </div>
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
                <h5 onClick={() => handleShowModal(book)} style={{ cursor: 'pointer', color: 'blue' }}>
                  {stripHtmlTags(book.titleInfo)}
                </h5>
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
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={filteredBooks.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {selectedBook && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{stripHtmlTags(selectedBook.titleInfo)}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>등록번호:</strong> {stripHtmlTags(selectedBook.id)}</p>
            <p><strong>표제/저자사항:</strong> {stripHtmlTags(selectedBook.titleInfo)} / {stripHtmlTags(selectedBook.authorInfo)}</p>
            <p><strong>발행사항:</strong> {stripHtmlTags(selectedBook.pubInfo)} ({stripHtmlTags(selectedBook.pubYearInfo)})</p>
            <p><strong>형태사항:</strong> {selectedBook.mediaName|| "정보 없음"}</p>
            <p><strong>ISBN:</strong> {selectedBook.isbn || "정보 없음"}</p>
            <p><strong>청구기호:</strong> {selectedBook.callNo || "정보 없음"}</p>
            <p><strong>분류기호:</strong> {selectedBook.classNo || "정보 없음"}</p>
            <p><strong>주제명:</strong> {selectedBook.kdcName1s || "정보 없음"}</p>
            <img
              src={getThumbnailUrl(selectedBook.controlNo)}
              alt="책 썸네일"
              className="img-thumbnail"
              style={{ width: "100px", height: "auto" }}
              onError={(e) => {
                if(e.target.src === getThumbnailUrl(selectedBook.controlNo)) {
                  e.target.src = getThumbnailUrl2(selectedBook.controlNo);
              }else{
                e.target.src = "https://library.handong.edu/image/ko/solution/local/noCoverImg.jpg";
              }
            }}
            />
            <Button variant="primary" onClick={handleShowNicknameModal} className="mt-3">
              대여
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal show={showNicknameModal} onHide={handleCloseNicknameModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>별칭 입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="별칭을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNicknameModal}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleRentBook}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResultsPage;