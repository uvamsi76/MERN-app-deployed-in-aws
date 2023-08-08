"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const SECRET = 'SECr3t'; // This should be in an environment variable in a real application
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, SECRET, (err, payload) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!payload) {
                return res.sendStatus(403);
            }
            if (typeof payload === "string") {
                return res.sendStatus(403);
            }
            req.headers["user"] = payload.username;
            req.headers["userid"] = payload.id;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose_1.default.connect('mongodb+srv://uvamsi76:ybjSWKpCunZoIvwY@cluster0.vtksuht.mongodb.net/nothing', { dbName: "nothing" });
app.get("/me", authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield db_1.Admin.findOne({ username: req.headers["username"] });
    if (!admin) {
        res.status(403).json({ msg: "Admin doesnt exist" });
        return;
    }
    res.json({
        username: admin.username
    });
}));
app.post('/admin/signup', (req, res) => {
    const { username, password } = req.body;
    // function callback(admin) {
    //   if (admin) {
    //     res.status(403).json({ message: 'Admin already exists' });
    //   } else {
    //     const obj = { username: username, password: password };
    //     const newAdmin = new Admin(obj);
    //     newAdmin.save();
    //     const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    //     res.json({ message: 'Admin created successfully', token });
    //   }
    // }
    db_1.Admin.findOne({ username }).then((admin) => {
        if (admin) {
            res.status(403).json({ message: 'Admin already exists' });
        }
        else {
            const obj = { username: username, password: password };
            const newAdmin = new db_1.Admin(obj);
            newAdmin.save();
            const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
            res.json({ message: 'Admin created successfully', token, username });
        }
    });
});
app.post('/admin/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const admin = yield db_1.Admin.findOne({ username, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token, username });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
app.post('/admin/courses', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, imageLink, published } = req.body;
    const admin = yield db_1.Admin.findOne({ username: req.headers["user"] });
    const Author = admin === null || admin === void 0 ? void 0 : admin._id;
    if (admin) {
        const course = new db_1.Course({ title, description, price, imageLink, published, Author });
        yield course.save();
        if (course) {
            admin.publishedCourses.push(course.id);
            yield admin.save();
            res.status(200).json({ message: 'Course created successfully', courseId: course.id, admin: admin.username });
        }
        else {
            res.status(500).json({ message: 'Course not found Internal error' });
        }
    }
    else {
        res.status(404).json({ message: 'admin not found retry after some time' });
    }
}));
app.get('/admin/courses/:courseId', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.findById(req.params.courseId);
    res.json({ course });
}));
app.put('/admin/courses/:courseId', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (course) {
        res.json({ message: 'Course updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
app.get('/admin/courses', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Course.find({});
    res.json({ courses });
}));
// User routes
app.post('/users/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username });
    if (user) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const newUser = new db_1.User({ username, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
    }
}));
app.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
}));
app.get('/courses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Course.find({ published: true });
    res.json({ courses });
}));
app.post('/users/courses/:courseId', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Course.findById(req.params.courseId);
    console.log(course);
    if (course) {
        const user = yield db_1.User.findOne({ username: req.headers["user"] });
        if (user) {
            user.purchasedCourses.push(course.id);
            yield user.save();
            res.json({ message: 'Course purchased successfully' });
        }
        else {
            res.status(403).json({ message: 'User not found' });
        }
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
app.get('/users/purchasedCourses', authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.User.findOne({ username: req.headers["user"] }).populate('purchasedCourses');
    if (user) {
        res.json({ purchasedCourses: user.purchasedCourses || [] });
    }
    else {
        res.status(403).json({ message: 'User not found' });
    }
}));
app.listen(3000, () => console.log('Server running on port 3000'));
