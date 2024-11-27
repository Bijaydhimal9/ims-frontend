export interface BookingListModel{
    id: string;
    bookingNumber: string;
    inmateId: string;
    inmateName: string;
    bookingLocation: string;
    facilityName: string;
    bookingDate: Date;
}
export interface BookingModel {
    id?: string;
    bookingDate: string;
    bookingLocation: string;
    facilityName: string;
    chargeId: string;
    inmateId: string;
  }