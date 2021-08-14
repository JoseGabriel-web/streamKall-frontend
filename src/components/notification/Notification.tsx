import styles from '@styles/components/notification/notification.module.scss'
import { ReactChildren, useRef, useState } from 'react'
import ControlBtn from '@components/controls/ControlBtn'
import { XLg } from 'react-bootstrap-icons'
import useClickLocation from '@hooks/useClickLocation'

const Notification = () => {  
    const [notificationState, setNotificationState] = useState(true)  
    const notificationRef = useRef(null)
    const closeNotification = () => setNotificationState(false);
    useClickLocation(notificationRef, closeNotification);
    
    return (
        <div className={styles.notificationContainer} data-isopened={notificationState}>
            <div className={styles.notificationContent} ref={notificationRef}>
                <div className={styles.notificationHeader}>
                <h4 className={styles.headerLabel}>Notification</h4>
                <ControlBtn Svg={XLg} state={false} callback={closeNotification} />
                </div>
                <div className={styles.notification}>
                    
                </div>
            </div>
        </div>
    )
}

export default Notification