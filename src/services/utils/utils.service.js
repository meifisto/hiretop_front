/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */

// import { initialAbility } from '@/libs/acl/config'
import localstorageService from '../localstorage/localstorage.service'

import {
  countries, arrondissements, communes,
  departements, quartiers,
} from './constants'

const generateSlug = title => title
  .toLowerCase()
  .replace(':', '-')
  .replace('/', '-')
  .replace(/[\s|-]+/gi, '-')

// const countries = require('./countries-en.json')
const role_admin = 'admin'
const role_business = 'business'
const role_talent = 'talent'

export class UtilsService {
  countries = countries

  communes = communes

  departements = departements

  arrondissements = arrondissements

  quartiers = quartiers

  formGroups = [{
    id: 'aeroport',
      name: 'Aéroport',
    },
    {
      id: 'frontiere_terrestre',
      name: 'Frontières Terrestres',
    },
    // {
    //     id: 'visiteurs_internationaux',
    //     name: 'Visiteurs Internationaux',
    // },
    {
      id: 'autres_fiches_public',
      name: 'Autres fiches',
    },
    // {
    //     id: 'hotel',
    //     name: 'Hôtel',
    // },
    // {
    //     id: 'tour',
    //     name: 'Hôtel',
    // },
  ]

  sex = [
    'Masculin', 'Féminin',
  ]

  constructor() {
    // this.getListFormulaires()
  }

  getCountries() {
    return this.countries
  }

  getSex() {
    return this.sex
  }

  getCommunes() {
    return this.communes
  }

  getDepartements() {
    return this.departements
  }

  // eslint-disable-next-line class-methods-use-this
  getRandomInt(min = 10, max = 1000) {
    // eslint-disable-next-line no-param-reassign
    min = Math.ceil(min)
    // eslint-disable-next-line no-param-reassign
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // eslint-disable-next-line class-methods-use-this
  getListYears(from, to) {
    const oldest = from || 1990
    const newest = to || new Date().getFullYear()
    const yearsDiff = newest - oldest
    const years = Array.from({ length: yearsDiff }, (v, i) => oldest + i + 1).sort((a, b) => b - a)
    // console.log('years', oldest, newest, yearsDiff, years)
    return years
  }

  // eslint-disable-next-line class-methods-use-this
  getListMonths(locale = 'fr') {
    return [...Array(12).keys()].map(key => new Date(0, key).toLocaleString('fr', { month: 'long' }).toString())
      .map(e => e.charAt(0).toUpperCase() + e.slice(1))
  }

  // eslint-disable-next-line class-methods-use-this
  getListCountries() {
    return countries
  }

  // eslint-disable-next-line class-methods-use-this
  get userData() {
    return localstorageService.getUserData()
  }

  get token() {
    return localstorageService.getJwtToken()
  }

  get userRole() {
    return (this.userData && this.userData.role) || null
  }

  get userRoleId() {
    return (this.userRole && this.userRole._id) || null
  }

  // get userPermissions() {
  //   const permissions = (this.userData && this.userData.role && this.userData.role.permissions) || []
  //   return [
  //     ...permissions,
  //     ...initialAbility,
  //   ]
  // }

  get userId() {
    return (this.userData && this.userData._id) || null
  }


  isAdmin() {
    return this.userRole && this.userRole.code === role_admin
  }
  isBusiness() {
    return this.userRole && this.userRole.code === role_business
  }
  isTalent() {
    return this.userRole && this.userRole.code === role_talent
  }

  currentUserUtils() {
    return {
      // user
      currentUserId: this.userId,
      isAuthenticated: this.userId !== null && this.token,
      permissions: this.userPermissions,
      userData: this.userData,

      // admin
      isAdmin: this.isAdmin(),
      isBusiness: this.isBusiness(),
      isTalent: this.isTalent(),

      // role
      userRole: this.userRole,
      userRoleId: this.userRoleId,

      // to be removed
      countries: this.getCountries(),
      sexs: this.getSex(),
      communes: this.getCommunes(),
      departements: this.getDepartements(),

    }
  }

  countriesAndPlaces(params) {
    const { stringOnly } = params || {}
    const addNameKeyToObj = arr => arr.map(item => {
      if (typeof item === 'string') return { name: item }
      return item
    })

    if (!stringOnly) {
      return {
        countries: addNameKeyToObj(this.countries),
        departements: addNameKeyToObj(this.departements),
        communes: addNameKeyToObj(this.communes),
        arrondissements: addNameKeyToObj(this.arrondissements),
        quartiers: addNameKeyToObj(this.quartiers),
      }
    }

    return {
      countries: this.countries,
      departements: this.departements,
      communes: this.communes,
      arrondissements: this.arrondissements,
      quartiers: this.quartiers,
    }
  }

  turnToSnakeCase(val) {
    return val
      .toLowerCase()
      .replace(/[\s|-]+/gi, '_')
  }

  turnToCamelCase(val) {
    let words = val
    words = words.replace(/é/gi, 'e')
    words = words.split(' ')

    const first = words.shift()

    words = words.map(word => {
        const firstLetter = word[0]
        return firstLetter.toUpperCase() + word.slice(1)
    })

    const result = first + words.join('')
    return result
  }

  // eslint-disable-next-line class-methods-use-this
  getDayCountBetweenTwoDates(options) {
    const { dates } = options || {}
    if (!dates) { return 0 }
    const { first, second } = dates
    if (!first || !second) { return 0 }
    const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    const firstDate = new Date(first)
    const secondDate = new Date(second)
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
    return diffDays
  }

  calculatePercentage(val, total, toFixed) {
    const notValid = !val || !total || val === 0 || total === 0

    if (notValid) return 0
    let result = (val * 100) / (total)
    // console.log('calculatePercentage', val, total, result)
    if (toFixed) {
      result = (result).toFixed(toFixed)
    }
    return result
  }
}

// export an instance of the class
export default new UtilsService()
