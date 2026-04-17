import { createServer } from "http";
import { readFileSync, existsSync } from "fs";

const PORT = 3035;
const ZIP_PATH = "/home/z/my-project/techphase-solutions-website.zip";

const server = createServer((_req, res) => {
  if (!existsSync(ZIP_PATH)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File not found");
    return;
  }

  const data = readFileSync(ZIP_PATH);
  res.writeHead(200, {
    "Content-Type": "application/zip",
    "Content-Disposition": 'attachment; filename="techphase-solutions-website.zip"',
    "Content-Length": data.length,
  });
  res.end(data);
});

server.listen(PORT, () => {
  console.log(`Download server running on port ${PORT}`);
});
