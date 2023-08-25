"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const common_1 = __importDefault(require("./routes/common"));
const PORT = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(common_1.default);
app.use("/admin", admin_1.default);
app.use("/users", user_1.default);
// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose_1.default.connect('mongodb+srv://uvamsi76:ybjSWKpCunZoIvwY@cluster0.vtksuht.mongodb.net/nothing', { dbName: "nothing" });
app.get('/', (req, res) => {
    res.json("working fine mowa test");
});
app.listen(3000, () => console.log('Server running on port 3000 ok'));
