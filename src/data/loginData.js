export const loginData = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Username or Email",
    errorMessage: "Username / Email should have more than 3 characters!",
    label: "Username / Email",
    pattern: "^[A-Za-z0-9@]{3,254}$",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter and 1 number",
    label: "Password",
    pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$",
    required: true,
  },
];
