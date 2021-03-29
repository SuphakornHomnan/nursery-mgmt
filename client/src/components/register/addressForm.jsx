import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../firebase";
import "../../scss/responsive-resgister.scss"

const AddressForm = () => {
  const dispatch = useDispatch();
  const addressObj = useSelector((state) => state.addressReducer.addressObj);
  const addressProgress = useSelector((state) => state.addressReducer.progress);
  const [name_village, setName_village] = useState(addressObj.name_village);
  const [house_number, setHouse_number] = useState(addressObj.house_number);
  const [moo, setMoo] = useState(addressObj.moo);
  const [sub_district, setSub_district] = useState(addressObj.sub_district);
  const [district, setDistrict] = useState(addressObj.district);
  const [province, setProvince] = useState(addressObj.province);
  const [telephone, setTelephone] = useState(addressObj.telephone);
  const [house_map, setHouse_map] = useState(addressObj.house_map);
  const [photo, setPhoto] = useState("");
  const [progress, setProgress] = useState(addressProgress);
  const [trigger, setTrigger] = useState(false);
  const sendObj = {
    name_village,
    house_number,
    moo,
    sub_district,
    district,
    province,
    telephone,
    house_map,
  };
  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_ADDRESS", payload: sendObj });
      dispatch({ type: "SET_PROGRESS_ADDRESS", payload: progress });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj, progress]);
  function handleChange(type, value) {
    if (type === "name") setName_village(value);
    if (type === "houseNum") setHouse_number(value);
    if (type === "moo") setMoo(value);
    if (type === "subDistrict") setSub_district(value);
    if (type === "district") setDistrict(value);
    if (type === "province") setProvince(value);
    if (type === "telephone") setTelephone(value);
    if (type === "url") setHouse_map(value);
    if (type === "progress") setProgress(value);
    setTrigger(true);
  }
  const handleChangePhoto = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const uploadImg = () => {
    if (photo !== "") {
      let img = photo;
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
          <label>ชื่อหมู่บ้านหรือคอนโด(Name of village or condominium)</label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Name of village or condominium..."
            name="nameOfVillageOrCondominium"
            value={name_village}
            onChange={({ target }) => handleChange("name", target.value)}
          />
        </div>
        <div className="InputBox">
          <label>บ้านเลขที่ (House Number)</label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="House Number..."
            name="houseNumber"
            value={house_number}
            onChange={({ target }) => handleChange("houseNum", target.value)}
          />
        </div>
        <div className="InputBox">
          <label>หมู่ที่ (Moo)</label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Moo..."
            name="moo"
            value={moo}
            onChange={({ target }) => handleChange("moo", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>ตำบล(Sub-District)</label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Sub-District..."
            name="subDistrict"
            value={sub_district}
            onChange={({ target }) => handleChange("subDistrict", target.value)}
          />
        </div>
        <div className="InputBox">
          <label>อำเภอ(District)</label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="District..."
            name="district"
            value={district}
            onChange={({ target }) => handleChange("district", target.value)}
          />
        </div>
        <div className="InputBox">
          <label>จังหวัด(Province)</label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Province..."
            name="province"
            value={province}
            onChange={({ target }) => handleChange("province", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label htmlFor="houseMap">แผนที่บ้านโดยสังเขป // House Map</label>
          <input
            className="input is-hovered"
            type="file"
            name="houseMap"
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
          <label>เบอร์โทรศัพท์(Telephone)</label>
          <input
            className="input is-hovered"
            type="text"
            maxLength="10"
            placeholder="Telephone..."
            name="Telephone"
            value={telephone}
            onChange={({ target }) => handleChange("telephone", target.value)}
          />
        </div>
      </div>
    </>
  );
};
export default AddressForm;
