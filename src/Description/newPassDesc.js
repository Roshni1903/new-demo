import { passRegex } from "../component/regex";

const newPassDesc = [
  {
    label: "Enter new password",
    name: "Password",
    type: "password",
    validation: [
      {
        regex: passRegex,
        errormsg:
          "minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character is required",
      },
    ],
  },
  {
    label: "Confirm password",
    name: "ConfirmPassword",
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

export default newPassDesc;
