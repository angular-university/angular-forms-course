

import * as express from 'express';
import {Application} from "express";
import {getAllCourses, getCourseById} from "./get-courses.route";
import {searchLessons} from "./search-lessons.route";
import {getCourseCategories} from './course-categories.route';
import {onFileupload} from './file-upload.route';
const fileUpload = require('express-fileupload');


const app: Application = express();

app.use(fileUpload());


app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').get(getCourseById);

app.route('/api/lessons').get(searchLessons);

app.route('/api/course-categories').get(getCourseCategories);

app.route('/api/thumbnail-upload').post(onFileupload);


const httpServer:any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});




