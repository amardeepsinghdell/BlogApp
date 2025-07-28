   
import { format, parseISO, isValid } from 'date-fns';
   
   const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            
            if (isNaN(date.getTime())) {
                return 'Invalid date';
            }
            
            return format(date, 'MMM dd, yyyy HH:mm');
        } catch (error) {
            return 'Date error';
        }
    };

    export default formatDate;