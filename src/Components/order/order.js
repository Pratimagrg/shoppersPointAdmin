const Order =()=>{
const orders=[

      {
        "orderId": "1",
        "userId": "1",
        "totalCost": "1500",
        "delieveryStatus": "Placed",
        "orderRegion": "Gandaki",
        "orderCity": "Pokhara",
        "orderStreet": "malepatan",
        "orderArea": "madan marga",
        "orderItems": [
          {
            "productName": "Roadster Jeans",
            "description": "Black dark wash 5-pocket mid-rise jeans, clean look with no fade and elasticated waistband jeans for man.",
            "quantity": "1",
            "price": "1500"
          }
        ]
      }]

    return    <div
    className="mw-100 w-100 d-lg-flex justify-content-end"
    style={{ overflow: "auto" }}
  >
    <table className="table" style={{ overflow: "auto",margin:"4rem" }}>
      <thead>
        <tr>
        <th>Order Id</th>
          <th>User ID</th>
          <th>Total</th>
          <th>Order Status</th>
          <th>Payment Status</th>
          <th>Address</th>
          <th>Payment Type</th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order, i) => (
            <tr key={i}>
                <td>{order.orderId}</td>
              <td>{order.userId}</td>
              <td>{order?.totalCost}</td>
              <td>
                <select
                  // value={orderStatus}
                  className="text-black"
                  // onChange={(e) => setOrderStatus(e.target.value)}
                >
                  <option value="Placed">Placed</option>
                  <option value="Delivering">Delivering</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td>Paid</td>
              <td>{order.phone}</td>
              <td>{order.deliveryLocation}</td>
              <td>{order.paymentType}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
}

export default Order;