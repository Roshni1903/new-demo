import { useSelector, useDispatch } from "react-redux";
import { passRegex } from "../component/regex";
import { updateData, setError } from "../Redux/FormReducer";

const commonContainer = (formType, formArray) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.formReducer?.[formType].data);
  const error = useSelector((state) => state.formReducer?.[formType].error);
  const validate = (name, value) => {
    const field = formArray.find((item) => item.name === name);

    const errors = {};
    if (field && field.validation) {
      for (const check of field.validation) {
        if (check.regex && !check.regex.test(value)) {
          errors[name] = check.errormsg;
          break;
        } else {
          errors[name] = "";
        }
        if (check.validlength && value.length < check.validlength) {
          errors[name] = check.errormsg;
          break;
        }

        if (field.type === "select" && value === "") {
          errors[name] = check.errormsg;
          break;
        }

        if (field.name === "ConfirmPassword") {
          errors.Password = "";
          if (data.Password !== value) {
            errors[name] = "password doesnt match!";
          } else {
            errors[name] = "";
          }
        }
        if (field.name === "Password") {
          errors.ConfirmPassword = "";
          if (data.ConfirmPassword !== value) {
            errors[name] = "password doesnt match!";
          } else {
            errors[name] = "";
          }
        }
      }
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateData({ type: formType, name: name, value: value }));
    const error = validate(name, value);
    dispatch(setError({ type: formType, error: error }));
  };

  return {
    data,
    error,
    handleChange,
    validate,
  };
};

export default commonContainer;
