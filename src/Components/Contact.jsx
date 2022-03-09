import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { RiSendPlaneFill } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";

const Result = () => {
  return <>Your message is successfully recieved.</>;
};

const Contact = () => {
  const form = useRef();
  const [isSend, setIsSend] = useState(false);

  const formik = useFormik({
    initialValues: {
      from_name: "",
      from_email: "",
      message: "",
    },
    validationSchema: Yup.object({
      from_name: Yup.string().required("Name must be fill."),
      from_email: Yup.string()
        .required("Please,fill your email")
        .email("Invalid email address."),
      message: Yup.string()
        .min(5, "Message must exceed 5 characters")
        .required("Please, fill your message"),
    }),
    onSubmit: (e) => {
      sendEmail(e);
    },
  });

  const sendEmail = (e) => {
    emailjs
      .sendForm(
        "service_nc0z1ip",
        "template_flncjqc",
        form.current,
        "dbtwZjt-C3tjDxxcd"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();

    setIsSend(true);

    setTimeout((_) => setIsSend(false), 3000);
  };
  return (
    <div className="p-3 border border-dark form-shell border-2 m-3 rounded-2">
      <form className="row g-3" ref={form} onSubmit={formik.handleSubmit}>
        <div className="text-dark h-2 fw-bold "> Contact Me </div>
        <div className="mb-3 col-12 col-md-5">
          <div className="input-group me-2 ps-0 shadow-lg ">
            <span className="input-group-text border-0" id="basic-addon1">
              Name
            </span>
            <input
              type="text"
              className="form-control border-0"
              id="validationCustom01"
              placeholder="Your name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="from_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.from_name}
            />
          </div>

          {formik.touched.from_name && formik.errors.from_name ? (
            <p
              className="text-secondary
             fs-6 position-absolute ps-4"
            >
              {formik.errors.from_name}
            </p>
          ) : null}
        </div>
        <div className="mb-3 col-12 col-md-5">
          <div className="input-group  ps-0 shadow-lg">
            <span className="input-group-text border-0" id="validationCustom02">
              Email
            </span>
            +
            <input
              type="text"
              className="form-control border-0"
              placeholder="tom@gmail.com"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              name="from_email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.from_email}
            />
          </div>
          {formik.touched.from_email && formik.errors.from_email ? (
            <p
              className="text-secondary
             fs-6 position-absolute ps-4"
            >
              {formik.errors.from_email}
            </p>
          ) : null}
        </div>
        <div className="mb-3 col-12 ">
          <div className="input-group shadow-lg ">
            <span className="input-group-text border-0">Message</span>
            <textarea
              className="form-control border-0"
              name="message"
              placeholder="You are a good website developer !"
              aria-label="With textarea"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.message}
            />
          </div>
          {formik.touched.message && formik.errors.message ? (
            <p
              className="text-secondary
             fs-6 position-absolute ps-4"
            >
              {formik.errors.message}
            </p>
          ) : null}
        </div>
        <div className="col-12">
          <button className="btn btn-info w-50 " type="submit">
            Send
            <RiSendPlaneFill className="ms-2" />
          </button>
        </div>
        <div className="text-success h6">{isSend ? <Result /> : null}</div>
      </form>
    </div>
  );
};

export default Contact;
