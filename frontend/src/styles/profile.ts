import styled from "styled-components";

export const Wrapper = styled.div`
    background-color: rgb(249, 249, 251);
    min-height: 100vh;
    // width: 100vw;
    padding-top: 60px;
`;

export const Container = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    // margin-top: 60px;
    padding: 40px 0;
    display: flex;
    flex-wrap: wrap;
`;

export const Holder = styled.div`
    padding: 40px;
    width: 100%;
    margin: 10px;
    background: #fff;
    border: 1px solid rgba(243, 243, 245, 1);
    border-radius: 8px;
    box-shadow: 0 3px 5px rgba(0,0,0,.03);

    .no-data {
        text-align: center;
        font-size: 1.1em;
        font-weight: 700;
        color: rgb(170, 170, 170);
        margin-top: 20px;
    }

    button {
        text-align: center;
        width: 40%;
        cursor: pointer;
        padding: 15px 20px;
        background: rgb(66, 86, 194);
        border: none;
        border-radius: 8px;
        color: #fff;
        font-weight: 700;
        font-size: 0.9em;
        margin-top: 40px;
    }
`;

export const TitleHolder = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        display: flex;
    }

    p {
        font-size: 0.9em;
        font-weight: 700;
        color: rgb(170, 170, 170);
        cursor: pointer;
        transition: color 0.25s ease-in-out;
        margin-left: 20px;

        &:hover {
            color: rgb(66, 86, 194);

            &.cancel {
                color: #C21807;
            }
        }
    }
`;

export const List = styled.div`
    margin-top: 40px;
`;

export const InnerList = styled.div`
    font-size: 0.9em;
    font-weight: 700;
    display: flex;

    table {
        width: 100%;
        margin: -10px;
    }

    tr {
        // margin: -10px;
    }

    td {
        padding: 10px;

        &:first-child {
            width: 20px;
        }
    } 

    p {
        margin-bottom: 10px;
        
        &:last-child {
            margin: 0;
        }
    }

    .title {
        color: rgb(170, 170, 170);
        margin-right: 10px;
    }
    
    .error {
        font-size: 0.9em;
        font-weight: 700;
        color: #C21807;
        margin-top: 5px !important;
    }

    .value {
        color: #333;
    }
`;

export const InputField = styled.input.attrs((props: {isError: boolean}) => props)`
    width: 100%;
    font-weight: 600;
    padding: 15px 20px;
    border: 2px solid ${(props) => props.isError ? `#C21807` : `rgb(235, 235, 235)`};
    border-radius: 8px;
    transition: border-color 0.25s ease-in-out;

    &:focus {
        border-color: rgba(66, 86, 194, 0.8);
    }
`

export const ActionHolder = styled.div`
    display: flex;
    justify-content: center;
`

export const AccountList = styled.div`
    margin-top: 20px;
    padding: 15px 0;
    border-bottom: 1px solid rgb(235, 235, 235);
    display: flex;
    align-items: center;

    img {
        width: 40px;
        margin-right: 15px;
        box-shadow: 0 5px 10px rgba(0,0,0,.15);
        border-radius: 100%;
    }

    p {
        font-size: 0.9em;
        font-weight: 700;
        color: #333;
    }
`