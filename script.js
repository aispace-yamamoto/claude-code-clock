class ClockApp {
    constructor() {
        this.isAnalogMode = false;
        this.selectedTimezone = 'local';
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    bindEvents() {
        const toggleBtn = document.getElementById('toggleMode');
        const timezoneSelect = document.getElementById('timezone');

        toggleBtn.addEventListener('click', () => this.toggleClockMode());
        timezoneSelect.addEventListener('change', (e) => {
            this.selectedTimezone = e.target.value;
            this.updateClock();
        });
    }

    toggleClockMode() {
        this.isAnalogMode = !this.isAnalogMode;
        const digitalClock = document.getElementById('digitalClock');
        const analogClock = document.getElementById('analogClock');
        const toggleBtn = document.getElementById('toggleMode');

        if (this.isAnalogMode) {
            digitalClock.classList.add('hidden');
            analogClock.classList.remove('hidden');
            toggleBtn.textContent = 'Digital';
        } else {
            digitalClock.classList.remove('hidden');
            analogClock.classList.add('hidden');
            toggleBtn.textContent = 'Analog';
        }
    }

    getCurrentTime() {
        const now = new Date();
        
        if (this.selectedTimezone === 'local') {
            return now;
        }
        
        if (this.selectedTimezone === 'UTC') {
            return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        }
        
        return new Date(now.toLocaleString("en-US", {timeZone: this.selectedTimezone}));
    }

    updateClock() {
        const time = this.getCurrentTime();
        
        if (this.isAnalogMode) {
            this.updateAnalogClock(time);
        } else {
            this.updateDigitalClock(time);
        }
    }

    updateDigitalClock(time) {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        
        const displayHours = hours % 12 || 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        document.getElementById('hours').textContent = 
            displayHours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = 
            minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = 
            seconds.toString().padStart(2, '0');
        document.getElementById('ampm').textContent = ampm;
        
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        let dateString;
        if (this.selectedTimezone === 'local') {
            dateString = time.toLocaleDateString('en-US', options);
        } else if (this.selectedTimezone === 'UTC') {
            dateString = time.toLocaleDateString('en-US', options) + ' (UTC)';
        } else {
            dateString = time.toLocaleDateString('en-US', options) + 
                       ` (${this.selectedTimezone.split('/')[1]})`;
        }
        
        document.getElementById('date').textContent = dateString;
    }

    updateAnalogClock(time) {
        const hours = time.getHours() % 12;
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        
        const hourDegrees = (hours * 30) + (minutes * 0.5);
        const minuteDegrees = minutes * 6;
        const secondDegrees = seconds * 6;
        
        const hourHand = document.getElementById('hourHand');
        const minuteHand = document.getElementById('minuteHand');
        const secondHand = document.getElementById('secondHand');
        
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ClockApp();
});