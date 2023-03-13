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
import { useState, useEffect } from "react";
import UserHeader from "components/Headers/UserHeader.js";
import { db, storage } from "firebase_init";
import { ref, child, get, update } from "firebase/database";
import { ref as ref_storage, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

const url = window.location.href;
const uid = url.split("/").pop();

function updateProfile() {
  const userAge = document.getElementById("input-age").value;
  const userCity = document.getElementById("input-city").value;
  const userState = document.getElementById("input-state").value;
  const userBio = document.getElementById("input-bio").value;
  const userPlatform = document.getElementById("input-platform").value;
  const userCategory = document.getElementById("input-category").value;

  const updates = {}
  updates['Profiles/' + uid + "/age"] = userAge;
  updates['Profiles/' + uid + "/city"] = userCity;
  updates['Profiles/' + uid + "/state"] = userState;
  updates['Profiles/' + uid + "/about_me"] = userBio;
  updates['Profiles/' + uid + "/category"] = userCategory;
  updates['Profiles/' + uid + "/platform"] = userPlatform;

  update(ref(db), updates);
}

const Profile = () => {
  const [fullName, setFullName] = useState("Full Name");
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [email, setEmail] = useState("Email");
  const [age, setAge] = useState("99");
  const [location, setLocatioon] = useState("City, State");
  const [userCategory, setUserCategory] = useState();
  const [userBio, setUserBio] = useState();
  const [userPlatform, setUserPlatform] = useState();

  const [imageList, setImageList] = useState([]);
  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref_storage(storage, `Users/${uid}/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
    .then(() => {
      //Image uploaded successfully
      console.log("Image Uploaded")
    })
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
      setLocatioon(snapshot.val().city + ", " + snapshot.val().state);
      setUserCategory(snapshot.val().category);
      setUserBio(snapshot.val().about_me);
      setUserPlatform(snapshot.val().platform);
      setAge(snapshot.val().age);
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
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
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
                    {location}
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
                            placeholder={age}
                            type="text"
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
                            value={email}
                            type="email"
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
                            placeholder={firstName}
                            type="text"
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
                            placeholder={lastName}
                            type="text"
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
                            placeholder={location.split(",")[0]}
                            type="text"
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
                            placeholder={location.split(",")[1]}
                            type="text"
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
                            placeholder={userPlatform}
                            type="text"
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
                            placeholder={userCategory}
                            type="text"
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
                        placeholder={userBio}
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
                  <FormGroup>
                    <Col lg="6">
                      <Row className="align-items-center">
                        <div>
                          {imageList.map((url => {
                            return <img 
                              src={url}
                              width="200" 
                              height="200"
                            />
                          }))}
                        </div>
                      </Row>
                    </Col>
                  </FormGroup>
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
