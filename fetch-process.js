
const https = require('https');
const {transports, createLogger, format} = require('winston');

const logger = createLogger({
    format: format.json(),
    defaultMeta: { hierachy: 'district' },
    transports: [
      new transports.File({ filename: '/var/log/debug.log', level: 'debug'}),
      new transports.File({ filename: '/var/log/data.log', level: 'info'})
    ]
  });

var districts  = [
    "Kancheepuram",
    "Chennai",
    "Erode",
    "Coimbatore",
    "Tirunelveli",
    "Tiruppur",
    "Madurai",
    "Chengalpattu",
    "Ranipet",
    "Thanjavur",
    "Salem",
    "Vellore",
    "Virudhunagar:",
    "Karur",
    "Tiruvannamalai",
    "Viluppuram",
    "Namakkal",
    "Viluppuram",
    "Kanniyakumari",
    "Thoothukkudi",
    "Theni",
    "Dindigul",
    "Sivaganga",
    "Tirupathur",
    "Thiruvarur",
    "Ramanathapuram",
    "Nagapattinam",
    "Cuddalore",
    "Kallakurichi",
    "Perambalur",
    "Tiruchirappalli",
    "The Nilgiris",
    "Ariyalur",
    "Tenkasi",
    "Pudukkottai"
]

https.get('https://api.com/data.json', (res) => {
    logger.debug('statusCode: ' + res.statusCode);
    var dateTime = new Date().toUTCString();

  res.setEncoding('utf8');
  let rawData = '';

  res.on('data', (d) => {
    rawData += d;
  });

  res.on('end', () => {
    try {
        const responseData = JSON.parse(rawData);
        const stateData = responseData['Tamil Nadu'];
        const districtDatas = stateData['districtData'];
        for (let district of districts) { 
            try {
            var districtData = districtDatas[district];
            districtData.lastupdatedtime = dateTime;
            logger.info(district, districtData);
            }catch (e) {
                
                 logger.info(district, districtData);
            }
          }
      } catch (e) {
        console.error(e);
      }
  });

}).on('error', (e) => {
    console.error(e);
});