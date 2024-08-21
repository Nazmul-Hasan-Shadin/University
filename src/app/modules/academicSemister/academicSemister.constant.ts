import {
  TAcademicSemisterName,
  TAcademicSemisterNameCodeMapper,
  TAcademisSemisterCode,
} from './academicSemister.interface'

export const AcademicSemisterName: TAcademicSemisterName[] = [
  'Autum',
  'Summar',
  'Fall',
]
export const AcademicSemisterCode: TAcademisSemisterCode[] = ['01', '02', '03']

export const academicSemisterNameCodeMapper: TAcademicSemisterNameCodeMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
}
export const semesterSearchAbleField=['name']