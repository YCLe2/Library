import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdatePage = () => {
  const { id } = useParams(); // Get the ID from the route
  const navigate = useNavigate();
  const mockAPI = `https://672cb0b81600dda5a9f980b5.mockapi.io/api/v1/my_library/${id}`;

  const [formData, setFormData] = useState({
    register_code: "",
    book_name: "",
    writer: "",
    publisher: "",
    ISBN: "",
    published_year: "",
    call_num: "",
    nickname: "",
    comment: ""
  });

  // Fetch current data for the item
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(mockAPI);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchData();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(mockAPI, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("수정이 완료되었습니다.");
        navigate("/list"); // Redirect to the list page
      } else {
        alert("수정에 실패했습니다.");
        console.error("Error updating data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">도서 정보 수정</h1>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="register_code" className="form-label">
              등록번호
            </label>
            <input
              type="text"
              id="register_code"
              name="register_code"
              value={formData.register_code}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="book_name" className="form-label">
              도서명
            </label>
            <input
              type="text"
              id="book_name"
              name="book_name"
              value={formData.book_name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="writer" className="form-label">
              저자명
            </label>
            <input
              type="text"
              id="writer"
              name="writer"
              value={formData.writer}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="publisher" className="form-label">
              출판사명
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="ISBN" className="form-label">
              ISBN
            </label>
            <input
              type="text"
              id="ISBN"
              name="ISBN"
              value={formData.ISBN}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="published_year" className="form-label">
              출판연도
            </label>
            <input
              type="text"
              id="published_year"
              name="published_year"
              value={formData.published_year}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          <div className="col-md-6">
            <label htmlFor="comment" className="form-label">
              코멘트
            </label>
            <input
              type="text"
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="call_num" className="form-label">
              청구기호
            </label>
            <input
              type="text"
              id="call_num"
              name="call_num"
              value={formData.call_num}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="nickname" className="form-label">
              도서별칭
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary me-2">
            수정하기
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/myLibrary")}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
