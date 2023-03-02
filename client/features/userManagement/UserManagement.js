import React, {useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, fetchUsersAsync } from './userManageSlice';

const UserManagement = ()=>{
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();

    console.log(users);
    useEffect(()=>{
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    return(
        <div id="allusers">
            <h3>Registered Users:</h3>
            {users && users.length ? users.map((users)=>(
                <div id = "userdiv" key ={`users ${users.id}`}>
                    <p>Username: {users.username}, id: {users.id}</p>
                </div>
            )):null}
        </div>
    );
}

export default UserManagement;