import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

import axios from "axios";

function AddEmployeeForm({ setSuccess, success }) {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");
  const [mobile_number, setMobilenumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [bank_name, setBankname] = useState("");
  const [account_no, setAccountno] = useState("");
  const [ifsc_code, setIfsccode] = useState("");
  const [bank_branch_location, setBankbranchlocation] = useState("");
  const [aadhar_card, setAadharcard] = useState(null);
  const [pan_card, setPancard] = useState(null);
  const [passport, setPassport] = useState(null);
  const [driving_license, setDrivinglicense] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, loading]);

  const aadharUpload = (e) => {
    setAadharcard(e.target.files[0]);
  };
  const panUpload = (e) => {
    setPancard(e.target.files[0]);
  };
  const passportUpload = (e) => {
    setPassport(e.target.files[0]);
  };
  const licenseUpload = (e) => {
    setDrivinglicense(e.target.files[0]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (first_name) {
      formData.append("first_name", first_name);
    }
    if (last_name) {
      formData.append("last_name", last_name);
    }
    if (email) {
      formData.append("email", email);
    }
    if (gender) {
      formData.append("gender", gender);
    }
    if (age) {
      formData.append("age", age);
    }
    if (mobile_number) {
      formData.append("mobile_number", mobile_number);
    }
    if (address) {
      formData.append("address", address);
    }
    if (role) {
      formData.append("role", role);
    }
    if (bank_name) {
      formData.append("bank_name", bank_name);
    }
    if (account_no) {
      formData.append("account_no", account_no);
    }
    if (ifsc_code) {
      formData.append("ifsc_code", ifsc_code);
    }
    if (bank_branch_location) {
      formData.append("bank_branch_location", bank_branch_location);
    }
    if (aadhar_card) {
      formData.append("aadhar_card", aadhar_card);
    }
    if (pan_card) {
      formData.append("pan_card", pan_card);
    }
    if (passport) {
      formData.append("passport", passport);
    }
    if (driving_license) {
      formData.append("driving_license", driving_license);
    }
    console.log(formData);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .post(
        "https://onboard-backend-nodejs.herokuapp.com/api/employee/addemployee",
        formData,
        config
      )
      .then((res) => {
        // history.push("/allemployees");
        setSuccess(res.data.success);
        setLoading(false);
        userInfo.is_registered = true;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.response.data.message);
        setErrormessage(err.response.data.message);
        // console.log(errormessage);
      });
    setTimeout(() => {
      setErrormessage("");
    }, 5000);
    setTimeout(() => {
      setSuccess("");
    }, 15000);
  };
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="container my-5">
      <div className="addform mx-auto" style={{ width: "60vw" }}>
        <button className="btn btn-primary" onClick={goBack}>
          Back
        </button>
        <div className="text-center mx-auto">{loading && <Loading />}</div>
        {success && <SuccessAlert message={success} />}

        {errormessage && <ErrorAlert message={errormessage} />}
        <form onSubmit={submitHandler}>
          <h2 className="my-4" style={{ borderBottom: "2px solid black" }}>
            Personal Details
          </h2>
          <div className="mb-3 row">
            <label htmlFor="firstName" className="col-sm-2 col-form-label">
              First Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={first_name}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="lastName" className="col-sm-2 col-form-label">
              Last Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={last_name}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="Email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="gender" className="col-sm-2 col-form-label">
              Gender
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                required
              >
                <option>Male</option>
                <option>Female</option>
                <option>Rather not specify</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="Age" className="col-sm-2 col-form-label">
              Age
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="MobileNumber" className="col-sm-2 col-form-label">
              Mobile Number
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="MobileNumber"
                value={mobile_number}
                onChange={(e) => setMobilenumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="Address" className="col-sm-2 col-form-label">
              Address
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
          <h2 className="my-4" style={{ borderBottom: "2px solid black" }}>
            Role of Employee
          </h2>
          <div className="mb-3 row">
            <label htmlFor="Role" className="col-sm-2 col-form-label">
              Role
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
          </div>
          <h2 className="my-4" style={{ borderBottom: "2px solid black" }}>
            Bank Details
          </h2>
          <div className="mb-3 row">
            <label htmlFor="BankName" className="col-sm-2 col-form-label">
              Bank Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="BankName"
                value={bank_name}
                onChange={(e) => setBankname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="AccountNumber" className="col-sm-2 col-form-label">
              Account Number
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="AccountNumber"
                value={account_no}
                onChange={(e) => setAccountno(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="IfscCode" className="col-sm-2 col-form-label">
              Ifsc Code
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="IfscCode"
                value={ifsc_code}
                onChange={(e) => setIfsccode(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="BranchName" className="col-sm-2 col-form-label">
              Branch Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="BranchName"
                value={bank_branch_location}
                onChange={(e) => setBankbranchlocation(e.target.value)}
                required
              />
            </div>
          </div>
          <h2 className="my-4" style={{ borderBottom: "2px solid black" }}>
            Upload Documents
          </h2>
          <div className="mb-3 row">
            <label htmlFor="AadharCard" className="col-sm-2 col-form-label">
              Aadhar Card
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="file"
                id="AadharCard"
                onChange={aadharUpload}
                required
              ></input>
              <label
                htmlFor="pdfFiles"
                className="form-label"
                style={{ color: "red" }}
              >
                * only pdf files allowed.
              </label>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="PanCard" className="col-sm-2 col-form-label">
              Pan Card
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="file"
                id="PanCard"
                onChange={panUpload}
                required
              ></input>
              <label
                htmlFor="pdfFiles"
                className="form-label"
                style={{ color: "red" }}
              >
                * only pdf files allowed.
              </label>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="Passport" className="col-sm-2 col-form-label">
              Passport
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="file"
                id="Passport"
                onChange={passportUpload}
                required
              ></input>
              <label
                htmlFor="pdfFiles"
                className="form-label"
                style={{ color: "red" }}
              >
                * only pdf files allowed.
              </label>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="DrivingLicense" className="col-sm-2 col-form-label">
              Driving License (Optional)
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="file"
                id="DrivingLicense"
                onChange={licenseUpload}
              ></input>
              <label
                htmlFor="pdfFiles"
                className="form-label"
                style={{ color: "red" }}
              >
                * only pdf files allowed.
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeeForm;
