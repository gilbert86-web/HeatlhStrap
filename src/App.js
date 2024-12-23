import './App.css';
import { useEffect, useState } from 'react';
import mqtt from "mqtt";
import { Buffer, isUtf8 } from "buffer";
import { Pie, Line } from "react-chartjs-2";
import { registerables, Chart, elements } from 'chart.js';
// import Map from './Components/Map/Map';
import Header from './Components/Header/Header'
import { alerteIcon } from './lib/media';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
// import { TextDecoder } from 'util';
// import { UserName,Password } from './lib/envContentExport';

// Enregistrement des composants de chart.js
Chart.register(...registerables);

// Configuration de la connexion MQTT
const mqttOptions = {
  host: "32a886debbcf47aeaf3c6a3930fd8df6.s1.eu.hivemq.cloud",
  port: 8884,
  protocol: "wss",
  username: "",
  password: "",
  path: "/mqtt"
};

// Initialisation du client MQTT
const client = mqtt.connect(mqttOptions);

function App() {
  const [dataSet, setDataSet] = useState([]);
  const [pulseLecture, setPulse] = useState("")
  const [Notification, setNotification] = useState([])
  const [loc, setLoc] = useState({})
  const [pressed, setpressed] = useState(false)
  const [config, setConfig] = useState({
    host: "32a886debbcf47aeaf3c6a3930fd8df6.s1.eu.hivemq.cloud",
    port: 8884,
    protocol: "wss",
    username: "Claude",
    password: "kDz48w5b4D_AU-5",
    path: "/mqtt"
  })

  // Configuration des données pour le graphique
  const chartData = {
    labels: dataSet.map((_, index) => `Data ${index + 1}`),
    datasets: [
      {
        label: "Température",
        data: dataSet,
        backgroundColor: ["red"],
        borderColor: "red",
        fill: false,
      },
    ],
  };

  // Options du graphique
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  // Fonction pour récupérer les données depuis MQTT
  const fetchMqttData = () => {
    try {
      client.on("connect", () => {
        client.subscribe("React_JS_Application_Emetteur", (err) => {
          if (!err) {
            client.publish("React_JS_Application_Emetteur", "Message depuis React");
            client.on("message", (topic, message) => {
              try {

                let resultMessage = Buffer.from(JSON.parse(message.toString())['uplink_message']['frm_payload'], 'base64')
                let buffer = (resultMessage[0] << 16) | (resultMessage[1] << 8) | resultMessage[2];
                if (buffer > 20000) {
                  setNotification((prevData) => [...prevData, `Chute detecté le ${JSON.parse(message.toString())['received_at']}`])
                } else {
                  setDataSet((prevData) => [...prevData, buffer]);
                  let Valuetext = new String(buffer.toString())
                  let Decimal = Valuetext.slice(-2, -1)
                  setPulse(Valuetext.replace(Decimal, `,${Decimal}`))
                }
                // console.log(buffer)
                // let textDecode = new TextDecoder().decode(resultMessage)

              } catch (parseError) {
                console.error("Erreur de parsing des données MQTT:", parseError);
              }
            });
          }
        });
      });
    } catch (connectionError) {
      console.error("Erreur de connexion MQTT:", connectionError);
    }
  };

  useEffect(() => {
    fetchMqttData();
    // Nettoyage à la déconnexion
    // return () => client.end();
  }, []);

  return (
    <div className='container'>
      <Header />
      <section className='sousContainer'>
        <div className='commandCenter'>
          <button className='button' onClick={() => setpressed(!pressed)}>{pressed ? "play" : "paused"}</button>
          {/* <section className='form'>
            <input name='host' type='text' />
            <input name='port' type='number' />
            <input name='protocole' type='text' />
            <input name='username' type='text' />
            <input name='password' type='password' />
            <input name='path' type='text' value={"/mqtt"} />
          </section> */}
        </div>
        <div className='dashboard'>
          <section className='one charts'>
            <Line data={chartData} options={chartOptions} />
          </section>
          <section className='two charts'>
            <header className='headerSection'>
              <img alt='icone' src={alerteIcon} className='sectionIcone' />
              <p className='sectionTitle'>BPM</p>
            </header>
            <main className='mainSection'>
              <section className='pulseContanier'>
                <section className='pulseValue'>
                  <p style={{ fontSize: 25, fontWeight: "bold" }}>{
                    pulseLecture
                  }</p>
                </section>
              </section>
            </main>
          </section>
          <section className='three charts'>
            <header className='headerSection'>
              <img alt='icone' src={alerteIcon} className='sectionIcone' />
              <p className='sectionTitle'>Localisation</p>
            </header>
            <main className='mainSection'>
              <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                </Marker>
              </MapContainer>
            </main>
          </section>
          <section className='four charts'>
            <header className='headerSection'>
              <img alt='icone' src={alerteIcon} className='sectionIcone' />
              <p className='sectionTitle'>Alertes</p>
            </header>
            <main className='mainSection'>
              {
                Notification.map((elements) => <p style={{ width: "90%", fontSize: 14, display: "block", color: "purple" }}>
                  {
                    new String(elements).split(".")[0]
                  }
                </p>)
              }

              {/* <AlertElement _message={"Chute detecté"} _dateEtheure={"01/12/2024 22h34"} />
              <AlertElement _message={"Chute detecté et augmentation du rythme cardiaque"} _dateEtheure={"01/12/2024 22h34"} />
              <AlertElement _message={"Chute detecté"} _dateEtheure={"01/12/2024 22h34"} />
              <AlertElement _message={"Chute detecté et augmentation du rythme cardiaque"} _dateEtheure={"01/12/2024 22h34"} />
              <AlertElement _message={"Chute detecté"} _dateEtheure={"01/12/2024 22h34"} />
              <AlertElement _message={"Chute detecté et augmentation du rythme cardiaque"} _dateEtheure={"01/12/2024 22h34"} />
              <AlertElement _message={"Chute detecté"} _dateEtheure={"01/12/2024 22h34"} />
              <AlertElement _message={"Chute detecté et augmentation du rythme cardiaque"} _dateEtheure={"01/12/2024 22h34"} /> */}
            </main>
          </section>
        </div>
      </section>
    </div>
  );
}


export default App;
