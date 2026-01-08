const state = {
  checkIn: null,
  checkOut: null,
  guests: 1,
  infants: 0,
  pets: 0,
  currentModal: null,
  currentMonth: new Date(),
};


const formatDateShort = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const daysBetween = (start, end) => {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  return Math.ceil((end - start) / ONE_DAY) + 1;
};



const updateGuestDisplay = () => {
  const parts = [];

  if (state.guests) parts.push(`${state.guests} Guest${state.guests > 1 ? 's' : ''}`);
  if (state.infants) parts.push(`${state.infants} Infant${state.infants > 1 ? 's' : ''}`);
  if (state.pets) parts.push(`${state.pets} Pet${state.pets > 1 ? 's' : ''}`);

  document.getElementById('guestValue').textContent =
    parts.length ? parts.join(', ') : '0 Guests';
};


const updateTotalPrice = () => {
  if (!state.checkIn || !state.checkOut) return;

  const nights = daysBetween(state.checkIn, state.checkOut);
  const total = nights * 2026;

  document.getElementById('totalPrice').textContent = `USD $${total}`;
  document.getElementById('availabilityText').textContent =
    'Dates selected are available';
};


//display calendar
const renderCalendar = () => {
  const year = state.currentMonth.getFullYear();
  const month = state.currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  document.getElementById('calendarMonth').textContent =
    state.currentMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

  const grid = document.getElementById('datesGrid');
  grid.innerHTML = '';

  // fill up empty slots before month
  for (let i = 0; i < firstDay.getDay(); i++) {
    grid.appendChild(document.createElement('div'));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const btn = document.createElement('button');
    btn.textContent = day;
    btn.className = 'date-btn';

    if (date < today) btn.disabled = true;

    if (state.checkIn && date.toDateString() === state.checkIn.toDateString()) {
      btn.classList.add('selected');
    }

    if (state.checkOut && date.toDateString() === state.checkOut.toDateString()) {
      btn.classList.add('selected');
    }

    if (state.checkIn && state.checkOut && date > state.checkIn && date < state.checkOut) {
      btn.classList.add('in-range');
    }

    btn.onclick = () => selectDate(date);
    grid.appendChild(btn);
  }
};


//date logic
const selectDate = (date) => {
  if (state.currentModal === 'checkin') {
    state.checkIn = date;
    state.checkOut = null;

    document.getElementById('checkinValue').textContent = formatDateShort(date);
    document.getElementById('checkoutValue').textContent = 'Select Date';
  }

  if (state.currentModal === 'checkout') {
    if (date <= state.checkIn) {
      alert('Check-out must be after check-in');
      return;
    }

    state.checkOut = date;
    document.getElementById('checkoutValue').textContent = formatDateShort(date);
  }

  closeDateModal();
  updateTotalPrice();
};


const openDateModal = (type) => {
  state.currentModal = type;
  state.currentMonth = new Date();

  document.getElementById('dateModalTitle').textContent =
    type === 'checkin' ? 'Select Check-In Date' : 'Select Check-Out Date';

  renderCalendar();
  document.getElementById('dateModal').classList.add('active');
};

const closeDateModal = () => {
  document.getElementById('dateModal').classList.remove('active');
  state.currentModal = null;
};

const openGuestModal = () => {
  guestInput.value = state.guests;
  infantInput.value = state.infants;
  petInput.value = state.pets;
  guestModal.classList.add('active');
};

const closeGuestModal = () => {
  guestModal.classList.remove('active');
};


const changeGuestCount = (input, delta, min = 0) => {
  let value = Number(input.value) + delta;
  input.value = Math.max(value, min);
};



checkinField.onclick = () => openDateModal('checkin');
checkoutField.onclick = () => openDateModal('checkout');
guestSection.onclick = openGuestModal;

dateModalClose.onclick = closeDateModal;
guestModalClose.onclick = closeGuestModal;

const closeOnOutsideClick = (modal, closeFn) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeFn();
    }
  });
};

closeOnOutsideClick(document.getElementById('dateModal'), closeDateModal);
closeOnOutsideClick(document.getElementById('guestModal'), closeGuestModal);

prevMonth.onclick = () => {
  state.currentMonth.setMonth(state.currentMonth.getMonth() - 1);
  renderCalendar();
};

nextMonth.onclick = () => {
  state.currentMonth.setMonth(state.currentMonth.getMonth() + 1);
  renderCalendar();
};

guestPlus.onclick = () => changeGuestCount(guestInput, 1, 1);
guestMinus.onclick = () => changeGuestCount(guestInput, -1, 1);

infantPlus.onclick = () => changeGuestCount(infantInput, 1);
infantMinus.onclick = () => changeGuestCount(infantInput, -1);

petPlus.onclick = () => changeGuestCount(petInput, 1);
petMinus.onclick = () => changeGuestCount(petInput, -1);

guestConfirm.onclick = () => {
  state.guests = Number(guestInput.value);
  state.infants = Number(infantInput.value);
  state.pets = Number(petInput.value);
  updateGuestDisplay();
  closeGuestModal();
};

guestCancel.onclick = closeGuestModal;


updateGuestDisplay();
