import React from "react";
import image1 from '../../Uploads/carouselItem1.jpg';
import image2 from '../../Uploads/carouselItem2.jpg';
import image3 from '../../Uploads/carouselItem3.jpg';
import image4 from '../../Uploads/carouselItem4.jpg';

function CarouselItems(props) {
    const items = [
        {
            src: image1,
            caption: "VINTAGE",
            info: "People will stare. Make it worth their while."

        },
        {
            src: image2,
            caption: "ELEGANT",
            info: "The joy of dressing is an art."

        },

        {
            src: image3,
            caption: "COMFORTABLE",
            info: "Make it simple, but significant."
        },

        {
           
            src: image4,
            caption: "TRENDY",
            info: "Simplicity is the ultimate sophisticatnio."
        }
    ];
    return (

        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>



                </div>
                <div className="carousel-inner">

                    {items.map((item, index) => {
                        return (

                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="position-absolute w-100" style={{ height: "90vh", background: "#00000010" }}></div>
                                <img src={item.src} className="d-block w-100" style={{ height: "90vh", objectFit: "cover" }} alt="..." />
                                <div className="carousel-caption d-none d-md-block">
                                    
                                    <p>{item.caption}</p>
                                    <p>{item.info}</p>
                                </div>
                            </div>
                        );
                    })}




                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>

    );
}
export default CarouselItems;