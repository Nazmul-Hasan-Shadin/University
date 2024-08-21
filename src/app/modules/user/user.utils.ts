import { TAcademicSemister } from '../academicSemister/academicSemister.interface'
import { User } from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  ).sort({ createdAt: -1 }).lean()

    console.log(lastStudent,'iam last Student');
    
  return lastStudent?.id ? lastStudent.id : undefined
  
}

const findLastFacultyId=async()=>{
   const lastFacultyId=await User.findOne({
    role:'faculty'
   },
   {id:1,_id:0}).sort({createdAt:-1}).lean()

   return lastFacultyId?.id?lastFacultyId.id.substring(2): undefined
}

export const generateStudentId = async (payload: TAcademicSemister) => {
  console.log(payload,'iam studentid payload');
  
  const lastStudentId = await findLastStudentId()

  let currentId = (0).toString()
  const lastStudentSemesterCode=lastStudentId?.substring(4,6); //02
  console.log('iam last stuendet semester code',lastStudentSemesterCode);
  
  
  const lastStudentYear=lastStudentId?.substring(0,4) //2027
  console.log(lastStudentYear,'iam last student year');
  
  const currentSemesterCode= payload.code;
  console.log(currentSemesterCode,'iam current semeste code');
  
  const currentYear=payload.year;

  if(lastStudentId && lastStudentSemesterCode===currentSemesterCode && lastStudentYear===currentYear){
     console.log('iam enterdd here ');
     
    currentId=lastStudentId.substring(6) //0001
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`

  console.log(incrementId,'iam incremient id bro');
  
  return incrementId
}

export const generateFacultyId= async()=>{
  let currentId= (0).toString();
  const lastFacultyId=await findLastFacultyId()
  if (lastFacultyId) {
    currentId=lastFacultyId.substring(2);
  }
  let incrementId= (Number(currentId)+1).toString().padStart(4,'0')
  incrementId=`F-${incrementId}`
  console.log(incrementId);
  
  return incrementId
}


export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
