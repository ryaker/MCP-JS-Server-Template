# MCP Server Template

This folder contains a template for creating new Model Context Protocol (MCP) servers for Claude. The template provides a basic structure that you can build upon for custom integrations.

## What's Included

- `template-mcp-server.js`: A basic MCP server template with:
  - Basic tools: `about` and `hello`
  - Basic resource: `server-info`
  - All required protocol handlers (initialize, tools/list, resources/list, etc.)
  - Error handling and logging

## How to Use This Template

1. Copy the template to your project folder:
   ```bash
   cp template-mcp-server.js ../YourProjectName/your-server-name.js
   ```

2. Modify the configuration variables:
   ```javascript
   const SERVER_NAME = "your-server-name";
   const SERVER_VERSION = "1.0.0";
   ```

3. Add your custom tools by:
   - Adding them to the capabilities object
   - Adding tool definitions to the `tools/list` handler
   - Implementing handlers in the `tools/call` section

4. Add your custom resources by:
   - Adding them to the capabilities object
   - Adding resource definitions to the `resources/list` handler
   - Implementing handlers for each resource

5. Configure Claude Desktop to use your MCP server:
   - Edit `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Add your server to the `mcpServers` section
   - Restart Claude Desktop

## Example Claude Desktop Configuration

```json
{
  "mcpServers": {
    "your-server-name": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/sdk", "stdin-stdout-server", "/Users/ryaker/Documents/LocalDev/MCP/Projects/YourProjectName/your-server-name.js"]
    }
  }
}
```

## Types of MCP Components

An MCP server can expose:

1. **Tools**: Functions that Claude can call to perform actions (like sending emails, creating tasks, etc.)
2. **Resources**: Data sources that Claude can query (like document repositories, user profiles, settings, etc.)

## MCP Protocol Handlers

The template implements these essential protocol handlers:

- `initialize`: Establishes the connection and negotiates capabilities
- `tools/list`: Provides tool definitions to Claude
- `tools/call`: Executes tools when requested by Claude
- `resources/list`: Provides resource definitions to Claude
- `resources/{name}`: Retrieves resources when requested by Claude
- `shutdown`: Gracefully terminates the server

## Development Workflow

1. Start with the template
2. Add custom functionality incrementally
3. Test each addition by restarting Claude Desktop
4. Ask Claude to use your tools or access your resources

## Dependencies

This template requires:
- Node.js
- `@modelcontextprotocol/sdk` package
