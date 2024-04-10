import { useDispatch, useSelector } from "react-redux";
import { addRole, getRoles } from "../services/RoleService";
import { useEffect, useState } from "react";
import React from 'react'
import { ModalContent, ModalActions, Header, Modal } from 'semantic-ui-react'
import HeaderPage from "../Header";
import { Button, Input } from "@mui/material";

const Roles = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!roles.length)
            dispatch(getRoles());
    }, []);
    const roles = useSelector(state => state.roles);

    const [newRole, setNewRole] = useState("");
    const [open, setOpen] = React.useState(false);

    const add = (r) => {
        dispatch(addRole(r));
    }

    return <>
        <HeaderPage />
        <Modal
            closeIcon
            open={open}
            trigger={<Button>add category</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            {/* <Header content='add new role' /> */}
            <ModalContent>
                <p>
                    Enter role`s name
                </p>
                <Input onChange={(e) => { setNewRole(e.target.value) }}></Input>
            </ModalContent>
            <ModalActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                    setOpen(false)
                    add(newRole)
                }} positive>
                    Ok
                </Button>
            </ModalActions>
        </Modal>
        {roles?.map((r, i) => (
            <div key={i}>{r?.name}</div>
        ))}
    </>
}
export default Roles;