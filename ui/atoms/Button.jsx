const Button = ({ label, onClick, icon, style }) => {
  return (
    <button
      onClick={onClick}
      className={`${style} text-nowrap flex items-center justify-center gap-4  px-6 py-3 font-medium rounded-md`}
    >
      <i className={`${icon} ri-lg`}></i> {label}
    </button>
  );
};

export default Button;
