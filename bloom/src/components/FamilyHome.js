import React from "react"
import { Link } from "react-router-dom"
import { backendEndpoint } from "../static"
import { familyId } from "../Utils/ids"
import './Family.scss'

import { useState } from 'react';
import { useAwait } from '../Utils/await';
import { getPhotoUrls } from '../Utils/photo';
import { userId } from '../Utils/ids';
import { Modal } from './Modal';
import { UploadPhotoForm } from './UploadPhotoForm';

function logout() {
	localStorage.clear()
	window.location.reload(false);
}

const FamilyHome = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const user = localStorage.getItem(userId)

	return (
		<div className="phone horizontally-centered">
			<div className="logo"><img src='../bloom-logo.svg'></img></div>
			<div className="relative-photo"></div>
			<div className="relative-name">Mary</div>
			<div className="relative-description">Send Mary some love by sharing a recent photo and attaching a note.</div>
			<div className="selection-screen">
				<div><input onClick={() => setModalVisible(true)} type="button" value="Send photo" className="primary-button" /></div>
				<div><Link to="/family/checklist"><input type="button" value="Edit daily checklist" className="secondary-button" /></Link></div>
			</div>
			<div className="footer-button">All done? <Link to="/family" onClick={logout}>Sign out here.</Link></div>
			<div className="background-image"><img src="../bloom-background.svg"></img></div>

			<Modal isVisible={modalVisible} setVisible={setModalVisible}>
                <div className="picture-upload-modal">
                    <UploadPhotoForm
                        destinationUrl={`${backendEndpoint}photo/user/${user}`}
                    />
                </div>
            </Modal>
		</div>
	)
}

export default FamilyHome