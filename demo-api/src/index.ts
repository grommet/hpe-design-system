import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import { logger } from './utils/logger';

const app = express();
const port = process.env.PORT || 8000;

// Log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(logger(req, res, {}));
  next();
});

app.use(cors())

// Routes
app.use('/', routes);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something\'s not quite right! Error: ' + err.message);
});

// Start app server
app.listen(port, () => {
  console.log(`Express app server listening at http://localhost:${port}`);
});
