import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import '../ReactTable.css'
import AddModal from './AddModal';
import Modal from 'react-modal';
// import Task from "./Task"

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

function ReactTable(){
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: userInfo.accessToken,
          }
    }
   useEffect(()=> {
        const abortConst = new AbortController();
        axios.get("https://task-management-rest-app.herokuapp.com/api/tasks",config,{signal:abortConst.signal})
        .then(res => setData(res.data.data))
        .catch(error => console.log(error));
        console.log('useEffect')
        return ()=> abortConst.abort();
    },[]);
console.log(data);
    const columns = [
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Description',
            accessor: 'description',
        },
        {
            Header: 'Priority',
            accessor: 'priority',
            Cell: ({value}) => {
                if(value===1)
                return 'High'
                else if(value===2)
                return 'Medium'
                else return 'Low'
            }
        },
        {
            Header: 'Type',
            accessor: 'type',
            Cell: ({value}) =>{ 
                if(value===1)
                return 'Task'
                else if (value===2)
                return 'Story'
                else return 'Bug'
            }
        },
        {
            Header: 'Label',
            accessor: 'label',
            Cell:({value}) =>{
             return formatLabel(value)
            }  
                    
        },        
        {
            Header: 'DueDate',
            accessor: 'dueDate',
            Cell: ({value}) =>{
                const dt = new Date(value)
                return (dt.getDate()+"-"+ (dt.getMonth()+1)+"-" + dt.getFullYear())
            }
        },
        {
            Header:'EDIT',
            Cell : ({value}) => <button>EDIT</button>
        },
        {
            Header:'DELETE',
            Cell : ({value}) => <a href='#'>DELETE</a>
        }
    ];

    function formatLabel(data)
    {
        const labelString = [];
        data.map(lb=>{
            if(lb===1)
            return labelString.push('Feature')
            else if (lb===2)
              return labelString.push('Front-End')
             else if (lb===3)
              return labelString.push('Change-Request')
              else return  labelString.push('Bank-End')
        })
        return labelString.join(',')
    }

    const tableData = useMemo(()=> data, [data])
    const tableColumn = useMemo(()=> columns,[])
    const tableInstance = useTable({
        columns :tableColumn,
        data: tableData
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return(<Fragment>
         <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                {column.render('Header')}
                </th>
            ))}
            </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row =>{
            prepareRow(row)
            return(
            <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
                return(
                <td {...cell.getCellProps()}>
                {cell.render('Cell')}
                </td>
                )
            })}
            </tr>
            )
        })}
        </tbody>
    </table>
    <button onClick={()=> setModalOpen(true) }>ADD</button>
    <AddModal isOpen={modalOpen} setModalOpen={setModalOpen} />
    </Fragment>);
}

export default ReactTable