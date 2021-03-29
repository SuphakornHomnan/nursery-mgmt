import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../helpers/handletoggle";

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
  Box: {
    display: "flex",
    flexDirection: "row",
    margin: "0.5em",
    width: "50%",
    textAlign: "left",
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
  const habitObj = useSelector((state) => state.habitReducer.habitObj);
  const handleInputDisable = useSelector(
    (state) => state.habitReducer.handleInputDisable
  );
  //   console.log(habitObj);
  //   console.log(handleInputDisable);
  // const [name] = useState(props.match.params.name);
  const [pillow_aficionado, setPillow_aficionado] = useState(
    habitObj.pillow_aficionado
  );

  const [doll_aficionado, setDoll_aficionado] = useState(
    habitObj.doll_aficionado
  );
  const [fabric_aficionado, setFabric_aficionado] = useState(
    habitObj.fabric_aficionado
  );
  const [pacifier_aficionado, setPacifier_aficionado] = useState(
    habitObj.pacifier_aficionado
  );
  const [breast_feeding_aficionado, setBreast_feeding_aficionado] = useState(
    habitObj.breast_feeding_aficionado
  );
  const [crib_aficionado, setCrib_aficionado] = useState(
    habitObj.crib_aficionado
  );

  const [food_allergy, setFood_allergy] = useState(
    handleInputDisable.food_allergy
  );
  const [food_allergy_detail, setFoodAllergyDetail] = useState(
    habitObj.food_allergy_detail
  );
  const [milk_intolerance, setMilk_intolerance] = useState(
    handleInputDisable.milk_intolerance
  );
  const [milk_intolerance_detail, setMilkIntoleranceDetail] = useState(
    habitObj.milk_intolerance_detail
  );
  const [no_yogurt_allergy, setNo_yogurt_allergy] = useState(
    handleInputDisable.no_yogurt_allergy
  );
  const [no_yogurt_allergy_detail, setNoYogurtAllergyDetail] = useState(
    habitObj.no_yogurt_allergy_detail
  );
  const [no_allergy_to_medicine, setNo_allergy_to_medicine] = useState(
    handleInputDisable.no_allergy_to_medicine
  );
  const [
    no_allergy_to_medicine_detail,
    setNoAllergyToMedicineDetail,
  ] = useState(habitObj.no_allergy_to_medicine_detail);
  const [milk_powder_in_bottle, setMilk_powder_in_bottle] = useState(
    habitObj.milk_powder_in_bottle
  );
  const [uht_milk_box_in_bottle, setUht_milk_box_in_bottle] = useState(
    habitObj.uht_milk_box_in_bottle
  );
  const [uht_milk_box, setUht_milk_box] = useState(habitObj.uht_milk_box);
  const [always_use_diaper, setAlways_use_diaper] = useState(
    habitObj.always_use_diaper
  );
  const [not_use_diaper, setNot_use_diaper] = useState(habitObj.not_use_diaper);
  const [diaper_only_sleeping, setDiaper_only_sleeping] = useState(
    habitObj.diaper_only_sleeping
  );
  const [other_information, setOther_information] = useState(
    habitObj.other_information
  );
  const [trigger, setTrigger] = useState(false);

  const sendObj = {
    pillow_aficionado,
    doll_aficionado,
    fabric_aficionado,
    pacifier_aficionado,
    breast_feeding_aficionado,
    crib_aficionado,
    food_allergy_detail,
    milk_intolerance_detail,
    no_yogurt_allergy_detail,
    no_allergy_to_medicine_detail,
    milk_powder_in_bottle,
    uht_milk_box_in_bottle,
    uht_milk_box,
    always_use_diaper,
    not_use_diaper,
    diaper_only_sleeping,
    other_information,
  };
  const handleObj = {
    food_allergy,
    milk_intolerance,
    no_yogurt_allergy,
    no_allergy_to_medicine,
  };
  //   console.log("send");
  //   console.log(sendObj);
  //   console.log(handleObj);
  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_HABIT_DETAIL", payload: sendObj });
      dispatch({ type: "SET_INPUT_DISABLE_HABIT", payload: handleObj });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj, handleObj]);
  function handleToggle(type, value) {
    let temp = false;
    temp = toggle(value);
    handleChange(type, temp);
  }

  function handleChange(type, value) {
    if (type === "pillow_aficionado") setPillow_aficionado(value);
    if (type === "doll_aficionado") setDoll_aficionado(value);
    if (type === "fabric_aficionado") setFabric_aficionado(value);
    if (type === "pacifier_aficionado") setPacifier_aficionado(value);
    if (type === "breast_feeding_aficionado")
      setBreast_feeding_aficionado(value);
    if (type === "crib_aficionado") setCrib_aficionado(value);
    if (type === "milk_powder_in_bottle") setMilk_powder_in_bottle(value);
    if (type === "uht_milk_box_in_bottle") setUht_milk_box_in_bottle(value);
    if (type === "uht_milk_box") setUht_milk_box(value);
    if (type === "always_use_diaper") setAlways_use_diaper(value);
    if (type === "not_use_diaper") setNot_use_diaper(value);
    if (type === "diaper_only_sleeping") setDiaper_only_sleeping(value);
    if (type === "other_information") setOther_information(value);
    if (type === "food_allergy") setFood_allergy(value);
    if (type === "milk_intolerance") setMilk_intolerance(value);
    if (type === "no_yogurt_allergy") setNo_yogurt_allergy(value);
    if (type === "no_allergy_to_medicine") setNo_allergy_to_medicine(value);
    if (type === "food_allergy_detail") setFoodAllergyDetail(value);

    if (type === "milk_intolerance_detail") setMilkIntoleranceDetail(value);
    if (type === "no_yogurt_allergy_detail") setNoYogurtAllergyDetail(value);
    if (type === "no_allergy_to_medicine_detail")
      setNoAllergyToMedicineDetail(value);
    setTrigger(true);
  }

  return (
    <>
      <div className="InputRow">
        <div className="InputBox">
          <label>ลักษณะนิสัยการนอน(Sleeping Habit)</label>
        </div>
      </div>
      <div className={classes.Box}>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={pillow_aficionado}
              onChange={() =>
                handleToggle("pillow_aficionado", pillow_aficionado)
              }
            />
            <label className={classes.labelText}>
              ติดหมอน(Pillow Aficionado)
            </label>
          </label>
        </div>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={doll_aficionado}
              onChange={() => handleToggle("doll_aficionado", doll_aficionado)}
            />
            <label className={classes.labelText}>
              ติดตุ๊กตา(Doll Aficionado)
            </label>
          </label>
        </div>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={fabric_aficionado}
              onChange={() =>
                handleToggle("fabric_aficionado", fabric_aficionado)
              }
            />
            <label className={classes.labelText}>
              ติดผ้า(Fabric Aficionado)
            </label>
          </label>
        </div>
      </div>
      <div className={classes.Box}>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={pacifier_aficionado}
              onChange={() =>
                handleToggle("pacifier_aficionado", pacifier_aficionado)
              }
            />
            <label className={classes.labelText}>
              ติดจุกหลอก(Pacifier Aficionado)
            </label>
          </label>
        </div>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={breast_feeding_aficionado}
              onChange={() =>
                handleToggle(
                  "breast_feeding_aficionado",
                  breast_feeding_aficionado
                )
              }
            />
            <label className={classes.labelText}>
              ติดนมแม่(Breast Feeding Aficionado)
            </label>
          </label>
        </div>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={crib_aficionado}
              onChange={() => handleToggle("crib_aficionado", crib_aficionado)}
            />
            <label className={classes.labelText}>ติดเปล(Crib Aficionado)</label>
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>การทานอาหาร(Eating Habit)</label>
        </div>
      </div>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={food_allergy}
              onChange={() => handleToggle("food_allergy", food_allergy)}
            />
            <label className={classes.labelText}>แพ้อาหาร (Food Allergy)</label>
          </label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Food Allergy..."
            name="Food Allergy"
            disabled={!food_allergy}
            value={food_allergy_detail}
            onChange={({ target }) =>
              handleChange("food_allergy_detail", target.value)
            }
          />
        </div>
      </div>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={no_allergy_to_medicine}
              onChange={() =>
                handleToggle("no_allergy_to_medicine", no_allergy_to_medicine)
              }
            />
            <label className={classes.labelText}>
              แพ้ยา (No Allergy to Medicine)
            </label>
          </label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder="No Allergy to Medicine..."
            name="No Allergy to Medicine"
            disabled={!no_allergy_to_medicine}
            value={no_allergy_to_medicine_detail}
            onChange={({ target }) =>
              handleChange("no_allergy_to_medicine_detail", target.value)
            }
          />
        </div>
      </div>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={milk_intolerance}
              onChange={() =>
                handleToggle("milk_intolerance", milk_intolerance)
              }
            />
            <label className={classes.labelText}>
              แพ้นมวัว (Milk Intolerance)
            </label>
          </label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder="Milk Intolerance..."
            name="Milk Intolerance"
            disabled={!milk_intolerance}
            value={milk_intolerance_detail}
            onChange={({ target }) =>
              handleChange("milk_intolerance_detail", target.value)
            }
          />
        </div>
      </div>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={no_yogurt_allergy}
              onChange={() =>
                handleToggle("no_yogurt_allergy", no_yogurt_allergy)
              }
            />
            <label className={classes.labelText}>
              แพ้นมเปรี้ยว (No YogurtAllergy)
            </label>
          </label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder="No YogurtAllergy..."
            name="No YogurtAllergy"
            disabled={!no_yogurt_allergy}
            value={no_yogurt_allergy_detail}
            onChange={({ target }) =>
              handleChange("no_yogurt_allergy_detail", target.value)
            }
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>การทานนม(Milk Feeding)</label>
        </div>
      </div>
      <div className={classes.Box}>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={milk_powder_in_bottle}
              onChange={() =>
                handleToggle("milk_powder_in_bottle", milk_powder_in_bottle)
              }
            />
            <label className={classes.labelText}>
              นมผงใส่ขวด(Milk Powder in Bottle)
            </label>
          </label>
        </div>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={uht_milk_box_in_bottle}
              onChange={() =>
                handleToggle("uht_milk_box_in_bottle", uht_milk_box_in_bottle)
              }
            />
            <label className={classes.labelText}>
              นมกล่องใส่ขวด(UHT Milk Box in Bottle)
            </label>
          </label>
        </div>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={uht_milk_box}
              onChange={() => handleToggle("uht_milk_box", uht_milk_box)}
            />
            <label className={classes.labelText}>นมกล่อง(UHT Milk Box)</label>
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label>แพมเพิส(Diaper)</label>
        </div>
      </div>
      <div className={classes.Box}>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={always_use_diaper}
              onChange={() =>
                handleToggle("always_use_diaper", always_use_diaper)
              }
            />
            <label className={classes.labelText}>ใส่ตลอด (Always use)</label>
          </label>
        </div>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={not_use_diaper}
              onChange={() => handleToggle("not_use_diaper", not_use_diaper)}
            />
            <label className={classes.labelText}>ไม่ใช้ (Not use Diaper)</label>
          </label>
        </div>
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={diaper_only_sleeping}
              onChange={() =>
                handleToggle("diaper_only_sleeping", diaper_only_sleeping)
              }
            />
            <label className={classes.labelText}>เวลานอน (Only sleeping)</label>
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="textAreaBox">
          <label>
            ข้อมูลอื่นๆที่ควรแจ้งให้พีคอะบูเนอร์สเซอรี่ทราบ(Other information
            that Peek a boo Nursery should be aware of)
          </label>
          <textarea
            className="textarea"
            value={other_information}
            onChange={({ target }) =>
              handleChange("other_information", target.value)
            }
          ></textarea>
        </div>
      </div>
    </>
  );
};
export default DocumentOfAppication;
