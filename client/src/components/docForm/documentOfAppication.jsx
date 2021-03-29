import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import "../../scss/responsive-docForm.scss"

const useStyles = makeStyles((theme) => ({
  inputBox: {
    margin: "0.5em",
    width: "100%",
    textAlign: "left",
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
  },
  blueText: {
    color: "blue",
    marginLeft: "10px",
  },
  labelText: {
    marginLeft: "5px",
  },
}));

const DocumentOfAppication = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const documentObj = useSelector((state) => state.documentReducer.documentObj);
  // const [name] = useState(props.match.params.name);
  const [birth_certificate, setBirthCertificate] = useState(
    documentObj.birth_certificate
  );
  const [id_card_father, setId_cardFather] = useState(
    documentObj.id_card_father
  );
  const [house_record, setHouse_record] = useState(documentObj.house_record);
  const [id_card_mother, setId_cardMother] = useState(
    documentObj.id_card_mother
  );
  const [life_lnsurance_card, setLife_insurance] = useState(
    documentObj.life_lnsurance_card
  );
  const [health_vaccination, setHealth_vaccination] = useState(
    documentObj.health_vaccination
  );
  const [baby_photo, setPhoto] = useState(documentObj.baby_photo);
  const [trigger, setTrigger] = useState(false);
  const sendObj = {
    birth_certificate,
    id_card_father,
    house_record,
    id_card_mother,
    life_lnsurance_card,
    health_vaccination,
    baby_photo,
  };
  // console.log(documentObj);
  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_DOCUMENT_FORM", payload: sendObj });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj]);
  function handleToggle(type, value) {
    let temp = false;
    temp = toggle(value);
    handleChange(type, temp);
  }
  function toggle(value) {
    if (value === false) {
      return true;
    } else {
      return false;
    }
  }
  function handleChange(type, value) {
    if (type === "birthCert") setBirthCertificate(value);
    if (type === "idFather") setId_cardFather(value);
    if (type === "houseRecord") setHouse_record(value);
    if (type === "idMother") setId_cardMother(value);
    if (type === "lifeInsurance") setLife_insurance(value);
    if (type === "healthVaccin") setHealth_vaccination(value);
    if (type === "babyPhoto") setPhoto(value);
    setTrigger(true);
  }
  return (
    <>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={birth_certificate}
              onChange={() => handleToggle("birthCert", birth_certificate)}
            />
            <label className={classes.labelText}>สำเนาใบเกิด</label>
          </label>
          <label className={classes.blueText}>
            ( a copy of Birth certificate. )
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={id_card_father}
              onChange={() => handleToggle("idFather", id_card_father)}
            />
            <label className={classes.labelText}>
              สำเนาบัตรประชาชนบิดาหรือสำเนาพาสปอร์ต
            </label>
          </label>
          <label className={classes.blueText}>
            ( a copy of ID card or Passport of Father. )
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={house_record}
              onChange={() => handleToggle("houseRecord", house_record)}
            />
            <label className={classes.labelText}>สำเนาทะเบียนบ้าน</label>
          </label>
          <label className={classes.blueText}>
            ( a copy of House record. )
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={id_card_mother}
              onChange={() => handleToggle("idMother", id_card_mother)}
            />
            <label className={classes.labelText}>
              สำเนาบัตรประชาชนมารดาหรือสำเนาพาสปอร์ต
            </label>
          </label>
          <label className={classes.blueText}>
            ( a copy of ID card or Passport of Mother. )
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={life_lnsurance_card}
              onChange={() =>
                handleToggle("lifeInsurance", life_lnsurance_card)
              }
            />
            <label className={classes.labelText}>สำเนาบัตรประกันชีวิต</label>
          </label>
          <label className={classes.blueText}>
            ( a copy of Life Insurance card. )
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={health_vaccination}
              onChange={() => handleToggle("healthVaccin", health_vaccination)}
            />
            <label className={classes.labelText}>
              สำเนาใบตรวจสุขภาพฉีดวัคซีน
            </label>
          </label>
          <label className={classes.blueText}>
            ( a copy of Health Examination and Vaccination Record. )
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={baby_photo}
              onChange={() => handleToggle("babyPhoto", baby_photo)}
            />
            <label className={classes.labelText}>
              รูปถ่าย 2นิ้ว จำนวน 4 รูป
            </label>
          </label>
          <label className={classes.blueText}>( baby 4 photos (2-inch) )</label>
        </div>
      </div>
    </>
  );
};
export default DocumentOfAppication;
