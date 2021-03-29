/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import StepperDocForm from "../components/docForm/stepperDocForm";
import Navbar from "../components/navbar";
import { useDispatch } from "react-redux";

const DocForm = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_SELECT_ID",
      payload: props.match.params.id,
    });
  }, []);

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
                        <div>ลงทะเบียนเอกสารของเด็ก</div>
                      </div>
                    </Grid>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        style={{
                          margin: "0.5em",
                          width: "100%",
                          textAlign: "left",
                        }}
                      ></div>
                    </div>
                    <Grid item md={12} xs={12}>
                      <StepperDocForm />
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
};
export default DocForm;
