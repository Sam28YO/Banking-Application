import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './IdentityVerification.css'; // Import CSS file for styling

const IdentityVerification = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    'uk-passport': false,
    'non-uk-passport': false,
    'uk-driving-licence': false,
    'bank-statement': false
  });

  const [selectedDocumentType, setSelectedDocumentType] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (selectedDocumentType) {
      setUploadedFiles(prevState => ({
        ...prevState,
        [selectedDocumentType]: file
      }));
    }
  }, [selectedDocumentType]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, application/pdf' // Accepted file types
  });

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
  };

  const allDocumentsUploaded = Object.values(uploadedFiles).every(file => file);

  return (
    <div className="identity-verification">
      <h2 className="left-align">Document upload</h2>
      <p className="left-align">We just need a little more information from you.</p>
      
      <div className="document-section">
        <h3 className="left-align">We need some documents from you</h3>
        <p className="left-align">Please upload one document from each section below for verification.</p>

        <div className="document-status">
          {uploadedFiles['uk-passport'] ? <span className="tick">&#10003;</span> : <span className="cross">&#10005;</span>}
          <span>UK Passport (Not expired)</span>
        </div>
        <div className="document-status">
          {uploadedFiles['non-uk-passport'] ? <span className="tick">&#10003;</span> : <span className="cross">&#10005;</span>}
          <span>Non-UK Passport with Residence Permit</span>
        </div>
        <div className="document-status">
          {uploadedFiles['uk-driving-licence'] ? <span className="tick">&#10003;</span> : <span className="cross">&#10005;</span>}
          <span>UK Photocard Driving Licence</span>
        </div>
        <div className="document-status">
          {uploadedFiles['bank-statement'] ? <span className="tick">&#10003;</span> : <span className="cross">&#10005;</span>}
          <span>Bank statement/Building Society statement (Last 3 months)</span>
        </div>

        <select className="dropdown" value={selectedDocumentType} onChange={handleDocumentTypeChange}>
          <option value="">Select document type</option>
          <option value="uk-passport">UK Passport (Not expired)</option>
          <option value="non-uk-passport">Non-UK Passport with Residence Permit</option>
          <option value="uk-driving-licence">UK Photocard Driving Licence</option>
          <option value="bank-statement">Bank statement/Building Society statement (Last 3 months)</option>
        </select>
        
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Select a document</p>
          <p className="format-size-info">Accepted formats: PDF, JPG, JPEG, PNG<br />Max file size: 5MB</p>
        </div>
      </div>
      
      <div className="validation-message">
        {allDocumentsUploaded ? (
          <p>All documents uploaded</p>
        ) : (
          <p>Please select a document type and upload the required documents</p>
        )}
      </div>

      <button className="continue-button" disabled={!allDocumentsUploaded}>Continue</button>
    </div>
  );
};

export default IdentityVerification;
