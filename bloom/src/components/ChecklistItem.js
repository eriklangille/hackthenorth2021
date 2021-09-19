import React from 'react';
import { useState } from 'react';
import { Modal } from './Modal';
import "./Checklistitem.scss";
import { userId } from '../Utils/ids';
import { backendEndpoint } from '../static';
import { useHistory } from 'react-router';

export const ChecklistItem = ({ data: { title, completeDate, targetDate, id }, loginType = userId }) => {
    let [state, setState] = useState(completeDate !== null)
    const [dateComp, setCompleted] = useState(new Date(completeDate))
    targetDate = new Date(targetDate)

    let addClass = "";
    if (state) {
        addClass = " checked"
    }

    const completeMessage = "completed at " + dateComp?.toLocaleString([], { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    const targetMessage = "scheduled for " + targetDate?.toLocaleString([], { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })

    const updateCompletedDate = async (dc) => {
        const user = localStorage.getItem(loginType)

        const url = new URL(backendEndpoint + "reminders/" + id)

        await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                userId: user,
                targetDate: targetDate.toString(),
                dateCompleted: dc?.toString(),
                setComplete: dc ? true : false,
            })
        })
    }

    return (
        <div className={"checklist-item" + addClass} onClick={() => {
            if (state) {
                setCompleted(null)

                updateCompletedDate(null)
            } else {
                const coeff = 1000 * 60;
                const date = new Date();
                setCompleted(new Date(Math.round(date.getTime() / coeff) * coeff))
                const dateComplete = new Date(Math.round(date.getTime() / coeff) * coeff)

                updateCompletedDate(dateComplete)
            }

            setState(!state)
        }}>
            <div className="checklist-item-status"><img src="../icons/checkmark.svg" width="32" height="32"></img></div>
            <div className="checklist-item-name">{title}</div>
            <div className="checklist-item-date">{state ? completeMessage : targetMessage}</div>
        </div>
    )
}

export const NewChecklistButton = ({ loginType = userId }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const history = useHistory()

    return (
        <div className={"checklist-item"} onClick={() => { setModalVisible(true) }}>
            <div className="checklist-item-status"><img src="../icons/checkmark.svg" width="32" height="32"></img></div>
            <div className="checklist-item-name">Add a new reminder</div>
            <Modal isVisible={modalVisible} setVisible={setModalVisible}>
                <div className="new-checklist-prompt">
                    <form onSubmit={async e => {
                        e.preventDefault()

                        const user = localStorage.getItem(loginType)

                        const url = new URL(backendEndpoint + "reminders")

                        await fetch(url, {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                title: e.target[0].value,
                                userId: user,
                                targetDate: e.target[1].value.toString()
                            })
                        })

                        history.go(0)
                        setModalVisible(false)
                    }}>
                        <label>
                            <div>Title</div>
                            <input placeholder="Birthday" />
                        </label>
                        <label>
                            <div>Date</div>
                            <input type="datetime-local" min={Date.now().toString} step="60" />
                        </label>
                        <input type="submit" value="Add item" className="primary-button" />
                    </form>
                </div>
            </Modal>
        </div>
    )
}