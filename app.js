const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const errorHandler = require('./middlewares/errorMiddleware');
const componentRoutes = require("./routes/componentRoutes");
const fileRoutes = require("./routes/fileRoutes");
const blogRoutes = require("./routes/blogRoute");
const addToCardRouter = require("./routes/addtoRoute"); 
const productRouter = require("./routes/productRoute");
const authRouter = require("./routes/authRoute");



app.use("/api/components", componentRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/product", productRouter);
app.use("/api/addtocart", addToCardRouter);
app.use('/api/auth',authRouter)
app.use(errorHandler);


module.exports = app;