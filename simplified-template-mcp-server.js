#!/usr/bin/env node
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");

// Log to console for debugging
console.error("STARTING SIMPLIFIED TEMPLATE SERVER");

// Create server
const server = new Server(
  { name: "template-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Define the tools with the required inputSchema property
const TOOLS = [
  {
    name: "about",
    description: "Returns information about this MCP server",
    inputSchema: {  // This MUST be inputSchema, not parameters
      type: "object",
      properties: {},
      required: []
    }
  },
  {
    name: "hello",
    description: "A simple greeting tool",
    inputSchema: {  // This MUST be inputSchema, not parameters
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Name to greet (optional)"
        }
      },
      required: []
    }
  }
];

// Handle all requests
server.fallbackRequestHandler = async (request) => {
  try {
    const { method, params, id } = request;
    console.error(`REQUEST: ${method} [${id}]`);
    
    // Initialize
    if (method === "initialize") {
      return {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "template-mcp-server", version: "1.0.0" }
      };
    }
    
    // Tools list
    if (method === "tools/list") {
      console.error(`TOOLS: ${JSON.stringify(TOOLS)}`);
      return { tools: TOOLS };
    }
    
    // Tool call
    if (method === "tools/call") {
      const { name, arguments: args = {} } = params || {};
      
      if (name === "about") {
        return {
          content: [
            { 
              type: "text", 
              text: `This is a template MCP server (version 1.0.0).\n\nIt serves as a template for building Claude integrations.` 
            }
          ]
        };
      }
      
      if (name === "hello") {
        const userName = args.name || "World";
        return {
          content: [
            { 
              type: "text", 
              text: `Hello, ${userName}! This is a response from the template MCP server.` 
            }
          ]
        };
      }
      
      return {
        error: {
          code: -32601,
          message: `Tool not found: ${name}`
        }
      };
    }
    
    // Required empty responses
    if (method === "resources/list") return { resources: [] };
    if (method === "prompts/list") return { prompts: [] };
    
    // Empty response for unhandled methods
    return {};
    
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    return {
      error: {
        code: -32603,
        message: "Internal error",
        data: { details: error.message }
      }
    };
  }
};

// Connect to stdio transport
const transport = new StdioServerTransport();

// Stay alive on SIGTERM
process.on("SIGTERM", () => {
  console.error("SIGTERM received but staying alive");
});

// Connect server
server.connect(transport)
  .then(() => console.error("Server connected"))
  .catch(error => {
    console.error(`Connection error: ${error.message}`);
    process.exit(1);
  });
