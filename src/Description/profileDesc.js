import { emailRegex, passRegex } from "../component/regex";

const profileDesc = [
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
];
export default profileDesc;