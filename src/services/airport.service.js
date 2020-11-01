class AirportService {
  constructor() {
    this.airports = [];
  }

  register = (airport) => {
    if (this.airports.includes(airport)) return;

    this.airports.push(airport);
  };
}

module.exports = new AirportService();
