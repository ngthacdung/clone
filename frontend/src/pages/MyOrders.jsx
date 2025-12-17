import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../utils/api';
import { FaBox, FaTimes, FaPhone, FaMapMarkerAlt, FaSignInAlt } from 'react-icons/fa';

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) return;
    try {
      await ordersAPI.cancelOrder(id);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || 'Hủy đơn hàng thất bại');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang xử lý': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Đã xác nhận': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Đang giao': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Đã giao': return 'bg-green-100 text-green-800 border-green-300';
      case 'Đã hủy': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải đơn hàng...</p>
        </div>
      </div>
    );
  }

  // Chưa đăng nhập
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bạn chưa đăng nhập</h2>
          <p className="text-gray-600 mb-6">Vui lòng đăng nhập để xem đơn hàng</p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            <FaSignInAlt /> Đăng nhập ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Đơn hàng của tôi</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-xl">Bạn chưa có đơn hàng nào</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Đơn hàng #{order._id.slice(-6)}</h3>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Sản phẩm:</h4>
                  {order.items.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm mb-1">
                      <span>{item.productId?.name} x {item.quantity}</span>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString()} ₫</span>
                    </div>
                  ))}
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                    <span>Tổng:</span>
                    <span className="text-red-600">{order.totalPrice.toLocaleString()} ₫</span>
                  </div>
                </div>

                {order.status === 'Đang xử lý' && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <FaTimes /> Hủy đơn hàng
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;