import React from "react";
import "./App.css";

import DndTreeFolder from "./lib/dndTreeFolder/index";
import { TreeData } from "./lib/dndTreeFolder/types";

const treeData: TreeData = {
    children: [],
    id: "1",
    name: "home",
};

function App() {
    const saveOnServer = (value: TreeData) => {
        console.log("트리 데이터를 서버에 저장");
    };
    return (
        <div className="App">
            <div style={{ width: "300px" }}>
                <DndTreeFolder initialTreeData={treeData} onSave={saveOnServer} />
            </div>
        </div>
    );
}

export default App;
