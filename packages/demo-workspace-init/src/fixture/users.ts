import {mapFor} from '@axanc/ts-utils'

export const jobTitle = 'Omniscient Visitor'

export const users = [
  // {
  //   id: '00000000-0000-0000-0000-000000000001',
  //   email: 'prot.man.hrk@nexusportal.app',
  //   job: 'Protection Manager',
  //   location: 'Kharkiv',
  // },
  // {
  //   id: '00000000-0000-0000-0000-000000000002',
  //   email: 'mpca.assist.hrk@nexusportal.app',
  //   job: 'MPCA Assistant',
  //   location: 'Kharkiv',
  // },
  // {
  //   id: '00000000-0000-0000-0000-000000000003',
  //   email: 'prot.officer.dnp@nexusportal.app',
  //   job: 'Protection Officer',
  //   location: 'Dnipro',
  // },
  // {
  //   id: '00000000-0000-0000-0000-000000000004',
  //   email: 'prot.officer.hrk@nexusportal.app',
  //   job: 'Protection Officer',
  //   location: 'Kharkiv',
  // },
  // {
  //   id: '00000000-0000-0000-0000-000000000005',
  //   email: 'prot.co@nexusportal.app',
  //   job: 'Protection Coordinator',
  //   location: 'Kyiv',
  // },
  ...mapFor(22, i => {
    return {
      id: '00000000-0000-0000-0000-1000000000' + ('' + i).padStart(2, '0'),
      email: `visitor.${i}@nexusportal.app`,
      job: jobTitle,
    }
  }),
]
