import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Loader
} from "semantic-ui-react";

import { AUTHENTICATE_USER } from "../../graphQL/queries";
import { setToCache } from "./../../utils/cache";

const LoginComponent = (props) => {
  const { passIsLoggedIn } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data && data.email && data.password) {
      setEmail(data.email);
      setPassword(data.password);
    }
  };
  const { loading, error, data } = useQuery(AUTHENTICATE_USER, {
    variables: { email: email, password: password },
  });

  useEffect(() => {
    setErrorMsg("Too many requests !!")
  }, [error])

  useEffect(() => {
    setToken(data?.authenticateUser?.token);
    if (data?.authenticateUser?.token) {
      setToCache(email, data?.authenticateUser?.token);
      passIsLoggedIn(true);
    } else {
      passIsLoggedIn(false);
      setErrorMsg("Invalid credentials !!")
    }
  }, [data]);
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Currency Converter App
          </Header>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Segment stacked>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
              </Form.Field>
              {errors.email && <p>Please check the Email</p>}
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
              </Form.Field>
              {errors.password && <p>Please check the Password</p>}
              {loading && email && password && <Loader active inline="centered" />}
              {email && password && errorMsg && (
                <Message compact color="red">
                  {errorMsg}               
                </Message>
              )}
            </Segment>
            <Button type="submit" color="teal">
              Sign In
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
      {token && <Navigate to="/dashboard" />}
    </>
  );
};

export default LoginComponent;
