import { useState, useEffect } from "react";
import { FullInfo } from "../MainPage/MainPage";
import { me } from "../../api/user/index";

const ProfilePage = () => {
    const [user, setUser] = useState<FullInfo>(null);

    useEffect(() => {
        me().then((res) => {
            setUser(res);
        });
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <p>{user?.name}</p>
            <p>{user?.middleName}</p>
            <p>{user?.surname}</p>
            <p>{user?.username}</p>
            <p>{user?.createDate}</p>
            <p>{user?.departmentRoles.map((role) => role.department.name)}</p>
            
        </div>
    );
};
export default ProfilePage;
