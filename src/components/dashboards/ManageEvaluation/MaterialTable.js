import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { SOURCE } from "../../Source";

export default function MaterialTableDemo({
  data,
  handleGetDetails,
  handleDel,
}) {
  const token = sessionStorage.getItem("auth");

  const [state, setState] = React.useState({
    columns: [
      { title: "Evaluation name", field: "title", editable: false },
      { title: "Evaluation Id", field: "testId", editable: false },
      { title: "Date", field: "date" },
      { title: "Duration(min)", field: "duration" },
    ],
    data: data,
  });
  const options = {
    pageSize: 5,
    pageSizeOptions: [5],
  };
  const [open, setOpen] = React.useState(false);

  //update to database   if edited
  const dataBaseUpdate = (newRecord, oldRecord) => {
    if (
      newRecord.date !== oldRecord.date ||
      newRecord.duration !== oldRecord.duration
    ) {
      const date = newRecord.date;
      const duration = newRecord.duration;
      const testId = newRecord.testId;
      axios
        .post(
          SOURCE.updateEvaluation,
          { date: date, duration: duration, testId: testId },
          { headers: { "auth-token": token } }
        )
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => console.log(err));
      // alert('i will fetch')
    }
  };
  const deleteController = (id) => {
    if (window.confirm("Click OK to delete")) return handleDel(id);
    return;
  };

  return (
    <MaterialTable
      title="My Evaluations"
      columns={state.columns}
      data={state.data}
      sorting={true}
      options={options}
      actions={[
        {
          icon: "delete",
          tooltip: "Delete User",
          onClick: (event, rowData) => deleteController(rowData.testId),
          // alert("You want to delete " + rowData.testId),
        },
      ]}
      editable={{
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
                dataBaseUpdate(newData, oldData);
              }
            }, 600);
          }),
      }}
      onRowClick={(e, rowData) => handleGetDetails(rowData.testId)}
    />
  );
}
