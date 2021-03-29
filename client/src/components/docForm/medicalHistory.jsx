import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

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
  uniformBox: {
    margin: "0.5em",
    textAlign: "center",
  },
  textareaBox: {
    margin: "0.5em",
    width: "50%",
    textAlign: "left",
  },
}));

const DocumentOfAppication = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const medicalObj = useSelector((state) => state.medicalReducer.medicalObj);
  const handleDisable = useSelector(
    (state) => state.medicalReducer.vaccinated_checkbox
  );
  const [
    vaccination_against_chickenpox,
    setVaccination_against_chickenbox,
  ] = useState(medicalObj.vaccination_against_chickenpox);
  const [vaccinated_checkbox, setVaccinated_checkbox] = useState(handleDisable);
  const [vaccinated_at_the_age_of, setVaccinated_at_the_age_of] = useState(
    medicalObj.vaccinated_at_the_age_of
  );
  const [
    Infectious_Disease_Mumps_or_Others,
    setInfectious_Disease_Mumps_or_Others,
  ] = useState(medicalObj.Infectious_Disease_Mumps_or_Others);
  const [
    Bronchitis_Asthma_Respiratory_Tract_Disease_Others,
    setBronchitis_Asthma_Respiratory_Tract_Disease_Others,
  ] = useState(medicalObj.Bronchitis_Asthma_Respiratory_Tract_Disease_Others);
  const [Congenital_Heart_Disease, setCongenital_Heart_Disease] = useState(
    medicalObj.Congenital_Heart_Disease
  );
  const [Diabetes, setDiabetes] = useState(medicalObj.Diabetes);
  const [Epilepsy_Febrile_Seizure, setEpilepsy_Febrile_Seizure] = useState(
    medicalObj.Epilepsy_Febrile_Seizure
  );

  const [Hospital, setEmergencyText] = useState(medicalObj.Hospital);
  const [trigger, setTrigger] = useState(false);
  const sendObj = {
    vaccination_against_chickenpox,
    vaccinated_at_the_age_of,
    Infectious_Disease_Mumps_or_Others,
    Bronchitis_Asthma_Respiratory_Tract_Disease_Others,
    Congenital_Heart_Disease,
    Diabetes,
    Epilepsy_Febrile_Seizure,
    Hospital,
  };
  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_MEDICAL_DETAIL", payload: sendObj });
      dispatch({ type: "SET_MEDICAL_DISABLE", payload: vaccinated_checkbox });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj, vaccinated_checkbox]);
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
    if (type === "vaccinationAgainst") setVaccination_against_chickenbox(value);
    if (type === "vaccinatedCheck") setVaccinated_checkbox(value);
    if (type === "vaccinatedAge") setVaccinated_at_the_age_of(value);
    if (type === "InfectiousDiseaseMumps")
      setInfectious_Disease_Mumps_or_Others(value);
    if (type === "BronchitisAsthmaRespiratory")
      setBronchitis_Asthma_Respiratory_Tract_Disease_Others(value);
    if (type === "CongenitalHeartDisease") setCongenital_Heart_Disease(value);
    if (type === "Diabetes") setDiabetes(value);
    if (type === "EpilepsyFebrileSeizure") setEpilepsy_Febrile_Seizure(value);
    if (type === "Hospital") setEmergencyText(value);
    setTrigger(true);
  }

  return (
    <>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={vaccination_against_chickenpox}
              onChange={() =>
                handleToggle(
                  "vaccinationAgainst",
                  vaccination_against_chickenpox
                )
              }
            />
            <label className={classes.labelText}>
              ฉีดวัคซีนป้องกัน อีสุกอีใส (Vaccination against chickenpox)
            </label>
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={vaccinated_checkbox}
              onChange={() =>
                handleToggle("vaccinatedCheck", vaccinated_checkbox)
              }
            />
            <label className={classes.labelText}>
              ฉัดวัคซีนแล้วตอนอายุ(Had already vaccinated at the age of)
            </label>
          </label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder=""
            name=""
            disabled={!vaccinated_checkbox}
            value={vaccinated_at_the_age_of}
            onChange={({ target }) =>
              handleChange("vaccinatedAge", target.value)
            }
          />
        </div>
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>already Vaccinated</label>
        </div>
      </div>
      <div className="InputRow">
        <div className="textAreaBox">
          <label>
            ประวัติการเป็นโรคติดเชื้อ คางทูมอื่นๆ(Infectious Disease, Mumps, or
            Others)
          </label>
          <textarea
            className="textarea"
            value={Infectious_Disease_Mumps_or_Others}
            onChange={({ target }) =>
              handleChange("InfectiousDiseaseMumps", target.value)
            }
          ></textarea>
        </div>
      </div>
      <div className="InputRow">
        <div className="textAreaBox">
          <label>
            หลอดลมอักเสบ หอบหืด โรคทางเดินหายใจ อื่นๆ(Bronchitis, Asthma,
            Respiratory Tract Disease, or Others)
          </label>
          <textarea
            className="textarea"
            value={Bronchitis_Asthma_Respiratory_Tract_Disease_Others}
            onChange={({ target }) =>
              handleChange("BronchitisAsthmaRespiratory", target.value)
            }
          ></textarea>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={Congenital_Heart_Disease}
              onChange={() =>
                handleToggle("CongenitalHeartDisease", Congenital_Heart_Disease)
              }
            />
            <label className={classes.labelText}>
              ความผิดปกติของหัวใจแต่กำเนิด(Congenital Congenital_Heart_Disease
              Disease)
            </label>
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={Diabetes}
              onChange={() => handleToggle("Diabetes", Diabetes)}
            />
            <label className={classes.labelText}>เบาหวาน(Diabetes)</label>
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={Epilepsy_Febrile_Seizure}
              onChange={() =>
                handleToggle("EpilepsyFebrileSeizure", Epilepsy_Febrile_Seizure)
              }
            />
            <label className={classes.labelText}>
              โรคลมชัก ชักจากไข้สูง(Epilepsy, Epilepsy_Febrile_Seizure)
            </label>
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="textAreaBox">
          <label>
            ฉุกเฉินให้นำเด็กส่งโรงพยาบาล(Hospital in case of emergency)
          </label>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Hospital ..."
            name="hospital"
            value={Hospital}
            onChange={({ target }) => handleChange("Hospital", target.value)}
          />
        </div>
      </div>
    </>
  );
};
export default DocumentOfAppication;
