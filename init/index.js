if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


main().then(() =>{
    console.log("connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

async function updateCoordinates(){
  for (const obj of initData.data) {
    const response = await geocodingClient.forwardGeocode({
      query: obj.location + ", " + obj.country,
      limit: 1
    })
      .send()
    obj.geometry = (response.body.features[0].geometry);
    await Listing.insertMany(obj);
  }
}

const initDB = async () => {
    await Listing.deleteMany({});
    updateCoordinates();
    console.log("data initialized");
}

initDB();