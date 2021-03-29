import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import StepperForm from "../components/register/stepperForm";
import Navbar from "../components/navbar";

const Register = (props) => {
  return (
    <>
      <div style={{ marginBottom: "1em" }}>
        <Navbar linkTo={props.history.push} />
      </div>
      <div className="overflowX">
        <div className="Allcontent">
          <Fragment>
            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item md={11} xs={11}>
                <Paper>
                  <Grid container>
                    <Grid item md={12} xs={12}>
                      <div className="FontAll" style={{ fontSize: "50px" }}>
                        <div>ลงทะเบียน</div>
                      </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <StepperForm />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Fragment>
        </div>
      </div>
    </>
  );
}
export default Register;
