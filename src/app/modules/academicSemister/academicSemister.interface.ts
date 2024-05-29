export type Month = 'january'

export type TAcademicSemisterName = 'Autum' | 'Summar' | 'Fall'
export type TAcademisSemisterCode='01' | '02' | '03'
export type TAcademicSemister = {
  name: TAcademicSemisterName
  code: TAcademisSemisterCode
  year: string
  startMonth: string
  endMonth: string
}

export type TAcademicSemisterNameCodeMapper = {
  [key:string]:string
}