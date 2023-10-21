import React, { useState, useEffect } from "react";

import { TreeData } from "./types";

import { TreeContainer, TreeTitle, SaveButton } from "./treeStyle";

import { TreeProvider } from "./useTreeContext";

import TreeItem from "./treeItem";

import TreeEditTools from "./treeEditTools";

interface Props {
    initialTreeData: TreeData;
    onSave: (value: TreeData) => void;
    isEdit?: boolean;
}

const DndTreeFolder = ({ initialTreeData, onSave, isEdit = true }: Props) => {
    const [treeData, setTreeData] = useState<TreeData>(initialTreeData);
    const [isTools, setIsTools] = useState<boolean>(false);

    // 드래그 시작지
    const [draggingIndex, setDraggingIndex] = useState<{
        id: string;
        depth: number;
    }>({
        id: "",
        depth: 0,
    });

    // 드래그 도착지
    const [draggingTarget, setDraggingTarget] = useState<{
        id: string;
        depth: number;
    }>({
        id: "",
        depth: 0,
    });

    const toggleTools = () => {
        setIsTools((prev) => !prev);
    };

    const addTreeNode = (parentId: string) => {
        function traverse(node: TreeData): TreeData {
            if (node.id === parentId) {
                return {
                    ...node,
                    children: [...node?.children, { id: `${Date.now()}`, name: "new", children: [] }],
                };
            }

            return { ...node, children: node.children.map((child) => traverse(child as TreeData)) };
        }

        setTreeData(traverse(treeData));
    };

    // 상태를 업데이트 하지 않는 특정 노드를 추가하는 함수
    // 노드 삭제 이후 삭제한 노드를 새로운 부모에 넣어주는 역할
    const addTreeSpecificNode = (parentId: string, specificNode: TreeData, treeData: TreeData) => {
        function traverse(node: TreeData): TreeData {
            if (node.id === parentId) {
                return {
                    ...node,
                    children: [...node?.children, specificNode],
                };
            }

            return { ...node, children: node.children.map((child) => traverse(child as TreeData)) };
        }

        const newTreeData = traverse(treeData);
        return {
            newTreeData: newTreeData,
        };
    };

    const deleteTreeNode = (targetId: string) => {
        function traverse(node: TreeData): TreeData | null {
            if (node.id === targetId) {
                return null;
            }

            return {
                ...node,
                children: node.children
                    .map((child) => traverse(child as TreeData))
                    .filter((child) => child !== null) as TreeData[],
            };
        }

        const newTree = traverse(treeData);

        if (newTree !== null) {
            setTreeData(newTree);
        }
    };

    // 상태를 업데이트 하지 않는 노드 삭제 함수
    const deleteTreeNode2 = (targetId: string) => {
        let deleteNode = {
            children: [],
            id: "",
            name: "",
        } as TreeData;
        function traverse(node: TreeData): TreeData | null {
            if (node.id === targetId) {
                deleteNode = node;
                return null;
            }

            return {
                ...node,
                children: node.children
                    .map((child) => traverse(child as TreeData))
                    .filter((child) => child !== null) as TreeData[],
            };
        }

        const newTreeData = traverse(treeData);

        return { deletedNode: deleteNode, newTreeData: newTreeData as TreeData };
    };

    const editTreeNodeName = (targetId: string, newName: string) => {
        function traverse(node: TreeData): TreeData {
            if (node.id === targetId) {
                return {
                    ...node,
                    name: newName,
                };
            }

            return { ...node, children: node.children.map((child) => traverse(child)) };
        }

        setTreeData(traverse(treeData));
    };

    const handleDragStart = (targetId: string) => {
        const copyTree = { ...treeData };
        const depth = 0;

        function traverse(node: TreeData, depth: number) {
            if (node.id === targetId) {
                setDraggingIndex({ id: node.id, depth });
                return;
            }

            node.children.map((child) => traverse(child, depth + 1));
        }
        traverse(copyTree, depth);
    };

    const handleDragEnter = (targetId: string) => {
        const copyTree = { ...treeData };
        const depth = 0;

        function traverse(node: TreeData, depth: number) {
            if (node.id === targetId) {
                setDraggingTarget({ id: node.id, depth });
                return;
            }

            node.children.map((child) => traverse(child, depth + 1));
        }
        traverse(copyTree, depth);
    };

    const handleDragEnd = () => {
        if (draggingIndex.depth === draggingTarget.depth) {
            changeIndex();
        } else {
            changeParent();
        }
    };

    const changeIndex = () => {
        const copyTree = { ...treeData };
        const targetDepth = draggingTarget.depth;
        const currentDepth = 0;
        function traverse(node: TreeData, depth: number): TreeData {
            if (targetDepth === depth + 1) {
                if (node.children.length) {
                    const copyChildren = [...node.children];
                    const currentIndex = copyChildren.findIndex((item) => item.id === draggingIndex.id);
                    const targeIndex = copyChildren.findIndex((item) => item.id === draggingTarget.id);

                    if (currentIndex === -1 || targeIndex === -1) {
                        return {
                            ...node,
                        };
                    }
                    const rest = copyChildren.splice(currentIndex, 1);
                    copyChildren.splice(targeIndex, 0, ...rest);

                    return {
                        ...node,
                        children: copyChildren,
                    };
                }
            }

            return { ...node, children: node.children.map((child) => traverse(child, depth + 1)) };
        }

        setTreeData(traverse(copyTree, currentDepth));
    };

    const changeParent = () => {
        const { deletedNode, newTreeData } = deleteTreeNode2(draggingIndex.id); // 삭제
        const { newTreeData: newTreeData2 } = addTreeSpecificNode(draggingTarget.id, deletedNode, newTreeData);

        setTreeData(newTreeData2);
    };

    useEffect(() => {}, []);

    const providerValue = {
        treeData,
        addTreeNode,
        deleteTreeNode,
        editTreeNodeName,
        handleDragStart,
        handleDragEnd,
        handleDragEnter,
    };

    return (
        <TreeProvider value={providerValue}>
            <TreeContainer id="drag-container">
                <TreeTitle onClick={toggleTools} depth={0} isOver={false}>
                    <i className="ri-folder-fill"></i>
                    {treeData.name}
                    <TreeEditTools isOpen={isTools} id={treeData.id} />
                </TreeTitle>
                <div>
                    {treeData?.children?.map((subItem, index) => (
                        <TreeItem item={subItem} key={subItem.id} />
                    ))}
                </div>
            </TreeContainer>
            <SaveButton type="button" onClick={() => onSave(treeData)}>
                저장
            </SaveButton>
        </TreeProvider>
    );
};

export default DndTreeFolder;
