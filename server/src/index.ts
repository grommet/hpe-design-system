import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';

const app = express();
const port = process.env.PORT || 8000;

// Log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Method: ', req.method);
  console.log('URL: ', req.url);
  // console.log('Headers: ', req.headers);
  console.log('BaseUrl: ', req.baseUrl);
  console.log('OriginalUrl: ', req.originalUrl);
  console.log('Path: ', req.path);
  console.log('Query: ', req.query);
  console.log('Params: ', req.params);
  console.log('Referrer: ', req.headers.referer);
  next();
});

// Routes
app.use('/', routes);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something\'s not quite right! Error: ' + err.message);
});

// Start app server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
