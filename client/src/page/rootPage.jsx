import React from "react";
import NavbarMain from "../components/navbarMain";
import "../scss/rootPage.scss";

const RootPage = () => {
  return (
    <>
      <NavbarMain />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="header-root-page">อัพเดทล่าสุด (14 March 2021)</div>
      <div className="body-root-page col">
        <p>- เพิ่มช่องรายการในหน้าปริ้นใบเสร็จ (หน้าบัญชี)</p>
        <p>- เพิ่มประเภทของชุดฟอร์มต่างๆ ในส่วนของการเพิ่มรายการบัญชี โดยที่ประเภทนี้จะมีการตัดรายการในคลังสินค้าอัตโนมัติ(หน้าประวัติ)</p>
      </div>
    </>
  );
};

export default RootPage;
