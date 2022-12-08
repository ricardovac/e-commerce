import mongoose from 'mongoose';

const DB_CONNECTION_STRING = process.env.MONGODB_URL || '';

export async function connectToDatabase() {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(DB_CONNECTION_STRING);
    // Mensagem de log
    console.info('Conectado ao banco de dados');
  } catch (e) {
    console.error(e, 'Falha ao se conectar com o banco de dados');
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();

  console.info('Desconectado do banco de dados');
  return;
}
