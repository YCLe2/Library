const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // HTML 태그 제거
};

const BookList = ({ books }) => {
  return (
    <div className="container mt-4">
      <h4>검색 결과:</h4>
      {books.length === 0 ? (
        <p>결과가 없습니다.</p>
      ) : (
        <ul className="list-group">
          {books.map((book, index) => (
            <li className="list-group-item" key={index}>
              <h5>{stripHtmlTags(book.titleInfo) || "제목 없음"}</h5>
              <p>저자: {book.author_info || "저자 정보 없음"}</p>
              <p>출판사: {book.pub_info || "출판사 정보 없음"}</p>
              <p>발행년도: {book.pub_year_info || "발행년도 정보 없음"}</p>
              <p>ISBN: {book.isbn || "ISBN 정보 없음"}</p>
              <p>청구기호: {book.call_no || "청구기호 정보 없음"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
