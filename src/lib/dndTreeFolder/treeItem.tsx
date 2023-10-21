import React, { useState, useEffect, memo } from "react";

import { TreeTitle, SubTree, TreeOpenIcon, TreeItemContainer } from "./treeStyle";

import TreeEditTools from "./treeEditTools";

import { useTreeContext } from "./useTreeContext";

import { TreeData } from "./types";

interface Props {
    item: TreeData;
    depth?: number;
}

const TreeItem: React.FC<Props> = ({ item, depth = 1 }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isTools, setIsTools] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false); // 현재 노드 위에 아이템이 있는지
    const { handleDragStart, handleDragEnd, handleDragEnter, isEdit } = useTreeContext();
    const icon = isOpen ? <i className="ri-arrow-down-line"></i> : <i className="ri-arrow-right-line"></i>;

    const toggleOpen = (e: any) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const toggleTools = () => {
        setIsTools((prev) => !prev);
    };

    useEffect(() => {
        let currentDraggedItemId: any = null;

        const dragContainer = document.getElementById(`drag-container`);

        if (!dragContainer) return;

        dragContainer?.addEventListener("dragstart", (event) => {
            const target = event.target as HTMLElement;
            event.dataTransfer?.setData("text/plain", target.id);
            currentDraggedItemId = target.id;
        });

        dragContainer?.addEventListener("dragover", (event) => {
            event.preventDefault();

            if (!currentDraggedItemId) return;

            let draggableItem = document.getElementById(currentDraggedItemId); // Find the currently dragged item

            if (draggableItem !== null) {
                draggableItem.style.opacity = "0";
                draggableItem.style.height = "0px";
            }
        });

        dragContainer?.addEventListener("drop", (event) => {
            event.preventDefault();
            let draggableItem = document.getElementById(currentDraggedItemId);

            if (draggableItem !== null) {
                draggableItem.style.opacity = "1";
                draggableItem.style.height = "32px";
            }

            setIsOver(false); // drop 한 이후에 isOver를 항상 초기화
            setIsDragging(false);
        });

        return () => {
            dragContainer.removeEventListener("dragstart", () => {});
            dragContainer.removeEventListener("dragover", () => {});
            dragContainer.removeEventListener("drop", () => {});
        };
    }, []);

    return (
        <TreeItemContainer>
            <TreeTitle
                id={`draggable-item-${item.id}-${depth}`}
                onClick={toggleTools}
                depth={depth}
                isOver={isOver}
                draggable
                onDragStart={(event) => {
                    setIsDragging(true);
                    setIsOpen(false);
                    handleDragStart(item.id);
                }}
                onDragEnter={(e) => {
                    setIsOver(true);
                    handleDragEnter(item.id);
                }} // 내 위로 다른 드래그 아이템이 올 때
                onDragEnd={(event) => {
                    handleDragEnd();
                    setIsDragging(false);
                }}
                onDragLeave={(e) => {
                    setIsOver(false);
                }} // 내 위에서 드래그 아이템이 떠날 떄
            >
                <TreeOpenIcon onClick={toggleOpen}>{item?.children.length > 0 ? icon : ""}</TreeOpenIcon>
                {item?.children.length > 0 ? <i className="ri-folder-line"></i> : <i className="ri-file-line"></i>}
                {item.name}
                <TreeEditTools isOpen={isTools} id={item.id} isEdit={isEdit} />
            </TreeTitle>

            {isOpen && (
                <SubTree isOpen={isOpen}>
                    {item?.children?.map((subItem) => (
                        <TreeItem item={subItem} key={subItem.id} depth={depth + 1} />
                    ))}
                </SubTree>
            )}
        </TreeItemContainer>
    );
};

export default memo(TreeItem);
