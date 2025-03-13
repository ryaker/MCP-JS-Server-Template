# MCP JS Server Template

## Overview

This is a simplified template for creating Model Context Protocol (MCP) servers in JavaScript for integration with Claude Desktop. It provides a basic structure for developing custom MCP servers with minimal boilerplate code.

## Features

- Implements standard MCP server initialization
- Provides two basic tools: `about` and `hello`
- Follows MCP protocol version 2024-11-05
- Uses `@modelcontextprotocol/sdk` for server implementation
- Includes error handling and logging

## Prerequisites

- Node.js (v16 or later)
- Claude Desktop
- `@modelcontextprotocol/sdk` npm package

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install @modelcontextprotocol/sdk
```

## Claude Desktop Configuration

Add to your Claude Desktop configuration file:

**Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**Configuration Example:**
```json
{
  "mcpServers": {
    "template-server": {
      "command": "node",
      "args": [
        "/full/path/to/simplified-template-mcp-server.js"
      ],
      "env": {
        "NODE_OPTIONS": "--no-deprecation"
      }
    }
  }
}
```

## Available Tools

### 1. `about`
Returns information about the MCP server.

### 2. `hello`
Provides a greeting, with an optional name parameter.

**Example Usage in Claude:**
```
hello with name="Claude"
```

## Extending the Template

To create your own MCP server:
1. Copy this template
2. Modify the `TOOLS` array
3. Implement custom tool handlers in `server.fallbackRequestHandler`
4. Update server name and version

## Limitations

- Minimal error handling
- No advanced security features
- Meant as a starting point for custom implementations

## Contributing

Contributions are welcome! Please submit pull requests or open issues.

## License

MIT License
