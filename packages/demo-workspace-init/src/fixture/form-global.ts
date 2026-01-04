import {createdBySystem, demoWorkspaceId} from '../utils.js'
import {Prisma} from '@infoportal/prisma'
import {users} from './users'

export const formGlobal: Prisma.FormCreateManyInput = {
  name: 'Global Database',
  type: 'smart',
  workspaceId: demoWorkspaceId,
  category: 'Protection',
  deploymentStatus: 'deployed',
  id: 'id_form_global',
  uploadedBy: createdBySystem,
}

export const formGlobalSchema = {
  'survey': [
    {
      'name': 'context',
      'type': 'begin_group',
      '$kuid': 'caa0d02c8a',
      'label': [
        'Context',
        'Контекст',
      ],
      '$xpath': 'context',
    },
    {
      'hint': [
        'Program',
        null,
      ],
      'name': 'program',
      'type': 'select_one',
      '$kuid': '6b3c30fc0a',
      'label': [
        'Program',
        'Програма',
      ],
      '$xpath': 'context/program',
      'required': true,
      'select_from_list_name': 'program',
    },
    {
      'hint': [
        'Location ADM1',
        null,
      ],
      'name': 'oblast',
      'type': 'select_one',
      '$kuid': '66043aaa74',
      'label': [
        'Oblast',
        'Область',
      ],
      '$xpath': 'context/oblast',
      'required': true,
      'select_from_list_name': 'oblast',
    },
    {
      'name': 'donor',
      'type': 'select_one',
      '$kuid': 'f5febece41',
      'label': [
        'Donor',
        'Донор',
      ],
      '$xpath': 'context/donor',
      'required': true,
      'select_from_list_name': 'donor',
    },
    {
      'type': 'end_group',
      '$kuid': 'f68ed05f75',
    },
    {
      'name': 'respondent',
      'type': 'begin_group',
      '$kuid': '45513f46e6',
      'label': [
        'Respondent',
        'Респондент',
      ],
      '$xpath': 'respondent',
    },
    {
      'name': 'firstname',
      'type': 'text',
      '$kuid': '9355c90d94',
      'label': [
        'First Name',
        'Ім\'я',
      ],
      '$xpath': 'respondent/firstname',
      'required': true,
    },
    {
      'name': 'lastname',
      'type': 'text',
      '$kuid': 'a1e2b5a299',
      'label': [
        'Last Name',
        'Прізвище',
      ],
      '$xpath': 'respondent/lastname',
      'required': true,
    },
    {
      'name': 'taxid',
      'type': 'text',
      '$kuid': '649e08b4e8',
      'label': [
        'Tax ID',
        'Ідентифікаційний номер платника податків',
      ],
      '$xpath': 'respondent/taxid',
      'required': true,
      'constraint': 'regex(., \'^[0-9]{10}$\')',
      'constraint_message': [
        '10 digits',
        null,
      ],
    },
    {
      'name': 'phone',
      'type': 'text',
      '$kuid': 'e501d2ef77',
      'label': [
        'Phone number',
        'Номер телефону',
      ],
      '$xpath': 'respondent/phone',
      'constraint': 'regex(., \'^[0-9]{10}$\')',
      'constraint_message': [
        '10 digits',
        null,
      ],
    },
    {
      'name': 'income',
      'type': 'decimal',
      '$kuid': '10384ed262',
      'label': [
        'Total value of HH resources received (UAH) in the last month',
        'Загальна вартість отриманих ресурсів домогосподарства (грн.) за останній місяць',
      ],
      '$xpath': 'respondent/income',
      'constraint': '. > 0',
    },
    {
      'type': 'end_group',
      '$kuid': 'bfca25640e',
    },
    {
      'name': 'household',
      'type': 'begin_group',
      '$kuid': 'b9ca49d21c',
      'label': [
        'Household Characteristics',
        'Характеристики домогосподарства',
      ],
      '$xpath': 'household',
    },
    {
      'name': 'person',
      'type': 'begin_repeat',
      '$kuid': '2770733954',
      'label': [
        'Household members',
        'Члени домогосподарства',
      ],
      '$xpath': 'household/person',
    },
    {
      'name': 'age',
      'type': 'integer',
      '$kuid': '3c0830c877',
      'label': [
        'Age',
        'Вік',
      ],
      '$xpath': 'household/person/age',
    },
    {
      'name': 'gender',
      'type': 'select_one',
      '$kuid': 'ef8695cf7f',
      'label': [
        'Gender',
        'Стать',
      ],
      '$xpath': 'household/person/gender',
      'required': true,
      'select_from_list_name': 'gender',
    },
    {
      'name': 'disability',
      'type': 'select_multiple',
      '$kuid': '01e30b02a5',
      'label': [
        'Disabilities',
        'Інвалідність',
      ],
      '$xpath': 'household/person/disability',
      'select_from_list_name': 'disability',
    },
    {
      'name': 'disability_level',
      'type': 'select_one',
      '$kuid': '87e3f3b3d1',
      'label': [
        'Disability level',
        'Рівень інвалідності',
      ],
      '$xpath': 'household/person/disability_level',
      'required': true,
      'select_from_list_name': 'disability_level',
    },
    {
      'type': 'end_repeat',
      '$kuid': '67c475d92e',
    },
    {
      'type': 'end_group',
      '$kuid': '69a55a5077',
    },
    {
      'name': 'nfi',
      'type': 'begin_group',
      '$kuid': 'ff3ccfaede',
      'label': [
        'NFI Needs',
        'Потреби в непродовольчих товарах',
      ],
      '$xpath': 'nfi',
      'relevant': 'selected(${program}, \'nfi\')',
    },
    {
      'name': 'nfi_note',
      'type': 'note',
      '$kuid': 'ff8dd533c7',
      'label': [
        '**NFI Kits distributed at the point of registration?**',
        '**Чи видані набори непродовольчих товарів у місці реєстрації?**',
      ],
      '$xpath': 'nfi/nfi_note',
    },
    {
      'name': 'nif_hkf',
      'type': 'integer',
      '$kuid': '569b65e793',
      'label': [
        'Family Hygiene Kits (HKF)',
        'Набори сімейної гігієни (HKF)',
      ],
      '$xpath': 'nfi/nif_hkf',
    },
    {
      'name': 'nfi_nfkf_ks',
      'type': 'integer',
      '$kuid': 'dbcdc01356',
      'label': [
        'Family NFI kits distributed (NFKF + KS)',
        'Роздані набори сімейної непродовольчої допомоги (NFKF + KS)',
      ],
      '$xpath': 'nfi/nfi_nfkf_ks',
    },
    {
      'name': 'nfi_kit_cc',
      'type': 'integer',
      '$kuid': '5e6066021c',
      'label': [
        'NFI Kit for Collective Center distributed',
        'Розданий комплект непродовольчої допомоги для колективного центру',
      ],
      '$xpath': 'nfi/nfi_kit_cc',
    },
    {
      'name': 'nfi_fks',
      'type': 'integer',
      '$kuid': '6feb3298a7',
      'label': [
        'Family kitchen set (FKS)',
        'Набір сімейної кухні (FKS)',
      ],
      '$xpath': 'nfi/nfi_fks',
    },
    {
      'type': 'end_group',
      '$kuid': '4989b7c701',
    },
    {
      'name': 'esk',
      'type': 'begin_group',
      '$kuid': 'c229f2cd48',
      'label': [
        'ESK Needs',
        'Потреби ESK',
      ],
      '$xpath': 'esk',
      'relevant': 'selected(${program}, \'esk\')',
    },
    {
      'name': 'esk_shelter_damage',
      'type': 'select_one',
      '$kuid': '725aca0954',
      'label': [
        'Current shelter damaged?',
        'Пошкоджено поточне житло?',
      ],
      '$xpath': 'esk/esk_shelter_damage',
      'select_from_list_name': 'shelter_damage',
    },
    {
      'hint': [
        'if the individual cannot estimate, enter 0 and provide Household with one kit',
        null,
      ],
      'name': 'esk_estimate_sqm_damage',
      'type': 'integer',
      '$kuid': '8fa17eb783',
      'label': [
        'Square meter or roof or window that is damaged estimation',
        'Оцінка площі пошкодженого квадратного метра, даху чи вікна',
      ],
      '$xpath': 'esk/esk_estimate_sqm_damage',
    },
    {
      'type': 'end_group',
      '$kuid': 'cc81858d3b',
    },
    {
      'name': 'mpca',
      'type': 'begin_group',
      '$kuid': '70a04d6bf5',
      'label': [
        'Cash Assistance Inclusion/Exclusion',
        'Включення/виключення грошової допомоги',
      ],
      '$xpath': 'mpca',
      'relevant': 'selected(${program}, \'mpca\')',
    },
    {
      'name': 'mpca_tax_id_ph',
      'type': 'image',
      '$kuid': '37697963f1',
      'label': [
        'Tax number photo',
        'Фото податкового номера',
      ],
      '$xpath': 'mpca/mpca_tax_id_ph',
    },
    {
      'name': 'mpca_tax_exemption',
      'type': 'select_one',
      '$kuid': '89012f9999',
      'label': [
        'Have a tax exemptions?',
        'Маєте податкові пільги?',
      ],
      '$xpath': 'mpca/mpca_tax_exemption',
      'select_from_list_name': 'yn',
    },
    {
      'name': 'mpca_pay_method',
      'type': 'select_one',
      '$kuid': 'b61d6bbbe3',
      'label': [
        'Preferred payment method?',
        'Бажаний спосіб оплати?',
      ],
      '$xpath': 'mpca/mpca_pay_method',
      'select_from_list_name': 'pay_method',
    },
    {
      'type': 'end_group',
      '$kuid': '750c0ecbcc',
    },
  ],
  'choices': [
    {
      'name': 'mpca',
      '$kuid': '5e68d7920d',
      'label': [
        'Multipurpose cash assistance (MPCA)',
        'Багатоцільова грошова допомога (MPCA)',
      ],
      'list_name': 'program',
    },
    {
      'name': 'nfi',
      '$kuid': 'a1953e8333',
      'label': [
        'Non-Food Items (NFI)',
        'Непродовольчі товари (NFI)',
      ],
      'list_name': 'program',
    },
    {
      'name': 'esk',
      '$kuid': '8dc239da48',
      'label': [
        'Emergency Shelter Kits (ESK)',
        'Комплекти екстреної допомоги (ESK)',
      ],
      'list_name': 'program',
    },
    {
      'name': 'male',
      '$kuid': 'a4f6a9195f',
      'label': [
        'Male',
        'Чоловік',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'female',
      '$kuid': '047788553c',
      'label': [
        'Female',
        'Жінка',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'other',
      '$kuid': 'b49d9cb875',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'echo',
      '$kuid': 'f7993ae2cf',
      'label': [
        'ECHO',
        'ECHO',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'bhab',
      '$kuid': '84e96469e2',
      'label': [
        'BHA',
        'BHA',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'uhf',
      '$kuid': '98585a31cc',
      'label': [
        'UHF',
        'UHF',
      ],
      'list_name': 'donor',
    },
    {
      'name': '_3',
      '$kuid': '12b2635a62',
      'label': [
        'Cannot do at all',
        'Зовсім не можу',
      ],
      'list_name': 'disability_level',
    },
    {
      'name': '_2',
      '$kuid': 'ef94b8d06c',
      'label': [
        'Yes, a lot of difficulty',
        'Так, дуже важко',
      ],
      'list_name': 'disability_level',
    },
    {
      'name': '_1',
      '$kuid': '9452f0de0a',
      'label': [
        'Yes, some difficulty',
        'Так, з деякими труднощами',
      ],
      'list_name': 'disability_level',
    },
    {
      'name': '_0',
      '$kuid': '4602069a92',
      'label': [
        'No, no difficulty',
        'Ні, без труднощів',
      ],
      'list_name': 'disability_level',
    },
    {
      'name': 'diff_see',
      '$kuid': '64f2d29c6e',
      'label': [
        'Have difficulty seeing, even if wearing glasses',
        'Маю проблеми із зором, навіть якщо в окулярах',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_hear',
      '$kuid': '48d997eba0',
      'label': [
        'Have difficulty hearing, even if using a hearing aid',
        'Маю проблеми зі слухом, навіть якщо користуюся слуховим апаратом',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_walk',
      '$kuid': '1b90cac9ce',
      'label': [
        'Have difficulty walking or climbing steps',
        'Маю проблеми з ходьбою або підйомом сходами',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_rem',
      '$kuid': '837fe26d85',
      'label': [
        'Have difficulty remembering or concentrating',
        'Маю проблеми із запам\'ятовуванням або концентрацією уваги',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_care',
      '$kuid': '466e063108',
      'label': [
        'Have difficulty with self-care such as washing all over or dressing',
        'Маю проблеми із самообслуговуванням, наприклад, миттям або одяганням',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_comm',
      '$kuid': 'ae9f3a789c',
      'label': [
        'Have difficulty communicating, for example understanding or being understood',
        'Маю проблеми зі спілкуванням, наприклад, з розумінням або тим, що тебе розуміють',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_none',
      '$kuid': '56aed4cca1',
      'label': [
        'None of the above apply',
        'Жоден з перерахованих вище пунктів не застосовується',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'no_damage',
      '$kuid': '24f61965de',
      'label': [
        'No Structural Damage',
        'Без структурних пошкоджень',
      ],
      'list_name': 'shelter_damage',
    },
    {
      'name': 'heavy_damage',
      '$kuid': '95648c86cf',
      'label': [
        'No Structural Damage',
        'Без структурних пошкоджень',
      ],
      'list_name': 'shelter_damage',
    },
    {
      'name': 'minor_damage',
      '$kuid': '44f04f446c',
      'label': [
        'Minor Damage (light or medium damages such as broken windows and doors, minor roof damage)',
        'Незначні пошкодження (легкі або середні пошкодження, такі як розбиті вікна та двері, незначне пошкодження даху)',
      ],
      'list_name': 'shelter_damage',
    },
    {
      'name': 'yes',
      '$kuid': '8d6dafa109',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'yn',
    },
    {
      'name': 'no',
      '$kuid': 'efad956f8e',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'yn',
    },
    {
      'name': 'raiff_trans',
      '$kuid': '09a0f74396',
      'label': [
        'Remittance Raiffaisen AVAL',
        'Грошовий переказ Raiffaisen AVAL',
      ],
      'list_name': 'pay_method',
    },
    {
      'name': 'ukrpost',
      '$kuid': '31738a7302',
      'label': [
        'Ukrposhta',
        'Укрпошта',
      ],
      'list_name': 'pay_method',
    },
    {
      'name': 'bank_card',
      '$kuid': '95e7fa4555',
      'label': [
        'Bank card',
        'Банківська картка',
      ],
      'list_name': 'pay_method',
    },
    {
      'name': 'other_pay',
      '$kuid': '7796b31ca7',
      'label': [
        'Other Payment Method',
        'Інший спосіб оплати',
      ],
      'list_name': 'pay_method',
    },
    {
      'name': 'UA01',
      '$kuid': '9dffd3f870',
      'label': [
        'Autonomous Republic of Crimea',
        'Автономна Республіка Крим',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA71',
      '$kuid': 'f4ff9e7a44',
      'label': [
        'Cherkaska',
        'Черкаська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA74',
      '$kuid': '551cd10ff4',
      'label': [
        'Chernihivska',
        'Чернігівська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA73',
      '$kuid': 'd25b09b193',
      'label': [
        'Chernivetska',
        'Чернівецька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA12',
      '$kuid': '3b433d6e52',
      'label': [
        'Dnipropetrovska',
        'Дніпропетровська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA14',
      '$kuid': 'a2fa7d5b91',
      'label': [
        'Donetska',
        'Донецька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA26',
      '$kuid': '44d04adef5',
      'label': [
        'Ivano-Frankivska',
        'Івано-Франківська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA63',
      '$kuid': '92cbee8780',
      'label': [
        'Kharkivska',
        'Харківська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA65',
      '$kuid': '0ece52aa6f',
      'label': [
        'Khersonska',
        'Херсонська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA68',
      '$kuid': '046dca2aa9',
      'label': [
        'Khmelnytska',
        'Хмельницька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA35',
      '$kuid': '471b919769',
      'label': [
        'Kirovohradska',
        'Кіровоградська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA80',
      '$kuid': '25c812f15e',
      'label': [
        'Kyiv',
        'Київ',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA32',
      '$kuid': '554562e68b',
      'label': [
        'Kyivska',
        'Київська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA44',
      '$kuid': 'b7445c29e1',
      'label': [
        'Luhanska',
        'Луганська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA46',
      '$kuid': '1e9da4d242',
      'label': [
        'Lvivska',
        'Львівська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA48',
      '$kuid': 'a9800050f1',
      'label': [
        'Mykolaivska',
        'Миколаївська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA51',
      '$kuid': '904d58c530',
      'label': [
        'Odeska',
        'Одеська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA53',
      '$kuid': '42bcd86bdc',
      'label': [
        'Poltavska',
        'Полтавська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA56',
      '$kuid': '5a5f00ae2f',
      'label': [
        'Rivnenska',
        'Рівненська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA85',
      '$kuid': 'ab11dce520',
      'label': [
        'Sevastopol',
        'Севастополь',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA59',
      '$kuid': '829c8071d6',
      'label': [
        'Sumska',
        'Сумська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA61',
      '$kuid': '8a11ea1c5b',
      'label': [
        'Ternopilska',
        'Тернопільська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA05',
      '$kuid': 'ef23b32ea3',
      'label': [
        'Vinnytska',
        'Вінницька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA07',
      '$kuid': '8711f04ce5',
      'label': [
        'Volynska',
        'Волинська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA21',
      '$kuid': '166a0fa951',
      'label': [
        'Zakarpatska',
        'Закарпатська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA23',
      '$kuid': '1f6eceba2a',
      'label': [
        'Zaporizka',
        'Запорізька',
      ],
      'list_name': 'oblast',
    },
  ],
  'translated': [
    'label',
    'hint',
    'constraint_message',
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
