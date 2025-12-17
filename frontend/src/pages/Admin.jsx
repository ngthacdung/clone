import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCog, FaBook, FaBoxOpen, FaLock } from 'react-icons/fa';

const Admin = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('products');

  console.log('🔥 ADMIN PAGE:', {
    user: user,
    isAdmin: user?.isAdmin,
    loading: loading
  });

  // Đang load -> Hiện spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Chưa đăng nhập -> Hiện nút đăng nhập
  if (!user) {
    console.log('❌ Chưa đăng nhập');
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center py-20 bg-white rounded-lg shadow">
            <FaLock className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Yêu cầu đăng nhập</h2>
            <p className="text-gray-600 mb-6">Bạn cần đăng nhập để truy cập trang này</p>
            <Link
              to="/login"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ĐÃ ĐĂNG NHẬP -> HIỆN GIAO DIỆN ADMIN (không check isAdmin nữa)
  console.log('✅ Đã đăng nhập, hiện giao diện admin');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-2">
            <FaCog className="text-blue-600" />
            Quản trị hệ thống
          </h1>
          <p className="text-gray-600">
            Xin chào, <span className="font-semibold">{user.name || user.email}</span>
            {user.isAdmin && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">ADMIN</span>}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaBook className="inline mr-2" />
                Quản lý sản phẩm
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'orders'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaBoxOpen className="inline mr-2" />
                Quản lý đơn hàng
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Danh sách sản phẩm</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    + Thêm sản phẩm
                  </button>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                  <FaBook className="text-5xl text-blue-400 mx-auto mb-4" />
                  <p className="text-blue-800 text-lg">
                    📦 Chức năng quản lý sản phẩm đang được phát triển...
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Danh sách đơn hàng</h2>
                  <div className="text-sm text-gray-500">Tổng: 0 đơn hàng</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <FaBoxOpen className="text-5xl text-green-400 mx-auto mb-4" />
                  <p className="text-green-800 text-lg">
                    📋 Chức năng quản lý đơn hàng đang được phát triển...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Tổng sản phẩm</p>
                <p className="text-3xl font-bold text-gray-800">0</p>
                <p className="text-xs text-green-600 mt-1">↑ Chưa có dữ liệu</p>
              </div>
              <FaBook className="text-5xl text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Đơn hàng mới</p>
                <p className="text-3xl font-bold text-gray-800">0</p>
                <p className="text-xs text-blue-600 mt-1">→ Chưa có đơn hàng</p>
              </div>
              <FaBoxOpen className="text-5xl text-green-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Doanh thu</p>
                <p className="text-3xl font-bold text-gray-800">0đ</p>
                <p className="text-xs text-gray-600 mt-1">→ Tháng này</p>
              </div>
              <div className="text-5xl opacity-50">💰</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;