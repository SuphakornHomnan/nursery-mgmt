import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import DocumentOfApplication from "./documentOfAppication";
import UniformForChild from "./uniformForChild";
import MedicalHistory from "./medicalHistory";
import HabitOfChild from "./habitOfChild";
import { docForm } from "../../redux/actions/register";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

function getSteps() {
  return [
    "DocumentForm",
    "HabitHistoryForm",
    "MedicalHistoryForm",
    "UniformForm",
  ];
}

const StepperForm = () => {
  const widthCheck = window.screen.width
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const classes = useStyles();
  const dispatch = useDispatch();
  const document = useSelector((state) => state.documentReducer.documentObj);
  const habit = useSelector((state) => state.habitReducer.habitObj);
  const medical = useSelector((state) => state.medicalReducer.medicalObj);
  const list = useSelector((state) => state.uniformReducer.uniformList);
  const [trigger, setTrigger] = useState(false);
  const selectId = useSelector((state) => state.registerReducer.select_id);
  const sendObj = {
    child: selectId,
    document,
    habit,
    medical,
    uniform: list,
  };
  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_VALUE_IN_DOC_FORM", payload: sendObj });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj]);

  function handleSubmit() {
    if (selectId !== null && selectId !== "กรุณาเลือกเด็กก่อน") {
      dispatch(docForm(sendObj));
    } else {
      alert("กรุณาเลือกเด็กก่อน");
    }
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setTrigger(true);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <DocumentOfApplication />;
      case 1:
        return <HabitOfChild />;
      case 2:
        return <MedicalHistory />;
      case 3:
        return <UniformForChild />;
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <>
      <div className={classes.root}>
        {widthCheck <= 600 ? <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
          : <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>}

        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className="FontAll">ลงทะเบียนสำเร็จ</Typography>
              <button className="button FontAll" onClick={handleReset}>
                กลับไปหน้าแรก
              </button>
            </div>
          ) : (
              <div>
                <div>{getStepContent(activeStep)}</div>
                <div>
                  <button
                    className="button FontAll"
                    style={{ margin: "0.5em" }}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    กลับ
                </button>

                  {activeStep === steps.length - 1 ? (
                    <button
                      className="button is-success FontAll"
                      style={{ margin: "0.5em" }}
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      บันทึกข้อมูล
                    </button>
                  ) : (
                      <button
                        className="button is-link FontAll"
                        style={{ margin: "0.5em" }}
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        ถัดไป
                      </button>
                    )}
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};
export default StepperForm;
