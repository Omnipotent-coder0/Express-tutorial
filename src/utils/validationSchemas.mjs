export const userValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "username cannot be Empty!",
    },
    isString: {
      errorMessage: "username must be a String!",
    },
    isLength: {
      options: {
        min: 3,
        max: 15,
      },
      errorMessage: "username must be between 3 to 10 characters long!",
    },
  },
  displayName: {
    isLength: {
      options: {
        max: 15,
      },
      errorMessage: "DisplayName must be less than 16 characters long!",
    },
  },
  password: {
    notEmpty: true,
    isLength: {
      options: {
        min: 5,
        max: 15,
      },
      errorMessage: "Password must be between 5 to 15 characters!",
    },
  },
};
