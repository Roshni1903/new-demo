import { emailRegex } from "../component/regex";

const ForgetDesc = [
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
];

export default ForgetDesc;
