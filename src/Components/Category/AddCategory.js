import React, { useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import { ModalHeader } from "reactstrap";
import { baseURL } from "../../Shared/BaseURL";

function AddCategory(props) {

    const [categoryName, setCategoryName] = useState("");
    const [catFile, setCatFile] = useState("");
    const [catDefaultFile, setCatDefaultFile] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [success, setSuccess] = useState(false);
    const [unsuccess, setUnsuccess] = useState(false);

    const addNewCategory = (e) => {
        e.preventDefault();

        setIsLoading(true);
        var bodyFormData = new FormData();
        bodyFormData.append('categoryName', categoryName);
        bodyFormData.append('image', catFile, catFile.name);

        fetch(baseURL + 'Category/addCategory.php', {
            method: "POST",
            body: bodyFormData
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    setIsLoading(false);
                    setSuccess(true);
                    props.fetchcategory();
                    props.onClosePress();

                    setCatFile("");
                    setCatDefaultFile("");
                    setCategoryName("");
                    setTimeout(() => {
                        setSuccess(false);
                        window.location.reload();
                    }, 2000);
                } else {
                    setIsLoading(false);
                    setUnsuccess(true);
                    setTimeout(() => {
                        setUnsuccess(false);
                    }, 2000);
                }
            })
            .catch(e => {

                setIsLoading(false);
                setUnsuccess(true);
                setTimeout(() => {
                    setUnsuccess(false);
                }, 2000);
            })



    }

    return (
        <>
            <Modal show={props.open} className="modal-lg rounded" centered >
                <ModalHeader className="d-flex align-items-center" toggle={() => { props.onClosePress() }} style={{ backgroundColor: "#c0c1c2", }}>
                    Add New Category
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={addNewCategory}>
                        <div>
                            <label className="form-label">Category Name: </label>
                            <input type="text" className="form-control" placeholder="CategoryName" value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} />
                        </div>
                        <div className="form-group mt-4">
                            <label className="me-2">Category Image: </label>
                            <input required multiple={false} className="form-control-file" type="file" onChange={e => { setCatFile(e.target.files[0]); setCatDefaultFile(URL.createObjectURL(e.target.files[0])) }} />
                        </div>

                        <div className="col-12 col-md-5">
                            {catDefaultFile || catFile ?
                                <img alt="" src={catDefaultFile} style={{ width: "100%", height: "55%", objectFit: 'cover' }} />
                                :
                                null
                            }
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                            <button className="btn mt-2 text-white text-center" style={{ backgroundColor: "#6c6a6a" }}>Add</button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </>
    );
}
export default AddCategory;