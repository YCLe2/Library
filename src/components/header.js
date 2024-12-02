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
        </div>
        <div className="divTopMenu">
            <div className="topMenu">
                <div>
                    <ul>
                        <li class="menu1">
                            <a href="/results">검색</a>
                        </li>
                        <li class="menu2">
                            <a href="/detailed-search">상세검색</a>
                        </li>
                        <li class="menu3">
                            <a href="https://hisnet.handong.edu/">Hisnet</a>
                        </li>
                        <li class="menu4">
                            <a href="/about">About</a>
                        </li>
                        <li class="menu5">
                            <a href="https://2024oss-react-final.vercel.app/list">myLibrary</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  );
};

export default Header;