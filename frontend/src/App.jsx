import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Chức năng 1: Tìm kiếm
  const [filterType, setFilterType] = useState("Tất cả"); // Chức năng 2: Lọc loại xe

  const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000/api/trips" // Dùng Node.js khi ở máy bạn
  : "/api.php";

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTrips(res.data.data))
      .catch(err => console.error("Lỗi:", err));
  }, []);

  // Logic xử lý tìm kiếm và lọc
  const filteredTrips = trips.filter(t => {
    const matchSearch = t.to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterType === "Tất cả" || t.type === filterType;
    return matchSearch && matchFilter;
  });

  // Chức năng 3: Đặt vé
  const handleBook = (trip) => {
    alert(`Chúc mừng! Bạn đã đặt thành công vé đi ${trip.to} với giá ${trip.price}. \nChúng tôi sẽ liên hệ bạn sớm nhất!`);
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary fw-bold mb-4">Hệ Thống Đặt Vé Xe - Nguyễn Hoàng Hiệp</h1>
      
      {/* KHU VỰC CHỨC NĂNG */}
      <div className="row g-3 mb-4 bg-light p-3 rounded shadow-sm">
        <div className="col-md-6">
          <label className="form-label fw-bold">Tìm điểm đến:</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Nhập nơi bạn muốn đến (ví dụ: Đà Lạt)..." 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Lọc loại xe:</label>
          <select className="form-select" onChange={(e) => setFilterType(e.target.value)}>
            <option value="Tất cả">Tất cả loại xe</option>
            <option value="Giường nằm">Giường nằm</option>
            <option value="Limousine">Limousine</option>
            <option value="Máy bay">Máy bay</option>
          </select>
        </div>
      </div>

      {/* DANH SÁCH HIỂN THỊ */}
      <div className="row justify-content-center">
        {filteredTrips.length > 0 ? filteredTrips.map(t => (
          <div key={t.id} className="col-md-10 mb-3">
            <div className="card shadow border-0 border-start border-5 border-primary card-hover">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="fw-bold text-dark">{t.from} <span className="text-primary">➝</span> {t.to}</h4>
                  <p className="mb-1 text-muted">⏰ Khởi hành: <b>{t.time}</b></p>
                  <span className="badge bg-info text-dark">{t.type}</span>
                </div>
                <div className="text-end">
                  <h3 className="text-danger fw-bold mb-2">{t.price}</h3>
                  <button className="btn btn-primary px-4 fw-bold" onClick={() => handleBook(t)}>
                    ĐẶT VÉ NGAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center p-5">
            <h5 className="text-muted">Không tìm thấy chuyến xe phù hợp với yêu cầu của bạn.</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;