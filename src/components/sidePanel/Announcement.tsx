import { announcementInterface } from '@customTypes'
import styles from '@styles/components/sidePanel/announcement.module.scss'
import { FC } from 'react'

const Announcement:FC<announcementInterface> = ({ text }) => {
    return (
        <div className={styles.announcement}>
            <small>
                {text}
            </small>
        </div>
    )
}

export default Announcement
