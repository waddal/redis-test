const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Redis = require("redis");

const redisClient = Redis.createClient();
const DEFAULT_EXPIRATION = 3600;

const server = express();

server.use(express.json());
server.use(cors());

server.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  redisClient.get("photos", async (errors, photos) => {
    if (errors) console.error(errors);
    if (photos != null) {
      console.log("caching...");
      return res.json(JSON.parse(photos));
    } else {
      console.log("servering...");
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos",
        { params: { albumId } }
      );
      redisClient.setex("photos", DEFAULT_EXPIRATION, JSON.stringify(data));
    }
    res.status(200).json(data);
  });
});

server.get("/photos/:id", async (req, res) => {
  const albumId = req.query.albumId;
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${req.params.id}`,
    { params: { albumId } }
  );

  res.status(200).json(data);
});

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
