import {Prisma} from '@infoportal/prisma'
import {createdBySystem} from '../utils.js'

export const dashboardPm =
  {
    'id': '00000000-0000-0000-1000-000000000000',
    'name': 'Protection Monitoring',
    'createdAt': '2026-01-05T19:34:21.396Z',
    'createdBy': createdBySystem,
    'slug': 'protection_monitoring-2f6a',
    'category': 'Protection',
    'sourceFormId': 'id_form_hhs',
    'workspaceId': '00000000-0000-0000-0000-000000000000',
    'deploymentStatus': 'deployed',
    'theme': {
      'dark': false,
      'bgColor': '#f7f8fc',
      'spacing': 8,
      'cardBlur': 10,
      'fontSize': 14,
      'fontFamily': 'Open Sans',
      'cardBgColor': '#fff',
      'cardOpacity': 10,
      'borderRadius': 4,
      'colorPrimary': '#c9000a',
      'cardElevation': 1,
      'cardBorderSize': 0,
      'colorSecondary': '#1a73e8',
    },
    'isPublic': true,
    'enableChartDownload': true,
    'enableChartFullSize': true,
    'periodComparisonDelta': 90,
  } as const

export const dashboardPmSection = [
  {
    'id': '00000000-0000-0000-1010-000000000000',
    'title': 'Sample',
    'createdAt': '2026-01-05T19:34:33.405Z',
    'dashboardId': dashboardPm.id,
  },
  {
    'id': '00000000-0000-0000-1020-000000000000',
    'title': 'Displacement',
    'createdAt': '2026-01-05T19:48:54.254Z',
    'dashboardId': dashboardPm.id,
  },
  {
    'id': '00000000-0000-0000-1030-000000000000',
    'title': 'Livelihoods',
    'createdAt': '2026-01-05T19:48:54.254Z',
    'dashboardId': dashboardPm.id,
  },
]

