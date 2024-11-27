import { Gender } from "@/types/enum";
import { InmateModel } from "@/types/inmate";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { AddInmateModal } from "./AddInmateModal";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useInmateDeleteMutation, useInmateUpdateMutation } from "./useInmates";

interface InmateListTableProps {
  isLoading: boolean;
  inmates: InmateModel[];
}

const InmateListTable = ({ isLoading, inmates }: InmateListTableProps) => {
  const [inmateModel, setInmateModel] = useState<InmateModel | null>(null);

  const onCloseDialog = () => {
    setInmateModel(null);
  };

  const { mutateAsync: updateMutateAsync } = useInmateUpdateMutation();

  const onUpdateInmate = async (model: InmateModel) => {
    await updateMutateAsync(model);
  };

  const { mutateAsync: deleteMutateAsync } = useInmateDeleteMutation();
  const onCloseDeleteDialog = () => {
    setDeleteInmateId(null);
  };

  const onDeleteInmate = () => {
    deleteMutateAsync(deleteInmateId);
    onCloseDeleteDialog();
  };

  const [deleteInmateId, setDeleteInmateId] = useState<string | null>(null);

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Full Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      minWidth: 150,
      flex: 1,
      renderCell: (param) => (
        <>{new Date(param.row.dateOfBirth).toLocaleDateString()}</>
      ),
    },
    {
      field: "citizenshipNumber",
      headerName: "Citizenship Number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 80,
      flex: 1,
      valueGetter: (param) => Gender[param as keyof typeof Gender] || param,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      flex: 1,
      renderCell: (param) => (
        <div className="flex gap-1">
          <button
            onClick={() => setInmateModel(param.row)}
            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
            title="Edit inmate"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button
            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
            title="Delete inmate"
            onClick={() => setDeleteInmateId(param.row.id)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      {inmateModel && (
        <AddInmateModal
          isOpen={inmateModel !== null}
          onClose={onCloseDialog}
          onSubmit={onUpdateInmate}
          inmateModel={inmateModel}
        />
      )}
      <DeleteDialog
        isOpen={deleteInmateId !== null}
        title="Delete Inmate"
        message="Are you sure you want to delete this inmate? This action cannot be undone."
        onClose={onCloseDeleteDialog}
        onConfirm={onDeleteInmate}
      />
      <DataGrid
        loading={isLoading}
        rows={inmates ? inmates : []}
        columns={columns}
      />
    </>
  );
};

export default InmateListTable;
