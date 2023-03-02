import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, fetchUsersAsync } from './userManageSlice';

const UserManagement = ()=>{
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatchEvent(fetchUsersAsync());
    }, [dispatch]);

    return(
        <div id="allusers">
            <p>this is where you would view all registered users</p>
            {users && users.length ? users.map((users)=>(
                <div id = "userdiv" key ={`users ${users.id}`}>
                    <h3>Username: {users.username}, Password: {users.password}</h3>
                </div>
            )):null}
        </div>
    );
}

export default UserManagement;