export const handleIdentificationNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setIdentificationNumber(value);
    }
  };