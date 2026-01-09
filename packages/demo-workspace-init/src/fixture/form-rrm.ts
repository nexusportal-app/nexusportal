import {Api} from '@infoportal/api-sdk'
import {Prisma} from '@infoportal/prisma'
import {createdBySystem, demoWorkspaceId} from '../utils.js'

export const fromRrm: Prisma.FormCreateManyInput = {
  name: 'Rapid Response',
  type: 'internal',
  workspaceId: demoWorkspaceId,
  category: 'Basic Needs',
  deploymentStatus: 'deployed',
  id: 'id_form_rrm',
  uploadedBy: createdBySystem,
}

export const formRrmSchema: Api.Form.Schema = {
  'survey': [
    {
      'name': 'context',
      'type': 'begin_group',
      '$kuid': '25d058eb84',
      'label': [
        'Context',
        'Контекст',
        null,
      ],
      '$xpath': 'context',
    },
    {
      'hint': [
        'Program',
        null,
        null,
      ],
      'name': 'program',
      'type': 'select_one',
      '$kuid': '6a1ce64eda',
      'label': [
        'Program',
        'Програма',
        null,
      ],
      '$xpath': 'context/program',
      'required': true,
      'select_from_list_name': 'program',
    },
    {
      'hint': [
        'Location ADM1',
        null,
        null,
      ],
      'name': 'oblast',
      'type': 'select_one',
      '$kuid': 'ffdee49a19',
      'label': [
        'Oblast',
        'Область',
        null,
      ],
      '$xpath': 'context/oblast',
      'required': true,
      'select_from_list_name': 'oblast',
    },
    {
      'name': 'donor',
      'type': 'select_one',
      '$kuid': 'e8d17d4ee6',
      'label': [
        'Donor',
        'Донор',
        null,
      ],
      '$xpath': 'context/donor',
      'required': true,
      'select_from_list_name': 'donor',
    },
    {
      'type': 'end_group',
      '$kuid': 'e00b7a4fd1',
    },
    {
      'name': 'respondent',
      'type': 'begin_group',
      '$kuid': '389b81e6a4',
      'label': [
        'Respondent',
        'Респондент',
        null,
      ],
      '$xpath': 'respondent',
    },
    {
      'name': 'firstname',
      'type': 'text',
      '$kuid': 'de2d967744',
      'label': [
        'First Name',
        'Ім\'я',
        null,
      ],
      '$xpath': 'respondent/firstname',
      'required': true,
    },
    {
      'name': 'lastname',
      'type': 'text',
      '$kuid': '2131af2f3f',
      'label': [
        'Last Name',
        'Прізвище',
        null,
      ],
      '$xpath': 'respondent/lastname',
      'required': true,
    },
    {
      'name': 'taxid',
      'type': 'text',
      '$kuid': 'd2825d56c9',
      'label': [
        'Tax ID',
        'Ідентифікаційний номер платника податків',
        null,
      ],
      '$xpath': 'respondent/taxid',
      'required': true,
      'constraint': 'regex(., \'^[0-9]{10}$\')',
      'constraint_message': [
        '10 digits',
        null,
        null,
      ],
    },
    {
      'name': 'phone',
      'type': 'text',
      '$kuid': 'fc5747999f',
      'label': [
        'Phone number',
        'Номер телефону',
        null,
      ],
      '$xpath': 'respondent/phone',
      'constraint': 'regex(., \'^[0-9]{10}$\')',
      'constraint_message': [
        '10 digits',
        null,
        null,
      ],
    },
    {
      'name': 'income',
      'type': 'decimal',
      '$kuid': '0350da4b95',
      'label': [
        'Total value of HH resources received (UAH) in the last month',
        'Загальна вартість отриманих ресурсів домогосподарства (грн.) за останній місяць',
        null,
      ],
      '$xpath': 'respondent/income',
      'constraint': '. > 0',
    },
    {
      'type': 'end_group',
      '$kuid': 'a0753d1088',
    },
    {
      'name': 'household',
      'type': 'begin_group',
      '$kuid': 'c86c45f0f1',
      'label': [
        'Household Characteristics',
        'Характеристики домогосподарства',
        null,
      ],
      '$xpath': 'household',
    },
    {
      'name': 'person',
      'type': 'begin_repeat',
      '$kuid': '845c44e85a',
      'label': [
        'Household members',
        'Члени домогосподарства',
        null,
      ],
      '$xpath': 'household/person',
    },
    {
      'name': 'age',
      'type': 'integer',
      '$kuid': '44c008c381',
      'label': [
        'Age',
        'Вік',
        null,
      ],
      '$xpath': 'household/person/age',
    },
    {
      'name': 'gender',
      'type': 'select_one',
      '$kuid': 'ab683595e9',
      'label': [
        'Gender',
        'Стать',
        null,
      ],
      '$xpath': 'household/person/gender',
      'required': true,
      'select_from_list_name': 'gender',
    },
    {
      'name': 'disability',
      'type': 'select_multiple',
      '$kuid': 'fb6b9199da',
      'label': [
        'Disabilities',
        'Інвалідність',
        null,
      ],
      '$xpath': 'household/person/disability',
      'select_from_list_name': 'disability',
    },
    {
      'name': 'disability_level',
      'type': 'select_one',
      '$kuid': 'b8e59774f8',
      'label': [
        'Disability level',
        'Рівень інвалідності',
        null,
      ],
      '$xpath': 'household/person/disability_level',
      'required': true,
      'select_from_list_name': 'disability_level',
    },
    {
      'type': 'end_repeat',
      '$kuid': '7addad0f83',
    },
    {
      'type': 'end_group',
      '$kuid': '9c2dfc3c50',
    },
    {
      'name': 'nfi',
      'type': 'begin_group',
      '$kuid': '83a91019f8',
      'label': [
        'NFI Needs',
        'Потреби в непродовольчих товарах',
        null,
      ],
      '$xpath': 'nfi',
      'relevant': 'selected(${program}, \'nfi\')',
    },
    {
      'name': 'nfi_note',
      'type': 'note',
      '$kuid': '0e22fc8297',
      'label': [
        '**NFI Kits distributed at the point of registration?**',
        '**Чи видані набори непродовольчих товарів у місці реєстрації?**',
        null,
      ],
      '$xpath': 'nfi/nfi_note',
    },
    {
      'name': 'nif_hkf',
      'type': 'integer',
      '$kuid': '6ee1c41aa8',
      'label': [
        'Family Hygiene Kits (HKF)',
        'Набори сімейної гігієни (HKF)',
        null,
      ],
      '$xpath': 'nfi/nif_hkf',
    },
    {
      'name': 'nfi_nfkf_ks',
      'type': 'integer',
      '$kuid': '91844b358f',
      'label': [
        'Family NFI kits distributed (NFKF + KS)',
        'Роздані набори сімейної непродовольчої допомоги (NFKF + KS)',
        null,
      ],
      '$xpath': 'nfi/nfi_nfkf_ks',
    },
    {
      'name': 'nfi_kit_cc',
      'type': 'integer',
      '$kuid': 'a6b42ce400',
      'label': [
        'NFI Kit for Collective Center distributed',
        'Розданий комплект непродовольчої допомоги для колективного центру',
        null,
      ],
      '$xpath': 'nfi/nfi_kit_cc',
    },
    {
      'name': 'nfi_fks',
      'type': 'integer',
      '$kuid': 'c41bef6cf9',
      'label': [
        'Family kitchen set (FKS)',
        'Набір сімейної кухні (FKS)',
        null,
      ],
      '$xpath': 'nfi/nfi_fks',
    },
    {
      'type': 'end_group',
      '$kuid': '39eedfd7cf',
    },
    {
      'name': 'esk',
      'type': 'begin_group',
      '$kuid': '8e957c6007',
      'label': [
        'ESK Needs',
        'Потреби ESK',
        null,
      ],
      '$xpath': 'esk',
      'relevant': 'selected(${program}, \'esk\')',
    },
    {
      'name': 'esk_shelter_damage',
      'type': 'select_one',
      '$kuid': '035c82a319',
      'label': [
        'Current shelter damaged?',
        'Пошкоджено поточне житло?',
        null,
      ],
      '$xpath': 'esk/esk_shelter_damage',
      'select_from_list_name': 'shelter_damage',
    },
    {
      'hint': [
        'if the individual cannot estimate, enter 0 and provide Household with one kit',
        null,
        null,
      ],
      'name': 'esk_estimate_sqm_damage',
      'type': 'integer',
      '$kuid': '9e3d4c61d7',
      'label': [
        'Square meter or roof or window that is damaged estimation',
        'Оцінка площі пошкодженого квадратного метра, даху чи вікна',
        null,
      ],
      '$xpath': 'esk/esk_estimate_sqm_damage',
    },
    {
      'type': 'end_group',
      '$kuid': '1d6fcf1292',
    },
    {
      'name': 'mpca',
      'type': 'begin_group',
      '$kuid': '0269e34ccd',
      'label': [
        'Cash Assistance Inclusion/Exclusion',
        'Включення/виключення грошової допомоги',
        null,
      ],
      '$xpath': 'mpca',
      'relevant': 'selected(${program}, \'mpca\')',
    },
    {
      'name': 'mpca_tax_id_ph',
      'type': 'image',
      '$kuid': 'd5ee620472',
      'label': [
        'Tax number photo',
        'Фото податкового номера',
        null,
      ],
      '$xpath': 'mpca/mpca_tax_id_ph',
    },
    {
      'name': 'mpca_tax_exemption',
      'type': 'select_one',
      '$kuid': '7f72715c66',
      'label': [
        'Have a tax exemptions?',
        'Маєте податкові пільги?',
        null,
      ],
      '$xpath': 'mpca/mpca_tax_exemption',
      'select_from_list_name': 'yn',
    },
    {
      'name': 'mpca_pay_method',
      'type': 'select_one',
      '$kuid': 'f4f49a777d',
      'label': [
        'Preferred payment method?',
        'Бажаний спосіб оплати?',
        null,
      ],
      '$xpath': 'mpca/mpca_pay_method',
      'select_from_list_name': 'pay_method',
    },
    {
      'type': 'end_group',
      '$kuid': '3007d30218',
    },
  ],
  'choices': [
    {
      'name': 'mpca',
      '$kuid': '67a4bc9e7b',
      'label': [
        'Multipurpose cash assistance (MPCA)',
        'Багатоцільова грошова допомога (MPCA)',
        null,
      ],
      'list_name': 'program',
    },
    {
      'name': 'nfi',
      '$kuid': '677e571eeb',
      'label': [
        'Non-Food Items (NFI)',
        'Непродовольчі товари (NFI)',
        null,
      ],
      'list_name': 'program',
    },
    {
      'name': 'esk',
      '$kuid': 'efd8cc8a03',
      'label': [
        'Emergency Shelter Kits (ESK)',
        'Комплекти екстреної допомоги (ESK)',
        null,
      ],
      'list_name': 'program',
    },
    {
      'name': 'male',
      '$kuid': '46c08a50fd',
      'label': [
        'Male',
        'Чоловік',
        null,
      ],
      'list_name': 'gender',
    },
    {
      'name': 'female',
      '$kuid': 'e9a8aefcf4',
      'label': [
        'Female',
        'Жінка',
        null,
      ],
      'list_name': 'gender',
    },
    {
      'name': 'other',
      '$kuid': '7c3349cd8b',
      'label': [
        'Other',
        'Інше',
        null,
      ],
      'list_name': 'gender',
    },
    {
      'name': 'echo',
      '$kuid': '347686e55d',
      'label': [
        'ECHO',
        'ECHO',
        null,
      ],
      'list_name': 'donor',
    },
    {
      'name': 'bhab',
      '$kuid': '2e7833777f',
      'label': [
        'BHA',
        'BHA',
        null,
      ],
      'list_name': 'donor',
    },
    {
      'name': 'uhf',
      '$kuid': 'a479e79c46',
      'label': [
        'UHF',
        'UHF',
        null,
      ],
      'list_name': 'donor',
    },
    {
      'name': '_3',
      '$kuid': 'bd8e09f206',
      'label': [
        'Cannot do at all',
        'Зовсім не можу',
        null,
      ],
      'list_name': 'disability_level',
    },
    {
      'name': '_2',
      '$kuid': '5579965eee',
      'label': [
        'Yes, a lot of difficulty',
        'Так, дуже важко',
        null,
      ],
      'list_name': 'disability_level',
    },
    {
      'name': '_1',
      '$kuid': 'b4369f5cba',
      'label': [
        'Yes, some difficulty',
        'Так, з деякими труднощами',
        null,
      ],
      'list_name': 'disability_level',
    },
    {
      'name': '_0',
      '$kuid': '2c8da56e76',
      'label': [
        'No, no difficulty',
        'Ні, без труднощів',
        null,
      ],
      'list_name': 'disability_level',
    },
    {
      'name': 'diff_see',
      '$kuid': 'a7e93eec41',
      'label': [
        'Have difficulty seeing, even if wearing glasses',
        'Маю проблеми із зором, навіть якщо в окулярах',
        null,
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_hear',
      '$kuid': '1f33d4bdab',
      'label': [
        'Have difficulty hearing, even if using a hearing aid',
        'Маю проблеми зі слухом, навіть якщо користуюся слуховим апаратом',
        null,
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_walk',
      '$kuid': 'eccebfbc62',
      'label': [
        'Have difficulty walking or climbing steps',
        'Маю проблеми з ходьбою або підйомом сходами',
        null,
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_rem',
      '$kuid': '5debcf2c5b',
      'label': [
        'Have difficulty remembering or concentrating',
        'Маю проблеми із запам\'ятовуванням або концентрацією уваги',
        null,
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_care',
      '$kuid': '2412429b18',
      'label': [
        'Have difficulty with self-care such as washing all over or dressing',
        'Маю проблеми із самообслуговуванням, наприклад, миттям або одяганням',
        null,
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_comm',
      '$kuid': '366c50cb85',
      'label': [
        'Have difficulty communicating, for example understanding or being understood',
        'Маю проблеми зі спілкуванням, наприклад, з розумінням або тим, що тебе розуміють',
        null,
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_none',
      '$kuid': 'd9eefff175',
      'label': [
        'None of the above apply',
        'Жоден з перерахованих вище пунктів не застосовується',
        null,
      ],
      'list_name': 'disability',
    },
    {
      'name': 'no_damage',
      '$kuid': '55e84e6b39',
      'label': [
        'No Structural Damage',
        'Без структурних пошкоджень',
        null,
      ],
      'list_name': 'shelter_damage',
    },
    {
      'name': 'heavy_damage',
      '$kuid': '0ccdcd529c',
      'label': [
        'No Structural Damage',
        'Без структурних пошкоджень',
        null,
      ],
      'list_name': 'shelter_damage',
    },
    {
      'name': 'minor_damage',
      '$kuid': '293f3f735a',
      'label': [
        'Minor Damage (light or medium damages such as broken windows and doors, minor roof damage)',
        'Незначні пошкодження (легкі або середні пошкодження, такі як розбиті вікна та двері, незначне пошкодження даху)',
        null,
      ],
      'list_name': 'shelter_damage',
    },
    {
      'name': 'yes',
      '$kuid': 'dfbe7f1fd0',
      'label': [
        'Yes',
        'Так',
        null,
      ],
      'list_name': 'yn',
    },
    {
      'name': 'no',
      '$kuid': '1d223b39ee',
      'label': [
        'No',
        'Ні',
        null,
      ],
      'list_name': 'yn',
    },
    {
      'name': 'raiff_trans',
      '$kuid': 'c9990f6280',
      'label': [
        'Remittance Raiffaisen AVAL',
        'Грошовий переказ Raiffaisen AVAL',
        null,
      ],
      'list_name': 'pay_method',
    },
    {
      'name': 'ukrpost',
      '$kuid': 'bf07d0433c',
      'label': [
        'Ukrposhta',
        'Укрпошта',
        null,
      ],
      'list_name': 'pay_method',
    },
    {
      'name': 'bank_card',
      '$kuid': '63035aae59',
      'label': [
        'Bank card',
        'Банківська картка',
        null,
      ],
      'list_name': 'pay_method',
    },
    {
      'name': 'other_pay',
      '$kuid': 'c179656bf7',
      'label': [
        'Other Payment Method',
        'Інший спосіб оплати',
        null,
      ],
      'list_name': 'pay_method',
    },
    {
      'name': 'UA01',
      '$kuid': '62504a7835',
      'label': [
        'Autonomous Republic of Crimea',
        'Автономна Республіка Крим',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA71',
      '$kuid': 'e3c60a4ee9',
      'label': [
        'Cherkaska',
        'Черкаська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA74',
      '$kuid': '9ab0f741dc',
      'label': [
        'Chernihivska',
        'Чернігівська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA73',
      '$kuid': 'c6b4db55bf',
      'label': [
        'Chernivetska',
        'Чернівецька',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA12',
      '$kuid': '789ffb2996',
      'label': [
        'Dnipropetrovska',
        'Дніпропетровська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA14',
      '$kuid': 'a2b6866137',
      'label': [
        'Donetska',
        'Донецька',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA26',
      '$kuid': '200e52ef1b',
      'label': [
        'Ivano-Frankivska',
        'Івано-Франківська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA63',
      '$kuid': '68b8ae6293',
      'label': [
        'Kharkivska',
        'Харківська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA65',
      '$kuid': '36782e55c7',
      'label': [
        'Khersonska',
        'Херсонська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA68',
      '$kuid': '6797388f65',
      'label': [
        'Khmelnytska',
        'Хмельницька',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA35',
      '$kuid': '89b5e6a7ce',
      'label': [
        'Kirovohradska',
        'Кіровоградська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA80',
      '$kuid': '8ec573a141',
      'label': [
        'Kyiv',
        'Київ',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA32',
      '$kuid': '9fc055cf16',
      'label': [
        'Kyivska',
        'Київська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA44',
      '$kuid': '836df36afb',
      'label': [
        'Luhanska',
        'Луганська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA46',
      '$kuid': 'b1d022be6e',
      'label': [
        'Lvivska',
        'Львівська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA48',
      '$kuid': '4591dfa6dc',
      'label': [
        'Mykolaivska',
        'Миколаївська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA51',
      '$kuid': '4f93027e9b',
      'label': [
        'Odeska',
        'Одеська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA53',
      '$kuid': 'a484d2fdd9',
      'label': [
        'Poltavska',
        'Полтавська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA56',
      '$kuid': 'ab2ca7145b',
      'label': [
        'Rivnenska',
        'Рівненська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA85',
      '$kuid': 'fcc81dcc47',
      'label': [
        'Sevastopol',
        'Севастополь',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA59',
      '$kuid': '7963ef45d7',
      'label': [
        'Sumska',
        'Сумська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA61',
      '$kuid': '74759ed00a',
      'label': [
        'Ternopilska',
        'Тернопільська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA05',
      '$kuid': '2aac17394f',
      'label': [
        'Vinnytska',
        'Вінницька',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA07',
      '$kuid': 'fe8b5ae359',
      'label': [
        'Volynska',
        'Волинська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA21',
      '$kuid': 'dcb04054f3',
      'label': [
        'Zakarpatska',
        'Закарпатська',
        null,
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA23',
      '$kuid': '482452a266',
      'label': [
        'Zaporizka',
        'Запорізька',
        null,
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
} as any

export const formRrmVersion: Prisma.FormVersionCreateManyInput = {
  formId: fromRrm.id!,
  schemaJson: formRrmSchema,
  version: 1,
  status: 'active',
  uploadedBy: createdBySystem,
}
