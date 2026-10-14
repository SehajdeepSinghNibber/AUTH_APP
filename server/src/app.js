import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import authRoutes from './routes/auth.route.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());

app.use("/api/auth",authRoutes);

export default app;