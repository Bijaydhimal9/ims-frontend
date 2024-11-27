import { Gender } from "@/types/enum";
import { InmateModel } from "@/types/inmate";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
interface AddInmateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (model: InmateModel) => void;
  inmateModel: InmateModel;
}

const InmateSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name is too short")
    .max(50, "First name is too long")
    .required("First name is required"),
  middleName: Yup.string().max(50, "Middle name is too long"),
  lastName: Yup.string()
    .min(2, "Last name is too short")
    .max(50, "Last name is too long")
    .required("Last name is required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date cannot be in the future")
    .typeError("Please enter a valid date")
    .required("Date of birth is required"),
  citizenshipNumber: Yup.string().required("Citizenship number is required"),
  gender: Yup.number().required("Gender is required"),
  address: Yup.string().max(200, "Address is too long"),
  phoneNumber: Yup.string().matches(
    /^\+?[\d\s-]+$/,
    "Invalid phone number format"
  ),
  emergencyContact: Yup.string().max(50, "Emergency contact name is too long"),
  emergencyContactPhone: Yup.string().matches(
    /^\+?[\d\s-]+$/,
    "Invalid phone number format"
  ),
});

export const AddInmateModal = ({
  isOpen,
  onClose,
  inmateModel,
  onSubmit,
}: AddInmateModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = (values: InmateModel) => {
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
              Inmate Profile
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
            initialValues={inmateModel}
            validationSchema={InmateSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter first name"
                      />
                      {errors.firstName && touched.firstName && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="middleName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Middle Name
                      </label>
                      <Field
                        name="middleName"
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter middle name"
                      />
                      {errors.middleName && touched.middleName && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.middleName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter last name"
                      />
                      {errors.lastName && touched.lastName && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Birth
                      </label>
                      <Field
                        name="dateOfBirth"
                        type="date"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      {errors.dateOfBirth && touched.dateOfBirth && (
                        <div className="text-red-500 text-sm mt-1">
                          {String(errors.dateOfBirth)}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="citizenshipNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Citizenship Number
                      </label>
                      <Field
                        name="citizenshipNumber"
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter citizenship number"
                      />
                      {errors.citizenshipNumber &&
                        touched.citizenshipNumber && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.citizenshipNumber}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select gender</option>
                        {Object.entries(Gender)
                          .filter(([key]) => isNaN(Number(key)))
                          .map(([key, value]) => (
                            <option key={value.toString()} value={value}>
                              {key}
                            </option>
                          ))}
                      </Field>
                      {errors.gender && touched.gender && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.gender}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <Field
                        name="address"
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter address"
                      />
                      {errors.address && touched.address && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <Field
                        name="phoneNumber"
                        type="tel"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter phone number"
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.phoneNumber}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="emergencyContact"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Emergency Contact
                      </label>
                      <Field
                        name="emergencyContact"
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter emergency contact name"
                      />
                      {errors.emergencyContact && touched.emergencyContact && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.emergencyContact}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="emergencyContactNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Emergency Contact Number
                      </label>
                      <Field
                        name="emergencyContactPhone"
                        type="tel"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter emergency contact number"
                      />
                      {errors.emergencyContactPhone &&
                        touched.emergencyContactPhone && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.emergencyContactPhone}
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
