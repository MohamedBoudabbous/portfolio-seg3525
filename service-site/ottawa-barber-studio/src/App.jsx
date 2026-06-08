import { useState } from "react";
import "./App.css";

const services = [
  {
    name: "Student Haircut",
    price: 25,
    description: "Clean, classic, and affordable. Perfect for students.",
  },
  {
    name: "Classic Haircut",
    price: 35,
    description: "A timeless haircut with professional styling.",
  },
  {
    name: "Beard Trim",
    price: 20,
    description: "Shape, trim, and define your beard.",
  },
  {
    name: "Haircut + Beard",
    price: 50,
    description: "A complete grooming package for a polished look.",
  },
];

const barbers = [
  {
    name: "Adam",
    role: "Senior Barber",
    description: "Classic cuts, beard styling, and premium finishing.",
  },
  {
    name: "Jessica",
    role: "Style Specialist",
    description: "Modern cuts, clean details, and personalized styling.",
  },
  {
    name: "Karim",
    role: "Master Barber",
    description: "Premium grooming, fades, and professional service.",
  },
];

function SignupPage({ signupData, handleSignupChange, enterSite, enterAsGuest }) {
  return (
    <main className="signup-page">
      <section className="signup-left">
        <div className="signup-brand">
          <div className="logo-mark signup-logo" aria-hidden="true">✂</div>
          <div>
            <h1>Ottawa</h1>
            <span>Barber Studio</span>
          </div>
        </div>

        <div className="signup-copy">
          <p className="signup-eyebrow">Online booking access</p>
          <h2>Start with a clean booking profile.</h2>
          <p>
            Enter your basic contact details to access the appointment experience.
            This is a front-end prototype, so no backend verification is required.
          </p>
        </div>

        <div className="signup-benefits">
          <div>
            <strong>Fast booking</strong>
            <span>Reserve without calling the shop.</span>
          </div>
          <div>
            <strong>Premium experience</strong>
            <span>Choose service, barber, day, and time.</span>
          </div>
          <div>
            <strong>Student option</strong>
            <span>Quick $25 student haircut flow.</span>
          </div>
        </div>
      </section>

      <section className="signup-panel" aria-label="Create booking profile">
        <div className="signup-card">
          <p className="signup-eyebrow">Create account</p>
          <h2>Welcome in.</h2>
          <p className="signup-muted">
            Use any details for the prototype. The form only simulates access to
            the site.
          </p>

          <form className="signup-form" onSubmit={enterSite}>
            <label>
              Full name
              <input
                name="name"
                value={signupData.name}
                onChange={handleSignupChange}
                type="text"
                placeholder="Daniel Roy"
                autoComplete="name"
              />
            </label>

            <label>
              Email
              <input
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                type="email"
                placeholder="daniel@email.com"
                autoComplete="email"
              />
            </label>

            <label>
              Phone number
              <input
                name="phone"
                value={signupData.phone}
                onChange={handleSignupChange}
                type="tel"
                placeholder="+1 613-555-0198"
                autoComplete="tel"
              />
            </label>

            <div className="signup-preference">
              <span>Booking preference</span>

              <div className="preference-grid">
                {["Premium grooming", "Student quick booking", "Haircut + Beard", "Beard Trim"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={signupData.preference === option ? "preference-option active" : "preference-option"}
                    onClick={() =>
                      handleSignupChange({
                        target: {
                          name: "preference",
                          value: option,
                        },
                      })
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button className="signup-primary" type="submit">
              Enter the site
            </button>

            <button className="signup-secondary" type="button" onClick={enterAsGuest}>
              Continue as guest
            </button>
          </form>

          <div className="signup-trust">
            <span>Secure prototype</span>
            <span>No real account verification</span>
            <span>UX demo only</span>
          </div>
        </div>
      </section>
    </main>
  );
}

const days = ["Wednesday", "Thursday", "Friday", "Saturday"];
const times = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

function App() {
  const [entered, setEntered] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    preference: "Premium grooming",
  });
  const [page, setPage] = useState("premium");
  const [clientName, setClientName] = useState("Daniel Roy");
  const [selectedService, setSelectedService] = useState(services[3]);
  const [selectedBarber, setSelectedBarber] = useState(barbers[0]);
  const [selectedDay, setSelectedDay] = useState("Friday");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [confirmed, setConfirmed] = useState(false);

  const goToPremium = () => {
    setPage("premium");
    setClientName(signupData.name.trim() || "Daniel Roy");
    setSelectedService(services[3]);
    setSelectedBarber(barbers[0]);
    setSelectedDay("Friday");
    setSelectedTime("10:00 AM");
    setConfirmed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStudent = () => {
    setPage("student");
    setClientName("Student client");
    setSelectedService(services[0]);
    setSelectedBarber(barbers[0]);
    setSelectedDay("Wednesday");
    setSelectedTime("2:00 PM");
    setConfirmed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStudentFlow = () => {
    document.getElementById("student-flow")?.scrollIntoView({ behavior: "smooth" });
  };

  const showConfirmation = () => {
    setConfirmed(true);
    setTimeout(() => {
      document.getElementById("confirmation")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const resetBooking = () => {
    setConfirmed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleServiceSelect = (service) => {
    setClientName(page === "student" ? (signupData.name.trim() || "Student client") : (signupData.name.trim() || "Daniel Roy"));
    setSelectedService(service);
    setConfirmed(false);
  };

  const handleBarberSelect = (barber) => {
    setSelectedBarber(barber);
    setConfirmed(false);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setConfirmed(false);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setConfirmed(false);
  };

  const handleStudentFastStart = () => {
    setClientName("Student client");
    setSelectedService(services[0]);
    setSelectedBarber(barbers[0]);
    setSelectedDay("Wednesday");
    setSelectedTime("2:00 PM");
    setConfirmed(false);
    scrollToStudentFlow();
  };

  const handleStudentConfirm = () => {
    setClientName("Student client");
    showConfirmation();
  };

 const handlePremiumConfirm = () => {
  setClientName(signupData.name.trim() || "Daniel Roy");
  showConfirmation();
};

const handleSignupChange = (event) => {
  const { name, value } = event.target;

  setSignupData((current) => ({
    ...current,
    [name]: value,
  }));
};

const enterSite = (event) => {
  event.preventDefault();

  const cleanName = signupData.name.trim();

  if (signupData.preference === "Student quick booking") {
    setPage("student");
    setClientName(cleanName || "Student client");
    setSelectedService(services[0]);
    setSelectedBarber(barbers[0]);
    setSelectedDay("Wednesday");
    setSelectedTime("2:00 PM");
  } else {
    setPage("premium");
    setClientName(cleanName || "Daniel Roy");
    setSelectedService(services[3]);
    setSelectedBarber(barbers[0]);
    setSelectedDay("Friday");
    setSelectedTime("10:00 AM");
  }

  setConfirmed(false);
  setEntered(true);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const enterAsGuest = () => {
  setPage("premium");
  setClientName("Guest client");
  setSelectedService(services[3]);
  setSelectedBarber(barbers[0]);
  setSelectedDay("Friday");
  setSelectedTime("10:00 AM");
  setConfirmed(false);
  setEntered(true);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

if (!entered) {
  return (
    <SignupPage
      signupData={signupData}
      handleSignupChange={handleSignupChange}
      enterSite={enterSite}
      enterAsGuest={enterAsGuest}
    />
  );
}

return (
  <div className={page === "student" ? "app student-app" : "app"} id="top">
      <nav className="navbar" aria-label="Main navigation">
        <button className="brand brand-button" type="button" onClick={goToPremium}>
          <div className="logo-mark" aria-hidden="true">✂</div>
          <div>
            <h1>Ottawa</h1>
            <span>Barber Studio</span>
          </div>
        </button>

        <div className="nav-links">
          <button type="button" onClick={goToPremium}>Premium Home</button>
          <button type="button" onClick={goToStudent}>Student Booking</button>
          {page === "premium" && (
            <>
              <a href="#services">Services</a>
              <a href="#barbers">Barbers</a>
              <a href="#booking">Booking</a>
            </>
          )}
          {page === "student" && <a href="#student-flow">Quick Flow</a>}
          <a href="#contact">Contact</a>
        </div>

        <button
          className="nav-button"
          type="button"
          onClick={page === "student" ? handleStudentFastStart : scrollToBooking}
        >
          Book appointment
        </button>
      </nav>

      {page === "student" ? (
        <StudentPage
          confirmed={confirmed}
          selectedService={selectedService}
          selectedBarber={selectedBarber}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          handleServiceSelect={handleServiceSelect}
          handleBarberSelect={handleBarberSelect}
          handleDaySelect={handleDaySelect}
          handleTimeSelect={handleTimeSelect}
          handleStudentFastStart={handleStudentFastStart}
          handleStudentConfirm={handleStudentConfirm}
          resetBooking={resetBooking}
          clientName={clientName}
        />
      ) : (
        <PremiumPage
          confirmed={confirmed}
          clientName={clientName}
          selectedService={selectedService}
          selectedBarber={selectedBarber}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          handleConfirm={handlePremiumConfirm}
          resetBooking={resetBooking}
          handleServiceSelect={handleServiceSelect}
          handleBarberSelect={handleBarberSelect}
          handleDaySelect={handleDaySelect}
          handleTimeSelect={handleTimeSelect}
        />
      )}

      <section id="contact" className={page === "student" ? "student-contact-section" : "section contact-section"}>
        <div className="contact-card">
          <p className={page === "student" ? "student-eyebrow" : "eyebrow"}>Contact</p>
          <h2>Visit Ottawa Barber Studio</h2>
          <div className="contact-grid">
            <div>
              <span>Location</span>
              <strong>123 Bank Street, Ottawa, ON</strong>
            </div>
            <div>
              <span>Hours</span>
              <strong>Mon – Fri: 9AM – 7PM</strong>
              <strong>Sat: 10AM – 5PM</strong>
            </div>
            <div>
              <span>Call or text</span>
              <strong>+1 613-555-0198</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>ottawabarberstudio@email.com</strong>
            </div>
          </div>
        </div>
      </section>

      <footer>Designed by Mohamed Boudabbous</footer>
    </div>
  );
}

function StudentPage({
  confirmed,
  selectedService,
  selectedBarber,
  selectedDay,
  selectedTime,
  handleServiceSelect,
  handleBarberSelect,
  handleDaySelect,
  handleTimeSelect,
  handleStudentFastStart,
  handleStudentConfirm,
  resetBooking,
  clientName,
}) {
  return (
    <main>
      <header className="student-hero">
        <div className="student-hero-left">
          <p className="student-eyebrow">Student-friendly prices</p>
          <h2>Fresh cuts near uOttawa.</h2>
          <p>
            Book a clean student haircut quickly, compare the key details, and
            confirm online without calling the shop.
          </p>

          <div className="student-hero-actions">
            <button className="student-primary-button" type="button" onClick={handleStudentFastStart}>
              Book Student Haircut
            </button>
            <a className="student-secondary-button" href="#student-flow">
              See the flow
            </a>
          </div>

          <div className="student-stats">
            <button type="button" onClick={() => handleServiceSelect(services[0])}>
              <strong>$25</strong>
              <span>Student price</span>
            </button>
            <button type="button" onClick={() => handleTimeSelect("2:00 PM")}>
              <strong>30 min</strong>
              <span>Fast service</span>
            </button>
            <button type="button" onClick={handleStudentFastStart}>
              <strong>Online</strong>
              <span>No phone call</span>
            </button>
          </div>
        </div>

        <aside className="student-booking-card">
          <div className="student-image-card"></div>
          <div className="student-card-top">
            <span>Selected service</span>
            <strong>{selectedService.name}</strong>
          </div>

          <div className="student-price-row">
            <span>Only</span>
            <strong>${selectedService.price}</strong>
          </div>

          <div className="student-mini-summary">
            <div>
              <span>Date</span>
              <strong>{selectedDay}</strong>
            </div>
            <div>
              <span>Time</span>
              <strong>{selectedTime}</strong>
            </div>
            <div>
              <span>Barber</span>
              <strong>{selectedBarber.name}</strong>
            </div>
          </div>

          <button className="student-primary-button full-student-button" type="button" onClick={handleStudentConfirm}>
            Confirm quick booking
          </button>
        </aside>
      </header>

      <section id="student-flow" className="student-flow-section">
        <div className="student-flow-heading">
          <p className="student-eyebrow">Quick flow</p>
          <h2>Three simple booking steps</h2>
          <p>
            Each card below is interactive. The user can select the student service,
            choose a time, and confirm the appointment.
          </p>
        </div>

        <div className="student-flow-grid">
          <button
            className={selectedService.name === "Student Haircut" ? "student-step-card active" : "student-step-card"}
            type="button"
            onClick={() => handleServiceSelect(services[0])}
          >
            <span>01</span>
            <h3>Choose student service</h3>
            <p>Student Haircut is highlighted as the fastest and most affordable option.</p>
            <strong>Selected: {selectedService.name}</strong>
          </button>

          <div className="student-step-card">
            <span>02</span>
            <h3>Choose day and time</h3>
            <p>Select the appointment day and time directly without opening a dropdown.</p>

            <div className="student-choice-group">
              <strong>Day</strong>
              <div className="student-time-buttons">
                {["Wednesday", "Thursday", "Friday"].map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={selectedDay === day ? "student-pill active" : "student-pill"}
                    onClick={() => handleDaySelect(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="student-choice-group">
              <strong>Time</strong>
              <div className="student-time-buttons">
                {["11:00 AM", "2:00 PM", "4:00 PM"].map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={selectedTime === time ? "student-pill active" : "student-pill"}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="student-step-card confirm-card" type="button" onClick={handleStudentConfirm}>
            <span>03</span>
            <h3>Confirm online</h3>
            <p>Confirm the appointment with one clear action button.</p>
            <strong>Confirm now</strong>
          </button>
        </div>

        <div className="student-final-panel">
          <div>
            <p className="student-eyebrow">Ready to book</p>
            <h2>{selectedService.name} · {selectedDay} · {selectedTime}</h2>
            <p>
              The summary updates before confirmation so the user can verify
              the important details quickly.
            </p>
          </div>

          <button className="student-primary-button" type="button" onClick={handleStudentConfirm}>
            Confirm booking
          </button>
        </div>
      </section>

      {confirmed && (
        <Confirmation
          clientName={clientName}
          selectedService={selectedService}
          selectedBarber={selectedBarber}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          resetBooking={resetBooking}
          studentMode
        />
      )}
    </main>
  );
}

function PremiumPage({
  confirmed,
  clientName,
  selectedService,
  selectedBarber,
  selectedDay,
  selectedTime,
  handleConfirm,
  resetBooking,
  handleServiceSelect,
  handleBarberSelect,
  handleDaySelect,
  handleTimeSelect,
}) {
  return (
    <main>
      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">Downtown Ottawa</p>
          <h2>
            Premium grooming in <span>downtown Ottawa</span>
          </h2>
          <p className="hero-text">
            Simple online booking for clean haircuts, beard trims, and
            student-friendly grooming services in downtown Ottawa.
          </p>

          <div className="hero-actions">
            <a href="#booking" className="primary-button">Book premium service</a>
            <a href="#services" className="secondary-button">View services</a>
          </div>

          <div className="hero-benefits">
            <div>
              <strong>Clean cuts</strong>
              <span>Precision & style</span>
            </div>
            <div>
              <strong>Online booking</strong>
              <span>Fast & convenient</span>
            </div>
            <div>
              <strong>Student pricing</strong>
              <span>Affordable options</span>
            </div>
          </div>
        </div>

        <aside className="hero-card">
          <p>Most popular</p>
          <h3>Haircut + Beard</h3>
          <span className="price">$50</span>
          <small>Full grooming package with a premium finish.</small>
        </aside>
      </header>

      <section id="services" className="section">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Choose your service</h2>
          <p>Compare prices, select a service, and continue toward a fast online booking.</p>
        </div>

        <div className="service-grid">
          {services.map((service) => {
            const isSelected = selectedService.name === service.name;

            return (
              <button
                key={service.name}
                type="button"
                className={isSelected ? "service-card selected" : "service-card"}
                onClick={() => handleServiceSelect(service)}
                aria-pressed={isSelected}
              >
                <div>
                  {isSelected && <span className="selected-badge">Selected</span>}
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <strong>${service.price}</strong>
              </button>
            );
          })}
        </div>
      </section>

      <section id="barbers" className="section dark-section">
        <div className="section-heading">
          <p className="eyebrow">Barbers</p>
          <h2>Choose your barber</h2>
          <p>Choose a barber based on style, experience, and the service you want.</p>
        </div>

        <div className="barber-grid">
          {barbers.map((barber) => {
            const isSelected = selectedBarber.name === barber.name;

            return (
              <button
                key={barber.name}
                type="button"
                className={isSelected ? "barber-card selected" : "barber-card"}
                onClick={() => handleBarberSelect(barber)}
                aria-pressed={isSelected}
              >
                {isSelected && <span className="selected-badge">Selected barber</span>}
                <div className="avatar" aria-hidden="true">{barber.name.charAt(0)}</div>
                <h3>{barber.name}</h3>
                <strong>{barber.role}</strong>
                <p>{barber.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section id="booking" className="section booking-section">
        <div className="booking-layout">
          <div>
            <p className="eyebrow">Booking</p>
            <h2>Book your appointment</h2>
            <p>
              Review your selected service and barber, choose a convenient time,
              then confirm your appointment.
            </p>

            <div className="form-row">
              <span className="field-label">Day</span>
              <div className="option-grid">
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={selectedDay === day ? "option-button active" : "option-button"}
                    onClick={() => handleDaySelect(day)}
                    aria-pressed={selectedDay === day}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <span className="field-label">Time</span>
              <div className="option-grid time-grid">
                {times.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={selectedTime === time ? "option-button active" : "option-button"}
                    onClick={() => handleTimeSelect(time)}
                    aria-pressed={selectedTime === time}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <button className="primary-button full" type="button" onClick={handleConfirm}>
              Confirm appointment
            </button>
          </div>

          <BookingSummary
            clientName={clientName}
            selectedService={selectedService}
            selectedBarber={selectedBarber}
            selectedDay={selectedDay}
            selectedTime={selectedTime}
          />
        </div>
      </section>

      {confirmed && (
        <Confirmation
          clientName={clientName}
          selectedService={selectedService}
          selectedBarber={selectedBarber}
          selectedDay={selectedDay}
          selectedTime={selectedTime}
          resetBooking={resetBooking}
        />
      )}
    </main>
  );
}

function BookingSummary({
  clientName,
  selectedService,
  selectedBarber,
  selectedDay,
  selectedTime,
}) {
  return (
    <aside className="summary-card" aria-label="Current booking summary">
      <p className="eyebrow">Your selection</p>
      <div className="summary-line">
        <span>Client</span>
        <strong>{clientName}</strong>
      </div>
      <div className="summary-line">
        <span>Service</span>
        <strong>{selectedService.name}</strong>
      </div>
      <div className="summary-line">
        <span>Barber</span>
        <strong>{selectedBarber.name}</strong>
      </div>
      <div className="summary-line">
        <span>Date</span>
        <strong>{selectedDay}</strong>
      </div>
      <div className="summary-line">
        <span>Time</span>
        <strong>{selectedTime}</strong>
      </div>
      <div className="summary-line total">
        <span>Total</span>
        <strong>${selectedService.price}</strong>
      </div>
    </aside>
  );
}

function Confirmation({
  clientName,
  selectedService,
  selectedBarber,
  selectedDay,
  selectedTime,
  resetBooking,
  studentMode = false,
}) {
  return (
    <section
      id="confirmation"
      className={studentMode ? "section confirmation-section student-confirmation" : "section confirmation-section"}
    >
      <div className="confirmation-card">
        <div className="checkmark" aria-hidden="true">✓</div>
        <h2>Your appointment is confirmed</h2>
        <p>Your appointment has been successfully scheduled.</p>

        <div className="confirmation-details">
          <div>
            <span>Client</span>
            <strong>{clientName}</strong>
          </div>
          <div>
            <span>Service</span>
            <strong>{selectedService.name}</strong>
          </div>
          <div>
            <span>Barber</span>
            <strong>{selectedBarber.name}</strong>
          </div>
          <div>
            <span>Date</span>
            <strong>{selectedDay}</strong>
          </div>
          <div>
            <span>Time</span>
            <strong>{selectedTime}</strong>
          </div>
          <div>
            <span>Price</span>
            <strong>${selectedService.price}</strong>
          </div>
          <div className="wide">
            <span>Location</span>
            <strong>123 Bank Street, Ottawa, ON</strong>
          </div>
        </div>

        <div className="confirmation-actions">
          <button className="primary-button" type="button">Add to calendar</button>
          <button className="secondary-button" type="button" onClick={resetBooking}>
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
