import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../firebase";
import "../../scss/responsive-resgister.scss"


const ChildForm = () => {
  const dispatch = useDispatch();
  const childList = useSelector((state) => state.childReducer.childObj);
  const childProgress = useSelector((state) => state.childReducer.progress);
  const [application_date, setDate] = useState(childList.application_date);
  const [firstname, setFirstname] = useState(childList.firstname);
  const [middlename, setMiddlename] = useState(childList.middlename);
  const [lastname, setLastname] = useState(childList.lastname);
  const [nickname, setNickname] = useState(childList.nickname);
  const [race, setRace] = useState(childList.race);
  const [nationality, setNationality] = useState(childList.nationality);
  const [religion, setReligion] = useState(childList.religion);
  const [birth_date, setBirthDate] = useState(childList.birth_date);
  const [gender, setGender] = useState(childList.gender);
  const [weight, setWeight] = useState(childList.weight);
  const [height, setHeight] = useState(childList.height);
  const [siblingsNum, setSibling] = useState(childList.siblingsNum);
  const [childNum, setChildNum] = useState(childList.childNum);
  const [startDate, setStartDate] = useState(childList.startDate);
  const [childPhoto, setPhoto] = useState("");
  const [progress, setProgress] = useState(childProgress);
  const [url, setUrl] = useState(childList.url);
  const [history_accident, setHistoryAccident] = useState(
    childList.history_accident
  );
  const [immunization_record, setImmunizationRecord] = useState(
    childList.immunization_record
  );
  const [room, setRoom] = useState(childList.room);
  const [trigger, setTrigger] = useState(false);
  const sendObj = {
    firstname,
    middlename,
    lastname,
    nickname,
    race,
    nationality,
    religion,
    birth_date,
    gender,
    weight,
    height,
    siblingsNum,
    childNum,
    url,
    history_accident,
    immunization_record,
    application_date,
    room,
    startDate,
  };

  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_CHILD_DETAIL", payload: sendObj });
      dispatch({ type: "SET_PROGRESS_CHILD", payload: progress });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj, progress]);

  function handleChange(type, value) {
    if (type === "date") setDate(value);
    if (type === "firstname") setFirstname(value);
    if (type === "middlename") setMiddlename(value);
    if (type === "lastname") setLastname(value);
    if (type === "nickname") setNickname(value);
    if (type === "gender") setGender(value);
    if (type === "birthDate") setBirthDate(value);
    if (type === "race") setRace(value);
    if (type === "nationality") setNationality(value);
    if (type === "religion") setReligion(value);
    if (type === "weight") setWeight(value);
    if (type === "height") setHeight(value);
    if (type === "sibling") setSibling(value);
    if (type === "childNum") setChildNum(value);
    if (type === "room") setRoom(value);
    if (type === "startDate") setStartDate(value);
    if (type === "immunization") setImmunizationRecord(value);
    if (type === "history") setHistoryAccident(value);
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
    if (childPhoto !== "") {
      let img = childPhoto;
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
          <label>วันที่สมัคร(applicationDate)</label>
          <input
            className="input is-hovered"
            name="applicationDate"
            type="date"
            onChange={(e) => handleChange("date", e.target.value)}
            value={application_date}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>ชื่อจริง(Firstname)</label>
          <input
            className="input is-hovered"
            type="text"
            name="Firstname"
            placeholder="Firstname..."
            onChange={(e) => handleChange("firstname", e.target.value)}
            value={firstname}
          />
        </div>
        <div className="InputBox">
          <label>ชื่อกลาง(Middlename)</label>
          <input
            className="input is-hovered"
            type="text"
            name="Middlename"
            placeholder="Middlename..."
            onChange={(e) => handleChange("middlename", e.target.value)}
            value={middlename}
          />
        </div>
        <div className="InputBox">
          <label>นามสกุล(Lastame)</label>
          <input
            className="input is-hovered"
            type="text"
            name="Lastname"
            placeholder="Lastname..."
            onChange={(e) => handleChange("lastname", e.target.value)}
            value={lastname}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>ชื่อเล่น(Nickname)</label>
          <input
            className="input is-hovered"
            type="text"
            name="Nickname"
            placeholder="Nickname..."
            onChange={(e) => handleChange("nickname", e.target.value)}
            value={nickname}
          />
        </div>
        <div className="InputBox">
          <label>เพศ(Gender)</label>
          <div>
            <div className="select is-fullwidth">
              <select onChange={(e) => handleChange("gender", e.target.value)}>
                <option>ชาย(Male)</option>
                <option>หญิง(Female)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="InputBox">
          <label>เกิดวันที่ (Date of Birth)</label>
          <input
            className="input is-hovered"
            type="date"
            name="DateOfBirth"
            placeholder="Date of Birth"
            onChange={(e) => handleChange("birthDate", e.target.value)}
            value={birth_date}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>เชื้อชาติ (Race)</label>
          <input
            className="input is-hovered"
            type="text"
            name="Race"
            placeholder="Race..."
            onChange={(e) => handleChange("race", e.target.value)}
            value={race}
          />
        </div>
        <div className="InputBox">
          <label>สัญชาติ (Nationality)</label>
          <input
            className="input is-hovered"
            type="text"
            name="Nationality"
            placeholder="Nationality..."
            onChange={(e) => handleChange("nationality", e.target.value)}
            value={nationality}
          />
        </div>
        <div className="InputBox">
          <label>ศาสนา (Religion)</label>
          <input
            className="input is-hovered"
            type="text"
            name="Religion"
            placeholder="Religion..."
            onChange={(e) => handleChange("religion", e.target.value)}
            value={religion}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>น้ำหนัก (weight)</label>
          <input
            className="input is-hovered"
            type="text"
            name="Weight"
            placeholder="Weight..."
            onChange={(e) => handleChange("weight", e.target.value)}
            value={weight}
          />
        </div>
        <div className="InputBox">
          <label>ส่วนสูง (height)</label>
          <input
            className="input is-hovered"
            type="text"
            name="Height"
            placeholder="Height..."
            onChange={(e) => handleChange("height", e.target.value)}
            value={height}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>จำนวนพี่น้อง (Number of siblings)</label>
          <input
            className="input is-hovered"
            type="text"
            name="NumberOfSibings"
            placeholder="Number of siblings..."
            onChange={(e) => handleChange("sibling", e.target.value)}
            value={siblingsNum}
          />
        </div>
        <div className="InputBox">
          <label>น้องเป็นบุตรคนที่ (Child Number)</label>
          <input
            className="input is-hovered"
            type="text"
            name="ChildNumber"
            placeholder="Child Number..."
            onChange={(e) => handleChange("childNum", e.target.value)}
            value={childNum}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>ห้องเรียน(Room)</label>
          <div>
            <div className="select is-fullwidth">
              <select
                onChange={({ target }) => handleChange("room", target.value)}
                value={room}
              >
                <option value="ห้อง ก1">ห้องเรียน ก1</option>
                <option value="ห้อง ก2">ห้องเรียน ก2</option>
                <option value="ห้อง ก3">ห้องเรียน ก3</option>
                <option value="ห้อง ก4">ห้องเรียน ก4</option>
              </select>
            </div>
          </div>
        </div>
        <div className="InputBox">
          <label>วันที่เริ่มเรียน(studyDate)</label>
          <input
            className="input is-hovered"
            name="applicationDate"
            type="date"
            onChange={(e) => handleChange("startDate", e.target.value)}
            value={startDate}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>รูปถ่าย2นิ้ว ( childPhoto (2-inch) ) </label>
          <input
            className="input is-hovered"
            type="file"
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
          <label>
            การได้รับภูมิคุ้มกันโรคในแต่ละวัยของน้อง(Immunization Record)
          </label>
          <input
            className="input is-hovered"
            type="text"
            onChange={(e) => handleChange("immunization", e.target.value)}
            value={immunization_record}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>
            ประวัติการได้รับอุบัติเหตุหรือเจ็บป่วย(History of Accident or
            Illness)
          </label>
          <textarea
            className="textarea"
            onChange={(e) => handleChange("history", e.target.value)}
            value={history_accident}
          ></textarea>
        </div>
      </div>
    </>
  );
};
export default ChildForm;
