import styled from "styled-components"
import { toast } from "react-toastify"
import { useContext, useState } from "react"
import { ButtonWrapper } from "./ButtonWrapper"
import { InputWrapper } from "./InputWrapper"
import { useCustomForm } from "../../hooks/useCustomForms"
import api from "../../services/API"
import UserContext from "../../context/UserContext"
import Button from "../../common/form/Button"
import Input from "../../common/form/Input"
import { Spinner } from "../../common/spinner/Spinner"

export default function SignUp ({changeAuth}) {

    const [form, handleForm] = useCustomForm()
    const { setUserData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)

    async function SubmitForms(){

        setIsLoading(true)
        
        if (!form?.email || !form?.name || !form?.password || !form?.passwordVerify) {
            setIsLoading(false)
            return toast.error("Preencha todos os Campos")
        }

        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!RegExp(emailRegex).test(form.email)){
            setIsLoading(false)
            return toast.error("Formato de email inválido")
        }
        if (form?.name?.length > 45) {
            setIsLoading(false)
            return toast.error("O nome deve ter no maximo 45 caracteres")
        }
        if (form?.email?.length > 45) {
            setIsLoading(false)
            return toast.error("O email deve ter no maximo 45 caracteres")
        }
        if (form?.password?.length > 120) {
            setIsLoading(false)
            return toast.error("A senha deve ter no maximo 120 caracteres")
        }
        if (form?.password !== form?.passwordVerify) {
            setIsLoading(false)
            return toast.error("As senhas devem ser iguais")
        }
        if (form?.telephone?.length > 45) {
            setIsLoading(false)
            return toast.error("O telefone deve ter no maximo 45 caracteres")
        }

        const body = {
            email: form.email,
            name: form.name,
            telephone: form.telephone,
            password: form.password,
            passwordVerify: form.passwordVerify
        }

        try {           
            const response = await api.CreateAccount(body)

            if( response.status === 201){
                setUserData(response.data)
                toast.dark("Cadastro realizado com sucesso!")
                setIsLoading(false)
                changeAuth()
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
                        label="Nome"     
                        type="text" 
                        name={"name"} 
                        value={form.name} 
                        onChange={handleForm}
                        width="80%"
                        disabled={isLoading}
                    />
                </InputWrapper>
                <InputWrapper width={"100%"}>
                    <Input 
                        label="Telefone / Celular"     
                        type="text" 
                        name={"telephone"} 
                        value={form.telephone} 
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
                <InputWrapper width={"100%"}>
                    <Input 
                        label="Digite sua senha novamente"     
                        type="password" 
                        name={"passwordVerify"} 
                        value={form.passwordVerify} 
                        onChange={handleForm}
                        width="80%"
                        disabled={isLoading}
                    />
                </InputWrapper>
                <ButtonWrapper width={"100%"}>
                    <Button onClick={() => SubmitForms()} width={"80%"} height={"55px"}>{"Criar"}</Button>
                    <ChangeAuthButton onClick={changeAuth}>Ja tenho um Cadastro</ChangeAuthButton>
                </ButtonWrapper>

            </UserActionsContainer>

            {isLoading ? (<Spinner/>):(<></>)}
            
        </Container>
    )
}

const Container = styled.div`
    width: 490px;
    height: 750px;
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
    row-gap: 2.5vh; 
    opacity: ${props => props.isLoading ? ("0.2"):("1")};
    pointer-events: ${props => props.isLoading ? ("none"):("initial")};
`
export const ChangeAuthButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1.5vh;
    user-select: none;
    cursor: pointer;
    text-decoration: underline;
    color: #707070;
`