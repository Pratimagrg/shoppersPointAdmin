import React from "react";
import { Modal, ModalBody } from 'reactstrap';

function UnsuccessModal(props) {
    return (
        <Modal isOpen={props.open} className=" poppins-regular d-flex flex-wrap justify-content-center align-items-center">
            <ModalBody className="d-flex flex-wrap justify-content-center align-items-center bg-danger">
                <h4 className="text-white">
                    <span className="h3 poppins-regular">&#10539;</span>&nbsp;Sorry! Something went wrong!<br></br>
                    <p>{props.msg ? props.msg : ""}</p>
                </h4>
            </ModalBody>
        </Modal>
    );
}
export default UnsuccessModal;
