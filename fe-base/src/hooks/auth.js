import React, {useEffect, useState} from "react";
import USER from "../services/userService";
import {Navigate} from "react-router-dom";
import {continueRender, delayRender} from "remotion";

const Auth = (props) => {
    let [role, setRole] = React.useState(null);
    const [handle] = useState(() => delayRender());

    useEffect(() => {
        (async () => {
            let result = await USER.me();
            if (result.user_id) {
                setRole(result.role);
            } else {
                setRole(ROLE.GUEST);
            }
            continueRender(handle);
        })();
    }, []);
    if (props.role === ROLE.GUEST && role !== ROLE.GUEST) return <Navigate to={props.path}/>;
    return (
        role < props.role ? <Navigate to={props.path}/> : props.children
    )
}
export default Auth;
const ROLE = {
    ADMIN: 2,
    MANAGER: 1,
    USER: 0,
    GUEST: -1
};
export {ROLE};
