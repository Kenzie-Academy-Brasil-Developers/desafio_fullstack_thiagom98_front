import styled from "styled-components"
import { toast } from "react-toastify"
import { useContext, useState } from "react"
import { ButtonWrapper } from "./ButtonWrapper"
import { InputWrapper } from "./InputWrapper"
import { Spinner } from "../../common/spinner/Spinner"
import { useCustomForm } from "../../hooks/useCustomForms"
import api from "../../services/API"
import UserContext from "../../context/UserContext"
import Button from "../../common/form/Button"
import Input from "../../common/form/Input"
import useNavigateAndMoveUp from "../../hooks/useNavigateAndMoveUp"
import { ChangeAuthButton } from "./SignUp"

export default function Login ({changeAuth}) {

    const [form, handleForm] = useCustomForm()
    const { setUserData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)

    const navigateAndMoveUp = useNavigateAndMoveUp();

    async function SubmitForms(){
        setIsLoading(true)
        if (!form?.email|| !form?.password){
            setIsLoading(false)
            return toast.error("Preencha todos os Campos")
        }

        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!RegExp(emailRegex).test(form.email)){
            setIsLoading(false)
            return toast.error("Formato de email inválido")
        }

        const body = {
            email: form.email,
            password: form.password
        }

        try {           
            const response = await api.CreateSession(body)

            if( response.status === 200){

                setUserData(response.data)
                toast.dark("Login realizado com sucesso!")
                setIsLoading(false)
                navigateAndMoveUp({locate: ""})
                return
            }

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast.error("Verifique os valores !!")
            return
        }
    }

    return(
        <Container isLoading={isLoading}>

            <h2>AgendaONLINE</h2>

            <UserActionsContainer isLoading={isLoading}>

                <InputWrapper width={"100%"}>
                    <Input 
                        label="Email"     
                        type="text" 
                        name={"email"} 
                        value={form.email} 
                        onChange={handleForm}
                        width="80%"
                        disabled={isLoading}
                    />
                </InputWrapper>
                <InputWrapper width={"100%"}>
                    <Input 
                        label="Senha"     
                        type="password" 
                        name={"password"} 
                        value={form.password} 
                        onChange={handleForm}
                        width="80%"
                        disabled={isLoading}
                    />
                </InputWrapper>
                <ButtonWrapper width={"100%"}>
                    <Button onClick={() => SubmitForms()} width={"80%"} height={"55px"}>{"Entrar"}</Button>
                    <ChangeAuthButton onClick={changeAuth}>Criar um Cadastro</ChangeAuthButton>
                </ButtonWrapper>

            </UserActionsContainer>

            {isLoading ? (<Spinner/>):(<></>)}
            
        </Container>
    )
}

const Container = styled.div`
    width: 490px;
    height: 500px;
    background-color: #FFFFFF;
    box-shadow: 0 8px 50px 0 #00000038;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5vh;
    row-gap: 5vh;
    position: relative;
    h2 {
        font-size: 40px;
        font-weight: 700;
        margin-top: 2vh;
        color: #02131b;
    }
    @media (max-width: 850px) {
        width: 100%;
    }
`
const UserActionsContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    row-gap: 3vh; 
    opacity: ${props => props.isLoading ? ("0.2"):("1")};
    pointer-events: ${props => props.isLoading ? ("none"):("initial")};
`