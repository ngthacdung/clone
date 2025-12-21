import { useState, useEffect } from 'react';
import { vouchersAPI } from '../utils/api';
import { FaTag, FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const AdminVouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount: '',
    type: 'fixed',
    minOrder: '',
    maxUses: '',
    startDate: '',
    endDate: '',
    isActive: true
  });

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await vouchersAPI.getAllVouchersAdmin();
      setVouchers(response.data);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVoucher) {
        await vouchersAPI.updateVoucher(editingVoucher._id, formData);
        alert('✅ Cập nhật voucher thành công!');
      } else {
        await vouchersAPI.createVoucher(formData);
        alert('✅ Thêm voucher thành công!');
      }
      setShowModal(false);
      setEditingVoucher(null);
      resetForm();
      fetchVouchers();
    } catch (error) {
      alert('❌ Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (voucher) => {
    setEditingVoucher(voucher);
    setFormData({
      code: voucher.code,
      description: voucher.description,
      discount: voucher.discount,
      type: voucher.type,
      minOrder: voucher.minOrder || '',
      maxUses: voucher.maxUses || '',
      startDate: voucher.startDate ? new Date(voucher.startDate).toISOString().split('T')[0] : '',
      endDate: voucher.endDate ? new Date(voucher.endDate).toISOString().split('T')[0] : '',
      isActive: voucher.isActive
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa voucher này?')) return;
    
    try {
      await vouchersAPI.deleteVoucher(id);
      alert('✅ Xóa voucher thành công!');
      fetchVouchers();
    } catch (error) {
      alert('❌ Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      discount: '',
      type: 'fixed',
      minOrder: '',
      maxUses: '',
      startDate: '',
      endDate: '',
      isActive: true
    });
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'fixed': return 'Giảm cố định';
      case 'percent': return 'Giảm %';
      case 'shipping': return 'Miễn phí ship';
      default: return type;
    }
  };

  if (loading) {
    return <div className="text-center py-12">Đang tải...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Quản lý Vouchers</h2>
        <button
          onClick={() => {
            setEditingVoucher(null);
            resetForm();
            setShowModal(true);
          }}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Thêm voucher mới</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giảm giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đơn tối thiểu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đã dùng/Tổng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vouchers.map((voucher) => (
              <tr key={voucher._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-bold text-orange-600">{voucher.code}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{voucher.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm">{getTypeLabel(voucher.type)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-semibold text-red-600">
                    {voucher.type === 'percent' ? `${voucher.discount}%` : `${voucher.discount.toLocaleString()}₫`}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {voucher.minOrder.toLocaleString()}₫
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={voucher.usedCount >= voucher.maxUses ? 'text-red-600 font-semibold' : ''}>
                    {voucher.usedCount}/{voucher.maxUses}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {voucher.isActive && new Date(voucher.endDate) > new Date() ? (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      <FaCheckCircle className="mr-1" /> Hoạt động
                    </span>
                  ) : (
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      <FaTimesCircle className="mr-1" /> Không hoạt động
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(voucher)}
                    className="text-orange-600 hover:text-orange-900"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(voucher._id)}
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
              {editingVoucher ? 'Chỉnh sửa voucher' : 'Thêm voucher mới'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã voucher *</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 uppercase"
                    placeholder="VD: FREESHIP"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="fixed">Giảm cố định (VNĐ)</option>
                    <option value="percent">Giảm phần trăm (%)</option>
                    <option value="shipping">Miễn phí ship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="2"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="VD: Giảm 50,000đ cho đơn từ 200,000đ"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giảm giá * {formData.type === 'percent' ? '(%)' : '(VNĐ)'}
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đơn tối thiểu (VNĐ)</label>
                  <input
                    type="number"
                    name="minOrder"
                    value={formData.minOrder}
                    onChange={handleChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số lượt dùng</label>
                  <input
                    type="number"
                    name="maxUses"
                    value={formData.maxUses}
                    onChange={handleChange}
                    min="1"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Kích hoạt voucher</label>
              </div>

              <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
                  {editingVoucher ? 'Cập nhật' : 'Thêm'}
                </button>
                <button type="button" onClick={() => { setShowModal(false); setEditingVoucher(null); resetForm(); }} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400">
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

export default AdminVouchers;