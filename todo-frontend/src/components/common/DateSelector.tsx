import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import de from "date-fns/locale/de";
import { DateSelectorProps } from "../../interfaces/task";

const DateSelector: React.FC<DateSelectorProps> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      {children}
    </LocalizationProvider>
  );
};

export default DateSelector;
