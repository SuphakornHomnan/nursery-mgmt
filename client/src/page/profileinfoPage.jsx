import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import "bulma/css/bulma.css";
import "../scss/table.scss";
import "../scss/font.scss";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { getInfo, getStatusDocForm } from "../redux/actions/profile";
import Modal from "../components/profileInfo/modal";
import { storage } from "../firebase";
import moment from "moment";
import {Spinner} from 'react-bootstrap'
import Navbar from "../components/navbar";
import "../scss/responsive-profileInfo.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginLeft: "1em",
  },
  info: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  inputBox: {
    margin: "0.5em",
    width: "100%",
    textAlign: "left",
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
  },
  colorLable: {
    color: "#6E5B98",
  },
}));

const ModalContent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profileTwo = useSelector((state) => state.profileReducer.child_info);
  const progressProfile = useSelector((state) => state.profileReducer.progress);

  const [room, setRoom] = useState(profileTwo.room);
  const [weight, setWeight] = useState(profileTwo.weight);
  const [height, setHeight] = useState(profileTwo.height);
  const [nickname, setNickname] = useState(profileTwo.nickname);
  const [father_name, setFatherName] = useState(profileTwo.fatherName);
  const [mother_name, setMotherName] = useState(profileTwo.motherName);
  const [father_phone, setFatherPhone] = useState(profileTwo.fatherPhone);
  const [mother_phone, setMotherPhone] = useState(profileTwo.motherPhone);
  const [hospital, setHospital] = useState(profileTwo.medical);
  const [progress, setProgress] = useState(progressProfile);
  const [childPhoto, setChildPhoto] = useState(null);
  const [url, setUrl] = useState(profileTwo.photo);
  const [trigger, setTrigger] = useState(false);

  const sendObj = {
    room,
    weight,
    height,
    nickname,
    father_name,
    mother_name,
    father_phone,
    mother_phone,
    hospital,
    url,
    date: moment().format("YYYY-MM-DD"),
  };

  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_EDIT_INFO", payload: sendObj });
      dispatch({ type: "SET_PROGRESS_PROFILE_INFO", payload: progress });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj, progress]);
  const handleChangePhoto = (e) => {
    if (e.target.files[0]) {
      setChildPhoto(e.target.files[0]);
    }
  };

  const uploadImg = () => {
    if (childPhoto !== null) {
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
          alert(error.message)
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
  function handleChange(type, value) {
    if (type === "room") setRoom(value);
    if (type === "weight") setWeight(value);
    if (type === "height") setHeight(value);
    if (type === "nickname") setNickname(value);
    if (type === "fatherName") setFatherName(value);
    if (type === "motherName") setMotherName(value);
    if (type === "fatherPhone") setFatherPhone(value);
    if (type === "motherPhone") setMotherPhone(value);
    if (type === "hospital") setHospital(value);
    if (type === "url") setUrl(value);
    if (type === "progress") setProgress(value);
    setTrigger(true);
  }

  return (
    <>
      <div className={classes.inputRow}>
        <div className={classes.inputBox}>
          <label>น้ำหนัก(Weight)</label>
          <input
            className="input is-hovered"
            type="text"
            value={weight}
            onChange={({ target }) => handleChange("weight", target.value)}
          />
        </div>
        <div className={classes.inputBox}>
          <label>ส่วนสูง(Height)</label>
          <input
            className="input is-hovered"
            type="text"
            onChange={({ target }) => handleChange("height", target.value)}
            value={height}
          />
        </div>
      </div>
      <div className={classes.inputRow}>
        <div className={classes.inputBox}>
          <label>ชื่อเล่น(Nickname)</label>
          <input
            className="input is-hovered"
            type="text"
            onChange={({ target }) => handleChange("nickname", target.value)}
            value={nickname}
          />
        </div>
        <div className={classes.inputBox}>
          <label>ห้องเรียน(Room)</label>
          <div>
            <div className="select is-fullwidth">
              <select
                value={room}
                onChange={({ target }) => handleChange("room", target.value)}
              >
                <option value="ห้อง ก1">ห้องเรียน ก1</option>
                <option value="ห้อง ก2">ห้องเรียน ก2</option>
                <option value="ห้อง ก3">ห้องเรียน ก3</option>
                <option value="ห้อง ก4">ห้องเรียน ก4</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.inputRow}>
        <div className={classes.inputBox}>
          <label>ชื่อบิดา(Fathername)</label>
          <input
            className="input is-hovered"
            type="text"
            value={father_name}
            onChange={({ target }) => handleChange("fatherName", target.value)}
          />
        </div>
        <div className={classes.inputBox}>
          <label>เบอร์โทรบิดา(fatherPhone)</label>
          <input
            className="input is-hovered"
            type="text"
            value={father_phone}
            onChange={({ target }) => handleChange("fatherPhone", target.value)}
          />
        </div>
      </div>
      <div className={classes.inputRow}>
        <div className={classes.inputBox}>
          <label>ชื่อมารดา(Mothername)</label>
          <input
            className="input is-hovered"
            type="text"
            value={mother_name}
            onChange={({ target }) => handleChange("motherName", target.value)}
          />
        </div>
        <div className={classes.inputBox}>
          <label>เบอร์โทรมารดา(motherPhone)</label>
          <input
            className="input is-hovered"
            type="text"
            value={mother_phone}
            onChange={({ target }) => handleChange("motherPhone", target.value)}
          />
        </div>
      </div>
      <div className={classes.inputRow}>
        <div className={classes.inputBox}>
          <label>โรงพยาบาล(Hospital)</label>
          <input
            className="input is-hovered"
            type="text"
            value={hospital === null ? '' : hospital}
            onChange={({ target }) => handleChange("hospital", target.value)}
          />
        </div>
        <div className={classes.inputBox}>
          <label>รูปถ่าย(Picture)</label>
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
            style={{ marginLeft: "0.25em", width: "100%" }}
          />
        </div>
      </div>
    </>
  );
};



