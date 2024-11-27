import { HiOutlineSearch } from "react-icons/hi";
import { useState, useCallback } from "react";
import { AddInmateModal } from "./AddInmateModal";
import { InmateModel } from "@/types/inmate";
import { useInmateCreateMutation, useInmatesListQuery } from "./useInmates";
import { Gender } from "@/types/enum";
import InmateListTable from "./InmateListTable";
import debounce from "lodash/debounce";

const initialValues: InmateModel = {
  Id: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: new Date(),
  citizenshipNumber: "",
  gender: null as unknown as Gender,
  address: "",
  phoneNumber: "",
  emergencyContact: "",
  emergencyContactPhone: "",
};

const Inmates = () => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data, isLoading } = useInmatesListQuery(page, pageSize, searchString);

  const { mutateAsync, isError, error } = useInmateCreateMutation();

  const onSubmit = (values: InmateModel) => {
    const formattedValues = {
      ...values,
      gender: Number(values.gender),
    };
    mutateAsync(formattedValues);
  };

  const debouncedHandleInputChange = useCallback(
    debounce((value: string) => {
      setSearchString(value);
    }, 500),
    []
  );

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-gray-900">
              Inmate Profiles
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Inmate
            </button>
          </div>
        </div>

        {isError && error && (
          <>
            <p>{error.message}</p>
          </>
        )}

        {/* Search Bar */}
        <div className="mt-6 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-3 sm:text-sm border border-gray-300 rounded-md"
            placeholder="Search inmates..."
            onChange={(e) => debouncedHandleInputChange(e.target.value)}
          />
        </div>
        <AddInmateModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          inmateModel={initialValues}
          onSubmit={onSubmit}
        />
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <InmateListTable
                  inmates={data ? data.items : []}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inmates;
