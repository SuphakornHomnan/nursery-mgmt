import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../helpers/handletoggle";
import { handleUniform } from "../../helpers/handleUniform";
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
  labelText: {
    marginLeft: "5px",
  },
  uniformBox: {
    margin: "0.5em",
    textAlign: "center",
  },
}));

const UniformForChild = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const uniformObj = useSelector((state) => state.uniformReducer.uniformObj);
  const [shirt, setShirt] = useState(uniformObj.shirt);
  const [shirt_num, setShirtNum] = useState(uniformObj.shirt_num);
  const [pants, setPants] = useState(uniformObj.pants);
  const [pants_num, setPantsNum] = useState(uniformObj.pants_num);
  const [dresses, setDresses] = useState(uniformObj.dresses);
  const [dresses_num, setDressesNum] = useState(uniformObj.dresses_num);
  const [pajama, setPajama] = useState(uniformObj.pajama);
  const [pajama_num, setPajamaNum] = useState(uniformObj.pajama_num);
  const [apron, setApron] = useState(uniformObj.apron);
  const [apron_num, setApronNum] = useState(uniformObj.apron_num);
  const [sport, setSport] = useState(uniformObj.sport);
  const [sport_num, setSportNum] = useState(uniformObj.sport_num);
  const [cloth_bag, setClothBag] = useState(uniformObj.cloth_bag);
  const [school_bag, setSchoolBag] = useState(uniformObj.school_bag);
  const [trigger, setTrigger] = useState(false);
  const sendObj = {
    shirt,
    shirt_num,
    pants,
    pants_num,
    dresses,
    dresses_num,
    pajama,
    pajama_num,
    apron,
    apron_num,
    sport,
    sport_num,
    cloth_bag,
    school_bag,
  };

  function handleToggle(type, value) {
    let temp = false;
    temp = toggle(value);
    handleChange(type, temp);
  }
  function handleChange(type, value) {
    if (type === "shirt") setShirt(value);
    if (type === "shirt_num") setShirtNum(value);
    if (type === "pants") setPants(value);
    if (type === "pants_num") setPantsNum(value);
    if (type === "dresses") setDresses(value);
    if (type === "dresses_num") setDressesNum(value);
    if (type === "pajama") setPajama(value);
    if (type === "pajama_num") setPajamaNum(value);
    if (type === "apron") setApron(value);
    if (type === "apron_num") setApronNum(value);
    if (type === "sport") setSport(value);
    if (type === "sport_num") setSportNum(value);
    if (type === "cloth_bag") setClothBag(value);
    if (type === "school_bag") setSchoolBag(value);
    setTrigger(true);
  }
  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_UNIFORM_OBJ", payload: sendObj });
      dispatch({ type: "SET_UNIFORM_LIST", payload: handleUniform(sendObj) });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj]);
  return (
    <>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>
            เสื้อนักเรียน(Shirt) ไซส์(Size)
          </label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder="S/M/L/XL/2XL"
            value={shirt}
            name="shirt"
            onChange={({ target }) => handleChange("shirt", target.value)}
          />
        </div>
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>จำนวน(Amount)</label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="Number"
            placeholder="0"
            name="amountShirt"
            min="0"
            max="20"
            value={shirt_num}
            onChange={({ target }) => handleChange("shirt_num", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>
            กางเกงนักเรียน(Pants) ไซส์(Size)
          </label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder="S/M/L/XL/2XL"
            value={pants}
            name="pants"
            onChange={({ target }) => handleChange("pants", target.value)}
          />
        </div>
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>จำนวน(Amount)</label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="Number"
            placeholder="0"
            name="amountPants"
            min="0"
            max="20"
            value={pants_num}
            onChange={({ target }) => handleChange("pants_num", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>
            ชุดเดรส(Dresses) ไซส์(Size)
          </label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder="S/M/L/XL/2XL"
            value={dresses}
            name="dresses"
            onChange={({ target }) => handleChange("dresses", target.value)}
          />
        </div>
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>จำนวน(Amount)</label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="Number"
            placeholder="0"
            name="amountDresses"
            min="0"
            max="20"
            value={dresses_num}
            onChange={({ target }) => handleChange("dresses_num", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>ชุดนอน(Pajama) ไซส์(Size)</label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder="S/M/L/XL/2XL"
            value={pajama}
            name="pajama"
            onChange={({ target }) => handleChange("pajama", target.value)}
          />
        </div>
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>จำนวน(Amount)</label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="Number"
            placeholder="0"
            name="amountPajama"
            min="0"
            max="20"
            value={pajama_num}
            onChange={({ target }) => handleChange("pajama_num", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>
            เอี้ยมกันเปื้อน(Apron) ไซส์(Size)
          </label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder="S/M/L/XL"
            name="apron"
            value={apron}
            onChange={({ target }) => handleChange("apron", target.value)}
          />
        </div>
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>จำนวน(Amount)</label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="Number"
            placeholder="0"
            name="amountApron"
            min="0"
            max="20"
            value={apron_num}
            onChange={({ target }) => handleChange("apron_num", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>ชุดพละ(Sport) ไซส์(Size)</label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="text"
            placeholder="S/M/L/XL/2XL"
            value={sport}
            name="sport"
            onChange={({ target }) => handleChange("sport", target.value)}
          />
        </div>
        <div className={classes.uniformBox}>
          <label className={classes.labelText}>จำนวน(Amount)</label>
        </div>
        <div>
          <input
            className="input is-hovered"
            type="Number"
            placeholder="0"
            name="amountSport"
            min="0"
            max="20"
            value={sport_num}
            onChange={({ target }) => handleChange("sport_num", target.value)}
          />
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={cloth_bag}
              onChange={() => handleToggle("cloth_bag", cloth_bag)}
            />
            <label className={classes.labelText}>ถุงผ้า 1 ใบ (Cloth Bag)</label>
          </label>
        </div>
      </div>
      <div className="InputRow">
        <div className="InputBox">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={school_bag}
              onChange={() => handleToggle("school_bag", school_bag)}
            />
            <label className={classes.labelText}>
              กระเป๋านักเรียน 1 ใบ (School Bag)
            </label>
          </label>
        </div>
      </div>
    </>
  );
};
export default UniformForChild;
