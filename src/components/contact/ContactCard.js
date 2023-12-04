import styled from "styled-components"
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { useCustomForm } from "../../hooks/useCustomForms";
import { FaCheck, FaTrash  } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../services/API";

export default function ContactCard ({contactData, handleRefresh, userData}) {

    const [ editMode, setEditMode ] = useState(false)
    const [ form, handleForm ] = useCustomForm({name: contactData?.name, email: contactData?.email, telephone: contactData?.telephone}) 
    
    function handleEdit() {
        setEditMode(!editMode)
    }

    async function handleSave() {
        try {
            const body = {
                name: form?.name,
                telephone: form?.telephone,
                email: form?.email
            }
            const response = await api.UpdateContact({ body, token: userData?.token, contactId: contactData?.id})
            if( response.status === 200){
                toast.dark("Contato Alterado com Sucesso!")
                setEditMode(!editMode)
                handleRefresh()
                return
            }
            console.log(response.data)
        } catch (error) {
            toast.error("Verifique os campos!")
            console.log(error)
        }
    }


    async function handleDelete() {
        try {
            const response = await api.DeleteContact({ token: userData?.token, contactId: contactData?.id})
            if( response.status === 204){
                toast.dark("Contato Deletado com Sucesso!")
                handleRefresh()
                return
            }
            console.log(response.data)
        } catch (error) {
            toast.error("Verifique os campos!")
            console.log(error)
        }
    }

    return(
        <Container editMode={editMode}>
            { editMode
                ? <>
                    <p>
                        Nome: 
                        <input
                            onChange={handleForm}
                            placeholder="Nome"
                            name="name"
                            value={form.name}
                        />
                    </p>
                    <p>
                        Email: 
                        <input
                            onChange={handleForm}
                            placeholder="Email"
                            name="email"
                            value={form.email}
                        />
                    </p>
                    <p>
                        Telefone: 
                        <input
                            onChange={handleForm}
                            placeholder="Telefone"
                            name="telephone"
                            value={form.telephone}
                        />
                    </p>

                    <SaveButtonStyle onClick={handleSave}>
                        <FaCheck />
                    </SaveButtonStyle>
                </>
                : <>
                    <p>Nome: <span>{form?.name}</span></p>
                    <p>Email: <span>{form?.email}</span></p>
                    <p>Telefone: <span>{form?.telephone}</span></p>

                    <EditButtonStyle onClick={handleEdit}>
                        <CiEdit />
                    </EditButtonStyle>

                    <DeleteButtonStyle onClick={handleDelete}>
                        <FaTrash />
                    </DeleteButtonStyle>
                </>
            }    
        </Container>
    )
}

const Container = styled.div`
    width: 400px;
    height: 125px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    row-gap: 8px;
    background-color: transparent;
    box-shadow: 0 0 5px 5px #3D3D3D11;
    border-radius: 5px;
    font-weight: 700;
    position: relative;
    &:hover {
        > div {
            display: initial
        }
    }
    span {
        color: #1F1F1F;
        font-weight: 500;
        margin-left: 5px;
    }
    input {
        border: 1px solid #ccc;
        padding: 5px;
        margin-left: 10px;
        width: 190px;
        border-radius: 4px;

        &:focus {
            outline: none;
            border-color: #4d90fe;
        }

        &::placeholder {
            color: #888;
        }
    }
`
const EditButtonStyle = styled.div`
    position: absolute;
    display: none;
    font-size: 25px;
    top: 20px;
    right: 15px;
    background-color: #5577C063;
    border-radius: 5px;
    color: #FFFFFF;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background-color: #5577c0;
    }
`
const SaveButtonStyle = styled(EditButtonStyle)`
    display: initial;
    background-color: #76AA6685;
    font-size: 15px;
    padding: 10px;
    top: 45px;
    &:hover {
        background-color: #76AA66;
    }
`
const DeleteButtonStyle = styled(EditButtonStyle)`
    background-color: #AA666685;
    font-size: 15px;
    padding: 10px;
    top: initial;
    bottom: 20px;
    &:hover {
        background-color: #BD4747;
    }
`
