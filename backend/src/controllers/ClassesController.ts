import { Request, Response } from 'express';

import db from '../database/connection';
import converterHoursToMinutes from '../utils/converterHoursToMinutes';

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string,
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;
    
    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time){
      return response.status(400).json({
        error: 'Missing filters to search classes',
      });
    }
  
    const timesInMinutes = converterHoursToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('class_schedule.class_id = classes.id')
          .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
          .whereRaw('class_schedule.from <= ??', [timesInMinutes])
          .whereRaw('class_schedule.to > ??', [timesInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.status(200).json(classes);
  }

  async create(request: Request, response: Response) {
    const trx = await db.transaction();
    try {
      const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule,
      } = request.body;
    

      const insertedUserId = await trx('users')
      .returning('id')
      .insert({
        name,
        avatar,
        bio,
        whatsapp,
      });
        
      const user_id = insertedUserId[0];
        
      const insertedClasseId = await trx('classes')
      .returning('id')
      .insert({
        subject,
        cost,
        user_id,
      });
        
      const class_id = insertedClasseId[0];
        
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: converterHoursToMinutes(scheduleItem.from),
          to: converterHoursToMinutes(scheduleItem.to),
          class_id,
        }; 
      });
      
      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).send({ message: 'User created'});

    } catch(err) {
      await trx.rollback();
      return response.status(400).send({ message: 'Erro in create new user' + err});
    }
  } 
}

