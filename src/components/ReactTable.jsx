import React, { useState, useEffect, useMemo, Fragment } from "react";
import { useTable } from "react-table";
import "../ReactTable.css";
import AddModal from "./AddModal";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, getTasks } from "../redux/actionType";
import { Popconfirm } from "antd";

function ReactTable() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");
  const data = useSelector((state) => state.fetchdata);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(getTasks());
  }, [modalOpen, userInfo]);

  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Priority",
      accessor: "priority",
      Cell: ({ value }) => {
        if (value === 1) return "High";
        else if (value === 2) return "Medium";
        else return "Low";
      },
    },
    {
      Header: "Type",
      accessor: "type",
      Cell: ({ value }) => {
        if (value === 1) return "Task";
        else if (value === 2) return "Story";
        else return "Bug";
      },
    },
    {
      Header: "Label",
      accessor: "label",
      Cell: ({ value }) => {
        return formatLabel(value);
      },
    },
    {
      Header: "DueDate",
      accessor: "dueDate",
      Cell: ({ value }) => {
        const dt = new Date(value);
        return (
          dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear()
        );
      },
    },
    {
      Header: "EDIT",
      accessor: "_id",
      Cell: ({ value }) => {
        return (
          <a href="#" onClick={() => editModal(value)}>
            EDIT
          </a>
        );
      },
    },
    {
      Header: "DELETE",
      accessor: (data) => data._id,
      id: "delete",
      Cell: ({ value }) => {
        return (
          <Popconfirm title="Sure to Delete?" onConfirm={() => delModal(value)}>
            {" "}
            <a href="#">Delete</a>
          </Popconfirm>
        );
      },
    },
  ];

  function delModal(delId) {
    dispatch(deleteTask(delId));
  }

  function editModal(TaskId) {
    setModalOpen(true);
    setId(TaskId);
  }

  function formatLabel(data) {
    const labelString = [];
    data.map((lb) => {
      if (lb === 1) return labelString.push("Feature");
      else if (lb === 2) return labelString.push("Front-End");
      else if (lb === 3) return labelString.push("Change-Request");
      else return labelString.push("Bank-End");
    });
    return labelString.join(",");
  }

  const tableData = useMemo(() => data, [data]);
  const tableColumn = useMemo(() => columns, []);
  const tableInstance = useTable({
    columns: tableColumn,
    data: tableData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Fragment>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button className="Modalbtn" onClick={() => setModalOpen(true)}>
          ADD-Task
        </button>
      </div>
      <AddModal isOpen={modalOpen} setModalOpen={setModalOpen} id={id} />
    </Fragment>
  );
}

export default ReactTable;
