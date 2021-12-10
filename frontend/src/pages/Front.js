import React from 'react';
import { CreateBox, CreateBtn, FrontPage, LeftCol } from './styles/FrontPage.styled';
import Feed from '../components/Feed';

const Front = () => {
    return (
        <FrontPage>
            <LeftCol>
                <CreateBox>
                    <CreateBtn to='/create-post'>Create Post</CreateBtn>
                </CreateBox>
            </LeftCol>
            <Feed />
            <LeftCol></LeftCol>
        </FrontPage>
    )
}

export default Front;