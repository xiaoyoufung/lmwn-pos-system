// prisma/seed.ts
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
    // Create Restaurants
  const restaurant1 = await prisma.restaurants.create({
    data: {
      name: 'The Golden Fork',
    },
  });

  const restaurant2 = await prisma.restaurants.create({
    data: {
      name: 'Sunset Bistro',
    },
  });

  console.log('✅ Created restaurants');

  // Create Users for Restaurant 1
  const admin1 = await prisma.users.create({
    data: {
      restaurantId: restaurant1.restaurantId,
      name: 'Alice Admin',
      role: 'ADMIN',
    },
  });

  const manager1 = await prisma.users.create({
    data: {
      restaurantId: restaurant1.restaurantId,
      name: 'Bob Manager',
      role: 'MANAGER',
    },
  });

  const cashier1 = await prisma.users.create({
    data: {
      restaurantId: restaurant1.restaurantId,
      name: 'Charlie Cashier',
      role: 'CASHIER',
    },
  });

  // Create Users for Restaurant 2
  const admin2 = await prisma.users.create({
    data: {
      restaurantId: restaurant2.restaurantId,
      name: 'Diana Admin',
      role: 'ADMIN',
    },
  });

  const cashier2 = await prisma.users.create({
    data: {
      restaurantId: restaurant2.restaurantId,
      name: 'Eve Cashier',
      role: 'CASHIER',
    },
  });

  console.log('✅ Created users');

  // Create Items for Restaurant 1
  const items1 = await prisma.items.createMany({
    data: [
      // Appetizers
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Caesar Salad',
        priceMinor: 895, // $8.95
        is_available: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Garlic Bread',
        priceMinor: 595, // $5.95
        is_available: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Buffalo Wings',
        priceMinor: 1295, // $12.95
        is_available: true,
      },
      // Main Courses
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Grilled Salmon',
        priceMinor: 2495, // $24.95
        is_available: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Ribeye Steak',
        priceMinor: 3495, // $34.95
        is_available: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Margherita Pizza',
        priceMinor: 1695, // $16.95
        is_available: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Chicken Alfredo',
        priceMinor: 1895, // $18.95
        is_available: true,
      },
      // Desserts
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Chocolate Lava Cake',
        priceMinor: 795, // $7.95
        is_available: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Tiramisu',
        priceMinor: 895, // $8.95
        is_available: true,
      },
      // Beverages
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Soft Drink',
        priceMinor: 295, // $2.95
        is_available: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Fresh Lemonade',
        priceMinor: 395, // $3.95
        is_available: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        name: 'Coffee',
        priceMinor: 350, // $3.50
        is_available: true,
      },
    ],
  });

  // Create Items for Restaurant 2
  const items2 = await prisma.items.createMany({
    data: [
      {
        restaurantId: restaurant2.restaurantId,
        name: 'Spring Rolls',
        priceMinor: 695, // $6.95
        is_available: true,
      },
      {
        restaurantId: restaurant2.restaurantId,
        name: 'Tom Yum Soup',
        priceMinor: 895, // $8.95
        is_available: true,
      },
      {
        restaurantId: restaurant2.restaurantId,
        name: 'Pad Thai',
        priceMinor: 1495, // $14.95
        is_available: true,
      },
      {
        restaurantId: restaurant2.restaurantId,
        name: 'Green Curry',
        priceMinor: 1595, // $15.95
        is_available: true,
      },
      {
        restaurantId: restaurant2.restaurantId,
        name: 'Mango Sticky Rice',
        priceMinor: 695, // $6.95
        is_available: true,
      },
      {
        restaurantId: restaurant2.restaurantId,
        name: 'Thai Iced Tea',
        priceMinor: 450, // $4.50
        is_available: true,
      },
    ],
  });

  console.log('✅ Created menu items');

  // Create Tables for Restaurant 1
  const tables1 = await prisma.tables.createMany({
    data: [
      {
        restaurantId: restaurant1.restaurantId,
        tableName: 'Table 1',
        isActive: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        tableName: 'Table 2',
        isActive: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        tableName: 'Table 3',
        isActive: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        tableName: 'Table 4',
        isActive: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        tableName: 'Table 5',
        isActive: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        tableName: 'Patio A',
        isActive: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        tableName: 'Patio B',
        isActive: true,
      },
      {
        restaurantId: restaurant1.restaurantId,
        tableName: 'VIP Room',
        isActive: true,
      },
    ],
  });

  // Create Tables for Restaurant 2
  const tables2 = await prisma.tables.createMany({
    data: [
      {
        restaurantId: restaurant2.restaurantId,
        tableName: 'Table 1',
        isActive: true,
      },
      {
        restaurantId: restaurant2.restaurantId,
        tableName: 'Table 2',
        isActive: true,
      },
      {
        restaurantId: restaurant2.restaurantId,
        tableName: 'Table 3',
        isActive: true,
      },
      {
        restaurantId: restaurant2.restaurantId,
        tableName: 'Bar Seat 1',
        isActive: true,
      },
      {
        restaurantId: restaurant2.restaurantId,
        tableName: 'Bar Seat 2',
        isActive: true,
      },
    ],
  });

  console.log('✅ Created tables');

  // Create Discounts for Restaurant 1
  const discount1 = await prisma.discounts.create({
    data: {
      restaurantId: restaurant1.restaurantId,
      name: 'Happy Hour 20%',
      type: 'PERCENT',
      value: 20, // 20%
      expiredAt: new Date('2026-12-31'),
      isActive: true,
    },
  });

  const discount2 = await prisma.discounts.create({
    data: {
      restaurantId: restaurant1.restaurantId,
      name: 'Senior Discount',
      type: 'PERCENT',
      value: 15, // 15%
      expiredAt: null, // No expiration
      isActive: true,
    },
  });

  const discount3 = await prisma.discounts.create({
    data: {
      restaurantId: restaurant1.restaurantId,
      name: '$5 Off',
      type: 'FIXED',
      value: 500, // $5.00 in minor units
      expiredAt: new Date('2026-03-31'),
      isActive: true,
    },
  });

  const discount4 = await prisma.discounts.create({
    data: {
      restaurantId: restaurant1.restaurantId,
      name: 'VIP Member 25%',
      type: 'PERCENT',
      value: 25, // 25%
      expiredAt: null,
      isActive: true,
    },
  });

  // Create Discounts for Restaurant 2
  const discount5 = await prisma.discounts.create({
    data: {
      restaurantId: restaurant2.restaurantId,
      name: 'Lunch Special 10%',
      type: 'PERCENT',
      value: 10,
      expiredAt: new Date('2026-06-30'),
      isActive: true,
    },
  });

  const discount6 = await prisma.discounts.create({
    data: {
      restaurantId: restaurant2.restaurantId,
      name: '$10 Off Orders Above $50',
      type: 'FIXED',
      value: 1000, // $10.00 in minor units
      expiredAt: null,
      isActive: true,
    },
  });

  console.log('✅ Created discounts');

  console.log('');
  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('Summary:');
  console.log(`- Restaurants: 2`);
  console.log(`- Users: 5`);
  console.log(`- Menu Items: 18`);
  console.log(`- Tables: 13`);
  console.log(`- Discounts: 6`);
  console.log('');
  console.log('Restaurant IDs:');
  console.log(`- The Golden Fork: ${restaurant1.restaurantId}`);
  console.log(`- Sunset Bistro: ${restaurant2.restaurantId}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });