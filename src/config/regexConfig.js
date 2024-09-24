const regexPattern = {
  fullName: /^[a-zA-Z]{2,30}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  phone: /^\d{10,11}$/,
  nameCompany: /^[a-zA-Z0-9\s]{2,50}$/,
};

export default regexPattern;
