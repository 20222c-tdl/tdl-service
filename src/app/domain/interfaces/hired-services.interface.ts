export interface IHiredServices {
  id: string;

  userId: string;

  providerId: string;

  hiredServices: {serviceId: string, hours?: number}[];

  date: Date;

}
