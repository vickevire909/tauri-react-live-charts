const WebSocket = require("ws");
const http = require("http");
const RandomWalkGenerator = require("./randomwalkgenerator");

// Create separate generators for different metrics
const genarray = [];

// Get interval from command line argument (in milliseconds)
const interval = parseInt(process.argv[2]) || 1000; // Default to 1 second if not specified

// Create HTTP server
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Store all connected clients with their configurations
const clients = new Map(); // Using Map to store client-specific settings

const makeGen = () =>
  new RandomWalkGenerator({
    startingValue: 1000,
    standardDeviation: 50,
    drift: 0,
    timeStep: 1,
  });

// Handle new WebSocket connections
wss.on("connection", (ws) => {
  console.log("New client connected");
  // Initialize client with default setting of 1 value
  clients.set(ws, { numberOfValues: 1 });
  genarray.push(makeGen());

  // Handle messages from client
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (data.command === "setValues" && typeof data.count === "number") {
        const count = Math.max(1, Math.floor(data.count)); // Ensure positive integer
        genarray.push(makeGen());
        clients.set(ws, { numberOfValues: count });
        console.log(`Client updated to receive ${count} values per broadcast`);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });
});

// Generate array of random values
function generateRandomValues(count) {
  if (genarray.length > count) {
    const deleted = genarray.splice(count);
    console.log(`deleted ${deleted.length} generators`);
  }
  const timestamp = Date.now();
  const values = [];
  for (let i = 0; i < count; i++) {
    const gen = genarray[i];

    values.push(gen.next());
  }
  return { timestamp, values };
}

// Broadcast random values to all connected clients
function broadcastRandomValues() {
  clients.forEach((config, client) => {
    if (client.readyState === WebSocket.OPEN) {
      const values = generateRandomValues(config.numberOfValues);
      client.send(JSON.stringify(values));
    }
  });
}

// Start broadcasting at specified interval
setInterval(broadcastRandomValues, interval);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
  console.log(`Broadcasting random values every ${interval}ms`);
});
