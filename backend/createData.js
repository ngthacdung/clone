import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// Kết nối MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Tạo dữ liệu
const createData = async () => {
  try {
    await connectDB();

    // 1. TẠO CUSTOMERS
    console.log('\n📝 Đang tạo customers...');
    
    const customersCollection = mongoose.connection.collection('customers');
    
    // Xóa dữ liệu cũ
    await customersCollection.deleteMany({});
    
    const customers = [
      {
        email: 'admin@bookstore.com',
        name: 'Admin',
        phone: '0901234567',
        password: await hashPassword('admin123'),
        isAdmin: true,
        cart: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user1@example.com',
        name: 'Nguyễn Văn A',
        phone: '0909876543',
        password: await hashPassword('user123'),
        isAdmin: false,
        cart: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await customersCollection.insertMany(customers);
    console.log('✅ Đã tạo 2 customers');

    // 2. TẠO PRODUCTS
    console.log('\n📚 Đang tạo products...');
    
    const productsCollection = mongoose.connection.collection('products');
    
    // Xóa dữ liệu cũ
    await productsCollection.deleteMany({});
    
    const products = [
      {
        name: 'Nhà Giả Kim',
        author: 'Paulo Coelho',
        category: 'Văn học',
        brand: 'Văn học',
        price: 79000,
        description: 'Tác phẩm nổi tiếng của Paulo Coelho kể về hành trình tìm kiếm kho báu và ý nghĩa cuộc đời.',
        countInStock: 50,
        stock: 50,
        inStock: true,
        image: 'https://salt.tikicdn.com/cache/750x750/ts/product/45/3b/fc/aa3c737f1630d07c156eb8f5a72ce7f3.jpg.webp',
        publisher: 'NXB Hội Nhà Văn',
        publicationYear: 2020,
        pageCount: 227,
        language: 'Tiếng Việt',
        reviews: [],
        rating: 0,
        numReviews: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Đắc Nhân Tâm',
        author: 'Dale Carnegie',
        category: 'Kỹ năng sống',
        brand: 'Kỹ năng sống',
        price: 86000,
        description: 'Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử của Dale Carnegie.',
        countInStock: 100,
        stock: 100,
        inStock: true,
        image: 'https://salt.tikicdn.com/cache/750x750/ts/product/e6/28/7b/b9e9c1a7d5a2c3f3f9c3d8c9e0f3e6f7.jpg.webp',
        publisher: 'NXB Tổng Hợp',
        publicationYear: 2019,
        pageCount: 320,
        language: 'Tiếng Việt',
        reviews: [],
        rating: 0,
        numReviews: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
        author: 'Rosie Nguyễn',
        category: 'Kỹ năng sống',
        brand: 'Kỹ năng sống',
        price: 75000,
        description: 'Những bài học về tuổi trẻ, khát vọng và nỗ lực của tác giả Rosie Nguyễn.',
        countInStock: 80,
        stock: 80,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500',
        publisher: 'NXB Hội Nhà Văn',
        publicationYear: 2018,
        pageCount: 264,
        language: 'Tiếng Việt',
        reviews: [],
        rating: 0,
        numReviews: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sapiens: Lược Sử Loài Người',
        author: 'Yuval Noah Harari',
        category: 'Lịch sử',
        brand: 'Lịch sử',
        price: 189000,
        description: 'Câu chuyện về sự tiến hóa của loài người từ thời nguyên thủy đến hiện đại.',
        countInStock: 45,
        stock: 45,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        publisher: 'NXB Trẻ',
        publicationYear: 2021,
        pageCount: 544,
        language: 'Tiếng Việt',
        reviews: [],
        rating: 0,
        numReviews: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
        author: 'Nguyễn Nhật Ánh',
        category: 'Văn học',
        brand: 'Văn học',
        price: 95000,
        description: 'Tác phẩm văn học về tuổi thơ đẹp đẽ và đầy hoài niệm của Nguyễn Nhật Ánh.',
        countInStock: 60,
        stock: 60,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500',
        publisher: 'NXB Trẻ',
        publicationYear: 2017,
        pageCount: 368,
        language: 'Tiếng Việt',
        reviews: [],
        rating: 0,
        numReviews: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Harry Potter và Hòn Đá Phù Thủy',
        author: 'J.K. Rowling',
        category: 'Thiếu nhi',
        brand: 'Thiếu nhi',
        price: 120000,
        description: 'Cuốn sách đầu tiên trong series Harry Potter nổi tiếng thế giới.',
        countInStock: 70,
        stock: 70,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=500',
        publisher: 'NXB Trẻ',
        publicationYear: 2020,
        pageCount: 396,
        language: 'Tiếng Việt',
        reviews: [],
        rating: 0,
        numReviews: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Toán Học Lớp 12',
        author: 'Bộ Giáo Dục',
        category: 'Giáo khoa',
        brand: 'Giáo khoa',
        price: 45000,
        description: 'Sách giáo khoa Toán lớp 12 theo chương trình mới.',
        countInStock: 120,
        stock: 120,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500',
        publisher: 'NXB Giáo Dục Việt Nam',
        publicationYear: 2023,
        pageCount: 200,
        language: 'Tiếng Việt',
        reviews: [],
        rating: 0,
        numReviews: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tiếng Anh Giao Tiếp Cơ Bản',
        author: 'Nhiều tác giả',
        category: 'Ngoại ngữ',
        brand: 'Ngoại ngữ',
        price: 65000,
        description: 'Giáo trình tiếng Anh giao tiếp cơ bản cho người mới bắt đầu.',
        countInStock: 90,
        stock: 90,
        inStock: true,
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500',
        publisher: 'NXB Đại Học Quốc Gia',
        publicationYear: 2022,
        pageCount: 280,
        language: 'Tiếng Việt',
        reviews: [],
        rating: 0,
        numReviews: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await productsCollection.insertMany(products);
    console.log('✅ Đã tạo 8 products');

    // 3. TẠO COLLECTION ORDERS (rỗng)
    console.log('\n📦 Đang tạo collection orders...');
    const ordersCollection = mongoose.connection.collection('orders');
    await ordersCollection.deleteMany({});
    console.log('✅ Collection orders đã sẵn sàng');

    // 4. HIỂN THỊ THÔNG TIN
    console.log('\n' + '='.repeat(60));
    console.log('🎉 TẠO DỮ LIỆU THÀNH CÔNG!');
    console.log('='.repeat(60));
    
    console.log('\n📊 Thống kê:');
    console.log(`   - Customers: ${await customersCollection.countDocuments()} tài khoản`);
    console.log(`   - Products: ${await productsCollection.countDocuments()} sách`);
    console.log(`   - Orders: ${await ordersCollection.countDocuments()} đơn hàng`);
    
    console.log('\n🔐 Tài khoản đăng nhập:');
    console.log('\n   📌 ADMIN:');
    console.log('      Email: admin@bookstore.com');
    console.log('      Password: admin123');
    console.log('\n   📌 USER:');
    console.log('      Email: user1@example.com');
    console.log('      Password: user123');
    
    console.log('\n💡 Bước tiếp theo:');
    console.log('   1. Chạy backend: npm run server');
    console.log('   2. Chạy frontend: npm run client');
    console.log('   3. Hoặc chạy cả 2: npm run dev');
    console.log('   4. Truy cập: http://localhost:5173');
    console.log('\n' + '='.repeat(60) + '\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ LỖI:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Chạy script
createData();