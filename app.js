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

  getTotalPrice() {
    return this.reservedTickets.reduce((total, ticket) => total + ticket.price, 0);
  }

  getTotalQuantity() {
    return this.reservedTickets.length;
  }

  clearReservations() {
    this.reservedTickets = [];
  }
}

// Clase Factory para crear diferentes tipos de tickets
class TicketFactory {
  static createTicket(type, quantity) {
    let tickets = [];
    for (let i = 0; i < quantity; i++) {
      switch (type) {
        case 'economy':
          tickets.push(new EconomyTicket());
          break;
        case 'business':
          tickets.push(new BusinessTicket());
          break;
        case 'vip':
          tickets.push(new VIPTicket());
          break;
        default:
          throw new Error('Tipo de ticket no válido');
      }
    }
    return tickets;
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
  const quantity = parseInt(document.getElementById('quantity').value);

  if (quantity <= 0 || isNaN(quantity)) {
    alert('Por favor, ingresa una cantidad válida de tickets.');
    return;
  }

  // Crear tickets
  const tickets = TicketFactory.createTicket(busType, quantity);

  // Obtener la instancia del Singleton para reservar los tickets
  const reservationSystem = new TicketReservation();

  // Añadir todos los tickets creados a la reserva
  tickets.forEach(ticket => reservationSystem.addTicket(ticket));

  // Mostrar detalles del ticket
  document.getElementById('ticketInfo').textContent = 
    `${quantity} ticket(s) de tipo ${tickets[0].type} reservados.`;

  document.getElementById('ticketDetails').classList.remove('hidden');

  // Mostrar resumen de la reserva
  const totalQuantity = reservationSystem.getTotalQuantity();
  const totalPrice = reservationSystem.getTotalPrice();

  document.getElementById('summaryInfo').textContent = 
    `Total de tickets reservados: ${totalQuantity}. Costo total: $${totalPrice}.`;

  document.getElementById('reservationSummary').classList.remove('hidden');
});
