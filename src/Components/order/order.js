import { useEffect, useState } from "react";
import { baseURL } from "../../Shared/BaseURL";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    setOrderStatus(orders?.delieveryStatus);
  }, [orders]);

  console.log("delivery status", orderStatus);
  console.log(orderStatus);

  useEffect(() => {
    var formData = new FormData();
    formData.append("token", token);
    fetch(
      baseURL + "order/getOrder.php",

      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setOrders(res.data);
      })
      .catch((e) => console.log(e.message));
  }, [token, orderStatus]);

  const changeOrderStatusHandler = (orderId, userId, deliveryStatus) => {
    console.log(orderId, userId, deliveryStatus);

    const orderFormData = new FormData();
    orderFormData.append("orderId", orderId);
    orderFormData.append("userId", userId);
    orderFormData.append("deliveryStatus", deliveryStatus);

    fetch(
      baseURL + "order/updateOrder.php",

      {
        method: "POST",
        body: orderFormData,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setOrders(res.data);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <div
      className="mw-100 w-100 d-lg-flex justify-content-end"
      style={{ overflow: "auto" }}
    >
      <table className="table" style={{ overflow: "auto", margin: "4rem" }}>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>User ID</th>
            <th>Total</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            <th>Payment Type</th>
            <th>Address</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, i) => (
              <tr key={i}>
                <td style={{ padding: "1rem 0" }}>{order.orderId}</td>
                <td>{order.userId}</td>
                <td>{order?.totalCost}</td>
                <td>
                  <select
                    value={order?.delieveryStatus}
                    className="text-black"
                    onChange={(e) => {
                      setOrderStatus(e.target.value);
                      changeOrderStatusHandler(
                        order.orderId,
                        order.userId,
                        e.target.value
                      );
                    }}
                  >
                    <option value="Placed">Placed</option>
                    <option value="Delivering">Delivering</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td>Paid</td>
                <td>Khalti</td>
                <td>
                  {order.orderCity}, {order?.orderArea}, {order?.orderStreet}
                </td>

                <td>
                  {order?.orderItems?.map((item, index) => {
                    return (
                      <li
                        className="d-flex gap-4 "
                        style={{ listStyle: "circle" }}
                      >
                        <p>{item?.productName}</p>
                        <p>{item?.quantity}</p>
                      </li>
                    );
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
