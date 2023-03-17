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
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import React, { useState, useEffect } from "react";
import UserHeader from "components/Headers/UserHeader.js";
import { db, storage } from "firebase_init";
import { ref, child, get, update } from "firebase/database";
import { ref as ref_storage, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from 'uuid';

const currentUrl = window.location.href;
const uid = currentUrl.split("/").pop();
const baseUrl = currentUrl.split("/")[2];

console.log(baseUrl + "/admin/connect/" + uid);

function updateProfile() {
  const userAge = document.getElementById("input-age").value;
  const userCity = document.getElementById("input-city").value;
  const userState = document.getElementById("input-state").value;
  const userBio = document.getElementById("input-bio").value;
  const userPlatform = document.getElementById("input-platform").value;
  const userCategory = document.getElementById("input-category").value;
  const userFirstName = document.getElementById("input-first-name").value;
  const userLastName = document.getElementById("input-last-name").value;

  const updates = {}
  updates['Profiles/' + uid + "/age"] = userAge;
  updates['Profiles/' + uid + "/city"] = userCity;
  updates['Profiles/' + uid + "/state"] = userState;
  updates['Profiles/' + uid + "/about_me"] = userBio;
  updates['Profiles/' + uid + "/category"] = userCategory;
  updates['Profiles/' + uid + "/platform"] = userPlatform;
  updates['Profiles/' + uid + "/name"] = userFirstName + " " + userLastName;

  update(ref(db), updates);
  window.location.reload(false);
}

const Profile = () => {
  const [fullName, setFullName] = useState("Full Name");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState("Email");
  const [age, setAge] = useState();
  const [userCity, setUserCity] = useState();
  const [userState, setUserState] = useState();
  const [userCategory, setUserCategory] = useState();
  const [userBio, setUserBio] = useState();
  const [userPlatform, setUserPlatform] = useState();

  const [imageList, setImageList] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);

  const [profilePicture, setProfilePicture] = useState("");

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref_storage(storage, `Users/${uid}/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
    .then(() => {
      //Image uploaded successfully
      console.log("Image Uploaded")
    })
  }

  const updateAvi = (image) => {
    setProfilePicture(image);
    
    const updates = {}
    updates['Profiles/' + uid + "/avi"] = image;
    update(ref(db), updates);
  }

  const deleteImage = (image) => {
    // deleteObject(ref_storage(storage, `Users/${uid}/${image}`)).then(() => {
    //   //Image was deleted
    //   console.log("Image was deleted");
    // }).catch((error) => {
    //   //There was an error
    // });
  }

  //Grab images for this user when the page loads
  useEffect(() => {
    listAll(ref_storage(storage, `Users/${uid}`)).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        })
      })
    })
  }, []);

  const dbRef = ref(db);
  get(child(dbRef, `Profiles/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      setFullName(snapshot.val().name);
      setEmail(snapshot.val().email);
      setFirstName(snapshot.val().name.split(" ")[0]);
      setLastName(snapshot.val().name.split(" ")[1]);
      setUserCity(snapshot.val().city);
      setUserState(snapshot.val().state);
      setUserCategory(snapshot.val().category);
      setUserBio(snapshot.val().about_me);
      setUserPlatform(snapshot.val().platform);
      setAge(snapshot.val().age);
      setProfilePicture(snapshot.val().avi);
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
                      src={profilePicture}
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
                    {fullName}
                    <span className="font-weight-light">, {age}</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {userCity}, {userState}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {userPlatform} - {userCategory}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {userBio}
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
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      onClick={updateProfile}
                      size="sm"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-age"
                          >
                            Age
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-age"
                            type="text"
                            defaultValue={age}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            type="email"
                            value={email}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            type="text"
                            defaultValue={firstName}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            type="text"
                            defaultValue={lastName}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            type="text"
                            defaultValue={userCity}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-state"
                          >
                            State
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-state"
                            type="text"
                            defaultValue={userState}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-platform"
                          >
                            Platform
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-platform"
                            type="text"
                            defaultValue={userPlatform}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-category"
                          >
                            Category
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-category"
                            type="text"
                            defaultValue={userCategory}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Bio</label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={userBio}
                        id="input-bio"
                        rows="4"
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Profile Picture</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <Col lg="6">
                        <Row className="align-items-center">
                          <Col xs="8">
                            <Input
                              type="file"
                              onChange={(event) => {setImageUpload(event.target.files[0]);}}
                              accept="image/png, image/jpeg"
                            />
                          </Col>
                          <Col className="text-right" xs="4">
                            <Button
                              color="primary"
                              onClick={uploadImage}
                              size="sm"
                            >
                              Upload Picutre
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </FormGroup>
                  </div>
                  <h6 className="heading-small text-muted mb-4">Current Picutres</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <Row>
                        <div>
                          {imageList.map((url => {
                            return (
                              <>
                                <div>
                                  <Button onClick={() => updateAvi(url)}>
                                    <img
                                      alt="..."
                                      src={url}
                                      width="200"
                                      height="200"
                                    />
                                  </Button>
                                  <Button onClick={() => deleteImage(url)}>Delete</Button>
                                </div>
                              </>
                            )
                          }))}
                        </div>
                      </Row>
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
