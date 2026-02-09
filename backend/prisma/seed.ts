// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Delete in correct order to respect foreign key constraints
  await prisma.orderStatusHistory.deleteMany({});
  await prisma.orderDiscounts.deleteMany({});
  await prisma.orderItems.deleteMany({});
  await prisma.dailyOrderCounters.deleteMany({});
  await prisma.orders.deleteMany({});
  await prisma.discounts.deleteMany({});
  await prisma.tables.deleteMany({});
  await prisma.items.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.restaurants.deleteMany({});

  console.log('🗑️  Cleared all existing data');

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
      restaurantId: restaurant1.id,
      name: 'Alice Admin',
      role: 'ADMIN',
    },
  });

  const manager1 = await prisma.users.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Bob Manager',
      role: 'MANAGER',
    },
  });

  const cashier1 = await prisma.users.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Charlie Cashier',
      role: 'CASHIER',
    },
  });

  // Create Users for Restaurant 2
  const admin2 = await prisma.users.create({
    data: {
      restaurantId: restaurant2.id,
      name: 'Diana Admin',
      role: 'ADMIN',
    },
  });

  const cashier2 = await prisma.users.create({
    data: {
      restaurantId: restaurant2.id,
      name: 'Eve Cashier',
      role: 'CASHIER',
    },
  });

  console.log('✅ Created users');

  // Create Items for Restaurant 1 (with description and imageUrl)
  const caesarSalad = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan cheese and croutons',
      imageUrl: 'https://example.com/images/caesar-salad.jpg',
      priceMinor: 895, // $8.95
      isAvailable: true,
    },
  });

  const garlicBread = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Garlic Bread',
      description: 'Toasted bread with garlic butter',
      imageUrl: 'https://example.com/images/garlic-bread.jpg',
      priceMinor: 595,
      isAvailable: true,
    },
  });

  const buffaloWings = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Buffalo Wings',
      description: 'Spicy chicken wings with blue cheese dip',
      imageUrl: 'https://example.com/images/buffalo-wings.jpg',
      priceMinor: 1295,
      isAvailable: true,
    },
  });

  const grilledSalmon = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with lemon butter sauce',
      imageUrl: 'https://example.com/images/grilled-salmon.jpg',
      priceMinor: 2495,
      isAvailable: true,
    },
  });

  const ribeyeSteak = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Ribeye Steak',
      description: '12oz premium ribeye steak cooked to perfection',
      imageUrl: 'https://example.com/images/ribeye-steak.jpg',
      priceMinor: 3495,
      isAvailable: true,
    },
  });

  const margheritaPizza = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Margherita Pizza',
      description: 'Classic pizza with mozzarella, tomatoes, and basil',
      imageUrl: 'https://example.com/images/margherita-pizza.jpg',
      priceMinor: 1695,
      isAvailable: true,
    },
  });

  const chickenAlfredo = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Chicken Alfredo',
      description: 'Fettuccine pasta with creamy alfredo sauce and grilled chicken',
      imageUrl: 'https://example.com/images/chicken-alfredo.jpg',
      priceMinor: 1895,
      isAvailable: true,
    },
  });

  const chocolateLavaCake = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with a gooey center',
      imageUrl: 'https://example.com/images/chocolate-lava-cake.jpg',
      priceMinor: 795,
      isAvailable: true,
    },
  });

  const tiramisu = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Tiramisu',
      description: 'Classic Italian coffee-flavored dessert',
      imageUrl: 'https://example.com/images/tiramisu.jpg',
      priceMinor: 895,
      isAvailable: true,
    },
  });

  const softDrink = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Soft Drink',
      description: 'Assorted sodas',
      imageUrl: 'https://example.com/images/soft-drink.jpg',
      priceMinor: 295,
      isAvailable: true,
    },
  });

  const lemonade = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Fresh Lemonade',
      description: 'Freshly squeezed lemonade',
      imageUrl: 'https://example.com/images/lemonade.jpg',
      priceMinor: 395,
      isAvailable: true,
    },
  });

  const coffee = await prisma.items.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Coffee',
      description: 'Freshly brewed coffee',
      imageUrl: 'https://example.com/images/coffee.jpg',
      priceMinor: 350,
      isAvailable: true,
    },
  });

  // Create Items for Restaurant 2
  await prisma.items.createMany({
    data: [
      {
        restaurantId: restaurant2.id,
        name: 'Spring Rolls',
        description: 'Crispy vegetable spring rolls',
        imageUrl: 'https://example.com/images/spring-rolls.jpg',
        priceMinor: 695,
        isAvailable: true,
      },
      {
        restaurantId: restaurant2.id,
        name: 'Tom Yum Soup',
        description: 'Spicy and sour Thai soup with shrimp',
        imageUrl: 'https://example.com/images/tom-yum.jpg',
        priceMinor: 895,
        isAvailable: true,
      },
      {
        restaurantId: restaurant2.id,
        name: 'Pad Thai',
        description: 'Stir-fried rice noodles with peanuts',
        imageUrl: 'https://example.com/images/pad-thai.jpg',
        priceMinor: 1495,
        isAvailable: true,
      },
      {
        restaurantId: restaurant2.id,
        name: 'Green Curry',
        description: 'Thai green curry with coconut milk',
        imageUrl: 'https://example.com/images/green-curry.jpg',
        priceMinor: 1595,
        isAvailable: true,
      },
      {
        restaurantId: restaurant2.id,
        name: 'Mango Sticky Rice',
        description: 'Sweet sticky rice with fresh mango',
        imageUrl: 'https://example.com/images/mango-sticky-rice.jpg',
        priceMinor: 695,
        isAvailable: true,
      },
      {
        restaurantId: restaurant2.id,
        name: 'Thai Iced Tea',
        description: 'Sweet Thai tea with condensed milk',
        imageUrl: 'https://example.com/images/thai-tea.jpg',
        priceMinor: 450,
        isAvailable: true,
      },
    ],
  });

  console.log('✅ Created items');

  // Create Tables
  const table1 = await prisma.tables.create({
    data: {
      restaurantId: restaurant1.id,
      tableName: 'Table 1',
      isActive: true,
    },
  });

  await prisma.tables.createMany({
    data: [
      {
        restaurantId: restaurant1.id,
        tableName: 'Table 2',
        isActive: true,
      },
      {
        restaurantId: restaurant1.id,
        tableName: 'Table 3',
        isActive: true,
      },
      {
        restaurantId: restaurant1.id,
        tableName: 'Table 4',
        isActive: true,
      },
      {
        restaurantId: restaurant1.id,
        tableName: 'Table 5',
        isActive: true,
      },
      {
        restaurantId: restaurant1.id,
        tableName: 'Patio A',
        isActive: true,
      },
      {
        restaurantId: restaurant1.id,
        tableName: 'Patio B',
        isActive: true,
      },
    ],
  });

  const vipRoom = await prisma.tables.create({
    data: {
      restaurantId: restaurant1.id,
      tableName: 'VIP Room',
      isActive: true,
    },
  });

  await prisma.tables.createMany({
    data: [
      {
        restaurantId: restaurant2.id,
        tableName: 'Table 1',
        isActive: true,
      },
      {
        restaurantId: restaurant2.id,
        tableName: 'Table 2',
        isActive: true,
      },
      {
        restaurantId: restaurant2.id,
        tableName: 'Table 3',
        isActive: true,
      },
      {
        restaurantId: restaurant2.id,
        tableName: 'Bar Seat 1',
        isActive: true,
      },
      {
        restaurantId: restaurant2.id,
        tableName: 'Bar Seat 2',
        isActive: true,
      },
    ],
  });

  console.log('✅ Created tables');

  // Create Discounts (FIXED: using percentageValue and fixedAmountMinor)
  const happyHourDiscount = await prisma.discounts.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Happy Hour 20%',
      type: 'PERCENTAGE',
      percentageValue: 20,
      fixedAmountMinor: null,
      expiredAt: new Date('2026-12-31'),
      isActive: true,
    },
  });

  const seniorDiscount = await prisma.discounts.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'Senior Discount',
      type: 'PERCENTAGE',
      percentageValue: 15,
      fixedAmountMinor: null,
      expiredAt: null,
      isActive: true,
    },
  });

  const fiveDollarsOff = await prisma.discounts.create({
    data: {
      restaurantId: restaurant1.id,
      name: '$5 Off',
      type: 'FIXED_AMOUNT',
      percentageValue: null,
      fixedAmountMinor: 500, // $5.00
      expiredAt: new Date('2026-03-31'),
      isActive: true,
    },
  });

  const vipDiscount = await prisma.discounts.create({
    data: {
      restaurantId: restaurant1.id,
      name: 'VIP Member 25%',
      type: 'PERCENTAGE',
      percentageValue: 25,
      fixedAmountMinor: null,
      expiredAt: null,
      isActive: true,
    },
  });

  const lunchSpecial = await prisma.discounts.create({
    data: {
      restaurantId: restaurant2.id,
      name: 'Lunch Special 10%',
      type: 'PERCENTAGE',
      percentageValue: 10,
      fixedAmountMinor: null,
      expiredAt: new Date('2026-06-30'),
      isActive: true,
    },
  });

  const tenDollarsOff = await prisma.discounts.create({
    data: {
      restaurantId: restaurant2.id,
      name: '$10 Off Orders Above $50',
      type: 'FIXED_AMOUNT',
      percentageValue: null,
      fixedAmountMinor: 1000,
      expiredAt: null,
      isActive: true,
    },
  });

  console.log('✅ Created discounts');

  // Create Daily Order Counter for today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.dailyOrderCounters.create({
    data: {
      restaurantId: restaurant1.id,
      dateKey: today,
      lastVal: 3, // We'll create 3 orders
    },
  });

  // ORDER 1: Caesar Salad, Grilled Salmon, Chocolate Lava Cake
  const order1Subtotal = caesarSalad.priceMinor + grilledSalmon.priceMinor + chocolateLavaCake.priceMinor;
  const order1HappyHourDiscount = Math.floor(order1Subtotal * 0.20);
  const order1FixedDiscount = 500;
  const order1DiscountTotal = order1HappyHourDiscount + order1FixedDiscount;
  const order1Total = order1Subtotal - order1DiscountTotal;

  const order1 = await prisma.orders.create({
    data: {
      restaurantId: restaurant1.id,
      displayId: 1,
      orderNumber: `ORD-${today.toISOString().split('T')[0].replace(/-/g, '')}-0001`,
      createdByUserId: cashier1.id,
      tableId: table1.id,
      orderType: 'DINE_IN',
      status: 'CONFIRMED',
      subtotalMinor: order1Subtotal,
      discountTotalMinor: order1DiscountTotal,
      totalMinor: order1Total,
    },
  });

  // Order 1 Items (with snapshots)
  await prisma.orderItems.createMany({
    data: [
      {
        orderId: order1.id,
        itemId: caesarSalad.id,
        itemNameSnapshot: caesarSalad.name,
        itemDescriptionSnapshot: caesarSalad.description,
        itemImageUrlSnapshot: caesarSalad.imageUrl,
        quantity: 1,
        unitPriceMinorSnapshot: caesarSalad.priceMinor,
        lineSubtotalMinor: caesarSalad.priceMinor,
        lineDiscountMinor: 0,
        lineTotalMinor: caesarSalad.priceMinor,
      },
      {
        orderId: order1.id,
        itemId: grilledSalmon.id,
        itemNameSnapshot: grilledSalmon.name,
        itemDescriptionSnapshot: grilledSalmon.description,
        itemImageUrlSnapshot: grilledSalmon.imageUrl,
        quantity: 1,
        unitPriceMinorSnapshot: grilledSalmon.priceMinor,
        lineSubtotalMinor: grilledSalmon.priceMinor,
        lineDiscountMinor: 0,
        lineTotalMinor: grilledSalmon.priceMinor,
      },
      {
        orderId: order1.id,
        itemId: chocolateLavaCake.id,
        itemNameSnapshot: chocolateLavaCake.name,
        itemDescriptionSnapshot: chocolateLavaCake.description,
        itemImageUrlSnapshot: chocolateLavaCake.imageUrl,
        quantity: 1,
        unitPriceMinorSnapshot: chocolateLavaCake.priceMinor,
        lineSubtotalMinor: chocolateLavaCake.priceMinor,
        lineDiscountMinor: 0,
        lineTotalMinor: chocolateLavaCake.priceMinor,
      },
    ],
  });

  // Order 1 Discounts (with snapshots)
  await prisma.orderDiscounts.createMany({
    data: [
      {
        orderId: order1.id,
        discountId: happyHourDiscount.id,
        discountNameSnapshot: happyHourDiscount.name,
        typeSnapshot: 'PERCENTAGE',
        percentageValueSnapshot: 20,
        fixedAmountMinorSnapshot: null,
        appliedAmountMinor: order1HappyHourDiscount,
      },
      {
        orderId: order1.id,
        discountId: fiveDollarsOff.id,
        discountNameSnapshot: fiveDollarsOff.name,
        typeSnapshot: 'FIXED_AMOUNT',
        percentageValueSnapshot: null,
        fixedAmountMinorSnapshot: 500,
        appliedAmountMinor: order1FixedDiscount,
      },
    ],
  });

  // ORDER 2: Ribeye Steak (x2), Garlic Bread, Coffee
  const order2Subtotal = (ribeyeSteak.priceMinor * 2) + garlicBread.priceMinor + coffee.priceMinor;
  const order2SeniorDiscount = Math.floor(order2Subtotal * 0.15);
  const order2VipDiscount = Math.floor(order2Subtotal * 0.25);
  const order2DiscountTotal = order2SeniorDiscount + order2VipDiscount;
  const order2Total = order2Subtotal - order2DiscountTotal;

  const order2 = await prisma.orders.create({
    data: {
      restaurantId: restaurant1.id,
      displayId: 2,
      orderNumber: `ORD-${today.toISOString().split('T')[0].replace(/-/g, '')}-0002`,
      createdByUserId: manager1.id,
      tableId: vipRoom.id,
      orderType: 'DINE_IN',
      status: 'PAID',
      subtotalMinor: order2Subtotal,
      discountTotalMinor: order2DiscountTotal,
      totalMinor: order2Total,
    },
  });

  await prisma.orderItems.createMany({
    data: [
      {
        orderId: order2.id,
        itemId: ribeyeSteak.id,
        itemNameSnapshot: ribeyeSteak.name,
        itemDescriptionSnapshot: ribeyeSteak.description,
        itemImageUrlSnapshot: ribeyeSteak.imageUrl,
        quantity: 2,
        unitPriceMinorSnapshot: ribeyeSteak.priceMinor,
        lineSubtotalMinor: ribeyeSteak.priceMinor * 2,
        lineDiscountMinor: 0,
        lineTotalMinor: ribeyeSteak.priceMinor * 2,
      },
      {
        orderId: order2.id,
        itemId: garlicBread.id,
        itemNameSnapshot: garlicBread.name,
        itemDescriptionSnapshot: garlicBread.description,
        itemImageUrlSnapshot: garlicBread.imageUrl,
        quantity: 1,
        unitPriceMinorSnapshot: garlicBread.priceMinor,
        lineSubtotalMinor: garlicBread.priceMinor,
        lineDiscountMinor: 0,
        lineTotalMinor: garlicBread.priceMinor,
      },
      {
        orderId: order2.id,
        itemId: coffee.id,
        itemNameSnapshot: coffee.name,
        itemDescriptionSnapshot: coffee.description,
        itemImageUrlSnapshot: coffee.imageUrl,
        quantity: 1,
        unitPriceMinorSnapshot: coffee.priceMinor,
        lineSubtotalMinor: coffee.priceMinor,
        lineDiscountMinor: 0,
        lineTotalMinor: coffee.priceMinor,
      },
    ],
  });

  await prisma.orderDiscounts.createMany({
    data: [
      {
        orderId: order2.id,
        discountId: seniorDiscount.id,
        discountNameSnapshot: seniorDiscount.name,
        typeSnapshot: 'PERCENTAGE',
        percentageValueSnapshot: 15,
        fixedAmountMinorSnapshot: null,
        appliedAmountMinor: order2SeniorDiscount,
      },
      {
        orderId: order2.id,
        discountId: vipDiscount.id,
        discountNameSnapshot: vipDiscount.name,
        typeSnapshot: 'PERCENTAGE',
        percentageValueSnapshot: 25,
        fixedAmountMinorSnapshot: null,
        appliedAmountMinor: order2VipDiscount,
      },
    ],
  });

  // ORDER 3: Buffalo Wings, Margherita Pizza, Tiramisu
  const order3Subtotal = buffaloWings.priceMinor + margheritaPizza.priceMinor + tiramisu.priceMinor;
  const order3FixedDiscount = 500;
  const order3HappyHourDiscount = Math.floor(order3Subtotal * 0.20);
  const order3DiscountTotal = order3FixedDiscount + order3HappyHourDiscount;
  const order3Total = order3Subtotal - order3DiscountTotal;

  const order3 = await prisma.orders.create({
    data: {
      restaurantId: restaurant1.id,
      displayId: 3,
      orderNumber: `ORD-${today.toISOString().split('T')[0].replace(/-/g, '')}-0003`,
      createdByUserId: cashier1.id,
      tableId: null, // TAKE_AWAY order
      orderType: 'TAKE_AWAY',
      status: 'COOKING',
      subtotalMinor: order3Subtotal,
      discountTotalMinor: order3DiscountTotal,
      totalMinor: order3Total,
    },
  });

  await prisma.orderItems.createMany({
    data: [
      {
        orderId: order3.id,
        itemId: buffaloWings.id,
        itemNameSnapshot: buffaloWings.name,
        itemDescriptionSnapshot: buffaloWings.description,
        itemImageUrlSnapshot: buffaloWings.imageUrl,
        quantity: 1,
        unitPriceMinorSnapshot: buffaloWings.priceMinor,
        lineSubtotalMinor: buffaloWings.priceMinor,
        lineDiscountMinor: 0,
        lineTotalMinor: buffaloWings.priceMinor,
      },
      {
        orderId: order3.id,
        itemId: margheritaPizza.id,
        itemNameSnapshot: margheritaPizza.name,
        itemDescriptionSnapshot: margheritaPizza.description,
        itemImageUrlSnapshot: margheritaPizza.imageUrl,
        quantity: 1,
        unitPriceMinorSnapshot: margheritaPizza.priceMinor,
        lineSubtotalMinor: margheritaPizza.priceMinor,
        lineDiscountMinor: 0,
        lineTotalMinor: margheritaPizza.priceMinor,
      },
      {
        orderId: order3.id,
        itemId: tiramisu.id,
        itemNameSnapshot: tiramisu.name,
        itemDescriptionSnapshot: tiramisu.description,
        itemImageUrlSnapshot: tiramisu.imageUrl,
        quantity: 1,
        unitPriceMinorSnapshot: tiramisu.priceMinor,
        lineSubtotalMinor: tiramisu.priceMinor,
        lineDiscountMinor: 0,
        lineTotalMinor: tiramisu.priceMinor,
      },
    ],
  });

  await prisma.orderDiscounts.createMany({
    data: [
      {
        orderId: order3.id,
        discountId: fiveDollarsOff.id,
        discountNameSnapshot: fiveDollarsOff.name,
        typeSnapshot: 'FIXED_AMOUNT',
        percentageValueSnapshot: null,
        fixedAmountMinorSnapshot: 500,
        appliedAmountMinor: order3FixedDiscount,
      },
      {
        orderId: order3.id,
        discountId: happyHourDiscount.id,
        discountNameSnapshot: happyHourDiscount.name,
        typeSnapshot: 'PERCENTAGE',
        percentageValueSnapshot: 20,
        fixedAmountMinorSnapshot: null,
        appliedAmountMinor: order3HappyHourDiscount,
      },
    ],
  });

  console.log('✅ Created orders with items and discounts');

  // Order Status History
  await prisma.orderStatusHistory.createMany({
    data: [
      {
        orderId: order2.id,
        fromStatus: 'CREATED',
        toStatus: 'CONFIRMED',
        changedByUserId: manager1.id,
        changedAt: new Date(Date.now() - 60 * 60 * 1000),
        notes: 'Order confirmed by manager',
      },
      {
        orderId: order2.id,
        fromStatus: 'CONFIRMED',
        toStatus: 'COOKING',
        changedByUserId: manager1.id,
        changedAt: new Date(Date.now() - 45 * 60 * 1000),
        notes: 'Sent to kitchen',
      },
      {
        orderId: order2.id,
        fromStatus: 'COOKING',
        toStatus: 'SERVED',
        changedByUserId: cashier1.id,
        changedAt: new Date(Date.now() - 30 * 60 * 1000),
        notes: 'Food delivered to table',
      },
      {
        orderId: order2.id,
        fromStatus: 'SERVED',
        toStatus: 'PAID',
        changedByUserId: cashier1.id,
        changedAt: new Date(Date.now() - 15 * 60 * 1000),
        notes: 'Payment received - Cash',
      },
    ],
  });

  console.log('✅ Created order status history');

  console.log('🎉 Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });