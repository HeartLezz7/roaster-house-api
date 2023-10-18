exports.createCart = async (req, res, next) => {
  try {
    res.json({ message: "created" });
  } catch (err) {
    next(err);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    res.json({ message: "update" });
  } catch (err) {
    next(err);
  }
};
