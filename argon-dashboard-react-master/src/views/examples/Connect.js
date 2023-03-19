/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import React, { useState } from "react";
import UserHeader from "components/Headers/UserHeader.js";
import { db } from "firebase_init";
import { ref, child, get } from "firebase/database";

const currentUrl = window.location.href;
const uid = currentUrl.split("/").pop();
const baseUrl = currentUrl.split("/")[2];

const Connect = () => {
  const [connections, setConnections] = useState([]);

  const dbRef = ref(db);
  get(child(dbRef, `Profiles/`)).then((snapshot) => {
    if (snapshot.exists()) {
      var optionsObject = snapshot.val();
      var options = Object.values(snapshot.val());
      options.forEach(user => {
        if ((user["state"] === optionsObject[`${uid}`]["state"]) && (user["uid"] !== optionsObject[`${uid}`]["uid"]) && !(connections.includes(user["uid"]))) {
          setConnections([...connections, user["uid"]]);
        }
      });
      console.log(connections);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <img
                      alt="..."
                      id="user-profile-picture"
                      className="rounded-circle"
                      width="300"
                      height="200"
                    />
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    onClick={() => {window.location.replace("http://" + baseUrl + "/admin/connect/" + uid)}}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    onClick={() => {window.location.replace("http://" + baseUrl + "/admin/message/" + uid)}}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">N/A</span>
                        <span className="description">TikTok</span>
                      </div>
                      <div>
                        <span className="heading">N/A</span>
                        <span className="description">Youtube</span>
                      </div>
                      <div>
                        <span className="heading">N/A</span>
                        <span className="description">Instagram</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    text
                    <span className="font-weight-light">, Age</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    city, state
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Platform - Category
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    Bio
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Connections</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      size="sm"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {connections.map((profile => {
                  return (
                    <>
                      <label
                      className="form-control-label"
                      htmlFor="input-platform"
                      >
                        {profile}
                      </label>
                    </>
                  )
                }))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Connect;
