import React from 'react';
import '../styles/checklist-item.scss';

const ChecklistItem = (props) => {
    return (
        <div className="checklist-item">
            <div className="checklist-item-status checked"></div>
            <div className="checklist-item-name">Morning medication</div>
            <div className="checklist-item-date">scheduled for 10:00am</div>
        </div>
    )
}

export default ChecklistItem