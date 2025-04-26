import { emailRegex, passRegex } from "../component/regex";

const registerDesc = [
  {
    label: "Name",
    name: "name",
    type: "text",
    validation: [
      {
        validlength: 3,
        errormsg: "invalid length!",
      },
    ],
  },

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

  {
    label: "role",
    name: "role",
    type: "select",
    optionValue: [
      {
        label: "--select role--",
        value: "",
      },
      {
        label: "Teacher",
        value: "teacher",
      },
      {
        label: "Student",
        value: "student",
      },
    ],
    validation: [
      {
        errormsg: "select any one!",
      },
    ],
  },
];
export default registerDesc;
