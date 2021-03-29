import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../firebase";
import "../../scss/responsive-resgister.scss"


const CustodianForm = () => {
  const dispatch = useDispatch();
  const custodianObj = useSelector(
    (state) => state.custodianReducer.custodianObj
  );
  const custodianProgress = useSelector(
    (state) => state.custodianReducer.progress
  );
  const [guardian_name, setGuardian_name] = useState(custodianObj.name);
  const [occupation, setOccupation] = useState(custodianObj.occupation);
  const [id_card, setId_card] = useState(custodianObj.id_card);
  const [relationship, setRelationship] = useState(custodianObj.relationship);
  const [email, setEmail] = useState(custodianObj.email);
  const [telephone, setTelephone] = useState(custodianObj.telephone);
  const [sign, setPhoto] = useState("");
  const [date_sign, setDate] = useState(custodianObj.date_sign);
  const [progress, setProgress] = useState(custodianProgress);
  const [url, setUrl] = useState(custodianObj.url);
  const [trigger, setTrigger] = useState(false);
  const sendObj = {
    name: guardian_name,
    occupation,
    id_card,
    relationship,
    email,
    telephone,
    date_sign,
    url,
  };
  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_CUSTODIAN_DETAIL", payload: sendObj });
      dispatch({ type: "SET_PROGRESS_CUSTODIAN", payload: progress });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj, progress]);
  function handleChange(type, value) {
    if (type === "name") setGuardian_name(value);
    if (type === "occupation") setOccupation(value);
    if (type === "id_card") setId_card(value);
    if (type === "email") setEmail(value);
    if (type === "telephone") setTelephone(value);
    if (type === "relationship") setRelationship(value);
    if (type === "dateSign") setDate(value);
    if (type === "url") setUrl(value);
    if (type === "progress") setProgress(value);
    setTrigger(true);
  }
  const handleChangePhoto = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const uploadImg = () => {
    if (sign !== "") {
      let img = sign;
      const uploadTask = storage.ref(`images/${img.name}`).put(img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          handleChange("progress", progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images")
            .child(img.name)
            .getDownloadURL()
            .then(async (url) => {
              handleChange("url", url);
            });
        }
      );
    }
  };

  return (
    <>
      <div className="InputRow">
        <div className="InputBox">
          <label>ผู้ปกครองชื่อ (Guardian’s Name)</label>
          <input
            class="input is-hovered"
            type="text"
            placeholder="Guardian’s Name..."
            name="Guardian_name"
            value={guardian_name}
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
            name="GuardianOccupation"
            value={occupation}
            onChange={({ target }) => handleChange("occupation", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>มีความเกี่ยวข้องเป็น (Relationship)</label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Relationship..."
            name="relationship"
            value={relationship}
            onChange={({ target }) =>
              handleChange("relationship", target.value)
            }
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
            name="id_cardOrPassportNumberGuardian"
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
            name="GuardianEmail"
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
            name="GuardianNumber"
            maxLength="10"
            value={telephone}
            onChange={({ target }) => handleChange("telephone", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>ลงชื่อ(Sign)</label>
          <input
            className="input is-hovered"
            type="file"
            placeholder="Sign..."
            name="sign"
            onChange={handleChangePhoto}
          />
          <button
            className="button FontAll is-primary"
            style={{ width: "100%", marginTop: "0.25em" }}
            onClick={uploadImg}
          >
            อัพโหลดภาพ
          </button>
          <progress
            value={progress}
            max="100"
            className="progress is-info"
            style={{ marginTop: "0.25em" }}
          />
        </div>
        <div className="InputBox">
          <label>วันที่เซ็น(Date)</label>
          <input
            className="input is-hovered"
            type="date"
            name="date"
            value={date_sign}
            onChange={({ target }) => handleChange("dateSign", target.value)}
          />
        </div>
      </div>
    </>
  );
};
export default CustodianForm;
