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
      'name': 'office',
      'type': 'select_one',
      '$kuid': '73c54b93b4',
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
      '$kuid': 'd74658231d',
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
      '$kuid': 'e3d1bf6af4',
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
      '$kuid': 'bd355a3563',
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
      '$kuid': 'deebab6b79',
      'label': [
        'Oblast',
        'Область',
      ],
      '$xpath': 'oblast',
      'required': false,
      'select_from_list_name': 'oblast',
    },
    {
      'name': 'persons',
      'type': 'begin_repeat',
      '$kuid': '6e9c472f40',
      'label': [
        'Individuals',
        'Фізичні особи',
      ],
      '$xpath': 'persons',
    },
    {
      'name': 'age',
      'type': 'integer',
      '$kuid': '4d81867d6e',
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
      '$kuid': 'f133eb5764',
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
      '$kuid': '6b701aaf02',
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
      '$kuid': '652c0f4dc5',
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
      '$kuid': '0e33d2b50b',
      'label': [
        'Tax ID',
        'Ідентифікаційний номер платника податків',
      ],
      '$xpath': 'persons/tax_id',
      'required': false,
    },
    {
      'name': 'phone',
      'type': 'text',
      '$kuid': '7055a44cf8',
      'label': [
        'Phone Number',
        'Номер телефону',
      ],
      '$xpath': 'persons/phone',
      'required': false,
    },
    {
      'type': 'end_repeat',
      '$kuid': '83e064c731',
    },
  ],
  'choices': [
    {
      'name': 'bha',
      '$kuid': '83e213cb5c',
      'label': [
        'BHA',
        'BHA',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'echo',
      '$kuid': 'a131fe6fb7',
      'label': [
        'ECHO',
        'ECHO',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'unhcr',
      '$kuid': 'f78cb5464e',
      'label': [
        'UNHCR',
        'UNHCR',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'ufr',
      '$kuid': 'a6c7216d1e',
      'label': [
        'UFR',
        'UFR',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'sumy',
      '$kuid': '3996715285',
      'label': [
        'Sumy',
        'Суми',
      ],
      'list_name': 'office',
    },
    {
      'name': 'chernihiv',
      '$kuid': '5f5e95d4d4',
      'label': [
        'Chernihiv',
        'Чернігів',
      ],
      'list_name': 'office',
    },
    {
      'name': 'dnipro',
      '$kuid': '6faa83acf2',
      'label': [
        'Dnipro',
        'Дніпро',
      ],
      'list_name': 'office',
    },
    {
      'name': 'kharkiv',
      '$kuid': '66d58c857e',
      'label': [
        'Kharkiv',
        'Харків',
      ],
      'list_name': 'office',
    },
    {
      'name': 'mykolaiv',
      '$kuid': '63cb8da437',
      'label': [
        'Mykolaiv',
        'Миколаїв',
      ],
      'list_name': 'office',
    },
    {
      'name': 'sloviansk',
      '$kuid': 'afc19f1551',
      'label': [
        'Sloviansk',
        'Слов\'янськ ',
      ],
      'list_name': 'office',
    },
    {
      'name': 'basic_needs',
      '$kuid': 'dbfa5be391',
      'label': [
        'Basic Needs',
        'Базові потреби',
      ],
      'list_name': 'sector',
    },
    {
      'name': 'protection',
      '$kuid': '96d58fe908',
      'label': [
        'Protection',
        'Захист',
      ],
      'list_name': 'sector',
    },
    {
      'name': 'shelter',
      '$kuid': '053344cc94',
      'label': [
        'Shelter',
        'Житло',
      ],
      'list_name': 'sector',
    },
    {
      'name': 'shelter_repair',
      '$kuid': '61bdab6111',
      'label': [
        'Shelter Repair',
        'Ремонт житла',
      ],
      'list_name': 'program',
    },
    {
      'name': 'esk',
      '$kuid': 'caf01c74c0',
      'label': [
        'Emergency Shelter Kits',
        'Аварійні комплекти для житла',
      ],
      'list_name': 'program',
    },
    {
      'name': 'nfi',
      '$kuid': '6493a979ce',
      'label': [
        'Non-Food Items',
        'Нехарчові товари',
      ],
      'list_name': 'program',
    },
    {
      'name': 'mpca',
      '$kuid': '2db0d765dd',
      'label': [
        'Multipurpose cash assistance',
        'Багатоцільова грошова допомога',
      ],
      'list_name': 'program',
    },
    {
      'name': 'protection_monito',
      '$kuid': '0d9f37f82d',
      'label': [
        'Protection Monitoring',
        'Моніторинг захисту',
      ],
      'list_name': 'program',
    },
    {
      'name': 'other',
      '$kuid': '9107d2b509',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'female',
      '$kuid': '2f0a32f2b9',
      'label': [
        'Female',
        'Жінка',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'male',
      '$kuid': '2224676c3c',
      'label': [
        'Male',
        'Чоловік',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'UA01',
      '$kuid': 'aef3e69b03',
      'label': [
        'Autonomous Republic of Crimea',
        'Автономна Республіка Крим',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA71',
      '$kuid': '737e747de5',
      'label': [
        'Cherkaska',
        'Черкаська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA74',
      '$kuid': 'a151c7e8dc',
      'label': [
        'Chernihivska',
        'Чернігівська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA73',
      '$kuid': '812575a59a',
      'label': [
        'Chernivetska',
        'Чернівецька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA12',
      '$kuid': '454abbfca0',
      'label': [
        'Dnipropetrovska',
        'Дніпропетровська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA14',
      '$kuid': '6811c71c43',
      'label': [
        'Donetska',
        'Донецька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA26',
      '$kuid': '0cc5fbf6a6',
      'label': [
        'Ivano-Frankivska',
        'Івано-Франківська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA63',
      '$kuid': '9e0a06f24c',
      'label': [
        'Kharkivska',
        'Харківська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA65',
      '$kuid': '30988ab34f',
      'label': [
        'Khersonska',
        'Херсонська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA68',
      '$kuid': '356115b5c9',
      'label': [
        'Khmelnytska',
        'Хмельницька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA35',
      '$kuid': '50447ac66d',
      'label': [
        'Kirovohradska',
        'Кіровоградська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA80',
      '$kuid': '888d1c8580',
      'label': [
        'Kyiv',
        'Київ',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA32',
      '$kuid': '9a5651cf59',
      'label': [
        'Kyivska',
        'Київська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA44',
      '$kuid': '909d9ce612',
      'label': [
        'Luhanska',
        'Луганська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA46',
      '$kuid': 'e50b8334c6',
      'label': [
        'Lvivska',
        'Львівська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA48',
      '$kuid': 'f6f49ea777',
      'label': [
        'Mykolaivska',
        'Миколаївська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA51',
      '$kuid': '63405f79b2',
      'label': [
        'Odeska',
        'Одеська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA53',
      '$kuid': 'e0a2cf7f67',
      'label': [
        'Poltavska',
        'Полтавська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA56',
      '$kuid': 'a2da8b3d80',
      'label': [
        'Rivnenska',
        'Рівненська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA85',
      '$kuid': '9256c9a158',
      'label': [
        'Sevastopol',
        'Севастополь',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA59',
      '$kuid': '9d1314d044',
      'label': [
        'Sumska',
        'Сумська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA61',
      '$kuid': 'b0751c0d2e',
      'label': [
        'Ternopilska',
        'Тернопільська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA05',
      '$kuid': '6ee1ce50f8',
      'label': [
        'Vinnytska',
        'Вінницька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA07',
      '$kuid': 'c9904471f6',
      'label': [
        'Volynska',
        'Волинська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA21',
      '$kuid': '79eaa8a51b',
      'label': [
        'Zakarpatska',
        'Закарпатська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA23',
      '$kuid': '5fac260c38',
      'label': [
        'Zaporizka',
        'Запорізька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA18',
      '$kuid': '106dc60e7b',
      'label': [
        'Zhytomyrska',
        'Житомирська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'diff_see',
      '$kuid': '4af126394d',
      'label': [
        'Have difficulty seeing, even if wearing glasses',
        'Маєте труднощі із зором, навіть якщо носите окуляри',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_hear',
      '$kuid': '8979c874a1',
      'label': [
        'Have difficulty hearing, even if using a hearing aid',
        'Маєте проблеми зі слухом, навіть якщо користуєтеся слуховим апаратом',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_walk',
      '$kuid': '40122e081c',
      'label': [
        'Have difficulty walking or climbing steps',
        'Маєте труднощі з ходьбою або підйомом по сходах',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_rem',
      '$kuid': '039fc21cf2',
      'label': [
        'Have difficulty remembering or concentrating',
        'Маєте труднощі з запам\'ятовуванням або концентрацією уваги',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_care',
      '$kuid': '3acf4b0e8c',
      'label': [
        'Have difficulty with self-care such as washing all over or dressing',
        'Мають труднощі з самообслуговуванням, наприклад, з миттям або одяганням',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_comm',
      '$kuid': '26a95af6ce',
      'label': [
        'Have difficulty communicating, for example understanding or being understood',
        'Маєте труднощі у спілкуванні, наприклад, у розумінні чи розумінні інших людей',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_none',
      '$kuid': '393ec91da0',
      'label': [
        'None of the above apply',
        'Ніщо з перерахованого вище не стосується',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'idp',
      '$kuid': '9590e9f9fc',
      'label': [
        'Internally Displaced Person (IDP)',
        'Внутрішньо-переміщена особа (ВПО)',
      ],
      'list_name': 'displacement_status',
    },
    {
      'name': 'long_res',
      '$kuid': '2ef9f81638',
      'label': [
        'Long - Term Resident',
        'Довгостроковий мешканець',
      ],
      'list_name': 'displacement_status',
    },
    {
      'name': 'ret',
      '$kuid': '5023a9ff42',
      'label': [
        'Returnee',
        'Особа, яка повернулася',
      ],
      'list_name': 'displacement_status',
    },
    {
      'name': 'ref_asy',
      '$kuid': '303b9cc3f8',
      'label': [
        'Refugee/asylum seeker',
        'Біженець/особа, що потребує прихистку',
      ],
      'list_name': 'displacement_status',
    },
    {
      'name': 'other',
      '$kuid': '93c02b3d28',
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
    'createdBy': 'visitor.12@nexusportal.app',
    'type': 'insert',
    'name': 'Pull all data from NTA',
    'disabled': false,
    'description': null,
    'body': 'import {Input} from \'input\'\nimport {Output} from \'output\'\nimport {Submission} from \'meta\'\n\nexport async function transform(\n  submission: Submission<Input.Type>\n): Promise<Output.Type | Output.Type[]> {\n  return {\n    oblast: submission.answers.ben_det_oblast,\n    office: submission.answers.back_office,\n    sector: \'shelter\',\n    program: \'shelter_repair\',\n    persons: submission.answers.hh_char_hh_det?.map(person => {\n      return {\n        age: person.hh_char_hh_det_age,\n        gender: person.hh_char_hh_det_gender,\n        disability: person.hh_char_hh_det_dis_level !== \'zero\' ? person.hh_char_hh_det_dis_select : undefined,\n        displacement_status: submission.answers.res_stat,\n        phone: submission.answers.ben_det_phone + \'\',\n        tax_id: submission.answers.ben_det_tax_id,\n      }\n    })\n  }\n}',
    'bodyErrors': 0,
    'bodyWarnings': 0,
    'formId': 'id_form_global',
    'targetFormId': 'id_form_nta',
  },
  {
    'createdBy': 'SYSTEM',
    'type': 'insert',
    'name': 'Pull all data from RRM',
    'disabled': false,
    'description': null,
    'body': 'import { Input } from \'input\'\nimport { Output } from \'output\'\nimport { Submission } from \'meta\'\n\nexport async function transform(submission: Submission<Input.Type>): Promise<Output.Type | Output.Type[]> {\n  return {\n    oblast: submission.answers.oblast,\n    office: getOffice(submission.answers.oblast),\n    sector: getSector(submission.answers.program),\n    program: submission.answers.program,\n    persons: submission.answers.person?.map((person, index) => {\n      return {\n        age: person.age,\n        disability: person.disability?.filter(dis => dis !== \'diff_none\'),\n        gender: person.gender,\n        tax_id: index === 0 ? submission.answers.taxid : undefined,\n      }\n    })\n  }\n}\n\nfunction getSector(program: Input.Choice<\'program\'>): Output.Choice<\'sector\'> {\n  switch (program) {\n    case \'esk\':\n      return \'shelter\'\n    case \'mpca\':\n    case \'nfi\':\n      return \'basic_needs\'\n  }\n}\n\nfunction getOffice(oblast: Input.Choice<\'oblast\'>): Output.Choice<\'office\'> | undefined {\n  switch (oblast) {\n    case \'UA74\':\n      return \'chernihiv\'\n    case \'UA59\':\n      return \'sumy\'\n    case \'UA12\':\n    case \'UA23\':\n      return \'dnipro\'\n    case \'UA48\':\n    case \'UA65\':\n      return \'mykolaiv\'\n    case \'UA63\':\n    case \'UA53\':\n      return \'kharkiv\'\n  }\n}',
    'bodyErrors': 0,
    'bodyWarnings': 0,
    'formId': 'id_form_global',
    'targetFormId': 'id_form_rrm',
  },
  {
    'createdBy': 'visitor.12@nexusportal.app',
    'type': 'insert',
    'name': 'Pull all data from HHS',
    'disabled': false,
    'description': null,
    'body': 'import { Input } from \'input\'\nimport { Output } from \'output\'\nimport { Submission } from \'meta\'\n\nasync function transform(submission: Submission<Input.Type>): Promise<Output.Type | Output.Type[]> {\n  return {\n    office: submission.answers.back_office,\n    sector: \'protection\',\n    program: \'protection_monito\',\n    oblast: submission.answers.current_oblast,\n    persons: submission.answers.persons?.map(_ => {\n      return {\n        age: _.age,\n        disability: _.disability.includes(\'no\') ? undefined : _.disability as any,\n        gender: _.gender === \'unable_unwilling_to_answer\' ? undefined : _.gender,\n        displacement_status: mapDisplacementStatus(submission.answers.disp_status),\n      }\n    })\n  }\n}\n\nconst mapDisplacementStatus = (status: Input.Choice<\'disp_status\'>): Output.Choice<\'displacement_status\'> | undefined => {\n  switch (status) {\n    case \'idp\':\n      return \'idp\'\n    case \'non_displaced\':\n      return \'long_res\'\n    case \'returnee\':\n      return \'ret\'\n  }\n}',
    'bodyErrors': 0,
    'bodyWarnings': 0,
    'formId': 'id_form_global',
    'targetFormId': 'id_form_hhs',
  },
]
