import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import UserRoutes from './routes/user.routes.js'
import AdminRoutes from './routes/admin.routes.js'
import { ApiError } from './utils/ApiError.js'; 
import abhangaRoutes from './routes/abhanga.routes.js' 
import blacklistRoutes from './routes/blacklist.routes.js'
import audioRoutes from './routes/audio.routes.js'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

app.use(cookieParser());

app.use(cors({
    origin: 'https://sant-tukaram-maharaj-literature-frontend.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/users', UserRoutes);
app.use('/api/admins', AdminRoutes);
app.use('/api/abhangas', abhangaRoutes);
app.use('/api/blacklist', blacklistRoutes );
app.use('/api/audios', audioRoutes);

app.use((err, req, res, next) => {
   
    
    if (err instanceof ApiError) {
        console.log("Original Error:", err); 
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors || []
        });
    }
    if (err.errors && Array.isArray(err.errors)) {
        const apiError = new ApiError(400, err.message || "Validation failed", err.errors);
        return res.status(apiError.statusCode).json({
            success: apiError.success,
            message: apiError.message,
            errors: apiError.errors
        });
    }

    const apiError = new ApiError(
        err.statusCode || 500,
        err.message || "Internal Server Error",
        err.errors || []
    );

    return res.status(apiError.statusCode).json({
        success: apiError.success,
        message: apiError.message,
        errors: apiError.errors
    });
});

export { app }