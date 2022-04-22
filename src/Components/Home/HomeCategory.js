import React from "react";
import { Container } from "react-bootstrap";
import { baseURL } from "../../Shared/BaseURL";
import image3 from '../../Uploads/carouselItem3.jpg';

function HomeCategory(props) {
    return (
        <>
            <div className="d-flex flex-wrap justify-content-center mt-3">
                <hr style={{ width: "15%", textAlign: "left", height: 2, color: "#000000" }} className="my-auto me-2" />
                <p className="crimsonText-regular font-weight-bold" style={{ fontSize: 35, fontWeight: 400 }}>Shop By Category</p>
                <hr style={{ width: "15%", textAlign: "left", height: 2, color: "#000000" }} className="my-auto ms-2" />

            </div>
            <div className="d-flex flex-wrap mb-4 mt-3 ">
                {props.categories.map((item, index) => {
                    return (

                        <div className="col col-sm-12 col-md-6 mb-4 col-lg-4 container rounded px-0" style={{ height: 100, width: 400, color: "black", border: '2px', backgroundColor: "white", boxShadow: "6px 10px 10px 1px rgba(0,0,0,0.45)" }}>
                            <div className="d-flex flex-wrap  my-auto">
                                <div>
                                    <img src={baseURL+item.imageName} className="d-block rounded-top rounded-bottom" style={{ width: 110, height: 100, objectFit: "Cover" }} alt="..." />
                                </div>
                                <div className="ms-4  my-auto">
                                    <p style={{ fontSize: 25, fontWeight: 400 }} className="crimsonText-regular">{item.categoryName}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>


    );
}
export default HomeCategory;