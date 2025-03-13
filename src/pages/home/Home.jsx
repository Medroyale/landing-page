import React from "react";
import "../home/Home.css";
import AppPreview from "../../assets/app_preview.svg";
import AppPreview2 from "../../assets/app_preview_2.svg";
import AppPreview3 from "../../assets/app_preview_3.svg";
import AppPreview4 from "../../assets/app_preview_3.svg";

import TwoRowsWithImagesRight from "./components/TwoRowsWithImagesComponents";
import TwoRowsWithImagesLeft from "./components/TwoRowsWithImageLeft";
import CardComponent from "./components/Card";
import { Col, Row } from "react-bootstrap";
import Avatar from "../../assets/avatar.png";
import Avatar1 from "../../assets/avatar1.png";
import Avatar2 from "../../assets/avatar2.png";

const Home = () => {
  const title = "Best Apps Human Resource by Medroyale";
  const description =
    "Smart solution to manage attendance, payroll, reimbursement, and automated HR administration with cloud-based applications.";
  const download = "Downloads";
  return (
    <>
      <TwoRowsWithImagesRight
        title={title}
        description={description}
        isShowButton={true}
        isDescription={true}
        buttonName={download}
        src={AppPreview}
      />
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
      <h1 className="text-title text-center">
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
    </>
  );
};

export default Home;
