import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface ReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (releaseReason: string) => void;
}

const ReleaseSchema = Yup.object().shape({
  releaseReason: Yup.string()
    .required("Release reason is required")
    .max(500, "Release reason is too long"),
});

export const ReleaseModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ReleaseModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = (values: { releaseReason: string }) => {
    onSubmit(values.releaseReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Release Inmate
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
            initialValues={{ releaseReason: "" }}
            validationSchema={ReleaseSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="releaseReason"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Release Reason
                  </label>
                  <Field
                    as="textarea"
                    name="releaseReason"
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter reason for release"
                  />
                  {errors.releaseReason && touched.releaseReason && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.releaseReason}
                    </div>
                  )}
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
                    {isSubmitting ? "Releasing..." : "Release"}
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
