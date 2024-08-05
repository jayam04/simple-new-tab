let stopwatchInterval;
let stopwatchTime = 0;

const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

const updateStopwatch = () => {
    stopwatchTime++;
    document.getElementById('stopwatch-time').innerText = formatTime(stopwatchTime);
};

document.getElementById('startStopButton').addEventListener('click', () => {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        document.getElementById('startStopButton').innerText = 'Start';
    } else {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        document.getElementById('startStopButton').innerText = 'Stop';
    }
});

document.getElementById('resetButton').addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchTime = 0;
    document.getElementById('stopwatch-time').innerText = formatTime(stopwatchTime);
    document.getElementById('startStopButton').innerText = 'Start';
});
