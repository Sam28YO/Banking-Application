import React from 'react';

const Popup = ({
  address, setAddress,
  houseNo, setHouseNo,
  street, setStreet,
  city, setCity,
  state, setState,
  postcode, setPostcode,
  country, setCountry,
  setAddressEntered,
  handlePopupClose,
  setShowAddressInput
}) => {

  const handleSave = () => {
    if (!houseNo && !street && !city && !state && !postcode && !country) {
        setAddress('');
        setAddressEntered(false);
        setShowAddressInput(true);
        handlePopupClose();
      } else {
        const newAddress = `${houseNo}, ${street}, ${city}, ${state}, ${postcode}, ${country}`;
        setAddress(newAddress);
        setAddressEntered(true);
        setShowAddressInput(false); 
        handlePopupClose();
      }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 flex flex-col items-start">
        <span className="float-right text-xl font-semibold cursor-pointer self-end p-0" onClick={handlePopupClose}>&times;</span>
        <h2 className="text-xl font-semibold mb-4 self-start">{address ? 'Change Address' : 'Enter Address'}</h2>
        
        <p className='p-2'>FLAT OR BUILDING NO</p>
        <input
          type="text"
          placeholder="Enter flat or building no"
          value={houseNo}
          onChange={(e) => setHouseNo(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-2"
        />

        <p className='p-2'>STREET</p>
        <input
          type="text"
          placeholder="Enter street name"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-2"
        />

        <p className='p-2'>CITY</p>        
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-2"
        />

        <p className='p-2'>STATE</p> 
        <input
          type="text"
          placeholder="Enter state name"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-2"
        />

        <p className='p-2'>POSTCODE</p> 
        <input
          type="text"
          placeholder="Enter postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />

        <p className='p-2'>COUNTRY</p> 
        <input
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />

        <button className="bg-red-700 text-white rounded-lg py-2 px-4 w-full" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Popup;
