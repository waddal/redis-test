const express = require("express");
const cors = require("cors");
const axios = require("axios");
const redis = require("redis");

const EXPIRATION_TIME = 3600;
const client = redis.createClient();

const connectClient = async () => {
  await client.connect("error", (err) => {
    console.log("Error " + err);
  });
  await client.ping();
};
connectClient();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      { params: { albumId } }
    );
    return data;
  });
  res.status(200).json(photos);
});

server.get("/photos/:id", async (req, res) => {
  const photo = await getOrSetCache(`photos:${req.params.id}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${req.params.id}`
    );
    return data;
  });

  res.status(200).json(photo);
});

async function getOrSetCache(key, cb) {
  try {
    const data = await client.get(key);
    if (data != null) return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
  const freshData = await cb();
  client.setEx(key, EXPIRATION_TIME, JSON.stringify(freshData));
  return freshData;
}

//catch all
server.get("*", (req, res) => {
  res.json("server is running.. reassess your request");
});

//error catcher
server.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
