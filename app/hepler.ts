
export const getFormattedTime = (use12HourFormat: boolean, displaySeconds: boolean) => {
    // Get current time based on use12HourFormat and displaySeconds
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedHours = hours % 12 || 12;

    // Return formatted time string
    return `${formattedHours}:${minutes.toString().padStart(2, '0')}${displaySeconds ? `:${seconds.toString().padStart(2, '0')}` : ''}${use12HourFormat ? (hours < 12 ? ' AM' : ' PM') : ''}`;
};