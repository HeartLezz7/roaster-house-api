const prisma = require("../models/prisma");

exports.getShoppingCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const foundShoppingCart = await prisma.shoppingCarts.findMany({
      where: { userId: userId },
      include: {
        product: {
          select: {
            productName: true,
            price: true,
            roastLevel: true,
          },
        },
      },
    });
    if (foundShoppingCart) {
      return res.status(200).json({ messaage: "get cart", foundShoppingCart });
    } else {
      return res.status(400).json({ messaage: "No item in cart" });
    }
  } catch (err) {
    next(err);
  }
};

exports.createShoppingCart = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id, amount } = req.body;
    const productCart = {
      userId: req.user.id,
      productId: +id,
      amount,
    };
    console.log(productCart);
    const createShoppingCart = await prisma.shoppingCarts.create({
      data: productCart,
    });
    res.status(201).json({ message: "CREATED", createShoppingCart });
  } catch (err) {
    next(err);
  }
};

exports.updateShoppingCart = async (req, res, next) => {
  try {
    const { productId, amount } = req.body;
    console.log(productId, "productId");
    const findProduct = await prisma.shoppingCarts.findFirst({
      where: { productId },
    });
    console.log(findProduct);
    const updateShoppingCart = await prisma.shoppingCarts.update({
      where: { id: findProduct.id },
      data: { amount: +amount },
    });
    res.status(200).json({ message: "UPDATED", updateShoppingCart });
  } catch (err) {
    next(err);
  }
};

exports.deleteShoppingCart = async (req, res, next) => {
  try {
    const { deleteId } = req.params;
    await prisma.shoppingCarts.delete({
      where: { id: +deleteId },
    });
    res.status(200).json({ message: "DELETED" });
  } catch (err) {
    next(err);
  }
};
