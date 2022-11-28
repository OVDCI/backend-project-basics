import jwt from "jsonwebtoken";

export default (req, res, next) => {
  //const token = req.header("token");
    const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(500).send({ msg: "Invalid token!" });
  }
};
