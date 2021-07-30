import React, { FC, useEffect } from 'react'
import Participant from './Participant'
import styles from '@styles/components/sidePanel/participants.module.scss'
import { useRoomContext } from '@context/room/RoomProvider'
import { useState } from 'react'
import { userInterface } from '@customTypes'

const Participants:FC = () => {

    const { room } = useRoomContext()
    const { participants } = room
    const [updatedParticipants, setUpdatedParticipants] = useState<Set<userInterface>>(new Set(participants))

    useEffect(() => {
        setUpdatedParticipants(new Set(participants))
    },[participants])

    return (
        <div className={styles.participantsContainer}>
            {updatedParticipants && [...updatedParticipants].map(({ name, id }) => {
                return <Participant name={name} audio={false} video={false} />
            })}
        </div>
    )
}

export default Participants


{/* <Participant name="Jose Gabriel" audio={false} video={false} /> */}