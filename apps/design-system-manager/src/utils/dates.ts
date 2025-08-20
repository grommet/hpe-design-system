const formatDate = ({
  utc,
  locales,
  options: optionsProp,
}: {
  utc: string;
  locales?: string;
  options?: Intl.DateTimeFormatOptions;
}) => {
  const date = new Date(utc);
  const defaultOptions: Intl.DateTimeFormatOptions = { dateStyle: "medium" };
  const options: Intl.DateTimeFormatOptions = {
    ...defaultOptions,
    ...optionsProp,
  };

  return Intl.DateTimeFormat(locales, options).format(date);
};

interface Units {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

function formatRelativeTime(targetDate: Date, locale = "en-US"): string {
  const rtf = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
    style: "long",
  });
  const now = new Date();
  const diffMs = targetDate.getTime() - now.getTime();

  // Using more accurate time units for relative time formatting
  // Note: Month calculation uses average month length (30.44 days) as an approximation
  // since months have varying lengths (28-31 days). This provides reasonable accuracy
  // for relative time display without the complexity of exact month calculations.
  const AVERAGE_DAYS_PER_MONTH = 365.25 / 12; // Average days in a month, accounting for leap years

  const units: Units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * AVERAGE_DAYS_PER_MONTH, // Average days per month
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  for (const [unit, value] of Object.entries(units)) {
    if (Math.abs(diffMs) >= value || unit === "second") {
      const roundedValue = Math.round(diffMs / value);
      return rtf.format(roundedValue, unit as Intl.RelativeTimeFormatUnit);
    }
  }
  return rtf.format(0, "second" as Intl.RelativeTimeFormatUnit); // If no significant difference, return "now"
}

const getLocaleDateFormat = ({ locale = "en-US" }: { locale?: string }) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat(locale, options);
  const parts = formatter.formatToParts(new Date());

  let formatPattern = "";

  parts.forEach((part) => {
    switch (part.type) {
      case "year":
        formatPattern += "yyyy";
        break;
      case "month":
        formatPattern += "mm";
        break;
      case "day":
        formatPattern += "dd";
        break;
      default:
        formatPattern += part.value; // Include other parts as is (like punctuation)
    }
  });

  return formatPattern;
};

export { formatDate, formatRelativeTime, getLocaleDateFormat };
