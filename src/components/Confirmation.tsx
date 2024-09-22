interface IConfirmation {
  header: string;
  warning: string;
  proceedClickHandler: () => void;
  cancelClickHandler: () => void;
}

const Confirmation = (props: IConfirmation) => {
  const { header, warning, proceedClickHandler, cancelClickHandler } = props;
  return (
    <div className="flex flex-col justify-center gap-4">
      <h1 className="text-center text-3xl font-extrabold">{header}</h1>
      <div>
        <p className="font-medium text-center text-xl">Are you sure you?</p>
        <p className="font-medium text-center text-sm italic text-red-500">
          {warning}
        </p>
      </div>
      <div className="flex w-full justify-between gap-4">
        <button
          onClick={cancelClickHandler}
          className="flex items-center justify-center w-full border p-2 rounded-md bg-blue-300"
        >
          Cancel
        </button>
        <button
          onClick={proceedClickHandler}
          className="flex items-center justify-center w-full border p-2 rounded-md bg-red-600"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
