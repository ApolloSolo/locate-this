import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "demo@gmail.com",
    password: "123456",
  });

  const [registerUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      Auth.login(result.data.login.token);
    },
    // onError(err) {
    //   setErrors(err.graphQLErrors[0].extensions.errors);
    //   console.log(err.graphQLErrors[0].extensions.errors);
    // },
    variables: values,
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>

        <Form.Input
          label="Email"
          type="email"
          placeholder="email@domain.com"
          name="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          type="password"
          placeholder="password"
          name="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
