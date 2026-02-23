import React from "react";
import HeadTop from "./HeadTop";
import Search from "./Search";
import Navbar from "./Navbar";

const Header = ({ cartItems, setIsLoginModalOpen }) => {
  return (
    <>
      <HeadTop setIsLoginModalOpen={setIsLoginModalOpen} />
      
      <Search cartItems={cartItems} setIsLoginModalOpen={setIsLoginModalOpen} />
      
      <Navbar />
    </>
  );
};

export default Header;