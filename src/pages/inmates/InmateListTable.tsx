import { Gender } from "@/types/enum";
import { InmateModel } from "@/types/inmate";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { AddInmateModal } from "./AddInmateModal";
import { DeleteDialog } from "@/components/DeleteDialog";
import { useInmateDeleteMutation, useInmateUpdateMutation } from "./useInmates";
import { EditIcon } from "@/components/icons/EditIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";

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
          <EditIcon />
          </button>
          <button
            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
            title="Delete inmate"
            onClick={() => setDeleteInmateId(param.row.id)}
          >
           <DeleteIcon />
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