export const dashboardPmWidgets: Prisma.DashboardWidgetCreateManyInput[] = [
  {
    'id': 'c3847d8b-ad81-4ecb-934b-a0a9de987313',
    'type': 'Alert',
    'i18n_title': [
      'Demo Data Disclaimer',
    ],
    'description': null,
    'position': {
      'h': 7,
      'w': 12,
      'x': 0,
      'y': 0,
    },
    'config': {
      'type': 'info',
      'i18n_content': [
        'All data displayed in this dashboard is entirely synthetic and generated automatically for demonstration purposes only.\n\nBecause the data is randomly generated, it may contain inconsistencies, implausible combinations, or missing / weak trends.',
      ],
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': 'b476a7a4-3265-4086-86b1-66e32ce04116',
    'type': 'Alert',
    'i18n_title': [
      'IDP population by oblast of origin and displacement',
      'Чисельність ВПО за областями походження та переміщення',
    ],
    'description': null,
    'position': {
      'h': 4,
      'w': 6,
      'x': 0,
      'y': 0,
    },
    'config': {
      'type': '',
      'i18n_content': [
        null,
      ],
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': 'cc3f7e92-199c-4ce5-baa9-414242119016',
    'type': 'GeoChart',
    'i18n_title': [
      'Oblast of origin ➡️',
      'Область походження ➡️',
    ],
    'description': null,
    'position': {
      'h': 14,
      'w': 3,
      'x': 0,
      'y': 4,
    },
    'config': {
      'mapping': {},
      'questionName': 'origin_oblast',
      'countryIsoCode': 'UA',
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': '459ebf0a-7672-4c0d-9e63-4ca4b40d1196',
    'type': 'BarChart',
    'i18n_title': [
      'Factors influencing departure',
      'Фактори, що впливають на від\'їзд',
    ],
    'description': null,
    'position': {
      'h': 18,
      'w': 6,
      'x': 6,
      'y': 31,
    },
    'config': {
      'questionName': 'leave_reason',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': 'b4a0355e-5a90-4bbc-8f9d-e65f497a70e9',
    'type': 'GeoChart',
    'i18n_title': [
      '➡️ Current living Oblast',
      '➡️ Область поточного проживання',
    ],
    'description': null,
    'position': {
      'h': 14,
      'w': 3,
      'x': 3,
      'y': 4,
    },
    'config': {
      'mapping': {},
      'questionName': 'current_oblast',
      'countryIsoCode': 'UA',
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': 'dcbe9e7a-ff09-4e6f-997d-eb02256d499f',
    'type': 'Card',
    'i18n_title': [
      'Households',
      'ДОМОГОСПОДАРСТВА',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 0,
      'y': 6,
    },
    'config': {
      'icon': 'home',
      'operation': 'count',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': 'ab125990-f2b2-43e9-adaf-7966a28dc493',
    'type': 'Card',
    'i18n_title': [
      'Household Size',
      'РОЗМІР ДОМОГОСПОДАРСТВА',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 6,
      'y': 6,
    },
    'config': {
      'icon': 'group',
      'operation': 'avg',
      'questionName': 'household_size',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': 'bcee4d0e-c775-4a5e-ad25-28b5ad2ed0cb',
    'type': 'PieChart',
    'i18n_title': [
      'HEAD OF HH WITH SPECIFIC NEEDS',
      'HEAD OF HH WITH SPECIFIC NEEDS',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 6,
      'x': 6,
      'y': 30,
    },
    'config': {
      'filterBase': {
        'choices': [
          'elder__headed_household',
          'person_with_disability_headed_household',
          'chronicallyill_headed_household',
          'no_specific_needs',
        ],
      },
      'filterValue': {
        'choices': [
          'elder__headed_household',
          'person_with_disability_headed_household',
          'chronicallyill_headed_household',
          'other_specify',
        ],
      },
      'questionName': 'head_hh_specific_needs',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': 'f8d4035c-19fe-4997-aedc-2322711056dd',
    'type': 'PieChart',
    'i18n_title': [
      'UA Citizen',
      'ГРОМАДЯНИН',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 0,
      'y': 33,
    },
    'config': {
      'filterBase': {
        'choices': [
          'stateless',
          'non_ukrainian',
          'ukrainian',
        ],
      },
      'filterValue': {
        'choices': [
          'ukrainian',
        ],
      },
      'questionName': 'citizenship',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': 'e1c093b7-ae02-47ed-acef-795af133d8de',
    'type': 'BarChart',
    'i18n_title': [
      'Main household income sources',
      'Основні джерела доходу домогосподарства',
    ],
    'description': null,
    'position': {
      'h': 25,
      'w': 6,
      'x': 6,
      'y': 24,
    },
    'config': {
      'mapping': {
        '​': [
          null,
        ],
        'debt': [
          null,
        ],
        'none': [
          null,
        ],
        'casual': [
          null,
        ],
        'unable': [
          null,
        ],
        'savings': [
          null,
        ],
        'business': [
          null,
        ],
        'remittances': [
          null,
        ],
        'humanitarian': [
          null,
        ],
        'salary_formal': [
          null,
        ],
        'family_support': [
          null,
        ],
        'social_protection': [
          null,
        ],
      },
      'questionName': 'income_sources',
      'hiddenChoices': [
        'unable',
        'none',
      ],
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1030-000000000000',
  },
  {
    'id': 'bf4b7b9f-49fd-4d2b-aa27-e0b2d5b51682',
    'type': 'PieChart',
    'i18n_title': [
      'BASIC NEEDS GAPS',
      'НЕЗАДОВОЛЕННЯ ОСНОВНИХ ПОТРЕБ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 9,
      'y': 0,
    },
    'config': {
      'filterBase': {
        'choices': [
          'savings',
          'sell_assets',
          'sell_aid',
          'sell_house',
          'borrow',
          'family_support',
          'begging',
          'dangerous_work',
          'less_food',
          'less_health',
          'child_labour',
          'no_school',
          'relocate',
          'poor_housing',
          'none',
          'unable',
        ],
      },
      'filterValue': {
        'choices': [
          'borrow',
          'begging',
          'dangerous_work',
          'less_food',
          'less_health',
          'child_labour',
          'no_school',
        ],
      },
      'questionName': 'coping_strategies',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1030-000000000000',
  },
  {
    'id': 'a0f37411-c295-4f38-98a4-8711d4ef804e',
    'type': 'PieChart',
    'i18n_title': [
      'IDPs w/ ALLOWANCE',
      'ВПО з ДОПОМОГОЮ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 6,
      'y': 0,
    },
    'config': {
      'filterBase': {
        'choices': [
          'yes',
          'no',
        ],
      },
      'filterValue': {
        'choices': [
          'yes',
        ],
      },
      'questionName': 'idp_allowance',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1030-000000000000',
  },
  {
    'id': '0e9edbcf-6dbb-49ed-80ae-41f083c135ff',
    'type': 'BarChart',
    'i18n_title': [
      'Average monthly household income',
      'Середній щомісячний дохід домогосподарства',
    ],
    'description': null,
    'position': {
      'h': 18,
      'w': 6,
      'x': 6,
      'y': 6,
    },
    'config': {
      'mapping': {
        '​': [
          null,
        ],
        'unable': [
          null,
        ],
        '3001_6000': [
          null,
        ],
        '6001_9000': [
          null,
        ],
        'no_income': [
          null,
        ],
        '9001_12000': [
          null,
        ],
        'over_15000': [
          null,
        ],
        'up_to_3000': [
          null,
        ],
        '12001_15000': [
          null,
        ],
      },
      'questionName': 'monthly_income',
      'hiddenChoices': [
        'unable',
        'no_income',
      ],
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1030-000000000000',
  },
  {
    'id': '6b298255-5c3d-4015-83c6-c0219306ff93',
    'type': 'LineChart',
    'i18n_title': [
      'HHs with member(s) out of employment',
      'Домогосподарства з безробітним(и) членом(ами)',
    ],
    'description': null,
    'position': {
      'h': 16,
      'w': 6,
      'x': 0,
      'y': 6,
    },
    'config': {
      'lines': [
        {
          'filter': {
            'choices': [
              'no_jobs',
              'low_season',
              'skill_mismatch',
              'caregiving',
              'no_info',
              'no_experience',
              'disability',
              'age_discrimination',
              'mines',
            ],
            'questionName': 'unemployment_reasons',
          },
          'i18n_label': [
            'Submission time',
          ],
          'questionName': 'submissionTime',
        },
      ],
    },
    'sectionId': '00000000-0000-0000-1030-000000000000',
  },
  {
    'id': 'd55df543-6e63-4a49-9f67-ba7090a90d77',
    'type': 'PieChart',
    'i18n_title': [
      'HHs REPORTING SECURITY CONCERNS DURING DISPLACEMENT',
      'Домогосподарства, що повідомляють про проблеми безпеки під час переміщення',
    ],
    'description': null,
    'position': {
      'h': 5,
      'w': 6,
      'x': 6,
      'y': 0,
    },
    'config': {
      'filterBase': {
        'choices': [
          'none',
          'looting_robbery',
          'physical_assault',
          'abduction',
          'arbitrary_detention',
          'shelling_or_missile_attacks',
          'harassment_at_checkpoints',
          'movement_restrictions',
          'gbv_incident',
          'extortion',
          'hate_speech',
          'other',
        ],
      },
      'filterValue': {
        'choices': [
          'looting_robbery',
          'physical_assault',
          'abduction',
          'arbitrary_detention',
          'shelling_or_missile_attacks',
          'harassment_at_checkpoints',
          'movement_restrictions',
          'gbv_incident',
          'extortion',
          'hate_speech',
          'other',
        ],
      },
      'questionName': 'security_concerns_during_displacement',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': 'e4885fde-39f8-4a1e-aac8-6965f51f562d',
    'type': 'GeoChart',
    'i18n_title': [
      'Households Location',
      'Розташування домогосподарств',
    ],
    'description': null,
    'position': {
      'h': 21,
      'w': 6,
      'x': 0,
      'y': 12,
    },
    'config': {
      'mapping': {},
      'questionName': 'current_oblast',
      'countryIsoCode': 'UA',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': '69a0087c-cc4b-4c9a-8ad1-58a9cefaf206',
    'type': 'Table',
    'i18n_title': [
      'Disaggregation',
      'Розподіл',
    ],
    'description': null,
    'position': {
      'h': 17,
      'w': 6,
      'x': 0,
      'y': 39,
    },
    'config': {
      'row': {
        'i18n_label': [
          'Age Groups',
          '3.2.2 Bкажіть ВІК члена домогосподарства',
        ],
        'questionName': 'age',
        'rangesIfTypeNumber': [
          {
            'max': 4,
            'min': 0,
          },
          {
            'max': 17,
            'min': 5,
          },
          {
            'max': 49,
            'min': 18,
          },
          {
            'max': 59,
            'min': 50,
          },
          {
            'max': 120,
            'min': 60,
          },
        ],
      },
      'column': {
        'i18n_label': [
          '3.2.1 Select the GENDER of HH member',
          '3.2.1 Bкажіть СТАТЬ члена домогосподарства',
        ],
        'questionName': 'gender',
      },
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': 'c3d610fd-2bf7-494f-8864-1455c22a3dfc',
    'type': 'PieChart',
    'i18n_title': [
      'OUT OF WORK',
      'БЕЗРОБОЧІ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 3,
      'y': 0,
    },
    'config': {
      'filterBase': {
        'choices': [
          'no_jobs',
          'low_season',
          'skill_mismatch',
          'caregiving',
          'no_info',
          'no_experience',
          'disability',
          'age_discrimination',
          'mines',
          'none',
        ],
      },
      'filterValue': {
        'choices': [
          'no_jobs',
          'low_season',
          'skill_mismatch',
          'caregiving',
          'no_info',
          'no_experience',
          'disability',
          'age_discrimination',
          'mines',
        ],
      },
      'questionName': 'unemployment_reasons',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1030-000000000000',
  },
  {
    'id': '1329b313-5ddb-4c0c-8d8a-4376d3ad1db2',
    'type': 'Card',
    'i18n_title': [
      'Individuals',
      'ОСІБИ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 3,
      'y': 6,
    },
    'config': {
      'icon': 'person',
      'operation': 'sum',
      'questionName': 'household_size',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': '082fb8a9-e82f-4b27-a0b0-2c5ef77fed72',
    'type': 'PieChart',
    'i18n_title': [
      'Females',
      'ЖІНКИ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 3,
      'y': 33,
    },
    'config': {
      'filterBase': {
        'choices': [
          'male',
          'female',
          'other',
        ],
      },
      'filterValue': {
        'choices': [
          'female',
        ],
      },
      'questionName': 'gender',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': '7a258d8d-eca1-4545-9520-a6022e41419e',
    'type': 'BarChart',
    'i18n_title': [
      'Person of concern',
      'Особа, що викликає занепокоєння',
    ],
    'description': null,
    'position': {
      'h': 11,
      'w': 6,
      'x': 6,
      'y': 48,
    },
    'config': {
      'limit': '10',
      'mapping': {
        'idp': [
          null,
        ],
        '​': [
          null,
        ],
        'returnee': [
          null,
        ],
        'non_displaced': [
          null,
        ],
      },
      'minValue': '',
      'questionName': 'disp_status',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': '8ab61277-0cb6-429e-8527-612da0ba1395',
    'type': 'PieChart',
    'i18n_title': [
      'No income',
      'ВІДСУТНІСТЬ ДОХОДУ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 0,
      'y': 0,
    },
    'config': {
      'filterBase': {
        'choices': [
          'salary_formal',
          'casual',
          'remittances',
          'family_support',
          'debt',
          'savings',
          'humanitarian',
          'business',
          'social_protection',
          'none',
        ],
      },
      'filterValue': {
        'choices': [
          'none',
        ],
      },
      'questionName': 'income_sources',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1030-000000000000',
  },
  {
    'id': '20092d76-4f33-4249-85b2-7c1a84537a3c',
    'type': 'Card',
    'i18n_title': [
      'Average Age',
      'СЕРЕДНІЙ ВІК',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 9,
      'y': 6,
    },
    'config': {
      'icon': 'elderly',
      'operation': 'avg',
      'questionName': 'age',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': '1150c4bc-a829-447e-89a9-ac866e1a84c0',
    'type': 'BarChart',
    'i18n_title': [
      'Household Status',
      'Статус домогосподарства',
    ],
    'description': null,
    'position': {
      'h': 18,
      'w': 6,
      'x': 6,
      'y': 12,
    },
    'config': {
      'mapping': {
        '​': [
          null,
        ],
        'extended_family': [
          'Extended family',
        ],
        'couple_with_children': [
          'Couple with children',
        ],
        'father_with_children': [
          'Father with children',
        ],
        'mother_with_children': [
          'Mother with children',
        ],
        'one_person_household': [
          'One person household',
        ],
        'couple_without_children': [
          'Couple without children',
        ],
      },
      'questionName': 'household_type',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': '7a3f36b5-8aaa-4eff-be79-0cb861b3a07e',
    'type': 'GeoChart',
    'i18n_title': [
      'Reasons household members are not working',
      'Домогосподарства з безробітним(и) членом(ами)',
    ],
    'description': null,
    'position': {
      'h': 25,
      'w': 6,
      'x': 0,
      'y': 22,
    },
    'config': {
      'filter': {
        'choices': [
          'none',
        ],
        'questionName': 'unemployment_reasons',
      },
      'mapping': {},
      'questionName': 'current_oblast',
      'countryIsoCode': 'UA',
    },
    'sectionId': '00000000-0000-0000-1030-000000000000',
  },
  {
    'id': '1a646ec3-2bdf-419f-bb80-2c89f41d1d16',
    'type': 'LineChart',
    'i18n_title': [
      'Displacement and Return Figures',
      'Дані про переміщення та повернення',
    ],
    'description': null,
    'position': {
      'h': 18,
      'w': 6,
      'x': 0,
      'y': 18,
    },
    'config': {
      'lines': [
        {
          'i18n_label': [
            'Displacement from area of origin',
            'Коли ви виїхали?',
          ],
          'questionName': 'first_displacement_date',
        },
        {
          'i18n_label': [
            'Return to area of origin',
            'Коли ви повернулися?',
          ],
          'questionName': 'return_date',
        },
      ],
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': '9e8f7f10-65f9-4d13-a6c7-dd310c8faabc',
    'type': 'BarChart',
    'i18n_title': [
      ' ',
      ' ',
    ],
    'description': null,
    'position': {
      'h': 26,
      'w': 6,
      'x': 6,
      'y': 5,
    },
    'config': {
      'mapping': {
        '​': [
          null,
        ],
        'none': [
          null,
        ],
        'other': [
          null,
        ],
        'abduction': [
          null,
        ],
        'extortion': [
          null,
        ],
        'hate_speech': [
          null,
        ],
        'gbv_incident': [
          null,
        ],
        'looting_robbery': [
          null,
        ],
        'physical_assault': [
          null,
        ],
        'arbitrary_detention': [
          null,
        ],
        'movement_restrictions': [
          null,
        ],
        'harassment_at_checkpoints': [
          null,
        ],
        'unable_unwilling_to_answer': [
          null,
        ],
        'shelling_or_missile_attacks': [
          null,
        ],
      },
      'questionName': 'security_concerns_during_displacement',
      'hiddenChoices': [
        'none',
        'other',
        'unable_unwilling_to_answer',
        '​',
      ],
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': 'd80ea46f-b90d-4689-a920-bc56aeaab8bf',
    'type': 'BarChart',
    'i18n_title': [
      ' ',
      'Чи властиві (чи має голова) голові цього домогосподарства наведені характеристики (or вразливості)?',
    ],
    'description': null,
    'position': {
      'h': 12,
      'w': 6,
      'x': 6,
      'y': 36,
    },
    'config': {
      'mapping': {
        '​': [
          null,
        ],
        'other_specify': [
          'Other',
        ],
        'no_specific_needs': [
          null,
        ],
        'elder__headed_household': [
          null,
        ],
        'unable_unwilling_to_answer': [
          null,
        ],
        'chronicallyill_headed_household': [
          null,
        ],
        'person_with_disability_headed_household': [
          null,
        ],
      },
      'questionName': 'head_hh_specific_needs',
      'hiddenChoices': [
        'unable_unwilling_to_answer',
        'no_specific_needs',
      ],
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
]

export const dashboardPmPublished = {
  id: '00000000-0000-0000-1000-100000000000',
  snapshot: dashboardPmSection.map(section => {
    return {
      ...section,
      widgets: dashboardPmWidgets.filter(_ => section.id === _.sectionId),
    }
  }) as any,
  dashboardId: dashboardPm.id,
  publishedBy: createdBySystem,
}