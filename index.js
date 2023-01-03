const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("api jalan cuy");
});

app.get("/asuna", async (req, res) => {
  if (ytdl.validateURL(req.query.yt)) {
    await ytdl
      .getBasicInfo(req.query.yt)
      .then((d) =>
        res.json({ video_details: d.videoDetails, format: d.formats })
      );
  } else {
    const getVideo = await ytsr.getFilters("" + req.query.yt);
    const filter = getVideo.get("Type").get("Video");
    await ytsr("" + filter.url, { limit: 10 }).then((d) =>
      res.json({ results: d.items })
    );
  }
});

app.listen(6969, () => {
  console.log("server up");
});
