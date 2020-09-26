import React from "react";
import { Modal } from "react-bootstrap";
import MathJax from "react-mathjax-preview";
import styles from "./modal.module.css";

// Create styles

const chapPDF = (props) => {
  var index = props.contentChap.findIndex((chap) => chap.titre === props.titre);
  var content = props.contentChap[index].content;
  return (
    <Modal
      dialogClassName={styles["modal-90w"]}
      show={props.show}
      backdrop="static"
      onHide={props.close}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">{props.titre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MathJax math={content} />
      </Modal.Body>
    </Modal>
  );
};
export default chapPDF;
