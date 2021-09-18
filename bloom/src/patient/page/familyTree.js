import './familyTree.css';

const familyTreeData = {
    name: "Mary",
    mainRelationship: "me",
    mainImageURL: "https://cdn.pixabay.com/photo/2019/04/10/17/01/woman-4117523__480.jpg",
    altName: "Alexandro",
    altRelationship: "husband",
    altImageURL: "https://cdn.pixabay.com/photo/2021/01/14/17/53/man-5917529__480.jpg",
    parents: [
        {
            name: "Charlie",
            mainRelationship: "dad",
            altImageURL: "https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565__340.jpg",
            altName: "Linda",
            altRelationship: "mom",
            altImageURL: "https://cdn.pixabay.com/photo/2015/11/07/11/17/woman-1031000__340.jpg"
        }
    ],
    children: [
        {
            name: "Billy",
            mainRelationship: "son",
            mainImageURL: "https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965__480.jpg",
            altName: "Barbara",
            altRelationship: "daughterInLaw",
            altImageURL: "https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618__480.jpg",
            children: [
                {
                    name: "Lizzie",
                    mainRelationship: "granddaughter",
                    mainImageURL: "https://cdn.pixabay.com/photo/2014/10/06/17/30/child-476507__340.jpg"
                }
            ]
        },
        {
            name: "Greg",
            mainRelationship: "son",
            mainImageURL: "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445__480.jpg",
            altName: "Nancy",
            altRelationship: "daughterInLaw",
            altImageURL: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907__340.jpg",
            children: [
                {
                    name: "Tom",
                    mainRelationship: "grandson",
                    altName: "Michelle",
                    altRelationship: "granddaughterInLaw",
                    altImageURL: "https://cdn.pixabay.com/photo/2017/04/06/19/34/girl-2209147__480.jpg"
                }
            ]
        },
        {
            name: "Krystal",
            mainRelationship: "daughter",
            mainImageURL: "https://cdn.pixabay.com/photo/2015/03/03/18/58/woman-657753__340.jpg",
            altName: "John",
            altRelationship: "sonInLaw",
            altImageURL: "https://cdn.pixabay.com/photo/2015/01/07/20/53/hat-591973__480.jpg",
            children: [
                {
                    name: "Kim",
                    mainRelationship: "granddaughter",
                    mainImageURL: "https://cdn.pixabay.com/photo/2016/11/29/03/35/girl-1867092__480.jpg"
                },
                {
                    name: "Ben",
                    mainRelationship: "grandson",
                    mainImageURL: "https://cdn.pixabay.com/photo/2017/11/23/07/47/baby-2972221__480.jpg"
                }
            ]
        }
    ]
}

export default function FamilyTree(props) {
    return (
      <div className="page">
        <div className="family-flex">  
        {familyTreeData.parents.map(parentNode =>(
                    <p>{parentNode.name}</p>))}
        </div>
        <div className="family-flex">
            <div className="family-card">
                <div className="profile-pic" style={{backgroundImage: `url(${familyTreeData.mainImageURL})`}}/>
                {familyTreeData.name}
            </div>
        </div>
        <div className="family-flex">
        {familyTreeData.children.map(node => (
            <div className="node">
                <p>{node.name}</p>
                <div className="family-flex">
                {node.children.map(childrenNode =>(
                    <div className="node-children"><p>{childrenNode.name}</p></div>))}
                </div>                
            </div>
        ))}
        </div>
      </div>
    );
  }