const ProfileInfoPage = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const _id = props.match.params.id
  const docFormStatus = useSelector((state) => state.profileReducer.docFormStatus)
  const profileTwo = useSelector((state) => state.profileReducer.child_info)
  const [loading, setLoading] = useState(false)
  const [modalEditState, setModaEditlState] = useState(false)
  const [didMount, setDidMount] = useState(true)
  useEffect(() => {
    if (didMount) {
      async function fetchData() {
        await dispatch(getInfo(_id))
        dispatch(getStatusDocForm(_id))
        setLoading(true)
        dispatch({ type: "SET_CHILD_ID", payload: _id })
      }
      fetchData()
      setDidMount(false)
    }
  }, [_id, profileTwo, dispatch, didMount])

  return (
    <>
      <div style={{ marginBottom: "1em" }}>
        <Navbar linkTo={props.history.push} />
      </div>
      <div className="overflowX">
        <div className="Allcontent">
          <Grid container spacing={0}>
            <Grid
              container
              spacing={4}
              item
              xs={12}
              sm={6}
              style={{ marginTop: "25px" }}
              alignItems="stretch"
            >
              <Container maxWidth="sm">
                <Typography
                  className="Typography"
                  component="div"
                  style={{
                    backgroundImage: `url("${profileTwo !== undefined
                        ? profileTwo.photo === "" ||
                          profileTwo.photo === undefined ||
                          profileTwo.photo === null
                          ? "https://firebasestorage.googleapis.com/v0/b/nursery-upload.appspot.com/o/images%2Fprofile.png?alt=media&token=14544938-d199-49e5-af5d-88a313883aca"
                          : profileTwo.photo
                        : ""
                      }")`,
                  }}
                />
                <button
                  className="button is-warning FontAll btnSize"
                  style={{
                    marginTop: "20px",
                    alignItems: "center",
                    marginRight: "30px",
                    color: "#FFF",
                    backgroundColor: "#E19E26",
                  }}
                  onClick={() => setModaEditlState(!modalEditState)}
                >
                  แก้ไขข้อมูล
                <i
                    className="fas fa-pencil-alt"
                    style={{
                      marginLeft: "0.25em",
                      fontSize: "1em",
                    }}
                  ></i>
                </button>
                {modalEditState ? (
                  <Modal closeModal={() => setModaEditlState(!modalEditState)}>
                    <ModalContent />
                  </Modal>
                ) : null}
                {
                  docFormStatus === false && (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "accountant") ?
                    <button
                      className="button is-warning FontAll btnSize"
                      style={{
                        marginTop: "20px",
                        alignItems: "center",
                        marginRight: "30px",
                        color: "#FFF",
                        backgroundColor: "#E43602",
                      }}
                      onClick={() => props.history.push(`/docPage/${_id}`)}
                    >
                      ลงทะเบียนเอกสาร
                    <i
                        className="fas fa-pencil-alt"
                        style={{
                          marginLeft: "0.25em",
                          fontSize: "1em",
                        }}
                      ></i>
                    </button>
                    :
                    null
                }

              </Container>
            </Grid>
            <Grid
              container
              spacing={4}
              item
              xs={12}
              sm={6}
              style={{ marginTop: "25px" }}
            >
              <Grid item xs={12}>
                {loading ? null : <Spinner animation="border" />}
                <div className={classes.info}>
                  <label>ชื่อ-นามสกุล</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.name}
                    </label>
                  </Paper>
                </div>
              </Grid>

              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>ชื่อเล่น</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.nickname}
                    </label>
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>วัน/เดือน/ปี เกิด</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.birthDate}
                    </label>
                  </Paper>
                </div>
              </Grid>

              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>น้ำหนัก</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.weight}
                    </label>
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>ส่วนสูง</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.height}
                    </label>
                  </Paper>
                </div>
              </Grid>

              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>ชื่อบิดา</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.fatherName}
                    </label>
                  </Paper>
                </div>
              </Grid>

              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>เบอร์โทรบิดา</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.fatherPhone}
                    </label>
                  </Paper>
                </div>
              </Grid>

              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>ชื่อมารดา</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.motherName}
                    </label>
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>เบอร์โทรมารดา</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.motherPhone}
                    </label>
                  </Paper>
                </div>
              </Grid>

              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>ชื่อผู้ปกครอง</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.custodianName}
                    </label>
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>เบอร์โทรผู้ปกครอง</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.custodianPhone}
                    </label>
                  </Paper>
                </div>
              </Grid>

              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>ห้องเรียน</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.room}
                    </label>
                  </Paper>
                </div>
              </Grid>

              <Grid item xs={6} sm={6}>
                <div className={classes.info}>
                  <label>โรงพยาบาล</label>
                  <Paper className={classes.paper}>
                    <label className={classes.colorLable}>
                      {profileTwo.medical}
                    </label>
                  </Paper>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};
export default ProfileInfoPage;
