import config from '../config'
import { USER_ROLE } from '../modules/user/user.const'
import { User } from '../modules/user/user.model'

const superUser = {
  id: '0001',
  email: 'nazmulhasan.shadin3@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
}

const seedSuperAdmin = async () => {
  // when database is coonnecte ,we will check any usere whois super adming,

  const isSuperAdminExist = await User.findOne({
    role: USER_ROLE.superAdmin,
  })

  if (!isSuperAdminExist) {
    await User.create(superUser)
  }
}

export default seedSuperAdmin
