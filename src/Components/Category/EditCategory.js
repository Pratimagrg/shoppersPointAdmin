import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { baseURL } from "../../Shared/BaseURL";
import SuccessModal from "../../Common/SuccessModal";
import UnsuccessModal from "../../Common/UnsuccessModal";

export default function EditCategory(props) {

    const [file, setFile] = useState("");
    const [defaultFile, setDefaultFile] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [success, set_success] = useState(false);
    const [unsuccess, set_unsuccess] = useState(false);

    useEffect(() => {
        setName(props.cat.categoryName);
        setImage(props.cat.imageName);
    }, [props])

    const editDishCat = () => {


        var bodyFormData = new FormData();
        bodyFormData.append('categoryName', name);
        bodyFormData.append('categoryId', props.cat.categoryId);
        if (file !== "" || defaultFile !== "") {
            bodyFormData.append('image', file, file.name);
        }
        


        fetch( baseURL + 'category/editCategory.php', {
            method: "POST",
            body: bodyFormData
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    set_success(true);

                    setName("");
                    setDefaultFile("");
                    setFile("");
                    props.onClosePress();
                    setTimeout(() => {
                        set_success(false);
                        props.onSuccess();
                    }, 2000);
                }
                else {
                    set_unsuccess(true);
                    setTimeout(() => {
                        set_unsuccess(false);
                    }, 2000);
                }
            })
            .catch(e => {
                set_unsuccess(true);
                setTimeout(() => {
                    set_unsuccess(false);
                }, 2000);
            })
    }

    const reset = () => {
        setDefaultFile("");
        setFile("");
    }

    return (
        <>
            <Modal isOpen={props.isOpen} className="modal-lg modal-dialog-centered" >
                <ModalHeader className="col-12 d-flex flex-wrap justify-content-between align-items-center" toggle={() => { reset(); props.onClosePress() }}>
                    Edit Dish Category
                </ModalHeader>
                <ModalBody>
                    <div className="col-12 d-flex flex-wrap py-4 poppins-regular">
                        <div className="col-12 col-md-7 pe-3">
                            <div className="form-group mb-4">
                                <label htmlFor="name"><strong>Name</strong></label>
                                <input type="text" className="form-control" placeholder="Name of Dish Category" value={name} onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="img"><strong>Choose Image</strong></label>
                                <input multiple={false} type="file" className="form-control" onChange={e => { setFile(e.target.files[0]); setDefaultFile(URL.createObjectURL(e.target.files[0])) }} />
                            </div>
                            <button className="btn btn-primary" onClick={editDishCat}>Upload</button>
                        </div>
                        <div className="col-12 col-md-5">
                            {defaultFile || file ?
                                <img alt="" src={defaultFile} style={{ width: "100%", height: "85%", objectFit: 'cover' }} />
                                :
                                <img alt="" src={`${baseURL}${image}`} style={{ width: "100%", height: "85%", objectFit: 'cover' }} />
                            }
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <SuccessModal open={success} />
            <UnsuccessModal open={unsuccess} />
        </>
    );
}