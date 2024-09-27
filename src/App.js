import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// เพิ่มฟิลด์ stock ในข้อมูลสินค้า
const products = [
  {
    id: 1,
    name: "สินค้า 1",
    price: 100,
    image: "https://www.neonics.co.th/wp-content/uploads/2023/07/ph-value-fruit.jpg",
    stock: 10,
  },
  {
    id: 2,
    name: "สินค้า 2",
    price: 150,
    image: "https://www.neonics.co.th/wp-content/uploads/2023/07/ph-value-fruit.jpg",
    stock: 8,
  },
  {
    id: 3,
    name: "สินค้า 3",
    price: 200,
    image: "https://www.neonics.co.th/wp-content/uploads/2023/07/ph-value-fruit.jpg",
    stock: 5,
  },
  {
    id: 4,
    name: "สินค้า 4",
    price: 250,
    image: "https://www.neonics.co.th/wp-content/uploads/2023/07/ph-value-fruit.jpg",
    stock: 12,
  },
  {
    id: 5,
    name: "สินค้า 5",
    price: 300,
    image: "https://www.neonics.co.th/wp-content/uploads/2023/07/ph-value-fruit.jpg",
    stock: 6,
  },
  {
    id: 6,
    name: "สินค้า 6",
    price: 350,
    image: "https://www.neonics.co.th/wp-content/uploads/2023/07/ph-value-fruit.jpg",
    stock: 15,
  },
  {
    id: 7,
    name: "สินค้า 7",
    price: 400,
    image: "https://www.neonics.co.th/wp-content/uploads/2023/07/ph-value-fruit.jpg",
    stock: 4,
  },
  {
    id: 8,
    name: "สินค้า 8",
    price: 450,
    image: "https://www.neonics.co.th/wp-content/uploads/2023/07/ph-value-fruit.jpg",
    stock: 10,
  },
  {
    id: 9,
    name: "สินค้า 9",
    price: 500,
    image: "https://www.neonics.co.th/wp-content/uploads/2023/07/ph-value-fruit.jpg",
    stock: 9,
  },
  {
    id: 10,
    name: "สินค้า 10",
    price: 550,
    image: "https://www.neonics.co.th/wp-content/uploads/2023/07/ph-value-fruit.jpg",
    stock: 7,
  },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [availableProducts, setAvailableProducts] = useState(products);
  const [showPopup, setShowPopup] = useState(false);
  const [discountCode, setDiscountCode] = useState(""); // คูปองส่วนลด
  const [discountAvailable, setDiscountAvailable] = useState(1); // จำนวนคูปองที่มี
  const shippingFee = 100;

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;

    if (quantity > product.stock) {
      alert("สินค้ามีไม่เพียงพอ");
      return;
    }

    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const productWithQuantity = { ...product, quantity };
      setCart([...cart, productWithQuantity]);
    }

    setAvailableProducts(
      availableProducts.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - quantity } : p
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const changeQuantity = (productId, delta) => {
    const productInCart = cart.find((item) => item.id === productId);
    if (productInCart) {
      const newQuantity = productInCart.quantity + delta;

      if (newQuantity <= 0) {
        removeFromCart(productId);
      } else {
        setCart(
          cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    }
  };

  const calculateTotal = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = discountCode === "คูปอง" && discountAvailable > 0 ? 50 : 0; // ใช้คูปองส่วนลด
    return total + shippingFee - discount;
  };

  const handleQuantityChange = (e, productId) => {
    setQuantities({ ...quantities, [productId]: parseInt(e.target.value) });
  };

  const applyDiscount = () => {
    if (discountCode === "คูปอง" && discountAvailable > 0) {
      setDiscountAvailable(discountAvailable - 1); // ลดจำนวนคูปอง
      alert("ใช้คูปองสำเร็จ!");
    } else {
      alert("คูปองไม่ถูกต้องหรือหมดอายุ");
    }
  };

  const handleCheckout = () => {
    alert(`ยอดรวมทั้งหมด: ${calculateTotal()} บาท\nชำระเงินเรียบร้อยแล้ว!`);
    setCart([]);
    setShowPopup(false);
  };
  return (
    <div className="container">
      {/* รูปตะกร้าสินค้า */}
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        {/* แสดงจำนวนรายการสินค้าที่อยู่ในตะกร้า */}
        {cart.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              color: "red",
              fontWeight: "bold",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            {cart.length} {/* แสดงจำนวนรายการสินค้า */}
          </span>
        )}
        <img
          src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/shopping_cart.png"
          alt="Cart"
          style={{ cursor: "pointer", width: "60px", height: "60px" }} // ขนาดของรูป
          onClick={() => setShowPopup(true)} // เปิด Popup เมื่อคลิก
        />
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col text-center">
          <h1>รายการสินค้า</h1>
        </div>
      </div>

      <div className="row mt-4">
        {availableProducts.map((product) => (
          <div className="col-md-3" key={product.id}>
            <div className="card mb-4">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">ราคา: {product.price} บาท</p>
                <p className="card-text">คงเหลือ: {product.stock} ชิ้น</p>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    className="form-control me-2"
                    style={{ width: "80px" }}
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(e, product.id)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup สำหรับ Shopping Cart */}
      {showPopup && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Shopping Cart</h5>
              </div>
              <div className="modal-body">
                <ul className="list-group">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {item.name} - {item.price} บาท x {item.quantity}
                      <div>
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => changeQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => changeQuantity(item.id, 1)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ลบ
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-3">Total: {calculateTotal()} บาท</h3>
                <div className="mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="กรอกรหัสคูปอง"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button
                    className="btn btn-success mt-2"
                    onClick={applyDiscount}
                  >
                    ใช้คูปอง
                  </button>
                </div>
                <p className="mt-2">
                  คูปองส่วนลดที่มีอยู่: {discountAvailable}
                </p>
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleCheckout}
                >
                  ชำระเงิน
                </button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
