import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`

export const LeftContainer = styled.div`
    background-image: url(https://images.unsplash.com/photo-1548318281-7da3085ce691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1041&q=80);
    background-size: cover;
    background-position: center;
    flex-basis: 60%;
    height: 100%;
    color: #fff;
    position: relative;
`

export const Overlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.1);
    backdrop-filter: blur(15px);
    position: absolute;
`

export const TitleHolder = styled.div`
    position: relative;
    z-index: 2;
    padding: 5rem;

    h1 {
        font-size: 4.5em;
    }

    h2 {
        font-size: 2em;
        font-weight: normal;
    }
`

export const RightContainer = styled.div`
    flex-basis: 40%;
    position: relative;
    flex-direction: column;
    height: 100%;
    box-shadow: -10px 0 40px rgba(0,0,0,.3);
    display: flex;
    align-items: center;
    justify-content: center;
`

// export const Form = styled.form`
//     display: flex;
//     flex-direction: column;
//     width: 60%; 
// `

export const FormHolder = styled.form`
    display: flex;
    flex-direction: column;
    width: 60%;

    .success {
        font-size: 0.9em;
        font-weight: 700;
        color: #2AAA8A;
        margin-bottom: 20px;

        span {
            text-decoration: underline;
            cursor: pointer;
        }
    }
`

export const InputHolder = styled.div.attrs((props: {isError: boolean}) => props)`
    margin-bottom: 20px;
    width: 100%;

    p {
        font-size: 0.9em;
        font-weight: 700;
        color: #C21807; 
        margin-top: 5px;
    }

    input {
        width: 100%;
        font-weight: 600;
        padding: 15px 20px;
        border: 2px solid ${(props) => props.isError ? `#C21807` : `rgb(235, 235, 235)`};
        border-radius: 8px;
        transition: border-color 0.25s ease-in-out;

        &:focus {
            border-color: rgba(66, 86, 194, 0.8);
        }
    }

    input::placeholder {
        color: rgb(183, 183, 183);
        opacity: 1;
    }
`;

export const ActionHolder = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        cursor: pointer;
        font-size: 0.9em;
        font-weight: 700;
        color: rgb(170, 170, 170);
    }

    button {
        cursor: pointer;
        padding: 15px 20px;
        background: rgb(66, 86, 194);
        border: none;
        border-radius: 8px;
        color: #fff;
        font-weight: 700;
        font-size: 0.9em;

        &:hover {
            box-shadow: 0 5px 20px rgba(0,0,0,.1);
        }
    }
`

export const SocialLoginHolder = styled.div`
    display: flex;
    bottom: 6rem;
    width: 60%;
    justify-content: space-between;
    position: absolute;
    align-items: center;

    .title {
        font-size: 0.9em;
        font-weight: 700;
        color: rgb(170, 170, 170); 
    }
`

export const SocialLogin = styled.div`
    display: flex;

    p {
        font-size: 0.9em;
        font-weight: 700;
        color: rgb(66, 86, 194);
        margin-left: 10px;
        cursor: pointer;
    }
`