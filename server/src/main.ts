import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import { connectToDatabase, disconnectFromDatabase } from '../db/database';
import cors from 'cors';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(helmet()); // aplicacão mais segura configurando headers e escondendo-os.
app.use(
  cookieSession({
    name: 'session',
    secret: process.env.COOKIE_SECRET,
    httpOnly: true,
  })
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Algo de errado aconteceu';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  await connectToDatabase();
  console.info(`Server listening at https://localhost:${PORT}`);
  routes(app);
});

const signals = ['SIGTERM', 'SIGINT'];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    console.info('Adeus, sinal encontrado', signal);
    server.close();

    await disconnectFromDatabase();
    // Desconectando do banco de dados.
    console.info('Fim do programa');

    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
