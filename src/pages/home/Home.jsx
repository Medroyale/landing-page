import React from "react";
import "../home/Home.css";
import AppPreview from "../../assets/phone.svg";
import AppPreview2 from "../../assets/app_preview_2.svg";
import AppPreview3 from "../../assets/app_preview_3.svg";
import AppPreview4 from "../../assets/app_preview_3.svg";

import Clock from "../../assets/clock.svg";
import Wallet from "../../assets/wallet.svg";
import Activity from "../../assets/analyze.svg";
import BrandAndroid from "../../assets/brand-android.svg";
import BrandApple from "../../assets/brand-apple.svg";

import TwoRowsWithImagesRight from "./components/TwoRowsWithImagesComponents";
import TwoRowsWithImagesLeft from "./components/TwoRowsWithImageLeft";
import CardComponent from "./components/Card";
import CardComponentFeature from "./components/CardComponentsFeature";

import { Button, Col, Row } from "react-bootstrap";
import Avatar from "../../assets/avatar.png";
import Avatar1 from "../../assets/avatar1.png";
import Avatar2 from "../../assets/avatar2.png";
import CustomNavbar from "./components/Nav";
import Footer from "./components/Footer";

const Home = () => {
  const download = "Downloads";
  return (
    <>
      <CustomNavbar />
      <section id="content">
        <h1 className="text-title text-center" data-aos="fade-right">
          Best Apps Human <br /> Resource by Medroyale
        </h1>
        <p className="text-center text-jumbotron">
          Featuring over 300,000 screens and 1,000 iOS, Android <br /> & Web
          apps — New content weekly.
        </p>
        <div className="d-flex justify-content-center button-download">
          <a className=" btn-fill">Download for free</a>
          <a className=" btn-outline-secondary btn-out ">See our Features</a>
        </div>
        <div className="jumbot" data-aos="fade-up"></div>
        <div className="d-flex justify-content-center" data-aos="fade-up">
          <img
            src={AppPreview}
            alt="Download App Medroyale"
            className="img-fluid img-jumbot"
            loading="lazy"
          />
        </div>
        <section id="features">
          <h1 className="text-features-title text-center" data-aos="fade-right">
            Comprehensive features <br /> with automated processes
          </h1>
          <p className="text-center text-jumbotron">
            Lots of features to improve your learning path and help to <br />{" "}
            memorize hard content with ease
          </p>
          <Row className="card-avatar">
            <Col lg={4}>
              <CardComponentFeature
                img={Clock}
                isActive={true}
                title="Attendance Tracking"
                description="Multiply your sales efforts with intelligent automation. Close deals faster, and with greater precision."
              />
            </Col>
            <Col lg={4}>
              <CardComponentFeature
                img={Activity}
                title="Attendance Tracking"
                description="Multiply your sales efforts with intelligent automation. Close deals faster, and with greater precision."
              />
            </Col>
            <Col lg={4}>
              <CardComponentFeature
                img={Wallet}
                title="Attendance Tracking"
                description="Multiply your sales efforts with intelligent automation. Close deals faster, and with greater precision."
              />
            </Col>
          </Row>
        </section>
        <TwoRowsWithImagesRight
          isShowChips={true}
          titleChips="AI Face Biometric"
          title="AI Face Biometric"
          body="Grow your eCommerce business with custom solutions and streamlined order processing. Start your success story today!"
          isShowButton={false}
          isBody={true}
          buttonName={download}
          src={AppPreview2}
          isShowListFeature={true}
          listFeature={["Authentication", "Secure", "Cloud System"]}
        />
        <TwoRowsWithImagesLeft
          isShowChips={true}
          titleChips="Attendance Management"
          title="Realtime and Easy"
          body="Grow your eCommerce business with custom solutions and streamlined order processing. Start your success story today!"
          isShowButton={false}
          isBody={true}
          buttonName={download}
          src={AppPreview4}
          isShowListFeature={true}
          listFeature={["Online presence", "Overtime request", "Leave request"]}
        />
        <TwoRowsWithImagesRight
          isShowChips={true}
          titleChips="Payroll Management"
          title="Automated Payslip"
          body="Grow your eCommerce business with custom solutions and streamlined order processing. Start your success story today!"
          isShowButton={false}
          isBody={true}
          buttonName={download}
          src={AppPreview3}
          isShowListFeature={true}
          listFeature={[
            "Reimbursement",
            "Payroll report",
            "Payslip distribution",
          ]}
        />
        <h1 className="text-title text-center" data-aos="fade-right">
          What people say about our platform
        </h1>
        <Row className="card-avatar">
          <Col lg={4}>
            <CardComponent img={Avatar} />
          </Col>
          <Col lg={4}>
            <CardComponent img={Avatar1} />
          </Col>
          <Col lg={4}>
            <CardComponent img={Avatar2} />
          </Col>
        </Row>
        <Row className="card-download mt-5">
          <Col lg={4}>
            <img src={AppPreview} className="img-fluid" />
          </Col>
          <Col lg={8}>
            <h1>Download Now, It’s Free!</h1>
            <p>
              Grow your eCommerce business with custom solutions and streamlined
              order processing. Start your success story today!
            </p>

            <a className=" btn-fill-download">Download for free</a>
            <a className=" btn-outline-secondary btn-out-download">
              See our Features
            </a>
            <div className="d-flex icon-download">
              <a className="icon-download-android">
                <img src={BrandAndroid} alt="aaa" />
              </a>
              <a className="icon-download-apple">
                <img src={BrandApple} alt="aaa" />
              </a>
            </div>
          </Col>
        </Row>
      </section>

      <Footer />
    </>
  );
};

export default Home;
