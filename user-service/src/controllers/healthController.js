const mongoose = require('mongoose');

class HealthController {
  async check(req, res) {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.json({
      service: 'user-service',
      status: 'ok',
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = new HealthController();