export type Month = 'january'

export type TAcademicSemisterName = 'Autum' | 'summar' | 'fall'
export type TAcademisSemisterCode='01' | '02' | 'o3'
export type TAcademicSemister = {
  name: TAcademicSemisterName
  code: TAcademisSemisterCode
  year: string
  startMonth: string
  endMonth: string
}
