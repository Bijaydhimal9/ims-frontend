import { BookingModel } from "@/types/booking";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useInmatesListQuery } from "../inmates/useInmates";
import { useChargeListQuery } from "./useBookings";

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (model: BookingModel) => void;
  bookingModel: BookingModel;
}

const BookingSchema = Yup.object().shape({
  inmateId: Yup.string().required("Please select an inmate"),
  chargeId: Yup.string().required("Please select a charge"),
  bookingDate: Yup.date()
    .min(new Date(), "Booking date must be in the future")
    .required("Booking date is required"),
  bookingLocation: Yup.string()
    .required("Booking location is required")
    .max(200, "Booking location is too long"),
  facilityName: Yup.string()
    .required("Facility name is required")
    .max(200, "Facility name is too long"),
});

export const AddBookingModal = ({
  isOpen,
  onClose,
  bookingModel,
  onSubmit,
}: AddBookingModalProps) => {
  const { data: inmatesData } = useInmatesListQuery(1, 1000, "");
  const { data: chargesData } = useChargeListQuery();

  if (!isOpen) return null;

  const handleSubmit = (values: BookingModel) => {
    onSubmit(values);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Booking Details
            </h3>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Formik
            initialValues={bookingModel}
            validationSchema={BookingSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="inmateId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Select Inmate
                      </label>
                      <Field
                        as="select"
                        name="inmateId"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select an inmate</option>
                        {inmatesData?.items?.map((inmate: any) => (
                          <option key={inmate.id} value={inmate.id}>
                            {inmate.firstName} {inmate.middleName}{" "}
                            {inmate.lastName}
                          </option>
                        ))}
                      </Field>
                      {errors.inmateId && touched.inmateId && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.inmateId}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="bookingDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Booking Date
                      </label>
                      <Field
                        name="bookingDate"
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      {errors.bookingDate && touched.bookingDate && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.bookingDate}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="chargeId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Select Charge
                      </label>
                      <Field
                        as="select"
                        name="chargeId"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select a charge</option>
                        {chargesData?.map((charge: any) => (
                          <option key={charge.id} value={charge.id}>
                            {charge.chargeName}
                          </option>
                        ))}
                      </Field>
                      {errors.chargeId && touched.chargeId && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.chargeId}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="bookingLocation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Booking Location
                      </label>
                      <Field
                        name="bookingLocation"
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter booking location"
                      />
                      {errors.bookingLocation && touched.bookingLocation && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.bookingLocation}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="facilityName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Facility Name
                      </label>
                      <Field
                        name="facilityName"
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter facility name"
                      />
                      {errors.facilityName && touched.facilityName && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.facilityName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
