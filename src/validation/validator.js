const mongoose = require("mongoose")


  
  const isValidName = (name) => {
    return /^[a-zA-Z\. ]*$/.test(name)
  }
  const isValidTitle = (title) => {
    return /^[a-zA-Z\. ]*$/.test(title)
  }
  
  const isValidBody = (reqBody) => {
    return Object.keys(reqBody).length == 0;
  }

  const isValidPhone = (Mobile) => {
    return /^[6-9]\d{9}$/.test(Mobile)
  };
  
  const isValidEmail = (Email) => {
    return  /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email)
  };
  
  const isValidPwd = (Password) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(Password)
  };
  
  const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
  }

  module.exports = {isValidName,isValidBody,isValidEmail,isValidPhone,isValidPwd,isValidObjectId,isValidTitle}