import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const test = await this.find();
    console.log(test);
    const findAppointment = await this.findOne({
      where: {
        date,
      },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
