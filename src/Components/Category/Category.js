import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { baseURL } from "../../Shared/BaseURL";
import image1 from "../../Uploads/aboutus1.jpg";
import SideBar from "../NavigationBar/SideBar";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [addCategory, setAddCateogory] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = (e) => {
    fetch(baseURL + "categories.php", { method: "get" })
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.data);
        console.log(categories);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <>
      <div className="ms-5 ps-3 d-flex flex-wrap">
        {categories.map((items, index) => {
          return (
            <CategoryCard
              items={items}
              key={index}
              fetchCategory={fetchCategory}
            />
          );
        })}
        <AddCategory
          open={addCategory}
          onClosePress={() => {
            setAddCateogory(false);
          }}
          fetchcategory={() => fetchCategory()}
        />
      </div>
      <Container className="mt-3 d-flex justify-content-start">
        <button
          className="btn mt-4 text-white text-center"
          style={{ backgroundColor: "#6c6a6a", marginLeft: "70px" }}
          onClick={() => {
            setAddCateogory(true);
          }}
        >
          Add Category
        </button>
      </Container>
    </>
  );
}
export default CategoryPage;

function CategoryCard({ items, key, fetchCategory }) {
  const [editCategory, setEditCategory] = useState(false);

  return (
    <Link
      to={`category/${items.categoryName}/${items.categoryId}`}
      className="px-4 pt-4 text-decoration-none"
      style={{ marginLeft: 100, marginRight: 100 }}
      key={key}
    >
      {/* <div className="d-flex flex-row rounded shadow" style={{ height: "15vh", width: "65vh", backgroundColor: "white", }}>
                                <img src={baseURL + items.imageName} style={{ height: "15vh", width: 100 }} className="rounded" />
                                <p className="my-auto">{items.categoryName}</p>
                            </div> */}

      <div
        className="col col-sm-12 col-md-6 mb-4 col-lg-4 container rounded px-0"
        style={{
          height: 100,
          width: 430,
          color: "black",
          border: "2px",
          backgroundColor: "white",
          boxShadow: "6px 10px 10px 1px rgba(0,0,0,0.45)",
        }}
      >
        <div className="d-flex flex-wrap  my-auto">
          <div>
            <img
              src={baseURL + items.imageName}
              className="d-block rounded-top rounded-bottom"
              style={{ width: 110, height: 100, objectFit: "Cover" }}
              alt="..."
            />
          </div>
          <div className="ms-4  my-auto">
            <p
              style={{ fontSize: 25, fontWeight: 400 }}
              className="crimsonText-regular"
            >
              {items.categoryName}
            </p>
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={() => {
            setEditCategory(true);
          }}
          className="btn mt-2 text-white text-center"
          style={{ backgroundColor: "#6c6a6a" }}
        >
          Edit
        </button>
      </div>
      <EditCategory
        onSuccess={() => {
          fetchCategory();
        }}
        cat={items}
        isOpen={editCategory}
        onClosePress={() => {
          setEditCategory(false);
        }}
      />
    </Link>
  );
}
