import React, { useState, useEffect } from "react";
import "bulma/css/bulma.css";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import ChildForm from "./childForm";
import FatherForm from "./fatherForm";
import MotherForm from "./motherForm";
import GuardianForm from "./custodianForm";
import AddressForm from "./addressForm";
import { regisForm } from "../../redux/actions/register";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

function getSteps() {
  return [
    "childForm",
    "FatherForm",
    "MotherForm",
    "GuardianForm",
    "AddressForm",
  ];
}

const StepperForm = () => {
  const widthCheck = window.screen.width
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const classes = useStyles();
  const dispatch = useDispatch();
  const child = useSelector((state) => state.childReducer.childObj);
  const father = useSelector((state) => state.custodianReducer.fatherObj);
  const mother = useSelector((state) => state.custodianReducer.motherObj);
  const custodian = useSelector((state) => state.custodianReducer.custodianObj);
  const address = useSelector((state) => state.addressReducer.addressObj);

  const [trigger, setTrigger] = useState(false);
  const sendObj = {
    child,
    father,
    mother,
    custodian,
    address,
  };
  useEffect(() => {
    if (trigger) {
      dispatch({ type: "SET_VALUE_IN_FORM", payload: sendObj });
      setTrigger(false);
    }
  }, [trigger, dispatch, sendObj]);
  function handleSubmit() {
    dispatch(regisForm(sendObj));
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
        return <ChildForm />;
      case 1:
        return <FatherForm />;
      case 2:
        return <MotherForm />;
      case 3:
        return <GuardianForm />;
      case 4:
        return <AddressForm />;
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
        </Stepper> : <Stepper activeStep={activeStep} alternativeLabel>
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
                      className="button is-link FontAll"
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
