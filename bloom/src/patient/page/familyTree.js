const familyTreeData = {
    name: "Mary",
    mainRelationship: "me",
    altName: "Alexandro",
    altRelationship: "husband",
    children: [
        {
            name: "Billy",
            mainRelationship: "son",
            altName: "Barbara",
            altRelationship: "daughterInLaw",
            children: [
                {
                    name: "Lizzie",
                    mainRelationship: "granddaughter"
                }
            ]
        },
        {
            name: "Greg",
            mainRelationship: "son",
            altName: "Nancy",
            altRelationship: "daughterInLaw",
            children: [
                {
                    name: "Tom",
                    mainRelationship: "grandson",
                    altName: "Michelle",
                    altRelationship: "granddaughterInLaw",
                }
            ]
        },
        {
            name: "Krystal",
            mainRelationship: "daughter",
            altName: "John",
            altRelationship: "sonInLaw",
            children: [
                {
                    name: "Kim",
                    mainRelationship: "granddaughter"
                },
                {
                    name: "Ben",
                    mainRelationship: "grandson"
                }
            ]
        }
    ]
}

export default function FamilyTree(props) {
    return (
      <div>
          <p>test</p>
      </div>
    );
  }