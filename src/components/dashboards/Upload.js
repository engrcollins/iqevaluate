import React, { useState } from "react";
import Backdrop from "../Modal/BackDrop";
import XLSX from "xlsx";

const UpdateServices = ({
  item,
  setItem,
  setUploadErr,
  confirmUpload,
  setOpen,
  result,
}) => {
  const [val, setVal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Ref input element with this function (equiv to gtElemntById methods), Reset fields
  const setFile = (element) => {
    if (element && item === "question") {
      if (!confirmUpload) {
        element.value = null;
      }
    }
    //if(result && !confirmUpload) element.value=null;
  };

  const changedService = (evt) => {
    //console.log('changed')
    setUploadErr({ state: false, message: "" });
    setIsLoading(true);

    var selectedFile = evt.target.files[0];

    //verify the file type
    if (
      selectedFile.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
      return setUploadErr({
        state: true,
        message: "File could not be read!, **accepted formate .xls, .xlsx",
      });
    // console.log(selectedFile)
    var reader = new FileReader();
    const dataSet = [];

    reader.onload = function (event) {
      var data = event.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });

      workbook.SheetNames.forEach(function (sheetName) {
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        for (let i = 0; i < XL_row_object.length; i++) {
          dataSet[i] = XL_row_object[i];
        }
      });
    };

    setTimeout(() => {
      // extract columns naming from sheet
      let cols = Object.keys(dataSet[0]);
      if (
        item === "candidate" &&
        JSON.stringify(cols) !==
          JSON.stringify(["firstName", "lastName", "email", "phoneNumber"])
      ) {
        setIsLoading(false);
        setFile();
        return setOpen({
          state: true,
          msg: "Participants sheet uploaded does not contain required columns",
          type: "error",
        });
      }
      setItem(dataSet);
      setIsLoading(false);
    }, 1000);

    reader.onerror = function (event) {
      setUploadErr({
        state: true,
        message: "File could not be read!, **accepted formate .xls, .xlsx",
      });
      // console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsBinaryString(selectedFile);
  };

  return (
    <div className="">
      <div className="">
        <input
          type="file"
          ref={setFile}
          value={val}
          onClick={(e) => (e.target.value = null)}
          onChange={changedService}
          className=""
          id="fileUpload"
          name="fileUploader"
          accept=".xls, .xlsx"
        />
      </div>
      <Backdrop open={isLoading} setOpen={setIsLoading} />
    </div>
  );
};

export default UpdateServices;
