import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { baseURL } from "../../Shared/BaseURL";
import ItemsCarousel from 'react-items-carousel';

const SpecificCategory = ({ id, name }) => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [viewProduct, setViewProduct] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);


    useEffect(() => {
        fetchProducts();
    }, [])


    const fetchProducts = async () => {

        var formData = new FormData();
        formData.append('token', JSON.parse(localStorage.getItem('token')));
        await fetch(baseURL + 'products.php', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then((res) => {
                var resp = res.data.filter(product => product.categoryId === id);
                setProducts(resp);
                console.log(resp);
            })
            .catch((e) => { alert("Something went wrong") })
    }



    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between">
                    <p className="h1">{name}</p>
                    <button onClick={() => { setAddProduct(true); }} className="btn btn-primary">Add Product</button>
                </div>
                <div className="d-flex flex-wrap">
                    {products.map((product, index) => {
                        return (
                            <div onClick={() => { setViewProduct(true); setProduct(product); }} key={index} className="col-12 col-sm-6 col-md-4 p-2">
                                <div className="col-12 bg-white shadow border rounded">
                                    <img className="col-12" style={{ height: 200, objectFit: "cover" }} src={baseURL + product.images[0]} />
                                    <div className="p-2">
                                        <p className="lead fw-bold">{product.productName}</p>
                                        <p className="mb-0 small">{product.description}</p>
                                        <p className="mb-0 small">Rs. {product.price}</p>
                                        <p className="mb-0 small">Size: {product.size}</p>
                                        <p className="mb-0 small">Gender: {product.gender}</p>
                                        <div>

                                            <button onClick={(e) => { e.stopPropagation(); setEditProduct(true); setProduct(product); }} type="button" className="btn btn-primary me-2">Edit</button>
                                            <button onClick={(e) => { e.stopPropagation(); setProduct(product); setDeleteProduct(true); }} type="button" className="btn btn-danger">Delete</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <ViewProduct product={product} show={viewProduct} onHide={() => { setViewProduct(false); }} />
            <AddProduct fetchProducts={fetchProducts} show={addProduct} onHide={() => { setAddProduct(false); }} id={id} />
            <EditProduct fetchProducts={fetchProducts} product={product} show={editProduct} onHide={() => { setEditProduct(false); }} id={id} />
            <DeleteProduct fetchProducts={fetchProducts} product={product} show={deleteProduct} onHide={() => { setDeleteProduct(false); }} />
        </>
    );
}

export default SpecificCategory;



const ViewProduct = ({ show, onHide, product }) => {

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;


    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{product.productName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={1}
                    gutter={20}
                    leftChevron={<button className="btn btn-primary rounded-circle">{'<'}</button>}
                    rightChevron={<button className="btn btn-primary rounded-circle">{'>'}</button>}
                    chevronWidth={chevronWidth}
                >

                    {product.images && product.images.map((image, index) => {
                        return <img key={index} style={{ height: 500, width: "100%", objectFit: "cover" }} src={baseURL + image} />

                    })}
                </ItemsCarousel>
                <div className="p-2">
                    <p className="lead fw-bold">{product.productName}</p>
                    <p className="mb-0 small">{product.description}</p>
                    <p className="mb-0 small">Rs. {product.price}</p>
                    <p className="mb-0 small">Size: {product.size}</p>
                    <p className="mb-0 small">Gender: {product.gender}</p>
                </div>
            </Modal.Body>
        </Modal>
    );
}



const AddProduct = ({ id, show, onHide, fetchProducts }) => {

    const [catFile, setCatFile] = useState([]);
    const [catDefaultFile, setCatDefaultFile] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [gender, setGender] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [available_quantity, setAvailabilityQuantity] = useState("");




    const addProduct = async (e) => {

        e.preventDefault();
        var formData = new FormData();
        formData.append('token', JSON.parse(localStorage.getItem('token')));
        formData.append('categoryId', id);
        formData.append('productName', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('gender', gender);
        formData.append('size', size);
        formData.append('color', color);
        formData.append('available_quantity', available_quantity);

        for (let i = 0; i < catFile.length; i++) {

            formData.append('images[]', catFile[i]);
        }

        await fetch(baseURL + 'product/addProduct.php', {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then((res) => {
                if (res.success) {
                    alert("Product added successfully");
                    onHide();
                    fetchProducts();
                }
                else {
                    alert("Something went wrong");
                }
            })




    }



    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3" onSubmit={addProduct}>
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input required type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Price</label>
                        <input required type="number" className="form-control" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Description</label>
                        <textarea type="text" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }}  ></textarea>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Gender</label>
                        <select required type="text" className="form-select" value={gender} onChange={(e) => { setGender(e.target.value) }} >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="U">Unisex</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Size</label>
                        <input required type="text" className="form-control" value={size} onChange={(e) => { setSize(e.target.value) }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Color</label>
                        <input required type="text" className="form-control" value={color} onChange={(e) => { setColor(e.target.value) }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Availability Quantity</label>
                        <input required type="number" className="form-control" value={available_quantity} onChange={(e) => { setAvailabilityQuantity(e.target.value) }} />
                    </div>
                    <div className="form-group mt-4">
                        <label className="me-2">Product Images: </label>
                        <input required multiple={true} className="form-control" type="file" accept="image/*" onChange={e => {
                            setCatFile(e.target.files);
                            setCatDefaultFile([]);
                            for (let i = 0; i < e.target.files.length; i++) {
                                setCatDefaultFile((prev) => [...prev, URL.createObjectURL(e.target.files[i])]);
                            }

                        }} />
                    </div>
                    <div>
                        {catDefaultFile.length > 0 && catDefaultFile.map((file, index) => {
                            return <img src={file} style={{ height: 200 }} />
                        })}
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

const DeleteProduct = ({ product, show, onHide, fetchProducts }) => {


    const deleteProduct = async () => {
        var formData = new FormData();
        formData.append('token', JSON.parse(localStorage.getItem('token')));
        formData.append('productId', product.id);

        await fetch(baseURL + 'product/deleteProduct.php', {
            method: "POST",
            body: formData
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    alert("Product deleted successfully");
                    onHide();
                    fetchProducts();
                }
                else {
                    alert("Something went wrong");
                }
            })
            .catch(e => { alert("Something went wrong"); })

    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete {product.productName}?</p>
                <div className="col-12">
                    <button onClick={deleteProduct} type="submit" className="btn btn-primary me-2">Confirm</button>
                    <button onClick={onHide} type="button" className="btn btn-danger">Cancel</button>
                </div>
            </Modal.Body>
        </Modal>
    );
}


const EditProduct = ({ id, show, onHide, fetchProducts, product }) => {

    const [catFile, setCatFile] = useState([]);
    const [catDefaultFile, setCatDefaultFile] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [gender, setGender] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [available_quantity, setAvailabilityQuantity] = useState("");


    useEffect(() => {
        setName(product.productName);
        setDescription(product.description);
        setPrice(product.price);
        setGender(product.gender);
        setSize(product.size);
        setColor(product.color);
        setAvailabilityQuantity(product.available_quantity);
    }, [product])



    const editProduct = async (e) => {

        e.preventDefault();
        var formData = new FormData();
        formData.append('token', JSON.parse(localStorage.getItem('token')));
        formData.append('categoryId', id);
        formData.append('productId', product.id);
        formData.append('productName', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('gender', gender);
        formData.append('size', size);
        formData.append('color', color);
        formData.append('available_quantity', available_quantity);

        for (let i = 0; i < catFile.length; i++) {

            formData.append('images[]', catFile[i]);
        }

        await fetch(baseURL + 'product/editProduct.php', {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then((res) => {
                if (res.success) {
                    alert("Product edited successfully");
                    onHide();
                    fetchProducts();
                }
                else {
                    alert("Something went wrong");
                }
            })




    }



    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3" onSubmit={editProduct}>
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input required type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Price</label>
                        <input required type="number" className="form-control" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Description</label>
                        <textarea type="text" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }}  ></textarea>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Gender</label>
                        <select required type="text" className="form-select" value={gender} onChange={(e) => { setGender(e.target.value) }} >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="U">Unisex</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Size</label>
                        <input required type="text" className="form-control" value={size} onChange={(e) => { setSize(e.target.value) }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Color</label>
                        <input required type="text" className="form-control" value={color} onChange={(e) => { setColor(e.target.value) }} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Availability Quantity</label>
                        <input required type="number" className="form-control" value={available_quantity} onChange={(e) => { setAvailabilityQuantity(e.target.value) }} />
                    </div>
                    <div className="form-group mt-4">
                        <label className="me-2">Product Images: </label>
                        <input multiple={true} className="form-control" type="file" accept="image/*" onChange={e => {
                            setCatFile(e.target.files);
                            setCatDefaultFile([]);
                            for (let i = 0; i < e.target.files.length; i++) {
                                setCatDefaultFile((prev) => [...prev, URL.createObjectURL(e.target.files[i])]);
                            }

                        }} />
                    </div>
                    <div className="d-flex flex-wrap">
                        {catDefaultFile.length > 0 && catDefaultFile.map((file, index) => {
                            return <img key={index} className="col-6" src={file} style={{ height: 200, objectFit: "cover" }} />
                        })}
                        {product.images && product.images.map((image, index) => {
                            return <img className="col-6" key={index} src={baseURL + image} style={{ height: 200, objectFit: "cover" }} />
                        })}
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Edit</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}