import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

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

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const createData = async () => {
  try {
    await connectDB();

    // 1. TẠO CUSTOMERS
    console.log('\n📝 Đang tạo customers...');
    const customersCollection = mongoose.connection.collection('customers');
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
    await productsCollection.deleteMany({});
    
    const products = [
      {
        name: 'Nhà Giả Kim',
        author: 'Paulo Coelho',
        category: 'Văn học',
        brand: 'Văn học',
        price: 79000,
        description: 'Tác phẩm nổi tiếng của Paulo Coelho',
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
        description: 'Cuốn sách kinh điển về nghệ thuật giao tiếp',
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
      }
    ];
    
    await productsCollection.insertMany(products);
    console.log('✅ Đã tạo 2 products');

    // 3. TẠO ORDERS
    console.log('\n📦 Đang tạo collection orders...');
    const ordersCollection = mongoose.connection.collection('orders');
    await ordersCollection.deleteMany({});
    console.log('✅ Collection orders đã sẵn sàng');

    // 4. TẠO VOUCHERS
    console.log('\n🎟️ Đang tạo vouchers...');
    const vouchersCollection = mongoose.connection.collection('vouchers');
    await vouchersCollection.deleteMany({});

    const vouchers = [
      {
        code: 'BOOK50',
        description: 'Giảm 50k cho đơn từ 200k',
        discount: 50000,
        type: 'fixed',
        minOrder: 200000,
        maxUses: 100,
        usedCount: 0,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'SALE10',
        description: 'Giảm 10% cho đơn từ 100k',
        discount: 10,
        type: 'percent',
        minOrder: 100000,
        maxUses: 200,
        usedCount: 0,
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'FREESHIP',
        description: 'Miễn phí ship',
        discount: 30000,
        type: 'shipping',
        minOrder: 0,
        maxUses: 500,
        usedCount: 0,
        startDate: new Date(),
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'VIP20',
        description: 'Giảm 20% cho đơn từ 500k',
        discount: 20,
        type: 'percent',
        minOrder: 500000,
        maxUses: 50,
        usedCount: 0,
        startDate: new Date(),
        endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await vouchersCollection.insertMany(vouchers);
    console.log('✅ Đã tạo 4 vouchers');

    // THỐNG KÊ
    console.log('\n' + '='.repeat(60));
    console.log('🎉 TẠO DỮ LIỆU THÀNH CÔNG!');
    console.log('='.repeat(60));
    
    console.log('\n📊 Thống kê:');
    console.log(`   - Customers: ${await customersCollection.countDocuments()} tài khoản`);
    console.log(`   - Products: ${await productsCollection.countDocuments()} sách`);
    console.log(`   - Orders: ${await ordersCollection.countDocuments()} đơn hàng`);
    console.log(`   - Vouchers: ${await vouchersCollection.countDocuments()} mã giảm giá`);
    
    console.log('\n🔐 Tài khoản đăng nhập:');
    console.log('\n   📌 ADMIN:');
    console.log('      Email: admin@bookstore.com');
    console.log('      Password: admin123');
    console.log('\n   📌 USER:');
    console.log('      Email: user1@example.com');
    console.log('      Password: user123');
    
    console.log('\n🎟️ Mã Voucher có sẵn:');
    console.log('   - BOOK50: Giảm 50k (đơn từ 200k)');
    console.log('   - SALE10: Giảm 10% (đơn từ 100k)');
    console.log('   - FREESHIP: Miễn phí ship');
    console.log('   - VIP20: Giảm 20% (đơn từ 500k)');
    
    console.log('\n💡 Bước tiếp theo:');
    console.log('   1. Chạy backend: npm run server');
    console.log('   2. Chạy frontend: npm run dev');
    console.log('   3. Truy cập: http://localhost:5173');
    console.log('\n' + '='.repeat(60) + '\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ LỖI:', error.message);
    console.error(error);
    process.exit(1);
  }
};

createData();