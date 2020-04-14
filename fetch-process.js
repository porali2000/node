
const https = require('https');
const { transports, createLogger, format } = require('winston');

const logger = createLogger({
  format: format.json(),
  defaultMeta: { hierachy: 'district' },
  transports: [
    new transports.File({ filename: '/var/log/debug.log', level: 'debug' }),
    new transports.File({ filename: '/var/log/data.log', level: 'info' })
  ]
});

var districtMap = new Map();
districtMap.set("Kancheepuram", "காஞ்சீபுரம்");
districtMap.set("Chennai", "சென்னை");
districtMap.set("Erode", "ஈரோடு");
districtMap.set("Coimbatore", "கோவை");
districtMap.set("Tirunelveli", "திருநெல்வேலி");
districtMap.set("Tiruppur", "திருப்பூர்");
districtMap.set("Madurai", "மதுரை");
districtMap.set("Chengalpattu", "செங்கல்பட்டு");
districtMap.set("Ranipet", "ராணிப்பேட்டை");
districtMap.set("Thanjavur", "தஞ்சாவூர்");
districtMap.set("Salem", "சேலம்");
districtMap.set("Vellore", "வேலூர்");
districtMap.set("Virudhunagar", "விருதுநகர்");
districtMap.set("Karur", "கரூர்");
districtMap.set("Tiruvannamalai", "திருவண்ணாமலை");
districtMap.set("Namakkal", "நாமக்கல்");
districtMap.set("Viluppuram", "விழுப்புரம்");
districtMap.set("Thoothukkudi", "தூத்துக்குடி");
districtMap.set("Theni", "தேனீ");
districtMap.set("Dindigul", "திண்டுக்கல்");
districtMap.set("Sivaganga", "சிவகங்கை");
districtMap.set("Tirupathur", "திருப்பத்தூர்");
districtMap.set("Thiruvarur", "திருவாரூர்");
districtMap.set("Ramanathapuram", "ராமநாதபுரம்");
districtMap.set("Nagapattinam", "நாகப்பட்டினம்");
districtMap.set("Cuddalore", "கடலூர்");
districtMap.set("Kallakurichi", "கல்லக்குரிச்சி");
districtMap.set("Perambalur", "பெரம்பலூர்");
districtMap.set("Kallakurichi", "கல்லக்குரிச்சி");
districtMap.set("Tiruchirappalli", "திருச்சிராப்பள்ளி");
districtMap.set("The Nilgiris", "நீலகிரி");
districtMap.set("Ariyalur", "அரியலூர்");
districtMap.set("Tenkasi", "தென்காசி");
districtMap.set("Pudukkottai", "புதுக்கோட்டை");
districtMap.set("Krishnagiri", "கிருஷ்ணகிரி");
districtMap.set("Dharmapuri", "தர்மபுரி");

var districts = [
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
  "Virudhunagar",
  "Karur",
  "Tiruvannamalai",
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
  "Pudukkottai",
  "Krishnagiri",
  "Dharmapuri"
]

https.get(URL_1, (res) => {
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
          if (undefined == districtData) {
            districtData = {};
            districtData['confirmed'] = 0;
          }
          districtData['lastupdatedtime'] = dateTime;
          districtData['district'] = district;
          districtData['district_ta'] = districtMap.get(district);
          logger.info(district, districtData);
        } catch (e) {
          console.error(district, e);
        }
      }
    } catch (e) {
      console.error(e);
    }
  });

}).on('error', (e) => {
  console.error(e);
});


https.get(URL_2, (res) => {
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
      const states = responseData['statewise'];
      for (let state of states) {
        try {
          if (undefined == state) {
            state = {};
            state['confirmed'] = 0;
          } else {
            state['confirmed'] = parseInt(state['confirmed']);
          }
          logger.info(state.state, state);
        } catch (e) {
          // console.error(district, e);
        }
      }
    } catch (e) {
      console.error(e);
    }
  });

}).on('error', (e) => {
  console.error(e);
});