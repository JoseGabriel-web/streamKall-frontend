import { FC } from 'react'
import styles from '@styles/components/sidePanel/sidePanel.module.scss'
import { useSidePanelState } from '@context/sidePanel/SidePanelProvider'


const SidePanel:FC = () => {

    const state = useSidePanelState()

    return (
        <div className={styles.sidePanel} data-isopened={state}>
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
