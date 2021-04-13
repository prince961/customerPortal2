import React, { useState } from "react";
import CreateSingle from "./components/CreateOrderSingle";

import Modal from "../../components/UIElements/Modal";
import Dropzone from "../../components/Dropzone/Dropzone";
import UploadCsv from "./components/UploadCsv";
import demoFile from "./util/demo.csv";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  downloadBtn: {
    background: "red",
    color: "white",
    marginLeft: "1rem",
  },
});

const CreateOrder = () => {
  const classes = useStyles();
  const [selecting, setSelecting] = useState(null);
  const [single, setSingle] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [showUploadCsv, setShowUploadCsv] = useState(false);

  const [files, setFile] = useState([]);
  const onSelectingHandler = () => {
    setSingle(true);
    setSelecting(!selecting);
    setShowModal(!showModal);
  };
  return (
    <div className={classes.content}>
      <Modal
        show={showModal}
        onCancel={() => setShowModal(false)}
        header={
          <div className="header-content">
            {showUploadCsv && (
              <Button
                color="primary"
                variant="contained"
                onClick={() => setShowUploadCsv(false)}
              >
                <i className="fas fa-2x fa-long-arrow-alt-left"></i>
              </Button>
            )}

            <h3>Upload Package</h3>
          </div>
        }
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button variant="outlined" href={"/"} color="secondary">
              CANCEL
            </Button>
            <Button
              className={classes.downloadBtn}
              variant="contained"
              href={demoFile}
            >
              DOWNLOAD SAMPLE
            </Button>
          </>
        }
      >
        <div
          className="center navbar-modal-content"
          // style={{ display: showUploadCsv && "none" }}
        >
          {!showUploadCsv ? (
            <>
              <div className="modal-content">
                <h3>Bulk Package Upload</h3>
                <p>
                  You can upload the packages in bulk through excel sheet or
                  create single package
                </p>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setShowUploadCsv(true)}
                >
                  UPLOAD PACKAGE
                </Button>
              </div>
              <hr className="center" />
              <div>
                <h3>Create Single Package</h3>
                <p>Fill up the form to create single package</p>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={onSelectingHandler}
                >
                  CREATE
                </Button>
              </div>
            </>
          ) : (
            <Dropzone
              setFiles={setFile}
              setModal={setShowModal}
              setSelecting={setSelecting}
              setSingle={setSingle}
            />
          )}
        </div>
      </Modal>
      <div>
        <h1>Create Order</h1>
        {selecting ? (
          single ? (
            <CreateSingle />
          ) : (
            <UploadCsv files={files} />
          )
        ) : (
          <div>
            <Button variant="outlined" color="secondary" href={"/create"}>
              Please Select a Mode
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateOrder;
