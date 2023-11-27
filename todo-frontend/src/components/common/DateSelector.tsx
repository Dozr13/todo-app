import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import de from "date-fns/locale/de";
import { ReactNodeChildrenProps } from "../../interfaces/interfaceProps";

const DateSelector: React.FC<ReactNodeChildrenProps> = ({ children }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      {children}
    </LocalizationProvider>
  );
};

export default DateSelector;
