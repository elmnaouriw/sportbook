require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5501',
  credentials: true
}));
app.use(express.json());

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/bookings', require('./routes/bookings'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 SportBook API lancée sur http://localhost:${PORT}`);
});