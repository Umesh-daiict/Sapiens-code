import { Row, Col, Collapse } from "react-bootstrap";

import { GET_FAQS } from "../../components/queries/queries";
import { useQuery } from "@apollo/client";
import { flattenObj } from "../../components/utils/responseFlatten";
import { useState } from "react";
import arrowDown from "../../assets/down.svg";
import arrowUp from "../../assets/up.svg";
import "./FAQs.css";

export default function HomePage() {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(0);

  function FetchData() {
    useQuery(GET_FAQS, {
      onCompleted: (res) => {
        let faqList = flattenObj(res.faqsSapiensystems.data)
          .map((a) => {
            a.id = Number(a.id);
            return a;
          })
          .sort((a, b) => a.id - b.id);
        setFaqs(faqList);
        //setting the first item to open
        setOpen(faqList[0].id);
      },
    });
  }

  const openTab = (index: number) => {
    return open === index ? setOpen(0) : setOpen(index);
  };

  FetchData();

  const renderQAs = () => {
    return faqs.map((item: any) => {
      return (
        <Col key={item.id}>
          <div className="d-flex align-items-center">
            <button onClick={() => openTab(item.id)} className="arrow-button">
              <img alt="img" src={open === item.id ? arrowDown : arrowUp} />
            </button>
            <span
              onClick={() => openTab(item.id)}
              className="FAQs-collapseHeader"
            >
              {item.Question}
            </span>
          </div>
          <Collapse in={open === item.id}>
            <div
              id="FAQs-collapse-text"
              className="px-2"
              style={{
                margin: "0rem 2.5rem 1.5rem",
                borderLeft: "3px solid orange",
                fontSize: "1rem",
                color: "gray",
              }}
            >
              <p>{item.Answer}</p>
            </div>
          </Collapse>
          <hr
            style={{
              color: "rgba(128, 128, 128, 0.5)",
              backgroundColor: "rgb(128 128 128 / 0%)",
              height: 1,
              marginLeft: 20,
              width: "75%",
            }}
          />
        </Col>
      );
    });
  };

  return (
    <div style={{ width: "90%" }} className="FAQs pt-5 mx-auto" id="FAQs">
      <Row className="mt-5">
        <Col xs={12} lg={5}>
          <div className="FAQs-title">
            <div className="FAQs-header">
              <h1 className="font-weight-bold">FAQs</h1>
            </div>
            <p className=" mt-3">Here to help you take the right decision</p>
          </div>
        </Col>
        <Col xs={12} lg={7}>
          <Row className="flex-column question-content">{renderQAs()}</Row>
        </Col>
      </Row>
    </div>
  );
}
