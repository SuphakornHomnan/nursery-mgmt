/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "bulma/css/bulma.css";
import { useDispatch, useSelector } from "react-redux";
import { getSlip } from "../../redux/actions/payment";
const ModalSlipContent = ({ child }) => {
  const dispatch = useDispatch();
  const pictureList = useSelector((state) => state.paymentReducer.pic_slip);


  useEffect(() => {
    dispatch(getSlip(child));
  }, []);
  return (
    <div className="">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nursery-upload.appspot.com/o/images%2F%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B9%83%E0%B8%9A%E0%B9%80%E0%B8%AA%E0%B8%A3%E0%B9%87%E0%B8%88%E0%B8%97%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%AB%E0%B8%A1%E0%B8%94%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%87.png?alt=media&token=10d315da-b3d4-4ef1-b881-52f3242b4d61"
              className="d-block w-100"
              alt="1"
            />
          </div>

          {pictureList.length > 0
            ? pictureList.map((each,index) => (
                <div className="carousel-item" key={index}>
                  <img
                    src={each}
                    className="d-block w-100"
                    alt={`"${index}"`}
                  />
                </div>
              ))
            : null}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default ModalSlipContent;
