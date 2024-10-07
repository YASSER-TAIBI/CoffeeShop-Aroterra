export interface Notification {
  id?: string;
  titre: string;
  description: string;
  dateCreation: Date;
  icon: string;
  color: string;
  isRead: boolean;
  reservationId?: string;
  testimonialId?: string;
}
