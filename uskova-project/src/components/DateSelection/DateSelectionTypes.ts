export interface CalendarAttribute {
  key: string;
  highlight: {
    color: string;
    fillMode: string;
  };
  dates: Date | Date[];
}