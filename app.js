/* ==========================================================================
   Khan Travels — app.js
   Vanilla JavaScript. No frameworks, no build step, no backend.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------ config --- */

  var STORAGE_KEY = "khanTravels.bookings.v1";
  var SERVICE_CHARGE_PER_SEAT = 0; // transparent: this demo charges no fees
  var MAX_SEATS = 6;
  var SEAT_ROWS = 10;
  var SEAT_COLUMNS = ["A", "B", "C", "D"];

  /* -------------------------------------------------------------- data --- */

  /* A trip is a scheduled departure. Fares are per seat, in INR. */
  var TRIPS = [
    /* Mumbai -> Pune */
    { id: "mum-pun-01", from: "Mumbai", to: "Pune", operator: "Shree Ganesh Travels", type: "AC Seater", dep: "06:30", arr: "11:00", duration: "3h 30m", km: 120, fare: 450, image: "bus-green.svg", badge: "ac" },
    { id: "mum-pun-02", from: "Mumbai", to: "Pune", operator: "Royal Travels", type: "AC Sleeper", dep: "08:15", arr: "13:00", duration: "4h 45m", km: 120, fare: 650, image: "bus-blue.svg", badge: "sleeper" },
    { id: "mum-pun-03", from: "Mumbai", to: "Pune", operator: "Khan Express", type: "Non AC", dep: "10:45", arr: "15:30", duration: "4h 45m", km: 120, fare: 350, image: "bus-coral.svg", badge: "nonac" },
    { id: "mum-pun-04", from: "Mumbai", to: "Pune", operator: "Coastal Express", type: "AC Sleeper", dep: "14:20", arr: "18:50", duration: "4h 30m", km: 120, fare: 520, image: "bus-navy.svg", badge: "sleeper" },
    { id: "mum-pun-05", from: "Mumbai", to: "Pune", operator: "Deccan Comfort", type: "AC Seater", dep: "19:00", arr: "23:15", duration: "4h 15m", km: 120, fare: 410, image: "bus-sage.svg", badge: "ac" },

    /* Pune -> Mumbai */
    { id: "pun-mum-01", from: "Pune", to: "Mumbai", operator: "Khan Express", type: "Non AC", dep: "06:00", arr: "10:30", duration: "4h 30m", km: 145, fare: 380, image: "bus-coral.svg", badge: "nonac" },
    { id: "pun-mum-02", from: "Pune", to: "Mumbai", operator: "Royal Travels", type: "AC Sleeper", dep: "08:15", arr: "13:00", duration: "4h 45m", km: 145, fare: 650, image: "bus-blue.svg", badge: "sleeper" },
    { id: "pun-mum-03", from: "Pune", to: "Mumbai", operator: "Shree Ganesh Travels", type: "AC Sleeper", dep: "15:30", arr: "20:15", duration: "4h 45m", km: 145, fare: 540, image: "bus-green.svg", badge: "sleeper" },
    { id: "pun-mum-04", from: "Pune", to: "Mumbai", operator: "Deccan Comfort", type: "AC Seater", dep: "21:30", arr: "02:00", duration: "4h 30m", km: 145, fare: 460, image: "bus-sage.svg", badge: "ac" },

    /* Mumbai <-> Nashik */
    { id: "mum-nsk-01", from: "Mumbai", to: "Nashik", operator: "Coastal Express", type: "AC Seater", dep: "07:30", arr: "11:20", duration: "3h 50m", km: 165, fare: 480, image: "bus-navy.svg", badge: "ac" },
    { id: "mum-nsk-02", from: "Mumbai", to: "Nashik", operator: "Khan Express", type: "Non AC", dep: "10:45", arr: "15:30", duration: "4h 45m", km: 165, fare: 350, image: "bus-coral.svg", badge: "nonac" },
    { id: "nsk-mum-01", from: "Nashik", to: "Mumbai", operator: "Coastal Express", type: "AC Seater", dep: "12:00", arr: "15:50", duration: "3h 50m", km: 165, fare: 490, image: "bus-navy.svg", badge: "ac" },

    /* Mumbai <-> Goa */
    { id: "mum-goa-01", from: "Mumbai", to: "Goa", operator: "Royal Travels", type: "AC Sleeper", dep: "18:30", arr: "05:45", duration: "11h 15m", km: 590, fare: 1420, image: "bus-blue.svg", badge: "sleeper" },
    { id: "mum-goa-02", from: "Mumbai", to: "Goa", operator: "Deccan Comfort", type: "AC Sleeper", dep: "20:00", arr: "07:30", duration: "11h 30m", km: 590, fare: 1250, image: "bus-sage.svg", badge: "sleeper" },
    { id: "goa-mum-01", from: "Goa", to: "Mumbai", operator: "Royal Travels", type: "AC Sleeper", dep: "19:15", arr: "06:45", duration: "11h 30m", km: 590, fare: 1380, image: "bus-blue.svg", badge: "sleeper" },

    /* Pune <-> Goa */
    { id: "pun-goa-01", from: "Pune", to: "Goa", operator: "Coastal Express", type: "AC Sleeper", dep: "21:00", arr: "08:30", duration: "11h 30m", km: 450, fare: 1180, image: "bus-navy.svg", badge: "sleeper" },
    { id: "goa-pun-01", from: "Goa", to: "Pune", operator: "Deccan Comfort", type: "AC Sleeper", dep: "20:30", arr: "07:45", duration: "11h 15m", km: 450, fare: 1120, image: "bus-sage.svg", badge: "sleeper" },

    /* Mumbai <-> Ahmedabad */
    { id: "mum-amd-01", from: "Mumbai", to: "Ahmedabad", operator: "Shree Ganesh Travels", type: "AC Seater", dep: "22:00", arr: "06:00", duration: "8h 00m", km: 520, fare: 940, image: "bus-green.svg", badge: "ac" },
    { id: "amd-mum-01", from: "Ahmedabad", to: "Mumbai", operator: "Shree Ganesh Travels", type: "AC Seater", dep: "21:30", arr: "05:45", duration: "8h 15m", km: 520, fare: 960, image: "bus-green.svg", badge: "ac" },

    /* Nashik <-> Pune */
    { id: "nsk-pun-01", from: "Nashik", to: "Pune", operator: "Khan Express", type: "Non AC", dep: "09:00", arr: "13:00", duration: "4h 00m", km: 210, fare: 420, image: "bus-coral.svg", badge: "nonac" },
    { id: "pun-nsk-01", from: "Pune", to: "Nashik", operator: "Deccan Comfort", type: "AC Seater", dep: "16:00", arr: "19:45", duration: "3h 45m", km: 210, fare: 470, image: "bus-sage.svg", badge: "ac" }
  ];

  var BADGE_LABEL = { ac: "AC Seater", sleeper: "AC Sleeper", nonac: "Non AC" };

  /* ------------------------------------------------------------- state --- */

  var state = {
    view: "home",
    stack: [],
    search: { from: "", to: "", date: "" },
    filters: { sort: "departure", maxPrice: 2000, types: [] },
    tripId: null,
    seats: [],
    passengers: [],
    lastBookingRef: null
  };

  /* ----------------------------------------------------------- helpers --- */

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value === null || value === undefined ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function money(amount) {
    return "\u20B9" + Number(amount || 0).toLocaleString("en-IN");
  }

  function asset(file) {
    return "assets/" + file;
  }

  function toMinutes(time) {
    var parts = String(time).split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  function formatTime(time) {
    var parts = String(time).split(":");
    var hours = parseInt(parts[0], 10);
    var minutes = parts[1];
    var suffix = hours >= 12 ? "PM" : "AM";
    var display = hours % 12;
    if (display === 0) {
      display = 12;
    }
    return (display < 10 ? "0" + display : String(display)) + ":" + minutes + " " + suffix;
  }

  function todayISO() {
    var now = new Date();
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
  }

  function formatDate(iso) {
    if (!iso) {
      return "";
    }
    var parts = String(iso).split("-");
    if (parts.length !== 3) {
      return iso;
    }
    var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    if (isNaN(date.getTime())) {
      return iso;
    }
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function titleCaseCity(value) {
    var known = getCities();
    var needle = String(value || "").trim().toLowerCase();
    for (var i = 0; i < known.length; i += 1) {
      if (known[i].toLowerCase() === needle) {
        return known[i];
      }
    }
    return String(value || "").trim();
  }

  function getCities() {
    var seen = {};
    TRIPS.forEach(function (trip) {
      seen[trip.from] = true;
      seen[trip.to] = true;
    });
    return Object.keys(seen).sort();
  }

  function getTrip(id) {
    for (var i = 0; i < TRIPS.length; i += 1) {
      if (TRIPS[i].id === id) {
        return TRIPS[i];
      }
    }
    return null;
  }

  /* ---------------------------------------------------- seat inventory --- */

  function allSeatLabels() {
    var labels = [];
    for (var row = 1; row <= SEAT_ROWS; row += 1) {
      for (var col = 0; col < SEAT_COLUMNS.length; col += 1) {
        labels.push(row + SEAT_COLUMNS[col]);
      }
    }
    return labels;
  }

  function hashString(text) {
    var hash = 2166136261;
    for (var i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = (hash * 16777619) >>> 0;
    }
    return hash >>> 0;
  }

  /* Small deterministic PRNG so a given bus/date always shows the same seats. */
  function seededRandom(seed) {
    var value = seed >>> 0;
    return function () {
      value = (value + 0x6d2b79f5) >>> 0;
      var t = value;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function baseBookedSeats(tripId, dateISO) {
    var labels = allSeatLabels();
    var random = seededRandom(hashString(tripId + "|" + dateISO));
    var count = 5 + Math.floor(random() * 21);
    var taken = {};
    for (var i = 0; i < count; i += 1) {
      taken[labels[Math.floor(random() * labels.length)]] = true;
    }
    return taken;
  }

  function reservedSeats(tripId, dateISO) {
    var taken = {};
    loadBookings().forEach(function (booking) {
      if (booking.status !== "confirmed") {
        return;
      }
      if (booking.tripId !== tripId || booking.date !== dateISO) {
        return;
      }
      (booking.seats || []).forEach(function (seat) {
        taken[seat] = true;
      });
    });
    return taken;
  }

  function bookedSeatSet(tripId, dateISO) {
    var taken = baseBookedSeats(tripId, dateISO);
    var reserved = reservedSeats(tripId, dateISO);
    Object.keys(reserved).forEach(function (seat) {
      taken[seat] = true;
    });
    return taken;
  }

  function seatsLeft(trip, dateISO) {
    var total = allSeatLabels().length;
    return Math.max(0, total - Object.keys(bookedSeatSet(trip.id, dateISO)).length);
  }

  /* --------------------------------------------------------- storage --- */

  function isValidBooking(booking) {
    return (
      booking &&
      typeof booking === "object" &&
      typeof booking.ref === "string" &&
      typeof booking.tripId === "string" &&
      Array.isArray(booking.seats) &&
      booking.date
    );
  }

  function loadBookings() {
    var raw;
    try {
      raw = window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return [];
    }
    if (!raw) {
      return [];
    }
    try {
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.filter(isValidBooking);
    } catch (error) {
      return [];
    }
  }

  function saveBookings(bookings) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      return true;
    } catch (error) {
      toast("Your browser blocked local storage. This booking will not survive a refresh.", "error", 6000);
      return false;
    }
  }

  function bookingCountsAsActive(booking) {
    return booking.status === "confirmed";
  }

  function makeBookingRef(dateISO, existing) {
    var base = "KT" + String(dateISO).replace(/-/g, "");
    var used = {};
    existing.forEach(function (booking) {
      used[booking.ref] = true;
    });
    var sequence = existing.length + 1;
    var ref = base + String(sequence).padStart(4, "0");
    while (used[ref]) {
      sequence += 1;
      ref = base + String(sequence).padStart(4, "0");
    }
    return ref;
  }

  /* ------------------------------------------------------------- toast --- */

  var toastHost = $("#toasts");

  function toast(message, kind, duration) {
    if (!toastHost) {
      return;
    }
    var node = document.createElement("div");
    node.className = "toast" + (kind === "error" ? " toast--error" : "");
    node.innerHTML =
      '<span class="toast__icon" aria-hidden="true">' +
      (kind === "error"
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"/></svg>') +
      "</span>" +
      '<span class="toast__text">' + escapeHtml(message) + "</span>";
    toastHost.appendChild(node);

    var life = duration || 3800;
    window.setTimeout(function () {
      node.classList.add("is-out");
      window.setTimeout(function () {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }, 260);
    }, life);
  }

  /* ------------------------------------------------------------- modal --- */

  var modal = $("#modal");
  var modalTitle = $("#modal-title");
  var modalBody = $("#modal-body");
  var modalConfirm = $("#modal-confirm");
  var modalCancel = $("#modal-cancel");
  var modalResolve = null;
  var modalOpener = null;

  function confirmDialog(options) {
    return new Promise(function (resolve) {
      modalOpener = document.activeElement;
      modalTitle.textContent = options.title || "Are you sure?";
      modalBody.textContent = options.body || "";
      modalConfirm.textContent = options.confirmLabel || "Confirm";
      modalCancel.textContent = options.cancelLabel || "Cancel";
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      modalResolve = resolve;
      window.setTimeout(function () {
        modalConfirm.focus();
      }, 30);
    });
  }

  function closeModal(result) {
    if (modal.hidden) {
      return;
    }
    modal.hidden = true;
    document.body.style.overflow = "";
    if (modalOpener && modalOpener.focus) {
      modalOpener.focus();
    }
    var resolve = modalResolve;
    modalResolve = null;
    if (resolve) {
      resolve(result);
    }
  }

  if (modal) {
    modalConfirm.addEventListener("click", function () {
      closeModal(true);
    });
    $$("[data-modal-close]", modal).forEach(function (node) {
      node.addEventListener("click", function () {
        closeModal(false);
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeModal(false);
      }
    });
  }

  /* ---------------------------------------------------------- navigate --- */

  var views = $$(".view");
  var navLinks = $$(".nav__link");
  var VIEW_TITLES = {
    home: "Khan Travels — Safe Journey · Better Tomorrow",
    results: "Available Buses — Khan Travels",
    seats: "Select Seats — Khan Travels",
    passengers: "Passenger Details — Khan Travels",
    confirmed: "Booking Confirmed — Khan Travels",
    bookings: "My Bookings — Khan Travels",
    about: "About — Khan Travels",
    contact: "Contact — Khan Travels"
  };

  function highlightNav(view) {
    var owner = view;
    if (view === "results" || view === "seats" || view === "passengers" || view === "confirmed") {
      owner = "home";
    }
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("data-nav") === owner;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function show(view, options) {
    var settings = options || {};
    state.view = view;

    views.forEach(function (node) {
      node.classList.toggle("is-active", node.getAttribute("data-view") === view);
    });

    highlightNav(view);
    document.title = VIEW_TITLES[view] || "Khan Travels";

    if (settings.push && state.stack[state.stack.length - 1] !== view) {
      state.stack.push(view);
    }

    if (settings.scroll !== false) {
      window.scrollTo(0, 0);
    }
  }

  function navigate(view) {
    if (state.view !== view) {
      state.stack.push(state.view);
    }
    show(view);
  }

  function goBack() {
    var previous = state.stack.pop();
    if (!previous || previous === state.view) {
      previous = "home";
    }
    show(previous, { scroll: true });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var target = link.getAttribute("data-nav");
      state.stack = [];
      show(target, { scroll: true });
      if (target === "bookings") {
        renderBookings();
      }
    });
  });

  $$("[data-nav]").forEach(function (node) {
    if (node.classList.contains("nav__link")) {
      return;
    }
    node.addEventListener("click", function (event) {
      event.preventDefault();
      state.stack = [];
      show("home");
    });
  });

  $$("[data-back]").forEach(function (node) {
    node.addEventListener("click", goBack);
  });

  /* ------------------------------------------------------------- search --- */

  var searchForm = $("#search-form");
  var fromInput = $("#from-city");
  var toInput = $("#to-city");
  var dateInput = $("#travel-date");
  var searchError = $("#search-error");
  var cityList = $("#city-list");

  function renderCityOptions() {
    if (!cityList) {
      return;
    }
    cityList.innerHTML = getCities()
      .map(function (city) {
        return '<option value="' + escapeHtml(city) + '"></option>';
      })
      .join("");
  }

  function showSearchError(message) {
    searchError.textContent = message;
    searchError.hidden = false;
  }

  function clearSearchError() {
    searchError.hidden = true;
    searchError.textContent = "";
  }

  if (dateInput) {
    dateInput.min = todayISO();
    dateInput.value = todayISO();
  }

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      clearSearchError();

      var from = titleCaseCity(fromInput.value);
      var to = titleCaseCity(toInput.value);
      var date = dateInput.value;

      if (!from) {
        showSearchError("Please enter a departure city.");
        fromInput.focus();
        return;
      }
      if (!to) {
        showSearchError("Please enter a destination city.");
        toInput.focus();
        return;
      }
      if (from.toLowerCase() === to.toLowerCase()) {
        showSearchError("Departure and destination cities must be different.");
        toInput.focus();
        return;
      }
      if (!date) {
        showSearchError("Please choose your journey date.");
        dateInput.focus();
        return;
      }
      if (date < todayISO()) {
        showSearchError("Please choose today or a future date.");
        dateInput.focus();
        return;
      }

      state.search = { from: from, to: to, date: date };
      state.tripId = null;
      state.seats = [];
      state.passengers = [];

      $("#results-from").textContent = from;
      $("#results-to").textContent = to;
      $("#results-date").textContent = formatDate(date);

      renderBusList();
      navigate("results");
    });
  }

  var swapButton = $("#swap-route");
  if (swapButton) {
    swapButton.addEventListener("click", function () {
      var from = fromInput.value;
      fromInput.value = toInput.value;
      toInput.value = from;
      clearSearchError();
      fromInput.focus();
    });
  }

  /* ------------------------------------------------------------ filters --- */

  var sortSelect = $("#sort-select");
  var priceRange = $("#price-range");
  var priceRangeValue = $("#price-range-value");
  var typeFilters = $("#type-filters");
  var resetFilters = $("#reset-filters");
  var filtersToggle = $("#filters-toggle");
  var filtersPanel = $("#filters");

  function readFilters() {
    state.filters.sort = sortSelect ? sortSelect.value : "departure";
    state.filters.maxPrice = priceRange ? Number(priceRange.value) : 2000;
    state.filters.types = $$("input[type=checkbox]", typeFilters)
      .filter(function (input) {
        return input.checked;
      })
      .map(function (input) {
        return input.value;
      });
  }

  function matchingTrips() {
    var from = state.search.from.toLowerCase();
    var to = state.search.to.toLowerCase();

    var list = TRIPS.filter(function (trip) {
      return trip.from.toLowerCase() === from && trip.to.toLowerCase() === to;
    });

    list = list.filter(function (trip) {
      if (trip.fare > state.filters.maxPrice) {
        return false;
      }
      if (state.filters.types.length && state.filters.types.indexOf(trip.type) === -1) {
        return false;
      }
      return true;
    });

    var sort = state.filters.sort;
    list.sort(function (a, b) {
      if (sort === "price-low") {
        return a.fare - b.fare;
      }
      if (sort === "price-high") {
        return b.fare - a.fare;
      }
      if (sort === "arrival") {
        return toMinutes(a.arr) - toMinutes(b.arr);
      }
      if (sort === "seats") {
        return seatsLeft(b, state.search.date) - seatsLeft(a, state.search.date);
      }
      return toMinutes(a.dep) - toMinutes(b.dep);
    });

    return list;
  }

  function detectKnownCity(name) {
    var needle = String(name || "").toLowerCase();
    return getCities().filter(function (city) {
      return city.toLowerCase() === needle;
    }).length > 0;
  }

  function busCardHTML(trip, dateISO) {
    var left = seatsLeft(trip, dateISO);
    var soldOut = left === 0;
    return (
      '<article class="bus-card">' +
        '<div class="bus-card__thumb">' +
          '<img src="' + asset(trip.image) + '" alt="' + escapeHtml(trip.operator) + " coach" + '">' +
        "</div>" +
        '<div class="bus-card__body">' +
          '<div class="bus-card__head">' +
            '<h3 class="bus-card__operator">' + escapeHtml(trip.operator) + "</h3>" +
            '<span class="badge badge--' + trip.badge + '">' + escapeHtml(trip.type) + "</span>" +
          "</div>" +
          '<p class="bus-card__route">' + escapeHtml(trip.from) + " &rarr; " + escapeHtml(trip.to) + "</p>" +
          '<div class="bus-card__times">' +
            '<span class="bus-card__time"><strong>' + formatTime(trip.dep) + "</strong><span>" + escapeHtml(trip.from) + "</span></span>" +
            '<span class="bus-card__dur"><span>' + escapeHtml(trip.duration) + '</span><span class="rule"></span><span>' + trip.km + " km</span></span>" +
            '<span class="bus-card__time"><strong>' + formatTime(trip.arr) + "</strong><span>" + escapeHtml(trip.to) + "</span></span>" +
          "</div>" +
        "</div>" +
        '<div class="bus-card__side">' +
          '<p class="bus-card__fare">' + money(trip.fare) + "</p>" +
          '<p class="bus-card__left">' + (soldOut ? "Sold out" : left + " seats left") + "</p>" +
          '<button type="button" class="btn btn--primary btn--sm" data-select-trip="' + trip.id + '"' + (soldOut ? " disabled" : "") + ">" +
            (soldOut ? "Sold out" : "Select") +
          "</button>" +
        "</div>" +
      "</article>"
    );
  }

  function emptyStateHTML(title, text, actionLabel) {
    return (
      '<div class="empty">' +
        '<span class="empty__icon" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="3"/><path d="M3 11h18M6 20h12"/></svg>' +
        "</span>" +
        '<p class="empty__title">' + escapeHtml(title) + "</p>" +
        '<p class="empty__text">' + escapeHtml(text) + "</p>" +
        (actionLabel ? '<button type="button" class="btn btn--ghost btn--sm" data-empty-action="1">' + escapeHtml(actionLabel) + "</button>" : "") +
      "</div>"
    );
  }

  function renderBusList() {
    var host = $("#bus-list");
    var counter = $("#results-count");
    if (!host) {
      return;
    }

    readFilters();
    var list = matchingTrips();

    if (!detectKnownCity(state.search.from) || !detectKnownCity(state.search.to)) {
      host.innerHTML = emptyStateHTML(
        "We do not serve that route yet",
        "Try one of the demo cities: " + getCities().join(", ") + ".",
        "Change search"
      );
      if (counter) {
        counter.textContent = "0 buses found";
      }
      return;
    }

    if (!list.length) {
      var anyRoute = TRIPS.some(function (trip) {
        return (
          trip.from.toLowerCase() === state.search.from.toLowerCase() &&
          trip.to.toLowerCase() === state.search.to.toLowerCase()
        );
      });
      host.innerHTML = emptyStateHTML(
        anyRoute ? "No buses match your filters" : "No buses on this route",
        anyRoute
          ? "Try widening the price range or clearing the bus type filters."
          : "Khan Travels does not run this route in the demo. Pick another pair of cities.",
        anyRoute ? "Reset filters" : "Change search"
      );
      if (counter) {
        counter.textContent = "0 buses found";
      }
      return;
    }

    host.innerHTML = list
      .map(function (trip) {
        return busCardHTML(trip, state.search.date);
      })
      .join("");

    if (counter) {
      counter.textContent = list.length + (list.length === 1 ? " bus found" : " buses found");
    }
  }

  if ($("#bus-list")) {
    $("#bus-list").addEventListener("click", function (event) {
      var select = event.target.closest("[data-select-trip]");
      if (select) {
        openSeats(select.getAttribute("data-select-trip"));
        return;
      }
      if (event.target.closest("[data-empty-action]")) {
        if (matchingTrips().length === 0 && filterIsActive()) {
          resetFilterControls();
          renderBusList();
        } else {
          navigate("home");
        }
      }
    });
  }

  function filterIsActive() {
    return state.filters.maxPrice < 2000 || state.filters.types.length > 0;
  }

  function resetFilterControls() {
    if (sortSelect) {
      sortSelect.value = "departure";
    }
    if (priceRange) {
      priceRange.value = "2000";
    }
    if (priceRangeValue) {
      priceRangeValue.textContent = "₹2000";
    }
    $$("input[type=checkbox]", typeFilters).forEach(function (input) {
      input.checked = false;
    });
    readFilters();
  }

  [sortSelect, priceRange].forEach(function (control) {
    if (!control) {
      return;
    }
    control.addEventListener("input", function () {
      if (control === priceRange && priceRangeValue) {
        priceRangeValue.textContent = money(priceRange.value);
      }
      readFilters();
      renderBusList();
    });
    control.addEventListener("change", function () {
      readFilters();
      renderBusList();
    });
  });

  if (typeFilters) {
    typeFilters.addEventListener("change", function () {
      readFilters();
      renderBusList();
    });
  }

  if (resetFilters) {
    resetFilters.addEventListener("click", function () {
      resetFilterControls();
      renderBusList();
      toast("Filters reset.");
    });
  }

  if (filtersToggle) {
    filtersToggle.addEventListener("click", function () {
      var open = filtersPanel.classList.toggle("is-open");
      filtersToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* -------------------------------------------------------------- seats --- */

  function currentTrip() {
    return getTrip(state.tripId);
  }

  function tripSummaryHTML(trip, dateISO) {
    return (
      '<div class="trip-summary__thumb">' +
        '<img src="' + asset(trip.image) + '" alt="' + escapeHtml(trip.operator) + ' coach">' +
      "</div>" +
      '<div class="trip-summary__main">' +
        '<p class="trip-summary__op">' + escapeHtml(trip.operator) + "</p>" +
        '<p class="trip-summary__route">' + escapeHtml(trip.from) + " &rarr; " + escapeHtml(trip.to) + "</p>" +
      "</div>" +
      '<div class="trip-summary__meta">' +
        "<span><strong>" + escapeHtml(formatDate(dateISO)) + "</strong></span>" +
        "<span>" + formatTime(trip.dep) + " &ndash; " + formatTime(trip.arr) + " &middot; " + escapeHtml(trip.duration) + "</span>" +
      "</div>" +
      '<div class="trip-summary__fare">' +
        "<span>Fare per seat</span>" +
        "<strong>" + money(trip.fare) + " / seat</strong>" +
      "</div>"
    );
  }

  function sortSeats(seats) {
    return seats.slice().sort(function (a, b) {
      return toMinutes(a.slice(0, -1) + ":00") - toMinutes(b.slice(0, -1) + ":00") || a.slice(-1).localeCompare(b.slice(-1));
    });
  }

  function openSeats(tripId) {
    var trip = getTrip(tripId);
    if (!trip) {
      return;
    }
    state.tripId = tripId;
    state.seats = [];
    state.passengers = [];

    var summary = $("#trip-summary");
    if (summary) {
      summary.innerHTML = tripSummaryHTML(trip, state.search.date);
    }

    renderSeatMap();
    updateSeatSummary();
    navigate("seats");
  }

  function renderSeatMap() {
    var host = $("#seat-map");
    var trip = currentTrip();
    if (!host || !trip) {
      return;
    }

    var booked = bookedSeatSet(trip.id, state.search.date);
    var html = "";

    for (var row = 1; row <= SEAT_ROWS; row += 1) {
      html += '<span class="seat-row" aria-hidden="true">' + row + "</span>";
      for (var col = 0; col < SEAT_COLUMNS.length; col += 1) {
        if (col === 2) {
          html += '<span class="seat-aisle" aria-hidden="true"></span>';
        }
        var label = row + SEAT_COLUMNS[col];
        var isBooked = booked[label] === true;
        var isSelected = state.seats.indexOf(label) !== -1;
        var classes = "seat";
        if (isBooked) {
          classes += " is-booked";
        }
        if (isSelected) {
          classes += " is-selected";
        }
        html +=
          '<button type="button" class="' + classes + '" data-seat="' + label + '"' +
          (isBooked ? " disabled" : "") +
          ' aria-pressed="' + (isSelected ? "true" : "false") + '"' +
          ' aria-label="Seat ' + label + (isBooked ? ", already booked" : isSelected ? ", selected" : ", available") + '">' +
          label +
          "</button>";
      }
    }

    host.innerHTML = html;
  }

  function updateSeatSummary() {
    var trip = currentTrip();
    if (!trip) {
      return;
    }

    var chipsHost = $("#selected-chips");
    var seats = sortSeats(state.seats);

    if (chipsHost) {
      if (!seats.length) {
        chipsHost.innerHTML = '<p class="seat-chips__empty">No seats selected yet</p>';
      } else {
        chipsHost.innerHTML = seats
          .map(function (seat) {
            return '<span class="seat-chip">' + escapeHtml(seat) + "</span>";
          })
          .join("");
      }
    }

    var subtotal = seats.length * trip.fare;
    var service = seats.length * SERVICE_CHARGE_PER_SEAT;
    var total = subtotal + service;

    var perSeatLabel = $("#fare-per-seat-label");
    var perSeat = $("#fare-per-seat");
    var serviceCell = $("#fare-service");
    var totalCell = $("#fare-total");
    var hint = $("#seat-hint");
    var continueButton = $("#continue-seats");

    if (perSeatLabel) {
      perSeatLabel.textContent = seats.length
        ? money(trip.fare) + " × " + seats.length + (seats.length === 1 ? " seat" : " seats")
        : "Fare per seat";
    }
    if (perSeat) {
      perSeat.textContent = money(subtotal);
    }
    if (serviceCell) {
      serviceCell.textContent = money(service);
    }
    if (totalCell) {
      totalCell.textContent = money(total);
    }

    if (hint) {
      hint.classList.remove("is-warn");
      if (!seats.length) {
        hint.textContent = "Select up to " + MAX_SEATS + " seats to continue.";
      } else if (seats.length >= MAX_SEATS) {
        hint.textContent = "Maximum " + MAX_SEATS + " seats per booking reached.";
        hint.classList.add("is-warn");
      } else {
        hint.textContent = seats.length + (seats.length === 1 ? " seat" : " seats") + " selected · " + (MAX_SEATS - seats.length) + " more allowed.";
      }
    }

    if (continueButton) {
      continueButton.disabled = seats.length === 0;
    }
  }

  var seatMap = $("#seat-map");
  if (seatMap) {
    seatMap.addEventListener("click", function (event) {
      var button = event.target.closest("[data-seat]");
      if (!button || button.disabled) {
        return;
      }
      var seat = button.getAttribute("data-seat");
      var index = state.seats.indexOf(seat);

      if (index !== -1) {
        state.seats.splice(index, 1);
      } else {
        if (state.seats.length >= MAX_SEATS) {
          toast("You can select up to " + MAX_SEATS + " seats per booking.", "error");
          return;
        }
        state.seats.push(seat);
      }

      syncPassengerDrafts();
      button.classList.toggle("is-selected", state.seats.indexOf(seat) !== -1);
      button.setAttribute("aria-pressed", state.seats.indexOf(seat) !== -1 ? "true" : "false");
      button.setAttribute("aria-label", "Seat " + seat + (state.seats.indexOf(seat) !== -1 ? ", selected" : ", available"));
      updateSeatSummary();
    });
  }

  var continueSeats = $("#continue-seats");
  if (continueSeats) {
    continueSeats.addEventListener("click", function () {
      if (!state.seats.length) {
        return;
      }
      renderPassengerForms();
      navigate("passengers");
    });
  }

  /* --------------------------------------------------------- passengers --- */

  function syncPassengerDrafts() {
    var bySeat = {};
    state.passengers.forEach(function (passenger) {
      bySeat[passenger.seat] = passenger;
    });

    state.passengers = sortSeats(state.seats).map(function (seat) {
      var existing = bySeat[seat];
      return {
        seat: seat,
        name: existing ? existing.name : "",
        phone: existing ? existing.phone : "",
        email: existing ? existing.email : ""
      };
    });
  }

  function passengerCardHTML(passenger, index) {
    var id = "p" + index;
    var emailField =
      index === 0
        ? '<div class="field">' +
            '<label for="' + id + '-email">Email address <span class="label-optional">(optional)</span></label>' +
            '<div class="field__control">' +
              '<span class="field__icon" aria-hidden="true">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>' +
              "</span>" +
              '<input type="email" id="' + id + '-email" data-field="email" data-seat="' + passenger.seat + '" value="' + escapeHtml(passenger.email) + '" placeholder="you@example.com" autocomplete="email">' +
            "</div>" +
          "</div>"
        : "";

    return (
      '<section class="passenger-card">' +
        '<div class="passenger-card__head">' +
          '<h3 class="passenger-card__title">Passenger ' + (index + 1) + "</h3>" +
          '<span class="passenger-card__seat">Seat ' + escapeHtml(passenger.seat) + "</span>" +
        "</div>" +
        '<div class="field">' +
          '<label for="' + id + '-name">Full Name</label>' +
          '<div class="field__control">' +
            '<span class="field__icon" aria-hidden="true">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/></svg>' +
            "</span>" +
            '<input type="text" id="' + id + '-name" data-field="name" data-seat="' + passenger.seat + '" value="' + escapeHtml(passenger.name) + '" placeholder="Enter name" autocomplete="name" aria-describedby="' + id + '-name-error">' +
          "</div>" +
          '<p class="field-error" id="' + id + '-name-error" role="alert"></p>' +
        "</div>" +
        '<div class="field">' +
          '<label for="' + id + '-phone">Phone Number</label>' +
          '<div class="field__control">' +
            '<span class="field__icon" aria-hidden="true">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z"/></svg>' +
            "</span>" +
            '<input type="tel" id="' + id + '-phone" data-field="phone" data-seat="' + passenger.seat + '" value="' + escapeHtml(passenger.phone) + '" placeholder="Enter phone number" inputmode="tel" autocomplete="tel" aria-describedby="' + id + '-phone-error">' +
          "</div>" +
          '<p class="field-error" id="' + id + '-phone-error" role="alert"></p>' +
        "</div>" +
        emailField +
      "</section>"
    );
  }

  function renderPassengerForms() {
    syncPassengerDrafts();

    var trip = currentTrip();
    var summary = $("#passenger-trip-summary");
    if (summary && trip) {
      summary.innerHTML = tripSummaryHTML(trip, state.search.date);
    }

    var host = $("#passenger-fields");
    if (!host) {
      return;
    }
    host.innerHTML = state.passengers
      .map(function (passenger, index) {
        return passengerCardHTML(passenger, index);
      })
      .join("");
  }

  var passengerForm = $("#passenger-form");
  if (passengerForm) {
    passengerForm.addEventListener("input", function (event) {
      var field = event.target.getAttribute("data-field");
      if (!field) {
        return;
      }
      var seat = event.target.getAttribute("data-seat");
      var draft = state.passengers.filter(function (item) {
        return item.seat === seat;
      })[0];
      if (draft) {
        draft[field] = event.target.value;
      }
      if (event.target.getAttribute("aria-invalid") === "true") {
        event.target.removeAttribute("aria-invalid");
        var errorNode = document.getElementById(event.target.id + "-error");
        if (errorNode) {
          errorNode.textContent = "";
        }
      }
    });
  }

  /* The DOM is the source of truth at submit time so a value can never be lost. */
  function collectPassengersFromDom() {
    var inputs = $$("[data-field]", passengerForm);
    inputs.forEach(function (input) {
      var field = input.getAttribute("data-field");
      var seat = input.getAttribute("data-seat");
      var draft = state.passengers.filter(function (item) {
        return item.seat === seat;
      })[0];
      if (draft) {
        draft[field] = input.value;
      }
    });
  }

  function setFieldError(input, message) {
    var errorNode = document.getElementById(input.id + "-error");
    if (message) {
      input.setAttribute("aria-invalid", "true");
      if (errorNode) {
        errorNode.textContent = message;
      }
    } else {
      input.removeAttribute("aria-invalid");
      if (errorNode) {
        errorNode.textContent = "";
      }
    }
  }

  function validatePassengers() {
    var inputs = $$("[data-field]", passengerForm);
    var firstInvalid = null;

    inputs.forEach(function (input) {
      var field = input.getAttribute("data-field");
      var value = input.value.trim();

      if (field === "name") {
        if (!value) {
          setFieldError(input, "Please enter the passenger name.");
        } else if (value.length < 2) {
          setFieldError(input, "Name must be at least 2 characters.");
        } else if (!/^[A-Za-z\u00C0-\u024F.'\- ]+$/.test(value)) {
          setFieldError(input, "Use letters, spaces, dots or hyphens only.");
        } else {
          setFieldError(input, "");
        }
      }

      if (field === "phone") {
        var digits = value.replace(/[\s()+-]/g, "");
        if (!value) {
          setFieldError(input, "Please enter a phone number.");
        } else if (!/^\d+$/.test(digits)) {
          setFieldError(input, "Phone number should contain digits only.");
        } else if (digits.length < 10 || digits.length > 13) {
          setFieldError(input, "Enter a valid phone number (10 to 13 digits).");
        } else {
          setFieldError(input, "");
        }
      }

      if (field === "email" && value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          setFieldError(input, "Enter a valid email address or leave it blank.");
        } else {
          setFieldError(input, "");
        }
      }

      if (input.getAttribute("aria-invalid") === "true" && !firstInvalid) {
        firstInvalid = input;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      toast("Please fix the highlighted passenger details.", "error");
      return false;
    }
    return true;
  }

  if (passengerForm) {
    passengerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      collectPassengersFromDom();
      if (!validatePassengers()) {
        return;
      }
      createBooking();
    });
  }

  /* ---------------------------------------------------------- bookings --- */

  function createBooking() {
    var trip = currentTrip();
    if (!trip || !state.seats.length) {
      toast("Your seat selection expired. Please pick seats again.", "error");
      return;
    }

    var bookings = loadBookings();
    var seats = sortSeats(state.seats);
    var subtotal = seats.length * trip.fare;
    var service = seats.length * SERVICE_CHARGE_PER_SEAT;

    var booking = {
      ref: makeBookingRef(state.search.date, bookings),
      tripId: trip.id,
      operator: trip.operator,
      type: trip.type,
      image: trip.image,
      from: trip.from,
      to: trip.to,
      date: state.search.date,
      dep: trip.dep,
      arr: trip.arr,
      duration: trip.duration,
      seats: seats,
      passengers: state.passengers.map(function (passenger) {
        return {
          seat: passenger.seat,
          name: passenger.name.trim(),
          phone: passenger.phone.trim(),
          email: passenger.email.trim()
        };
      }),
      farePerSeat: trip.fare,
      serviceCharge: service,
      total: subtotal + service,
      status: "confirmed",
      createdAt: new Date().toISOString()
    };

    bookings.push(booking);
    saveBookings(bookings);

    state.lastBookingRef = booking.ref;
    renderConfirmation(booking);
    toast("Booking " + booking.ref + " confirmed.");
    navigate("confirmed");
  }

  function renderConfirmation(booking) {
    var refNode = $("#confirm-ref");
    if (refNode) {
      refNode.textContent = booking.ref;
    }

    var grid = $("#confirm-grid");
    if (!grid) {
      return;
    }

    var names = booking.passengers
      .map(function (passenger) {
        return passenger.name;
      })
      .join(", ");

    var rows = [
      ["Passenger Name", names],
      ["Journey Date", formatDate(booking.date)],
      ["Bus Name", booking.operator],
      ["Departure Time", formatTime(booking.dep)],
      ["From", booking.from],
      ["Seat Numbers", booking.seats.join(", ")],
      ["To", booking.to],
      ["Total Fare", money(booking.total)]
    ];

    grid.innerHTML = rows
      .map(function (row) {
        return "<div><dt>" + escapeHtml(row[0]) + "</dt><dd>" + escapeHtml(row[1]) + "</dd></div>";
      })
      .join("");
  }

  var viewBookingsButton = $("#confirm-view-bookings");
  if (viewBookingsButton) {
    viewBookingsButton.addEventListener("click", function () {
      state.stack = [];
      renderBookings();
      show("bookings");
    });
  }

  var downloadButton = $("#confirm-download");
  if (downloadButton) {
    downloadButton.addEventListener("click", function () {
      var bookings = loadBookings();
      var booking = null;
      for (var i = 0; i < bookings.length; i += 1) {
        if (bookings[i].ref === state.lastBookingRef) {
          booking = bookings[i];
          break;
        }
      }
      if (!booking) {
        booking = bookings[bookings.length - 1];
      }
      if (booking) {
        printTicket(booking);
      }
    });
  }

  function statusLabel(booking) {
    return booking.status === "cancelled" ? "Cancelled" : "Confirmed";
  }

  function bookingCardHTML(booking) {
    var cancelled = booking.status === "cancelled";
    var names = (booking.passengers || [])
      .map(function (passenger) {
        return passenger.name;
      })
      .join(", ");

    return (
      '<article class="booking-card' + (cancelled ? " is-cancelled" : "") + '" data-ref="' + escapeHtml(booking.ref) + '">' +
        '<div class="booking-card__thumb">' +
          '<img src="' + asset(booking.image || "bus-cream.svg") + '" alt="' + escapeHtml(booking.operator) + ' coach">' +
        "</div>" +
        '<div class="booking-card__body">' +
          '<div class="booking-card__top">' +
            '<h3 class="booking-card__op">' + escapeHtml(booking.operator) + "</h3>" +
            '<span class="status status--' + (cancelled ? "cancelled" : "confirmed") + '">' + statusLabel(booking) + "</span>" +
          "</div>" +
          '<p class="booking-card__route">' + escapeHtml(booking.from) + " &rarr; " + escapeHtml(booking.to) + "</p>" +
          '<div class="booking-card__meta">' +
            "<span>" +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>' +
              escapeHtml(formatDate(booking.date)) +
            "</span>" +
            "<span>" +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>' +
              formatTime(booking.dep) + " &ndash; " + formatTime(booking.arr) +
            "</span>" +
            "<span>Seats: <strong>" + escapeHtml(booking.seats.join(", ")) + "</strong></span>" +
            (names ? "<span>Passengers: " + escapeHtml(names) + "</span>" : "") +
          "</div>" +
        "</div>" +
        '<div class="booking-card__side">' +
          '<span class="booking-card__ref">' + escapeHtml(booking.ref) + "</span>" +
          '<span class="booking-card__fare">' + money(booking.total) + "</span>" +
          (cancelled
            ? '<span class="booking-card__note">Seats released</span>'
            : '<button type="button" class="btn btn--outline btn--sm" data-cancel="' + escapeHtml(booking.ref) + '">Cancel Booking</button>' +
              '<button type="button" class="btn btn--ghost btn--sm" data-ticket="' + escapeHtml(booking.ref) + '">Ticket</button>') +
        "</div>" +
      "</article>"
    );
  }

  function renderBookings() {
    var host = $("#bookings-list");
    var count = $("#bookings-count");
    if (!host) {
      return;
    }

    var bookings = loadBookings().slice().sort(function (a, b) {
      return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
    });

    var active = bookings.filter(bookingCountsAsActive).length;

    if (count) {
      if (!bookings.length) {
        count.textContent = "No reservations yet.";
      } else {
        count.textContent =
          bookings.length + (bookings.length === 1 ? " reservation" : " reservations") +
          " · " + active + " active";
      }
    }

    if (!bookings.length) {
      host.innerHTML = emptyStateHTML(
        "No bookings yet",
        "Search a route and reserve a seat — your confirmed trips will appear here.",
        "Find a bus"
      );
      return;
    }

    host.innerHTML = bookings.map(bookingCardHTML).join("");
  }

  var bookingsList = $("#bookings-list");
  if (bookingsList) {
    bookingsList.addEventListener("click", function (event) {
      var cancelButton = event.target.closest("[data-cancel]");
      if (cancelButton) {
        requestCancellation(cancelButton.getAttribute("data-cancel"));
        return;
      }
      var ticketButton = event.target.closest("[data-ticket]");
      if (ticketButton) {
        var ref = ticketButton.getAttribute("data-ticket");
        var booking = loadBookings().filter(function (item) {
          return item.ref === ref;
        })[0];
        if (booking) {
          printTicket(booking);
        }
        return;
      }
      if (event.target.closest("[data-empty-action]")) {
        navigate("home");
      }
    });
  }

  function requestCancellation(ref) {
    var bookings = loadBookings();
    var booking = bookings.filter(function (item) {
      return item.ref === ref;
    })[0];
    if (!booking || booking.status === "cancelled") {
      return;
    }

    confirmDialog({
      title: "Cancel booking " + booking.ref + "?",
      body:
        "Seats " + booking.seats.join(", ") + " on " + formatDate(booking.date) +
        " will be released in this demo. The booking stays in your history marked as cancelled.",
      confirmLabel: "Yes, cancel booking",
      cancelLabel: "Keep booking"
    }).then(function (confirmed) {
      if (!confirmed) {
        return;
      }
      bookings.forEach(function (item) {
        if (item.ref === ref) {
          item.status = "cancelled";
          item.cancelledAt = new Date().toISOString();
        }
      });
      saveBookings(bookings);
      renderBookings();
      if (state.tripId && currentTrip()) {
        renderSeatMap();
        updateSeatSummary();
      }
      toast("Booking " + ref + " cancelled. Seats are available again.");
    });
  }

  /* ------------------------------------------------------------ ticket --- */

  function printTicket(booking) {
    var host = $("#ticket-print");
    if (!host) {
      return;
    }

    var names = (booking.passengers || [])
      .map(function (passenger) {
        return passenger.name + " (" + passenger.seat + ")";
      })
      .join(", ");

    var rows = [
      ["Booking Reference", booking.ref],
      ["Status", booking.status === "cancelled" ? "Cancelled" : "Confirmed"],
      ["Bus Operator", booking.operator],
      ["Bus Type", booking.type || ""],
      ["Route", booking.from + " to " + booking.to],
      ["Journey Date", formatDate(booking.date)],
      ["Departure", formatTime(booking.dep)],
      ["Arrival", formatTime(booking.arr)],
      ["Seats", booking.seats.join(", ")],
      ["Passengers", names],
      ["Fare per Seat", money(booking.farePerSeat)],
      ["Total Fare", money(booking.total)]
    ];

    host.innerHTML =
      '<div class="ticket-print__inner">' +
        '<div class="ticket-print__head">' +
          '<div class="ticket-print__brand">' +
            '<span class="ticket-print__mark" aria-hidden="true">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="#153D32" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="3.5"/><path d="M3 12h18"/><path d="M6 18v2M18 18v2"/><path d="M7.5 15.5h.01M16.5 15.5h.01"/></svg>' +
            "</span>" +
            "<div>" +
              '<div class="ticket-print__name">Khan Travels</div>' +
              '<div class="ticket-print__tagline">Safe Journey &middot; Better Tomorrow</div>' +
            "</div>" +
          "</div>" +
          '<div class="ticket-print__ref"><span>E-Ticket</span><strong>' + escapeHtml(booking.ref) + "</strong></div>" +
        "</div>" +
        '<dl class="ticket-print__grid">' +
          rows
            .map(function (row) {
              return "<div><dt>" + escapeHtml(row[0]) + "</dt><dd>" + escapeHtml(row[1]) + "</dd></div>";
            })
            .join("") +
        "</dl>" +
        '<div class="ticket-print__foot">' +
          "<span>Demo reservation &mdash; no payment was processed.</span>" +
          "<span>" + escapeHtml(booking.ref) + "</span>" +
        "</div>" +
      "</div>";

    window.print();
  }

  /* --------------------------------------------------------------- init --- */

  function init() {
    renderCityOptions();

    if (priceRange && priceRangeValue) {
      priceRangeValue.textContent = money(priceRange.value);
    }
    readFilters();

    /* Keep seat availability honest on a fresh load. */
    renderBusList();
    renderBookings();
    show("home", { scroll: false });

    var hasBookings = loadBookings().length > 0;
    if (hasBookings) {
      state.stack = [];
    }
  }

  init();
})();
