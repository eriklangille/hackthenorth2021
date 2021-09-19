import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChecklistItem, NewChecklistButton, } from '../../components/ChecklistItem'
import { Modal } from '../../components/Modal';
import { UploadPhotoForm } from '../../components/UploadPhotoForm';
import { backendEndpoint } from '../../static';
import { useAwait } from '../../Utils/await';
import { getChecklistData } from '../../Utils/checklist';
import { userId } from '../../Utils/ids';
import { getPhotoUrls } from '../../Utils/photo';
import "./home.scss"

function Home() {
    const history = useHistory()
    const photoUrls = useAwait(() => getPhotoUrls(userId)) ?? []

    const [modalVisible, setModalVisible] = useState(false)
    const todoData = useAwait(() => getChecklistData(userId), [])

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
                <div onClick={() => history.push("/photo")} className="home__photo_gallery">
                  {photoUrls[0] ? <img className="home__photo" src={photoUrls[0].urlString} /> : null}
                  {photoUrls[1] ? <img className="home__photo" src={photoUrls[1].urlString} /> : null}
                </div>
            </div>
            <div className="checklist">
                {todoData.map(r => (
                    <ChecklistItem
                        data={r}
                    />
                ))}
            </div>
            <Modal isVisible={modalVisible} setVisible={setModalVisible}>
                <div className="picture-upload-modal">
                    <UploadPhotoForm
                        destinationUrl={`${backendEndpoint}photo/user/${user}`}
                    />
                </div>
            </Modal>
        <p className="userid">User ID: {user}</p>
        </div>
    );
}

export default Home;