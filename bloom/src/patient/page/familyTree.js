import { Link } from 'react-router-dom';
import './familyTree.scss';

const familyTreeData = {
    name: "Mary",
    mainRelationship: "Me",
    mainImageURL: "https://cdn.pixabay.com/photo/2019/04/10/17/01/woman-4117523__480.jpg",
    altName: "Alexandro",
    altRelationship: "Husband",
    altImageURL: "https://cdn.pixabay.com/photo/2021/01/14/17/53/man-5917529__480.jpg",
    parents: [
        {
            name: "Charlie",
            mainRelationship: "Dad",
            mainImageURL: "https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565__340.jpg",
            altName: "Linda",
            altRelationship: "Mom",
            altImageURL: "https://cdn.pixabay.com/photo/2015/11/07/11/17/woman-1031000__340.jpg"
        }
    ],
    children: [
        {
            name: "Billy",
            mainRelationship: "Son",
            mainImageURL: "https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965__480.jpg",
            altName: "Barbara",
            altRelationship: "Daughter In Law",
            altImageURL: "https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618__480.jpg",
            children: [
                {
                    name: "Lizzie",
                    mainRelationship: "Granddaughter",
                    mainImageURL: "https://cdn.pixabay.com/photo/2014/10/06/17/30/child-476507__340.jpg"
                }
            ]
        },
        {
            name: "Greg",
            mainRelationship: "Son",
            mainImageURL: "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445__480.jpg",
            altName: "Nancy",
            altRelationship: "Daughter In Law",
            altImageURL: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907__340.jpg",
            children: [
                {
                    name: "Michelle",
                    mainRelationship: "Granddaughter",
                    mainImageURL: "https://cdn.pixabay.com/photo/2017/04/06/19/34/girl-2209147__480.jpg",
                }
            ]
        },
        {
            name: "Krystal",
            mainRelationship: "Daughter",
            mainImageURL: "https://cdn.pixabay.com/photo/2015/03/03/18/58/woman-657753__340.jpg",
            altName: "John",
            altRelationship: "Son In Law",
            altImageURL: "https://cdn.pixabay.com/photo/2015/01/07/20/53/hat-591973__480.jpg",
            children: [
                {
                    name: "Kim",
                    mainRelationship: "Granddaughter",
                    mainImageURL: "https://cdn.pixabay.com/photo/2016/11/29/03/35/girl-1867092__480.jpg"
                },
                {
                    name: "Ben",
                    mainRelationship: "Grandson",
                    mainImageURL: "https://cdn.pixabay.com/photo/2017/11/23/07/47/baby-2972221__480.jpg"
                }
            ]
        }
    ]
}

export default function FamilyTree(props) {
    return (
        <div className="family-tree-page">
            <Link to="/"><button className="backbutton">
                <img src="../arrow-left-circle.svg" width="50px" height="50px" />
            </button></Link>
            <div className="family-flex">
                {familyTreeData.parents.map(node => (
                    <div>
                        <UserBlock node={node} />
                    </div>
                ))}
            </div>
            <div>
                <UserBlock node={familyTreeData} />
                <div className="family-flex">
                    {familyTreeData.children.map(node => (
                        <div className="node">
                            <UserBlock node={node} />

                            <div className="family-flex">
                                {node.children.map(node => (
                                    <div>
                                        <UserBlock node={node} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const UserBlock = ({ node }) => (
    <div className="user-data">
        <div>
            <PhotoIcon node={node} />
            <div className="people-name">{node.name}{node.altName ? " & " + node.altName : null}</div>
            <div className="people-detail">{node.mainRelationship}{node.altRelationship ? " & " + node.altRelationship : null}</div>
        </div>
    </div>
)

const PhotoIcon = ({ node }) => (
    <div className="photo-icon">
        <div>
            <img src={node.mainImageURL} alt={node.name} />
        </div>
        {node.altImageURL ?
            <div>
                <img src={node.altImageURL} alt={node.altName} />
            </div>
            : null}
    </div>
)