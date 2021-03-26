class CountdownTimer{
    constructor({ selector, targetDate }) {
        this.id = selector;
        this.targetDate = targetDate;
        this.countTime = 0;
        this.timeInterval = null;

        this.rootEl = document.querySelector(this.id);

        this.refs = {
            daysField: this.rootEl.querySelector('span[data-value="days"]'),
            hoursField: this.rootEl.querySelector('span[data-value="hours"]'),
            minsField: this.rootEl.querySelector('span[data-value="mins"]'),
            secsField: this.rootEl.querySelector('span[data-value="secs"]'),
        };
    }

    start() {
    const targetDate = this.targetDate.getTime();

        this.timeInterval = setInterval(() => {
            const currentTime = Date.now();
            this.countTime = targetDate - currentTime;
            const { days, hours, mins, secs } = this.getTimeComponents(this.countTime);
            this.createTextContentForTimer({ days, hours, mins, secs });
        }, 1000);
    }

    stop() {
        if (this.countTime <= 0) {
            clearInterval(this.timeInterval);
        }
    }

   getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    createTextContentForTimer({ days, hours, mins, secs }) {
        this.refs.daysField.textContent = days;
        this.refs.hoursField.textContent = hours;
        this.refs.minsField.textContent = mins;
        this.refs.secsField.textContent = secs;
    }
}

const countdownTimer =  new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Apr 18, 2021'),
});

countdownTimer.start();
// countdownTimer.stop();

