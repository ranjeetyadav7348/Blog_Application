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
import ForgotPass from "./ForgotPass";

const Login = () => {
  const userContxtData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  // useEffect(()=>{
  //   console.log(window.location)
  //   function fun()
  //   {

  //     const res= axios.get("http://localhost:8080/api/v1/auth/google" );

  //     console.log(res.data)
  //   }

  //   setTimeout(function() {
  //    fun()
  //   }, 7000);

  // },[])

  const [value, setValue] = useState();

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:8080/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      // console.log("vkbro");
      const data = await res.json();

      doLogin(data, () => {
        console.log("login detail is saved to localstorage");
        //redirect to user dashboard page
        userContxtData.setUser({
          data: data.user,
          login: true,
        });
        navigate("/user/dashboard");
      });

      toast.success("Login Success");

      //navigate('/');
    } catch (error) {
      console.log("could not login with google", error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() == "" ||
      loginDetail.password.trim() == ""
    ) {
      toast.error("Username or Password  is required !!");
      return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);

        //save the data to localstorage
        doLogin(data, () => {
          console.log("login detail is saved to localstorage");
          //redirect to user dashboard page
          userContxtData.setUser({
            data: data.user,
            login: true,
          });
          navigate("/user/dashboard");
        });

        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
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
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>

                  {/* password field */}

                  <FormGroup>
                    <Label for="password">Enter password</Label>
                    <Input
                      type="password"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <div>
                      <Button
                       color="light" 
                       outline
                       >
                        Login
                      </Button>
                      <Button
                        onClick={handleReset}
                        className="ms-5"
                        outline
                        color="secondary"
                      >
                        Reset
                      </Button>
                    </div>

                    <div>
                    <Link to="/forgot">
                    <Button
                      
                      className="mt-3 ms-1"
                      outline
                      color="secondary"
                    >
                      ForgotPassword
                    </Button>

                    </Link>
                    </div>

                    <Button
                      onClick={handleGoogleClick}
                      className="mt-3"
                      outline
                      color="secondary"
                    >
                      Continue with Google
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

export default Login;
