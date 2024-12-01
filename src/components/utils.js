export const getThumbnailUrl = (bookId) => {
  return `http://cover.nl.go.kr/kolis/${bookId.slice(3, 7)}/${bookId}_thumbnail.jpg`;
};

export const getThumbnailUrl2 = (bookId) => {
  return `http://cover.nl.go.kr/kolis/${bookId.slice(3, 7)}/${bookId}01_thumbnail.jpg`;
};

export const stripHtmlTags = (html) => {
  if (!html) return "정보 없음"; // 데이터가 없을 경우 기본값
  return html.replace(/<\/?[^>]+(>|$)/g, ""); // HTML 태그 제거
};