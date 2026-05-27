import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const BUILD_DIR = path.join(import.meta.dirname, "build");
const PORT = parseInt(process.argv[2] ?? "8000", 10);

http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
	const file = path.join(BUILD_DIR, req.url === "/" ? "/xs_esp32.bin" : (req.url ?? ""));

	if (!file.startsWith(BUILD_DIR)) {
		res.writeHead(403);
		res.end("Forbidden");
		return;
	}

	if (!fs.existsSync(file)) {
		console.error(`404 ${req.url}`);
		res.writeHead(404);
		res.end("Not found");
		return;
	}

	const stat = fs.statSync(file);
	res.writeHead(200, {
		"Content-Type": "application/octet-stream",
		"Content-Length": stat.size,
	});

	fs.createReadStream(file).pipe(res);
	console.log(`200 ${req.url} (${stat.size} bytes)`);
}).listen(PORT, () => {
	console.log(`OTA server running on http://0.0.0.0:${PORT}/xs_esp32.bin`);
	console.log("Press Ctrl+C to stop");
});
