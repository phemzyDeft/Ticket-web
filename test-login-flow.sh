#!/bin/bash

echo "🧪 Testing Complete Login Flow with URL Parameter Preservation"
echo "=============================================================="
echo ""

# Test URL with custom message
TEST_URL="http://localhost:8001/accept-ticket.html?customMessage=Test%20message%20for%20login%20flow&recipientName=John+Doe&senderName=Jane+Smith&eventName=Test+Event&eventDetails=Test+Venue&eventDate=2024-12-25&eventTime=5%3A00+PM&ticketCount=2&section=A&row=1&seats=1%2C2&ticketType=Seated"

echo "1️⃣ Testing accept-ticket.html with full parameters:"
echo "URL: $TEST_URL"
echo ""

# Test accept-ticket.html
echo "📄 Testing accept-ticket.html response:"
curl -s "$TEST_URL" | grep -E "(customMessage|recipientName|senderName|eventName)" | head -5
echo ""

# Test login.html (simulating redirect with parameters)
LOGIN_URL="http://localhost:8001/login.html?customMessage=Test%20message%20for%20login%20flow&recipientName=John+Doe&senderName=Jane+Smith&eventName=Test+Event&eventDetails=Test+Venue&eventDate=2024-12-25&eventTime=5%3A00+PM&ticketCount=2&section=A&row=1&seats=1%2C2&ticketType=Seated"

echo "2️⃣ Testing login.html with preserved parameters:"
echo "URL: $LOGIN_URL"
echo ""

# Test login.html
echo "📄 Testing login.html response:"
curl -s "$LOGIN_URL" | grep -E "(preservedUrlParams|localStorage|customMessage)" | head -5
echo ""

# Test password.html (simulating redirect with parameters)
PASSWORD_URL="http://localhost:8001/password.html?customMessage=Test%20message%20for%20login%20flow&recipientName=John+Doe&senderName=Jane+Smith&eventName=Test+Event&eventDetails=Test+Venue&eventDate=2024-12-25&eventTime=5%3A00+PM&ticketCount=2&section=A&row=1&seats=1%2C2&ticketType=Seated"

echo "3️⃣ Testing password.html with preserved parameters:"
echo "URL: $PASSWORD_URL"
echo ""

# Test password.html
echo "📄 Testing password.html response:"
curl -s "$PASSWORD_URL" | grep -E "(preservedUrlParams|localStorage|customMessage)" | head -5
echo ""

# Test index.html (simulating final redirect with parameters)
INDEX_URL="http://localhost:8001/index.html?customMessage=Test%20message%20for%20login%20flow&recipientName=John+Doe&senderName=Jane+Smith&eventName=Test+Event&eventDetails=Test+Venue&eventDate=2024-12-25&eventTime=5%3A00+PM&ticketCount=2&section=A&row=1&seats=1%2C2&ticketType=Seated"

echo "4️⃣ Testing index.html with preserved parameters:"
echo "URL: $INDEX_URL"
echo ""

# Test index.html
echo "📄 Testing index.html response:"
curl -s "$INDEX_URL" | grep -E "(customMessage|displayCustomMessage|Important Notice)" | head -5
echo ""

echo "✅ Test Complete!"
echo ""
echo "🔍 What to look for:"
echo "- accept-ticket.html: Should contain JavaScript for storing URL parameters"
echo "- login.html: Should contain JavaScript for preserving URL parameters"
echo "- password.html: Should contain JavaScript for preserving URL parameters"
echo "- index.html: Should contain JavaScript for displaying custom message"
echo ""
echo "🌐 To test in browser:"
echo "1. Visit: $TEST_URL"
echo "2. Click 'Accept Ticket(s)'"
echo "3. Click 'Sign In' in modal"
echo "4. Complete login flow"
echo "5. Check if custom message appears on index.html"
