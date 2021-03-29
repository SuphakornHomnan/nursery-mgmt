import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../scss/responsive-resgister.scss"

const FatherForm = () => {
  const dispatch = useDispatch();
  const fatherList = useSelector((state) => state.custodianReducer.fatherObj);
  const [father_name, setFatherName] = useState(fatherList.father_name);
  const [occupation, setOccupation] = useState(fatherList.occupation);
  const [id_card, setId_card] = useState(fatherList.id_card);
  const [email, setEmail] = useState(fatherList.email);
  const [telephone, setTelephone] = useState(fatherList.telephone);
  const [trigger, setTrigger] = useState(false);
  const sendObj = {
    father_name,
    occupation,
    id_card,
    email,
    telephone,
  };
  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_FATHER_DETAIL", payload: sendObj });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj]);
  function handleChange(type, value) {
    if (type === "name") setFatherName(value);
    if (type === "occupation") setOccupation(value);
    if (type === "id_card") setId_card(value);
    if (type === "email") setEmail(value);
    if (type === "telephone") setTelephone(value);
    setTrigger(true);
  }
  return (
    <>
      <div className="InputRow">
        <div className="InputBox">
          <label>บิดาชื่อ (Father’s Name)</label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Father’s Name..."
            name="father_name"
            value={father_name}
            onChange={({ target }) => handleChange("name", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>อาชีพ (Occupation)</label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Occupation..."
            name="fatherOccupation"
            value={occupation}
            onChange={({ target }) => handleChange("occupation", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>
            เลขบัตรประจำตัวประชาชน/หนังสือเดินทาง (ID Card/Passport Number)
          </label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="ID Card/Passport Number..."
            name="id_cardOrPassportNumberFather"
            maxLength="13"
            value={id_card}
            onChange={({ target }) => handleChange("id_card", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>E-mail</label>
          <input
            className="input is-hovered"
            type="email"
            placeholder="E-mail..."
            name="fatherEmail"
            value={email}
            onChange={({ target }) => handleChange("email", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>เบอร์โทรศัพท์ (Telephone)</label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Telephone..."
            name="fatherNumber"
            maxLength="10"
            value={telephone}
            onChange={({ target }) => handleChange("telephone", target.value)}
          />
        </div>
      </div>
    </>
  );
};
export default FatherForm;
