import {createdBySystem, demoWorkspaceId} from '../utils.js'
import {Prisma} from '@infoportal/prisma'

export const formGlobal: Prisma.FormCreateManyInput = {
  name: 'Global Database',
  type: 'smart',
  workspaceId: demoWorkspaceId,
  category: 'Global',
  deploymentStatus: 'deployed',
  id: 'id_form_global',
  uploadedBy: createdBySystem,
}

export const formGlobalSchema = {
  'survey': [
    {
      'name': 'survey',
      'type': 'text',
      '$kuid': '89b695457c',
      'label': [
        'Survey',
        'Опитування',
      ],
      '$xpath': 'survey',
      'required': false,
    },
    {
      'name': 'office',
      'type': 'select_one',
      '$kuid': '702eb78a8a',
      'label': [
        'Office',
        'Офіс',
      ],
      '$xpath': 'office',
      'required': false,
      'select_from_list_name': 'office',
    },
    {
      'name': 'donor',
      'type': 'select_one',
      '$kuid': '70138d3c0b',
      'label': [
        'Donor',
        'Донор',
      ],
      '$xpath': 'donor',
      'required': false,
      'select_from_list_name': 'donor',
    },
    {
      'name': 'sector',
      'type': 'select_one',
      '$kuid': '0529f6b95d',
      'label': [
        'Sector',
        'Сектор',
      ],
      '$xpath': 'sector',
      'required': false,
      'select_from_list_name': 'sector',
    },
    {
      'name': 'program',
      'type': 'select_one',
      '$kuid': 'e2bd98ff6f',
      'label': [
        'Program',
        'Програма',
      ],
      '$xpath': 'program',
      'required': false,
      'select_from_list_name': 'program',
    },
    {
      'name': 'oblast',
      'type': 'select_one',
      '$kuid': '56fe9f4873',
      'label': [
        'Oblast',
        'Область',
      ],
      '$xpath': 'oblast',
      'required': false,
      'select_from_list_name': 'oblast',
    },
    {
      'name': 'persons_count',
      'type': 'integer',
      '$kuid': '23f6f00439',
      'label': [
        'Individuals count',
        'Кількість осіб',
      ],
      '$xpath': 'persons_count',
      'required': false,
    },
    {
      'name': 'persons',
      'type': 'begin_repeat',
      '$kuid': 'b2f8474df0',
      'label': [
        'Individuals',
        'Фізичні особи',
      ],
      '$xpath': 'persons',
      'required': false,
    },
    {
      'name': 'age',
      'type': 'integer',
      '$kuid': '6ba9d1e875',
      'label': [
        'Age',
        'Вік',
      ],
      '$xpath': 'persons/age',
      'required': false,
    },
    {
      'name': 'gender',
      'type': 'select_one',
      '$kuid': '95e5b70b6e',
      'label': [
        'Gender',
        'Стать',
      ],
      '$xpath': 'persons/gender',
      'required': false,
      'select_from_list_name': 'gender',
    },
    {
      'name': 'disability',
      'type': 'select_multiple',
      '$kuid': 'f7fcd92fe1',
      'label': [
        'Disability',
        'Інвалідність',
      ],
      '$xpath': 'persons/disability',
      'required': false,
      'select_from_list_name': 'disability',
    },
    {
      'name': 'displacement_status',
      'type': 'select_one',
      '$kuid': '787cf97c1e',
      'label': [
        'Displacement Status',
        'Статус переміщеної особи',
      ],
      '$xpath': 'persons/displacement_status',
      'required': false,
      'select_from_list_name': 'displacement_status',
    },
    {
      'name': 'tax_id',
      'type': 'text',
      '$kuid': '8cc23deabe',
      'label': [
        'Tax ID',
        'Ідентифікаційний номер платника податків',
      ],
      '$xpath': 'persons/tax_id',
      'required': false,
    },
    {
      'name': 'uniq_id',
      'type': 'text',
      '$kuid': '8cc23deabc',
      'label': [
        'Unique ID',
        'Унікальний ідентифікатор',
      ],
      '$xpath': 'persons/uniq_id',
      'required': false,
    },
    {
      'name': 'phone',
      'type': 'text',
      '$kuid': '1092c5f8d7',
      'label': [
        'Phone Number',
        'Номер телефону',
      ],
      '$xpath': 'persons/phone',
      'required': false,
    },
    {
      'type': 'end_repeat',
      '$kuid': '4aed356676',
    },
  ],
  'choices': [
    {
      'name': 'bha',
      '$kuid': '53fce0d435',
      'label': [
        'BHA',
        'BHA',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'echo',
      '$kuid': '6b20f33d75',
      'label': [
        'ECHO',
        'ECHO',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'unhcr',
      '$kuid': '2a764775bc',
      'label': [
        'UNHCR',
        'UNHCR',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'uhf',
      '$kuid': 'f5282aa9f0',
      'label': [
        'UHF',
        'UHF',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'sumy',
      '$kuid': 'badad55ff0',
      'label': [
        'Sumy',
        'Суми',
      ],
      'list_name': 'office',
    },
    {
      'name': 'chernihiv',
      '$kuid': '4be34c1c00',
      'label': [
        'Chernihiv',
        'Чернігів',
      ],
      'list_name': 'office',
    },
    {
      'name': 'dnipro',
      '$kuid': 'ab03ccb9b5',
      'label': [
        'Dnipro',
        'Дніпро',
      ],
      'list_name': 'office',
    },
    {
      'name': 'kharkiv',
      '$kuid': 'd933a3eedb',
      'label': [
        'Kharkiv',
        'Харків',
      ],
      'list_name': 'office',
    },
    {
      'name': 'mykolaiv',
      '$kuid': '8935836d76',
      'label': [
        'Mykolaiv',
        'Миколаїв',
      ],
      'list_name': 'office',
    },
    {
      'name': 'sloviansk',
      '$kuid': 'f4a7bfaad5',
      'label': [
        'Sloviansk',
        'Слов\'янськ ',
      ],
      'list_name': 'office',
    },
    {
      'name': 'basic_needs',
      '$kuid': 'd2898dca9c',
      'label': [
        'Basic Needs',
        'Базові потреби',
      ],
      'list_name': 'sector',
    },
    {
      'name': 'protection',
      '$kuid': '8c2254aee8',
      'label': [
        'Protection',
        'Захист',
      ],
      'list_name': 'sector',
    },
    {
      'name': 'shelter',
      '$kuid': 'a0c6dea2e9',
      'label': [
        'Shelter',
        'Житло',
      ],
      'list_name': 'sector',
    },
    {
      'name': 'shelter_repair',
      '$kuid': '15059286cf',
      'label': [
        'Shelter Repair',
        'Ремонт житла',
      ],
      'list_name': 'program',
    },
    {
      'name': 'esk',
      '$kuid': 'ca4bbec09d',
      'label': [
        'Emergency Shelter Kits',
        'Аварійні комплекти для житла',
      ],
      'list_name': 'program',
    },
    {
      'name': 'nfi',
      '$kuid': '4fccf32ca7',
      'label': [
        'Non-Food Items',
        'Нехарчові товари',
      ],
      'list_name': 'program',
    },
    {
      'name': 'mpca',
      '$kuid': 'b92ec5f452',
      'label': [
        'Multipurpose Cash Assistance',
        'Багатоцільова Грошова Допомога',
      ],
      'list_name': 'program',
    },
    {
      'name': 'protection_monito',
      '$kuid': '6b610d7705',
      'label': [
        'Protection Monitoring',
        'Моніторинг захисту',
      ],
      'list_name': 'program',
    },
    {
      'name': 'other',
      '$kuid': '8a97af8279',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'female',
      '$kuid': '5b4be838b4',
      'label': [
        'Female',
        'Жінка',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'male',
      '$kuid': 'fbc7375407',
      'label': [
        'Male',
        'Чоловік',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'UA01',
      '$kuid': 'c171da8585',
      'label': [
        'Autonomous Republic of Crimea',
        'Автономна Республіка Крим',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA71',
      '$kuid': 'abef9e258a',
      'label': [
        'Cherkaska',
        'Черкаська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA74',
      '$kuid': '6826c7a694',
      'label': [
        'Chernihivska',
        'Чернігівська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA73',
      '$kuid': '679534b102',
      'label': [
        'Chernivetska',
        'Чернівецька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA12',
      '$kuid': 'aa75a66dca',
      'label': [
        'Dnipropetrovska',
        'Дніпропетровська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA14',
      '$kuid': 'b52e7bedf2',
      'label': [
        'Donetska',
        'Донецька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA26',
      '$kuid': '80e711c3f1',
      'label': [
        'Ivano-Frankivska',
        'Івано-Франківська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA63',
      '$kuid': '3589d0e752',
      'label': [
        'Kharkivska',
        'Харківська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA65',
      '$kuid': '5bfe97d0a6',
      'label': [
        'Khersonska',
        'Херсонська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA68',
      '$kuid': 'a24a4de00a',
      'label': [
        'Khmelnytska',
        'Хмельницька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA35',
      '$kuid': 'fcf82377a7',
      'label': [
        'Kirovohradska',
        'Кіровоградська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA80',
      '$kuid': '7ec21578c9',
      'label': [
        'Kyiv',
        'Київ',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA32',
      '$kuid': 'fdb76cd822',
      'label': [
        'Kyivska',
        'Київська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA44',
      '$kuid': '52c44b5856',
      'label': [
        'Luhanska',
        'Луганська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA46',
      '$kuid': '7d702a7694',
      'label': [
        'Lvivska',
        'Львівська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA48',
      '$kuid': '7068db61e9',
      'label': [
        'Mykolaivska',
        'Миколаївська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA51',
      '$kuid': '8055170379',
      'label': [
        'Odeska',
        'Одеська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA53',
      '$kuid': '352239ef5e',
      'label': [
        'Poltavska',
        'Полтавська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA56',
      '$kuid': 'ceee7f7d34',
      'label': [
        'Rivnenska',
        'Рівненська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA85',
      '$kuid': 'ecb0d4e41a',
      'label': [
        'Sevastopol',
        'Севастополь',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA59',
      '$kuid': 'a633410ff3',
      'label': [
        'Sumska',
        'Сумська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA61',
      '$kuid': '57614d7c73',
      'label': [
        'Ternopilska',
        'Тернопільська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA05',
      '$kuid': '97fffb1097',
      'label': [
        'Vinnytska',
        'Вінницька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA07',
      '$kuid': '2f6ec01e89',
      'label': [
        'Volynska',
        'Волинська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA21',
      '$kuid': '1bcd9fcc45',
      'label': [
        'Zakarpatska',
        'Закарпатська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA23',
      '$kuid': 'd786b25c26',
      'label': [
        'Zaporizka',
        'Запорізька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA18',
      '$kuid': '8551310601',
      'label': [
        'Zhytomyrska',
        'Житомирська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'diff_see',
      '$kuid': '501df6a60b',
      'label': [
        'Have difficulty seeing, even if wearing glasses',
        'Маєте труднощі із зором, навіть якщо носите окуляри',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_hear',
      '$kuid': '4d3555cd36',
      'label': [
        'Have difficulty hearing, even if using a hearing aid',
        'Маєте проблеми зі слухом, навіть якщо користуєтеся слуховим апаратом',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_walk',
      '$kuid': 'c6b5957db9',
      'label': [
        'Have difficulty walking or climbing steps',
        'Маєте труднощі з ходьбою або підйомом по сходах',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_rem',
      '$kuid': 'e6cc1df2ae',
      'label': [
        'Have difficulty remembering or concentrating',
        'Маєте труднощі з запам\'ятовуванням або концентрацією уваги',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_care',
      '$kuid': '5ed5b9ada8',
      'label': [
        'Have difficulty with self-care such as washing all over or dressing',
        'Мають труднощі з самообслуговуванням, наприклад, з миттям або одяганням',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_comm',
      '$kuid': '4058637e39',
      'label': [
        'Have difficulty communicating, for example understanding or being understood',
        'Маєте труднощі у спілкуванні, наприклад, у розумінні чи розумінні інших людей',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_none',
      '$kuid': '5553da3a20',
      'label': [
        'None of the above apply',
        'Ніщо з перерахованого вище не стосується',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'idp',
      '$kuid': 'd9e7e64251',
      'label': [
        'Internally Displaced Person (IDP)',
        'Внутрішньо-переміщена особа (ВПО)',
      ],
      'list_name': 'displacement_status',
    },
    {
      'name': 'long_res',
      '$kuid': 'a5e00e63e1',
      'label': [
        'Long - Term Resident',
        'Довгостроковий мешканець',
      ],
      'list_name': 'displacement_status',
    },
    {
      'name': 'ret',
      '$kuid': '20bd7ecd48',
      'label': [
        'Returnee',
        'Особа, яка повернулася',
      ],
      'list_name': 'displacement_status',
    },
    {
      'name': 'ref_asy',
      '$kuid': 'e4a699709a',
      'label': [
        'Refugee/asylum seeker',
        'Біженець/особа, що потребує прихистку',
      ],
      'list_name': 'displacement_status',
    },
    {
      'name': 'other',
      '$kuid': 'b968562496',
      'label': [
        'Other',
        'інше',
      ],
      'list_name': 'displacement_status',
    },
  ],
  'translated': [
    'label',
  ],
  'translations': [
    'English (en)',
    'Ukrainian (ua)',
  ],
}

export const formGlobalVersion: Prisma.FormVersionCreateManyInput = {
  formId: formGlobal.id!,
  schemaJson: formGlobalSchema,
  version: 1,
  status: 'active',
  uploadedBy: createdBySystem,
}

export const formGlobalAction: Prisma.FormActionCreateManyInput[] = [
  {
    'createdBy': 'visitor.8@nexusportal.app',
    'type': 'insert',
    'name': 'Pull all data from HHS',
    'body': 'import { Input } from \'input\'\nimport { Output } from \'output\'\nimport { Submission } from \'meta\'\n\nasync function transform(submission: Submission<Input.Type>): Promise<Output.Type | Output.Type[]> {\n  return {\n    survey: \'Household Survey\',\n    office: submission.answers.back_office,\n    sector: \'protection\',\n    program: \'protection_monito\',\n    donor: submission.answers.donor,\n    oblast: submission.answers.current_oblast,\n    persons_count: submission.answers.persons?.length ?? 0,\n    persons: submission.answers.persons?.map(_ => {\n      return {\n        uniq_id: \'\' + Math.random(), // We don\'t have Tax ID in HHS -> assume all individuals are unique.\n        age: _.age,\n        disability: _.disability.includes(\'no\') ? undefined : _.disability as any,\n        gender: _.gender === \'unable_unwilling_to_answer\' ? undefined : _.gender,\n        displacement_status: mapDisplacementStatus(submission.answers.disp_status),\n      }\n    })\n  }\n}\n\nconst mapDisplacementStatus = (status: Input.Choice<\'disp_status\'>): Output.Choice<\'displacement_status\'> | undefined => {\n  switch (status) {\n    case \'idp\':\n      return \'idp\'\n    case \'non_displaced\':\n      return \'long_res\'\n    case \'returnee\':\n      return \'ret\'\n  }\n}',
    'bodyErrors': 0,
    'bodyWarnings': 0,
    'formId': 'id_form_global',
    'targetFormId': 'id_form_hhs',
  },
  {
    'createdBy': 'visitor.8@nexusportal.app',
    'type': 'insert',
    'name': 'Pull all data from NTA',
    'body': 'import {Input} from \'input\'\nimport {Output} from \'output\'\nimport {Submission} from \'meta\'\n\nexport async function transform(\n  submission: Submission<Input.Type>\n): Promise<Output.Type | Output.Type[]> {\n  return {\n    survey: \'Shelter No-Technical Assessment\',\n    oblast: submission.answers.ben_det_oblast,\n    office: submission.answers.back_office,\n    donor: submission.answers.back_donor,\n    sector: \'shelter\',\n    program: \'shelter_repair\',\n    persons_count: submission.answers.hh_char_hh_det?.length ?? 0,\n    persons: submission.answers.hh_char_hh_det?.map(person => {\n      return {\n        age: person.hh_char_hh_det_age,\n        gender: person.hh_char_hh_det_gender,\n        disability: person.hh_char_hh_det_dis_level !== \'zero\' ? person.hh_char_hh_det_dis_select : undefined,\n        displacement_status: submission.answers.res_stat,\n        phone: submission.answers.ben_det_phone + \'\',\n        tax_id: submission.answers.ben_det_tax_id,\n        uniq_id: submission.answers.ben_det_tax_id,\n      }\n    })\n  }\n}',
    'bodyErrors': 0,
    'bodyWarnings': 0,
    'formId': 'id_form_global',
    'targetFormId': 'id_form_nta',
  },
  {
    'createdBy': 'visitor.8@nexusportal.app',
    'type': 'insert',
    'name': 'Pull all data from RRM',
    'body': 'import { Input } from \'input\'\nimport { Output } from \'output\'\nimport { Submission } from \'meta\'\n\nexport async function transform(submission: Submission<Input.Type>): Promise<Output.Type | Output.Type[]> {\n  return {\n    survey: \'Rapid Response\',\n    oblast: submission.answers.oblast,\n    donor: submission.answers.donor === \'bhab\' ? \'bha\' : submission.answers.donor,\n    office: getOffice(submission.answers.oblast),\n    sector: getSector(submission.answers.program),\n    program: submission.answers.program,\n    persons_count: submission.answers.person?.length ?? 0,\n    persons: submission.answers.person?.map((person, index) => {\n      return {\n        age: person.age,\n        disability: person.disability?.filter(dis => dis !== \'diff_none\'),\n        gender: person.gender,\n        tax_id: index === 0 ? submission.answers.taxid : undefined,\n        uniq_id: submission.answers.taxid + index,\n      }\n    })\n  }\n}\n\nfunction getSector(program: Input.Choice<\'program\'>): Output.Choice<\'sector\'> {\n  switch (program) {\n    case \'esk\':\n      return \'shelter\'\n    case \'mpca\':\n    case \'nfi\':\n      return \'basic_needs\'\n  }\n}\n\nfunction getOffice(oblast: Input.Choice<\'oblast\'>): Output.Choice<\'office\'> | undefined {\n  switch (oblast) {\n    case \'UA74\':\n      return \'chernihiv\'\n    case \'UA59\':\n      return \'sumy\'\n    case \'UA12\':\n    case \'UA23\':\n      return \'dnipro\'\n    case \'UA48\':\n    case \'UA65\':\n      return \'mykolaiv\'\n    case \'UA63\':\n    case \'UA53\':\n      return \'kharkiv\'\n  }\n}',
    'bodyErrors': 0,
    'bodyWarnings': 0,
    'formId': 'id_form_global',
    'targetFormId': 'id_form_rrm',
  },
]