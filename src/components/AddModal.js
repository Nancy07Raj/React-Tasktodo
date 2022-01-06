import Modal from 'react-modal';
import React from 'react';
import TaskRedux from "./TaskRedux";


function AddModal({isOpen,setModalOpen,id}){
    return(<>
    <Modal isOpen ={isOpen} onRequestClose={()=>setModalOpen(false)}>
    <button onClick={()=> setModalOpen(false)}>X</button>
    <TaskRedux Id={id}/>
    </Modal>
    </>)

}

export default AddModal