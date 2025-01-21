import { Timestamp } from 'firebase-admin/firestore';

class TimezoneConverter {
  /**
   * Converts a given Date to a specified time zone and returns a formatted string.
   * @param {Date} date - The date to convert.
   * @param {string} [timeZone] - The target time zone (optional).
   * @returns {string} - The formatted date string.
   */
  static convertToTimezone(date: Date, timeZone?: string): string {
    try {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: timeZone,
        hour12: true, // 12-hour format with AM/PM
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };

      return new Intl.DateTimeFormat('en-ID', options).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return date.toString(); // fallback to default string representation
    }
  }
}

export default class TimestampFormatter {
  private static readonly timeZone: string = 'Asia/Jakarta';

  /**
   * Formats a Firebase Timestamp into a readable string with a specific time zone.
   * @param {Timestamp} timestamp - The Firebase timestamp to format.
   * @returns {string} - The formatted date string.
   */
  static formatTimestamp(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return TimezoneConverter.convertToTimezone(date, this.timeZone);
  }

  /**
   * Returns the current timestamp as a Firebase Timestamp.
   * @returns {Timestamp} - The current timestamp.
   */
  static currentTimestamp(): Timestamp {
    return Timestamp.fromDate(new Date(Date.now()));
  }
}
