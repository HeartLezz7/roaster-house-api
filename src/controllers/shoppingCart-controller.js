const { cloudinary_js_config } = require("../configs/cloudinary");
const prisma = require("../models/prisma");

exports.modifyShoppingCart = async (req, res, next) => {
  try {
    const { id, amount } = req.body;
    console.log(id, amount);
    const findProduct = await prisma.shoppingCarts.findFirst({
      where: { productId: id },
    });
    if (!findProduct) {
      const productCart = {
        userId: req.user.id,
        productId: id,
        amount,
      };
      const createShoppingCart = await prisma.shoppingCarts.create({
        data: productCart,
      });
      console.log(createShoppingCart, "create");
      res.status(201).json({ message: "CREATED", createShoppingCart });
    } else {
      const UpdateShoppingCart = await prisma.shoppingCart.update({
        where: { productId: id, userId: req.user.id },
        data: { amount: amount },
      });
      console.log(UpdateShoppingCart, "update");
      res.status(200).json({ message: "UPDATED", UpdateShoppingCart });
    }
  } catch (err) {
    next(err);
  }
};
