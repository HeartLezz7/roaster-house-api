const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.createOrderItems = async (req, res, next) => {
  try {
    const getcart = await prisma.shoppingCarts.findMany({
      where: { userId: req.user.id },
    });
    const createOrderItems = await prisma.orderItem.createMany({
      data: [getcart],
    });
    await prisma.shoppingCarts.deleteMany({});
    res.status(201).json({ message: "Create order items", createOrderItems });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const getShoppingCart = await prisma.shoppingCarts.findMany({
      where: { userId: req.user.id },
      include: { product: { select: { price: true } } },
    });
    if (!getShoppingCart) {
      return createError("Not found user", 400);
    }
    const sumPrice = getShoppingCart.reduce(
      (acc, item) => (acc += item.product.price * item.amount),
      0
    );
    const orderData = { userId: req.user.id, sumPrice };
    // const order = await prisma.order.create({ data: orderData });
    res.json({ orderData });
  } catch (err) {
    next(err);
  }
};
