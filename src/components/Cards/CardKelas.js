const CardKelas = ({ title, description, buttonText = "Chat Admin", onClick }) => {
    return (
      <div className="w-full px-4 pt-6 text-center bg-white lg:pt-12 md:w-4/12">
        <div className="relative flex flex-col w-full min-w-0 p-8 mb-8 break-words rounded-lg shadow-lg bg-warmGray-100">
          <h5 className="text-xl font-bold">{title}</h5>
          <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
            {description}
          </p>
          <button onClick={onClick} className="px-4 py-2 mt-4 mb-3 ml-3 text-xs font-bold text-white transition-all duration-150 ease-linear rounded shadow outline-none bg-lightBlue-500 active:bg-lightBlue-600 hover:shadow-lg focus:outline-none lg:mr-1 lg:mb-0">
            {buttonText}
          </button>
        </div>
      </div>
    );
  };
  
  export default CardKelas;