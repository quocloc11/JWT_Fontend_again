import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete(props) {

    return (
        <>

            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, yare you sureto delete this uers: {props.dataModal.email} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.confirmDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDelete