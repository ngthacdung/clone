import { useState, useEffect } from 'react';
import { productsAPI } from '../utils/api';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
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
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productsAPI.updateProduct(editingProduct._id, formData);
        alert('✅ Cập nhật sản phẩm thành công!');
      } else {
        await productsAPI.createProduct(formData);
        alert('✅ Thêm sản phẩm thành công!');
      }
      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      alert('❌ Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (product) => {
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
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sách này?')) return;
    
    try {
      await productsAPI.deleteProduct(id);
      alert('✅ Xóa sách thành công!');
      fetchProducts();
    } catch (error) {
      alert('❌ Lỗi: ' + (error.response?.data?.message || error.message));
    }
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

  if (loading) {
    return <div className="text-center py-12">Đang tải...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Danh sách sản phẩm</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sách</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thể loại</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tồn kho</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={product.image} alt={product.name} className="h-12 w-12 rounded object-cover" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category || product.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap text-red-600 font-semibold">
                  {product.price.toLocaleString()}₫
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    (product.countInStock || product.stock) > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.countInStock || product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên sách *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thể loại *</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá (₫) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tồn kho *</label>
                  <input type="number" name="countInStock" value={formData.countInStock} onChange={handleChange} required min="0" className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded px-3 py-2"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL hình ảnh</label>
                <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
                  <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nhà xuất bản</label>
                  <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Năm XB</label>
                  <input type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số trang</label>
                  <input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngôn ngữ</label>
                  <input type="text" name="language" value={formData.language} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  {editingProduct ? 'Cập nhật' : 'Thêm'}
                </button>
                <button type="button" onClick={() => { setShowModal(false); setEditingProduct(null); resetForm(); }} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
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

export default AdminProducts;