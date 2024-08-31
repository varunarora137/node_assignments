const validateName = (name) => {
  if (name.split(" ").length != 2) return false;
  let firstName = name.split(" ")[0];
  let lastName = name.split(" ")[1];
  if (
    firstName.charAt(0) === firstName.charAt(0).toUpperCase() &&
    lastName.charAt(0) === lastName.charAt(0).toUpperCase()
  ) {
    return true;
  } else return false;
};

const validateEmail = (email) => {
  const match = /^[a-zA-Z0-9\.\_]+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/;
  const lowerCaseEmail = email.toLowerCase();
  return match.test(lowerCaseEmail);
};
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};
const validatePhoneNumber = (phoneNumber) => {
  const phoneString = String(phoneNumber);
  const regex = /^[0-9]{10,}$/;
  return regex.test(phoneString);
};

module.exports = function (req, res, next) {
  if (!validateName(req.body.FullName)) {
    return res
      .status(400)
      .send(
        "Invalid Name Format.Both First And Last Name Needs To Be In Uppercase."
      );
  }
  if (!validateEmail(req.body.Email)) {
    return res
      .status(400)
      .send("Invalid Email Format.Please Enter A Valid Email");
  }
  if (!validatePassword(req.body.Password)) {
    return res
      .status(400)
      .send(
        "Invalid Password Format.Password Needs To Be Atleast 8 Characters Long And It Should Contain At Least One Special Character, One Uppercase Letter, And One Numeric Character."
      );
  }
  if (!validatePhoneNumber(req.body.PhoneNumber)) {
    return res
      .status(400)
      .send(
        "Invalid Phone Number Format.Please Enter A Valid Phone Number. It Needs To Be At Least 10 Digits Long."
      );
  }

  next();
};
