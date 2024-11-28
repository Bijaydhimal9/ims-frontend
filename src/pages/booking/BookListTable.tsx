import { DeleteDialog } from "@/components/DeleteDialog";
import { InmateModel } from "@/types/inmate";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useBookingDeleteMutation, useBookingReleaseMutation } from "./useBookings";
import { ReleaseModal } from "./ReleaseModal";
import { BookingStatus } from "@/types/enum";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { ReleaseIcon } from "@/components/icons/ReleaseIcon";

interface BookingListTableProps {
  isLoading: boolean;
  bookings: InmateModel[];
}

const BookingListTable = ({ isLoading, bookings }: BookingListTableProps) => {
  const [inmateModel, setInmateModel] = useState<InmateModel | null>(null);
  const [openReleaseModal, setOpenReleaseModal] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [deleteBookingId, setDeleteBookingId] = useState<string | null>(null);
  const { mutateAsync: deleteMutateAsync } = useBookingDeleteMutation();
  const onCloseDeleteDialog = () => {
    setDeleteBookingId(null);
  };

  const { mutateAsync: releaseBookingMutateAsync } = useBookingReleaseMutation();

  const onDeleteBooking = () => {
    deleteMutateAsync(deleteBookingId);
    onCloseDeleteDialog();
  };

  const handleRelease = (id: string) => {
    setBookingId(id);
    setOpenReleaseModal(true);
  };

  const onReleaseSubmit = async (reason: string) => {
    if (!bookingId) return;
    
    const releaseModel = {
      releaseReason: reason
    };
    await releaseBookingMutateAsync({ id: bookingId, data: releaseModel });
    setOpenReleaseModal(false);
    setBookingId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "bookingDate",
      headerName: "Booking Date",
      minWidth: 150,
      flex: 1,
      renderCell: (param) => (
        <>{new Date(param.row.bookingDate).toLocaleDateString()}</>
      ),
    },
    {
      field: "bookingNumber",
      headerName: "Booking Number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex : 1,
      valueGetter: (param) => BookingStatus[param as keyof typeof BookingStatus] || param,
    },
    {
      field: "inmateName",
      headerName: "Inmate Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "bookingLocation",
      headerName: "Booking Location",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "facilityName",
      headerName: "Facility Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      flex: 1,
      renderCell: (param) => (
        <div className="flex gap-1">
          {param.row.status !== "2" && (
            <button
              className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-colors"
              title="Release inmate"
              onClick={() => handleRelease(param.row.id)}
            >
            <ReleaseIcon />
            </button>
          )}
          <button
            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
            title="Delete inmate"
            onClick={() => setDeleteBookingId(param.row.id)}
          >
          <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <DeleteDialog
        isOpen={deleteBookingId !== null}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
        onClose={onCloseDeleteDialog}
        onConfirm={onDeleteBooking}
      />
      <ReleaseModal
      isOpen={openReleaseModal}
      onClose={() => setOpenReleaseModal(false)}
      onSubmit={onReleaseSubmit}
       />
      <DataGrid
        loading={isLoading}
        rows={bookings ? bookings : []}
        columns={columns}
      />
    </>
  );
};

export default BookingListTable;
