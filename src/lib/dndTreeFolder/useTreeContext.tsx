import React from "react";

export interface TreeContextProviderProps {
    treeData: any;
    addTreeNode: any;
    deleteTreeNode: any;
    editTreeNodeName: any;
    handleDragStart: any;
    handleDragEnd: any;
    handleDragEnter: any;
}

const TreeContext = React.createContext<TreeContextProviderProps | null>(null);

function TreeProvider({ children, value }: { children: any; value: TreeContextProviderProps }) {
    return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
}

function useTreeContext() {
    const context = React.useContext(TreeContext);
    if (context === null) {
        throw new Error("useCounterContext must be used within a CounterProvider");
    }

    return context;
}

export { TreeProvider, useTreeContext };
