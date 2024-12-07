import React from "react";
import "./aboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1>개발자 소개</h1>
      <div className="developer-profiles">
        <div className="developer-profile">
          <img
            src="https://via.placeholder.com/150"
            alt="개발자 사진"
            className="developer-photo"
          />
          <div className="developer-info">
            <h2>이영찬</h2>
            <p>
              안녕하세요! 저는 이영찬입니다. 소프트웨어 개발에 열정을 가지고 있으며,
              다양한 프로젝트를 통해 경험을 쌓아왔습니다. 주로 웹 개발과 관련된
              기술을 다루며, 사용자 친화적인 인터페이스와 효율적인 백엔드를
              구현하는 것을 목표로 하고 있습니다.
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
            src="https://via.placeholder.com/150"
            alt="개발자 사진"
            className="developer-photo"
          />
          <div className="developer-info">
            <h2>홍길동</h2>
            <p>
              안녕하세요! 저는 홍길동입니다. 소프트웨어 개발에 열정을 가지고 있으며,
              다양한 프로젝트를 통해 경험을 쌓아왔습니다. 주로 모바일 앱 개발과 관련된
              기술을 다루며, 사용자 친화적인 인터페이스와 효율적인 백엔드를
              구현하는 것을 목표로 하고 있습니다.
            </p>
            <p>
              <strong>기술 스택:</strong> Kotlin, Swift, React Native
            </p>
            <p>
              <strong>이메일:</strong> example@example.com
            </p>
            <p>
              <strong>GitHub:</strong> <a href="https://github.com/example">example</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;