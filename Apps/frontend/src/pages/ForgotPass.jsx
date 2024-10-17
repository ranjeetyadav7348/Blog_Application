import { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { toast } from "react-toastify";
import {
  Label,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
} from "reactstrap";
import Base from "../components/Base";
import { check, loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext } from "react";
import axios from "axios";

const ForgotPass = () => {
  const userContxtData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    
  });

  
  const [value, setValue] = useState();

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };
;


  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.email.trim() == "" )
       {
      toast.error("Username or Password  is required !!");
      return;
    }


    //submit the data to server to generate token



    axios.post('http://localhost:8083/ranjeet/virat/forgotpassword/send', loginDetail)
    .then((e)=>
    {

        console.log("this is come from backend",e.data )
       localStorage.setItem("otp", JSON.stringify(e.data));
       localStorage.setItem("email", JSON.stringify(loginDetail.email));


       navigate("/forgot/reset");

    })
    .catch((e)=>
    {
        console.log(e)
    })



 
  };













  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
  };

  const handleLoginFailure = (response) => {
    console.log("Login Failed:", response);
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col
            sm={{
              size: 6,
              offset: 3,
            }}
          >
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Login Here !!</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}

                  <FormGroup>
                    <Label for="email">Enter Email</Label>
                    <Input
                      type="text"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "email")}
                    />
                  </FormGroup>

                  {/* password field */}

                 

                  <Container className="text-center">
                    

                    <Button
                      
                      className="mt-3"
                      outline
                      color="secondary"
                    >
                      Forgot Password
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default ForgotPass;
