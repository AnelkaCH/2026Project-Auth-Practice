import 'dotenv/config';
import next from 'next';
import http from 'http';
import './lib/supabase.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = Number(process.env.PORT) || 3000;

app
  .prepare()
  .then(() => {
    http.createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log('Server running and connected to Supabase');
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
