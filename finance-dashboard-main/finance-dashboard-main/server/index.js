import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import { kpis, products, transactions } from "./data/data.js";
import productRoutes from "./routes/product.js";
import Product from "./models/Product.js";
import transactionRoutes from "./routes/transaction.js";
import Transaction from "./models/Transaction.js";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/api/kpi", kpiRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transaction", transactionRoutes);


const uri = process.env.MONGO_URL;
console.log("MongoDB URI:", uri); // Log MongoDB URI

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        // ADD DATA ONE TIME ONLY IN DEV SERVER OR AS NEEDED
        await mongoose.connection.db.dropDatabase();
        KPI.insertMany(kpis);
        Product.insertMany(products);
        Transaction.insertMany(transactions);
    })
    .catch((error) => console.log(`${error} did not connect`));
