import styled from "styled-components"
import background from "../../assets/images/background2.jpg"
import { useState } from "react"
import { FaUserAstronaut } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import UserData from "../../components/userData/UserData";
import ContactManagement from "../../components/contact/ContactManagement";
import { CiLogout } from "react-icons/ci";
import UserContext from "../../context/UserContext";
import { useContext } from "react";

export default function Auth () {
    
    const [showComponent, setShowComponent] = useState(<ContactManagement/>)
    const { setUserData } = useContext(UserContext);

    function handleSelect(e){
        if ( e === "user") {
            setShowComponent(<UserData/>)
        }
        if ( e === "contact") {
            setShowComponent(<ContactManagement/>)
        }
        return
    }

    function handleLogout(){
        setUserData({})
    }

    return(
        <Container backgroundImage={background}>
            <SubContainer>
                <MenuContainer>
                    <OptionCard onClick={() => handleSelect("user")}>
                        <FaUserAstronaut/>
                        <h3>Meu Perfil</h3>
                    </OptionCard>
                    <OptionCard onClick={() => handleSelect("contact")}>
                        <MdContacts/>
                        <h3>Seus Contatos</h3>
                    </OptionCard>
                    <LogoutButtonStyle onClick={handleLogout}>
                        <CiLogout />
                    </LogoutButtonStyle>
                </MenuContainer>
                <ContentContainer>
                    {showComponent}
                </ContentContainer>
            </SubContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    //background-color: #0F014D;
    display: flex;
    justify-content: center;
    padding-top: ${props => props.hasLogin ? '15vh':'10vh'};
    background-image: url(${props => props.backgroundImage});
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`
const SubContainer = styled.div`
    width: 80%;
    height: 80vh;
    background-color: #FFFFFF;
    box-shadow: 0 8px 50px 0 #00000038;
    border-radius: 10px;
`
const MenuContainer = styled.div`
    height: 15%;
    border-bottom: 3px solid #D4D4D4;
    display: flex;
    align-items: center;
    column-gap: 3vw;
    padding: 0 20px;
    position: relative;
`
const ContentContainer = styled.div`
    height: 85%;
    padding: 20px;
`
const OptionCard = styled.div`
    height: 88px;
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #242424C7;
    color: #ffffff;
    border-radius: 5px;
    row-gap: 10px;
    user-select: none;
    cursor: pointer;
    

    &:hover {
        background-color: #5577C0;
        color: #ffffff;
    }
    h3 {
        font-size: 15px;
    }
    svg {
        font-size: 20px;
    }
`
const LogoutButtonStyle = styled.div`
    font-size: 40px;
    cursor: pointer;
    background-color: #D1D1D1;
    padding: 10px;
    border-radius: 5px;
    position: absolute;
    right: 20px;
`