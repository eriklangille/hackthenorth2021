import { Link } from 'react-router-dom';
import ChecklistItem from '../../components/ChecklistItem'

function Home() {
    return (
        <div className="wrapper">
            <div id="date">Friday, September 17, 2021</div>
            <div id="title">Good morning, Mary</div>
            <div className="nav">
                <Link to="/tree"><div className="nav-button" id="nav-family">Family tree</div></Link>
                <div className="nav-button" id="nav-p1"></div>
                <div className="nav-button" id="nav-p2"></div>
                <div className="nav-button" id="nav-p3"></div>
            </div>
            <div className="checklist">
                <ChecklistItem status={true} name="Breakfast" time="6:30am"></ChecklistItem>
                <ChecklistItem status={false} name="Morning medication" time="10:00am"></ChecklistItem>
                <ChecklistItem status={false} name="Lunch" time=""></ChecklistItem>
                <ChecklistItem status={false} name="Dinner" time=""></ChecklistItem>
                <ChecklistItem status={false} name="Night medication" time=""></ChecklistItem>
            </div>
        </div>
    );
}

export default Home;