import { FC } from 'react'
import styles from '@styles/components/sidePanel/sidePanel.module.scss'


const SidePanel:FC<{ sidePanelState: boolean }> = ({ sidePanelState }) => {
    return (
        <div className={styles.sidePanel} data-isOpened={sidePanelState}>
          <div className={styles.sidePanelContainer}>
            <div className={styles.sidePanelContent}>

            </div>
            <div className={styles.sidePanelInput}>
            
            </div>
          </div>
        </div>
    )
}

export default SidePanel
