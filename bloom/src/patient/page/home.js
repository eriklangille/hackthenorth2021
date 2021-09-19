import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChecklistItem from '../../components/ChecklistItem'
import { Modal } from '../../components/Modal';
import { UploadPhotoForm } from '../../components/UploadPhotoForm';
import { backendEndpoint } from '../../static';
import { useAwait } from '../../Utils/await';
import { userId } from '../../Utils/ids';
import { getPhotoUrls } from '../../Utils/photo';
import "./home.scss"

function Home() {
    const history = useHistory()
    const photoUrls = useAwait(() => getPhotoUrls(userId), [])

    const [modalVisible, setModalVisible] = useState(false)

    const user = localStorage.getItem(userId)

    let date = new Date();
    let dateText = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(date);
    let greeting = "Hello, "
    if (date.getHours() < 12) {
        greeting = "Good morning, "
    } else if (date.getHours < 18) {
        greeting = "Good afternoon, "
    } else {
        greeting = "Good evening, "
    }

    return (
        <div className="wrapper">
            <div id="date">{dateText}</div>
            <div id="title">{greeting}Mary</div>
            <div className="nav">
                <div onClick={() => history.push("/tree")} className="nav-button" id="nav-family">Family tree</div>
                {photoUrls[0] ? <img src={photoUrls[0].urlString} /> : null}
                {photoUrls[1] ? <img src={photoUrls[1].urlString} /> : null}
                <div onClick={() => setModalVisible(true)} className="nav-button" id="nav-p3"></div>
            </div>
            <div className="checklist">
                <ChecklistItem status={true} name="Breakfast" time="6:30am"></ChecklistItem>
                <ChecklistItem status={false} name="Morning medication" time="10:00am"></ChecklistItem>
                <ChecklistItem status={false} name="Lunch" time=""></ChecklistItem>
                <ChecklistItem status={false} name="Dinner" time=""></ChecklistItem>
                <ChecklistItem status={false} name="Night medication" time=""></ChecklistItem>
            </div>
            <Modal isVisible={modalVisible} setVisible={setModalVisible}>
                <div className="picture-upload-modal">
                    <UploadPhotoForm
                        destinationUrl={`${backendEndpoint}photo/user/${user}`}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default Home;