import React from 'react';
import { CreateBox, CreateBtn, FrontPage, GlobalStyle, LeftCol } from './styles/FrontPage.styled';
import Feed from '../components/Feed';

const Front = () => {
    return (
        <>
        <GlobalStyle />
        <FrontPage>
            <LeftCol>
                <CreateBox>
                    <CreateBtn to='/create-post'>Create Post</CreateBtn>
                </CreateBox>
            </LeftCol>
            <Feed />
            <LeftCol></LeftCol>
        </FrontPage>
        </>
    )
}

export default Front;