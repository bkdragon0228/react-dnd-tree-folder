import React, { useState } from "react";

import { TreeToolsWrapper, TreeToolsIcon, TreeNameForm } from "./treeStyle";

import { useTreeContext } from "./useTreeContext";

interface Props {
    isOpen: boolean;
    id: string;
    isEdit: boolean;
}

const TreeEditTools: React.FC<Props> = ({ isOpen, id, isEdit }) => {
    const { treeData, addTreeNode, deleteTreeNode, editTreeNodeName } = useTreeContext();
    const [isOpenInput, setIsOpenInput] = useState(false);
    const [name, setName] = useState("");

    const openInput = () => {
        setIsOpenInput((prev) => !prev);
    };

    if (!isEdit) {
        return null;
    }

    if (!isOpen) {
        return null;
    }

    return (
        <TreeToolsWrapper>
            <TreeToolsIcon>
                <i
                    className="ri-file-add-line"
                    onClick={(e) => {
                        e.stopPropagation();
                        addTreeNode(id);
                    }}
                ></i>
            </TreeToolsIcon>
            <TreeToolsIcon>
                <i
                    className="ri-delete-bin-line"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteTreeNode(id);
                    }}
                ></i>
            </TreeToolsIcon>
            {isOpenInput ? (
                <TreeNameForm onClick={(e) => e.stopPropagation()}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <button
                        onClick={() => {
                            openInput();
                            setName("");
                            editTreeNodeName(id, name);
                        }}
                    >
                        변경
                    </button>
                    <button onClick={openInput}>X</button>
                </TreeNameForm>
            ) : (
                <TreeToolsIcon>
                    <i
                        className="ri-pencil-line"
                        onClick={(e) => {
                            e.stopPropagation();
                            openInput();
                        }}
                    ></i>
                </TreeToolsIcon>
            )}
        </TreeToolsWrapper>
    );
};

export default TreeEditTools;
