import React, { useState } from "react";
import CreateSingle from "./components/CreateSingle";

import Button from "../../shared/components/UIElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Dropzone from "../../shared/components/Dropzone/Dropzone1";
import UploadCsv from "./components/UploadCsv";
import demoFile from "./util/demo.csv";
const CreateOrder = () => {
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
    <>
      <Modal
        show={showModal}
        onCancel={() => setShowModal(false)}
        header={
          <div className="header-content">
            {showUploadCsv && (
              <Button danger onClick={() => setShowUploadCsv(false)}>
                <i className="fas fa-long-arrow-alt-left"></i>
              </Button>
            )}

            <h3>Upload Package</h3>
          </div>
        }
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button href={"/"} danger>
              CANCEL
            </Button>
            <Button href={demoFile}>DOWNLOAD SAMPLE</Button>
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
                <Button inverse onClick={() => setShowUploadCsv(true)}>
                  UPLOAD PACKAGE
                </Button>
              </div>
              <hr className="center" />
              <div>
                <h3>Create Single Package</h3>
                <p>Fill up the form to create single package</p>
                <Button onClick={onSelectingHandler}>CREATE</Button>
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
        <h1>Orders</h1>
        {selecting ? (
          single ? (
            <CreateSingle />
          ) : (
            <UploadCsv files={files} />
          )
        ) : (
          <div>
            <Button inverse href={"/create"}>
              Please Select a Mode
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateOrder;
