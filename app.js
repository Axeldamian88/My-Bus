// Singleton para la reserva de tickets
class TicketReservation {
    constructor() {
      if (TicketReservation.instance) {
        return TicketReservation.instance;
      }
      this.reservedTickets = [];
      TicketReservation.instance = this;
    }
  
    addTicket(ticket) {
      this.reservedTickets.push(ticket);
    }
  
    getTickets() {
      return this.reservedTickets;
    }
  }
  
  // Clase Factory para crear diferentes tipos de tickets
  class TicketFactory {
    static createTicket(type) {
      switch (type) {
        case 'economy':
          return new EconomyTicket();
        case 'business':
          return new BusinessTicket();
        case 'vip':
          return new VIPTicket();
        default:
          throw new Error('Tipo de ticket no válido');
      }
    }
  }
  
  class EconomyTicket {
    constructor() {
      this.type = 'Económico';
      this.price = 10;
    }
  
    getDetails() {
      return `Tipo de ticket: ${this.type}, Precio: $${this.price}`;
    }
  }
  
  class BusinessTicket {
    constructor() {
      this.type = 'Business';
      this.price = 20;
    }
  
    getDetails() {
      return `Tipo de ticket: ${this.type}, Precio: $${this.price}`;
    }
  }
  
  class VIPTicket {
    constructor() {
      this.type = 'VIP';
      this.price = 30;
    }
  
    getDetails() {
      return `Tipo de ticket: ${this.type}, Precio: $${this.price}`;
    }
  }
  
  // Lógica de la reserva
  document.getElementById('reserveButton').addEventListener('click', () => {
    const busType = document.getElementById('busType').value;
    const ticket = TicketFactory.createTicket(busType);
    
    // Obtener la instancia del Singleton para reservar el ticket
    const reservationSystem = new TicketReservation();
    reservationSystem.addTicket(ticket);
  
    // Mostrar detalles del ticket
    document.getElementById('ticketInfo').textContent = ticket.getDetails();
    document.getElementById('ticketDetails').classList.remove('hidden');
  });
  