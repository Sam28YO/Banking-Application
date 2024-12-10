import React, { useState, useRef, useEffect } from 'react';
import Popup from './PopUp';

const AddressDetails = ({ onComplete }) => {
  const [address, setAddress] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    houseNo: '',
    street: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
  });
  const [addressEntered, setAddressEntered] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(true);
  const [durationSelected, setDurationSelected] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const addressRef = useRef(null);

  useEffect(() => {
    if (addressRef.current) {
      addressRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
    setAddressEntered(false);
    setAddressError(false);
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    setPopupOpen(true);
  };

  const handleInputBlur = () => {
    if (address) {
      const parts = address.split(',');
      setAddressDetails({
        houseNo: parts[0]?.trim() || '',
        street: parts[1]?.trim() || '',
        city: parts[2]?.trim() || '',
        state: parts[3]?.trim() || '',
        postcode: parts[4]?.trim() || '',
        country: parts[5]?.trim() || '',
      });
      setAddressEntered(true);
      setShowAddressInput(false);
      setAddressError(false);
    } else {
      setAddressError(true);
    }

  };

  const handleRemoveAddress = (e) => {
    e.preventDefault();
    setAddress('');
    setAddressDetails({
      houseNo: '',
      street: '',
      city: '',
      state: '',
      postcode: '',
      country: '',
    });
    setAddressEntered(false);
    setShowAddressInput(true);
    setDurationSelected('');
    setAddressError(false);
    setDurationError(false);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleDurationClick = (e, selected) => {
    e.preventDefault();
    setDurationSelected(selected);
    setDurationError(false);
  };

  const handleContinueClick = (e) => {
    e.preventDefault();
    let isValid = true;
    if (!addressEntered) {
      setAddressError(true);
      isValid = false;
    }
    if (!durationSelected) {
      setDurationError(true);
      isValid = false;
    }
    if (isValid) {
      onComplete();
      //have to add post here to send data to db and save it + navigate to next form
    }
  };

  const getButtonStyle = (duration) => {
    return durationSelected === duration
      ? { backgroundColor: '#2563eb', color: 'white' } 
      : {};
  };

  return (
    <form className="flex flex-col items-start w-full my-4" onSubmit={(e) => e.preventDefault()}>
      <div
        ref={addressRef}
        className="flex flex-col items-start bg-white border border-gray-300 rounded-lg p-10 shadow-md text-center w-full mt-2 mb-4"
      >
        <p className="mb-2">
          <span className="text-blue-700 font-semibold">02 </span>
          <span className="font-medium">Home address </span>
        </p>
        <p className="mb-6">Please provide your current home address</p>
        <p className="font-medium mb-2">Your address</p>

        {showAddressInput ? (
          <div className="w-1/2 mb-2 flex flex-col items-start">
            <input
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={address}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="Type address or postcode"
            />
            {addressError && <p className="text-red-600 text-sm mt-1 self-start p-0">Please enter an address or enter manually using the link below</p>}
          </div>
        ) : (
          <div className="flex flex-col items-start border border-gray-300 rounded-lg p-4 w-1/2 mb-2">
            <p>{addressDetails.houseNo}</p>
            <p>{addressDetails.street}</p>
            <p>{addressDetails.city}</p>
            <p>{addressDetails.state}</p>
            <p>{addressDetails.postcode}</p>
            <p>{addressDetails.country}</p>
            <a
              href="#"
              className="text-blue-600 hover:underline block self-end mr-2"
              onClick={handleRemoveAddress}
            >
              Remove address
            </a>
          </div>
        )}

        <a
          href="#"
          className="text-blue-600 hover:underline mb-2 block"
          onClick={handleLinkClick}
        >
          {address ? 'Change address >' : 'Prefer to enter address manually >'}
        </a>

        {popupOpen && (
          <Popup
            address={address}
            setAddress={setAddress}
            houseNo={addressDetails.houseNo}
            setHouseNo={(value) => setAddressDetails((prev) => ({ ...prev, houseNo: value }))}
            street={addressDetails.street}
            setStreet={(value) => setAddressDetails((prev) => ({ ...prev, street: value }))}
            city={addressDetails.city}
            setCity={(value) => setAddressDetails((prev) => ({ ...prev, city: value }))}
            state={addressDetails.state}
            setState={(value) => setAddressDetails((prev) => ({ ...prev, state: value }))}
            postcode={addressDetails.postcode}
            setPostcode={(value) => setAddressDetails((prev) => ({ ...prev, postcode: value }))}
            country={addressDetails.country}
            setCountry={(value) => setAddressDetails((prev) => ({ ...prev, country: value }))}
            setAddressEntered={setAddressEntered}
            handlePopupClose={handlePopupClose}
            setShowAddressInput={setShowAddressInput}
          />
        )}

        <p className="text-blue-600 text-sm mb-2 my-2">
          HOW LONG HAVE YOU LIVED AT THIS ADDRESS?*
        </p>
        <p className="mb-4 text-sm">
          If less than 6 months, we'll also need details of your previous address.
        </p>
        <span>
          <button
            className="border-2 border-blue-600 rounded-lg py-3 px-3 mr-4 hover:bg-blue-700 hover:text-white"
            style={getButtonStyle('6 months or more')}
            onClick={(e) => handleDurationClick(e, '6 months or more')}
          >
            6 months or more
          </button>
          <button
            className="border-2 border-blue-600 rounded-lg py-3 px-3 hover:bg-blue-700 hover:text-white"
            style={getButtonStyle('Less than 6 months')}
            onClick={(e) => handleDurationClick(e, 'Less than 6 months')}
          >
            Less than 6 months
          </button>
        </span>
        {durationError && <p className="text-red-600 text-sm mt-1">Please select duration of residency</p>}
      </div>
      <button
        className="bg-blue-600 text-white rounded-lg py-2 px-4 mt-2 hover:bg-blue-500 self-end"
        onClick={handleContinueClick}
      >
        Continue
      </button>
    </form>
  );
};

export default AddressDetails;