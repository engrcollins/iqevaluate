import React, { useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { SOURCE } from "../../Source";
import BackdropOnLoad from "../../Modal/BackDrop";

export default function MaterialTableDemo({
  data,
  type,
  handleAdd,
  setGetId,
  handleDel,
}) {
  const token = sessionStorage.getItem("auth");
  //Backdrop for network process
  const [backdrop, setBackdrop] = useState(false);

  const [state, setState] = React.useState({
    columns: [
      { title: "First Name", field: "firstName" },
      { title: "Last Name", field: "lastName" },
      { title: "Email", field: "email", type: "email", editable: "onAdd" },
      { title: "Phone", field: "phoneNumber" },
      { title: "Date", field: "date", type: "date" },
      { title: "Score", field: "score", editable: false },
      { title: "Attempted", field: "hasTaken", editable: false },
    ],
    data: data,
  });
  const options = {
    pageSize: 5,
    pageSizeOptions: [5],
  };

  const handleUpdate = (newRecord, oldRecord) => {
    if (JSON.stringify(newRecord) != JSON.stringify(oldRecord)) {
      //console.log(newRecord)
      const testId = newRecord.testId;
      setBackdrop(true);
      axios
        .post(
          SOURCE.updateParticipants,
          { participants: newRecord, testId: testId },
          { headers: { "auth-token": token } }
        )
        .then((res) => {
          console.log(res);
          setBackdrop(false);
        })
        .catch((err) => {
          console.log(err);
          setBackdrop(false);
        });
    }
  };
  const deleteController = (email, type) => {
    if (window.confirm("Click OK to delete")) return handleDel(email, type);
    return;
  };

  return (
    <>
      <MaterialTable
        title={`Participants for ${type} evaluation`}
        columns={state.columns}
        data={state.data}
        sorting={true}
        options={options}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => deleteController(rowData.email, type),
            // alert("You want to delete " + rowData.email),
          },
        ]}
        editable={{
          onRowAdd: (newData) => {
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
              handleAdd(newData, data);
            });
          },
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
                handleUpdate(newData, oldData);
              }, 600);
            }),
        }}
        // onRowClick={(e,rowData)=>alert(rowData)}
      />
      <BackdropOnLoad open={backdrop} setOpen={setBackdrop} />
    </>
  );
}
