import styles from '@styles/components/sidePanel/message.module.scss'
import { FC } from 'react';
import { isSameDay, isSameWeek, isYesterday, format } from 'date-fns'
import { messageInterface } from '@customTypes';
import { getUTCDate } from '../../helpers/getUTCDate';

const Message:FC<messageInterface> = ({ sender, date, message }:messageInterface) => {

  const currentDate = getUTCDate()

  const formatDate = (dateObject: Date | number): string => {
    if(isSameDay(dateObject, currentDate)) {
      return format(date, 'hh:mm a')
    } else if(isYesterday(dateObject)) {
      return 'Yesterday'
    } else if(isSameWeek(dateObject, currentDate)) {
      return format(date, 'dddd')
    } else {
      return format(date, 'dd/mm/yyyy')
    }
  }

  return (
    <div className={styles.message}>
      <div className={styles.iconContainer}>
        <div className={styles.userIcon}>
          <h4>
            {sender.split('')[0].toUpperCase()}
          </h4>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.nameAndDate}>
          <div className={styles.name}>
            <h5>{sender}:</h5>
          </div>
          <div className={styles.date}>
            <small>{formatDate(date)}</small>
          </div>
        </div>
        <div className={styles.messageText}>
          <p>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
