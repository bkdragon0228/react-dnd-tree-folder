import React from "react";
import "./App.css";

// import { TreeData } from "./lib/dndTreeFolder/types";

import { DndTreeFolder } from "react-dnd-tree-folder";

import { TreeData } from "react-dnd-tree-folder/dist/dndTreeFolder/types";

const treeData: TreeData = {
    children: [],
    id: "1",
    name: "home",
};

function App() {
    // const saveOnServer = (value: TreeData) => {
    //     console.log("트리 데이터를 서버에 저장");
    // };
    return (
        <div className="App">
            <DndTreeFolder initialTreeData={treeData} onSave={() => {}} />
        </div>
    );
}

export default App;
