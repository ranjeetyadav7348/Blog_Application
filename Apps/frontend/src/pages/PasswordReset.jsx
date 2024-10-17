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

const PasswordReset = () => {
  const userContxtData = useContext(userContext);

  const navigate = useNavigate();

  const [otpDetail, setOtpDetail] = useState({
    otp:"",
    
  });

  
  const [value, setValue] = useState();

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setOtpDetail({
      ...otpDetail,
      [field]: actualValue,
    });
  };
;


  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(otpDetail);
    //validation
    if (
      otpDetail.otp.trim() == "" )
       {
      toast.error("Otp  is required !!");
      return;
    }

    const st= localStorage.getItem("otp");



    console.log(otpDetail.otp, "and the value of otp")

    if(st!= otpDetail.otp)
    {
        toast.error("Otp  is wrong!!");
        
        return;

    }



    localStorage.removeItem("otp");
    //submit the data to server to generate token


    navigate("/forgot/reset/password");

   



 
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
                    <Label for="otp">Enter Otp</Label>
                    <Input
                      type="number"
                      id="otp"
                      value={otpDetail.username}
                      onChange={(e) => handleChange(e, "otp")}
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

export default PasswordReset;
