import { useState } from "react"
import styled from "styled-components"
import { useCustomForm } from "../../hooks/useCustomForms";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import api from "../../services/API";
import Input from "../../common/form/Input";
import Button from "../../common/form/Button";
import { ButtonWrapper } from "./ButtonWrapper";
import { InputWrapper } from "./InputWrapper";
import { toast } from "react-toastify";

export default function UserData () {

    const [ form, handleForm, setForm ] = useCustomForm()
    const { userData, setUserData } = useContext(UserContext);
    const [refresh, setRefresh] = useState(false)
    const [initialValues, setInitialValues] = useState(undefined)

    useEffect(() => {
        getAllUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])

    function handleRefresh(){
        setRefresh(!refresh)
    }

    function handleLogout(){
        setUserData({})
    }

    async function getAllUserData(){
        try {
            const response = await api.GetUserData(userData?.token)
            setForm({...response?.data})
            setInitialValues(response?.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSubmit() {
        try {
            const updatedFields = ['name', 'telephone', 'email'].reduce((acc, field) => {
                if (form[field] !== initialValues[field]) {
                    acc[field] = form[field];
                }
                return acc;
            }, {});
            const response = await api.UpdateUser({ body: updatedFields, userId: form?.id})
            if( response.status === 200){
                toast.dark("Usuario Alterado com sucesso!")
                handleRefresh()
                return
            }
            console.log(response.data)
        } catch (error) {
            toast.error("Verifique os Campos!")
            console.log(error)
        }
    }

    async function handleDelete() {
        try {
            const response = await api.DeleteUser(form?.id)
            if( response.status === 204){
                toast.dark("Usuario Deletado com sucesso!")
                handleLogout()
                return
            }
            console.log(response.data)
        } catch (error) {
            toast.error("Verifique os Campos!")
        }
    }

    return(
        <Container>
            <h2>Suas Informações</h2>
            <UserActionsContainer>
                <InputWrapper width={"100%"}>
                    <Input
                        label="Nome"     
                        type="text" 
                        name={"name"} 
                        value={form.name} 
                        onChange={handleForm}
                        width="25%"
                    />
                    <Input
                        label="Telefone / Celular"     
                        type="text" 
                        name={"telephone"} 
                        value={form.telephone} 
                        onChange={handleForm}
                        width="20%"
                    />
                </InputWrapper>
                <InputWrapper width={"100%"}>
                    <Input 
                        label="Email"     
                        type="text" 
                        name={"email"} 
                        value={form.email} 
                        onChange={handleForm}
                        width="calc(45% + 10px)"
                    />
                </InputWrapper>

                <ButtonWrapper width={"calc(45% + 10px)"}>
                    <Button onClick={handleSubmit} width={"65%"} height={"55px"} background={"#5577C0 !important"} backgroundhover={"#3C65BD !important"}>{"Salvar Alterações"}</Button>
                    <Button onClick={handleDelete} width={"35%"} height={"55px"} background={"#C05555 !important"} backgroundhover={"#C92D2D !important"}>{"Apagar Conta"}</Button>
                </ButtonWrapper>
            </UserActionsContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    h2 {
        font-size: 25px;
        margin-bottom: 20px;
    }
`
const UserActionsContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    row-gap: 2vh; 
`

