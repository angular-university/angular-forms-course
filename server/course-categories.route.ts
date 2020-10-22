import {Request, Response} from 'express';


export function getCourseCategories(req: Request, res: Response) {

  res.status(200).json({
    categories: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
  });

}
