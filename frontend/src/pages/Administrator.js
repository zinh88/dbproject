import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteMod, GlobalStyle, Input, ModeratorBox, ModeratorDisplay, ModForm, SetMod } from "./styles/Administrator.styled";
import { Wrapper } from "./styles/Wrapper.styled";

const Administrator = () => {
    const [mods, setMods] = useState([]);
    const [email, setEmail] = useState('');

    const setMod = (e) => {
        e.preventDefault();
        axios.post('/api/roles/setmod', {
            email: email
        }, 
        {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((resp) => {
            console.log(resp);
            getMods();
        })
        .catch((err) => {
            console.log(err.response.data.message);
        })
    }

    const getMods = () => {
        axios.get('/api/roles/mods', {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then((resp) => {
            setMods([...resp.data.mods]);
        })
        .catch((err) => console.log(err));
    }

    useEffect(getMods);

    const deleteMod = (id) => {
        axios.delete(`/api/roles/mods/${id}`,
        {
            headers: {
                'Authorization': localStorage.Authorization
            }
        })
        .then(() => getMods())
        .catch(err => console.log(err))
    }
    

    return (
        <>
        <GlobalStyle />
        <Wrapper>
            <ModeratorBox>
                <ModForm onSubmit={setMod}>
                    <Input placeholder="Write exact email of Member" onChange={(e)=> {setEmail(e.target.value)}}></Input>
                    <SetMod  type="submit">Set Mod</SetMod>
                </ModForm>
                Moderators:
                {
                    mods.map(( {id ,name, email}, i) => 
                        <ModeratorDisplay key={i}>
                            {`${name}  (${email})`}
                            <DeleteMod onClick={() => deleteMod(id)}>Remove</DeleteMod>
                        </ModeratorDisplay>
                    )
                }
                
            </ModeratorBox>
        </Wrapper>
        </>
    )
}

export default Administrator;