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
import ContactCard from "./ContactCard";
import { toast } from "react-toastify";

export default function ContactManagement () {

    const [ form, handleForm ] = useCustomForm()
    const { userData } = useContext(UserContext);
    const [ contactsData, setContactData ] = useState(undefined)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        getAllUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])

    async function getAllUserData(){
        try {
            const response = await api.GetUserData(userData?.token)
            setContactData(response?.data?.contacts) 
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSubmit() {
        try {
            const body = {
                name: form?.name,
                telephone: form?.telephone,
                email: form?.email
            }
            const response = await api.CreateContact({ body, token: userData?.token})
            if( response.status === 201){
                toast.dark("Contato salvo com sucesso!")
                handleRefresh()
                return
            }
            console.log(response.data)
        } catch (error) {
            toast.error("Verifique os campos!")
            console.log(error)
        }
    }

    function handleRefresh() {
        setRefresh(!refresh)
    }

    return(
        <Container>
            <h2>Novo Contato</h2>

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
                    <Button onClick={handleSubmit} width={"100%"} height={"55px"} background={"#5577C0 !important"} backgroundhover={"#3C65BD !important"}>{"Criar"}</Button>
                </ButtonWrapper>
            </UserActionsContainer>

            <h2>Lista de Contatos</h2>

            <UserList>
                {(contactsData && contactsData?.length > 0) 
                    ? contactsData?.map( e => <ContactCard contactData={e} handleRefresh={handleRefresh} userData={userData}/>)
                    : <>Nenhum contato cadastrado ainda</>
                }
            </UserList>
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
const UserList = styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    gap: 30px;
    padding: 10px 0;
    overflow-y: scroll;
`

