class TimeZone {
  constructor() {}

  public static normalize(value: number) {
    var norm = Math.floor(Math.abs(value));
    return (norm < 10 ? '0' : '') + norm;
  }

  public static getTimeZone(): string {
    const timezone_offset_min = -new Date().getTimezoneOffset();
    let offset_hrs = Math.floor(Math.abs(timezone_offset_min / 60));
    let offset_min = Math.abs(timezone_offset_min % 60);

    if (timezone_offset_min === 0) {
      return 'Z';
    }

    const dif = timezone_offset_min >= 0 ? '+' : '-';

    return `${dif}${TimeZone.normalize(offset_hrs)}:${TimeZone.normalize(
      offset_min,
    )}`;
  }
}

export default TimeZone;
