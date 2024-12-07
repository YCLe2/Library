import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../Styles/ListPage.css";
import { getThumbnailUrl, getThumbnailUrl2 } from "../utils";

const ListPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("title");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [resultsPerPage, setResultsPerPage] = useState(10);
// Modal state
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();
  const mockAPI = "https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/my_library";
  
  // Load data from the Mock API
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(mockAPI);
        const result = await response.json();
        setData(result);
        setFilteredData(result); // Initialize filtered data
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  const handleSearch = () => {
    let filtered = [...data];
  
    // 검색 필터
    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item[searchCategory]?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    // 날짜 필터
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.rental_date) >= new Date(dateRange.start) &&
          new Date(item.return_date) <= new Date(dateRange.end)
      );
    }
  
    // 정렬 로직
    if (sortField) {
      const fieldMapping = {
        title: "book_name",
        title_nick: "nickname",
        author: "writer",
        rental_date: "rental_date",
        return_date: "return_date",
      };
  
      const mappedField = fieldMapping[sortField];

      filtered.sort((a, b) => {
      const valA = a[mappedField] || ""; // 매핑된 필드 값
      const valB = b[mappedField] || ""; // 매핑된 필드 값

      // 날짜 필드 처리
      const isDate =
        sortField === "rental_date" || sortField === "return_date";
      const valAParsed = isDate ? new Date(valA) : valA;
      const valBParsed = isDate ? new Date(valB) : valB;

      if (sortOrder === "asc") {
        return valAParsed > valBParsed ? 1 : -1;
      } else {
        return valAParsed < valBParsed ? 1 : -1;
      }
    });
      console.log("Sort Field:", sortField);
    console.log("Sort Order:", sortOrder);


    }
    console.log("Filtered Data after sorting:", filtered);
    setFilteredData(filtered);
  };
  
  

  const handleDelete = async (bookId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`${mockAPI}/${bookId}`, { method: "DELETE" });
        if (response.ok) {
          setData(data.filter((item) => item.no !== bookId));
          setFilteredData(filteredData.filter((item) => item.no !== bookId)); // Update filteredData
          alert("삭제가 완료되었습니다.");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };
  return (
    <div>
      <div className="container my-5">
        <h1 className="mb-4 text-center">자료대출/예약/갱신</h1>

        {/* Search and Filter Section */}
        <div
  className="filter-container mb-4"
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ddd",
    padding: "10px",
  }}
>
  <select
    id="searchCategory"
    className="form-select"
    value={searchCategory}
    onChange={(e) => setSearchCategory(e.target.value)}
  >
    <option value="title">도서명</option>
    <option value="title_nick">도서별칭</option>
    <option value="author">저자</option>
  </select>
  <input
    id="searchKeyword"
    className="form-control"
    type="text"
    placeholder="검색어를 입력하세요"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  {/* 대출일(시작) */}
  <div
    className="d-flex align-items-center"
    style={{ gap: "5px", whiteSpace: "nowrap" }}
  >
    <label htmlFor="dateStart" style={{ fontSize: "12px", marginBottom: "0" }}>
      대출일(시작)
    </label>
    <input
      type="date"
      id="dateStart"
      className="form-control"
      value={dateRange.start}
      onChange={(e) =>
        setDateRange({ ...dateRange, start: e.target.value })
      }
    />
  </div>
  {/* 대출일(끝) */}
  <div
    className="d-flex align-items-center"
    style={{ gap: "5px", whiteSpace: "nowrap" }}
  >
    <label htmlFor="dateEnd" style={{ fontSize: "12px", marginBottom: "0" }}>
      대출일(끝)
    </label>
    <input
      type="date"
      id="dateEnd"
      className="form-control"
      value={dateRange.end}
      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
    />
  </div>
  <select
    id="sortField"
    className="form-select"
    value={sortField}
    onChange={(e) => setSortField(e.target.value)}
  >
    <option value="">정렬항목</option>
    <option value="title">도서명</option>
    <option value="title_nick">도서별칭</option>
    <option value="author">저자</option>
    <option value="rental_date">대출일</option>
    <option value="return_date">반납일</option>
  </select>
  <select
    id="sortOrder"
    className="form-select"
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
  >
    <option value="asc">오름차순</option>
    <option value="desc">내림차순</option>
  </select>
  <select
    className="form-select"
    value={resultsPerPage}
    onChange={(e) => setResultsPerPage(Number(e.target.value))}
  >
    <option value="10">10건</option>
    <option value="15">15건</option>
    <option value="20">20건</option>
    <option value="30">30건</option>
    <option value="50">50건</option>
    <option value="100">100건</option>
  </select>
  <button className="btn btn-primary" onClick={handleSearch}>
    조회
</button>
</div>
        


        {/* Data Table */}
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Actions</th>
              <th>No.</th>
              <th>도서명</th>
              <th>도서<br/>별칭</th>
              <th>저자명</th>
              <th>등록번호</th>
              <th>청구기호</th>
              <th>출판사명</th>
              {/* <th>ISBN</th> */}
              <th>출판<br/>연도</th>
              <th>대출일</th>
              <th>반납일</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.slice(0, resultsPerPage).map((item, index) => (
                <tr key={item.no}>
                  <td>
                    <FaEdit
                      className="text-primary me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/update/${item.no}`)}
                    />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(item.no)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td className="book-name text-primary" onClick={() => openModal(item)}>{item.book_name}</td>
                  <td>{item.nickname}</td>
                  <td>{item.writer}</td>
                  <td>{item.register_code}</td>
                  <td>{item.call_num}</td>
                  <td>{item.publisher}</td>
                  {/* <td>{item.ISBN}</td> */}
                  {/* <td>{item.ISBN.split(" ")[0]}</td> */}


                  <td>{item.published_year}</td>
                  <td>{item.rental_date}</td>
                  <td>{item.return_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal for Book Details */}
      {selectedBook && (
        <Modal show={isModalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>도서 상세 정보</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <img
                src={getThumbnailUrl(selectedBook.controlNo)}
                alt="책 썸네일"
                className="img-thumbnail_list me-3"
                
                onError={(e) => {
                  if(e.target.src === getThumbnailUrl(selectedBook.controlNo)) {
                    e.target.src = getThumbnailUrl2(selectedBook.controlNo);
                }else{
                  e.target.src = "https://library.handong.edu/image/ko/solution/local/noCoverImg.jpg";
                }
              }}
              />
            <p><strong>도서명:</strong> {selectedBook.book_name}</p>
            <p><strong>도서별칭:</strong> {selectedBook.nickname}</p>
            <p><strong>저자:</strong> {selectedBook.writer}</p>
            <p><strong>출판사:</strong> {selectedBook.publisher}</p>
            <p><strong>출판연도:</strong> {selectedBook.published_year}</p>
            <p><strong>등록번호:</strong> {selectedBook.register_code}</p>
            <p><strong>ISBN:</strong> {selectedBook.ISBN}</p>
            <p><strong>대출일:</strong> {selectedBook.rental_date}</p>
            <p><strong>반납일:</strong> {selectedBook.return_date}</p>
            <p><strong>추천글:</strong> {selectedBook.comment}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ListPage;