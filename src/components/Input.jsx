const fixedInputClass =
  "dark:text-white appearance-none relative block w-full py-2.5 bg-transparent placeholder-gray-500 text-sparksenseprimary focus:outline-none border-b-2 border-b-sparksenseprimary dark:border-b-white focus:z-10 text-lg font-semibold sm:text-sm";

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
}) {
  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
      />
    </div>
  );
}
