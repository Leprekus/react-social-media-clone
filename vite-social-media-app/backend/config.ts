import dotenv from 'dotenv';

dotenv.config();

const config = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  //port: process.env.PORT
};

export default config