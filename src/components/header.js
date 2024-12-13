import React from "react";
import "./header.css";

const Header = () => {
  return (
    <>
        <div className="header">
            <div className="logo">
                <a href="/">
                    <img src="https://i.ibb.co/TbTrTJ0/logo.png" alt="한동대학교" className="logo-img" />
                </a>
            </div>
            <div className="logoRight">
                <a href="https://www.nl.go.kr/">
                    <img src="https://www.museum.go.kr/ux/content/images/common/header_logo.png" alt="국립중앙도서관" className="logo-right" />
                </a>
            </div>
        </div>
        <div className="divTopMenu">
            <div className="topMenu">
                <div>
                    <ul>
                        <li class="menu1">
                            <a href="/results">검색</a>
                        </li>
                        <li class="menu3">
                            <a href="https://hisnet.handong.edu/">HISNet</a>
                        </li>
                        <li class="menu4">
                            <a href="/about">About</a>
                        </li>
                        <li class="menu5">
                            <a href="/myLibrary">My Library</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  );
};

export default Header;