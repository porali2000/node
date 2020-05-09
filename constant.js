const { transports, createLogger, format } = require('winston');

var logger = createLogger({
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
districtMap.set("Villupuram", "விழுப்புரம்");
districtMap.set("Thoothukkudi", "தூத்துக்குடி");
districtMap.set("Thoothukudi", "தூத்துக்குடி");
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
districtMap.set("Trichy", "திருச்சிராப்பள்ளி");
districtMap.set("The Nilgiris", "நீலகிரி");
districtMap.set("Nilgiris", "நீலகிரி");
districtMap.set("Ariyalur", "அரியலூர்");
districtMap.set("Tenkasi", "தென்காசி");
districtMap.set("Pudukkottai", "புதுக்கோட்டை");
districtMap.set("Pudukottai", "புதுக்கோட்டை");
districtMap.set("Krishnagiri", "கிருஷ்ணகிரி");
districtMap.set("Dharmapuri", "தர்மபுரி");
districtMap.set("Kanyakumari", "கன்யகுமாரி");
districtMap.set("Sivagangai", "சிவகங்கை");
districtMap.set("Thirupathur", "திருப்பதூர்");
districtMap.set("Thiruvallur", "திருவள்ளூர்");
districtMap.set("Thiruvannamalai", "திருவண்ணாமலை");

var districts = [
  "Nilgiris",
  "Trichy",
  "Villupuram",
  "Thoothukudi",
  "Thiruvannamalai",
  "Thiruvallur",
  "Thirupathur",
  "Sivagangai",
  "Pudukottai",
  "Kanyakumari",
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

var pdf_URL = "https://stopcorona.tn.gov.in/wp-content/uploads/2020/03/Media-Bulletin-09.05.2020.pdf";

module.exports = {
  districtMap: districtMap,
  districts: districts,
  logger: logger,
  pdf_URL: pdf_URL
} 