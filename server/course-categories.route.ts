import {Request, Response} from 'express';


export function getCourseCategories(req: Request, res: Response) {

  res.status(200).json({
    categories: [
      {
        code: "BEGINNER",
        description: "Beginner"
      },
      {
        code: "INTERMEDIATE",
        description: "Intermediate"
      },
      {
        code: "ADVANCED",
        description: "Advanced"
      }]
  });

}
