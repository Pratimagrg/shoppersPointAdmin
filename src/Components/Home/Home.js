import React, { useEffect, useState } from "react";
import { baseURL } from "../../Shared/BaseURL";
import CarouselItems from "./carouselItems";
import HomeCategory from "./HomeCategory";

function Home(props) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(baseURL + 'categories.php',{method:"POST"})
            .then((res) => res.json())
            .then((res) => {
                setCategories(res.data);
                console.log(res)
            })
            .catch(e => console.log(e.message));
    }, [])

    return (
        <div style={{ backgroundColor: "#EFEFEF" }}>
            <CarouselItems />
            <HomeCategory categories={categories} />
          
        </div>
    );
}
export default Home;