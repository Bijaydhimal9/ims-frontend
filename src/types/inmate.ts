import { Gender } from "./enum";

export interface InmateModel {
    Id : string;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    citizenshipNumber: string;
    gender: Gender;
    address: string;
    phoneNumber: string;
    emergencyContact: string;
    emergencyContactPhone: string;
  }