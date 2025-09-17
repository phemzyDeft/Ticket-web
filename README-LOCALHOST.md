# 🚀 Localhost Testing Guide

## Quick Start

### Option 1: Python Server (Recommended)
```bash
# Navigate to your project folder
cd /Users/_boymiwa/Downloads/Ticket-web

# Start Python server
python3 -m http.server 8000

# Or if you have Python 2
python -m SimpleHTTPServer 8000
```

### Option 2: Node.js Server
```bash
# Install serve globally (if not already installed)
npm install -g serve

# Navigate to your project folder
cd /Users/_boymiwa/Downloads/Ticket-web

# Start server
npx serve . -p 8000
```

### Option 3: PHP Server
```bash
# Navigate to your project folder
cd /Users/_boymiwa/Downloads/Ticket-web

# Start PHP server
php -S localhost:8000
```

## 🌐 Access Your Test Site

Once the server is running, open your browser and go to:

- **Main Test Page:** http://localhost:8000/test-ticket.html
- **Direct Ticket Test:** http://localhost:8000/index.html?recipientName=Oluwafemi&senderName=John%20Doe&eventName=Test%20Event&eventDate=2025-07-16&eventTime=6:00%20PM&section=101&row=15&seats=12,13&ticketType=Reserved%20Seating

## 📱 Mobile Testing

To test on your phone:

1. Find your computer's IP address:
   - **Mac:** `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - **Windows:** `ipconfig`
   - **Linux:** `hostname -I`

2. Access from your phone:
   - http://[YOUR-IP-ADDRESS]:8000/test-ticket.html

## 🧪 Testing Flow

1. **Start server** using one of the methods above
2. **Open** http://localhost:8000/test-ticket.html
3. **Click** "Test Ticket Transfer" button
4. **Follow the flow:**
   - See ticket details
   - Click "Accept Ticket"
   - See modal popup
   - Click "Sign In / Create Account"
   - Enter any email (e.g., test@example.com)
   - Click "Continue"
   - See success message and return to main page

## 🔧 Troubleshooting

### Port Already in Use
If port 8000 is busy, try:
```bash
python3 -m http.server 8001
# Then use http://localhost:8001
```

### CORS Issues
If you get CORS errors, make sure you're accessing via `http://localhost:8000` not `file://`

### Mobile Not Working
- Make sure your phone and computer are on the same WiFi network
- Check your computer's firewall settings
- Try using your computer's IP address instead of localhost

## 📧 Email Template Testing

For your email template, use this URL structure:
```html
<a href="http://localhost:8000/index.html?recipientName={{recipientName}}&senderName={{senderName}}&eventName={{eventTitle}}&eventDate={{eventDate}}&eventTime={{eventTime}}&section={{section}}&row={{row}}&seats={{seats}}&ticketType={{ticketType}}" class="accept-button">Accept Ticket(s)</a>
```

## 🚀 Production Deployment

When ready for production, replace `localhost:8000` with your actual domain:
- `http://localhost:8000` → `https://yourdomain.com`
- `http://localhost:8000` → `https://infotlcketmaster.buzz`

## 📝 Test Scenarios

The test page includes several pre-configured test scenarios:
- Coldplay Concert (2 tickets)
- Taylor Swift Concert (1 ticket) 
- NBA Finals (4 tickets)
- Broadway Show (2 VIP tickets)

Each tests different seat configurations and event types.
