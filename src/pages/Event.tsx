import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state => state.event)
    const {user} = useTypedSelector(state => state.auth)

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        setIsModalOpen(false)
        createEvent(event)
    }

    return (
        <Layout>
           <EventCalendar events={events}/>
            <Row justify='center'>
                <Button onClick={() => setIsModalOpen(true)}  >Добавить событие</Button>
            </Row>
            <Modal
                open={isModalOpen}
                title='Добавить событие'
                footer={null}
                onCancel={() => setIsModalOpen(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};

export default Event;