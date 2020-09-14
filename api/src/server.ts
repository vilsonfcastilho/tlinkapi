import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

const app = express();

mongoose.connect(
  'mongodb+srv://vilson:vilson@cluster0-ygggy.mongodb.net/linkApi?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 server started on port 3333!');
});
