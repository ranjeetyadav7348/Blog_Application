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

const NewPassword = () => {
  const userContxtData = useContext(userContext);

  const navigate = useNavigate();

  const [Password, setPassword] = useState({
    password:"",
    password:""
    
  });

  const [ConfirmPassword, setConfirmPassword] = useState({
    password:"",
    password:""
    
  });

  const [val,setVal]= useState({
    
    email:"",
    password:""



  })

  
  const [value, setValue] = useState();

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setPassword({
      ...Password,
      [field]: actualValue,
    });
  };
;



const handleChange1 = (event, field) => {
    let actualValue = event.target.value;
    setConfirmPassword({
      ...ConfirmPassword,
      [field]: actualValue,
    });
  };
;


  const handleFormSubmit = (event) => {
    event.preventDefault();
    //console.log(otpDetail);
    //validation
    if (
      Password.password.trim() == "" )
       {
      toast.error("Password is required !!");
      return;
    }

    

    if(Password.password!=ConfirmPassword.password)
    {
        toast.error("Password Doesn't match");
        return;

    }


    //put the axios that send the request to the backend



     const response={
      password:Password.password,
      username:localStorage.getItem("email")
     }

     console.log(response)


    axios.post("http://localhost:8083/api/v1/users/updatePassword",response)
    .then((e)=>{


      toast.success(e.data)
      navigate("/login")
       
    })
    .catch((e)=>{


      console.log("bhai esme to error aa gya")
    })


    //submit the data to server to generate token


   // navigate("/resetPassword");

   



 
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
                <h3>Generate New Password</h3>
              </CardHeader>

              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email field */}

                  <FormGroup>
                    <Label for="otp">New Password</Label>
                    <Input
                      type="number"
                      id="otp"
                      value={Password.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="ConfirmOtp">Confirm New Password</Label>
                    <Input
                      type="number"
                      id="ConfirmOtp"
                      value={ConfirmPassword.password}
                      onChange={(e) => handleChange1(e, "password")}
                      
                      
                    />
                  </FormGroup>

                  {/* password field */}

                 

                  <Container className="text-center">
                    

                    <Button
                      
                      className="mt-3"
                      outline
                      color="secondary"
                    >
                      Submit
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

export default NewPassword;
