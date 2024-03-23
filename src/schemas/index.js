import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
export const productSchema = Yup.object({
  name: Yup.string().min(1).required(),
  description: Yup.string().min(20).max(350).required(),
  numberInStock: Yup.number().min(0).required(),
  category: Yup.string().required(),
  imageDataUrl: Yup.string()
    .matches(/^data:image\/[a-zA-Z0-9]+;base64,[a-zA-Z0-9/+=]+$/)
    .required(),
});
export const categorySchema = Yup.object({
  name: Yup.string().min(1).required(),
  description: Yup.string().min(20).max(350).required(),
  imageDataUrl: Yup.string()
    .matches(/^data:image\/[a-zA-Z0-9]+;base64,[a-zA-Z0-9/+=]+$/)
    .required(),
});
export const userSchema = Yup.object({
  name: Yup.string().min(1).required(),
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
  confirmPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});
