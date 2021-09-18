import '../../src/App.scss';
import ChecklistItem from '../../src/components/ChecklistItem.js'

function Home() {
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
                <div className="nav-button" id="nav-family">Family tree</div>
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