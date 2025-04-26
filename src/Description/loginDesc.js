import { emailRegex, passRegex } from "../component/regex";

const loginDesc = [
  {
    label: "Email",
    name: "email",
    type: "email",
    validation: [
      {
        regex: emailRegex,
        errormsg: "invalid email!",
      },
    ],
  },

  {
    label: "password",
    name: "password",
    type: "password",
    validation: [
      {
        regex: passRegex,
        errormsg:
          "minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character is required",
      },
    ],
  },
];
export default loginDesc;
