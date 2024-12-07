import React from "react";
import "./aboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1>개발자 소개</h1>
      <div className="developer-profiles">
        <div className="developer-profile">
          <img
            src="https://i.ibb.co/L0B25pG/IMG-2653.jpg"
            alt="개발자 사진"
            className="developer-photo"
          />
          <div className="developer-info">
            <h2>이영찬</h2>
            <p>
              안녕하세요. 저는 이영찬입니다. 아직 개발하는데에 있어 많이 부족하지만 열심히 노력하는 개발자입니다.
            </p>
            <p>
              <strong>부서:</strong> 오픈소스 스튜디오
            </p>
            <p>
              <strong>기술 스택:</strong> C/C++, JavaScript, Java, Python
            </p>
            <p>
              <strong>이메일:</strong> 22000541@handong.ac.kr
            </p>
            <p>
              <strong>GitHub:</strong> <a href="https://github.com/YCLe2">YCLe2</a>
            </p>
          </div>
        </div>
        <div className="developer-profile">
          <img
            src="https://avatars.githubusercontent.com/u/89994082?v=4"
            alt="개발자 사진"
            className="developer-photo"
          />
          <div className="developer-info">
            <h2>이선환</h2>
            <p>
            안녕하세요, 저는 이선환입니다. 소프트웨어 개발 및 기획에 열정을 가지고 있으며, 다양한 프로젝트를 통해 경험을 쌓아왔습니다. 주로 웹 개발과 관련된 기술을 다루며, 사용자 친화적인 인터페이스와 효율적이고 안전한 백엔드를 구현하는 것을 목표로 하고 있습니다.
            </p>
            <p>
              <strong>부서:</strong> 오픈소스 스튜디오
            </p>
            <p>
              <strong>기술 스택:</strong> C/C++, Python, React, Spring, Java
            </p>
            <p>
              <strong>이메일:</strong> sunhwan33@handong.ac.kr
            </p>
            <p>
              <strong>GitHub:</strong> <a href="https://github.com/sunhwan33">sunhwan33</a>
            </p>
          </div>
        </div>
      </div>
      <p />
      <h1>멘토 소개</h1>
      <div className="mento-profiles">
        <div className="mento-profile">
          <img
            src="https://i.ibb.co/Q7gYkm9/Kakao-Talk-Photo-2024-12-07-14-06-39.webp"
            alt="멘토 사진"
            className="mento-photo"
          />
          <div className="mento-info">
            <h2>하지민</h2>
            <p>
            안녕하세요, 저는 하지민입니다. 컴퓨터를 사랑하는 개발자입니다.
            </p>
            <p>
              <strong>부서:</strong> 실전스튜디오
            </p>
            <p>
              <strong>기술 스택:</strong> C/C++, Python
            </p>
            <p>
              <strong>이메일:</strong> 22100766@handong.ac.kr
              </p>
            <p>
              <strong>GitHub:</strong> <a href="https://github.com/Ha-jimin">Ha-jimin</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;