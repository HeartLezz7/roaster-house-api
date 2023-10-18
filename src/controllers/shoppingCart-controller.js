const { cloudinary_js_config } = require("../configs/cloudinary");
const prisma = require("../models/prisma");

exports.modifyShoppingCart = async (req, res, next) => {
  try {
    const { id, productId, amount } = req.body;
    const findProduct = await prisma.shoppingCarts.findFirst({
      where: { productId },
    });
    if (!findProduct) {
      const productCart = {
        userId: req.user.id,
        productId,
        amount,
      };
      const createShoppingCart = await prisma.shoppingCarts.create({
        data: productCart,
      });
      res.status(201).json({ message: "CREATED", createShoppingCart });
    } else {
      const updateShoppingCart = await prisma.shoppingCarts.update({
        where: { id },
        data: { amount: +amount },
      });
      res.status(200).json({ message: "UPDATED", updateShoppingCart });
    }
  } catch (err) {
    next(err);
  }
};

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
      return res
        .status(400)
        .json({ messaage: "No item in cart", foundShoppingCart });
    }
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
