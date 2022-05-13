import styled from "styled-components";

export const NavBar = styled.div`
    height: 70px;
    box-shadow: 0 1px 0px rgba(243, 243, 245, 1);
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #fff;
    padding: 0 40px;

    button {
        background: none;
        border: none;
        font-size: 0.9em;
        cursor: pointer;
        font-weight: 700;
        color: rgb(170, 170, 170);
        transition: color 0.25s ease-in-out;

        &:hover {
            color: rgb(66, 86, 194);
        }
    }
`