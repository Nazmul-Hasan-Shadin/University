import { Types } from "mongoose";

export type TPreRequisteCoursel={
    course:Types.ObjectId;
    isDeleted:boolean;
}


export type TCourse={
    title:string;
    prefix:string;
    code:number;
    credits:number;
    isDeleted:boolean
    
    preRequisiteCourse:[TPreRequisteCoursel]
}

// course assing to faculties interface

export type TCourseFaculty={
    course:Types.ObjectId;
    faculties:[Types.ObjectId]
}