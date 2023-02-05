const FormRow = ({ label, children }) => {
  return (
    <div className="form-control w-full h-full">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      {children}
    </div>
  );
};

export default FormRow;
