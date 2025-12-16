import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaShoppingCart, FaTruck, FaShieldAlt, FaHeadset, FaStar } from 'react-icons/fa';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: '🔥 GIẢM GIÁ ĐẾN 50%',
      subtitle: 'Bộ sưu tập Văn học Việt Nam - Đọc để hiểu đời',
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
      link: '/products?category=Văn học'
    },
    {
      title: '⚡ SÁCH KINH TẾ HAY',
      subtitle: 'Nâng cao tư duy - Phát triển sự nghiệp',
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
      link: '/products?category=Kinh tế'
    },
    {
      title: '🎨 SÁCH THIẾU NHI',
      subtitle: 'Phát triển trí tuệ - Khơi nguồn sáng tạo',
      bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      link: '/products?category=Thiếu nhi'
    },
    {
      title: '🎯 KỸ NĂNG SỐNG',
      subtitle: 'Thay đổi tư duy - Thành công trong cuộc sống',
      bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
      link: '/products?category=Kỹ năng sống'
    },
    {
      title: '🌍 NGOẠI NGỮ',
      subtitle: 'Chinh phục ngôn ngữ - Mở rộng tầm nhìn',
      bg: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
      link: '/products?category=Ngoại ngữ'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: 'Văn học', icon: '📚', color: 'from-blue-400 to-blue-600' },
    { name: 'Kinh tế', icon: '💼', color: 'from-green-400 to-green-600' },
    { name: 'Kỹ năng sống', icon: '🎯', color: 'from-purple-400 to-purple-600' },
    { name: 'Thiếu nhi', icon: '🎨', color: 'from-pink-400 to-pink-600' },
    { name: 'Giáo khoa', icon: '📖', color: 'from-orange-400 to-orange-600' },
    { name: 'Ngoại ngữ', icon: '🌍', color: 'from-indigo-400 to-indigo-600' },
  ];

  const features = [
    {
      icon: <FaTruck className="text-4xl text-blue-600" />,
      title: 'Giao hàng toàn quốc',
      description: 'Miễn phí vận chuyển cho đơn hàng từ 150.000đ',
    },
    {
      icon: <FaShieldAlt className="text-4xl text-green-600" />,
      title: 'Sách chính hãng',
      description: '100% sách chính hãng, nguyên seal',
    },
    {
      icon: <FaHeadset className="text-4xl text-purple-600" />,
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ tư vấn nhiệt tình, chuyên nghiệp',
    },
    {
      icon: <FaStar className="text-4xl text-yellow-500" />,
      title: 'Ưu đãi hấp dẫn',
      description: 'Giảm giá lên đến 50% cho thành viên',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <div className="relative w-full h-[500px] overflow-hidden mb-10">
        <div className="slider-container relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide absolute top-0 left-0 w-full h-full flex items-center justify-between px-[10%] text-white transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ background: slide.bg }}
            >
              <div className="slide-content max-w-[500px] animate-slideIn">
                <h2 className="text-5xl font-bold mb-5 drop-shadow-lg">{slide.title}</h2>
                <p className="text-xl mb-8 opacity-95 leading-relaxed">{slide.subtitle}</p>
                <Link
                  to={slide.link}
                  className="inline-block px-10 py-4 bg-white text-gray-800 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  Khám phá ngay
                </Link>
              </div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-[450px] h-[450px] object-cover drop-shadow-2xl animate-float rounded-2xl"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white text-3xl px-5 py-4 rounded border-0 cursor-pointer z-20 hover:bg-white/50 transition-all"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white text-3xl px-5 py-4 rounded border-0 cursor-pointer z-20 hover:bg-white/50 transition-all"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full cursor-pointer transition-all hover:bg-white/80 hover:scale-110 ${
                index === currentSlide ? 'w-8 bg-white' : 'w-3 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Page Title */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Kho Sách Đa Dạng</h1>
        <p className="text-gray-600">Tìm thấy 1000+ đầu sách</p>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name}`}
              className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="text-center">
                <div className="text-5xl mb-4 hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <p className="font-bold text-gray-700">{category.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">10,000+</div>
              <p className="text-gray-600 font-medium">Đầu sách</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 mb-2">50,000+</div>
              <p className="text-gray-600 font-medium">Độc giả</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-600 mb-2">99%</div>
              <p className="text-gray-600 font-medium">Hài lòng</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600 font-medium">Hỗ trợ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Về Chúng Tôi</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Giới thiệu</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tin tức</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tuyển dụng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Chính Sách</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách đổi trả</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách bảo hành</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách vận chuyển</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Phương thức thanh toán</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Hỗ Trợ</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kiểm tra đơn hàng</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Kết Nối</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Youtube</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tiktok</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 BookStore.vn - Sách hay chính hãng</p>
            <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hà Nội | Hotline: 1900-xxxx</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;