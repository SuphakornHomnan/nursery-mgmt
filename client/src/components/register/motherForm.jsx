import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../scss/responsive-resgister.scss"

const MotherForm = () => {
  const dispatch = useDispatch();
  const motherObj = useSelector((state) => state.custodianReducer.motherObj);
  const [mother_name, setMother_name] = useState(motherObj.name);
  const [occupation, setOccupation] = useState(motherObj.occupation);
  const [id_card, setId_card] = useState(motherObj.id_card);
  const [email, setEmail] = useState(motherObj.email);
  const [telephone, setTelephone] = useState(motherObj.telephone);
  const [trigger, setTrigger] = useState(false);
  const sendObj = {
    name: mother_name,
    occupation,
    id_card,
    email,
    telephone,
  };
  // console.log(motherObj);
  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_MOTHER_DETAIL", payload: sendObj });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj]);
  // const [child_id] = useState(props.match.params.id);
  function handleChange(type, value) {
    if (type === "name") setMother_name(value);
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
          <label>มารดาชื่อ (Mother’s Name)</label>
          <input
            class="input is-hovered"
            type="text"
            placeholder="Mother’s Name..."
            name="mother_name"
            onChange={({ target }) => handleChange("name", target.value)}
            value={mother_name}
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
            name="motherOccupation"
            onChange={({ target }) => handleChange("occupation", target.value)}
            value={occupation}
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
            name="id_cardOrPassportNumberMother"
            maxLength="13"
            onChange={({ target }) => handleChange("id_card", target.value)}
            value={id_card}
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
            name="motherEmail"
            onChange={({ target }) => handleChange("email", target.value)}
            value={email}
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
            name="motherNumber"
            maxLength="10"
            onChange={({ target }) => handleChange("telephone", target.value)}
            value={telephone}
          />
        </div>
      </div>
    </>
  );
};
export default MotherForm;
