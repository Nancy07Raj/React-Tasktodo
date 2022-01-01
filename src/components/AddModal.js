import Modal from 'react-modal';
import React from 'react';
// import { Formik } from 'formik';
// import { Form,Input,SubmitButton,ResetButton } from 'antd'
import Task from "./Task";


function AddModal({isOpen,setModalOpen}){

    return(<>
    <Modal isOpen ={isOpen} onRequestClose={()=>setModalOpen(false)}>
    <button onClick={()=> setModalOpen(false)}>X</button>
    <Task />
    </Modal>
    </>)

}

export default AddModal