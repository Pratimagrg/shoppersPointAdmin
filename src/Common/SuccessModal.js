import React from "react";
import { Modal, ModalBody } from 'reactstrap';

export default function SuccessModal(props) {

    
    return (
        <Modal isOpen={props.open} className=" poppins-regular d-flex flex-wrap justify-content-center align-items-center">
            <ModalBody className="d-flex flex-wrap justify-content-center align-items-center bg-success">
                <h4 className="text-white">
                    <span className="h3 poppins-regular">&#10003;</span>&nbsp;Successful
                        </h4>
            </ModalBody>
        </Modal>
    );
}

