## react-dnd-tree-folder

A library that provides tree-shaped folder components that can be dragged and dropped.

- [X] drag and drop
- [x] read-only mode
- [x] save data on custom function



## install
```
npm install react-dnd-tree-folder
```

## Basic Usage

```
import { DndTreeFolder } from "react-dnd-tree-folder";

import { TreeData } from "react-dnd-tree-folder/dist/dndTreeFolder/types";

const treeData: TreeData = {
    children: [],
    id: "1",
    name: "home",
};

function App() {
     const saveOnServer = (value: TreeData) => {
         console.log("saved tree data on server");
    };
    return (
        <div className="App">
            <DndTreeFolder initialTreeData={treeData} onSave={saveOnServer} />
        </div>
    );
}

export default App;

```

### readOnly mode

default is edit mode

```
<DndTreeFolder initialTreeData={treeData} onSave={saveOnServer} isEdit={false}/>
```
