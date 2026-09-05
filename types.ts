
export enum SpecialistCategory {
  SOCIALINIAI = 'Socialiniai pedagogai',
  SPECIALIEJI = 'Specialieji pedagogai',
  LOGOPEDAI = 'Logopedai',
  PSICHOLOGAI = 'Psichologai',
  ADMINISTRACIJA = 'Mokyklos vadovai',
  SVEIKATA = 'Sveikatos priežiūra',
}

export interface Specialist {
  id: string;
  name: string;
  category: SpecialistCategory;
  classes: string;
  phone: string;
  office: string;
  email?: string;
}

export type TemplateCategory = 
  | 'Incidentai / krizės'
  | 'Sveikata'
  | 'Administraciniai'
  | 'Lankomumas' 
  | 'Telefonai' 
  | 'Patyčios' 
  | 'Uniformos' 
  | 'Mokymasis / SUP' 
  | 'Aplinka';

export interface EmailTemplate {
  id: string;
  title: string;
  level?: 'A' | 'B' | 'C';
  role?: string;
  category: TemplateCategory;
  recipientType: 'Tėvai' | 'Mokytojas' | 'Savivaldybė' | 'Darbuotojas' | 'Pedagogai';
  subject: string;
  body: string;
  to?: string;
  cc?: string;
}
