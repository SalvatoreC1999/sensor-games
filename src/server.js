const express = require('express');
const cors = require('cors'); // Importa il pacchetto cors
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const app = express();
const port = 3000; // Porta su cui il server sarà in ascolto

// Configura CORS
app.use(cors()); // Usa il middleware cors
app.use(express.json());

// Configura la porta seriale
const serialPort = new SerialPort({
  path: 'COM3', // Modifica con la porta seriale corretta
  baudRate: 9600
});

// Usa ReadlineParser per parsare i dati della porta seriale
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// Variabile per memorizzare i dati ricevuti
let sensorData = {
  status: '',
  distance: 0,
  timestamp: new Date()
};

// Leggi i dati dalla porta seriale
parser.on('data', (data) => {
  try {
    const parsedData = JSON.parse(data);
    sensorData = {
      ...parsedData,
      timestamp: new Date()
    };
    console.log('Received data:', sensorData);
  } catch (e) {
    console.error('Errore nel parsing dei dati:', e);
  }
});

// Endpoint per ottenere i dati del sensore
app.get('/sensor-data', (req, res) => {
  res.json(sensorData);
});

app.post('/start-measurement', (req, res) => {
  console.log('qui')
  serialPort.write('START\n', (err) => {
    if (err) {
      console.error('Errore nell\'invio del comando START:', err);
      res.status(500).json({ error: 'Errore nell\'invio del comando START' });
    } else {
      console.log('Comando START inviato');
      res.json({ message: 'Comando START inviato con successo' });
    }
  });
});

app.post('/stop-measurement', (req, res) => {
  serialPort.write('STOP\n', (err) => {
    if (err) {
      console.error('Errore nell\'invio del comando STOP:', err);
      res.status(500).json({ error: 'Errore nell\'invio del comando STOP' });
    } else {
      console.log('Comando STOP inviato');
      res.json({ message: 'Comando STOP inviato con successo' });
    }
  });
});

app.post('/start-again', (req, res) => {
  serialPort.write('RESTART\n', (err) => {
    if (err) {
      console.error('Errore nell\'invio del comando START AGAIN:', err);
      res.status(500).json({ error: 'Errore nell\'invio del comando START AGAIN' });
    } else {
      console.log('Comando START AGAIN inviato');
      res.json({ message: 'Comando START AGAIN inviato con successo' });
    }
  });
});


// Avvia il server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Gestione degli errori della porta seriale
serialPort.on('error', (err) => {
  console.error('Errore della porta seriale:', err.message);
});
