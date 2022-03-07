import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { RiSendPlaneFill } from "react-icons/ri";

const Result = () => {
  return <>Your message is successfully recieved.</>;
};

const Contact = () => {
  const form = useRef();
  const [isSend, setIsSend] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
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
      <form className="row g-3" ref={form} onSubmit={sendEmail}>
        <div className="text-dark h-2 fw-bold "> Contact Me </div>
        <div className="input-group mb-3 me-2 ps-0 shadow-lg col-12 col-md-5">
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
            required
          />
        </div>
        <div className="input-group  ps-0 mb-3 shadow-lg col-12 col-md-5">
          <span className="input-group-text border-0" id="validationCustom02">
            Email
          </span>
          <input
            type="email"
            className="form-control border-0"
            placeholder="tom@gmail.com"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            required
            name="from_email"
          />
        </div>
        <div className="input-group shadow-lg col-12 ps-0 col-md-6">
          <span className="input-group-text border-0">Message</span>
          <textarea
            className="form-control border-0"
            name="message"
            placeholder="You are a good website developer !"
            aria-label="With textarea"
          />
        </div>
        <div className="col-12">
          <button className="btn btn-info w-50 " type="submit">
            Send
            <RiSendPlaneFill className="ms-2" />
          </button>
        </div>
        <div className="text-secondary h6">{isSend ? <Result /> : null}</div>
      </form>
    </div>
  );
};

export default Contact;
