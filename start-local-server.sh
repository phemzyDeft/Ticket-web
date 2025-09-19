#!/bin/bash

# Simple local server for testing the ticket web application
# This script starts a local HTTP server to test the custom message functionality

echo "🎫 Starting Ticket Web Test Server..."
echo "=================================="
echo ""
echo "Server will be available at:"
echo "  http://localhost:8000"
echo ""
echo "Test pages:"
echo "  Main test page: http://localhost:8000/test-custom-message.html"
echo "  Accept ticket: http://localhost:8000/accept-ticket.html"
echo "  Login page: http://localhost:8000/login.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "Starting server with Python 3..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Starting server with Python 2..."
    python -m SimpleHTTPServer 8000
else
    echo "❌ Error: Python not found. Please install Python to run the local server."
    echo "Alternatively, you can open the HTML files directly in your browser."
    exit 1
fi
