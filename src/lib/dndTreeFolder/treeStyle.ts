import styled from "@emotion/styled";

// 사이드바 전체를 감싸는 div
export const TreeContainer = styled.div`
    min-width: 16rem;
    margin: 0 auto;
    height: auto;
    min-height: 70vh;
    font-size: 14px;
`;

export const TreeItemContainer = styled.div`
    /* transition: transform 0.2s ease; */
    /* border: 1px solid red; */
`;

//  하위트리 묶어줄 div
export const SubTree = styled.div<{
    isOpen: boolean;
}>`
    overflow: hidden;
    max-height: ${(props) => (props.isOpen ? "100%" : "0")};
`;

// 메뉴명
export const TreeTitle = styled.div<{
    depth: number;
    isOver: boolean;
}>`
    display: flex;
    align-items: center;
    column-gap: 1rem;
    height: 32px;
    padding-left: ${(props) => props.depth * 20}px;
    background-color: ${(props) => (props.isOver ? "lightgray" : "transparent")};
    opacity: ${(props) => (props.isOver ? "0.5" : "1")};
    transition: all 0.3s ease;

    &:hover {
        background-color: #f6f6f2;
        cursor: pointer;
    }
`;

export const TreeToolsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: noe;
`;

export const TreeToolsIcon = styled.div`
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TreeOpenIcon = styled.span`
    width: 25px;
    height: 25px;

    &:hover {
        background-color: lightgray;
    }
`;

export const TreeNameForm = styled.div`
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
`;

export const SaveButton = styled.button`
    padding: 16px 20px;
    background-color: dodgerblue;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    color: white;
    border-radius: 20px;
`;
