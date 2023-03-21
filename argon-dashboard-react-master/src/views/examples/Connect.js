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
import React, { useState, useEffect } from "react";
import UserHeader from "components/Headers/UserHeader.js";
import { db } from "firebase_init";
import { ref, child, get } from "firebase/database";

const currentUrl = window.location.href;
const uid = currentUrl.split("/").pop();
const baseUrl = currentUrl.split("/")[2];

const Connect = () => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `Profiles/`)).then((snapshot) => {
      if (snapshot.exists()) {
        var optionsObject = snapshot.val();
        var options = Object.values(snapshot.val());
        options.forEach(user => {
          if (user["state"] === optionsObject[`${uid}`]["state"]) {
            setConnections(current => [...current, user]);
          }
        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
          {
            (connections.length === 0) ?
            null
            :
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
                      src={connections[0]["avi"]}
                    />
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
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
                    {connections[0]["name"]}
                    <span className="font-weight-light">, {connections[0]["age"]}</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {connections[0]["city"]}, {connections[0]["state"]}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {connections[0]["platform"]} - {connections[0]["category"]}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {connections[0]["about_me"]}
                  </div>
                </div>
              </CardBody>
            </Card> 
          }
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
                {
                  (connections.length === 0) ?
                  <p>No connections here</p>
                  :
                  connections.map(profile => {
                    return (
                      <>
                        <CardHeader className="bg-white border-0">
                          <Row className="align-items-center">
                            <Col xs="8">
                              <h3 className="mb-0">{profile["name"]}</h3>
                            </Col>
                            <Col className="text-right" xs="4">
                              <Button
                                color="success"
                                size="sm"
                              >
                                Accept
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                              >
                                Decline
                              </Button>
                            </Col>
                          </Row>
                        </CardHeader>
                      </>
                    )
                  })
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Connect;
