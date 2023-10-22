const prisma = require("../models/prisma");

exports.confirmOrder = async (req, res, next) => {
  try {
    console.log(req.body);
    const foundUser = await prisma.order.findMany({
      where: { userId: +req.user.id },
    });
    console.log(foundUser, "user");
    const foundOrder = foundUser.find((order) => order.id === +req.body.id);
    console.log(foundOrder, "order");
    if (foundOrder) {
      await prisma.order.update({
        where: { id: foundOrder.id },
        data: { status: "completed" },
      });
    }
    res.status(201).json({ message: "paid" });
  } catch (err) {
    next(err);
  }
};
