import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productsAPI, ordersAPI } from '../utils/api';
import { FaCog, FaBook, FaBoxOpen, FaLock, FaPlus, FaEdit, FaEye, FaCheckCircle, FaClock, FaTruck } from 'react-icons/fa';

const Admin = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    countInStock: '',
    image: '',
    author: '',
    publisher: '',
    publicationYear: '',
    pageCount: '',
    language: 'Tiếng Việt'
  });

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchOrders();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      setLoadingData(true);
      const response = await productsAPI.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productsAPI.updateProduct(editingProduct._id, formData);
        alert('✅ Cập nhật sản phẩm thành công!');
      } else {
        await productsAPI.createProduct(formData);
        alert('✅ Thêm sản phẩm thành công!');
      }
      setShowProductModal(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      alert('❌ Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category || product.brand,
      description: product.description || '',
      countInStock: product.countInStock || product.stock,
      image: product.image || '',
      author: product.author || '',
      publisher: product.publisher || '',
      publicationYear: product.publicationYear || '',
      pageCount: product.pageCount || '',
      language: product.language || 'Tiếng Việt'
    });
    setShowProductModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      countInStock: '',
      image: '',
      author: '',
      publisher: '',
      publicationYear: '',
      pageCount: '',
      language: 'Tiếng Việt'
    });
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateOrderToDelivered(orderId);
      alert('✅ Cập nhật trạng thái thành công!');
      fetchOrders();
    } catch (error) {
      alert('❌ Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Đang xử lý': 'bg-yellow-100 text-yellow-800',
      'Đã xác nhận': 'bg-blue-100 text-blue-800',
      'Đang giao': 'bg-purple-100 text-purple-800',
      'Đã giao': 'bg-green-100 text-green-800',
      'Đã hủy': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center py-20 bg-white rounded-lg shadow">
            <FaLock className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Yêu cầu đăng nhập</h2>
            <p className="text-gray-600 mb-6">Bạn cần đăng nhập để truy cập trang này</p>
            <Link to="/login" className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Tổng sản phẩm</p>
                <p className="text-3xl font-bold text-gray-800">{products.length}</p>
              </div>
              <FaBook className="text-5xl text-blue-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Tổng đơn hàng</p>
                <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
              </div>
              <FaBoxOpen className="text-5xl text-green-500 opacity-50" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Doanh thu</p>
                <p className="text-3xl font-bold text-gray-800">
                  {orders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString()}đ
                </p>
              </div>
              <div className="text-5xl opacity-50">💰</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'products' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FaBook className="inline mr-2" />
                Quản lý sản phẩm
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'orders' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
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
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      resetForm();
                      setShowProductModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FaPlus /> Thêm sản phẩm
                  </button>
                </div>

                {loadingData ? (
                  <div className="text-center py-12">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sách</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thể loại</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tồn kho</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                          <tr key={product._id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img src={product.image} alt={product.name} className="h-12 w-12 rounded object-cover" />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm">{product.category || product.brand}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                              {product.price.toLocaleString()}₫
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                (product.countInStock || product.stock) > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {product.countInStock || product.stock}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <FaEdit />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Danh sách đơn hàng</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">Đơn hàng #{order._id.slice(-8)}</h3>
                          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString('vi-VN')}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus || 'Đang xử lý')}`}>
                          {order.orderStatus || 'Đang xử lý'}
                        </span>
                      </div>

                      <div className="border-t pt-4 mb-4">
                        <h4 className="font-semibold mb-2">Sản phẩm:</h4>
                        {order.orderItems.map((item) => (
                          <div key={item._id} className="flex justify-between text-sm mb-1">
                            <span>{item.name} x {item.quantity}</span>
                            <span className="font-medium">{(item.price * item.quantity).toLocaleString()}₫</span>
                          </div>
                        ))}
                        <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                          <span>Tổng:</span>
                          <span className="text-red-600">{order.totalPrice.toLocaleString()}₫</span>
                        </div>
                      </div>

                      <div className="border-t pt-4 mb-4">
                        <h4 className="font-semibold mb-2">Thông tin giao hàng:</h4>
                        <p className="text-sm text-gray-700">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                        <p className="text-sm text-gray-700">SĐT: {order.shippingAddress.phone}</p>
                      </div>

                      <div className="flex gap-2">
                        <select
                          value={order.orderStatus || 'Đang xử lý'}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
                        >
                          <option value="Đang xử lý">Đang xử lý</option>
                          <option value="Đã xác nhận">Đã xác nhận</option>
                          <option value="Đang giao">Đang giao</option>
                          <option value="Đã giao">Đã giao</option>
                          <option value="Đã hủy">Đã hủy</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h3>
            <form onSubmit={handleSubmitProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tên sách *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Thể loại *</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} required className="w-full border border-gray-300 rounded px-3 py-2">
                    <option value="">Chọn thể loại</option>
                    <option value="Văn học">Văn học</option>
                    <option value="Kinh tế">Kinh tế</option>
                    <option value="Kỹ năng sống">Kỹ năng sống</option>
                    <option value="Thiếu nhi">Thiếu nhi</option>
                    <option value="Giáo khoa">Giáo khoa</option>
                    <option value="Ngoại ngữ">Ngoại ngữ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Giá (₫) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tồn kho *</label>
                  <input type="number" name="countInStock" value={formData.countInStock} onChange={handleInputChange} required min="0" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL hình ảnh</label>
                <input type="url" name="image" value={formData.image} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tác giả</label>
                  <input type="text" name="author" value={formData.author} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nhà xuất bản</label>
                  <input type="text" name="publisher" value={formData.publisher} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Năm XB</label>
                  <input type="number" name="publicationYear" value={formData.publicationYear} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Số trang</label>
                  <input type="number" name="pageCount" value={formData.pageCount} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ngôn ngữ</label>
                  <input type="text" name="language" value={formData.language} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  {editingProduct ? 'Cập nhật' : 'Thêm'}
                </button>
                <button type="button" onClick={() => { setShowProductModal(false); setEditingProduct(null); resetForm(); }} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;